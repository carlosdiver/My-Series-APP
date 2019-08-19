import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Navbar,
  NavbarBrand,
  Collapse, Nav,
  NavItem,
  NavLink,
  NavbarToggler
} from 'reactstrap'

const Header = () => {
  const [open, setOpen] = useState(false)
  const toggle = () => {
    setOpen(!open)
  }
  return (
    <Navbar color='light' light expand='md' className='fixed-top'>
      <div className='container'>
        <NavbarBrand tag={Link} to='/'>My Series App</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={open} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink onClick={toggle} tag={Link} to='/' >Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={toggle} tag={Link} to='/series' >Séries</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={toggle} tag={Link} to='/genres' >Gêneros</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={toggle} tag={Link} to='/serie/new' >Nova Série</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={toggle} tag={Link} to='/genres/new' >Novo Gênero</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  )
}
export default Header