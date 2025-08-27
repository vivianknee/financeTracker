const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

//defining the database cols for Users
const UserSchema = new mongoose.Schema(
    {
        fullName: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        profileImageUrl: {type: String, default: null},
    },
    { timestamps: true}
);

//hash password before saving
UserSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//compare passwords to check if a login attempt matches the stored hash
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);