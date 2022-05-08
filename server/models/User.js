const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// schema corresponding to the document interface
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  matters: [{ type: Schema.Types.ObjectId, ref: "Matter" }],
});

UserSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
  }

  next();
});

UserSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("User", UserSchema);

module.exports = User;
