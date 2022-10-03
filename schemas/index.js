const hidden = require('../config/dev')
const mongoose = require("mongoose");

const connect = () => {
  if (process.env.NOde_ENV !== 'production') {
    mongoose.set('debug', true)
  }

  mongoose.connect(hidden.mongoURI, { dbName:'Blog_Lists'
    }).then (() => console.log("MongoDB connected...")).catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;