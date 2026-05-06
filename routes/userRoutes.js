const express = require("express")
const router = express.Router();
const fs = require("fs");


function saveUser(users) {
    fs.writeFileSync("user.json",JSON.stringify(users,null,2));
}

//get users from file
function getUser() {
    const data = fs.readFileSync("user.json");
    return JSON.parse(data);
}


//temp data storage for users
// let users = [];

//get all users
// router.get("/", (req,res) => {
//     res.json(users);
// })
// //post: create users
// router.post("/",(req, res) => {
//     const user = req.body;
//     users.push(user);

//     res.json({
//         message: "user added",
//         users
//     })
// });
router.get("/",(req,res) => {
    const users = getUser();
    res.json({
        totalUsers : users.length,
        users
    });
});
//create a new user
router.post("/", (req,res) => {
    const {name,age,email} = req.body;

    if (!name || !age || !email) {
        return res.json({
            message: "Validation failed",
            error: {
                ...(!name && {name: "Name is required"}),
                ...(!age && { age: "Age is required"}),
                ...(!email && {email: "Email is equired"}),
            }
        });
    }
    const users = getUser();
    const newUser = {name,age,email};

    //push new users  to users array and save to file
    users.push(newUser);
    saveUser(users);

    //send response back to client
    res.json({
        message: "user added",
        users
    });
});
//this is use to export the router to be used in other files such as sever.js
module.exports = router;