import csv, sqlite3

db_path = './timesheets.db'
conn = sqlite3.connect(db_path)
c = conn.cursor()

c.execute("""CREATE TABLE IF NOT EXISTS timesheet (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    client TEXT NOT NULL,
    project TEXT NOT NULL,
    project_code TEXT NOT NULL,
    hours FLOAT NOT NULL,
    is_billable INT(1) NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    billable_rate INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NULL,
    updated_at TIMESTAMP
)
""")

with open('timesheets-data.csv', 'r') as data:
    dr = csv.DictReader(data)
    to_db = [(row['Date'], row['Client'], row['Project'],
        row['Project Code'], row['Hours'], row['Billable?'],
        row['First Name'], row['Last Name'], row['Billable Rate']) for row in dr]

c.executemany("""INSERT INTO timesheet (date, client, project, project_code,
    hours, is_billable, first_name, last_name, billable_rate) VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?);""", to_db)
conn.commit()
conn.close()