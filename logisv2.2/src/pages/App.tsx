import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import ToolPage from './ToolPage';
import TeachingInfo from './TeachingInfo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tool/:toolName" element={<ToolPage />} />
        {/* Add more routes for sidebar items */}
        <Route path="/lesson-plan" element={<ToolPage toolName="Create Lesson Plan" />} />
        <Route path="/chatbot" element={<ToolPage toolName="Raina (Chatbot)" />} />
        <Route path="/history" element={<ToolPage toolName="Output History" />} />
        <Route path="/launch" element={<ToolPage toolName="Launch to Students" />} />
        <Route path="/love" element={<ToolPage toolName="Love" />} />
        <Route path="/training" element={<ToolPage toolName="Training" />} />
        <Route path="/share" element={<ToolPage toolName="Share the Magic" />} />
        <Route path="/intro" element={<ToolPage toolName="MagicStudent Intro" />} />
        <Route path="/upgrade" element={<ToolPage toolName="Upgrade" />} />
        <Route path="/teaching-info" element={<TeachingInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
