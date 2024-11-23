import React from 'react'
import { Link } from 'react-router-dom'

const MainCategories = () => {
  return (
    <div className='hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8'>
        {/* Links */}
        <div className='flex-1 flex items-center justify-between flex-wrap'>
            <Link 
                to='/posts'
                className='bg-blue-800 text-white rounded-full px-4 py-2'
            >
                All Posts
            </Link>
            <Link 
                to='/posts?cat=web-design'
                className='hover:bg-blue-100 rounded-full px-4 py-2'
            >
                Web Design
            </Link>
            <Link 
                to='/posts?cat=development'
                className='hover:bg-blue-100 rounded-full px-4 py-2'
            >
                Development
            </Link>
            <Link 
                to='/posts?cat=databases'
                className='hover:bg-blue-100 rounded-full px-4 py-2'
            >
                Databases
            </Link>
            <Link 
                to='/posts?cat=search-engines'
                className='hover:bg-blue-100 rounded-full px-4 py-2'
            >
                Search Engines
            </Link>
            <Link 
                to='/posts?cat=marketing'
                className='hover:bg-blue-100 rounded-full px-4 py-2'
            >
                Marketing
            </Link>
        </div>
        <span className='text-lg font-medium'>|</span>
        {/* Search */}
        <div className='bg-gray-100 p-2 rounded-full flex items-center gap-2'>
            <svg
                xmlns="http://www.w3.org/
                2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <circle cx="10.5" cy="10.5" r="7.5" />
                <line x1="21" y1="21" x2="15.8" y2="15.8" />
            </svg>
            <input 
                type='text' 
                placeholder='Search' 
                className='bg-transparent focus:outline-none'
            />
        </div>
    </div>
  )
}

export default MainCategories