const {UserRepository,RoleRepository}=require('../repositories');
const bcrypt = require('bcrypt');
const  AppError  =require('../utils/errors/app-error.');
const {StatusCodes} = require('http-status-codes');
const { Auth,Enums} = require('../utils/common');
const { verify, JsonWebTokenError } = require('jsonwebtoken');
const role = require('../models/role');
const userRepository = new UserRepository();
const roleRepo = new RoleRepository();


async function create(data){
     try {
        const user = await userRepository.create(data);
        const role = await roleRepo.getRoleByName(Enums.USER_ROLES_ENUM.CUSTOMER);
        user.addRole(role);
        return user;
    } catch (error) {
        if(error.name =='SequelizeUniqueConstraintError' || error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);//in the error array given by the sequelize have all info in which whatever is the message we will store it in our explanation as array
            });
            console.log(explanation);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new user object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function signin(data){
    try {
        const user = await userRepository.getUserByEmail(data.email);
        if(!user){
            throw new AppError('No user found for the given email',StatusCodes.NOT_FOUND);
        }
        const passwordCheck = Auth.checkPassword(data.password,user.password);
        if(!passwordCheck){
            throw new AppError('Invalid password',StatusCodes.BAD_REQUEST);

        }
        const jwt = Auth.createToken({id:user.id,email : user.email})
        return jwt;
    } catch (error) {
        
        throw new AppError('something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function isAuthenticated(token){
    try {
        if(!token){
            throw new AppError('missing token',StatusCodes.BAD_REQUEST);
        }
        const response = Auth.verifytoken(token);
        const user = await userRepository.get(response.id);
        if(!user){
            throw new AppError('No user found',StatusCodes.NOT_FOUND);
        }
        return user.id;
    } catch (error) {
        if(error.name=="JsonWebTokenError"){
            throw new AppError('invalid jwt token',StatusCodes.BAD_REQUEST)
        }
        if(error.name=="TokenExpiredError"){
            throw new AppError('jwt token expired',StatusCodes.BAD_REQUEST)
        }
        console.log(error);
        throw new AppError('something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function addRoletoUser(data) {
    try {
        const user = await userRepository.get(data.id);
        if(!user){
            throw new AppError('no user found',StatusCodes.NOT_FOUND);
        }
        const role = await roleRepo.getRoleByName(data.role);
        if(!role){
            throw new AppError('no role found',StatusCodes.NOT_FOUND);
        }
        user.addRole(role);
        return user;
    } catch (error) {
        if(error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('someting went wrong',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function isAdmin(data){
   try {
        const user = await userRepository.get(data.id);
        if(!user){
            throw new AppError('no user found',StatusCodes.NOT_FOUND);
        }
        const adminrole = await roleRepo.getRoleByName(Enums.USER_ROLES_ENUM.ADMIN);
        if(!role){
            throw new AppError('no role found',StatusCodes.NOT_FOUND);
        }
        user.hasRole(role);
        return user;
    } catch (error) {
        if(error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('someting went wrong',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}



module.exports = {
    create,
    signin,
    isAuthenticated,
    addRoletoUser
}