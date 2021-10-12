const express = require('express');
const asyncify = require('express-asyncify');
const sequelize = require('./database/sequelize');
const cors = require('cors');
const { ValidationError } = require("sequelize");


const app = asyncify(express());
const port = 5000;

app.use(express.json());
app.use(cors());

app.get('/api/timesheets', async (req, res) => {
  try {
    const timesheets = await sequelize.models.Timesheet.findAll();

    res.status(200).json({ data: timesheets });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

app.post('/api/timesheets', async (req, res) => {
  try {
    const timesheetDto = {
      ...req.body,
      date: new Date(req.body.date),
      createdAt: Date.now(),
      updatedAt: null,
    };
    const timesheet = await sequelize.models.Timesheet.create(timesheetDto);

    res.status(201).json({ data: timesheet });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ error: `${error.errors[0].path} is invalid.` });
    } else {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }

});

app.listen(port, () => {
  console.log(`Timesheets API running on port ${port}.`);
});
