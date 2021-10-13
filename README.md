# Timesheets
Full-stack application that displays entries for timesheets. 

The front-end features a sortable, filterable, and searchable table that shows all of the timesheet entries, as well as some key aggregate statistics.

Back-end functionality includes the ability to get all of the timesheet entries and creating a new entry.

## Project Setup - Windows
Ensure that the following are installed:
- NPM
- Node

Clone this repo locally.

Inside of the project folder, run `setup.bat`. This will run `npm install` for both the client and server.

The next step is to start the API on port 5000.

Open a shell of your choice (command prompt, git bash, etc), enter the command`cd server`, then `npm run start`.

Now it's time to start the React application on port 3000.

In a new shell, enter the comamand `cd client`, then `npm run start`.

Finally, navigate to http://localhost:3000 in your browser, and you should see the table populated with data.

## Key Technologies
- React (with TypeScript)
- Node/Express
- ag-grid
- React Query
- Sequelize
- Sqlite
- Python

## Database Creation
The database is a sqlite file that was created by analyzing the given csv file with Python by running the `create-table.py` script in the `server/database/` folder.
