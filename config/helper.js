/* imports */
const Sequelize = require('sequelize');

// Connect to the database
try{
  const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USERNAME,
    process.env.PASSWORD, 
    {
    host: process.env.HOST,
    dialect: process.env.DIALET,
    logging: false
  });

  /* exports */
  module.exports = sequelize;
  
}catch(err){
  /* console error*/
  console.log(err.message);
}




