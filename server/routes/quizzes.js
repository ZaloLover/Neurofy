// Example Express route file for handling quiz operations (server-side)
// This would be placed in your backend structure, e.g., /routes/quizzes.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Quiz = require('../models/Quiz');
const Note = require('../models/Note');

/**
 * @route   POST /api/quizzes/generate/text
 * @desc    Generate a quiz from text
 * @access  Private
 */
router.post('/generate/text', auth, async (req, res) => {
  try {
    const { content, difficulty, types, count } = req.body;
    
    if (!content) {
      return res.status(400).json({ msg: 'Content is required' });
    }
    
    // In a real application, you would use an AI service or NLP library
    // to analyze the text and generate appropriate questions
    
    // For demo purposes, we'll create a simple quiz with mock questions
    const quiz = generateMockQuiz(
      `Quiz on ${content.split(' ').slice(0, 3).join(' ')}...`,
      difficulty,
      types,
      count
    );
    
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   POST /api/quizzes/generate/note
 * @desc    Generate a quiz from a note
 * @access  Private
 */
router.post('/generate/note', auth, async (req, res) => {
  try {
    const { noteId, difficulty, types, count } = req.body;
    
    if (!noteId) {
      return res.status(400).json({ msg: 'Note ID is required' });
    }
    
    // Find the note
    const note = await Note.findById(noteId);
    
    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }
    
    // Make sure user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    // Generate a quiz from the note content
    const quiz = generateMockQuiz(
      `Quiz on ${note.title}`,
      difficulty,
      types,
      count
    );
    
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   POST /api/quizzes/generate/ai
 * @desc    Generate a quiz using AI from a topic
 * @access  Private
 */
router.post('/generate/ai', auth, async (req, res) => {
  try {
    const { topic, difficulty, types, count } = req.body;
    
    if (!topic) {
      return res.status(400).json({ msg: 'Topic is required' });
    }
    
    // In a real application, you would call an AI service (like OpenAI)
    // to generate a quiz based on the topic
    
    // For demo purposes, we'll create a quiz with mock questions
    const quiz = generateMockQuiz(
      `Quiz on ${topic}`,
      difficulty,
      types,
      count
    );
    
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   POST /api/quizzes
 * @desc    Save a quiz
 * @access  Private
 */
router.post('/', auth, async (req, res) => {
  try {
    const { title, questions } = req.body;
    
    const newQuiz = new Quiz({
      title,
      questions,
      user: req.user.id
    });
    
    const quiz = await newQuiz.save();
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET /api/quizzes
 * @desc    Get all quizzes for user
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ user: req.user.id }).sort({ date: -1 });
    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET /api/quizzes/:id
 * @desc    Get quiz by ID
 * @access  Private
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({ msg: 'Quiz not found' });
    }
    
    // Make sure user owns the quiz
    if (quiz.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    res.json(quiz);
  } catch (err) {
    console.error(err);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Quiz not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

/**
 * @route   DELETE /api/quizzes/:id
 * @desc    Delete a quiz
 * @access  Private
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({ msg: 'Quiz not found' });
    }
    
    // Make sure user owns the quiz
    if (quiz.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    await quiz.remove();
    
    res.json({ msg: 'Quiz removed' });
  } catch (err) {
    console.error(err);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Quiz not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

// Helper function to generate mock quizzes (for demo purposes)
const generateMockQuiz = (title, difficulty, types, count) => {
  const QUIZ_TYPES = {
    MULTIPLE_CHOICE: 'multiple_choice',
    TRUE_FALSE: 'true_false',
    SHORT_ANSWER: 'short_answer',
    MATCHING: 'matching'
  };
  
  const quiz = {
    title,
    questions: []
  };
  
  // Generate mock questions based on selected types
  for (let i = 0; i < count; i++) {
    // Distribute question types evenly
    const type = types[i % types.length];
    
    switch (type) {
      case QUIZ_TYPES.MULTIPLE_CHOICE:
        quiz.questions.push({
          id: i + 1,
          type: QUIZ_TYPES.MULTIPLE_CHOICE,
          text: `Sample multiple choice question #${i + 1} (Difficulty: ${difficulty})`,
          options: [
            { id: 'a', text: 'Option A' },
            { id: 'b', text: 'Option B' },
            { id: 'c', text: 'Option C' },
            { id: 'd', text: 'Option D' }
          ],
          correctAnswer: 'a'
        });
        break;
        
      case QUIZ_TYPES.TRUE_FALSE:
        quiz.questions.push({
          id: i + 1,
          type: QUIZ_TYPES.TRUE_FALSE,
          text: `Sample true/false statement #${i + 1} (Difficulty: ${difficulty})`,
          options: [
            { id: 'true', text: 'True' },
            { id: 'false', text: 'False' }
          ],
          correctAnswer: 'true'
        });
        break;
        
      case QUIZ_TYPES.SHORT_ANSWER:
        quiz.questions.push({
          id: i + 1,
          type: QUIZ_TYPES.SHORT_ANSWER,
          text: `Sample short answer question #${i + 1} (Difficulty: ${difficulty})`,
          correctAnswer: 'Sample answer'
        });
        break;
        
      case QUIZ_TYPES.MATCHING:
        quiz.questions.push({
          id: i + 1,
          type: QUIZ_TYPES.MATCHING,
          text: `Match the following items (Difficulty: ${difficulty})`,
          items: [
            { id: 1, text: 'Item 1' },
            { id: 2, text: 'Item 2' },
            { id: 3, text: 'Item 3' }
          ],
          matches: [
            { id: 'a', text: 'Match A' },
            { id: 'b', text: 'Match B' },
            { id: 'c', text: 'Match C' }
          ],
          correctAnswers: { '1': 'a', '2': 'b', '3': 'c' }
        });
        break;
        
      default:
        break;
    }
  }
  
  return quiz;
};

module.exports = router;