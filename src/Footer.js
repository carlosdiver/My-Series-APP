import React from 'react'
import {
  Navbar
} from 'reactstrap'

const Footer = () => {

  return (
    
    <Navbar color='light' light expand='md' className='fixed-bottom'>
    <div className='mx-auto'>
        <h5 className='mt-2 text-secondary'>My Series App</h5>
        <p className='mb-4 small text-secondary text-center'>All rights reserved &copy;</p>
      </div>
    </Navbar>
  )
}
export default Footer