import React from 'react';
import image from '../../css/images/userImage.png';

interface Solicitud {
  Fecha: String;
  codigo: number;
  Materia: String;
}

export default function ({ Fecha, codigo, Materia }: Solicitud) {
  return (
    <div>
      <div className="card mt-3 mr-8">
        <div className="card-body">
          <div className="hstack gap-3 items-end">
            <div className='mr-3'>{Fecha}</div>
            <div className='mr-4'>Código: {codigo}</div>
            <div>Materia: {Materia}</div>
            <div className="vr"></div>
            <div className='btn colorPrimary text-white'>Detalles</div>
          </div>
        </div>
      </div>
    </div>
  );
}
