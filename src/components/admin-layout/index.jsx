import React from 'react'
import HeaderAdmin from '../admin-header';
import "../admin-css/index.scss"
import { Outlet } from 'react-router-dom';



function LayoutAdmin() {
  return (
    <main className="page-wrapper">  
      <HeaderAdmin />
 
      <div className="content-wrapper">
        <Outlet />
      </div>
    </main>
  )
}

export default LayoutAdmin;
