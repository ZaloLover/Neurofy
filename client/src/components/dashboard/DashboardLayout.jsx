// src/components/dashboard/DashboardLayout.jsx
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = () => {
  const { user } = useAuth();
  
  // Apply body styles when component mounts
  useEffect(() => {
    // Save original styles to restore later
    const originalStyle = document.body.style.cssText;
    
    // Apply new styles
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.backgroundColor = '#121212';
    document.body.style.color = 'white';
    document.body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif';
    
    // Clean up function to restore original styles
    return () => {
      document.body.style.cssText = originalStyle;
    };
  }, []);

  const layoutStyles = {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#121212',
    color: 'white'
  };

  const mainContentStyles = {
    flexGrow: 1,
    paddingLeft: '0',
    transition: 'padding-left 0.3s ease'
  };

  const mainContentStylesMd = {
    ...mainContentStyles,
    paddingLeft: '16rem' // 256px = 16rem
  };

  // Use media query through JavaScript
  const isDesktop = window.innerWidth >= 768;

  return (
    <div style={layoutStyles}>
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content area */}
      <div style={isDesktop ? mainContentStylesMd : mainContentStyles}>
        {/* Header */}
        <Header user={user} />
        
        {/* Main content */}
        <main style={{ 
          padding: '1.5rem', 
          overflowY: 'auto',
          height: 'calc(100vh - 4rem)' // 4rem = 64px header height
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;