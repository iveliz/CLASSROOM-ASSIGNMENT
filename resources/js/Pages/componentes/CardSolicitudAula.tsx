import React from 'react';
const endpoint = 'http://127.0.0.1:8000'
interface SolicitudAula {
    id_solicitud: Number;
    id_usuario: Number;
    fecha_requerida_solicitud: String;
    name: String;
    prioridad: String;
}

export default function (
  {
    id_solicitud,
    id_usuario,
    fecha_requerida_solicitud,
    name,
    prioridad
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
        <div {...(prioridad ? {"className":"card-body bg-red-200"}:{"className":"card-body"})}>
          <div className="hstack gap-3 items-end ">
            <div className="mr-3">{prioridad?'(*) ':''}Número de solicitud de registro: {id_solicitud+"-"+id_usuario}</div>
            <div className="mr-4">Fecha: {fecha_requerida_solicitud}</div>
            <div>Nombre Docente: {name}</div>
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
