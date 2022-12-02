import mongoose from "mongoose";

const Schema = mongoose.Schema;

const studentUserSchema = new Schema({
  asuID: {
    type: String,
    required: [true, "Please enter an ASURITE ID"],
    unique: true,
  },
});

// static method to login user
studentUserSchema.statics.login = async function (asuID) {
  const user = await this.findOne({ asuID });
  if (user) {
    return user;
  }
  throw Error("Your ASURITE ID is incorrect");
};

const StudentUser = mongoose.model("studentuser", studentUserSchema);

export default StudentUser;
