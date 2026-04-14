const { StatusCodes } = require('http-status-codes');
const {AirplaneRepository} = require('../repositories');

const airplaneRepository = new AirplaneRepository();

const AppError = require('../utils/errors/app-error.');

async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);//in the error array given by the sequelize have all info in which whatever is the message we will store it in our explanation as array
            });
            console.log(explanation);
            throw new AppError('Cannot create a new Airplane object', StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes() {
    try {
        const airplane = await airplaneRepository.getAll();
        return airplane;
    } catch (error) {
        throw new AppError('cannot fetch data of airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(id) {
    try {
        const airplane = await airplaneRepository.get(id);
        return airplane;
    } catch (error) {
        if(error.statusCodes=StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you are trying to find is not present',error.statusCodes);
        }
        throw new AppError('cannot fetch data of airplane',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirplane(id) {
    try {
        const airplane = await airplaneRepository.destroy(id);
        return airplane;
    } catch (error) {
         throw new AppError('cannot delete data of airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirplane(id,data) {
    try {
        const airplane = await airplaneRepository.update(id,data);
        return airplane;
    } catch (error) {
        throw new AppError('cannot update data of airplane',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}