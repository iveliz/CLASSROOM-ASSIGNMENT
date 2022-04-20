import React from 'react';
import image from '../../css/images/userImage.png';
import Modal from 'react-modal';
import { useState } from 'react';
import axios from 'axios';
const endpoint = 'http://127.0.0.1:8000'
interface Solicitud {
  fecha_inicio_reg_sct: String;
  id_solicitud: number;
  materia_solicitud: String;
  fecha_requerida_solicitud: String;
  grupos: [''];
  docentes: [''];
  cantidad_estudiantes_solicitud: Number;
  estado_solicitud:String;
}

export default function (
  {
    fecha_inicio_reg_sct,
    id_solicitud,
    materia_solicitud,
    fecha_requerida_solicitud,
    grupos,
    cantidad_estudiantes_solicitud,
    docentes,
    estado_solicitud
  }: Solicitud,

) {
  let subtitle: any;
  const [modalIsOpen, setIsOpen] = useState(false);

  let subtitle2: any;
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [stateAula,SetAula]= useState("");
  


  console.log(estado_solicitud);
  let cadenaEstado =""
  let aula="";

  const [listaSoliState,SetlistaSoli] = useState([]);
  const getSolicitudes=  async()=>{
    await axios.get(`${endpoint}/api/solicitudes/pendientes/1`).then((response)=>{
      SetlistaSoli(response.data);
    })
  }
  
/*

  const cancelarPendiente = async()=>{
    await axios.delete(`${endpoint}/api/solicitudes/eliminar/${id_solicitud}`).then((response)=>{
      document.location.reload();
      console.log(response.data)
    })
  }

*/ 




  const getAula= async () => {
     await axios.post(`${endpoint}/aulas`,{id:id_solicitud}).then((response)=>{
         for( let {numero_aula,letra_aula} of response.data){
            SetAula(numero_aula+letra_aula);
         }
     })
     
  }
   
  let subtitulo="Aula Reservada: "
  

  if(estado_solicitud==="pendiente"){
     subtitulo="Aula NO reservada,"
     cadenaEstado="solicitud pendiente"
  }else if(estado_solicitud==="aceptada"){
    getAula();
    console.log(id_solicitud)
    cadenaEstado=stateAula;
  }else{
    subtitulo="Aula NO reservada,solicitud rechazada"
    cadenaEstado=""
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-25%',
      transform: 'translate(-50%, -50%)',
      padding: 0,
    },
  };
  const customStyles2 = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal2() {
    setIsOpen2(true);
  }

  function afterOpenModal2() {
    // references are now sync'd and can be accessed.
  }

  function closeModal2() {
    setIsOpen2(false);
  }
  return (
    <div>
      <div className="card mt-3 mr-8">
        <div className="card-body ">
          <div className="hstack gap-3 items-end ">
            {' '}
            {/*items-end*/}
            <div className="mr-3">{fecha_inicio_reg_sct}</div>
            <div className="mr-4">Código: {id_solicitud}</div>
            <div>Materia: {materia_solicitud}</div>
          </div>

          <div className="position-absolute top-50 end-0 translate-middle-y mr-4">
            {/*<div className"></div>*/}
            <button
              type="button"
              className="btn colorPrimary text-white"
              onClick={openModal}
            >
              Detalles
            </button>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              ariaHideApp={false}
              contentLabel="Example Modal"
            >
              <div className="text-center colorPrimary text-white px-48 py-2">
                <h3 className="col-span-3"> Información de solicitud </h3>
              </div>

              <div className=" space-x-4 mt-4 ml-12 text-left ">
                <div className="flex flex-col">
                  <p className="font-bold mr-4">
                    Nombre(s) de Docente(s): {docentes.toString()}
                  </p>
                  <p className="font-bold ">Materia: {materia_solicitud} </p>
                  <p className="font-bold ">Grupo(s): {grupos.toString()} </p>
                  <p className="font-bold ">
                    Cantidad de estudiantes: {cantidad_estudiantes_solicitud}{' '}
                  </p>
                  <p className="font-bold ">
                    Para fecha: {fecha_requerida_solicitud}
                  </p>
                  <p className="font-bold "><span {...(estado_solicitud==="pendiente"? {"className":"pendiente"}:(estado_solicitud==="aceptada"? {"className":"aceptada"}:{"className":"rechazada"} ) )}>{subtitulo}</span>{cadenaEstado}</p>
      
                  <div className="absolute right-0 bottom-0">
                    <button
                      type="button"
                      className="btn btn-danger text-white  mr-4 mb-2 "
                      onClick={openModal2}
                    >
                      Cancelar Solicitud
                    </button>
                    <Modal
                      isOpen={modalIsOpen2}
                      onAfterOpen={afterOpenModal2}
                      onRequestClose={closeModal2}
                      style={customStyles2}
                      ariaHideApp={false}
                      contentLabel="Example Modal"
                    >
                      <div className="font-bold">
                        ¿Está seguro que desea cancelar?
                      </div>
                      <div className="d-flex justify-content-center space-x-4 mt-4">
                        <div>
                          <button
                            type="button"
                            onClick={closeModal2}
                            className="btn btn-danger text-white"
                          >
                            Cancelar
                          </button>
                        </div>
                        <div>
                        {console.log(id_solicitud)}
                          <button
                            type="button"
                         
                            onClick={cancelarPendiente}
                            className="btn colorPrimary text-white"
                          >
                            Aceptar
                          </button>
                        </div>
                      </div>
                    </Modal>

                    <button
                      className="btn colorPrimary text-white  mr-4 mb-2"
                      onClick={closeModal}
                    >
                      Aceptar
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
{
  /*( =ω=)..nyaa falta cancelar e informacion */
}
