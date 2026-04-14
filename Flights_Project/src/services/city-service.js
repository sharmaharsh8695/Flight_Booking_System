const { StatusCodes } = require('http-status-codes');
const {CityRepository} = require('../repositories');

const AppError = require('../utils/errors/app-error.');

const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        if(error.name =='SequelizeUniqueConstraintError' || error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);//in the error array given by the sequelize have all info in which whatever is the message we will store it in our explanation as array
            });
            console.log(explanation);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new city object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
} 

async function destroyCity(id) {
    try {
        const city = await cityRepository.destroy(id);
        return city;
    } catch (error) {
         throw new AppError('cannot delete data of city',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(id,data) {
    try {
        const city = await cityRepository.update(id,data);
        return city;
    } catch (error) {
        throw new AppError('cannot update data of city',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
 
module.exports ={
    createCity,
    destroyCity,
    updateCity
}