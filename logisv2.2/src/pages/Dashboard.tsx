import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Star, Mail, Book, Beaker, Globe, Apple, LogOut, Wand2, Bot, History, Rocket, Heart, GraduationCap, Share2, UserPlus, Zap, BookOpen } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3001/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const sidebarItems = [
    { name: 'Create Lesson Plan', icon: <Wand2 className="w-6 h-6" />, link: '/lesson-plan' },
    { name: 'Teaching Info', icon: <BookOpen className="w-6 h-6" />, link: '/teaching-info' },
    { name: 'Raina (Chatbot)', icon: <Bot className="w-6 h-6" />, link: '/chatbot' },
    { name: 'Output History', icon: <History className="w-6 h-6" />, link: '/history' },
    { name: 'Launch to Students', icon: <Rocket className="w-6 h-6" />, link: '/launch' },
    { name: 'Love', icon: <Heart className="w-6 h-6" />, link: '/love' },
    { name: 'Training', icon: <GraduationCap className="w-6 h-6" />, link: '/training' },
    { name: 'Share the Magic', icon: <Share2 className="w-6 h-6" />, link: '/share' },
    { name: 'MagicStudent Intro', icon: <UserPlus className="w-6 h-6" />, link: '/intro' },
    { name: 'Upgrade', icon: <Zap className="w-6 h-6" />, link: '/upgrade' },
  ];

  const tools = [
    { name: 'Professional Email', icon: <Mail className="w-8 h-8" />, description: 'Generate a professional e-mail communication', link: '/tool/professional-email' },
    { name: 'E-mail Responder', icon: <Mail className="w-8 h-8" />, description: 'Generate a customized professional e-mail response', link: '/tool/email-responder' },
    { name: 'E-mail Family', icon: <Mail className="w-8 h-8" />, description: 'Generate a professional e-mail communication to families', link: '/tool/email-family' },
    { name: '5E Model Lesson Plan', icon: <Book className="w-8 h-8" />, description: 'Generate a 5E model lesson plan for your class', link: '/tool/lesson-plan' },
    { name: 'Science Labs', icon: <Beaker className="w-8 h-8" />, description: 'Generate an engaging science lab', link: '/tool/science-labs' },
    { name: 'Real World Connections', icon: <Globe className="w-8 h-8" />, description: 'Generate real world examples to increase student investment', link: '/tool/real-world-connections' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
        <h1 className="text-3xl font-bold text-purple-600 mb-8 text-center">Okuyz</h1>
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="flex items-center p-2 mb-2 text-gray-700 hover:bg-purple-100 rounded transition duration-150 ease-in-out"
            >
              <span className="mr-3 text-purple-500">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        <div className="mt-auto p-4">
          <div className="bg-gray-200 rounded-full py-2 px-4 text-center text-gray-700">
            Free
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">Welcome, {user.username}!</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition duration-300 flex items-center"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center bg-gray-100 rounded-full p-2">
            <Search className="w-6 h-6 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search Tools"
              className="bg-transparent w-full focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <Link key={index} to={tool.link} className="block">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-purple-100 rounded-full p-3 mr-4">
                      {tool.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{tool.name}</h3>
                  </div>
                  <Star className="w-6 h-6 text-yellow-400 cursor-pointer" />
                </div>
                <p className="text-gray-600">{tool.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-purple-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Recommended For You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/tool/lesson-plan" className="block">
              <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition duration-300">
                <div className="flex items-center mb-2">
                  <Book className="w-6 h-6 mr-2 text-purple-500" />
                  <h3 className="font-semibold">5E Model Lesson Plan</h3>
                </div>
                <p className="text-sm text-gray-600">Generate a 5E model lesson plan for your science class.</p>
              </div>
            </Link>
            <Link to="/tool/science-labs" className="block">
              <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition duration-300">
                <div className="flex items-center mb-2">
                  <Beaker className="w-6 h-6 mr-2 text-purple-500" />
                  <h3 className="font-semibold">Science Labs</h3>
                </div>
                <p className="text-sm text-gray-600">Generate an engaging science lab based on topics of your choice.</p>
              </div>
            </Link>
            <Link to="/tool/standards-unpacker" className="block">
              <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition duration-300">
                <div className="flex items-center mb-2">
                  <Apple className="w-6 h-6 mr-2 text-purple-500" />
                  <h3 className="font-semibold">Standards Unpacker</h3>
                </div>
                <p className="text-sm text-gray-600">Unpack any standard into component parts to understand student needs.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
