import React from 'react';
import image from '../../css/images/userImage.png';
import Modal from 'react-modal';
import { useState } from 'react';
import axios from 'axios';
import { TramRounded } from '@mui/icons-material';
import { endpoint } from '@/Const/Endpoint';
interface Solicitud {
  fecha_inicio_reg_sct: String;
  id_solicitud: number;
  materia_solicitud: String;
  fecha_requerida_solicitud: String;
  grupos: any[];
  docentes: any[];
  cantidad_estudiantes_solicitud: Number;
  estado_solicitud: String;
  aulas: any;
  handleSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  listaSeleccion: number[];
  setProgressActivo: any;
  created_at: string;
  hora_fin_solicitud: string;
  hora_requerida_solicitud: any;
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
  handleSelect,
  listaSeleccion,
  setProgressActivo,
  created_at,
  hora_fin_solicitud,
  hora_requerida_solicitud,
}: Solicitud) {
  let subtitle: any;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [stateAula, SetAula] = useState(aulas);

  let cadenaEstado = '';
  let aula = '';

  let subtitulo = 'Aula NO reservada';
  let mensaje = ',solicitud pendiente';

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
      {setProgressActivo(true)}
      <div className="card mt-3 mr-8">
        <div className="card-body ">
          <div className="hstack gap-3 items-end ">
            {' '}
            {/*items-end*/}
            <div>
              <input
                type="checkbox"
                name={`soliAccept${id_solicitud}`}
                id={`soliAccept${id_solicitud}`}
                onChange={handleSelect}
                checked={listaSeleccion.includes(id_solicitud)}
              />
            </div>
            <div className="mr-3">{fecha_inicio_reg_sct}</div>
            <div className="mr-4">Código: {id_solicitud}</div>
            <div>Materia: {materia_solicitud}</div>
          </div>

          <div className="float-right  top-50 end-0 translate-middle-y mr-4">
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
                    Nombre(s) de Docente(s): {docentes.join(', ')}
                  </p>
                  <p className="font-bold ">Materia: {materia_solicitud} </p>
                  <p className="font-bold ">Grupo(s): {grupos.join(', ')} </p>
                  <p className="font-bold ">
                    Cantidad de estudiantes: {cantidad_estudiantes_solicitud}{' '}
                  </p>
                  <p className="font-bold ">
                    Para fecha: {fecha_requerida_solicitud}
                  </p>
                  <p className="font-bold">
                    Hora Inicio: {hora_requerida_solicitud.substring(0, 5)}
                  </p>
                  <p className="font-bold">
                    Fecha de Creación: {created_at.substring(0, 10)}
                  </p>

                  <p className="font-bold">
                    Hora de Creación: {created_at.substring(11, 16)}
                  </p>
                  <p className="font-bold">
                    Hora Fin: {hora_fin_solicitud.substring(0, 5)}
                  </p>
                  <p className="font-bold">
                    <span className="pendiente">{subtitulo}</span>
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
