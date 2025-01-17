const mongoose=require('mongoose')

const userSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
});

const UserModel=mongoose.model('UserModel',userSchema)
module.exports=UserModel