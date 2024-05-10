const { Sequelize, DataTypes } = require('sequelize');

// const sequelize = new Sequelize(process.env.DBURLDEV);

// const sequelize = new Sequelize('postgres-food', 'postgres', 'PravyaBhatra1998', {
//     host: 'postgres-food.c1gi0mumgho5.ap-south-1.rds.amazonaws.com',
//     dialect: 'postgres',
//     port: 5432,
//     logging: false // Disable logging SQL queries (optional)
//   });


const sequelize = new Sequelize(
    'food-app',
    'postgres',
    'PravyaBhatra1998',
    {
      host:  'postgres-food.c1gi0mumgho5.ap-south-1.rds.amazonaws.com',
      dialect:  'postgres',
      dialectOptions: {
        ssl: {
          require: true, // This will help you. But you will see nwe error
          rejectUnauthorized: false // This line will fix new error
        }
      },    }
  );

module.exports = {
    sequelize
};
