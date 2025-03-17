// src/components/dashboard/Header.jsx
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

// Simple SVG icons
const icons = {
  bell: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>,
  user: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
};

const Header = () => {
  const { user, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  // Header styles
  const headerStyles = {
    height: '4rem',
    backgroundColor: '#1e1e1e',
    borderBottom: '1px solid #333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 1.5rem'
  };

  // Page title styles
  const pageTitleStyles = {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: 'white'
  };

  // Right side actions styles
  const actionsContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  // Notification button styles
  const notificationButtonStyles = {
    color: '#a0a0a0',
    backgroundColor: 'transparent',
    border: 'none',
    padding: '0.5rem',
    borderRadius: '9999px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  // User menu container styles
  const userMenuContainerStyles = {
    position: 'relative'
  };

  // User menu button styles
  const userMenuButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem',
    borderRadius: '0.375rem',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#e0e0e0'
  };

  // User avatar styles
  const userAvatarStyles = {
    width: '2rem',
    height: '2rem',
    borderRadius: '9999px',
    backgroundColor: '#6d28d9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  };

  // User dropdown menu styles
  const userDropdownStyles = {
    position: 'absolute',
    right: 0,
    top: '3rem',
    width: '12rem',
    backgroundColor: '#2d2d2d',
    borderRadius: '0.375rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    zIndex: 10,
    border: '1px solid #444',
    overflow: 'hidden'
  };

  // User info section styles
  const userInfoStyles = {
    padding: '1rem',
    borderBottom: '1px solid #444'
  };

  // User name styles
  const userNameStyles = {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'white',
    margin: 0
  };

  // User email styles
  const userEmailStyles = {
    fontSize: '0.75rem',
    color: '#a0a0a0',
    margin: '0.25rem 0 0 0'
  };

  // Dropdown link styles
  const dropdownLinkStyles = {
    display: 'block',
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    color: '#d1d5db',
    textDecoration: 'none',
    transition: 'background-color 0.2s'
  };

  // Logout button styles
  const logoutButtonStyles = {
    width: '100%',
    textAlign: 'left',
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    color: '#f56565',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer'
  };
  
  return (
    <header style={headerStyles}>
      {/* Page title - could be dynamic based on current route */}
      <h1 style={pageTitleStyles}>Dashboard</h1>
      
      {/* Right side actions */}
      <div style={actionsContainerStyles}>
        {/* Notification bell */}
        <button style={notificationButtonStyles}>
          {icons.bell}
        </button>
        
        {/* User menu */}
        <div style={userMenuContainerStyles}>
          <button 
            onClick={toggleUserMenu}
            style={userMenuButtonStyles}
          >
            <div style={userAvatarStyles}>
              {icons.user}
            </div>
            <span style={{ fontSize: '0.875rem' }}>{user?.name || 'User'}</span>
          </button>
          
          {/* Dropdown menu */}
          {userMenuOpen && (
            <div style={userDropdownStyles}>
              <div style={userInfoStyles}>
                <p style={userNameStyles}>{user?.name || 'User'}</p>
                <p style={userEmailStyles}>{user?.email || 'user@example.com'}</p>
              </div>
              <a 
                href="/dashboard/settings/profile" 
                style={dropdownLinkStyles}
              >
                Profile Settings
              </a>
              <a 
                href="/dashboard/settings/account" 
                style={dropdownLinkStyles}
              >
                Account Settings
              </a>
              <a 
                href="/dashboard/settings/subscription" 
                style={dropdownLinkStyles}
              >
                Subscription
              </a>
              <button 
                onClick={logout}
                style={logoutButtonStyles}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;