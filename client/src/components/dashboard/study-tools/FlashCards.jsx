// src/components/dashboard/study-tools/Flashcards.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// SVG Icons (embedded directly to avoid lucide-react dependency issues)
const icons = {
  search: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  plus: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  moreVertical: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="12" cy="5" r="1"></circle>
      <circle cx="12" cy="19" r="1"></circle>
    </svg>
  ),
  folder: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
    </svg>
  ),
  clock: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  ),
  edit: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  ),
  trash: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  ),
  download: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  ),
  bookOpen: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  ),
  tag: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
      <line x1="7" y1="7" x2="7.01" y2="7"></line>
    </svg>
  ),
  filter: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
  ),
  x: (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  checkCircle: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  )
};

const Flashcards = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showTagFilter, setShowTagFilter] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [flashcardDecks, setFlashcardDecks] = useState([]);
  
  // Simulate fetching data from API
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchData = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // This would be the result of your API call
        const data = []; // Leave empty as requested
        
        setFlashcardDecks(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching flashcard decks:", error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Get all unique tags from decks
  const allTags = [...new Set(flashcardDecks.flatMap(deck => deck.tags || []))];
  
  // Event handlers
  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const toggleTagFilter = () => {
    setShowTagFilter(!showTagFilter);
  };
  
  const toggleTagSelection = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const clearAllFilters = () => {
    setSearchQuery('');
    setActiveFilter('all');
    setSelectedTags([]);
  };
  
  const handleDeleteDeck = (id) => {
    if (window.confirm('Are you sure you want to delete this flashcard deck?')) {
      setFlashcardDecks(flashcardDecks.filter(deck => deck.id !== id));
      setMenuOpen(null);
    }
  };

  const handleCreateDeck = () => {
    // This would open a modal in a real implementation
    alert('Create deck functionality would open a modal here');
  };
  
  // Filter decks based on search, filter type, and tags
  const filterDecks = () => {
    let filtered = [...flashcardDecks];
    
    // Text search
    if (searchQuery) {
      filtered = filtered.filter(deck => 
        deck.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deck.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deck.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Type filter
    if (activeFilter === 'due') {
      filtered = filtered.filter(deck => deck.dueCards > 0);
    } else if (activeFilter === 'recent') {
      filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
    } else if (activeFilter === 'progress') {
      filtered = filtered.sort((a, b) => b.progress - a.progress);
    }
    
    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(deck => 
        selectedTags.some(tag => deck.tags?.includes(tag))
      );
    }
    
    return filtered;
  };
  
  const filteredDecks = filterDecks();
  
  // Styles object for consistent styling (matching GettingStarted.jsx)
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
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      boxSizing: 'border-box', // Ensure padding is included in width calculation
      overflow: 'hidden' // Prevent overflow issues
    },
    headerFlex: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    headerFlexDesktop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    createButton: {
      display: 'inline-flex',
      alignItems: 'center',
      backgroundColor: '#6d28d9',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      border: 'none',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    createButtonHover: {
      backgroundColor: '#5b21b6'
    },
    searchContainer: {
      width: '100%',
      position: 'relative',
      boxSizing: 'border-box', // Ensure padding is included in width calculation
      marginTop: '0.5rem' // Reduced from 1rem
    },
    searchIcon: {
      position: 'absolute',
      left: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#718096',
      zIndex: 1 // Ensure icon appears above input
    },
    searchInput: {
      width: '100%',
      boxSizing: 'border-box', // Critical for proper sizing!
      padding: '0.5rem 1rem 0.5rem 2.5rem',
      backgroundColor: '#2d2d2d',
      border: '1px solid #4a5568',
      borderRadius: '0.375rem',
      color: 'white',
      fontSize: '0.875rem'
    },
    filtersContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      marginTop: '1rem'
    },
    filterButton: {
      display: 'inline-flex',
      alignItems: 'center',
      backgroundColor: '#2d2d2d',
      color: '#a0aec0',
      padding: '0.375rem 0.75rem',
      borderRadius: '0.375rem',
      border: 'none',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    filterButtonActive: {
      backgroundColor: '#6d28d9',
      color: 'white'
    },
    tagFilterContainer: {
      marginTop: '1rem',
      padding: '0.75rem',
      backgroundColor: '#2d2d2d',
      borderRadius: '0.375rem',
      border: '1px solid #4a5568'
    },
    tagFilterHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.5rem'
    },
    tagFilterTitle: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: 'white'
    },
    tagFilterClear: {
      fontSize: '0.75rem',
      color: '#a78bfa',
      background: 'none',
      border: 'none',
      cursor: 'pointer'
    },
    tagGridContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      marginTop: '0.5rem'
    },
    tagPill: {
      display: 'inline-block',
      backgroundColor: '#3d3d3d',
      color: '#a0aec0',
      borderRadius: '9999px',
      padding: '0.25rem 0.75rem',
      fontSize: '0.75rem',
      fontWeight: '500',
      cursor: 'pointer',
      border: 'none'
    },
    tagPillActive: {
      backgroundColor: '#6d28d9',
      color: 'white'
    },
    activeFiltersContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '0.5rem',
      marginTop: '1rem',
      fontSize: '0.875rem',
      color: '#a0aec0'
    },
    activeFilterLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    activeFilterPill: {
      display: 'inline-flex',
      alignItems: 'center',
      backgroundColor: '#2d2d2d',
      color: '#a78bfa',
      borderRadius: '9999px',
      padding: '0.25rem 0.75rem',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    clearFilterButton: {
      marginLeft: '0.25rem',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#a0aec0',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    clearAllButton: {
      marginLeft: 'auto',
      fontSize: '0.75rem',
      color: '#a78bfa',
      cursor: 'pointer',
      background: 'none',
      border: 'none'
    },
    decksGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
      gap: '1rem'
    },
    deckCard: {
      backgroundColor: '#1e1e1e',
      borderRadius: '0.5rem',
      padding: '1.25rem',
      border: '1px solid #2d3748',
      position: 'relative',
      transition: 'border-color 0.2s'
    },
    deckCardHover: {
      borderColor: '#6d28d9'
    },
    menuButton: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#a0aec0',
      cursor: 'pointer',
      padding: '0.25rem',
      borderRadius: '0.25rem'
    },
    dropdown: {
      position: 'absolute',
      right: '0',
      top: '100%',
      marginTop: '0.5rem',
      width: '12rem',
      backgroundColor: '#2d2d2d',
      borderRadius: '0.375rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      zIndex: '10',
      overflow: 'hidden',
      border: '1px solid #4a5568'
    },
    dropdownItem: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: '0.5rem 1rem',
      backgroundColor: 'transparent',
      border: 'none',
      textAlign: 'left',
      fontSize: '0.875rem',
      color: '#d1d5db',
      cursor: 'pointer'
    },
    dropdownItemDelete: {
      color: '#f87171'
    },
    deckTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: 'white',
      marginBottom: '0.5rem',
      paddingRight: '2rem'
    },
    deckDescription: {
      fontSize: '0.875rem',
      color: '#a0aec0',
      marginBottom: '1rem'
    },
    deckStats: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.875rem',
      color: '#a0aec0',
      marginBottom: '1rem'
    },
    statItem: {
      display: 'flex',
      alignItems: 'center',
      marginRight: '1rem'
    },
    statIcon: {
      marginRight: '0.25rem'
    },
    progressContainer: {
      marginBottom: '1rem'
    },
    progressHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.25rem'
    },
    progressLabel: {
      fontSize: '0.75rem',
      color: '#a0aec0'
    },
    progressValue: {
      fontSize: '0.75rem',
      fontWeight: '500',
      color: '#a78bfa'
    },
    progressBar: {
      width: '100%',
      height: '0.5rem',
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
    dueCardsBadge: {
      display: 'inline-block',
      backgroundColor: 'rgba(109, 40, 217, 0.2)',
      color: '#a78bfa',
      borderRadius: '0.25rem',
      padding: '0.25rem 0.5rem',
      fontSize: '0.75rem',
      fontWeight: '500',
      marginBottom: '0.75rem'
    },
    tagsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      marginTop: '0.5rem'
    },
    tagBadge: {
      display: 'inline-block',
      backgroundColor: '#2d2d2d',
      color: '#a0aec0',
      borderRadius: '0.25rem',
      padding: '0.25rem 0.5rem',
      fontSize: '0.75rem',
      cursor: 'pointer'
    },
    studyButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      marginTop: '1rem',
      padding: '0.5rem 0',
      backgroundColor: '#6d28d9',
      color: 'white',
      border: 'none',
      borderRadius: '0.375rem',
      fontWeight: '500',
      cursor: 'pointer'
    },
    studyButtonIcon: {
      marginRight: '0.5rem'
    },
    createDeckCard: {
      backgroundColor: '#1e1e1e',
      borderRadius: '0.5rem',
      border: '1px dashed #4a5568',
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'border-color 0.2s, background-color 0.2s',
      minHeight: '20rem'
    },
    createDeckIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '3rem',
      height: '3rem',
      borderRadius: '50%',
      backgroundColor: 'rgba(109, 40, 217, 0.2)',
      color: '#a78bfa',
      marginBottom: '1rem'
    },
    createDeckTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: 'white',
      marginBottom: '0.5rem',
      textAlign: 'center'
    },
    createDeckDescription: {
      fontSize: '0.875rem',
      color: '#a0aec0',
      marginBottom: '1.5rem',
      textAlign: 'center'
    },
    emptyState: {
      backgroundColor: '#1e1e1e',
      borderRadius: '0.5rem',
      padding: '2rem',
      border: '1px solid #2d3748',
      textAlign: 'center'
    },
    emptyStateTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: 'white',
      marginBottom: '0.5rem'
    },
    emptyStateDescription: {
      color: '#a0aec0',
      marginBottom: '1.5rem'
    },
    skeletonContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
      gap: '1rem'
    },
    skeletonCard: {
      backgroundColor: '#1e1e1e',
      borderRadius: '0.5rem',
      padding: '1.25rem',
      border: '1px solid #2d3748'
    },
    skeletonLine: {
      height: '0.75rem',
      backgroundColor: '#2d2d2d',
      borderRadius: '0.25rem',
      marginBottom: '0.75rem'
    },
    skeletonShort: {
      width: '70%'
    },
    skeletonFull: {
      width: '100%'
    },
    skeletonFlexRow: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '0.75rem'
    },
    skeletonChip: {
      height: '1.5rem',
      width: '5rem',
      backgroundColor: '#2d2d2d',
      borderRadius: '9999px'
    },
    noResults: {
      backgroundColor: '#1e1e1e',
      borderRadius: '0.5rem',
      padding: '2rem',
      border: '1px solid #2d3748',
      textAlign: 'center' 
    },
    noResultsText: {
      color: '#a0aec0',
      marginBottom: '1rem'
    },
    buttonDivider: {
      height: '1px',
      width: '100%',
      backgroundColor: '#2d3748',
      margin: '1rem 0'
    }
  };

  // For medium and larger screens, adjust to a multi-column layout
  // Using inline check instead of window.innerWidth to avoid SSR issues
  const isMediumScreen = typeof window !== 'undefined' && window.innerWidth >= 768;
  const isLargeScreen = typeof window !== 'undefined' && window.innerWidth >= 1024;
  
  if (isMediumScreen) {
    styles.headerFlex = {
      ...styles.headerFlex,
      ...styles.headerFlexDesktop
    };
    styles.decksGrid = {
      ...styles.decksGrid,
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
    };
    styles.skeletonContainer = {
      ...styles.skeletonContainer,
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
    };
  }
  
  if (isLargeScreen) {
    styles.decksGrid = {
      ...styles.decksGrid,
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'
    };
    styles.skeletonContainer = {
      ...styles.skeletonContainer,
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'
    };
  }
  
  // Skeleton loader component
  const SkeletonLoader = () => (
    <div style={styles.skeletonContainer}>
      {[1, 2, 3].map(i => (
        <div key={i} style={styles.skeletonCard}>
          <div style={{...styles.skeletonLine, ...styles.skeletonShort}}></div>
          <div style={{...styles.skeletonLine, ...styles.skeletonFull}}></div>
          <div style={styles.skeletonFlexRow}>
            <div style={{...styles.skeletonLine, width: '40%'}}></div>
            <div style={{...styles.skeletonLine, width: '40%'}}></div>
          </div>
          <div style={{...styles.skeletonLine, ...styles.skeletonFull}}></div>
          <div style={styles.skeletonFlexRow}>
            <div style={styles.skeletonChip}></div>
            <div style={styles.skeletonChip}></div>
          </div>
          <div style={{...styles.skeletonLine, marginTop: '1rem', height: '2rem'}}></div>
        </div>
      ))}
    </div>
  );
  
  // Empty state component when no decks are available
  const EmptyState = () => (
    <div style={styles.emptyState}>
      <h3 style={styles.emptyStateTitle}>No Flashcard Decks Yet</h3>
      <p style={styles.emptyStateDescription}>
        Get started by creating your first flashcard deck.
      </p>
      <button 
        style={styles.createButton}
        onClick={handleCreateDeck}
      >
        <span style={{ marginRight: '0.5rem' }}>{icons.plus}</span>
        Create Your First Deck
      </button>
    </div>
  );
  
  // Matches the layout in your screenshot exactly
  const SimpleEmptyState = () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1e1e1e',
      borderRadius: '0.5rem',
      padding: '3rem 1rem',
      border: '1px solid #2d3748',
      textAlign: 'center'
    }}>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: '600',
        color: 'white',
        marginBottom: '0.75rem'
      }}>
        No Flashcard Decks Yet
      </h3>
      <p style={{
        color: '#a0aec0',
        marginBottom: '1.5rem'
      }}>
        Get started by creating your first flashcard deck.
      </p>
      <button 
        onClick={handleCreateDeck}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#6d28d9',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
          border: 'none',
          fontWeight: '500',
          cursor: 'pointer'
        }}
      >
        <span style={{ marginRight: '0.5rem' }}>{icons.plus}</span>
        Create Your First Deck
      </button>
    </div>
  );
  
  // No search results component
  const NoSearchResults = () => (
    <div style={styles.noResults}>
      <p style={styles.noResultsText}>
        No flashcard decks found matching your filters
      </p>
      <button 
        style={{color: '#a78bfa', background: 'none', border: 'none', cursor: 'pointer'}}
        onClick={clearAllFilters}
      >
        Clear all filters
      </button>
    </div>
  );
  
  // Create deck card component
  const CreateDeckCard = () => (
    <div 
      style={styles.createDeckCard}
      onClick={handleCreateDeck}
      onMouseOver={(e) => e.currentTarget.style.borderColor = '#6d28d9'}
      onMouseOut={(e) => e.currentTarget.style.borderColor = '#4a5568'}
    >
      <div style={styles.createDeckIcon}>
        {icons.plus}
      </div>
      <h3 style={styles.createDeckTitle}>Create New Deck</h3>
      <p style={styles.createDeckDescription}>
        Create a new flashcard deck to start studying
      </p>
      <button style={styles.createButton}>
        <span style={{ marginRight: '0.5rem' }}>{icons.plus}</span>
        Create New Deck
      </button>
    </div>
  );
  
  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.headerFlex}>
        <div style={styles.header}>
          <h1 style={styles.heading}>Flashcards</h1>
          <p style={styles.subHeading}>Create and manage your flashcard decks</p>
        </div>
        
        <button 
          style={styles.createButton}
          onClick={handleCreateDeck}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5b21b6'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6d28d9'}
        >
          <span style={{ marginRight: '0.5rem' }}>{icons.plus}</span>
          Create New Deck
        </button>
      </div>
      
      {/* Search and filter card */}
      <div style={{...styles.card, padding: '1rem', width: '100%'}}>
        {/* Search input */}
        <div style={styles.searchContainer}>
          <span style={styles.searchIcon}>{icons.search}</span>
          <input 
            type="text"
            placeholder="Search flashcards by title, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        
        {/* Filter buttons */}
        <div style={styles.filtersContainer}>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeFilter === 'all' ? styles.filterButtonActive : {})
            }}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeFilter === 'due' ? styles.filterButtonActive : {})
            }}
            onClick={() => setActiveFilter('due')}
          >
            Due
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeFilter === 'recent' ? styles.filterButtonActive : {})
            }}
            onClick={() => setActiveFilter('recent')}
          >
            Recent
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeFilter === 'progress' ? styles.filterButtonActive : {})
            }}
            onClick={() => setActiveFilter('progress')}
          >
            Progress
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(showTagFilter ? styles.filterButtonActive : {})
            }}
            onClick={toggleTagFilter}
          >
            <span style={{ marginRight: '0.5rem' }}>{icons.tag}</span>
            Tags
          </button>
        </div>
        
        {/* Tag filter dropdown */}
        {showTagFilter && (
          <div style={styles.tagFilterContainer}>
            <div style={styles.tagFilterHeader}>
              <h4 style={styles.tagFilterTitle}>Filter by Tags</h4>
              {selectedTags.length > 0 && (
                <button 
                  style={styles.tagFilterClear}
                  onClick={() => setSelectedTags([])}
                >
                  Clear tags
                </button>
              )}
            </div>
            <div style={styles.tagGridContainer}>
              {allTags.length > 0 ? (
                allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTagSelection(tag)}
                    style={{
                      ...styles.tagPill,
                      ...(selectedTags.includes(tag) ? styles.tagPillActive : {})
                    }}
                  >
                    #{tag}
                  </button>
                ))
              ) : (
                <p style={{ color: '#a0aec0', fontSize: '0.875rem' }}>
                  No tags available
                </p>
              )}
            </div>
          </div>
        )}
        
        {/* Active filters summary */}
        {(searchQuery || activeFilter !== 'all' || selectedTags.length > 0) && (
          <div style={styles.activeFiltersContainer}>
            <div style={styles.activeFilterLabel}>
              <span>{icons.filter}</span>
              <span>Active filters:</span>
            </div>
            
            {searchQuery && (
              <div style={styles.activeFilterPill}>
                "{searchQuery}"
                <button 
                  style={styles.clearFilterButton}
                  onClick={() => setSearchQuery('')}
                >
                  {icons.x}
                </button>
              </div>
            )}
            
            {activeFilter !== 'all' && (
              <div style={styles.activeFilterPill}>
                {activeFilter === 'due' ? 'Due Cards' : 
                 activeFilter === 'recent' ? 'Recent' : 'Progress'}
                <button 
                  style={styles.clearFilterButton}
                  onClick={() => setActiveFilter('all')}
                >
                  {icons.x}
                </button>
              </div>
            )}
            
            {selectedTags.map(tag => (
              <div key={tag} style={styles.activeFilterPill}>
                #{tag}
                <button 
                  style={styles.clearFilterButton}
                  onClick={() => toggleTagSelection(tag)}
                >
                  {icons.x}
                </button>
              </div>
            ))}
            
            {(searchQuery || activeFilter !== 'all' || selectedTags.length > 0) && (
              <button 
                style={styles.clearAllButton}
                onClick={clearAllFilters}
              >
                Clear all
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Main content - Flashcard Decks */}
      {isLoading ? (
        <SkeletonLoader />
      ) : flashcardDecks.length === 0 ? (
        <SimpleEmptyState />
      ) : filteredDecks.length === 0 ? (
        <NoSearchResults />
      ) : (
        <div style={styles.decksGrid}>
          {filteredDecks.map(deck => (
            <div 
              key={deck.id} 
              style={styles.deckCard}
              onMouseOver={(e) => e.currentTarget.style.borderColor = '#6d28d9'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = '#2d3748'}
            >
              {/* Menu button */}
              <div style={{ position: 'relative' }}>
                <button 
                  style={styles.menuButton}
                  onClick={() => toggleMenu(deck.id)}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2d2d2d'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {icons.moreVertical}
                </button>
                
                {/* Dropdown menu */}
                {menuOpen === deck.id && (
                  <div style={styles.dropdown}>
                    <button style={styles.dropdownItem}>
                      <span style={{ marginRight: '0.5rem' }}>{icons.edit}</span>
                      Edit Deck
                    </button>
                    <button style={styles.dropdownItem}>
                      <span style={{ marginRight: '0.5rem' }}>{icons.download}</span>
                      Export Deck
                    </button>
                    <button 
                      style={{...styles.dropdownItem, ...styles.dropdownItemDelete}}
                      onClick={() => handleDeleteDeck(deck.id)}
                    >
                      <span style={{ marginRight: '0.5rem' }}>{icons.trash}</span>
                      Delete Deck
                    </button>
                  </div>
                )}
              </div>
              
              {/* Deck info */}
              <h3 
                style={styles.deckTitle}
                onMouseOver={(e) => e.currentTarget.style.color = '#a78bfa'}
                onMouseOut={(e) => e.currentTarget.style.color = 'white'}
              >
                {deck.title}
              </h3>
              <p style={styles.deckDescription}>{deck.description}</p>
              
              {/* Deck stats */}
              <div style={styles.deckStats}>
                <div style={styles.statItem}>
                  <span style={styles.statIcon}>{icons.folder}</span>
                  {deck.cardCount} cards
                </div>
                <div style={styles.statItem}>
                  <span style={styles.statIcon}>{icons.clock}</span>
                  {deck.lastStudied}
                </div>
              </div>
              
              {/* Progress bar */}
              <div style={styles.progressContainer}>
                <div style={styles.progressHeader}>
                  <span style={styles.progressLabel}>Progress</span>
                  <span style={styles.progressValue}>{deck.progress}%</span>
                </div>
                <div style={styles.progressBar}>
                  <div 
                    style={{
                      ...styles.progressFill,
                      width: `${deck.progress}%`
                    }}
                  ></div>
                </div>
              </div>
              
              {/* Due cards label */}
              {deck.dueCards > 0 && (
                <div style={styles.dueCardsBadge}>
                  {deck.dueCards} cards due for review
                </div>
              )}
              
              {/* Tags */}
              {deck.tags && deck.tags.length > 0 && (
                <div style={styles.tagsContainer}>
                  {deck.tags.map(tag => (
                    <span 
                      key={tag} 
                      style={styles.tagBadge}
                      onClick={() => {
                        toggleTagSelection(tag);
                        setShowTagFilter(true);
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3d3d3d'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2d2d2d'}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Divider */}
              <div style={styles.buttonDivider}></div>
              
              {/* Study button */}
              <button 
                style={styles.studyButton}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5b21b6'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6d28d9'}
              >
                <span style={styles.studyButtonIcon}>{icons.bookOpen}</span>
                Study Now
              </button>
            </div>
          ))}
          
          {/* Create new deck card */}
          <CreateDeckCard />
        </div>
      )}
    </div>
  );
};

export default Flashcards;