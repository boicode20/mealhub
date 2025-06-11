import React from 'react'
import './nav.css'
import LgNav from './LgNav'
import SmNav from './SmNav'
const Nav = () => {
  return (
    <div>
      <div className='hidden lg:block'>
      <LgNav/>
      </div>
      <div className='lg:hidden block'>
        <SmNav/>
      </div>
    </div>
  )
}
export default Nav
