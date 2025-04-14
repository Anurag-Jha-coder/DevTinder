import express from 'express';

const app = express();

app.use("/users", (req, res, next) =>{
    console.log("1st Response");
    res.send("Response 1:");
    next();
},
(req, res, next) =>{
    console.log("2nd Response");
    // res.send("Response 2:");
},
 
)









app.listen(3000, () =>{
    console.log('Server is running on port 3000');
})