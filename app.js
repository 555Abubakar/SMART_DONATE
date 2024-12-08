const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

let users = [];  // Example user data in memory (for demonstration)

app.use(express.json());  // For parsing JSON requests

// POST route for user registration
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).send('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user (for demo, we are using in-memory storage)
    users.push({ email, password: hashedPassword });
    res.status(201).send('User registered successfully');
});

// POST route for user login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).send('Invalid credentials');
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).send('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });

    // Send token as response
    res.json({ token });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
