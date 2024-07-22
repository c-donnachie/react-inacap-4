import * as React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { NavLink, useNavigate } from 'react-router-dom';

import s from './MyNavbar.module.css'

export const MyNavbar = ({ nav }) => {

  const navigate = useNavigate()

  return (
    <div className={s.container}>

      <NavLink to='/'>
        <p className="font-bold text-inherit">ACME</p>
      </NavLink>

      <div className="hidden sm:flex gap-4" justify="center">

        {
          nav?.map((item, index) => (
            <div key={index}>
              <NavLink to={item.url}>

                {item.name}
              </NavLink>
            </div>
          ))
        }

      </div>

      <div className='flex items-center'>
        <div>
          <Link href="#">Login</Link>
        </div>
        <div>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </div>
      </div>

    </div>
  );
}
