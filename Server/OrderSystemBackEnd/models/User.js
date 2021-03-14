const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }
  });
  
  userSchema.pre('save', function encryptPassword(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      // hash the password using our new salt
      bcrypt.hash(user.password, salt, (hashErr, hash) => {
        if (hashErr) return next(hashErr);
  
        // override the cleartext password with the hashed one
        user.password = hash;
        next();
      });
    });
  });
  
  userSchema.methods.comparePassword = function comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
  };
  
  userSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 10);
  
    let payload = {
        id: this._id,
        email: this.email,
        name: this.name,
        role: this.role,
        birthday: this.birthday,
        gender: this.gender,
        username: this.username
    };
  
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
    });
  };
  
  module.exports = mongoose.model('User', userSchema);