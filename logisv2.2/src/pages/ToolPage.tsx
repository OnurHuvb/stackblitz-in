import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ToolPage: React.FC<{ toolName?: string }> = ({ toolName: propToolName }) => {
  const { toolName: paramToolName } = useParams<{ toolName: string }>();
  const toolName = propToolName || paramToolName;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Link to="/dashboard" className="flex items-center text-purple-600 hover:text-purple-800 mb-8">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Dashboard
      </Link>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4">{toolName}</h1>
        <p className="text-gray-600">This is a placeholder page for the {toolName} tool. The actual functionality will be implemented here.</p>
      </div>
    </div>
  );
};

export default ToolPage;