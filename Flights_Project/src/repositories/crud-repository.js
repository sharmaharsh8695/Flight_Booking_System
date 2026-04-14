const {  Logger } = require("../config");
const AppError = require("../utils/errors/app-error.");
const {StatusCodes} = require('http-status-codes');  
// here we will store all the code for the queries
class CrudRepository{
    constructor(model){
        this.model = model;
    }

    async create(data){
       const response = this.model.create(data);
            return response;
    }

    async destroy(data){
       
            const response = this.model.destroy({ where :{
                id : data }
            });
            return response;
        
    }
    
    async get(data){
        
            const response = this.model.findByPk(data);
            if(!response){
                throw new AppError('Not able to find the resource',StatusCodes.NOT_FOUND);
            }
            return response;
    }
 
    async getAll(){
        
            const response = this.model.findAll();
            return response;
        
    }       
    async update(id,data){
        
            const response = this.model.update(data,{
                where:{
                    id:id
                }
            });
            return response;
        
    }
}

module.exports = CrudRepository;
//can see the documentation of sequelize-cli for more queries