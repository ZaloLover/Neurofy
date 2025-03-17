// src/components/Dashboard.jsx
import { useAuth } from '../hooks/useAuth';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Get the API URL from environment variables or use a default
const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [resendStatus, setResendStatus] = useState({ message: '', type: '' });
  const [isResending, setIsResending] = useState(false);
  
  // Apply body styles when component mounts
  useEffect(() => {
    // Save original styles to restore later
    const originalStyle = document.body.style.cssText;
    
    // Apply new styles
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.backgroundColor = '#121212';
    
    // Clean up function to restore original styles
    return () => {
      document.body.style.cssText = originalStyle;
    };
  }, []);
  
  const handleLogout = () => {
    logout();
  };
  
  const handleResendVerification = async () => {
    setIsResending(true);
    setResendStatus({ message: '', type: '' });
    
    try {
      console.log('Sending verification request to:', `${API_URL}/api/auth/resend-verification`);
      const response = await fetch(`${API_URL}/api/auth/resend-verification`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      // Log the response for debugging
      console.log('Verification response status:', response.status);
      const responseText = await response.text();
      console.log('Verification response text:', responseText);
      
      // Try to parse JSON if possible
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse JSON from response:', e);
        throw new Error('Invalid response from server');
      }
      
      if (response.ok) {
        setResendStatus({
          message: 'Verification email sent! Please check your inbox.',
          type: 'success'
        });
      } else {
        setResendStatus({
          message: data.message || 'Failed to send verification email',
          type: 'error'
        });
      }
    } catch (err) {
      console.error('Failed to resend verification email:', err);
      setResendStatus({
        message: 'An error occurred. Please try again later.',
        type: 'error'
      });
    } finally {
      setIsResending(false);
    }
  };
  
  // Dashboard styles matching the dark theme
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#121212',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    },
    nav: {
      backgroundColor: '#1e1e1e',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    },
    navContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      height: '64px',
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#a78bfa',
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
    },
    userSection: {
      display: 'flex',
      alignItems: 'center',
    },
    welcomeText: {
      color: '#d1d5db',
      marginRight: '1rem',
    },
    logoutButton: {
      padding: '0.5rem 1rem',
      backgroundColor: '#6d28d9',
      color: 'white',
      border: 'none',
      borderRadius: '0.25rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
    },
    header: {
      marginBottom: '2rem',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '1rem',
    },
    alertBox: {
      backgroundColor: 'rgba(251, 191, 36, 0.1)',
      borderLeft: '4px solid #f59e0b',
      color: '#fbbf24',
      padding: '1rem',
      marginBottom: '2rem',
      borderRadius: '0.25rem',
    },
    alertTitle: {
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
    verifyButton: {
      backgroundColor: '#f59e0b',
      color: 'white',
      border: 'none',
      borderRadius: '0.25rem',
      padding: '0.5rem 1rem',
      marginTop: '0.75rem',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'background-color 0.2s',
    },
    disabledButton: {
      opacity: 0.7,
      cursor: 'not-allowed',
    },
    successMessage: {
      color: '#10b981',
      fontSize: '0.875rem',
      marginTop: '0.5rem',
    },
    errorMessage: {
      color: '#ef4444',
      fontSize: '0.875rem',
      marginTop: '0.5rem',
    },
    dashboardCard: {
      backgroundColor: '#1e1e1e',
      borderRadius: '0.5rem',
      padding: '2rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    sectionTitle: {
      color: 'white',
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '1rem',
    },
    userInfoCard: {
      backgroundColor: '#262626',
      borderRadius: '0.25rem',
      padding: '1rem',
      marginTop: '1rem',
    },
    userInfoItem: {
      marginBottom: '0.5rem',
    },
    labelText: {
      fontWeight: 'bold',
      color: '#a78bfa',
    },
    valueText: {
      color: '#d1d5db',
    },
    planBadge: {
      display: 'inline-block',
      backgroundColor: '#6d28d9',
      color: 'white',
      borderRadius: '9999px',
      padding: '0.25rem 0.75rem',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      marginLeft: '0.5rem',
    }
  };
  
  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <Link to="/" style={styles.logo}>Neurofy</Link>
          <div style={styles.userSection}>
            <span style={styles.welcomeText}>Welcome, {user?.name || 'User'}</span>
            <button
              onClick={handleLogout}
              style={styles.logoutButton}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      
      <main style={styles.main}>
        <header style={styles.header}>
          <h1 style={styles.title}>Dashboard</h1>
        </header>
        
        {/* Email verification alert */}
        {user && !user.isEmailVerified && (
          <div style={styles.alertBox}>
            <p style={styles.alertTitle}>Email verification required</p>
            <p>Please check your email and click the verification link to fully activate your account.</p>
            <div>
              <button 
                onClick={handleResendVerification}
                disabled={isResending}
                style={{
                  ...styles.verifyButton,
                  ...(isResending ? styles.disabledButton : {})
                }}
              >
                {isResending ? 'Sending...' : 'Resend Verification Email'}
              </button>
            </div>
            {resendStatus.message && (
              <div style={resendStatus.type === 'success' ? styles.successMessage : styles.errorMessage}>
                {resendStatus.message}
              </div>
            )}
          </div>
        )}
        
        {/* Main dashboard content */}
        <div style={styles.dashboardCard}>
          <p>Welcome to your Neurofy dashboard! Here you can manage your learning journey and track your progress.</p>
          
          <div style={{ marginTop: '2rem' }}>
            <h2 style={styles.sectionTitle}>Your Profile</h2>
            <div style={styles.userInfoCard}>
              <p style={styles.userInfoItem}>
                <span style={styles.labelText}>Name: </span>
                <span style={styles.valueText}>{user?.name}</span>
              </p>
              <p style={styles.userInfoItem}>
                <span style={styles.labelText}>Email: </span>
                <span style={styles.valueText}>{user?.email}</span>
              </p>
              <p style={styles.userInfoItem}>
                <span style={styles.labelText}>Account Status: </span>
                <span style={styles.valueText}>
                  {user?.isEmailVerified ? 'Verified' : 'Pending Verification'}
                </span>
              </p>
              <p style={styles.userInfoItem}>
                <span style={styles.labelText}>Subscription Plan: </span>
                <span style={styles.valueText}>
                  Free
                  <span style={styles.planBadge}>Free</span>
                </span>
              </p>
            </div>
          </div>
          
          <div style={{ marginTop: '2rem' }}>
            <h2 style={styles.sectionTitle}>Getting Started</h2>
            <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
              Ready to enhance your memory and learning capabilities? Here are some things you can do:
            </p>
            <ul style={{ color: '#d1d5db', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Create your first set of flashcards</li>
              <li style={{ marginBottom: '0.5rem' }}>Set up a daily learning schedule</li>
              <li style={{ marginBottom: '0.5rem' }}>Explore our AI-powered study recommendations</li>
              <li style={{ marginBottom: '0.5rem' }}>Track your progress over time</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;