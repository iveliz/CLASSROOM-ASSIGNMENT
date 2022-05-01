import React, { useState } from 'react';
import Welcome from '@/Jetstream/Welcome';
import AppLayout from '@/Layouts/AppLayoutTeacher';
import Sidebar from '@/Jetstream/Sidebar';
import axios from 'axios';
import Cardsolicitud from '@/Jetstream/CardsolicitudAceptada';
import { useEffect } from "react";
import { nanoid } from 'nanoid'
import { usePage } from '@inertiajs/inertia-react';
const endpoint = 'http://127.0.0.1:8000'
export default function (props: { solicitudes: any }) {
  const [listaSoliState, SetlistaSoli] = useState([]);
  const { user }: any = usePage().props;
  let { id, name, email } = user;
  const getSolicitudes = () => {
    axios
      .get(`${endpoint}/api/solicitudes/aceptadas/${id}`)
      .then(response => {
        console.log(response.data);
        SetlistaSoli(response.data);
      });
  };
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
          <div className=" mt-6 ">
            <h1 className="font-bold">Solicitudes Aceptadas</h1>
            <div className="fondoBarra  mr-8 ">
              <div className="flex">
                <div className="mt-3 ml-4">
                  <input type="checkbox"></input>
                </div>
                <div className="mt-3 ml-6">
                  <p className="text-white ">Seleccionar todas</p>
                </div>
                <div className="flex mt-2 position-absolute end-0  mr-10">
                  <button type="button" className="btn fondoBarra text-white">
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
          {listaSoliState.map(card => (
            <Cardsolicitud {...card} key={nanoid(4)} />
          ))}
          {console.log(listaSoliState)}
        </div>
      </div>
    </AppLayout>
  );
}
