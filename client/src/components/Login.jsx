// src/components/Login.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Updated import path

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
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
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await login(email, password);
      
      if (result.success) {
        navigate('/dashboard'); // Redirect to dashboard after login
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('An unexpected error occurred' + (error.message ? `: ${error.message}` : ''));
    } finally {
      setIsLoading(false);
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
  
  const errorStyles = {
    backgroundColor: 'rgba(254, 178, 178, 0.1)',
    color: '#fc8181',
    padding: '0.75rem',
    borderRadius: '4px',
    fontSize: '0.875rem'
  };
  
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
  
  const forgotPasswordLinkStyles = {
    textAlign: 'right',
    fontSize: '0.875rem'
  };
  
  const linkStyles = {
    color: '#a78bfa',
    textDecoration: 'none'
  };
  
  const footerStyles = {
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '0.875rem',
    color: '#a0aec0'
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
          <h1 style={titleStyles}>Welcome back</h1>
          <p style={subtitleStyles}>Sign in to your account</p>
        </div>
        
        {error && (
          <div style={errorStyles}>
            {error}
          </div>
        )}
        
        <form style={formStyles} onSubmit={handleSubmit}>
          <div style={inputGroupStyles}>
            <label htmlFor="email" style={labelStyles}>
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyles}
            />
          </div>
          
          <div style={inputGroupStyles}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="password" style={labelStyles}>
                Password
              </label>
              <div style={forgotPasswordLinkStyles}>
                <Link to="/forgot-password" style={linkStyles}>
                  Forgot password?
                </Link>
              </div>
            </div>
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
          
          <button
            type="submit"
            disabled={isLoading}
            style={{
              ...buttonStyles,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        
        <div style={footerStyles}>
          <p>
            Don't have an account?{' '}
            <Link to="/register" style={linkStyles}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;