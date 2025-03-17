// src/components/dashboard/study-tools/QuizGenerator.jsx
import { useState, useEffect, useRef } from 'react';

// SVG Icons (embedded directly to avoid lucide-react dependency issues)
const icons = {
  brain: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54Z"></path>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54Z"></path>
    </svg>
  ),
  plus: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  search: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  sparkles: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v5m0 4v9M5 8l2.5 2.5M16.5 10.5L19 13M3 17h4m10 0h4M8 3l-3 3m14-3l3 3M8 21l-3-3m14 3l3-3"></path>
    </svg>
  ),
  clipboard: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
    </svg>
  ),
  check: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
  close: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  chevronRight: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  ),
  settings: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  ),
  fileText: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  ),
  checkSquare: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 11 12 14 22 4"></polyline>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
    </svg>
  ),
  circle: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
    </svg>
  ),
  checkCircle: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  ),
  refreshCw: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2v6h-6"></path>
      <path d="M3 12a9 9 0 0 1 15-6.7l3 2.7"></path>
      <path d="M3 22v-6h6"></path>
      <path d="M21 12a9 9 0 0 1-15 6.7l-3-2.7"></path>
    </svg>
  ),
  save: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
      <polyline points="17 21 17 13 7 13 7 21"></polyline>
      <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
  )
};

// Quiz question types
const QUIZ_TYPES = {
  MULTIPLE_CHOICE: 'multiple_choice',
  TRUE_FALSE: 'true_false',
  SHORT_ANSWER: 'short_answer',
  MATCHING: 'matching'
};

