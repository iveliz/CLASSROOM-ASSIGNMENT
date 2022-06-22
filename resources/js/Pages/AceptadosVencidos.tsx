import React, { useState } from 'react';
import Welcome from '@/Jetstream/Welcome';
import AppLayout from '@/Layouts/AppLayoutTeacher';
import Sidebar from '@/Jetstream/Sidebar';
import axios from 'axios';
import Cardsolicitud from '@/Jetstream/CardsolicitudAceptadasV';
import { useEffect } from "react";
import { nanoid } from 'nanoid'
import { usePage } from '@inertiajs/inertia-react';
const endpoint = 'http://127.0.0.1:8000'
export default function (props: { solicitudes: any }) {
  const [listaSoliState, SetlistaSoli] = useState([]);
  const { user }: any = usePage().props;
  let { id, name, email } = user;

  const getSolicitudes = () => {
    setMensaje(true)
    axios
      .get(`${endpoint}/api/solicitudes/aceptadas/vencidas/${id}`)
      .then(response => {

        SetlistaSoli(response.data);
        setMensaje(false)
      });
  };
  useEffect(()=>{
    getSolicitudes()
   },[])
  const [progressActivo,setProgressActivo] = useState(true);
  const [mensaje,setMensaje] = useState(true);
  return (
    <AppLayout title="Informacion">
      <div className="grid grid-cols-6 gap-4">
        <div className=" colorPrimary mt-6 drop-shadow-lg ">
          <Sidebar></Sidebar>
        </div>
        <div className="col-span-5">
          <div className=" mt-6 ">
            <div className="d-flex flex-row ">
            <h1 className="font-bold p-2 mb-2">Solicitudes Aceptadas Vencidas</h1>
            </div>
            <div className='text-center mr-8'>
              {mensaje?
              <h5 className='mt-10'>Espere...</h5>:listaSoliState.length===0?
              <h5 className='mt-10'>Aun no hay solicitudes para mostrar..gri..gri</h5>:''}
            </div>

          </div>
          {listaSoliState.map((card:any) => (
            <Cardsolicitud {...card} setProgressActivo={setProgressActivo} key={nanoid(4)} />
          ))}

        </div>
      </div>
    </AppLayout>
  );
}
