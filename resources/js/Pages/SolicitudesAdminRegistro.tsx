import React, { useState } from 'react';
import Welcome from '@/Jetstream/Welcome';
import AppLayout from '@/Layouts/AppLayoutAdmin';
import Sidebar from '@/Jetstream/SidebarAdmin';
import CircularProgress from '@mui/material/CircularProgress';
import { solicitudes } from '@/Const/solicitudes';
import Cardsolicitud from '@/Jetstream/CardsolicitudPendiente';
import axios from 'axios';
import { useEffect } from "react";
import { nanoid } from 'nanoid';
import CardSolicitudCuenta from './componentes/CardSolicitudCuenta';
const endpoint = 'http://127.0.0.1:8000'

interface solicitudcard{
  id_sct_cnt: Number;
}
export default function (props:any) {

  const [listaRegistro,setListaRegistro] = useState<any[]>([]);
  const [progressActivo,setProgressActivo] = useState(false);
  const getSolicitudes=  async()=>{
    await axios.get(`${endpoint}/SolicitudCuenta`).then((response)=>{
      setListaRegistro(response.data);
      console.log(response.data)
    })
  }

  useEffect(()=>{
    getSolicitudes()
   },[])
  
   const limpiar = (idCard: any) =>{
      let aux = listaRegistro.filter(solicitud => solicitud.id_sct_cnt!==idCard)
      setListaRegistro(aux)
   }

   
  return (
    
    <AppLayout title="Informacion">
      <div className="grid grid-cols-6 gap-4">
        <div className=" colorPrimary mt-6 drop-shadow-lg ">
          <Sidebar></Sidebar>

        </div>
        <div className="col-span-5">
          <div className="ml-5 mt-6 ">
            <div className="d-flex flex-row">
              <div> <h1 className="p-2 font-bold">Solicitudes de Registros</h1></div>
              <div className="p-2 ml-2">{progressActivo ?<CircularProgress />:''}</div>
            </div>
            <div>
              {(listaRegistro.map((registro) => {
                
                return <CardSolicitudCuenta{...registro} setProgressActivo={setProgressActivo} actualizar={limpiar} key={nanoid(4)} />
              }))}
            </div>
          </div>


        </div>
      </div>
    </AppLayout>
  );
}
