const express = require('express');
const asyncify = require('express-asyncify');
const sequelize = require('./database/sequelize');


const app = asyncify(express());
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/api/timesheets', async (req, res) => {
  const timesheets = await sequelize.models.Timesheet.findAll();
  res.status(200).json(timesheets);
});

app.post('/api/timesheets', async (req, res) => {
  const timesheetDto = { ...req.body };
  timesheetDto.date = new Date(timesheetDto.date)
  timesheetDto.createdAt = Date.now();
  timesheetDto.updatedAt = null;
  const timesheet = await sequelize.models.Timesheet.create(timesheetDto);
  res.status(201).json(timesheet);
});

app.listen(port, () => {
  console.log(`Timesheets API running on port ${port}.`);
});
