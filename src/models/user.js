
import mongoose, {Schema} from "mongoose";
import validator  from 'validator';
const {isStrongPassword}  = validator;
import isURL from "validator/lib/isURL.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    firstName:{
        type: String,
        require:true,
        minLength:4,
        maxLength:50,
    },
    lastName:{ 
        type: String,
    },
    emailId:{
        type: String,
        require:true,
        lowercase: true,
        unique:true,
        trim:true, 
        validate: (value) =>{
            if(!validator.isEmail(value)){
                throw new Error("Please enter a valid email")
            }
        }
    },

    password:{
        type: String,
        require:true,
         validate: (value)=>{
            if(!isStrongPassword(value)){
                throw new Error("please enter a strong password")
            }
        }
    }, 

    age:{
        type: Number,
        min:18,
    },
    
    gender:{
        type: String,
        validate: (value)=>{
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Please enter a valid gender")
            }
        }
    },

    photoUrl:{
        type:String,
        validate: (value)=>{
            if(!isURL(value)){
                throw new Error("Please enter a valid URL")
            }
        }
    },

    about:{
        type:String,
        default:"This is a default about the user "
    },

    skill:{
        type: [String],
    }

},
{
    timestamps:true

}
);



userSchema.methods.getJWT = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id} ,"Anurag@2002", {expiresIn:"7d"});
    return token;
}

userSchema.methods.isPasswordCorrect = async function(passwordInputByUser){
    const user = this;
    const hashPassword = user.password;

    const isCorrect = await bcrypt .compare(passwordInputByUser, hashPassword);

    return isCorrect;
}

export const User = mongoose.model("User", userSchema);

