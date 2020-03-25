import React from 'react'
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap'
import Navbar, { Brand } from 'react-bootstrap/lib/Navbar'

import { brandInfo, menuItems, altSite } from '../../data/header'
import Sidebar from '../Sidebar'
import { FaThList } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div id="wrapper" className="content">
      <Navbar fluid style={{ margin: 0 }}>
        <ButtonToolbar className="dropdown-home" style={{ marginTop: 10 }}>
          <DropdownButton
            bsStyle="default"
            noCaret
            title={
              <span>
                <FaThList />
              </span>
            }
            id="dropdown-size-large"
          >
            {menuItems.map(i => (
              <React.Fragment key={i.to}>
                <li role="presentation">
                  <Link to={i.to}>{i.title}</Link>
                </li>
                <MenuItem divider />
              </React.Fragment>
            ))}
          </DropdownButton>
        </ButtonToolbar>
        <Brand>
          <img
            className="brand-logo"
            src={brandInfo.logo}
            alt={brandInfo.title}
            title={brandInfo.title}
          />
          <span>{brandInfo.title}</span>
        </Brand>
        <Sidebar />
        <span class="navbar-nav ml-auto">
          For slot bookings
          <a href={altSite.link} target="_blank">
            <br />
            sbggovernment.in
          </a>
        </span>
      </Navbar>
    </div>
  )
}

export default Header
