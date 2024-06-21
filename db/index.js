const { Sequelize, DataTypes } = require('sequelize');
const pg = require("pg")

// console.log({db:process.env.DB_HOST});

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: '50013',
    dialect: "postgres",
    dialectModule: pg,
    // dialectOptions: {
    //   ssl: {
    //     require: true, // This will help you. But you will see nwe error
    //     rejectUnauthorized: false // This line will fix new error
    //   }
    // },   
  }
);

// console.log({sequelize});

module.exports = {
  sequelize
};
