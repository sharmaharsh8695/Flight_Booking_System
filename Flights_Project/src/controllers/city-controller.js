const {StatusCodes}=require('http-status-codes');

const {SuccessResponse,ErrorResponse} = require('../utils/common');

const {CityService} = require('../services')

async function createCity(req,res) {
    try {   
        const city = await CityService.createCity({
            name : req.body.name
        });
        SuccessResponse.message="successfully creates a city ";
        SuccessResponse.data=city;
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
        .json(ErrorResponse);
    }
}

async function destroyCity(req,res) {
    try {
        const city = await CityService.destroyCity(req.params.id);
        SuccessResponse.data=city;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (err) {
        ErrorResponse.error = err;
        return res.status(err.statusCode).json(ErrorResponse);
    }
}

async function updateCity(req,res) {
    try {
        const city = await CityService.updateCity(req.body.id,{
            name : req.body.name
        });
        SuccessResponse.data=city;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (err) {
        ErrorResponse.error = err;
        return res.status(err.statusCode).json(ErrorResponse);
    }
}

module.exports ={
    createCity,
    destroyCity,
    updateCity
}