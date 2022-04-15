import React from 'react';
import Welcome from '@/Jetstream/Welcome';
import AppLayout from '@/Layouts/AppLayoutTeacher';
import Sidebar from '@/Jetstream/Sidebar';

export default function () {
  return (
    <AppLayout title="Informacion">
      <div className='grid grid-cols-6 gap-4'>
      <div className=" colorPrimary mt-6 drop-shadow-lg ">
        <Sidebar></Sidebar>
     
      </div>
      <div className='col-span-5'>
        <div className='ml-5 mt-6 '>
      {/*   <h1 className='font-bold'>Solicitudes Pendientes</h1> */}
        </div>
  
      </div>

      </div>

    </AppLayout>
  );
}
