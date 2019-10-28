const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    }, email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [isEmail, 'Please fill a valid email address']
    }, password: {
        type: String,
        required: true,
        minlength: [3, 'Password minimum length is 3 characters'],
        trim: true
    }, tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

userSchema.methods.generateToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, process.env.privateKEY);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token
};

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    return userObject
};

userSchema.statics.findByEmail = async (email, password) => {
    const user = await User.findOne({email});
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
};

userSchema.pre('save', async function (next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        next()
    } else {
        return next()
    }
});


const User = mongoose.model('User', userSchema);
module.exports = User;
