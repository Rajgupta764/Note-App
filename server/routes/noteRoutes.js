import express from 'express';
import Note from '../models/note.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to verify token and get user id
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).json({ success: false, message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, "secretkeyofnoteapp123@3");
    req.userId = verified.id;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid Token' });
  }
};

// Get all notes for logged-in user
router.get('/', authenticate, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Create a new note
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and Description required' });
    }

    const newNote = new Note({
      user: req.userId,
      title,
      description
    });
    await newNote.save();

    res.status(201).json({ success: true, note: newNote });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Update a note
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { title, description } = req.body;

    const note = await Note.findOne({ _id: req.params.id, user: req.userId });
    if (!note) return res.status(404).json({ success: false, message: 'Note not found' });

    note.title = title || note.title;
    note.description = description || note.description;
    await note.save();

    res.json({ success: true, note });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Delete a note
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!note) return res.status(404).json({ success: false, message: 'Note not found' });

    res.json({ success: true, message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
