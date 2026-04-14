const { StatusCodes } = require('http-status-codes');

const {Op} = require('sequelize');

const {FlightRepository} = require('../repositories');

const flightRepository = new FlightRepository();

const Helper = require('../utils/helpers');

const AppError = require('../utils/errors/app-error.');

async function createFlight(data) {
    // console.log(data.arrival,data.departure);
    // if(!Helper.compareTime(data.arrival,data.departure)){
    //     throw new AppError('ArrivalTime cannot be before departureTime',StatusCodes.BAD_REQUEST);
    // }
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        console.log(error);
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);//in the error array given by the sequelize have all info in which whatever is the message we will store it in our explanation as array
            });
            console.log(explanation);
            throw new AppError('Cannot create a new Flight object', StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
 
async function getAllFlights(query) {
    let customFilter = {};
    let sortFilter = [];
    //trips-> MUM-DEL
    if(query.trips){
        [departureAirportId,arrivalAirportId] = query.trips.split('-');
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
        //TODO -> check if both id not same
    }
    if(query.price){
        [minPrice,maxPrice] = query.price.split('-');
        customFilter.price={
            [Op.between] : [minPrice,maxPrice]
        }
    }
    if(query.travellers){
        customFilter.totalSeats = {
            [Op.gte] : query.travellers 
        }
    }
    const endingtripTime = "23:59:00";  
    if(query.tripDate){
        
        customFilter.departure = {
            [Op.between] : [query.tripDate,query.tripDate + endingtripTime]
        }
    }
    if(query.sort){
        const params = query.sort.split(',');

        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = sortFilters;

    }

    try {
        const flights = await flightRepository.getAllFlights(customFilter,sortFilter);
        return flights;
    } catch (error) {
        console.log(error);
         throw new AppError('Cannot get the Flights', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


async function getFlight(id) {
    try {
        const flight = await flightRepository.get(id);
        return flight;
    } catch (error) {
        console.log("services catches error");
        if(error.statusCodes=StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you are trying to find is not present',error.statusCodes);
        }
        throw new AppError('cannot fetch data of airplane',StatusCodes.INTERNAL_SERVER_ERROR);
    }
} 

async function updateSeats(data) {
    console.log("in flight services")
    try {
        const response = await flightRepository.updateRemainingSeats(data.flightId,data.seats,data.dec);
        return response;
    } catch (error) {
        console.log(error);
         throw new AppError('Cannot update setasin the Flight', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}