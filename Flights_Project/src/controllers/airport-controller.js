const {StatusCodes}=require('http-status-codes');

const {SuccessResponse,ErrorResponse} = require('../utils/common');

const {AirportService} = require('../services');

// create airplane will be a post request
// req body ->{ modelnum,capacity }
async function createAirport(req,res){
    try {
        
        const airport = await AirportService.createAirport({
            name:req.body.name,
            code : req.body.code,
            address:req.body.address,
            cityId : req.body.cityId
        });
        SuccessResponse.message="successfully creates an airplane";
        SuccessResponse.data=airport;
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
        .json(ErrorResponse);
    }
}

async function getAirports(req,res) {
    try {
        const airport = await AirportService.getAirports();
        SuccessResponse.data=airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.statusCode)
            .json(ErrorResponse);
    }
}
/**
 * GET -> /airport/:id
 * 
 * id property in the request object we can access it with following way
 */
async function getAirport(req,res) {
    try {
        const airport = await AirportService.getAirport(req.params.id);
        SuccessResponse.data=airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.statusCode)
            .json(ErrorResponse);
    }
}

async function destroyAirport(req,res) {
    try {
        const airport = await AirportService.destroyAirport(req.params.id);
        SuccessResponse.data=airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (err) {
        ErrorResponse.error = err;
        return res.status(err.statusCode).json(ErrorResponse);
    }
}

async function updateAirport(req,res) {
    try {
        const airports = await AirportService.updateAirport(req.params.id,{
            name:req.body.name,
            code : req.body.code,
            address:req.body.address,
            cityId : req.body.cityId
        });
        SuccessResponse.data=airports;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (err) {
        ErrorResponse.error = err;
        return res.status(err.statusCode).json(ErrorResponse);
    }
}


module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
} 