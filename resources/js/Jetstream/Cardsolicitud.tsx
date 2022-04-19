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

  let subtitle2: any;
  const [modalIsOpen2, setIsOpen2] = useState(false);

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
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal2() {
    setIsOpen2(true);
  }

  function afterOpenModal2() {
    // references are now sync'd and can be accessed.
    subtitle2.style.color = '#f00';
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
            <div className="mr-3">{Fecha}</div>
            <div className="mr-4">Código: {codigo}</div>
            <div>Materia: {Materia}</div>
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
              contentLabel="Example Modal"
            >
              <div className="text-center colorPrimary text-white px-48 py-2">
                <h3 className="col-span-3"> Información de solicitud </h3>
              </div>

              <form className=" space-x-4 mt-4 ml-12 text-left ">
                <div className="flex flex-col">
                  <p className="font-bold ">Nombre(s) de Docente(s): </p>
                  <p className="font-bold ">Materia: </p>
                  <p className="font-bold ">Grupo(s): </p>
                  <p className="font-bold ">Cantidad de estudiantes: </p>
                  <p className="font-bold ">Para fecha: </p>
                  <p className="font-bold "></p>
                  <div className="absolute right-0 bottom-0">
                   {/* <button
                      type="button"
                      className="btn btn-danger text-white  mr-4 mb-2 "
                      onClick={openModal2}
                    >
                      Cancelar
                    </button>
                    <Modal
                      isOpen={modalIsOpen2}
                      onAfterOpen={afterOpenModal2}
                      onRequestClose={closeModal2}
                      style={customStyles2}
                      contentLabel="Example Modal"
                    >
                      <div className="font-bold">
                        ¿Está seguro que desea cancelar?
                      </div>
                      <form className="d-flex justify-content-center space-x-4 mt-4">
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
                          <button
                            type="button"
                            className="btn colorPrimary text-white"
                          >
                            Aceptar
                          </button>
                        </div>
                      </form>
                    </Modal>
  */}
                    <button
                      className="btn butonOK text-white  mr-4 mb-2"
                      onClick={closeModal}
                    >
                      OK
                    </button>
                  </div>
                </div>
              </form>
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
