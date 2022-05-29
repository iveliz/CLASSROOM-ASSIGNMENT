import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { nanoid } from 'nanoid';
const endpoint = 'http://127.0.0.1:8000';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import axios from 'axios';
interface SolicitudRegistro {
  id_sct_cnt: Number;
  fecha: String;
  nombre_sct_cnt: String;
}

export default function ({
  id_sct_cnt,
  fecha,
  nombre_sct_cnt,
}: SolicitudRegistro) {
  const style = {
    position: 'absolute' as 'absolute',
    inset: '50% auto auto 50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: ' 8px',
  };
  const [modalIsOpen, setIsOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [stateBack, SetStateBack] = useState(false);
  const [radioAceptar, SetRadioAceptar] = useState(true);
  const [radioRechazar, SetRadioRechazar] = useState(false);
  const [motivos, SetMotivos] = useState('');
  const [mensajeConfirmacion, SetMensajeConfirmacion] = useState('');
  const handleOpen = () => {
    setOpen(true);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    if (stateBack == false) {
      setIsOpen(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeAceptar = () => {
    SetRadioAceptar(true);
    SetRadioRechazar(false);
    SetMotivos('');
  };

  const handleChangeRechazar = () => {
    SetRadioAceptar(false);
    SetRadioRechazar(true);
    SetMensajeConfirmacion('¿Está seguro de rechazar  esta solicitud?');
  };

  const handleChangeMotivos = (event: { target: { value: any } }) => {
    SetMotivos(event.target.value);
  };

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
  const handleOpenBack = () => {
    SetStateBack(true);
  };
  const getUsuarioSimilar = () => {
    handleOpen();
  };
  const responderbtn = () => {
    handleOpen();
  };

  var hayproblema = new Boolean(true);  

  function ChildModal() {
    return (
      <React.Fragment>
        <div className="d-flex justify-content-between">
          <p className="rechazada mt-2">
            Ya hay un usuario con un nombre similar
          </p>
          <button
            type="button"
            className="btn verUsuarioButton text-white  mr-8 "
            onClick={getUsuarioSimilar}
          >
            Ver Usuario
          </button>
        </div>

        <Modal
          hideBackdrop
          open={open}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 500 }} className="">
            <div className="text-center colorPrimary text-white px-18 py-2 rounded-t-lg">
              <h3 id="child-modal-title" className="col-span-3">
                Usuario
              </h3>
            </div>

            <div id="child-modal-description">
              <p className="m-4 text-align">
                El Nombre de usuario es similar al de otro usuario. Usuario
                similar:
              </p>
              {/*nombre de usuario 
                 nombre completo*/}
            </div>
            <div className="float-right">
              <button
                type="button"
                className="btn colorPrimary text-white mr-4 ml-16 mb-4"
                onClick={handleClose}
              >
                Cerrar
              </button>
            </div>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }
  return (
    <div>
      <div className="card mt-3 mr-8">
        <div className="card-body ">
          <div className="hstack gap-3 items-end ">
            <div className="mr-3">
              Número de solicitud de registro: {id_sct_cnt}
            </div>
            <div className="mr-4">Fecha: {fecha}</div>
            <div>Nombre Docente: {nombre_sct_cnt}</div>
          </div>
          <div className="float-right top-50 end-0 translate-middle-y mr-4">
            <button
              type="button"
              onClick={openModal}
              className="btn colorPrimary text-white"
            >
              Responder
            </button>
            <Modal open={modalIsOpen} onClose={closeModal}>
              <Box sx={{ ...style, width: 800 }}>
                <div className="fondoModal rounded-t-lg">
                  <div className="text-center colorPrimary text-white px-48 py-2 rounded-t-lg">
                    <h3 id="parent-modal-title" className="col-span-3">
                      {' '}
                      Responder solicitud de registro{' '}
                    </h3>
                  </div>
                  <div>
                    <div className=" space-x-4  ml-12 text-left fondoModal">
                      <div className="mt-4 ">
                        <p className="font-bold mr-4">
                          Nombre(s) de Docente(s): {nombre_sct_cnt}
                        </p>
                        <p className="font-bold ">
                          Nombre de usuario: {/*nombreusuario*/}{' '}
                        </p>
                        <p className="font-bold ">
                          Correo principal: {/*correoprincipal*/}{' '}
                        </p>
                        <p className="font-bold ">
                          Correo secundario: {/*correosecundario*/}{' '}
                        </p>
                        <p className="font-bold ">
                          Fecha de solicitud: {fecha}
                        </p>
                      </div>
                    </div>
                    <div className=" fondoModal2 ">
                      <div className="mt-4 flex flex-col">
                        <div className="mx-auto">
                          <div className="m-4">
                            <input
                              className="ml-8"
                              checked={radioAceptar}
                              onChange={handleChangeAceptar}
                              id="AceptarRadio"
                              type="radio"
                            ></input>
                            <label className="ml-2" htmlFor="RechazarRadio ">
                              Aceptar
                            </label>
                            <input
                              className="ml-8"
                              checked={radioRechazar}
                              onChange={handleChangeRechazar}
                              id="RechazarRadio"
                              type="radio"
                            ></input>
                            <label className="ml-2" htmlFor="RechazarRadio ">
                              Rechazar
                            </label>
                          </div>
                        </div>
                        {/*aca va si es que hay problema con el usuario*/}
                        {hayproblema == false ? (
                          ''
                        ) : (
                          <div className="font-semibold  ml-8">
                            <ChildModal />
                          </div>
                        )}

                        <p className="font-bold mt-2 ml-8">Motivos:</p>
                        <textarea
                          className="ml-8 noEditar mr-8 min-w-fit"
                          disabled={!radioRechazar}
                          onChange={handleChangeMotivos}
                          value={motivos}
                        ></textarea>
                        <button
                          type="button"
                          className="btn colorPrimary text-white m-8 mx-auto bottom-0 w-32"
                        >
                          Confirmar
                        </button>
                      </div>
                      {/* 
                      <div className="fondoModal2 text-center mb-2">
                        {/* <ChildModalConfirmation />
                      </div>
                      */}
                    </div>
                  </div>
                </div>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
