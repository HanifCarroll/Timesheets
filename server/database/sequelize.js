const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/timesheets.db',
});

sequelize.define('Timesheet', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  client: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  project: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectCode: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'project_code',
  },
  hours: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  isBillable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'is_billable',
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'first_name',
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'last_name',
  },
  billableRate: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'billable_rate',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'updated_at',
  }
}, {
  tableName: 'timesheet',
  timestamps: false,
});

module.exports = sequelize;
