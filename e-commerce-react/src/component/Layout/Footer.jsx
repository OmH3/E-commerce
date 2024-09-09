import React from 'react'
import {Link} from 'react-router-dom'
function Footer() {
  const active = "border-b-2 border-white"
  return (
    <div className='bg-gray-900 text-white p-3'>
        <h1 className='text-center'>
            All Rights Reserved &copy; Flipkart
        </h1>
        <p className='text-center mt-3 '>
          <Link to="/about" className='mx-2 hover:text-orange-300 hover:border-b-2 hover:border-white'>About</Link>
          |
          <Link to="/contact" className='mx-2 hover:text-orange-300 hover:border-b-2 hover:border-white'>Contact</Link>
          |
          <Link to="/policy" className='mx-2 hover:text-orange-300 hover:border-b-2 hover:border-white'>Privacy Policy</Link>
        </p>
    </div>
  )
}

export default Footer