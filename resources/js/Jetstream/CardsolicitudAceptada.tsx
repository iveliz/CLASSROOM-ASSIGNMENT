import React from 'react';
import image from '../../css/images/userImage.png';
import Modal from 'react-modal';
import { useState } from 'react';

interface Solicitud {
  fecha_inicio_reg_sct: String;
  id_solicitud: number;
  materia_solicitud: String;
  fecha_requerida_solicitud: String;
  grupos: [];
  docentes: [];
  cantidad_estudiantes_solicitud: Number;
  estado_solicitud: String;
  aulas: [];
  lista: any;

}

export default function ({
  fecha_inicio_reg_sct,
  id_solicitud,
  materia_solicitud,
  fecha_requerida_solicitud,
  grupos,
  cantidad_estudiantes_solicitud,
  docentes,
  estado_solicitud,
  aulas,
  lista,
}: Solicitud) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isCheck, SetIsCheck] = useState<boolean>();
  
  console.log(isCheck);
  let subtitulo = 'Aula Reservadas: ';
  let mensaje = aulas.toString();

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

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <div className="card mt-3 mr-8">
        <div className="card-body ">
          <div className="hstack gap-3 items-end ">
            {' '}
            {/*items-end*/}
            <div>
              <input type="checkbox" onChange={event => {
                
                 lista((listaSeleccion:any[])=>{
                    if(!listaSeleccion.includes(id_solicitud)&&event.target.checked){
                      listaSeleccion.push(id_solicitud);
                    }else if(listaSeleccion.includes(id_solicitud)&&!event.target.checked){
                        listaSeleccion=listaSeleccion.filter((value)=>value!=id_solicitud)
                    }
                    console.log(listaSeleccion)
                  return listaSeleccion;
                })
              }} 
              ></input>
            </div>
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
                  <p className="font-bold">
                    <span className="aceptada">{subtitulo}</span>
                    {mensaje}
                  </p>

                  <div className="absolute right-0 bottom-0">
                    <button
                      className="btn colorPrimary text-white  mr-4 mb-2"
                      onClick={closeModal}
                    >
                      Cerrar
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
