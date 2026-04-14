const { StatusCodes } = require('http-status-codes');

const {ErrorResponse} = require('../utils/common');
const AppError = require('../utils/errors/app-error.');

function validateCreateRequest(req,res,next){
    if(!req.body.modelNumber){
        ErrorResponse.message = 'somethinng went wrong in creating the airplane';
        ErrorResponse.error = new AppError(['Model number not found in the incoming format'],StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest
}