var mysql = require("mysql");

function AdminDBManager() {
  this.connection = mysql.createConnection({
    host: "localhost",
    user: "teacher",
    password: "Admin1234",
    database: "counsDB",
  });
}

AdminDBManager.prototype.connect = function () {
  let self = this;
  this.connection.connect(function (err) {
    if (err) {
      console.error("Error connecting to database:", err);
      return;
    }
    console.log("Connected to database");
  });
};

AdminDBManager.prototype.disconnect = function () {
  let self = this;
  this.connection.end(function (err) {
    if (err) {
      console.error("Error disconnecting from database:", err);
      return;
    }
    console.log("Disconnected from database");
  });
};

AdminDBManager.prototype.executeQuery = function (query, params, callback) {
  let self = this;
  this.connection.query(query, params, function (err, result) {
    if (err) {
      console.error("Error executing query:", err);
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

module.exports = AdminDBManager;
