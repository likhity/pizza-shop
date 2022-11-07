const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderProcessorSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    minLength: 4,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Password must have minimum length of 6 characters"],
  },
});

// static method to login order processor
orderProcessorSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = password === user.password;
    if (auth) {
      return user;
    }
  }
  throw Error("Either your password or username is incorrect");
};

const orderProcessor = mongoose.model("orderprocessor", orderProcessorSchema);

module.exports = orderProcessor;
