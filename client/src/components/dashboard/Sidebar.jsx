// src/components/dashboard/Sidebar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Simple SVG icons
const icons = {
  home: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
  lightbulb: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>,
  book: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>,
  brain: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54Z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54Z"></path></svg>,
  settings: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
  menu: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>,
  close: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize on mount
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  const sidebarItems = [
    {
      title: 'Dashboard',
      icon: icons.home,
      path: '/dashboard',
    },
    {
      title: 'Getting Started',
      icon: icons.lightbulb,
      path: '/dashboard/getting-started',
    },
    {
      title: 'Study Tools',
      icon: icons.book,
      path: '/dashboard/study-tools',
      children: [
        {
          title: 'Flashcards',
          path: '/dashboard/study-tools/flashcards',
        },
        {
          title: 'Notes',
          path: '/dashboard/study-tools/notes',
        },
        {
          title: 'Quiz Generator',
          path: '/dashboard/study-tools/quizzes',
        },
      ],
    },
    {
      title: 'Memory Tools',
      icon: icons.brain,
      path: '/dashboard/memory-tools',
      children: [
        {
          title: 'Spaced Repetition',
          path: '/dashboard/memory-tools/spaced-repetition',
        },
        {
          title: 'Mind Maps',
          path: '/dashboard/memory-tools/mind-maps',
        },
        {
          title: 'Memory Palace',
          path: '/dashboard/memory-tools/memory-palace',
        },
      ],
    },
    {
      title: 'Settings',
      icon: icons.settings,
      path: '/dashboard/settings',
    },
  ];
  
  // Check if a route is active (including child routes)
  const isRouteActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/dashboard';
  };
  
  // State for expanded accordion items
  const [expandedItems, setExpandedItems] = useState({});
  
  const toggleExpand = (title) => {
    setExpandedItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  // Mobile menu button styles
  const menuButtonStyles = {
    position: 'fixed',
    top: '1rem',
    left: '1rem',
    zIndex: 30,
    padding: '0.5rem',
    backgroundColor: '#1a1a1a',
    borderRadius: '0.375rem',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    display: isMobile ? 'block' : 'none'
  };

  // Sidebar backdrop styles
  const backdropStyles = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 20,
    display: isMobile && isOpen ? 'block' : 'none'
  };

  // Sidebar styles
  const sidebarStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '16rem',
    backgroundColor: '#1a1a1a',
    color: 'white',
    zIndex: 20,
    transition: 'all 0.3s ease-in-out',
    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)'
  };

  // Logo container styles
  const logoContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '4rem',
    padding: '0 1rem',
    borderBottom: '1px solid #333'
  };

  // Logo styles
  const logoStyles = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#a78bfa',
    textDecoration: 'none'
  };

  // Close button styles
  const closeButtonStyles = {
    display: isMobile ? 'block' : 'none',
    background: 'none',
    border: 'none',
    color: '#a0a0a0',
    cursor: 'pointer'
  };

  // Navigation styles
  const navStyles = {
    marginTop: '1.5rem',
    padding: '0 0.75rem'
  };

  // Navigation list styles
  const navListStyles = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  };

  // Item styles
  const getItemStyles = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem',
    borderRadius: '0.375rem',
    backgroundColor: isActive ? '#2d2d2d' : 'transparent',
    color: isActive ? '#a78bfa' : '#d1d5db',
    textDecoration: 'none',
    transition: 'background-color 0.2s',
    hover: {
      backgroundColor: '#2d2d2d'
    }
  });

  // Parent item button styles
  const getParentButtonStyles = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0.5rem',
    borderRadius: '0.375rem',
    backgroundColor: isActive ? '#2d2d2d' : 'transparent',
    color: isActive ? '#a78bfa' : '#d1d5db',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: 'inherit',
    fontSize: '1rem'
  });

  // Child list styles
  const childListStyles = {
    listStyle: 'none',
    paddingLeft: '2rem',
    marginTop: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  };

  // Child item styles
  const getChildItemStyles = (isActive) => ({
    display: 'block',
    padding: '0.5rem',
    borderRadius: '0.375rem',
    backgroundColor: isActive ? '#2d2d2d' : 'transparent',
    color: isActive ? '#a78bfa' : '#a0a0a0',
    textDecoration: 'none',
    fontSize: '0.875rem'
  });
  
  return (
    <>
      {/* Mobile menu button - only visible on small screens */}
      <button 
        onClick={toggleSidebar}
        style={menuButtonStyles}
      >
        {isOpen ? icons.close : icons.menu}
      </button>
      
      {/* Sidebar backdrop for mobile - only visible when sidebar is open on mobile */}
      <div 
        style={backdropStyles}
        onClick={toggleSidebar}
      />
      
      {/* Sidebar */}
      <aside style={sidebarStyles}>
        {/* Logo */}
        <div style={logoContainerStyles}>
          <Link to="/" style={logoStyles}>
            Neurofy
          </Link>
          {/* Close button - only visible on mobile */}
          <button 
            onClick={toggleSidebar}
            style={closeButtonStyles}
          >
            {icons.close}
          </button>
        </div>
        
        {/* Sidebar items */}
        <nav style={navStyles}>
          <ul style={navListStyles}>
            {sidebarItems.map((item) => (
              <li key={item.title}>
                {item.children ? (
                  // Parent item with children (accordion)
                  <div>
                    <button
                      onClick={() => toggleExpand(item.title)}
                      style={getParentButtonStyles(isRouteActive(item.path))}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>
                        <span>{item.title}</span>
                      </div>
                      <span>
                        {expandedItems[item.title] ? '▼' : '▶'}
                      </span>
                    </button>
                    
                    {/* Children/submenu */}
                    {expandedItems[item.title] && (
                      <ul style={childListStyles}>
                        {item.children.map((child) => (
                          <li key={child.title}>
                            <Link 
                              to={child.path}
                              style={getChildItemStyles(location.pathname === child.path)}
                            >
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  // Regular menu item
                  <Link 
                    to={item.path}
                    style={getItemStyles(location.pathname === item.path || isRouteActive(item.path))}
                  >
                    <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>
                    <span>{item.title}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;