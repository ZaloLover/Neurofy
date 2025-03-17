// src/components/dashboard/study-tools/Notes.jsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// SVG Icons (embedded directly to avoid lucide-react dependency issues)
const icons = {
  plus: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  search: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  moreVertical: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="12" cy="5" r="1"></circle>
      <circle cx="12" cy="19" r="1"></circle>
    </svg>
  ),
  edit: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  ),
  trash: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  ),
  save: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
      <polyline points="17 21 17 13 7 13 7 21"></polyline>
      <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
  ),
  calendar: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  ),
  tag: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
      <line x1="7" y1="7" x2="7.01" y2="7"></line>
    </svg>
  ),
  robot: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="10" rx="2"></rect>
      <circle cx="12" cy="5" r="2"></circle>
      <path d="M12 7v4"></path>
      <line x1="8" y1="16" x2="8" y2="16"></line>
      <line x1="16" y1="16" x2="16" y2="16"></line>
    </svg>
  ),
  close: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  folder: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
    </svg>
  ),
  check: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
  sparkles: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v5m0 4v9M5 8l2.5 2.5M16.5 10.5L19 13M3 17h4m10 0h4M8 3l-3 3m14-3l3 3M8 21l-3-3m14 3l3-3"></path>
    </svg>
  ),
};

const Notes = () => {
  // State management
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const [currentFolder, setCurrentFolder] = useState("All Notes");
  const [folders, setFolders] = useState([
    "All Notes",
    "Important",
    "School",
    "Work",
  ]);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const editorRef = useRef(null);
  const noteInputRef = useRef(null);
  const [editorContent, setEditorContent] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [isNewNote, setIsNewNote] = useState(true);
  const [aiInputText, setAiInputText] = useState("");
  const [aiOutput, setAiOutput] = useState("");
  const [isProcessingAI, setIsProcessingAI] = useState(false);

  // Fetch notes from database (simulated)
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setIsLoading(true);

        // Fetch notes from the API
        const response = await fetch("/api/notes", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data = await response.json();
        setNotes(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // Filter notes based on search query and current folder
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesFolder =
      currentFolder === "All Notes" || note.folder === currentFolder;

    return matchesSearch && matchesFolder;
  });

  // Sort notes by last updated date
  const sortedNotes = [...filteredNotes].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  // Get currently selected note

  // Handlers
  const handleSelectNote = (id) => {
    setSelectedNoteId(id);
    const note = notes.find((note) => note.id === id);
    if (note) {
      setNoteTitle(note.title);
      setEditorContent(note.content);
    }
    setShowNoteEditor(true);
    setIsNewNote(false);
  };

  const handleCreateNewNote = () => {
    setNoteTitle("Untitled Note");
    setEditorContent("");
    setSelectedNoteId(null);
    setShowNoteEditor(true);
    setIsNewNote(true);

    // Focus on title input
    setTimeout(() => {
      if (noteInputRef.current) {
        noteInputRef.current.focus();
        noteInputRef.current.select();
      }
    }, 0);
  };

  const handleSaveNote = async () => {
    try {
      if (isNewNote) {
        // Create new note
        const newNote = {
          title: noteTitle || "Untitled Note",
          content: editorContent,
          folder:
            currentFolder === "All Notes" ? "Uncategorized" : currentFolder,
          tags: [],
        };

        // Call API to save the note
        const response = await fetch("/api/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"), // Assuming you store your auth token in localStorage
          },
          body: JSON.stringify(newNote),
        });

        if (!response.ok) {
          throw new Error("Failed to save note");
        }

        const savedNote = await response.json();
        setNotes([...notes, savedNote]);
        setSelectedNoteId(savedNote._id); // Note: MongoDB uses _id instead of id
        setIsNewNote(false);
      } else {
        // Update existing note
        const updatedNote = {
          title: noteTitle,
          content: editorContent,
        };

        // Call API to update the note
        const response = await fetch(`/api/notes/${selectedNoteId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(updatedNote),
        });

        if (!response.ok) {
          throw new Error("Failed to update note");
        }

        const updated = await response.json();

        // Update notes array
        setNotes(
          notes.map((note) => (note._id === selectedNoteId ? updated : note))
        );
      }

      // Show success message
      alert("Note saved successfully");
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Failed to save note: " + error.message);
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        // Call API to delete the note
        const response = await fetch(`/api/notes/${id}`, {
          method: 'DELETE',
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete note');
        }
        
        // Update local state
        setNotes(notes.filter(note => note._id !== id));
        
        // Close editor if the deleted note was being edited
        if (id === selectedNoteId) {
          setShowNoteEditor(false);
          setSelectedNoteId(null);
        }
        
        setMenuOpen(null);
      } catch (error) {
        console.error('Error deleting note:', error);
        alert('Failed to delete note: ' + error.message);
      }
    }
  };

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const handleCreateFolder = () => {
    if (
      newFolderName.trim() !== "" &&
      !folders.includes(newFolderName.trim())
    ) {
      setFolders([...folders, newFolderName.trim()]);
      setCurrentFolder(newFolderName.trim());
      setIsCreatingFolder(false);
      setNewFolderName("");
    }
  };

  const handleAIConvert = async () => {
    if (!aiInputText.trim()) return;

    setIsProcessingAI(true);

    try {
      // In a real app, this would be an API call to your AI service
      // Simulating AI processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate AI converted notes
      const simulatedAIResponse =
        `# ${aiInputText.split(" ").slice(0, 3).join(" ")}...\n\n` +
        `## Key Points\n\n` +
        `- ${aiInputText.split(".").slice(0, 1).join(".")}\n` +
        `- Additional insight extracted from your text\n` +
        `- Another important concept\n\n` +
        `## Summary\n\n` +
        `${aiInputText}\n\n` +
        `## Action Items\n\n` +
        `- Follow up on key concepts\n` +
        `- Review material again later`;

      setAiOutput(simulatedAIResponse);
    } catch (error) {
      console.error("Error processing with AI:", error);
      setAiOutput(
        "An error occurred while processing your text with AI. Please try again."
      );
    } finally {
      setIsProcessingAI(false);
    }
  };

  const handleUseAIOutput = () => {
    setEditorContent(aiOutput);
    setShowAIModal(false);
    setAiInputText("");
    setAiOutput("");
  };

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  // Styles object for consistent styling
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      maxWidth: "100%",
      color: "white",
      height: "100%",
    },
    header: {
      marginBottom: "0.5rem",
    },
    heading: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "white",
      marginBottom: "0.5rem",
    },
    subHeading: {
      color: "#a0aec0",
      fontSize: "0.875rem",
    },
    headerFlex: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    headerFlexDesktop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    createButton: {
      display: "inline-flex",
      alignItems: "center",
      backgroundColor: "#6d28d9",
      color: "white",
      padding: "0.5rem 1rem",
      borderRadius: "0.375rem",
      border: "none",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    aiButton: {
      display: "inline-flex",
      alignItems: "center",
      backgroundColor: "#4d1c9c",
      color: "white",
      padding: "0.5rem 1rem",
      borderRadius: "0.375rem",
      border: "none",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s",
      marginLeft: "0.5rem",
    },
    mainContainer: {
      display: "flex",
      gap: "1rem",
      height: "calc(100vh - 180px)",
      maxHeight: "calc(100vh - 180px)",
      overflow: "hidden",
    },
    sidebarContainer: {
      width: "250px",
      backgroundColor: "#1e1e1e",
      borderRadius: "0.5rem",
      border: "1px solid #2d3748",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
    },
    sidebarHeader: {
      padding: "1rem",
      borderBottom: "1px solid #2d3748",
    },
    foldersContainer: {
      padding: "0.5rem 0",
      borderBottom: "1px solid #2d3748",
    },
    folderItem: {
      display: "flex",
      alignItems: "center",
      padding: "0.5rem 1rem",
      cursor: "pointer",
      fontSize: "0.875rem",
      color: "#d1d5db",
      transition: "background-color 0.2s",
    },
    folderItemActive: {
      backgroundColor: "#2d3748",
      color: "white",
    },
    folderIcon: {
      marginRight: "0.5rem",
      color: "#a78bfa",
    },
    newFolderContainer: {
      padding: "0.5rem 1rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    newFolderInput: {
      flex: 1,
      backgroundColor: "#2d2d2d",
      border: "1px solid #4a5568",
      color: "white",
      padding: "0.25rem 0.5rem",
      borderRadius: "0.25rem",
      fontSize: "0.875rem",
    },
    createFolderButton: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#4a5568",
      color: "white",
      width: "24px",
      height: "24px",
      borderRadius: "0.25rem",
      border: "none",
      cursor: "pointer",
    },
    cancelFolderButton: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#4a5568",
      color: "white",
      width: "24px",
      height: "24px",
      borderRadius: "0.25rem",
      border: "none",
      cursor: "pointer",
    },
    notesListContainer: {
      flex: 1,
      overflow: "auto",
      padding: "0.5rem",
    },
    noteItem: {
      padding: "0.75rem",
      borderRadius: "0.25rem",
      cursor: "pointer",
      marginBottom: "0.5rem",
      transition: "background-color 0.2s",
      position: "relative",
    },
    noteItemActive: {
      backgroundColor: "#2d3748",
    },
    noteItemHover: {
      backgroundColor: "#2d2d2d",
    },
    noteTitle: {
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "white",
      marginBottom: "0.25rem",
      paddingRight: "1.5rem",
    },
    notePreview: {
      fontSize: "0.75rem",
      color: "#a0aec0",
      marginBottom: "0.5rem",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    noteMetaContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    noteDate: {
      fontSize: "0.75rem",
      color: "#718096",
    },
    noteTags: {
      display: "flex",
      gap: "0.25rem",
    },
    noteTag: {
      fontSize: "0.7rem",
      color: "#a78bfa",
      backgroundColor: "rgba(167, 139, 250, 0.1)",
      padding: "0.125rem 0.25rem",
      borderRadius: "0.25rem",
    },
    menuButton: {
      position: "absolute",
      top: "0.5rem",
      right: "0.5rem",
      backgroundColor: "transparent",
      border: "none",
      color: "#a0aec0",
      cursor: "pointer",
      padding: "0.25rem",
      borderRadius: "0.25rem",
      transition: "background-color 0.2s, color 0.2s",
    },
    menuButtonHover: {
      backgroundColor: "#2d2d2d",
      color: "white",
    },
    dropdown: {
      position: "absolute",
      right: "0.5rem",
      top: "2rem",
      width: "12rem",
      backgroundColor: "#2d2d2d",
      borderRadius: "0.375rem",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      zIndex: "10",
      overflow: "hidden",
      border: "1px solid #4a5568",
    },
    dropdownItem: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      padding: "0.5rem 1rem",
      backgroundColor: "transparent",
      border: "none",
      textAlign: "left",
      fontSize: "0.875rem",
      color: "#d1d5db",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    dropdownItemDelete: {
      color: "#f87171",
    },
    contentContainer: {
      flex: 1,
      backgroundColor: "#1e1e1e",
      borderRadius: "0.5rem",
      border: "1px solid #2d3748",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    },
    searchContainer: {
      padding: "1rem",
      borderBottom: "1px solid #2d3748",
      position: "relative",
    },
    searchIcon: {
      position: "absolute",
      left: "1.75rem",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#718096",
    },
    searchInput: {
      width: "100%",
      padding: "0.5rem 1rem 0.5rem 2.5rem",
      backgroundColor: "#2d2d2d",
      border: "1px solid #4a5568",
      borderRadius: "0.375rem",
      color: "white",
      fontSize: "0.875rem",
      boxSizing: "border-box",
    },
    editorContainer: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      padding: "1rem",
      overflow: "auto",
    },
    editorHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem",
    },
    titleInput: {
      backgroundColor: "transparent",
      border: "none",
      outline: "none",
      color: "white",
      fontSize: "1.25rem",
      fontWeight: "600",
      width: "100%",
      padding: "0.25rem 0",
    },
    saveButton: {
      display: "inline-flex",
      alignItems: "center",
      backgroundColor: "#6d28d9",
      color: "white",
      padding: "0.5rem 1rem",
      borderRadius: "0.375rem",
      border: "none",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    editorTextarea: {
      backgroundColor: "#2d2d2d",
      border: "1px solid #4a5568",
      borderRadius: "0.375rem",
      color: "white",
      padding: "1rem",
      fontSize: "0.875rem",
      lineHeight: "1.5",
      width: "100%",
      height: "100%",
      boxSizing: "border-box",
      resize: "none",
      outline: "none",
      fontFamily: "monospace",
    },
    emptyNotesPlaceholder: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      padding: "2rem",
      textAlign: "center",
    },
    placeholderText: {
      color: "#a0aec0",
      marginBottom: "1.5rem",
    },
    noNotesSelected: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      padding: "2rem",
      textAlign: "center",
      color: "#a0aec0",
    },
    modal: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: "50",
    },
    modalContent: {
      backgroundColor: "#1e1e1e",
      borderRadius: "0.5rem",
      border: "1px solid #2d3748",
      width: "90%",
      maxWidth: "700px",
      maxHeight: "90vh",
      overflow: "auto",
      position: "relative",
    },
    modalHeader: {
      padding: "1rem",
      borderBottom: "1px solid #2d3748",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    modalTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "white",
    },
    closeButton: {
      backgroundColor: "transparent",
      border: "none",
      color: "#a0aec0",
      cursor: "pointer",
      padding: "0.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "0.25rem",
    },
    modalBody: {
      padding: "1rem",
    },
    aiTextarea: {
      width: "100%",
      minHeight: "150px",
      backgroundColor: "#2d2d2d",
      border: "1px solid #4a5568",
      borderRadius: "0.375rem",
      color: "white",
      padding: "1rem",
      fontSize: "0.875rem",
      lineHeight: "1.5",
      boxSizing: "border-box",
      resize: "vertical",
      outline: "none",
      fontFamily: "inherit",
      marginBottom: "1rem",
    },
    aiOutputContainer: {
      backgroundColor: "#2d2d2d",
      border: "1px solid #4a5568",
      borderRadius: "0.375rem",
      padding: "1rem",
      marginTop: "1rem",
      maxHeight: "300px",
      overflow: "auto",
      whiteSpace: "pre-wrap",
      fontSize: "0.875rem",
      lineHeight: "1.5",
      color: "white",
      fontFamily: "monospace",
    },
    aiButtonsContainer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "0.5rem",
      marginTop: "1rem",
    },
    aiProcessButton: {
      display: "inline-flex",
      alignItems: "center",
      backgroundColor: "#6d28d9",
      color: "white",
      padding: "0.5rem 1rem",
      borderRadius: "0.375rem",
      border: "none",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    loadingSpinner: {
      display: "inline-block",
      width: "1rem",
      height: "1rem",
      border: "2px solid currentColor",
      borderRadius: "50%",
      borderTopColor: "transparent",
      animation: "spin 1s linear infinite",
      marginRight: "0.5rem",
    },
    skeletonContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      padding: "0.5rem",
    },
    skeletonItem: {
      height: "5rem",
      backgroundColor: "#2d2d2d",
      borderRadius: "0.25rem",
      animation: "pulse 1.5s infinite",
      padding: "0.75rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    skeletonLine: {
      height: "0.75rem",
      backgroundColor: "#3d3d3d",
      borderRadius: "0.25rem",
      width: "60%",
    },
    skeletonText: {
      height: "0.5rem",
      backgroundColor: "#3d3d3d",
      borderRadius: "0.25rem",
      width: "100%",
    },
    errorText: {
      color: "#f87171",
      fontSize: "0.875rem",
      marginTop: "0.5rem",
    },
  };

  // For medium and larger screens, adjust to a multi-column layout
  // Using inline check instead of window.innerWidth to avoid SSR issues
  const isMediumScreen =
    typeof window !== "undefined" && window.innerWidth >= 768;

  if (isMediumScreen) {
    styles.headerFlex = {
      ...styles.headerFlex,
      ...styles.headerFlexDesktop,
    };
  }

  // Skeleton loader component
  const SkeletonLoader = () => (
    <div style={styles.skeletonContainer}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={styles.skeletonItem}>
          <div style={styles.skeletonLine}></div>
          <div style={styles.skeletonText}></div>
          <div style={styles.skeletonText}></div>
        </div>
      ))}
    </div>
  );

  // Empty state when no notes available
  const EmptyNotesState = () => (
    <div style={styles.emptyNotesPlaceholder}>
      <h3 style={{ color: "white", fontSize: "1.25rem", marginBottom: "1rem" }}>
        No Notes Yet
      </h3>
      <p style={styles.placeholderText}>
        Create your first note to start organizing your thoughts and knowledge.
      </p>
      <button
        style={styles.createButton}
        onClick={handleCreateNewNote}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#5b21b6")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#6d28d9")}
      >
        <span style={{ marginRight: "0.5rem" }}>{icons.plus}</span>
        Create Your First Note
      </button>
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.headerFlex}>
        <div style={styles.header}>
          <h1 style={styles.heading}>Notes</h1>
          <p style={styles.subHeading}>Organize your thoughts and knowledge</p>
        </div>

        <div>
          <button
            style={styles.createButton}
            onClick={handleCreateNewNote}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#5b21b6")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#6d28d9")
            }
          >
            <span style={{ marginRight: "0.5rem" }}>{icons.plus}</span>
            New Note
          </button>
          <button
            style={styles.aiButton}
            onClick={() => setShowAIModal(true)}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#3c1687")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#4d1c9c")
            }
          >
            <span style={{ marginRight: "0.5rem" }}>{icons.sparkles}</span>
            AI Convert
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div style={styles.mainContainer}>
        {/* Sidebar with folders and notes list */}
        <div style={styles.sidebarContainer}>
          {/* Folder list */}
          <div style={styles.sidebarHeader}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: "500", color: "white" }}>Folders</span>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "#a78bfa",
                  cursor: "pointer",
                }}
                onClick={() => setIsCreatingFolder(true)}
              >
                {icons.plus}
              </button>
            </div>
          </div>

          <div style={styles.foldersContainer}>
            {isCreatingFolder ? (
              <div style={styles.newFolderContainer}>
                <input
                  type="text"
                  placeholder="Folder name..."
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  style={styles.newFolderInput}
                  autoFocus
                />
                <button
                  style={styles.createFolderButton}
                  onClick={handleCreateFolder}
                >
                  {icons.check}
                </button>
                <button
                  style={styles.cancelFolderButton}
                  onClick={() => setIsCreatingFolder(false)}
                >
                  {icons.close}
                </button>
              </div>
            ) : (
              folders.map((folder) => (
                <div
                  key={folder}
                  style={{
                    ...styles.folderItem,
                    ...(currentFolder === folder
                      ? styles.folderItemActive
                      : {}),
                  }}
                  onClick={() => setCurrentFolder(folder)}
                  onMouseOver={(e) => {
                    if (currentFolder !== folder)
                      e.currentTarget.style.backgroundColor = "#2d2d2d";
                  }}
                  onMouseOut={(e) => {
                    if (currentFolder !== folder)
                      e.currentTarget.style.backgroundColor = "";
                  }}
                >
                  <span style={styles.folderIcon}>{icons.folder}</span>
                  {folder}
                </div>
              ))
            )}
          </div>

          {/* Search box */}
          <div style={styles.searchContainer}>
            <span style={styles.searchIcon}>{icons.search}</span>
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          {/* Notes list */}
          <div style={styles.notesListContainer}>
            {isLoading ? (
              <SkeletonLoader />
            ) : sortedNotes.length === 0 ? (
              <div
                style={{
                  padding: "1rem",
                  color: "#a0aec0",
                  textAlign: "center",
                  fontSize: "0.875rem",
                }}
              >
                {searchQuery
                  ? "No notes matching your search"
                  : "No notes in this folder"}
              </div>
            ) : (
              sortedNotes.map((note) => (
                <div
                  key={note.id}
                  style={{
                    ...styles.noteItem,
                    ...(selectedNoteId === note.id
                      ? styles.noteItemActive
                      : {}),
                  }}
                  onClick={() => handleSelectNote(note.id)}
                  onMouseOver={(e) => {
                    if (selectedNoteId !== note.id)
                      e.currentTarget.style.backgroundColor = "#2d2d2d";
                  }}
                  onMouseOut={(e) => {
                    if (selectedNoteId !== note.id)
                      e.currentTarget.style.backgroundColor = "";
                  }}
                >
                  <div style={styles.noteTitle}>{note.title}</div>
                  <div style={styles.notePreview}>{note.content}</div>
                  <div style={styles.noteMetaContainer}>
                    <div style={styles.noteDate}>
                      {formatDate(note.updatedAt)}
                    </div>

                    {note.tags.length > 0 && (
                      <div style={styles.noteTags}>
                        {note.tags.slice(0, 2).map((tag) => (
                          <span key={tag} style={styles.noteTag}>
                            #{tag}
                          </span>
                        ))}
                        {note.tags.length > 2 && (
                          <span style={styles.noteTag}>
                            +{note.tags.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Menu button */}
                  <button
                    style={styles.menuButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu(note.id);
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#3d3d3d")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    {icons.moreVertical}
                  </button>

                  {/* Dropdown menu */}
                  {menuOpen === note.id && (
                    <div style={styles.dropdown}>
                      <button
                        style={styles.dropdownItem}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectNote(note.id);
                          setMenuOpen(null);
                        }}
                      >
                        <span style={{ marginRight: "0.5rem" }}>
                          {icons.edit}
                        </span>
                        Edit
                      </button>
                      <button
                        style={{
                          ...styles.dropdownItem,
                          ...styles.dropdownItemDelete,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNote(note.id);
                        }}
                      >
                        <span style={{ marginRight: "0.5rem" }}>
                          {icons.trash}
                        </span>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Content area - Note editor or empty state */}
        <div style={styles.contentContainer}>
          {isLoading ? (
            <div
              style={{
                padding: "2rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ color: "#a0aec0" }}>Loading...</div>
            </div>
          ) : !showNoteEditor ? (
            <div style={styles.noNotesSelected}>
              <p>Select a note or create a new one</p>
            </div>
          ) : (
            <div style={styles.editorContainer}>
              <div style={styles.editorHeader}>
                <input
                  ref={noteInputRef}
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="Note title"
                  style={styles.titleInput}
                />
                <button
                  onClick={handleSaveNote}
                  style={styles.saveButton}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#5b21b6")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#6d28d9")
                  }
                >
                  <span style={{ marginRight: "0.5rem" }}>{icons.save}</span>
                  Save
                </button>
              </div>

              <textarea
                ref={editorRef}
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
                placeholder="Start writing your note here..."
                style={styles.editorTextarea}
              />
            </div>
          )}
        </div>
      </div>

      {/* AI Convert Modal */}
      {showAIModal && (
        <div style={styles.modal} onClick={() => setShowAIModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                <span style={{ color: "#a78bfa", marginRight: "0.5rem" }}>
                  {icons.sparkles}
                </span>
                AI Text Conversion
              </h3>
              <button
                style={styles.closeButton}
                onClick={() => setShowAIModal(false)}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#2d2d2d")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                {icons.close}
              </button>
            </div>

            <div style={styles.modalBody}>
              <p style={{ color: "#a0aec0", marginBottom: "1rem" }}>
                Paste any text and our AI will convert it into a structured,
                well-formatted note.
              </p>

              <textarea
                value={aiInputText}
                onChange={(e) => setAiInputText(e.target.value)}
                placeholder="Paste your text here..."
                style={styles.aiTextarea}
              />

              <button
                onClick={handleAIConvert}
                disabled={isProcessingAI || !aiInputText.trim()}
                style={{
                  ...styles.aiProcessButton,
                  opacity: isProcessingAI || !aiInputText.trim() ? 0.7 : 1,
                  cursor:
                    isProcessingAI || !aiInputText.trim()
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {isProcessingAI ? (
                  <>
                    <span style={styles.loadingSpinner}></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <span style={{ marginRight: "0.5rem" }}>
                      {icons.sparkles}
                    </span>
                    Convert to Note
                  </>
                )}
              </button>

              {aiOutput && (
                <>
                  <h4
                    style={{
                      color: "white",
                      marginTop: "1.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    AI Generated Note:
                  </h4>
                  <div style={styles.aiOutputContainer}>{aiOutput}</div>

                  <div style={styles.aiButtonsContainer}>
                    <button
                      style={{
                        ...styles.aiProcessButton,
                        backgroundColor: "#4a5568",
                      }}
                      onClick={() => setShowAIModal(false)}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#2d3748")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "#4a5568")
                      }
                    >
                      Cancel
                    </button>
                    <button
                      style={styles.aiProcessButton}
                      onClick={handleUseAIOutput}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#5b21b6")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "#6d28d9")
                      }
                    >
                      <span style={{ marginRight: "0.5rem" }}>
                        {icons.check}
                      </span>
                      Use This Note
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
