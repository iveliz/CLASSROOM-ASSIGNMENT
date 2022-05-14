import React, { useState } from 'react';
import Modal from 'react-modal';
const endpoint = 'http://127.0.0.1:8000';
interface SolicitudAula {
  id_solicitud: Number;
  id_usuario: Number;
  fecha_requerida_solicitud: String;
  name: String;
  prioridad: String;
  docentes: [];
  materia_solicitud: String;
  grupos: [];
  cantidad_estudiantes_solicitud: Number;
}

export default function ({
  id_solicitud,
  id_usuario,
  fecha_requerida_solicitud,
  name,
  prioridad,
  docentes,
  materia_solicitud,
  grupos,
  cantidad_estudiantes_solicitud,
}: SolicitudAula) {
  const [modalIsOpen, setIsOpen] = useState(false);

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
        <div
          {...(prioridad
            ? { className: 'card-body bg-red-200' }
            : { className: 'card-body' })}
        >
          <div className="hstack gap-3 items-end ">
            <div className="mr-3">
              {prioridad ? '(*) ' : ''}Número de solicitud de registro:{' '}
              {id_solicitud + '-' + id_usuario}
            </div>
            <div className="mr-4">Fecha: {fecha_requerida_solicitud}</div>
            <div>Nombre Docente: {name}</div>
          </div>

          <div className="position-absolute top-50 end-0 translate-middle-y mr-4">
            <button
              type="button"
              onClick={openModal}
              className="btn colorPrimary text-white"
            >
              Responder
            </button>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              ariaHideApp={false}
              contentLabel="Example Modal"
            >
              <div className="fondoModal ">
                <div className="text-center colorPrimary text-white px-48 py-2">
                  <h3 className="col-span-3"> Información de solicitud </h3>
                </div>

                <div>
                  <div className=" space-x-4  ml-12 text-left fondoModal">
                    <div className="mt-4 flex flex-col">
                      <p className="font-bold mr-4">
                        Nombre(s) de Docente(s): {docentes.toString()}
                      </p>
                      <p className="font-bold ">
                        Materia: {materia_solicitud}{' '}
                      </p>
                      <p className="font-bold ">
                        Grupo(s): {grupos.toString()}{' '}
                      </p>
                      <p className="font-bold ">
                        Cantidad de estudiantes:{' '}
                        {cantidad_estudiantes_solicitud}{' '}
                      </p>
                      <p className="font-bold ">
                        Para fecha: {fecha_requerida_solicitud}
                      </p>

                      <div className="grid grid-cols-2 divide-x">
                        <div className='grid grid-rows-2 grid-flow-col gap-4'>
                        <input type="radio"></input>
                        <p>Aceptar</p>
                        </div>
                        <input type="radio"></input>
                        <p>Rechazar</p>
                      </div>
                      

                    {/*
                                          <div className="absolute right-0 bottom-0">
                        <button
                          className="btn colorPrimary text-white  mr-4 mb-2"
                          onClick={closeModal}
                        >
                          Cerrar
                        </button>
                      </div>
                    
                    */}  

                    </div>
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
