// src/services/quizService.js

/**
 * Service for handling quiz-related API calls
 */
const API_URL = '/api/quizzes';

/**
 * Generate a quiz from text
 * @param {Object} quizData Data needed to generate a quiz
 * @param {string} quizData.content Text content to generate quiz from
 * @param {number} quizData.difficulty Difficulty level (1-5)
 * @param {Array<string>} quizData.types Array of question types
 * @param {number} quizData.count Number of questions to generate
 * @returns {Promise<Object>} A promise that resolves to the generated quiz
 */
export const generateQuizFromText = async (quizData) => {
  try {
    const response = await fetch(`${API_URL}/generate/text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(quizData)
    });
    
    if (!response.ok) {
      throw new Error(`Error generating quiz: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to generate quiz from text:', error);
    throw error;
  }
};

/**
 * Generate a quiz from a note
 * @param {Object} quizData Data needed to generate a quiz
 * @param {string} quizData.noteId ID of the note to generate quiz from
 * @param {number} quizData.difficulty Difficulty level (1-5)
 * @param {Array<string>} quizData.types Array of question types
 * @param {number} quizData.count Number of questions to generate
 * @returns {Promise<Object>} A promise that resolves to the generated quiz
 */
export const generateQuizFromNote = async (quizData) => {
  try {
    const response = await fetch(`${API_URL}/generate/note`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(quizData)
    });
    
    if (!response.ok) {
      throw new Error(`Error generating quiz: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to generate quiz from note:', error);
    throw error;
  }
};

/**
 * Generate a quiz using AI from a topic
 * @param {Object} quizData Data needed to generate a quiz
 * @param {string} quizData.topic Topic to generate quiz about
 * @param {number} quizData.difficulty Difficulty level (1-5)
 * @param {Array<string>} quizData.types Array of question types
 * @param {number} quizData.count Number of questions to generate
 * @returns {Promise<Object>} A promise that resolves to the generated quiz
 */
export const generateQuizFromAI = async (quizData) => {
  try {
    const response = await fetch(`${API_URL}/generate/ai`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(quizData)
    });
    
    if (!response.ok) {
      throw new Error(`Error generating quiz: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to generate quiz using AI:', error);
    throw error;
  }
};

/**
 * Save a quiz
 * @param {Object} quiz The quiz to save
 * @returns {Promise<Object>} A promise that resolves to the saved quiz
 */
export const saveQuiz = async (quiz) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(quiz)
    });
    
    if (!response.ok) {
      throw new Error(`Error saving quiz: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to save quiz:', error);
    throw error;
  }
};

/**
 * Get all quizzes for the current user
 * @returns {Promise<Array>} A promise that resolves to an array of quizzes
 */
export const fetchQuizzes = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching quizzes: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch quizzes:', error);
    throw error;
  }
};

export default {
  generateQuizFromText,
  generateQuizFromNote,
  generateQuizFromAI,
  saveQuiz,
  fetchQuizzes
};