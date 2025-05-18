
import mongoose, {Schema} from "mongoose";
import validator, { isStrongPassword } from 'validator';
import isURL from "validator/lib/isURL";

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

export const User = mongoose.model("User", userSchema);

