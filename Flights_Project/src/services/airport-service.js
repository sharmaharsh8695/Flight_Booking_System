const { StatusCodes } = require('http-status-codes');
const {AirportRepository} = require('../repositories');

const airportRepository = new AirportRepository();

const AppError = require('../utils/errors/app-error.');

async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);//in the error array given by the sequelize have all info in which whatever is the message we will store it in our explanation as array
            });
            console.log(explanation);
            throw new AppError('Cannot create a new Airport object', StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airport object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports() {
    try {
        const airport = await airportRepository.getAll();
        return airport;
    } catch (error) {
        throw new AppError('cannot fetch data of airports',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id) {
    try {
        const airport = await airportRepository.get(id);
        return airport;
    } catch (error) {
        if(error.statusCodes=StatusCodes.NOT_FOUND){
            throw new AppError('The airport you are trying to find is not present',error.statusCodes);
        }
        throw new AppError('cannot fetch data of airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirport(id) {
    try {
        const airport = await airportRepository.destroy(id);
        return airport;
    } catch (error) {
         throw new AppError('cannot delete data of airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirport(id,data) {
    try {
        const airport = await airportRepository.update(id,data);
        return airport;
    } catch (error) {
        throw new AppError('cannot update data of airport',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}