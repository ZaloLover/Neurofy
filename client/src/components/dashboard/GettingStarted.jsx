// src/components/dashboard/GettingStarted.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

// SVG Icons (embedded directly to avoid lucide-react dependency issues)
const icons = {
  checkCircle: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
  ),
  circle: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>
  ),
  play: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
  ),
  brain: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54Z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54Z"></path></svg>
  ),
  book: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
  ),
  chevronRight: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
  )
};

const GettingStarted = () => {
  // Track completed onboarding steps
  const [completedSteps, setCompletedSteps] = useState({
    profile: true,
    preferences: false,
    firstFlashcard: false,
    studySession: false,
    tutorial: false
  });
  
  const toggleStep = (step) => {
    setCompletedSteps(prev => ({
      ...prev,
      [step]: !prev[step]
    }));
  };
  
  // Calculate progress percentage
  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const totalSteps = Object.keys(completedSteps).length;
  const progressPercentage = Math.round((completedCount / totalSteps) * 100);
  
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
    progressHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.5rem'
    },
    progressText: {
      color: '#a78bfa',
      fontWeight: '500',
      fontSize: '0.875rem'
    },
    progressBar: {
      width: '100%',
      height: '10px',
      backgroundColor: '#4a5568',
      borderRadius: '9999px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      backgroundImage: 'linear-gradient(to right, #6d28d9, #a78bfa)',
      borderRadius: '9999px',
      transition: 'width 0.3s ease'
    },
    stepList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginTop: '1rem'
    },
    stepItem: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'flex-start'
    },
    stepIcon: {
      color: '#a78bfa',
      marginTop: '0.25rem',
      flexShrink: 0
    },
    stepContent: {
      flex: 1
    },
    stepTitle: {
      fontWeight: '500',
      marginBottom: '0.25rem'
    },
    stepTitleCompleted: {
      fontWeight: '500',
      marginBottom: '0.25rem',
      color: '#a0aec0',
      textDecoration: 'line-through'
    },
    stepDescription: {
      fontSize: '0.875rem',
      color: '#a0aec0',
      marginBottom: '0.5rem'
    },
    link: {
      display: 'inline-flex',
      alignItems: 'center',
      color: '#a78bfa',
      fontSize: '0.875rem',
      textDecoration: 'none',
      marginTop: '0.5rem'
    },
    button: {
      display: 'inline-flex',
      alignItems: 'center',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#a78bfa',
      fontSize: '0.875rem',
      padding: 0,
      cursor: 'pointer'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '1.5rem',
      marginTop: '1.5rem'
    },
    featureCard: {
      backgroundColor: '#1e1e1e',
      borderRadius: '0.5rem',
      padding: '1.25rem',
      border: '1px solid #2d3748'
    },
    featureHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1rem'
    },
    featureIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      borderRadius: '0.5rem',
      backgroundColor: 'rgba(109, 40, 217, 0.2)',
      color: '#a78bfa',
      marginRight: '0.75rem'
    },
    featureTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: 'white'
    },
    featureDescription: {
      fontSize: '0.875rem',
      color: '#a0aec0',
      marginBottom: '1rem'
    },
    featureList: {
      marginBottom: '1rem'
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.875rem',
      color: '#d1d5db',
      marginBottom: '0.5rem'
    },
    videoSection: {
      backgroundImage: 'linear-gradient(to right, #2d1b69, #1e1e1e)',
      borderRadius: '0.5rem',
      padding: '1.25rem',
      border: '1px solid #2d3748'
    },
    videoContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    videoContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    videoTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: 'white'
    },
    videoDescription: {
      fontSize: '0.875rem',
      color: '#d1d5db'
    },
    videoButton: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#6d28d9',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
      border: 'none',
      fontWeight: '500',
      cursor: 'pointer',
      width: 'fit-content'
    },
    videoPlaceholder: {
      backgroundColor: 'black',
      borderRadius: '0.5rem',
      border: '1px solid #4a5568',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      aspectRatio: '16/9',
      marginTop: '1rem',
      color: '#a78bfa'
    },
    tagPill: {
      display: 'inline-block',
      backgroundColor: 'rgba(109, 40, 217, 0.2)',
      color: '#a78bfa',
      borderRadius: '9999px',
      padding: '0.25rem 0.75rem',
      fontSize: '0.75rem',
      fontWeight: '500',
      marginRight: '0.5rem',
      marginBottom: '0.5rem'
    }
  };

  // For larger screens, switch to a two-column layout
  if (window.innerWidth >= 768) {
    styles.featuresGrid.gridTemplateColumns = 'repeat(2, 1fr)';
    styles.videoContainer.flexDirection = 'row';
    styles.videoContent.width = '50%';
    styles.videoPlaceholder.width = '50%';
    styles.videoPlaceholder.marginTop = '0';
  }
  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading}>Getting Started with Neurofy</h1>
        <p style={styles.subHeading}>Complete these steps to get the most out of your learning experience.</p>
      </div>
      
      {/* Progress bar */}
      <div style={styles.card}>
        <div style={styles.progressHeader}>
          <h2 style={styles.heading}>Your Onboarding Progress</h2>
          <span style={styles.progressText}>{progressPercentage}% Complete</span>
        </div>
        <div style={styles.progressBar}>
          <div 
            style={{
              ...styles.progressFill,
              width: `${progressPercentage}%`
            }}
          ></div>
        </div>
      </div>
      
      {/* Onboarding checklist */}
      <div style={styles.card}>
        <h2 style={styles.heading}>Getting Started Checklist</h2>
        
        <div style={styles.stepList}>
          {/* Step 1 */}
          <div style={styles.stepItem}>
            <button 
              onClick={() => toggleStep('profile')}
              style={styles.stepIcon}
            >
              {completedSteps.profile ? icons.checkCircle : icons.circle}
            </button>
            <div style={styles.stepContent}>
              <h3 style={completedSteps.profile ? styles.stepTitleCompleted : styles.stepTitle}>
                Complete your profile
              </h3>
              <p style={styles.stepDescription}>Add your learning preferences and subjects of interest.</p>
              <Link to="/dashboard/settings/profile" style={styles.link}>
                Go to Profile
                <span style={{ marginLeft: '0.25rem' }}>{icons.chevronRight}</span>
              </Link>
            </div>
          </div>
          
          {/* Step 2 */}
          <div style={styles.stepItem}>
            <button 
              onClick={() => toggleStep('preferences')}
              style={styles.stepIcon}
            >
              {completedSteps.preferences ? icons.checkCircle : icons.circle}
            </button>
            <div style={styles.stepContent}>
              <h3 style={completedSteps.preferences ? styles.stepTitleCompleted : styles.stepTitle}>
                Set your study preferences
              </h3>
              <p style={styles.stepDescription}>Configure your daily study goals and notification settings.</p>
              <Link to="/dashboard/settings/preferences" style={styles.link}>
                Set Preferences
                <span style={{ marginLeft: '0.25rem' }}>{icons.chevronRight}</span>
              </Link>
            </div>
          </div>
          
          {/* Step 3 */}
          <div style={styles.stepItem}>
            <button 
              onClick={() => toggleStep('firstFlashcard')}
              style={styles.stepIcon}
            >
              {completedSteps.firstFlashcard ? icons.checkCircle : icons.circle}
            </button>
            <div style={styles.stepContent}>
              <h3 style={completedSteps.firstFlashcard ? styles.stepTitleCompleted : styles.stepTitle}>
                Create your first flashcard deck
              </h3>
              <p style={styles.stepDescription}>Start building your knowledge base with your first set of flashcards.</p>
              <Link to="/dashboard/study-tools/flashcards" style={styles.link}>
                Create Flashcards
                <span style={{ marginLeft: '0.25rem' }}>{icons.chevronRight}</span>
              </Link>
            </div>
          </div>
          
          {/* Step 4 */}
          <div style={styles.stepItem}>
            <button 
              onClick={() => toggleStep('studySession')}
              style={styles.stepIcon}
            >
              {completedSteps.studySession ? icons.checkCircle : icons.circle}
            </button>
            <div style={styles.stepContent}>
              <h3 style={completedSteps.studySession ? styles.stepTitleCompleted : styles.stepTitle}>
                Schedule your first study session
              </h3>
              <p style={styles.stepDescription}>Plan your learning routine for optimal retention.</p>
              <Link to="/dashboard/memory-tools/spaced-repetition" style={styles.link}>
                Schedule Session
                <span style={{ marginLeft: '0.25rem' }}>{icons.chevronRight}</span>
              </Link>
            </div>
          </div>
          
          {/* Step 5 */}
          <div style={styles.stepItem}>
            <button 
              onClick={() => toggleStep('tutorial')}
              style={styles.stepIcon}
            >
              {completedSteps.tutorial ? icons.checkCircle : icons.circle}
            </button>
            <div style={styles.stepContent}>
              <h3 style={completedSteps.tutorial ? styles.stepTitleCompleted : styles.stepTitle}>
                Watch the tutorial video
              </h3>
              <p style={styles.stepDescription}>Learn how to use Neurofy's advanced features in under 5 minutes.</p>
              <button style={styles.button}>
                <span style={{ marginRight: '0.25rem' }}>{icons.play}</span>
                Watch Tutorial
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Features Preview */}
      <div style={{...styles.card, marginBottom: '1.5rem'}}>
        <h2 style={styles.heading}>AI-Powered Learning Features</h2>
        <p style={{...styles.subHeading, marginBottom: '1rem'}}>
          Discover how Neurofy's AI technology can accelerate your learning journey
        </p>
        
        <div style={{display: 'flex', flexWrap: 'wrap', marginBottom: '1rem'}}>
          <span style={styles.tagPill}>AI-Powered</span>
          <span style={styles.tagPill}>Machine Learning</span>
          <span style={styles.tagPill}>Smart Study</span>
          <span style={styles.tagPill}>Personalized</span>
        </div>
        
        <div style={{...styles.featureList, marginBottom: '1.5rem'}}>
          <div style={{...styles.featureItem, marginBottom: '1rem'}}>
            <span style={{marginRight: '0.75rem', color: '#a78bfa'}}>{icons.checkCircle}</span>
            <div>
              <strong style={{color: 'white'}}>Smart Question Generation</strong>
              <p style={{fontSize: '0.75rem', color: '#a0aec0', marginTop: '0.25rem'}}>
                Our AI analyzes your study materials to create targeted questions that focus on key concepts
              </p>
            </div>
          </div>
          
          <div style={{...styles.featureItem, marginBottom: '1rem'}}>
            <span style={{marginRight: '0.75rem', color: '#a78bfa'}}>{icons.checkCircle}</span>
            <div>
              <strong style={{color: 'white'}}>Adaptive Learning Path</strong>
              <p style={{fontSize: '0.75rem', color: '#a0aec0', marginTop: '0.25rem'}}>
                Personalized study schedules that adapt based on your performance and memory patterns
              </p>
            </div>
          </div>
          
          <div style={{...styles.featureItem, marginBottom: '1rem'}}>
            <span style={{marginRight: '0.75rem', color: '#a78bfa'}}>{icons.checkCircle}</span>
            <div>
              <strong style={{color: 'white'}}>Knowledge Gap Detection</strong>
              <p style={{fontSize: '0.75rem', color: '#a0aec0', marginTop: '0.25rem'}}>
                AI identifies areas where you need more practice and automatically prioritizes them
              </p>
            </div>
          </div>
        </div>
        
        <button style={{
          backgroundColor: '#6d28d9',
          color: 'white',
          border: 'none',
          borderRadius: '0.25rem',
          padding: '0.5rem 1rem',
          fontWeight: '500',
          cursor: 'pointer',
          width: '100%'
        }}>
          Explore AI Features
        </button>
      </div>
      
      {/* Feature highlights */}
      <div style={styles.featuresGrid}>
        <div style={styles.featureCard}>
          <div style={styles.featureHeader}>
            <div style={styles.featureIcon}>
              {icons.brain}
            </div>
            <h2 style={styles.featureTitle}>Memory Tools</h2>
          </div>
          <p style={styles.featureDescription}>
            Our scientifically-proven memory enhancement tools help you retain information longer and recall it faster.
          </p>
          <div style={styles.featureList}>
            <div style={styles.featureItem}>
              <span style={{marginRight: '0.5rem', color: '#a78bfa'}}>{icons.checkCircle}</span>
              Spaced repetition algorithms
            </div>
            <div style={styles.featureItem}>
              <span style={{marginRight: '0.5rem', color: '#a78bfa'}}>{icons.checkCircle}</span>
              Memory palace technique
            </div>
            <div style={styles.featureItem}>
              <span style={{marginRight: '0.5rem', color: '#a78bfa'}}>{icons.checkCircle}</span>
              Mind mapping tools
            </div>
          </div>
          <Link to="/dashboard/memory-tools" style={styles.link}>
            Explore Memory Tools
            <span style={{ marginLeft: '0.25rem' }}>{icons.chevronRight}</span>
          </Link>
        </div>
        
        <div style={styles.featureCard}>
          <div style={styles.featureHeader}>
            <div style={styles.featureIcon}>
              {icons.book}
            </div>
            <h2 style={styles.featureTitle}>Study Tools</h2>
          </div>
          <p style={styles.featureDescription}>
            Comprehensive study tools to help you organize, learn, and master any subject matter.
          </p>
          <div style={styles.featureList}>
            <div style={styles.featureItem}>
              <span style={{marginRight: '0.5rem', color: '#a78bfa'}}>{icons.checkCircle}</span>
              Interactive flashcards
            </div>
            <div style={styles.featureItem}>
              <span style={{marginRight: '0.5rem', color: '#a78bfa'}}>{icons.checkCircle}</span>
              Smart note-taking
            </div>
            <div style={styles.featureItem}>
              <span style={{marginRight: '0.5rem', color: '#a78bfa'}}>{icons.checkCircle}</span>
              AI-powered quiz generation
            </div>
          </div>
          <Link to="/dashboard/study-tools" style={styles.link}>
            Explore Study Tools
            <span style={{ marginLeft: '0.25rem' }}>{icons.chevronRight}</span>
          </Link>
        </div>
      </div>
      
      {/* Video tutorial section */}
      <div style={styles.videoSection}>
        <div style={styles.videoContainer}>
          <div style={styles.videoContent}>
            <h2 style={styles.videoTitle}>Quick Start Video Tutorial</h2>
            <p style={styles.videoDescription}>
              Watch this 5-minute video to learn how to use Neurofy's key features and get the most out of your learning experience.
            </p>
            <button style={styles.videoButton}>
              <span style={{ marginRight: '0.5rem' }}>{icons.play}</span>
              Watch Tutorial
            </button>
          </div>
          <div style={styles.videoPlaceholder}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;