# Inventory App 

Simple backend application built on Node.js and MongoDB for data storage, written as a practical example to demonstrate Node.js and Mongoose capabilities.

## Stack
This application uses Express.js as its web framework, Mongoose ODM for data modeling with MongoDB, and Pug for HTML templates. Additional libraries are included for tasks such as input validation and session management.

## Installation
To set up locally:
1. Clone the repo
```bash
git clone https://github.com/CallMeMaverick/InventoryApp.git
cd <reponame>
```

2. Install dependencies with [nodemon](https://www.npmjs.com/package/nodemon):
```bash
npm install
npm install -g nodemon  # Install nodemon globally if not already installed
```

3. Start the server:
```bash
nodemon app.js  # Replace app.js with your main server file if different
```

## DB config
Before running the application, ensure you configure the MongoDB connection appropriately. Modify the connection string in the configuration file with your MongoDB URI, otherwise, use one provided in the app.js file (left explicitly defined for the sake of example). 

## Warnings

Please note that the database was initially populated with the sample script populatedb.js, which you can reference in the repository. This script links to preset company data when working with phone entries. While these links might not always be correct due to sample data limitations, the application ensures that new model entries are linked correctly to existing companies.


## License

Apache-2.0, see **Licence** for reference.
