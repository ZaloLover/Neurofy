// server/routes/notes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Note = require('../models/Note');

/**
 * @route   GET /api/notes
 * @desc    Get all notes for the current user
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   POST /api/notes
 * @desc    Create a new note
 * @access  Private
 */
router.post('/', auth, async (req, res) => {
  const { title, content, folder, tags } = req.body;

  try {
    const newNote = new Note({
      title: title || 'Untitled Note',
      content,
      folder: folder || 'Uncategorized',
      tags: tags || [],
      user: req.user.id
    });

    const note = await newNote.save();
    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET /api/notes/:id
 * @desc    Get a specific note by ID
 * @access  Private
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }
    
    // Make sure user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    res.json(note);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Note not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

/**
 * @route   PUT /api/notes/:id
 * @desc    Update a note
 * @access  Private
 */
router.put('/:id', auth, async (req, res) => {
  const { title, content, folder, tags } = req.body;

  // Build note object
  const noteFields = {};
  if (title !== undefined) noteFields.title = title;
  if (content !== undefined) noteFields.content = content;
  if (folder !== undefined) noteFields.folder = folder;
  if (tags !== undefined) noteFields.tags = tags;
  
  // Update updatedAt timestamp
  noteFields.updatedAt = Date.now();

  try {
    let note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ msg: 'Note not found' });

    // Make sure user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: noteFields },
      { new: true }
    );

    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   DELETE /api/notes/:id
 * @desc    Delete a note
 * @access  Private
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ msg: 'Note not found' });

    // Make sure user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Note.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Note removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET /api/notes/folders
 * @desc    Get all unique folders for the current user
 * @access  Private
 */
router.get('/folders', auth, async (req, res) => {
  try {
    const folders = await Note.distinct('folder', { user: req.user.id });
    res.json(['All Notes', ...folders]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   POST /api/notes/ai-convert
 * @desc    Convert text to structured note using AI
 * @access  Private
 */
router.post('/ai-convert', auth, async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ msg: 'Text is required' });
    }
    
    // Here you would integrate with an AI service (e.g., OpenAI API)
    // This is a simplified example
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate AI response
    const title = text.split('.')[0].trim().substring(0, 50);
    
    const structuredContent = `# ${title}\n\n` +
      `## Key Points\n\n` +
      `- ${text.split('.').slice(0, 1).join('.')}\n` +
      `- Additional insight extracted from your text\n` +
      `- Important concept identified\n\n` +
      `## Summary\n\n` +
      `${text}\n\n` +
      `## Action Items\n\n` +
      `- Follow up on key concepts\n` +
      `- Review material again later`;
    
    res.json({ 
      title, 
      content: structuredContent
    });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Make sure to export the router
module.exports = router;