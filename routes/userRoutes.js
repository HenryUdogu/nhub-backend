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
    const newUser = {
        id:Date.now(),


        ...req.body
    };

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

//update users
router.patch("/:id",(req,res) => {
    //get user from file
    const users = getUsers();
    //get user with id
    const id = Number(req.params.id);
    //find user with id
    const userIndex = users.findIndex(user => user.id === id);

    //check if user does not exist
    if (userIndex === -1) {
        return res.json({
            message: "User not found "
        });
    };
    //update user data
    users[userIndex] = {
        //keep existing data and update with new data from request body
        ...users[userIndex],
        //return all data from request body and overwrite existing data with same keys
        ...req.body
    };
    //save updated users to file
    saveUser(users);
    res.json({
        mesage: "Updated ssuccessfully",
        user: users[userIndex]
    });

});
//delete user
router.delete("/:id",(req,res) => {
    const users = getUsers();
    const id = Number(req.params.id);

    const userIndex = users.findIndex(user => this.use.id === id);

    if(userIndex === -1) {
        return res.json({
            message: "user not found"
        });
    }
    //remove user from array
    const deletedUser = users.splice(userIndex, 1)[0];

    saveUsers(users);

    res.json({
        message: "User deleted successfully",
        data: "deleted user"
    });
});
module.exports = router;