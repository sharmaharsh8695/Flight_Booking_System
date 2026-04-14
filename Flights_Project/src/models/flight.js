'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane,{
        foreignKey:'airplaneId',
        as: 'airplaneDetail'
      });
      this.belongsTo(models.Airport,{
        foreignKey:'arrivalAirportId',
        as : 'arrival_Airport'
      });
      this.belongsTo(models.Airport,{
        foreignKey:'departureAirportId',
        as : 'departure_Airport'
      });
    }
  }
  Flight.init({
    flightNumber: {type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    airplaneId: {type:DataTypes.INTEGER,
      allowNull:false
    },
    price:  {type:DataTypes.INTEGER,
      allowNull:false
    },
    departure:  {type:DataTypes.DATE,
      allowNull:false
    },
    arrival: {type:DataTypes.DATE,
      allowNull:false
    },
    departureAirportId: {type:DataTypes.STRING,
      allowNull:false
    },
    arrivalAirportId:  {type:DataTypes.STRING,
      allowNull:false
    },
    boardingGate:DataTypes.STRING,
    totalSeats:{type:DataTypes.INTEGER,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};