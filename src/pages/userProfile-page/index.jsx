import React from 'react';
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function UserProfile() {
  const [name, setName] = useState(0);
  const [dataSource, setDataSource] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8090/features/customers');
        const data = await response.json();
        setDataSource(data);
        setName(data); // Calculate total based on data length
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    fetchData();
  }, []);


  return (
    <section className='bg-light py-3 py-md-5 py-xl-8'>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
            <h2 className="mb-4 display-5 text-center">Profile</h2>
            <p className="text-secondary text-center lead fs-4 mb-5">The Profile page is your digital hub, where you
              can fine-tune your experience. Here's a closer look at the settings you can expect to find in
              your profile page.</p>
            <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
          </div>
        </div>
    

        <div className='container'>
          <div className='row gy-4 gy-lg-0'>
            <div className='col-12 col-lg-4 col-xl-3'>
              <div className='row gy-4'>
                <div className='col-12'>
                  <div className='card widget-card border-light shadow-sm'>
                

                  </div>


                </div>


              </div>


            </div>


          </div>
        </div>
      </div>


    </section>
  )
}


export default UserProfile