const QuizGenerator = () => {
  // State management
  const [inputType, setInputType] = useState('text'); // 'text', 'note', 'ai'
  const [inputText, setInputText] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState(3);
  const [questionTypes, setQuestionTypes] = useState([
    QUIZ_TYPES.MULTIPLE_CHOICE,
    QUIZ_TYPES.TRUE_FALSE
  ]);
  const [questionCount, setQuestionCount] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState(null);
  const [activeStep, setActiveStep] = useState('input'); // 'input', 'quiz', 'results'
  const [userAnswers, setUserAnswers] = useState({});
  const [showingResults, setShowingResults] = useState(false);
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);
  
  // Refs
  const textareaRef = useRef(null);
  
  // Fetch notes from server
  useEffect(() => {
    const fetchNotes = async () => {
      if (inputType === 'note') {
        setIsLoadingNotes(true);
        try {
          // In a real app, this would be an API call
          // Mocking data for now
          await new Promise(resolve => setTimeout(resolve, 1000));
          const mockNotes = [
            { _id: 1, title: "Biology 101", content: "Cell structure, DNA, RNA..." },
            { _id: 2, title: "History Notes", content: "World War II, Cold War..." },
            { _id: 3, title: "Math Formulas", content: "Algebra, Calculus..." }
          ];
          setNotes(mockNotes);
        } catch (error) {
          console.error("Error fetching notes:", error);
        } finally {
          setIsLoadingNotes(false);
        }
      }
    };
    
    fetchNotes();
  }, [inputType]);
  
  // Mock function to simulate generating a quiz
  const generateQuiz = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Get content based on input type
      let content = "";
      if (inputType === 'text') {
        content = inputText;
      } else if (inputType === 'note') {
        const selectedNote = notes.find(note => note._id === selectedNoteId);
        content = selectedNote ? selectedNote.content : "";
      } else if (inputType === 'ai') {
        content = aiPrompt;
      }
      
      // Create mock quiz based on difficulty and question types
      const quiz = {
        title: inputType === 'note' 
          ? `Quiz on ${notes.find(note => note._id === selectedNoteId)?.title || 'Selected Note'}` 
          : `Quiz on ${content.split(' ').slice(0, 3).join(' ')}...`,
        questions: []
      };
      
      // Generate mock questions based on selected types
      for (let i = 0; i < questionCount; i++) {
        // Distribute question types evenly
        const type = questionTypes[i % questionTypes.length];
        
        switch (type) {
          case QUIZ_TYPES.MULTIPLE_CHOICE:
            quiz.questions.push({
              id: i + 1,
              type: QUIZ_TYPES.MULTIPLE_CHOICE,
              text: `Sample multiple choice question #${i + 1} (Difficulty: ${difficultyLevel})`,
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
              text: `Sample true/false statement #${i + 1} (Difficulty: ${difficultyLevel})`,
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
              text: `Sample short answer question #${i + 1} (Difficulty: ${difficultyLevel})`,
              correctAnswer: 'Sample answer'
            });
            break;
            
          case QUIZ_TYPES.MATCHING:
            quiz.questions.push({
              id: i + 1,
              type: QUIZ_TYPES.MATCHING,
              text: `Match the following items (Difficulty: ${difficultyLevel})`,
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
      
      setGeneratedQuiz(quiz);
      setActiveStep('quiz');
      // Initialize empty user answers
      const initialAnswers = {};
      quiz.questions.forEach(q => {
        if (q.type === QUIZ_TYPES.MATCHING) {
          initialAnswers[q.id] = {};
          q.items.forEach(item => {
            initialAnswers[q.id][item.id] = null;
          });
        } else {
          initialAnswers[q.id] = null;
        }
      });
      setUserAnswers(initialAnswers);
    } catch (error) {
      console.error("Error generating quiz:", error);
      alert("Failed to generate quiz. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Handle answer changes
  const handleAnswerChange = (questionId, answer, matchId = null) => {
    if (matchId !== null) {
      // For matching questions
      setUserAnswers({
        ...userAnswers,
        [questionId]: {
          ...userAnswers[questionId],
          [matchId]: answer
        }
      });
    } else {
      // For other question types
      setUserAnswers({
        ...userAnswers,
        [questionId]: answer
      });
    }
  };
  
  // Submit quiz and show results
  const submitQuiz = () => {
    setShowingResults(true);
  };
  
  // Reset the quiz
  const resetQuiz = () => {
    setActiveStep('input');
    setGeneratedQuiz(null);
    setUserAnswers({});
    setShowingResults(false);
  };
  
  // Start a new quiz
  const startNewQuiz = () => {
    resetQuiz();
    setInputText('');
    setAiPrompt('');
    setSelectedNoteId(null);
  };
  
  // Calculate quiz score
  const calculateScore = () => {
    if (!generatedQuiz || !showingResults) return 0;
    
    let correctCount = 0;
    let totalQuestions = generatedQuiz.questions.length;
    
    generatedQuiz.questions.forEach(question => {
      if (question.type === QUIZ_TYPES.MATCHING) {
        let allMatchesCorrect = true;
        Object.entries(question.correctAnswers).forEach(([itemId, correctMatch]) => {
          if (userAnswers[question.id][itemId] !== correctMatch) {
            allMatchesCorrect = false;
          }
        });
        if (allMatchesCorrect) correctCount++;
      } else {
        if (userAnswers[question.id] === question.correctAnswer) {
          correctCount++;
        }
      }
    });
    
    return {
      correct: correctCount,
      total: totalQuestions,
      percentage: Math.round((correctCount / totalQuestions) * 100)
    };
  };
  
  // Toggle question type selection
  const toggleQuestionType = (type) => {
    if (questionTypes.includes(type)) {
      // Remove if already selected (but ensure at least one type remains)
      if (questionTypes.length > 1) {
        setQuestionTypes(questionTypes.filter(t => t !== type));
      }
    } else {
      // Add if not selected
      setQuestionTypes([...questionTypes, type]);
    }
  };
  
  // Styles object for consistent styling
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      maxWidth: '100%',
      color: 'white'
    },
    header: {
      marginBottom: '0.5rem'
    },
    heading: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '0.5rem'
    },
    subHeading: {
      color: '#a0aec0',
      fontSize: '0.875rem'
    },
    card: {
      backgroundColor: '#1e1e1e',
      borderRadius: '0.5rem',
      padding: '1.25rem',
      border: '1px solid #2d3748',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
    },
    tabContainer: {
      display: 'flex',
      borderBottom: '1px solid #2d3748',
      marginBottom: '1.5rem'
    },
    tab: {
      padding: '0.75rem 1rem',
      cursor: 'pointer',
      fontWeight: '500',
      color: '#a0aec0',
      borderBottom: '2px solid transparent'
    },
    activeTab: {
      color: '#a78bfa',
      borderBottom: '2px solid #a78bfa'
    },
    textarea: {
      width: '100%',
      minHeight: '200px',
      backgroundColor: '#2d2d2d',
      border: '1px solid #4a5568',
      borderRadius: '0.375rem',
      padding: '0.75rem',
      color: 'white',
      fontSize: '0.875rem',
      resize: 'vertical',
      marginBottom: '1.5rem'
    },
    input: {
      width: '100%',
      backgroundColor: '#2d2d2d',
      border: '1px solid #4a5568',
      borderRadius: '0.375rem',
      padding: '0.75rem',
      color: 'white',
      fontSize: '0.875rem',
      marginBottom: '1.5rem'
    },
    difficultyContainer: {
      marginBottom: '1.5rem'
    },
    difficultyLabel: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '0.875rem',
      color: '#a0aec0',
      marginBottom: '0.5rem'
    },
    sliderContainer: {
      position: 'relative',
      height: '1.5rem'
    },
    slider: {
      appearance: 'none',
      width: '100%',
      height: '0.5rem',
      borderRadius: '9999px',
      background: 'linear-gradient(to right, #805ad5, #6d28d9)',
      outline: 'none',
      opacity: '0.7',
      transition: 'opacity .2s'
    },
    difficultyMarkers: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '0.5rem',
      paddingLeft: '0.25rem',
      paddingRight: '0.25rem'
    },
    difficultyMarker: {
      fontSize: '0.75rem',
      color: '#a0aec0'
    },
    optionsContainer: {
      marginBottom: '1.5rem'
    },
    optionsHeader: {
      fontSize: '0.875rem',
      color: '#a0aec0',
      marginBottom: '0.75rem'
    },
    optionsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '0.75rem'
    },
    optionItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.75rem',
      backgroundColor: '#2d2d2d',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    optionItemSelected: {
      backgroundColor: 'rgba(109, 40, 217, 0.3)',
      border: '1px solid #6d28d9'
    },
    optionIcon: {
      marginRight: '0.75rem',
      color: '#a78bfa'
    },
    optionText: {
      fontSize: '0.875rem',
      color: 'white'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '1rem',
      marginTop: '1rem'
    },
    button: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      border: 'none'
    },
    primaryButton: {
      backgroundColor: '#6d28d9',
      color: 'white'
    },
    secondaryButton: {
      backgroundColor: '#4a5568',
      color: 'white'
    },
    generateButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#6d28d9',
      color: 'white',
      border: 'none',
      borderRadius: '0.375rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    disabledButton: {
      opacity: 0.7,
      cursor: 'not-allowed'
    },
    loadingSpinner: {
      marginRight: '0.5rem',
      display: 'inline-block',
      width: '1rem',
      height: '1rem',
      border: '2px solid currentColor',
      borderRadius: '50%',
      borderRightColor: 'transparent',
      animation: 'spin 1s linear infinite'
    },
    notesList: {
      maxHeight: '300px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      marginBottom: '1.5rem'
    },
    noteItem: {
      padding: '0.75rem',
      backgroundColor: '#2d2d2d',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    selectedNoteItem: {
      backgroundColor: 'rgba(109, 40, 217, 0.3)',
      border: '1px solid #6d28d9'
    },
    noteTitle: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: 'white',
      marginBottom: '0.25rem'
    },
    notePreview: {
      fontSize: '0.75rem',
      color: '#a0aec0',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    quizContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    quizTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: 'white',
      marginBottom: '0.5rem',
      paddingBottom: '0.5rem',
      borderBottom: '1px solid #2d3748'
    },
    questionCard: {
      backgroundColor: '#1e1e1e',
      borderRadius: '0.5rem',
      padding: '1.25rem',
      border: '1px solid #2d3748'
    },
    questionNumber: {
      fontSize: '0.75rem',
      color: '#a78bfa',
      marginBottom: '0.5rem'
    },
    questionText: {
      fontSize: '1rem',
      color: 'white',
      marginBottom: '1rem'
    },
    answerOptions: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    },
    answerOption: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.75rem',
      backgroundColor: '#2d2d2d',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    selectedOption: {
      backgroundColor: 'rgba(109, 40, 217, 0.3)',
      border: '1px solid #6d28d9'
    },
    correctOption: {
      backgroundColor: 'rgba(72, 187, 120, 0.3)',
      border: '1px solid #48bb78'
    },
    incorrectOption: {
      backgroundColor: 'rgba(245, 101, 101, 0.3)',
      border: '1px solid #f56565'
    },
    answerOptionText: {
      marginLeft: '0.75rem'
    },
    shortAnswerInput: {
      width: '100%',
      backgroundColor: '#2d2d2d',
      border: '1px solid #4a5568',
      borderRadius: '0.375rem',
      padding: '0.75rem',
      color: 'white',
      fontSize: '0.875rem'
    },
    matchingContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem'
    },
    matchingItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.75rem',
      backgroundColor: '#2d2d2d',
      borderRadius: '0.375rem',
      marginBottom: '0.5rem'
    },
    matchingText: {
      fontSize: '0.875rem',
      color: 'white'
    },
    matchingSelect: {
      backgroundColor: '#1e1e1e',
      border: '1px solid #4a5568',
      borderRadius: '0.25rem',
      padding: '0.25rem 0.5rem',
      color: 'white',
      fontSize: '0.875rem'
    },
    resultsContainer: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    scoreCard: {
      backgroundColor: '#2d2d2d',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      display: 'inline-block',
      marginBottom: '1.5rem'
    },
    scoreText: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#a78bfa',
      marginBottom: '0.5rem'
    },
    scoreDetails: {
      fontSize: '0.875rem',
      color: '#a0aec0'
    },
    countContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1.5rem'
    },
    countLabel: {
      fontSize: '0.875rem',
      color: '#a0aec0',
      marginRight: '0.5rem'
    },
    countButtons: {
      display: 'flex',
      alignItems: 'center'
    },
    countButton: {
      width: '2rem',
      height: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #4a5568',
      backgroundColor: '#2d2d2d',
      color: 'white',
      borderRadius: '0.25rem',
      cursor: 'pointer'
    },
    countValue: {
      padding: '0 1rem',
      fontSize: '0.875rem',
      color: 'white'
    }
  };

  // Render Input Step
  const renderInputStep = () => (
    <div style={styles.card}>
      <div style={styles.tabContainer}>
        <div 
          style={{ 
            ...styles.tab, 
            ...(inputType === 'text' ? styles.activeTab : {}) 
          }}
          onClick={() => setInputType('text')}
        >
          Text Input
        </div>
        <div 
          style={{ 
            ...styles.tab, 
            ...(inputType === 'note' ? styles.activeTab : {}) 
          }}
          onClick={() => setInputType('note')}
        >
          From Notes
        </div>
        <div 
          style={{ 
            ...styles.tab, 
            ...(inputType === 'ai' ? styles.activeTab : {}) 
          }}
          onClick={() => setInputType('ai')}
        >
          AI Generated
        </div>
      </div>
      
      {inputType === 'text' && (
        <div>
          <textarea 
            ref={textareaRef}
            placeholder="Paste or type your study material here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={styles.textarea}
          />
        </div>
      )}
      
      {inputType === 'note' && (
        <div>
          {isLoadingNotes ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ marginBottom: '1rem' }}>Loading your notes...</div>
            </div>
          ) : notes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ marginBottom: '1rem' }}>You don't have any notes yet.</div>
              <button 
                style={{ ...styles.button, ...styles.primaryButton }}
                onClick={() => setInputType('text')}
              >
                Switch to Text Input
              </button>
            </div>
          ) : (
            <div style={styles.notesList}>
              {notes.map(note => (
                <div 
                  key={note._id}
                  style={{ 
                    ...styles.noteItem, 
                    ...(selectedNoteId === note._id ? styles.selectedNoteItem : {}) 
                  }}
                  onClick={() => setSelectedNoteId(note._id)}
                >
                  <div style={styles.noteTitle}>{note.title}</div>
                  <div style={styles.notePreview}>{note.content}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {inputType === 'ai' && (
        <div>
          <input 
            type="text"
            placeholder="Enter a topic or subject for the AI to generate a quiz about..."
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            style={styles.input}
          />
          <div style={{ fontSize: '0.875rem', color: '#a0aec0', marginBottom: '1rem' }}>
            Example: "World War II", "Cell Biology", "Shakespeare's Macbeth"
          </div>
        </div>
      )}
      
      <div style={styles.difficultyContainer}>
        <div style={styles.difficultyLabel}>
          <span>Difficulty Level</span>
          <span>{difficultyLevel} / 5</span>
        </div>
        <div style={styles.sliderContainer}>
          <input 
            type="range"
            min="1"
            max="5"
            value={difficultyLevel}
            onChange={(e) => setDifficultyLevel(parseInt(e.target.value))}
            style={styles.slider}
          />
        </div>
        <div style={styles.difficultyMarkers}>
          <span style={styles.difficultyMarker}>Easy</span>
          <span style={styles.difficultyMarker}></span>
          <span style={styles.difficultyMarker}></span>
          <span style={styles.difficultyMarker}></span>
          <span style={styles.difficultyMarker}>Hard</span>
        </div>
      </div>
      
      <div style={styles.optionsContainer}>
        <div style={styles.optionsHeader}>Question Types</div>
        <div style={styles.optionsGrid}>
          <div 
            style={{ 
              ...styles.optionItem, 
              ...(questionTypes.includes(QUIZ_TYPES.MULTIPLE_CHOICE) ? styles.optionItemSelected : {}) 
            }}
            onClick={() => toggleQuestionType(QUIZ_TYPES.MULTIPLE_CHOICE)}
          >
            <span style={styles.optionIcon}>{icons.checkCircle}</span>
            <span style={styles.optionText}>Multiple Choice</span>
          </div>
          <div 
            style={{ 
              ...styles.optionItem, 
              ...(questionTypes.includes(QUIZ_TYPES.TRUE_FALSE) ? styles.optionItemSelected : {}) 
            }}
            onClick={() => toggleQuestionType(QUIZ_TYPES.TRUE_FALSE)}
          >
            <span style={styles.optionIcon}>{icons.checkSquare}</span>
            <span style={styles.optionText}>True/False</span>
          </div>
          <div 
            style={{ 
              ...styles.optionItem, 
              ...(questionTypes.includes(QUIZ_TYPES.SHORT_ANSWER) ? styles.optionItemSelected : {}) 
            }}
            onClick={() => toggleQuestionType(QUIZ_TYPES.SHORT_ANSWER)}
          >
            <span style={styles.optionIcon}>{icons.fileText}</span>
            <span style={styles.optionText}>Short Answer</span>
          </div>
          <div 
            style={{ 
              ...styles.optionItem, 
              ...(questionTypes.includes(QUIZ_TYPES.MATCHING) ? styles.optionItemSelected : {}) 
            }}
            onClick={() => toggleQuestionType(QUIZ_TYPES.MATCHING)}
          >
            <span style={styles.optionIcon}>{icons.settings}</span>
            <span style={styles.optionText}>Matching</span>
          </div>
        </div>
      </div>
      
      <div style={styles.countContainer}>
        <div style={styles.countLabel}>Number of Questions:</div>
        <div style={styles.countButtons}>
          <button 
            style={styles.countButton}
            onClick={() => setQuestionCount(Math.max(1, questionCount - 1))}
          >
            -
          </button>
          <div style={styles.countValue}>{questionCount}</div>
          <button 
            style={styles.countButton}
            onClick={() => setQuestionCount(Math.min(20, questionCount + 1))}
          >
            +
          </button>
        </div>
      </div>
      
      <button 
        style={{ 
          ...styles.generateButton, 
          ...(isGenerating || (
            (inputType === 'text' && !inputText) || 
            (inputType === 'note' && !selectedNoteId) || 
            (inputType === 'ai' && !aiPrompt)
          ) ? styles.disabledButton : {}) 
        }}
        onClick={generateQuiz}
        disabled={isGenerating || (
          (inputType === 'text' && !inputText) || 
          (inputType === 'note' && !selectedNoteId) || 
          (inputType === 'ai' && !aiPrompt)
        )}
      >
        {isGenerating ? (
          <>
            <div style={styles.loadingSpinner}></div>
            Generating Quiz...
          </>
        ) : (
          <>
            <span style={{ marginRight: '0.5rem' }}>{icons.sparkles}</span>
            Generate Quiz
          </>
        )}
      </button>
    </div>
  );
  
  // Render Quiz Step
  const renderQuizStep = () => {
    if (!generatedQuiz) return null;
    
    return (
      <div style={styles.quizContainer}>
        <div style={styles.card}>
          <h2 style={styles.quizTitle}>{generatedQuiz.title}</h2>
          
          {generatedQuiz.questions.map((question, index) => (
            <div key={question.id} style={{ ...styles.questionCard, marginBottom: '1rem' }}>
              <div style={styles.questionNumber}>Question {index + 1}</div>
              <div style={styles.questionText}>{question.text}</div>
              
              {/* Multiple Choice Question */}
              {question.type === QUIZ_TYPES.MULTIPLE_CHOICE && (
                <div style={styles.answerOptions}>
                  {question.options.map(option => (
                    <div 
                      key={option.id}
                      style={{ 
                        ...styles.answerOption, 
                        ...(userAnswers[question.id] === option.id ? styles.selectedOption : {}),
                        ...(showingResults && option.id === question.correctAnswer ? styles.correctOption : {}),
                        ...(showingResults && userAnswers[question.id] === option.id && 
                          userAnswers[question.id] !== question.correctAnswer ? styles.incorrectOption : {})
                      }}
                      onClick={() => !showingResults && handleAnswerChange(question.id, option.id)}
                    >
                      <span style={{ color: '#a78bfa' }}>{icons.circle}</span>
                      <span style={styles.answerOptionText}>{option.text}</span>
                      {showingResults && option.id === question.correctAnswer && (
                        <span style={{ marginLeft: 'auto', color: '#48bb78' }}>{icons.checkCircle}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {/* True/False Question */}
              {question.type === QUIZ_TYPES.TRUE_FALSE && (
                <div style={styles.answerOptions}>
                  {question.options.map(option => (
                    <div 
                      key={option.id}
                      style={{ 
                        ...styles.answerOption, 
                        ...(userAnswers[question.id] === option.id ? styles.selectedOption : {}),
                        ...(showingResults && option.id === question.correctAnswer ? styles.correctOption : {}),
                        ...(showingResults && userAnswers[question.id] === option.id && 
                          userAnswers[question.id] !== question.correctAnswer ? styles.incorrectOption : {})
                      }}
                      onClick={() => !showingResults && handleAnswerChange(question.id, option.id)}
                    >
                      <span style={{ color: '#a78bfa' }}>{icons.circle}</span>
                      <span style={styles.answerOptionText}>{option.text}</span>
                      {showingResults && option.id === question.correctAnswer && (
                        <span style={{ marginLeft: 'auto', color: '#48bb78' }}>{icons.checkCircle}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Short Answer Question */}
              {question.type === QUIZ_TYPES.SHORT_ANSWER && (
                <div>
                  <input 
                    type="text"
                    placeholder="Your answer..."
                    value={userAnswers[question.id] || ''}
                    onChange={(e) => !showingResults && handleAnswerChange(question.id, e.target.value)}
                    disabled={showingResults}
                    style={styles.shortAnswerInput}
                  />
                  {showingResults && (
                    <div style={{ marginTop: '0.75rem' }}>
                      <div style={{ fontSize: '0.875rem', color: '#a0aec0', marginBottom: '0.25rem' }}>
                        Correct Answer:
                      </div>
                      <div style={{ 
                        padding: '0.75rem', 
                        backgroundColor: 'rgba(72, 187, 120, 0.1)', 
                        borderRadius: '0.375rem',
                        color: '#48bb78',
                        fontSize: '0.875rem'
                      }}>
                        {question.correctAnswer}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Matching Question */}
              {question.type === QUIZ_TYPES.MATCHING && (
                <div style={styles.matchingContainer}>
                  <div>
                    {question.items.map(item => (
                      <div key={item.id} style={styles.matchingItem}>
                        <span style={styles.matchingText}>{item.text}</span>
                        <select 
                          value={userAnswers[question.id][item.id] || ''}
                          onChange={(e) => !showingResults && handleAnswerChange(question.id, e.target.value, item.id)}
                          disabled={showingResults}
                          style={{
                            ...styles.matchingSelect,
                            ...(showingResults && userAnswers[question.id][item.id] === question.correctAnswers[item.id] 
                              ? { border: '1px solid #48bb78' }
                              : showingResults ? { border: '1px solid #f56565' } : {})
                          }}
                        >
                          <option value="">Select a match</option>
                          {question.matches.map(match => (
                            <option key={match.id} value={match.id}>
                              {match.text}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                  {showingResults && (
                    <div>
                      <div style={{ fontSize: '0.875rem', color: '#a0aec0', marginBottom: '0.5rem' }}>
                        Correct Matches:
                      </div>
                      {Object.entries(question.correctAnswers).map(([itemId, matchId]) => {
                        const item = question.items.find(i => i.id.toString() === itemId);
                        const match = question.matches.find(m => m.id === matchId);
                        return (
                          <div key={itemId} style={{
                            padding: '0.5rem',
                            backgroundColor: 'rgba(72, 187, 120, 0.1)',
                            borderRadius: '0.375rem',
                            marginBottom: '0.5rem',
                            fontSize: '0.875rem'
                          }}>
                            <strong>{item?.text}</strong> → {match?.text}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          
          <div style={styles.buttonContainer}>
            {!showingResults ? (
              <>
                <button 
                  style={{ ...styles.button, ...styles.secondaryButton }}
                  onClick={resetQuiz}
                >
                  Cancel
                </button>
                <button 
                  style={{ ...styles.button, ...styles.primaryButton }}
                  onClick={submitQuiz}
                >
                  Submit Answers
                </button>
              </>
            ) : (
              <>
                <button 
                  style={{ ...styles.button, ...styles.secondaryButton }}
                  onClick={startNewQuiz}
                >
                  <span style={{ marginRight: '0.5rem' }}>{icons.refreshCw}</span>
                  Create New Quiz
                </button>
                <button 
                  style={{ ...styles.button, ...styles.primaryButton }}
                  onClick={() => {setShowingResults(false); resetQuiz();}}
                >
                  <span style={{ marginRight: '0.5rem' }}>{icons.check}</span>
                  Done
                </button>
              </>
            )}
          </div>
        </div>
        
        {showingResults && (
          <div style={styles.card}>
            <div style={styles.resultsContainer}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>
                Quiz Results
              </h3>
              <div style={styles.scoreCard}>
                <div style={styles.scoreText}>
                  {calculateScore().percentage}%
                </div>
                <div style={styles.scoreDetails}>
                  {calculateScore().correct} correct out of {calculateScore().total} questions
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading}>Quiz Generator</h1>
        <p style={styles.subHeading}>
          Generate quizzes from your notes, text, or AI-powered topics
        </p>
      </div>
      
      {activeStep === 'input' ? renderInputStep() : renderQuizStep()}
    </div>
  );
};

export default QuizGenerator;