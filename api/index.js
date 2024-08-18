const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

// Use environment variables for sensitive data
const salt = bcrypt.genSaltSync(10);
const secret = '  8DyaILn1LnL4Ttql';

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://carolwargo:8DyaILn1LnL4Ttql@cluster0.llebq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

// Register
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  console.log('Received registration request with:', { username, password });

  // Check for missing fields
  if (!username || !password) {
    console.error('Registration failed: Missing username or password');
    return res.status(400).json('Missing username or password');
  }

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.error('Registration failed: Username already taken');
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Create new user
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    console.log('User created successfully:', userDoc);
    res.json(userDoc);
  } catch (e) {
    console.error('Error during registration:', e);
    res.status(500).json('Registration failed');
  }
});

// Login
app.post('/login', async (req, res) => {
  console.log('Login endpoint hit:', req.body);
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      console.log('User not found');
      return res.status(400).json('User not found');
    }
    
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      console.log('Password matched, generating token...');
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) {
          console.error('Error generating token:', err);
          throw err;
        }
        console.log('Token generated:', token);
        res.cookie('token', token).json({
          id: userDoc._id,
          username,
        });
      });
    } else {
      console.log('Wrong credentials');
      res.status(400).json('Wrong credentials');
    }
  } catch (e) {
    console.error('Error during login:', e);
    res.status(500).json('Server error');
  }
});

// Get profile
app.get('/profile', (req, res) => {
  console.log('Profile endpoint hit');
  const { token } = req.cookies;
  console.log('Token received:', token);
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      console.error('Invalid token:', err);
      return res.status(401).json('Invalid token');
    }
    console.log('Token verified, user info:', info);
    res.json(info);
  });
});

// Logout
app.post('/logout', (req, res) => {
  console.log('Logout endpoint hit');
  res.cookie('token', '', { expires: new Date(0) }).json('ok');
});

// Create post
app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  console.log('Create post endpoint hit:', req.body);
  const { originalname, path } = req.file;
  console.log('File uploaded:', originalname, path);
  const ext = originalname.split('.').pop();
  const newPath = `${path}.${ext}`;
  fs.renameSync(path, newPath);
  console.log('File renamed to:', newPath);

  const { token } = req.cookies;
  console.log('Token received:', token);
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
      console.error('Invalid token:', err);
      return res.status(401).json('Invalid token');
    }
    console.log('Token verified, user info:', info);
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    console.log('Post created:', postDoc);
    res.json(postDoc);
  });
});

// Update post
app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
  console.log('Update post endpoint hit:', req.body);
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    console.log('File uploaded for update:', originalname, path);
    const ext = originalname.split('.').pop();
    newPath = `${path}.${ext}`;
    fs.renameSync(path, newPath);
    console.log('File renamed to:', newPath);
  }

  const { token } = req.cookies;
  console.log('Token received:', token);
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
      console.error('Invalid token:', err);
      return res.status(401).json('Invalid token');
    }
    console.log('Token verified, user info:', info);
    const { id, title, summary, content } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('Invalid post ID:', id);
      return res.status(400).json('Invalid post ID');
    }

    const postDoc = await Post.findById(id);
    if (!postDoc) {
      console.error('Post not found:', id);
      return res.status(404).json('Post not found');
    }

    const isAuthor = postDoc.author.toString() === info.id.toString();
    if (!isAuthor) {
      console.error('User is not the author:', info.id);
      return res.status(403).json('You are not the author');
    }

    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath || postDoc.cover,
    });

    console.log('Post updated:', postDoc);
    res.json(postDoc);
  });
});

// Get all posts
app.get('/post', async (req, res) => {
  console.log('Get all posts endpoint hit');
  try {
    const posts = await Post.find()
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .limit(20);
    console.log('Posts fetched:', posts);
    res.json(posts);
  } catch (e) {
    console.error('Error fetching posts:', e);
    res.status(500).json('Server error');
  }
});

// Get post by ID
app.get('/post/:id', async (req, res) => {
  console.log('Get post by ID endpoint hit:', req.params.id);
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error('Invalid post ID:', id);
    return res.status(400).json('Invalid post ID');
  }
  
  try {
    const postDoc = await Post.findById(id).populate('author', ['username']);
    if (!postDoc) {
      console.error('Post not found:', id);
      return res.status(404).json('Post not found');
    }
    console.log('Post fetched:', postDoc);
    res.json(postDoc);
  } catch (e) {
    console.error('Error fetching post by ID:', e);
    res.status(500).json('Server error');
  }
});

// Start server
app.listen(4000, () => console.log('Server running on port 4000'));
