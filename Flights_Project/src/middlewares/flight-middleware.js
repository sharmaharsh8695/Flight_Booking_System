const { StatusCodes } = require('http-status-codes');

const {ErrorResponse} = require('../utils/common');
const AppError = require('../utils/errors/app-error.');

function validateCreateRequest(req,res,next){
    if(!req.body.flightNumber){
        ErrorResponse.message = 'somethinng went wrong in creating the flight Number';
        ErrorResponse.error = new AppError(['FLight Number not found in the incoming format'],StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.airplaneId){
        ErrorResponse.message = 'somethinng went wrong in creating the fightNumber';
        ErrorResponse.error = new AppError(['airplaneId not found in the incoming format'],StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.price){
        ErrorResponse.message = 'somethinng went wrong in creating the fightNumber';
        ErrorResponse.error = new AppError(['price not found in the incoming format'],StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.totalSeats){
        ErrorResponse.message = 'somethinng went wrong in creating the fightNumber';
        ErrorResponse.error = new AppError(['totalSeats not found in the incoming format'],StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.departureAirportId){
        ErrorResponse.message = 'somethinng went wrong in creating the fightNumber';
        ErrorResponse.error = new AppError(['departureAirportID not found in the incoming format'],StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }if(!req.body.arrivalAirportId){
        ErrorResponse.message = 'somethinng went wrong in creating the fightNumber';
        ErrorResponse.error = new AppError(['arrivalAirportID not found in the incoming format'],StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();
}

function validateUpdateRequest(req,res,next){
    
    if(!req.body.seats){
        ErrorResponse.message = 'somethinng went wrong in updating the seats';
        ErrorResponse.error = new AppError(['seat num not found in the incoming format'],StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateRequest
}