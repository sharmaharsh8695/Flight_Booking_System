  const cron = require('node-cron');
const { BookingService } = require('../../services');

  function scheduleCrons(){
    cron.schedule('*/3 * * * * *',async () =>{
        console.log("cron working")
        await BookingService.cancelOldBookings();
    });
  } 

  module.exports = scheduleCrons;