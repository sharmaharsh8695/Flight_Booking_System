const {StatusCodes}=require('http-status-codes');

const {SuccessResponse,ErrorResponse} = require('../utils/common');

const {AirplaneService} = require('../services')

// create airplane will be a post request
// req body ->{ modelnum,capacity }
async function createAirplanes(req,res){
    try {
        
        const airplane = await AirplaneService.createAirplane({
            modelNumber : req.body.modelNumber,
            capacity : req.body.capacity
        });
        SuccessResponse.message="successfully creates an airplane";
        SuccessResponse.data=airplane;
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
        .json(ErrorResponse);
    }
}

async function getAirplanes(req,res) {
    try {
        const airplanes = await AirplaneService.getAirplanes();
        SuccessResponse.data=airplanes;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.statusCode)
            .json(ErrorResponse);
    }
}
/**
 * GET -> /airplanes/:id
 * 
 * id property in the request object we can access it with following way
 */
async function getAirplane(req,res) {
    try {
        const airplanes = await AirplaneService.getAirplane(req.params.id);
        SuccessResponse.data=airplanes;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.statusCode)
            .json(ErrorResponse);
    }
}

async function destroyAirplane(req,res) {
    try {
        const airplanes = await AirplaneService.destroyAirplane(req.params.id);
        SuccessResponse.data=airplanes;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (err) {
        ErrorResponse.error = err;
        return res.status(err.statusCode).json(ErrorResponse);
    }
}

async function updateAirplane(req,res) {
    try {
        const airplanes = await AirplaneService.updateAirplane(req.params.id,{
            modelNumber : req.body.modelNumber,
            capacity : req.body.capacity
        });
        SuccessResponse.data=airplanes;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (err) {
        ErrorResponse.error = err;
        return res.status(err.statusCode).json(ErrorResponse);
    }
}


module.exports = {
    createAirplanes,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
} 