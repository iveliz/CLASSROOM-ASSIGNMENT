import React, { useState } from 'react';
import Welcome from '@/Jetstream/Welcome';
import AppLayout from '@/Layouts/AppLayoutTeacher';
import Sidebar from '@/Jetstream/Sidebar';
import axios from 'axios';
import Cardsolicitud from '@/Jetstream/CardsolicitudRechazo';
import { useEffect } from "react";
import { nanoid } from 'nanoid'
import { usePage } from '@inertiajs/inertia-react';
const endpoint = 'http://127.0.0.1:8000'
export default function () {
  const [listaSoliState, SetlistaSoli] = useState([]);
  const { user }: any = usePage().props;
  let { id, name, email } = user;
  const getSolicitudes = () => {
    axios
      .get(`${endpoint}/api/solicitudes/rechazadas/${id}`)
      .then(response => {
        SetlistaSoli(response.data);
      });
  };
  useEffect(()=>{
    getSolicitudes()
   },[])
   const [progressActivo,setProgressActivo] = useState(true);
  return (
    <AppLayout title="Informacion">
      <div className="grid grid-cols-6 gap-4">
        <div className=" colorPrimary mt-6 drop-shadow-lg ">
          <Sidebar></Sidebar>
        </div>
        <div className="col-span-5">
           <div className="ml-5 mt-6 ">
            <div className="d-flex flex-row items-baseline">
             <h1 className="p-2 mb-2  font-bold ">Solicitudes Rechazadas</h1>
             <div>{progressActivo ? <h5 className=" ml-4 mb-2 pt-12 pb-4 ">Espere...</h5>:''}</div>
           </div>
          </div>
          {listaSoliState.map(card => (
            <Cardsolicitud {...card}  setProgressActivo={setProgressActivo}  key={nanoid(4)}/>
          ))}
          {console.log(listaSoliState)}
        </div>
      </div>
    </AppLayout>
  );
}
