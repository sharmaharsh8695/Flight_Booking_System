const {StatusCodes}=require('http-status-codes');

const {SuccessResponse,ErrorResponse} = require('../utils/common');

const {FlightService} = require('../services');

// create flight will be a post request
// req body ->{ ... }
async function createFlight(req,res){
    try {
        
        const flight = await FlightService.createFlight({
            flightNumber : req.body.flightNumber,
            airplaneId : req.body.airplaneId,
            departure : req.body.departure,
            arrival : req.body.arrival,
            price : req.body.price,
            departureAirportId : req.body.departureAirportId,
            arrivalAirportId : req.body.arrivalAirportId,
            boardingGate : req.body.boardingGate,
            totalSeats : req.body.totalSeats
        });
        SuccessResponse.message="successfully creates a flight";
        SuccessResponse.data=flight;
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
    }
}

async function getAllFlights(req,res) {
    try {
        const flights = await FlightService.getAllFlights(req.query);
        SuccessResponse.data = flights;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
    }
}

async function getFlight(req,res) {
    try {
        const flight = await FlightService.getFlight(req.params.id);
        SuccessResponse.data=flight;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

async function updateSeats(req,res) {
    console.log("in flight controller")
    try {
        // console.log(typeof(req.body.dec));
        const flight = await FlightService.updateSeats({
            flightId : req.params.id,
            seats : req.body.seats,
            dec : req.body.dec
        });
        SuccessResponse.data=flight;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
       ErrorResponse.error=error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}