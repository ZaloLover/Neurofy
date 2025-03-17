// models/Note.js
const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  title: {
    type: String,
    required: true,
    default: 'Untitled Note'
  },
  content: {
    type: String,
    required: true
  },
  folder: {
    type: String,
    default: 'Uncategorized'
  },
  tags: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual property for preview text
NoteSchema.virtual('preview').get(function() {
  // Return first 100 characters of content as preview
  return this.content.length > 100 
    ? this.content.substring(0, 100) + '...' 
    : this.content;
});

// Ensure virtuals are included when converting to JSON
NoteSchema.set('toJSON', { virtuals: true });
NoteSchema.set('toObject', { virtuals: true });

// Create a text index for searching
NoteSchema.index({ 
  title: 'text', 
  content: 'text',
  tags: 'text' 
});

module.exports = mongoose.model('note', NoteSchema);