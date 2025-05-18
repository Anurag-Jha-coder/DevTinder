
import mongoose, {Schema} from "mongoose";

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
    },

    password:{
        type: String,
        require:true,
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
    },

    about:{
        type:String,
        default:"This is a default about the user "
    },

    skill:{
        type: [Stirng],
    }

},
{
    timestamps:true

}
);

export const User = mongoose.model("User", userSchema);

