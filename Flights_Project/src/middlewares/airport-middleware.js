const { StatusCodes } = require('http-status-codes');

const {ErrorResponse} = require('../utils/common');
const AppError = require('../utils/errors/app-error.');

function validateCreateRequest(req,res,next){
    if(!req.body.name){
        ErrorResponse.message = 'somethinng went wrong in creating the airport';
        ErrorResponse.error = new AppError(['AIrport name not found in the incoming format'],StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.code){
        ErrorResponse.message = 'somethinng went wrong in creating the airport';
        ErrorResponse.error = new AppError(['Airport code not found in the incoming format'],StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.cityId){
        ErrorResponse.message = 'somethinng went wrong in creating the airport';
        ErrorResponse.error = new AppError(['cityId not found in the incoming format'],StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest
}