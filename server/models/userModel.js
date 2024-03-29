const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nickname: {
        type:String,
    },
    name:{
        type:String,
    },
    email:{
        type:String,
        unquie:true,
    },
    password:{
        type:String,
    }
  },
  {
    collection: "Users",
  }
);

module.exports = mongoose.model("User", userSchema);
