import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { nanoid } from 'nanoid';
import { usePage } from '@inertiajs/inertia-react';
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
  usuario_sct_cnt: String;
  correo_principal_sct_cnt: String;
  correo_secundario_sct_cnt: String;
  usuarioSimilar: {
    name: String;
    user_name: String;
    email_principal: String;
  };
  actualizar:any;
  setProgressActivo:any;
}

export default function ({
  id_sct_cnt,
  fecha,
  nombre_sct_cnt,
  usuario_sct_cnt,
  correo_principal_sct_cnt,
  correo_secundario_sct_cnt,
  usuarioSimilar,
  actualizar,
  setProgressActivo,
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
  const [stateModal, setIsOpenConfir] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const openModal = () => {
    setIsOpen(true);
    SetRadioAceptar(false);
    SetRadioRechazar(false);
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
    SetMensajeConfirmacion('¿Está seguro de aceptar esta solicitud?');
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
  const getUsuarioSimi = () => {
    handleOpen();
  };
  const responderbtn = () => {
    handleOpen();
  };
  var hayproblema = new Boolean(true);

  function closeModalConfir() {
    setIsOpenConfir(false);
  }

  function openModalConfir() {
    setIsOpenConfir(true);
  }

  const validar = () => {
    if (radioAceptar || radioRechazar) {
      openModalConfir();
    } else {
      alert('Por favor seleccione una opción');
    }
  };
  const handleCloseBack = () => {
    SetStateBack(false);
  };

  const responder = () => {
    handleOpenBack();
    axios.post(`${endpoint}/aulasDisponibles`).then(response => {
      console.log(response.data);
      handleCloseBack();
    });
  };

  const { user }: any = usePage().props;
  let { id, name, email } = user;

  const createReserva = () => {
  
    let solicitud_ctn;
    let solicitud_ctn2;
    if (radioRechazar) {
      solicitud_ctn = {
        id_sct_cnt: id_sct_cnt,
        id: user.id,
      };
      axios
        .post(`${endpoint}/rechazarSolicitudCuenta`, solicitud_ctn)
        .then(response => {
          actualizar(id_sct_cnt);
          handleCloseBack();
          console.log(response.data);
          console.log('rechazada');
          setProgressActivo(false);
        });
    setProgressActivo(true);
    } else {
      solicitud_ctn2 = {
        id_sct_cnt: id_sct_cnt,
        name: nombre_sct_cnt,
        user_name: usuario_sct_cnt,
        email_principal: correo_principal_sct_cnt,
        email_secundario: correo_secundario_sct_cnt,
        id_role: 2,
        id_admin: user.id,
      };
      console.log(solicitud_ctn2);
      axios
        .post(`${endpoint}/registrarUsuario`, solicitud_ctn2)
        .then(response => {
          console.log(response);
          actualizar(id_sct_cnt);
          handleCloseBack();
          handleOpen();
          setProgressActivo(false);
        });
        setProgressActivo(true);
    }
    closeModalConfir();
    closeModal();

  };

  function ChildModalConfirmation() {
    return (
      <React.Fragment>
        <button
          type="button"
          className="btn colorPrimary text-white mt-4"
          onClick={validar}
        >
          Confirmar
        </button>
        <Modal open={stateModal} onClose={closeModalConfir}>
          <Box sx={{ ...style, width: 500 }}>
            <div className="font-bold text-center m-4">
              <p>{mensajeConfirmacion}</p>
            </div>
            <form className="d-flex justify-content-center space-x-4 mt-4 mb-4">
              <div>
                <button
                  onClick={closeModalConfir}
                  type="button"
                  className="btn btn-danger text-white"
                >
                  Cancelar
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="btn colorPrimary text-white"
                  onClick={createReserva}
                >
                  Aceptar
                </button>
             
              </div>
            </form>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }
  function ChildModal() {
    return (
      <React.Fragment>
        <div className="d-flex justify-content-between">
          <p className="rechazada mt-2">
            Ya hay un usuario con Nombre similar
          </p>
          <button
            type="button"
            className="btn verUsuarioButton text-white  mr-8 "
            onClick={getUsuarioSimi}
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

            <div id="child-modal-description m-2">
              <p className="m-4 text-align">
                El Nombre de docente es similar al de otro usuario. Usuario
                similar:
              </p>
              <div className="flex flex-col font-semibold ml-6 mb-4">
                {usuarioSimilar.name == null ? (
                  ''
                ) : (
                  <div>Nombre de docente: {usuarioSimilar.name}</div>
                )}
              </div>
              <div></div>
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
  console.log(usuarioSimilar);
  console.log(user.id);
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
                          Nombre de usuario: {usuario_sct_cnt}{' '}
                        </p>
                        <p className="font-bold ">
                          Correo principal: {correo_principal_sct_cnt}{' '}
                        </p>
                        <p className="font-bold ">
                          Correo secundario: {correo_secundario_sct_cnt}{' '}
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

                        {usuarioSimilar == null ? (
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
                      </div>
                      <div className="fondoModal2 text-center mb-4">
                        <ChildModalConfirmation />
                      </div>
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
