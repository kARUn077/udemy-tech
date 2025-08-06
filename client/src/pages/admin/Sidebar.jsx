import { ChartNoAxesColumn, SquareLibrary, BookOpen, Users, Settings } from "lucide-react";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  
  // Check if current route matches
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] dark:bg-[#1A1A2E]">
      {/* Sidebar */}
      <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-[#E2E8F0] dark:border-[#2D3748] bg-white dark:bg-[#16213E] p-5 sticky top-0 h-screen">
        <div className="space-y-4">
          <Link 
            to="dashboard" 
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive('dashboard') ? 
              'bg-[#537D5D] text-white' : 
              'text-[#4A5568] dark:text-[#A0AEC0] hover:bg-[#F0F7F4] dark:hover:bg-[#2D3748]'}`}
          >
            <ChartNoAxesColumn size={20} />
            <h1 className="font-medium">Dashboard</h1>
          </Link>
          
          <Link 
            to="course" 
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive('course') ? 
              'bg-[#537D5D] text-white' : 
              'text-[#4A5568] dark:text-[#A0AEC0] hover:bg-[#F0F7F4] dark:hover:bg-[#2D3748]'}`}
          >
            <SquareLibrary size={20} />
            <h1 className="font-medium">Courses</h1>
          </Link>

          {/* <Link 
            to="students" 
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive('students') ? 
              'bg-[#537D5D] text-white' : 
              'text-[#4A5568] dark:text-[#A0AEC0] hover:bg-[#F0F7F4] dark:hover:bg-[#2D3748]'}`}
          >
            <Users size={20} />
            <h1 className="font-medium">Students</h1>
          </Link> */}

          {/* <Link 
            to="content" 
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive('content') ? 
              'bg-[#537D5D] text-white' : 
              'text-[#4A5568] dark:text-[#A0AEC0] hover:bg-[#F0F7F4] dark:hover:bg-[#2D3748]'}`}
          >
            <BookOpen size={20} />
            <h1 className="font-medium">Content</h1>
          </Link> */}

          {/* <Link 
            to="settings" 
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive('settings') ? 
              'bg-[#537D5D] text-white' : 
              'text-[#4A5568] dark:text-[#A0AEC0] hover:bg-[#F0F7F4] dark:hover:bg-[#2D3748]'}`}
          >
            <Settings size={20} />
            <h1 className="font-medium">Settings</h1>
          </Link> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-10 bg-[#F8F9FA] dark:bg-[#1A1A2E]">
        <div className="bg-white dark:bg-[#16213E] rounded-lg shadow-sm p-6 min-h-[calc(100vh-80px)]">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;