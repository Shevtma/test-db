const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    db: {
      host: "db4free.net",
      user: "maria_sh",
      password: "test1234",
      database: "shevtma",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        queryDB: (query) => {
          return queryTestDb(query, config);
        },
      });
    },
  },
});

const mysql = require("mysql");
function queryTestDb(query, config) {
  const connection = mysql.createConnection(config.env.db);
  connection.connect;
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      else {
        connection.end();
        return resolve(results);
      }
    });
  });
}

