const express = require('express');
const asyncHandler = require('express-async-handler');
// const bcrypt = require('bcryptjs')
const router = express.Router();
const User = require('../model/user');

// Get all users
router.get('/', asyncHandler(async(req, res) => {
    try {
        const users = await User.find();
        res.json({ success: true, message: "Users retrieved successfully.", data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));

// login
router.post('/login', async(req, res) => {
    const { name, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ name });


        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password." });
        }
        // Check if the password is correct
        if (user.password !== password) {
            return res.status(401).json({ success: false, message: "Invalid email or password." });
        }

        // Authentication successful
        res.status(200).json({ success: true, message: "Login successful.", data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// test 


/*


router.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    // Vérifiez si l'utilisateur existe
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid name or password." });
    }

    // Comparaison sécurisée du mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid name or password." });
    }

    // Authentification réussie
    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: { id: user._id, name: user.name },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


*/

/*

const bcrypt = require('bcrypt');

router.post('/register', asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({
      success: false,
      message: "Name and password are required.",
    });
  }

  try {
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this name already exists. Please choose another name.",
      });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, password: hashedPassword });
    const newUser = await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: { id: newUser._id, name: newUser.name },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}));


*/





module.exports = router;



// Get a user by ID
router.get('/:id', asyncHandler(async(req, res) => {
    try {
        const userID = req.params.id;
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        res.json({ success: true, message: "User retrieved successfully.", data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));


// Create a new user
router.post('/register', asyncHandler(async(req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
        return res.status(400).json({ success: false, message: "Email, and password are required." });
    }

    try {
        const user = new User({ name, password });
        const newUser = await user.save();
        res.json({ success: true, message: "User created successfully.", data: null });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));




// test  sans hash mot de pass 

/*

router.post('/register', asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  // Vérification des champs obligatoires
  if (!name || !password) {
    return res.status(400).json({
      success: false,
      message: "Name and password are required.",
    });
  }

  try {
    // Vérifiez si un utilisateur avec le même name existe déjà
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this name already exists. Please choose another name.",
      });
    }

    // Créez un nouvel utilisateur
    const user = new User({ name, password });
    const newUser = await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: { id: newUser._id, name: newUser.name },
    });
  } catch (error) {
    // Gestion des erreurs MongoDB (notamment duplicate key error)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate entry: This name is already taken.",
      });
    }

    res.status(500).json({
      success: false,
      message: "An error occurred while creating the user.",
      error: error.message,
    });
  }
}));

*/




  




// Update a user
router.put('/:id', asyncHandler(async(req, res) => {
    try {
        const userID = req.params.id;
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(400).json({ success: false, message: "Email,  and password are required." });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userID, { name, password }, { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        res.json({ success: true, message: "User updated successfully.", data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));

// Delete a user
router.delete('/:id', asyncHandler(async(req, res) => {
    try {
        const userID = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userID);
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        res.json({ success: true, message: "User deleted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));

module.exports = router;