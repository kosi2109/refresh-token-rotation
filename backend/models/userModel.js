const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        unique: true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    refresh_token : {
        type : String
    },
    role : {
        type : [String],
        default : ['user']
    }
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const genSalt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, genSalt)
})

const User = mongoose.model('User', userSchema)

module.exports = User;