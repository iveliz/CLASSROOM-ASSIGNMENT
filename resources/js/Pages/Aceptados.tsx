import React, { useState } from 'react';
import Welcome from '@/Jetstream/Welcome';
import AppLayout from '@/Layouts/AppLayoutTeacher';
import Sidebar from '@/Jetstream/Sidebar';
import axios from 'axios';
import Cardsolicitud from '@/Jetstream/CardsolicitudAceptada';
import { useEffect,useRef } from 'react';
import { nanoid } from 'nanoid';
import { usePage } from '@inertiajs/inertia-react';
import { elementAcceptingRef } from '@mui/utils';
const endpoint = 'http://127.0.0.1:8000';
export default function () {
  const [listaSoliState, SetlistaSoli] = useState([]);
  let listaSeleccion:any[]=[];
  const [todos,SetTodos]=useState<any>(2);
  const referencia=useRef<any>();
  const [valor,SetValor]=useState(false);
  const { user }: any = usePage().props;
  let { id, name, email } = user;

  const getSolicitudes = () => {
    axios
      .get(`${endpoint}/api/solicitudes/aceptadas/sin_vencer/${id}`)
      .then(response => {

        SetlistaSoli(response.data);
      });
  };

  const agregar=(event:React.ChangeEvent<HTMLInputElement>)=>{


    let name=event.target.name;
    if (
      !listaSeleccion.includes(name)
    ) {
      listaSeleccion.push(name);
    } else if (
   
      listaSeleccion.includes(name)
    ) {
      listaSeleccion = listaSeleccion.filter(
        value => value != name,
      );
    }
    console.log(listaSeleccion)
  }


  useEffect(() => {
    getSolicitudes();
  }, []);

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
                <input type="checkbox" onChange={event=>{
                    if(event.target.checked){
                    
                      referencia.current.checked=true;
                    }else{
                      
                      referencia.current.checked=false;
                    }
                  }}
                  ></input>
                </div>
                <div className="mt-3 ml-6">
                  <p className="text-white ">Seleccionar todas</p>
                </div>
                <div className="flex mt-2 position-absolute end-0  mr-10">
                  <button type="button" className="btn botonBarra text-white">
                    Cancelar Seleccionadas
                  </button>
                </div>
              </div>
            </div>
          </div>
          {listaSoliState.map(card => (
            <Cardsolicitud {...card} key={nanoid(4)} />
          ))}

        </div>
      </div>
    </AppLayout>
  );
}