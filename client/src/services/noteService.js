// src/services/noteService.js

/**
 * Service for handling note-related API calls
 */
const API_URL = '/api/notes';

/**
 * Fetch all notes for the current user
 * @returns {Promise<Array>} A promise that resolves to an array of notes
 */
export const fetchNotes = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' // Important for sending cookies
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching notes: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    throw error;
  }
};

/**
 * Create a new note
 * @param {Object} noteData The note data to create
 * @returns {Promise<Object>} A promise that resolves to the created note
 */
export const createNote = async (noteData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteData),
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error(`Error creating note: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to create note:', error);
    throw error;
  }
};

/**
 * Update an existing note
 * @param {string} id The ID of the note to update
 * @param {Object} noteData The updated note data
 * @returns {Promise<Object>} A promise that resolves to the updated note
 */
export const updateNote = async (id, noteData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteData),
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error(`Error updating note: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to update note:', error);
    throw error;
  }
};

/**
 * Delete a note
 * @param {string} id The ID of the note to delete
 * @returns {Promise<void>} A promise that resolves when the note is deleted
 */
export const deleteNote = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error(`Error deleting note: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to delete note:', error);
    throw error;
  }
};

/**
 * Convert text to a structured note using AI
 * @param {string} text The text to convert
 * @returns {Promise<Object>} A promise that resolves to the AI-generated note
 */
export const convertTextWithAI = async (text) => {
  try {
    const response = await fetch('/api/ai/convert-note', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error(`Error converting text with AI: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to convert text with AI:', error);
    throw error;
  }
};

export default {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
  convertTextWithAI
};