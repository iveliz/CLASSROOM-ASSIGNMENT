import React from 'react';
const endpoint = 'http://127.0.0.1:8000'
interface SolicitudAula {
    id_sct_cnt: Number;
    fecha: String;
    nombre_sct_cnt: String;
}

export default function (
  {
    id_sct_cnt,
    fecha,
    nombre_sct_cnt
  }: SolicitudAula,

) {
  
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

  return (
    <div>
      <div className="card mt-3 mr-8">
        <div className="card-body ">
          <div className="hstack gap-3 items-end ">
            <div className="mr-3">Número de solicitud de registro: {id_sct_cnt}</div>
            <div className="mr-4">Fecha: {fecha}</div>
            <div>Nombre Docente: {nombre_sct_cnt}</div>
          </div>

          <div className="position-absolute top-50 end-0 translate-middle-y mr-4">
            {/*
            <button
              type="button"
              className="btn colorPrimary text-white"
            >
              Detalles
            </button>
            */}
          </div>
        </div>
      </div>
    </div>
  );
}
