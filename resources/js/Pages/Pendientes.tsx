import React from 'react';
import Welcome from '@/Jetstream/Welcome';
import AppLayout from '@/Layouts/AppLayoutTeacher';
import Sidebar from '@/Jetstream/Sidebar';

import { useState, useEffect } from "react"
import get from 'axios';

export default function () {

  const [data,setData] = useState();
    const [error,setError] = useState();
 const endpoint = 'docentes';
    useEffect(()=>{
        get(`http://localhost:3050/${endpoint}`)
        .then(({data}) => setData(data))
    },[endpoint])

  return (
    <AppLayout title="Informacion">
      <div className='grid grid-cols-6 gap-4'>
      <div className=" colorPrimary mt-6 drop-shadow-lg ">
        <Sidebar></Sidebar>
     
      </div>
      <div className='col-span-5'>
        <div className='ml-5 mt-6 '>
         <h1 className='font-bold'>Solicitudes Pendientes</h1> 
        </div>
  
      </div>

      </div>

    </AppLayout>
  );
}
