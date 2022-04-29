import React, { useState } from 'react';
import Welcome from '@/Jetstream/Welcome';
import AppLayout from '@/Layouts/AppLayoutTeacher';
import Sidebar from '@/Jetstream/Sidebar';
import { solicitudes } from '@/Const/solicitudes';
import Cardsolicitud from '@/Jetstream/Cardsolicitud';
import axios from 'axios';
import { useEffect } from "react";
import { nanoid } from 'nanoid'
const endpoint = 'http://3.238.9.78'


export default function (props:{user:any}) {
  
const [listaSoliState,SetlistaSoli] = useState([]);
const getSolicitudes=  async()=>{
  await axios.get(`${endpoint}/api/solicitudes/pendientes/1`).then((response)=>{
    SetlistaSoli(response.data);
  })
}

  useEffect(()=>{
     getSolicitudes()
    },[])
  
  return (
    <AppLayout title="Informacion">
      <div className='grid grid-cols-6 gap-4'>
      <div className=" colorPrimary mt-6 drop-shadow-lg ">
        <Sidebar></Sidebar>
    
      </div>
      <div className='col-span-5'>
        <div className='ml-5 mt-6 '>
       <h1 className='font-bold'>Solicitudes Pendientes</h1> 
        <div >
          {(listaSoliState.map((card)=>(
           <Cardsolicitud{...card} key={nanoid(4)} />
           )))}
          {console.log(listaSoliState)}
     
        </div>
        </div>
  
      </div>

      </div>

    </AppLayout>
  );
}
