import React from 'react';
import { useState } from 'react';
import { solicitudes } from '@/Const/solicitudes';
import Cardsolicitud from '@/Jetstream/CardsolicitudPendiente';
import Modal from 'react-modal';

export default function (){
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
  return(
    <div>
      <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div className="font-bold">
                ¿Está seguro de solicitar un aula con esos datos?
              </div>
              <form className="d-flex justify-content-center space-x-4 mt-4">
                <div>
                  <button className="btn btn-danger text-white">
                    Cancelar
                  </button>
                </div>
                <div>
                  <button className="btn colorPrimary text-white">
                    Aceptar
                  </button>
                </div>
              </form>
            </Modal>

    </div>
  );
}