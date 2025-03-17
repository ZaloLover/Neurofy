// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Updated import
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Register from './components/Register';
import VerifyEmail from './components/VerifyEmail';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import LandingPage from './components/LandingPage';

// Dashboard components
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './components/dashboard/DashboardHome';
import GettingStarted from './components/dashboard/GettingStarted';
import Flashcards from './components/dashboard/study-tools/FlashCards';
import Notes from './components/dashboard/study-tools/Notes';
import QuizGenerator from './components/dashboard/study-tools/QuizGenerator';

// Placeholder components for routes that are not implemented yet
const PlaceholderPage = ({ title }) => (
  <div className="p-4">
    <h1 className="text-2xl font-bold text-white mb-4">{title}</h1>
    <p className="text-gray-400">This feature is coming soon!</p>
  </div>
);

const SpacedRepetition = () => <PlaceholderPage title="Spaced Repetition" />;
const MindMaps = () => <PlaceholderPage title="Mind Maps" />;
const MemoryPalace = () => <PlaceholderPage title="Memory Palace" />;
const Settings = () => <PlaceholderPage title="Settings" />;

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          
          {/* Protected dashboard routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              {/* Dashboard pages */}
              <Route index element={<DashboardHome />} />
              <Route path="getting-started" element={<GettingStarted />} />
              
              {/* Study Tools */}
              <Route path="study-tools">
                <Route index element={<PlaceholderPage title="Study Tools" />} />
                <Route path="flashcards" element={<Flashcards />} />
                <Route path="notes" element={<Notes />} />
                <Route path="quizzes" element={<QuizGenerator />} />
              </Route>
              
              {/* Memory Tools */}
              <Route path="memory-tools">
                <Route index element={<PlaceholderPage title="Memory Tools" />} />
                <Route path="spaced-repetition" element={<SpacedRepetition />} />
                <Route path="mind-maps" element={<MindMaps />} />
                <Route path="memory-palace" element={<MemoryPalace />} />
              </Route>
              
              {/* Settings */}
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;