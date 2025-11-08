
import validator  from 'validator';
export const validateSignUpData = (req) =>{

    const {firstName , lastName, emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Enter firstname or lastname");
    }

    if(!validator.isEmail(emailId)){
        throw new Error("Enter a valid email address");
    }

    if(!validator.isStrongPassword(password)){
        throw new Error("Please Enter a strong Password")
    }

}

export const validateProfileUpdates = (req) => {
    const ALLOWED_UPDATES  = ['firstName', 'lastName', 'about', 'skill' ,'photoUrl', 'age', 'gender'];
    const updates = req.body;
    const isValidUpdate =Object.keys(updates).every((update) =>{
        return ALLOWED_UPDATES.includes(update);
    })
   

    return isValidUpdate ;

}

