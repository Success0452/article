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

  module.exports = sequelize;
  
}catch(err){
  console.log(err.message);
}




