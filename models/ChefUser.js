import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chefUserSchema = new Schema({
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

// static method to login chef
chefUserSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = password === user.password;
    if (auth) {
      return user;
    }
  }
  throw Error("Either your password or username is incorrect");
};

const chefUser = mongoose.model("chefuser", chefUserSchema);

export default chefUser;
