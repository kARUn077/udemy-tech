import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if(searchQuery.trim() !== ""){
      navigate(`/course/search?query=${searchQuery}`)
    }
    setSearchQuery("");
  }

  return (
    <div className="relative bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] dark:from-[#081C15] dark:to-[#1B4332] py-24 px-4 text-center w-full">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-4">
          <span className="text-[#D8F3DC]"></span>Where Knowledge Meets Mastery
        </h1>
        <p className="text-[#D8F3DC] dark:text-[#B7E4C7] mb-8 text-xl">
          From Curiosity to Classroom Excellence
        </p>

        <form 
          onSubmit={searchHandler} 
          className="flex items-center bg-white/90 dark:bg-gray-800/90 rounded-md shadow-lg overflow-hidden max-w-xl mx-auto mb-6 border-2 border-[#D8F3DC] dark:border-[#B7E4C7] backdrop-blur-sm"
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teaching resources..."
            className="flex-grow border-none bg-transparent focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-600 dark:placeholder-gray-400"
          />
          <Button 
            type="submit" 
            className="bg-[#40916C] hover:bg-[#2D6A4F] dark:bg-[#52B788] dark:hover:bg-[#40916C] text-white px-6 py-3 rounded-none transition-colors"
          >
            Discover
          </Button>
        </form>
        
        <Button 
          onClick={() => navigate(`/course/search?query=all`)} 
          className="bg-[#D8F3DC] hover:bg-[#B7E4C7] dark:bg-[#B7E4C7] dark:hover:bg-[#95D5B2] text-[#1B4332] dark:text-[#081C15] rounded-md border-2 border-[#D8F3DC] dark:border-[#B7E4C7] px-8 py-3 text-lg font-semibold transition-colors shadow-lg"
        >
          Explore All Courses
        </Button>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-6 left-6 text-[#D8F3DC]/50 text-3xl">📚</div>
      <div className="absolute bottom-10 right-10 text-[#D8F3DC]/50 text-3xl">🎓</div>
      <div className="absolute top-16 right-16 text-[#D8F3DC]/50 text-4xl">🧑‍🏫</div>
      <div className="absolute bottom-6 left-12 text-[#D8F3DC]/50 text-2xl">✨</div>
    </div>
  );
};

export default HeroSection;