import mongoose from 'mongoose'

const userModel = new mongoose.Schema({
    username: {
        type: String,
        require: [ true, 'Please provied a username'],
        unique: true
    },
    email:{
       type : String,
       require: [true, "Please provide a email"],
       unique: true
    },
    password: {
        type: String,
        require: [true, 'Please provide a password']
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

export const  User = mongoose.models.users || mongoose.model("users", userModel)