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
    validate: {
      isDate: true,
      notEmpty: true,
    },
  },
  client: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  project: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  projectCode: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'project_code',
    validate: {
      notEmpty: true,
    },
  },
  hours: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isNumeric: true,
    },
  },
  isBillable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'is_billable',
    validate: {
      isBoolean: true,
    },
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'first_name',
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'last_name',
    validate: {
      notEmpty: true,
    },
  },
  billableRate: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'billable_rate',
    validate: {
      isNumeric: true,
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at',
    validate: {
      isDate: true,
    },
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'updated_at',
    validate: {
      isDate: true,
    },
  }
}, {
  tableName: 'timesheet',
  timestamps: false,
});

module.exports = sequelize;
