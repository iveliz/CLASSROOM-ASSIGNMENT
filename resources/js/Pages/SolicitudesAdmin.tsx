import React, { useState } from 'react';
import Welcome from '@/Jetstream/Welcome';
import AppLayout from '@/Layouts/AppLayoutAdmin';
import Sidebar from '@/Jetstream/SidebarAdmin';
import { solicitudes } from '@/Const/solicitudes';
import Cardsolicitud from '@/Jetstream/CardsolicitudPendiente';
import axios from 'axios';
import { useEffect } from "react";
import { nanoid } from 'nanoid';
import CardSolicitudAula from './componentes/CardSolicitudAula';
const endpoint = 'http://127.0.0.1:8000'


export default function () {

  const [listaSolicitudAula,setListaSolicitudAula] = useState([]);
  const getSolicitudes=  async()=>{
    await axios.get(`${endpoint}/solicitudesAula`).then((response)=>{
      setListaSolicitudAula(response.data);
      console.log(response.data)
    })
  }

  useEffect(()=>{
    getSolicitudes()
   },[])

  return (
    <AppLayout title="Informacion">
      <div className="grid grid-cols-6 gap-4">
        <div className=" colorPrimary mt-6 drop-shadow-lg ">
          <Sidebar></Sidebar>

        </div>
        <div className="col-span-5">
          <div className="ml-5 mt-6 ">
            <h1 className="font-bold">Solicitudes de Aulas</h1>
            <div>
              {(listaSolicitudAula.map((solicitudAula) => {
                
                return <CardSolicitudAula{...solicitudAula} key={nanoid(4)} />
              }))}
            </div>
          </div>


        </div>
      </div>
    </AppLayout>
  );
}
