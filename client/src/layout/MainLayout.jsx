import Navbar from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen bg-[#F0F7F4] dark:bg-[#16213E] relative overflow-hidden'>
      {/* Hand-drawn border elements */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-[#537D5D] opacity-20"></div>
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#537D5D] opacity-20"></div>
      
      {/* Sketch-style corner decorations */}
      <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-[#537D5D] opacity-30 rounded-tl-lg"></div>
      <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-[#537D5D] opacity-30 rounded-tr-lg"></div>
      
      <Navbar/>
      <div className='flex-1 mt-16 relative z-10'>
        <Outlet/>
      </div>
      
      {/* Hand-drawn footer */}
      <div className="w-full h-8 bg-[#D8F3DC] dark:bg-[#2D3748] relative">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-[#537D5D] rounded-full"></div>
      </div>
    </div>
  )
}

export default MainLayout