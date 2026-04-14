
const  AppError  =require('../utils/errors/app-error.');
const {StatusCodes} = require('http-status-codes');
const {SuccessResponse,ErrorResponse} = require('../utils/common');

const {UserService} = require('../services')

async function signupUser(req,res) {
    try {   
        const user = await UserService.create({
            email : req.body.email,
            password:req.body.password,
        });
        SuccessResponse.message="successfully creates a user ";
        SuccessResponse.data=user;
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
        .json(ErrorResponse);
    }
}

async function signinUser(req,res) {
    try {   
        const user = await UserService.signin({
            email : req.body.email,
            password:req.body.password,
        });
         SuccessResponse.data=user;
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
}

async function addRole(req,res) {
    try {   
        const user = await UserService.addRoletoUser({
            role : req.body.role,
            id:req.body.id,
        });
         SuccessResponse.data=user;
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
}

module.exports = {
    signupUser,
    signinUser,
    addRole
}