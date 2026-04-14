'use strict';
/** @type {import('sequelize-cli').Migration} */

const{Enums} = require('../utils/common');
const {booked,cancelled,initiated,pending} = Enums.Booking_Status;


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM,
        values : [booked,cancelled,initiated,pending],
        defaultValue:initiated
      },
      noOfSeats:{
        type : Sequelize.INTEGER,
        allowNull:false,
        defaultValue:1
      },
      totalCost: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};