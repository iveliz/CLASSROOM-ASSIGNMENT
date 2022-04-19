import React from 'react';
import image from '../../css/images/userImage.png';
import Modal from 'react-modal';
import { useState } from 'react';
interface Solicitud {
  Fecha: String;
  codigo: number;
  Materia: String;
}

export default function ({ Fecha, codigo, Materia }: Solicitud) {
  let subtitle: any;
  const [modalIsOpen, setIsOpen] = useState(false);

  const customStyles = {
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
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
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
            onClick={openModal}
            >
              Detalles
            </button>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div className="font-bold justify-content-center">
                <h2 className="border-b-4 "> Información de solicitud </h2>
              </div>
              <form className="d-flex justify-content-center space-x-4 mt-4">
                
              </form>
            </Modal>
            </div>
          </div>

      </div>

 </div>
   
  );
}
 {/*( =ω=)..nyaa falta cancelar e informacion */ }