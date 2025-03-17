// src/components/ResetPassword.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  
  const { token } = useParams();
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate input
    if (!password || !confirmPassword) {
      setStatus({ type: 'error', message: 'Please fill in all fields' });
      return;
    }
    
    if (password !== confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match' });
      return;
    }
    
    if (password.length < 6) {
      setStatus({ type: 'error', message: 'Password must be at least 6 characters' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`/api/auth/reset-password/${token}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Password reset successful! Redirecting to login...'
        });
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Failed to reset password'
        });
      }
    } catch (err) {
      console.error('Password reset error:', err);
      setStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const pageStyles = {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212',
    color: 'white',
    padding: '20px'
  };
  
  const cardStyles = {
    width: '100%',
    maxWidth: '420px',
    padding: '2rem',
    borderRadius: '8px',
    backgroundColor: '#1e1e1e',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  };
  
  const headerStyles = {
    textAlign: 'center',
    marginBottom: '1rem'
  };
  
  const titleStyles = {
    color: 'white',
    fontSize: '1.75rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  };
  
  const subtitleStyles = {
    color: '#a0aec0',
    fontSize: '1rem'
  };
  
  const statusStyles = (type) => ({
    backgroundColor: type === 'success' ? 'rgba(154, 230, 180, 0.1)' : 'rgba(254, 178, 178, 0.1)',
    color: type === 'success' ? '#68d391' : '#fc8181',
    padding: '0.75rem',
    borderRadius: '4px',
    fontSize: '0.875rem'
  });
  
  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  };
  
  const inputGroupStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  };
  
  const labelStyles = {
    color: '#d1d5db',
    fontSize: '0.875rem',
    fontWeight: '500'
  };
  
  const inputStyles = {
    padding: '0.75rem',
    borderRadius: '4px',
    backgroundColor: '#2d3748',
    border: '1px solid #4a5568',
    color: 'white',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box'
  };
  
  const buttonStyles = {
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#6d28d9',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.2s',
    marginTop: '0.5rem'
  };
  
  const footerStyles = {
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '0.875rem',
    color: '#a0aec0'
  };
  
  const linkStyles = {
    color: '#a78bfa',
    textDecoration: 'none'
  };
  
  const logoLinkStyles = {
    display: 'inline-block',
    marginBottom: '2rem',
    color: '#a78bfa',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    textDecoration: 'none'
  };

  return (
    <div style={pageStyles}>
      <div style={cardStyles}>
        <div style={headerStyles}>
          <Link to="/" style={logoLinkStyles}>Neurofy</Link>
          <h1 style={titleStyles}>Reset Your Password</h1>
          <p style={subtitleStyles}>Enter your new password below</p>
        </div>
        
        {status.message && (
          <div style={statusStyles(status.type)}>
            {status.message}
          </div>
        )}
        
        <form style={formStyles} onSubmit={handleSubmit}>
          <div style={inputGroupStyles}>
            <label htmlFor="password" style={labelStyles}>
              New Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyles}
            />
          </div>
          
          <div style={inputGroupStyles}>
            <label htmlFor="confirmPassword" style={labelStyles}>
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={inputStyles}
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              ...buttonStyles,
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </form>
        
        <div style={footerStyles}>
          <p>
            <Link to="/login" style={linkStyles}>
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;