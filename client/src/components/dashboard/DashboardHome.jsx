// src/components/dashboard/DashboardHome.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, BookOpen, FileText, HelpCircle, Sparkles, ChevronRight } from 'lucide-react';

const DashboardHome = () => {
  // Only keep the loading state that's actually used
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Example data - in a real app, these would come from your backend
  const stats = [
    { title: 'Study Sessions', value: '12', icon: <CalendarCheck size={20} />, change: '+3 this week' },
    { title: 'Flashcards Created', value: '48', icon: <BookOpen size={20} />, change: '+15 this week' },
    { title: 'Notes Created', value: '7', icon: <FileText size={20} />, change: '+2 this week' },
    { title: 'Quiz Success Rate', value: '76%', icon: <HelpCircle size={20} />, change: '+4% improvement' },
  ];

  const recentActivity = [
    { id: 1, type: 'Created flashcard deck', name: 'Biology 101 - Chapter 3', date: '2 hours ago' },
    { id: 2, type: 'Completed quiz', name: 'Spanish Vocabulary', score: '85%', date: 'Yesterday' },
    { id: 3, type: 'Created notes', name: 'History Timeline', date: 'Yesterday' },
    { id: 4, type: 'Study session', name: 'Mathematics', duration: '45 minutes', date: '2 days ago' },
  ];

  const recommendedTasks = [
    { id: 1, title: 'Review Biology Flashcards', description: 'Cards are due for review based on your spaced repetition schedule', priority: 'high' },
    { id: 2, title: 'Generate a Spanish Quiz', description: 'Test your knowledge on recent vocabulary you\'ve been studying', priority: 'medium' },
    { id: 3, title: 'Organize Your History Notes', description: 'Your notes on World War II need categorization', priority: 'medium' },
    { id: 4, title: 'Set up your next study session', description: 'You haven\'t scheduled any sessions for tomorrow', priority: 'low' },
  ];
  
  // Dashboard styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
    headerContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: 'white',
    },
    dateText: {
      fontSize: '0.875rem',
      color: '#a0aec0',
    },
    quickAccessGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '1rem',
    },
    quickAccessCard: {
      backgroundColor: '#1e1e1e',
      borderRadius: '0.5rem',
      padding: '1rem',
      border: '1px solid #2d3748',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      textDecoration: 'none',
      color: 'white',
    },
    cardContent: {
      display: 'flex',
      alignItems: 'center',
    },
    iconContainer: {
      padding: '0.5rem',
      backgroundColor: 'rgba(109, 40, 217, 0.2)',
      borderRadius: '0.5rem',
      color: '#a78bfa',
      marginRight: '0.75rem',
    },
    linkText: {
      fontWeight: '500',
      color: 'white',
    },
    chevronIcon: {
      color: '#a0aec0',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '1rem',
    },
    statCard: {
      backgroundColor: '#1e1e1e',
      borderRadius: '0.5rem',
      padding: '1rem',
      border: '1px solid #2d3748',
    },
    statHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    statInfo: {
      display: 'flex',
      flexDirection: 'column',
    },
    statTitle: {
      fontSize: '0.875rem',
      color: '#a0aec0',
    },
    statValue: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: 'white',
      marginTop: '0.25rem',
    },
    statChange: {
      fontSize: '0.75rem',
      color: '#a0aec0',
      marginTop: '0.25rem',
    },
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '1.5rem',
    },
    card: {
      backgroundColor: '#1e1e1e',
      borderRadius: '0.5rem',
      padding: '1.25rem',
      border: '1px solid #2d3748',
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
    },
    cardTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: 'white',
    },
    viewAllLink: {
      fontSize: '0.875rem',
      color: '#a78bfa',
      textDecoration: 'none',
    },
    tasksList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    taskItem: {
      backgroundColor: '#2d2d2d',
      borderRadius: '0.375rem',
      padding: '0.75rem',
    },
    taskItemContent: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    taskInfo: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
    },
    priorityDot: {
      width: '0.75rem',
      height: '0.75rem',
      borderRadius: '50%',
      marginTop: '0.375rem',
    },
    priorityHigh: {
      backgroundColor: '#ef4444',
    },
    priorityMedium: {
      backgroundColor: '#f59e0b',
    },
    priorityLow: {
      backgroundColor: '#10b981',
    },
    taskDetails: {
      display: 'flex',
      flexDirection: 'column',
    },
    taskTitle: {
      fontWeight: '500',
      color: 'white',
    },
    taskDescription: {
      fontSize: '0.875rem',
      color: '#a0aec0',
      marginTop: '0.25rem',
    },
    activityList: {
      display: 'flex',
      flexDirection: 'column',
    },
    activityItem: {
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem',
      borderBottom: '1px solid #2d3748',
    },
    activityTitle: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: 'white',
    },
    activityName: {
      fontSize: '0.875rem',
      color: '#a0aec0',
    },
    activityScore: {
      fontSize: '0.875rem',
      color: '#10b981',
    },
    activityDuration: {
      fontSize: '0.875rem',
      color: '#3b82f6',
    },
    activityDate: {
      fontSize: '0.75rem',
      color: '#6b7280',
    },
    emptyState: {
      textAlign: 'center',
      padding: '1.5rem',
    },
    emptyStateIcon: {
      color: '#6b7280',
      margin: '0 auto',
      marginBottom: '0.75rem',
    },
    emptyStateText: {
      color: '#a0aec0',
      marginBottom: '1rem',
    },
    primaryButton: {
      backgroundColor: '#6d28d9',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      fontWeight: '500',
      display: 'inline-block',
      textDecoration: 'none',
    },
    loadingItem: {
      backgroundColor: '#2d2d2d',
      borderRadius: '0.375rem',
      padding: '0.75rem',
      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    },
    loadingLine: {
      height: '1rem',
      backgroundColor: '#3d3d3d',
      borderRadius: '0.25rem',
      marginBottom: '0.5rem',
    },
    subscriptionCard: {
      background: 'linear-gradient(to bottom right, #6d28d9, #4c1d95)',
      borderRadius: '0.5rem',
      padding: '1.25rem',
      marginTop: '1.5rem',
    },
    subscriptionTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: 'white',
      marginBottom: '0.5rem',
    },
    subscriptionText: {
      fontSize: '0.875rem',
      color: '#e2e8f0',
      marginBottom: '1rem',
    },
    subscriptionButton: {
      backgroundColor: 'white',
      color: '#6d28d9',
      border: 'none',
      padding: '0.5rem 0',
      borderRadius: '0.375rem',
      fontWeight: '500',
      width: '100%',
      cursor: 'pointer',
    }
  };
  
  // Media query style adjustments
  if (typeof window !== 'undefined' && window.innerWidth >= 768) {
    styles.quickAccessGrid.gridTemplateColumns = 'repeat(3, 1fr)';
    styles.statsGrid.gridTemplateColumns = 'repeat(4, 1fr)';
    styles.contentGrid.gridTemplateColumns = '2fr 1fr';
  }
  
  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h1 style={styles.title}>Dashboard</h1>
        <span style={styles.dateText}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>

      {/* Quick access buttons */}
      <div style={styles.quickAccessGrid}>
        <Link to="/dashboard/study-tools/flashcards" style={styles.quickAccessCard}>
          <div style={styles.cardContent}>
            <div style={styles.iconContainer}>
              <BookOpen size={20} />
            </div>
            <span style={styles.linkText}>Create Flashcards</span>
          </div>
          <ChevronRight size={18} style={styles.chevronIcon} />
        </Link>
        
        <Link to="/dashboard/study-tools/notes" style={styles.quickAccessCard}>
          <div style={styles.cardContent}>
            <div style={styles.iconContainer}>
              <FileText size={20} />
            </div>
            <span style={styles.linkText}>Take Notes</span>
          </div>
          <ChevronRight size={18} style={styles.chevronIcon} />
        </Link>
        
        <Link to="/dashboard/study-tools/quizzes" style={styles.quickAccessCard}>
          <div style={styles.cardContent}>
            <div style={styles.iconContainer}>
              <Sparkles size={20} />
            </div>
            <span style={styles.linkText}>Generate Quiz</span>
          </div>
          <ChevronRight size={18} style={styles.chevronIcon} />
        </Link>
      </div>

      {/* Stats overview */}
      <div style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} style={styles.statCard}>
            <div style={styles.statHeader}>
              <div style={styles.statInfo}>
                <p style={styles.statTitle}>{stat.title}</p>
                <p style={styles.statValue}>{stat.value}</p>
                <p style={styles.statChange}>{stat.change}</p>
              </div>
              <div style={styles.iconContainer}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div style={styles.contentGrid}>
        {/* Left column - Recommended tasks */}
        <div>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Recommended Tasks</h2>
              <button style={{
                ...styles.viewAllLink,
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer'
              }}>View All</button>
            </div>
            <div style={styles.tasksList}>
              {recommendedTasks.map((task) => (
                <div key={task.id} style={styles.taskItem}>
                  <div style={styles.taskItemContent}>
                    <div style={styles.taskInfo}>
                      <div style={{
                        ...styles.priorityDot,
                        ...(task.priority === 'high' ? styles.priorityHigh : 
                           task.priority === 'medium' ? styles.priorityMedium : styles.priorityLow)
                      }}></div>
                      <div style={styles.taskDetails}>
                        <h3 style={styles.taskTitle}>{task.title}</h3>
                        <p style={styles.taskDescription}>{task.description}</p>
                      </div>
                    </div>
                    <button style={{
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: '#a78bfa',
                      cursor: 'pointer'
                    }}>
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recent Notes Section */}
          <div style={{...styles.card, marginTop: '1.5rem'}}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Recent Notes</h2>
              <Link to="/dashboard/study-tools/notes" style={styles.viewAllLink}>View All</Link>
            </div>
            
            {isLoading ? (
              // Loading skeleton
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[1, 2].map((i) => (
                  <div key={i} style={styles.loadingItem}>
                    <div style={{...styles.loadingLine, width: '33%'}}></div>
                    <div style={{...styles.loadingLine, width: '100%'}}></div>
                    <div style={{...styles.loadingLine, width: '25%'}}></div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={styles.emptyState}>
                <FileText size={48} style={styles.emptyStateIcon} />
                <p style={styles.emptyStateText}>You haven't created any notes yet.</p>
                <Link to="/dashboard/study-tools/notes" style={styles.primaryButton}>
                  Create Your First Note
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div>
          {/* Recent activity */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Recent Activity</h2>
              <button style={{
                ...styles.viewAllLink,
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer'
              }}>View All</button>
            </div>
            <div style={styles.activityList}>
              {recentActivity.map((activity) => (
                <div key={activity.id} style={{
                  ...styles.activityItem,
                  borderBottom: activity.id === recentActivity.length ? 'none' : '1px solid #2d3748'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <p style={styles.activityTitle}>{activity.type}</p>
                    <p style={styles.activityName}>{activity.name}</p>
                    {activity.score && (
                      <p style={styles.activityScore}>Score: {activity.score}</p>
                    )}
                    {activity.duration && (
                      <p style={styles.activityDuration}>Duration: {activity.duration}</p>
                    )}
                    <p style={styles.activityDate}>{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Quizzes */}
          <div style={{...styles.card, marginTop: '1.5rem'}}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Recent Quizzes</h2>
              <Link to="/dashboard/study-tools/quizzes" style={styles.viewAllLink}>Create Quiz</Link>
            </div>
            
            {isLoading ? (
              // Loading skeleton
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[1, 2].map((i) => (
                  <div key={i} style={styles.loadingItem}>
                    <div style={{...styles.loadingLine, width: '50%'}}></div>
                    <div style={{...styles.loadingLine, width: '33%'}}></div>
                    <div style={{...styles.loadingLine, width: '25%'}}></div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={styles.emptyState}>
                <HelpCircle size={48} style={styles.emptyStateIcon} />
                <p style={styles.emptyStateText}>You haven't taken any quizzes yet.</p>
                <Link to="/dashboard/study-tools/quizzes" style={styles.primaryButton}>
                  Generate a Quiz
                </Link>
              </div>
            )}
          </div>

          {/* Subscription card */}
          <div style={styles.subscriptionCard}>
            <h2 style={styles.subscriptionTitle}>Free Plan</h2>
            <p style={styles.subscriptionText}>Upgrade to unlock premium features and accelerate your learning.</p>
            <button style={styles.subscriptionButton}>
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;