const { StatusCodes } = require('http-status-codes');

const {ErrorResponse} = require('../utils/common');
const AppError = require('../utils/errors/app-error.');

function validateCreateRequest(req,res,next){
    console.log(req.body)
    if(!req.body?.name){
        ErrorResponse.message = 'somethinng went wrong in creating the city';
        ErrorResponse.error = new AppError(['city name not found in the incoming format'],StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest
}