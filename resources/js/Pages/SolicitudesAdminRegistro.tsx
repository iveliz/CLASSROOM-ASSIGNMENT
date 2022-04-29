import React, { useState } from 'react';
import Welcome from '@/Jetstream/Welcome';
import AppLayout from '@/Layouts/AppLayoutAdmin';
import Sidebar from '@/Jetstream/SidebarAdmin';
import { solicitudes } from '@/Const/solicitudes';
import Cardsolicitud from '@/Jetstream/Cardsolicitud';
import axios from 'axios';
import { useEffect } from "react";
import { nanoid } from 'nanoid';
import CardSolicitudCuenta from './componentes/CardSolicitudCuenta';
const endpoint = 'http://3.238.9.78'


export default function () {

  const [listaRegistro,setListaRegistro] = useState([]);
  const getSolicitudes=  async()=>{
    await axios.get(`${endpoint}/SolicitudCuenta`).then((response)=>{
      setListaRegistro(response.data);
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
            <h1 className="font-bold">Solicitudes de Registros</h1>
            <div>
              {(listaRegistro.map((registro) => {
                
                return <CardSolicitudCuenta{...registro} key={nanoid(4)} />
              }))}
            </div>
          </div>


        </div>
      </div>
    </AppLayout>
  );
}
