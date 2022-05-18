import React, { useState } from 'react';
import Welcome from '@/Jetstream/Welcome';
import AppLayout from '@/Layouts/AppLayoutAdmin';
import Sidebar from '@/Jetstream/SidebarAdmin';
import CircularProgress from '@mui/material/CircularProgress';
import { solicitudes } from '@/Const/solicitudes';
import Cardsolicitud from '@/Jetstream/CardsolicitudPendiente';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import CardSolicitudAula from './componentes/CardSolicitudAula';
const endpoint = 'http://3.238.9.78';


export default function () {
  const [listaSolicitudAula, setListaSolicitudAula] = useState<any>([]);
  const [stateBack, SetStateBack] = useState(false);
  const [solicitud, SetSolicitud] = useState<any>();
  const getSolicitudes = async () => {
    await axios.get(`${endpoint}/solicitudesAula`).then(response => {
      setListaSolicitudAula(response.data);
    });
  };

  const handleOpenBack = () => {
    SetStateBack(true);
  };

  const handleCloseBack = () => {
    SetStateBack(false);
  };

  const createReserva = () => {
    handleOpenBack();
    if (!(solicitud.aceptar)) {
      let soli = {
        id_solicitud: solicitud.id_solicitud,
        id_usuario: solicitud.id_usuario,
        fecha_requerida_solicitud: solicitud.fecha_requerida_solicitud,
        motivo: solicitud.motivo,
      };
      console.log(soli);
      axios.post(`${endpoint}/rechazarSolicitud`, soli).then(response => {
        if (response.data == 1) {
          setListaSolicitudAula(listaSolicitudAula.filter((item: any)=>{
            let {id_solicitud}=item;
            return id_solicitud!=solicitud.id_solicitud;
          }));
          console.log(listaSolicitudAula)
          SetSolicitud(null);
        } else{
          alert('Un error ha ocurrido, por favor recargue la página.');
        }
        handleCloseBack();
        console.log(response)
      });
    } else {
      let soli = {
        id_solicitud: solicitud.id_solicitud,
        id_usuario: solicitud.id_usuario,
        fecha_requerida_solicitud: solicitud.fecha_requerida_solicitud,
        hora_inicio: solicitud.hora_inicio,
        hora_fin: solicitud.hora_fin,
        id_aulas: solicitud.id_aulas,
      };
      axios.post(`${endpoint}/confirmarSolicitud`, soli).then(response => {
        if (response.data == 1) {
          setListaSolicitudAula(listaSolicitudAula.filter((item: any)=>{
            let {id_solicitud}=item;
            return id_solicitud!=solicitud.id_solicitud;
          }));
          console.log(listaSolicitudAula)
          SetSolicitud(null);
        }else if(response.data==2) {
          alert('Otro docente ya creo una reserva para esta solicitud.');
        }else{
          alert('El aula que tratas de asignar ya esta en uso.');
        }
        handleCloseBack();
        console.log(response)
      });
    }
  };

  useEffect(() => {
    getSolicitudes();
  }, []);

  useEffect(() => {
    if(solicitud!=null){
      createReserva();
      console.log("esta es la soli")
      console.log(solicitud)
    }
  }, [solicitud]);

  return (
    <AppLayout title="Informacion">
      <div className="grid grid-cols-6 gap-4">
        <div className=" colorPrimary mt-6 drop-shadow-lg ">
          <Sidebar></Sidebar>
        </div>
        <div className="col-span-5">
          <div className="ml-5 mt-6 ">
            <h1 className="font-bold">Solicitudes de Aulas</h1>
            <p>
              Si encuentra un (*) la solicitud debe ser atendida con urgencia
            </p>
            <div>
              {listaSolicitudAula.map((solicitudAula:any) => {
                return <CardSolicitudAula {...solicitudAula} responder={SetSolicitud} key={nanoid(4)} />;
              })}
              <Backdrop
                sx={{
                  color: '#fff',
                  zIndex: theme => theme.zIndex.drawer + 1,
                }}
                open={stateBack}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
