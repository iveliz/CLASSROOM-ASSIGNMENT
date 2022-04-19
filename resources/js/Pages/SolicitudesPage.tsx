import React from 'react';
import Welcome from '@/Jetstream/Welcome';
import AppLayout from '@/Layouts/AppLayoutTeacher';
import Sidebar from '@/Jetstream/Sidebar';
import { solicitudes } from '@/Const/solicitudes';
import Cardsolicitud from '@/Jetstream/Cardsolicitud';
import { useState, useEffect } from 'react';
import axios from 'axios';

const endpoint = 'http://127.0.0.1:8000'
export default function (props: any) {
  const [listaEstudiantes, setListaEstudiantes] = useState([])
  const [solicitudes, setSolicitudes] = useState([])
  const [materia, setMateria] = useState('elementos')
  const [grupos, setGrupos] = useState([])
  useEffect(()=>{
    getCrearSolicitud();
    getSolicitudes();
      getEstudiantes();
      getGrupos();
  },[])

  const getCrearSolicitud = async () => {
    const grupos = await axios.post(`${endpoint}/api/solicitudes/crear`,
      {
        "id_usuario" :7,
        "id_solicitud" :100,
        "materia_solicitud" :"elementos",
        "cantidad_estudiantes_solicitud": 200,
        "motivo_reserva_solicitud" :"Examen",
        "fecha_requerida_solicitud": "2022-02-15",
        "hora_requerida_solicitud" :"06:45:00",
        "periodos_solicitud": 2,
        "estado_solicitud": "pendiente",
        "grupos_solicitud": [3,4,5],
        "nombres_docentes_solicitud": ["Vladi","Marcelo"]
      }
    )
    setGrupos(grupos.data)
    console.log(grupos.data,'crear')
  }

  const getGrupos = async () => {
    const grupos = await axios.post(`${endpoint}/grupo`,{materia:'elementos'})
    setGrupos(grupos.data)
    console.log(grupos.data)
  }

  const getEstudiantes = async () => {
      const res = await axios.get(`${endpoint}/api/solicitudes`)
      setListaEstudiantes(res.data)
      console.log(res.data)
  }

  const getSolicitudes = async () => {
    const grupos = await axios.get(`${endpoint}/api/solicitudes/pendientes/${props.user.id}`)
    setGrupos(grupos.data)
    console.log(grupos.data,"soy el 7")
  }

  return (
    <AppLayout title="Informacion">
      <div className='grid grid-cols-6 gap-4'>
      <div className=" colorPrimary mt-6 drop-shadow-lg ">
        <Sidebar></Sidebar>
     
      </div>
      <div className='col-span-5'>
        <div className='ml-5 mt-6 '>
       <h1 className='font-bold'>Solicitudes Pendientes</h1> 
        <div>
         {solicitudes.map((card)=>(
           <Cardsolicitud{...card}/>
         ))}
        </div>
        </div>
  
      </div>

      </div>

    </AppLayout>
  );
}
