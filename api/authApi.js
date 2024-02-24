const db = require("../db/db.js");


let USERS = [{ user_id: "001A", email: "a@a.com", password: '$2a$10$oWDfskt9Iw773LcvPeR.aeGOp6H4Gntf2sexAPvGHLMmtuKMfCsTm', username: "Brolly" }, { user_id: "002B", email: "b@b.com", password: "$2a$10$rlcqVhfD9L2F3nCR82mJfuOUzrPcJLLEMWIGMcQpSF3EuXikmo3MG", username: "Goku" }];

// require("../db/users.json") ||

exports.REGISTER_USER = function (data, done) {
  try {
    USERS.push(data)
    console.log("added users", data)
    done(null)
  } catch (e) {
    done(e)
  }
}



exports.FIND_USER_BY = function (type, identifier) {
  return USERS.find(user => user[type] === identifier);
}







