import React, { useState } from 'react';
import Welcome from '@/Jetstream/Welcome';
import AppLayout from '@/Layouts/AppLayoutAdmin';
import Sidebar from '@/Jetstream/Sidebar';
import { solicitudes } from '@/Const/solicitudes';
import Cardsolicitud from '@/Jetstream/Cardsolicitud';
import axios from 'axios';
import { useEffect } from "react";
import { nanoid } from 'nanoid'


export default function () {


  return (
    <AppLayout title="Informacion">
      <div className='grid grid-cols-6 gap-4'>
      <div className=" colorPrimary mt-6 drop-shadow-lg ">

      </div>
      <div className='col-span-5'>
        <div className='ml-5 mt-6 '>
       <h1 className='font-bold'>Solicitudes Admin</h1> 

        </div>
  
      </div>

      </div>

    </AppLayout>
  );
}
