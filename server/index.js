const express = require('express');
const asyncify = require('express-asyncify');
const sequelize = require('./database/sequelize');


const app = asyncify(express());
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/api/timesheets', async (req, res) => {
  const timesheets = await sequelize.models.Timesheet.findAll();
  res.status(200).json(timesheets);
});

app.listen(port, () => {
  console.log(`Timesheets API running on port ${port}.`);
});
