const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [];

app.get('/users', (req, res) => {
    res.status(200).json({
        message: "Users retrieved successfully",
        data: users
    });
});


app.post('/users', (req, res) => {
    const newUser = req.body;

    
    if (!newUser.id || !newUser.name || !newUser.role) {
        return res.status(400).json({ 
            error: "Syntactic Validation Failed: 'id', 'name', and 'role' fields are required." 
        });
    }

   
    const userExists = users.find(u => u.id === newUser.id);
    if (userExists) {
        return res.status(400).json({ 
            error: "Semantic Validation Failed: A user with this ID already exists." 
        });
    }

    users.push(newUser);

    res.status(201).json({
        message: "User created successfully",
        data: newUser
    });
});

app.listen(PORT, () => {
    console.log(`Project 2 Server is running on http://localhost:${PORT}`);
});