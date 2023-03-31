const sequelize = require("../db/db");
const { Sequelize, DataTypes } = require('sequelize');
const Files =
    sequelize.define('Files', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        fileName: {
            type: DataTypes.STRING,
            allowNull: false
        }, fileSize: {
            type: DataTypes.FLOAT,
            allowNull: false
        }, orginalName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

module.exports = Files