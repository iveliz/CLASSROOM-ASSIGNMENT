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
        <div className="card-body ">
          
          <div className="hstack gap-3 items-end "> {/*items-end*/ }
            <div className='mr-3'>{Fecha}</div>
            <div className='mr-4'>Código: {codigo}</div>
            <div>Materia: {Materia}</div>
            </div>

            <div className="position-absolute top-50 end-0 translate-middle-y mr-4">
            {/*<div className"></div>*/}
            <button type='button'
            className='btn colorPrimary text-white'
            data-bs-toggle="modal"
            data-bs-target="#modalId"
            >
              Detalles
            </button>
             
              </div>
           </div>

      </div>
     
 </div>
    
  );
}
