import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { nanoid } from 'nanoid';
import Xsquare from '../../Icons/X-square';
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

interface SolicitudAula {
  id_solicitud: Number;
  id_usuario: Number;
  fecha_requerida_solicitud: String;
  name: String;
  prioridad: String;
  docentes: [];
  materia_solicitud: String;
  grupos: [];
  cantidad_estudiantes_solicitud: Number;
  hora_requerida_solicitud: String;
  hora_fin_solicitud: String;
  responder: any;
}

export default function ({
  id_solicitud,
  id_usuario,
  fecha_requerida_solicitud,
  name,
  prioridad,
  docentes,
  materia_solicitud,
  grupos,
  cantidad_estudiantes_solicitud,
  hora_requerida_solicitud,
  hora_fin_solicitud,
  responder,
}: SolicitudAula) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [radioAceptar, SetRadioAceptar] = useState(true);
  const [radioRechazar, SetRadioRechazar] = useState(false);
  const [aulaSeleccionada, SetAulaSeleccionada] = useState('Ninguna');
  const [motivos, SetMotivos] = useState('');
  const [stateBack, SetStateBack] = useState(false);
  const [aulasDisponibles, SetAulaDisponibles] = useState<any[]>();
  const [aulasId, SetAulasId] = useState<any[]>();
  const [listaBuscar, SetListaBuscar] = useState<any[]>();
  const [reserva, SetReserva] = useState({
    fecha: fecha_requerida_solicitud,
    hora_ini: hora_requerida_solicitud,
    hora_fin: hora_fin_solicitud,
    capacidad: cantidad_estudiantes_solicitud,
  });
  const [mensajeConfirmacion, SetMensajeConfirmacion] = useState('');

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

  const [listaMostrar, SetListaMostrar] = useState<any[]>([]);
  const [isChecked, SetIsChecked] = useState<any>();
  const [open, setOpen] = React.useState(false);
  const [stateModal, setIsOpenConfir] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    if (isChecked) {
      setOpen(false);
      SetAulaSeleccionada(value);
      SetIsChecked(false);
      setValue('');
    } else {
      alert('Seleccione una opción de la lista.');
    }
  };
  const handleClose2 = () => {
    setOpen(false);
  };
  const [value, setValue] = useState<any>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleOpenBack = () => {
    SetStateBack(true);
  };

  const handleCloseBack = () => {
    SetStateBack(false);
  };
  function openModalConfir() {
    setIsOpenConfir(true);
  }

  function afterOpenModalConfir() {}

  function closeModalConfir() {
    setIsOpenConfir(false);
  }

  const handleChangeAceptar = () => {
    SetRadioAceptar(true);
    SetRadioRechazar(false);
    SetMotivos('');
  };
  const handleChangeRechazar = () => {
    SetRadioAceptar(false);
    SetRadioRechazar(true);
    SetMensajeConfirmacion('¿Está seguro de rechazar  esta solicitud?');
    SetAulaSeleccionada('Ninguna');
  };

  const handleChangeMotivos = (event: { target: { value: any } }) => {
    SetMotivos(event.target.value);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    if (stateBack == false) {
      setIsOpen(false);
    }
  };

  const getAulas = () => {
    handleOpenBack();
    axios.post(`${endpoint}/aulasDisponibles`, reserva).then(response => {
      SetAulaDisponibles(response.data);
      console.log(response.data);
      handleCloseBack();
      handleOpen();
    });
  };

  const generateAulas = () => {
    let lista: any[] = [];
    let listamuestra: any[] = [];
    if (aulasDisponibles != null) {
      for (let aula of aulasDisponibles) {
        let aulas: any[] = [];
        let aulasId: any[] = [];
        aula.vecinos.map((aula: any) => {
          aulas.push(aula.numero_aula + aula.letra_aula);
          aulasId.push(aula.id_aula);
        });
        lista.push({
          text: aulas.join(',') + ' - Capacidad: ' + aula.capacidad_total,
          idAula: aulasId,
        });
        listamuestra.push(
          aulas.join(',') + ' - Capacidad: ' + aula.capacidad_total,
        );
      }
      SetListaMostrar(listamuestra);
      SetListaBuscar(lista);
    }
  };

  const validar = () => {
    if (radioAceptar) {
      if (aulaSeleccionada == 'Ninguna') {
        alert('Por favor seleccione un aula');
      } else {
        openModalConfir();
      }
    } else {
      openModalConfir();
    }
  };

  const createReserva = () => {
    let soli;

    console.log(aulasId);
    if (radioRechazar) {
      soli = {
        id_solicitud: id_solicitud,
        id_usuario: id_usuario,
        fecha_requerida_solicitud: fecha_requerida_solicitud,
        motivo: motivos,
        aceptar: false,
      };
      console.log('rechazado');
    } else {
      soli = {
        id_solicitud: id_solicitud,
        id_usuario: id_usuario,
        fecha_requerida_solicitud: fecha_requerida_solicitud,
        hora_inicio: hora_requerida_solicitud,
        hora_fin: hora_fin_solicitud,
        id_aulas: aulasId,
        aceptar: true,
      };
      console.log('aceptado');
    }
    responder(soli);
    closeModalConfir();
    closeModal();
  };

  const getID = () => {
    let ids = listaBuscar
      ?.filter(item => {
        return item.text == aulaSeleccionada;
      })
      .map(item => item.idAula.join(','));
    SetAulasId(ids);
  };

  useEffect(() => {
    generateAulas();
  }, [aulasDisponibles]);

  useEffect(() => {
    if (value != null) {
      SetIsChecked(true);
    }
  }, [value]);

  useEffect(() => {
    if (aulaSeleccionada != 'Ninguna') {
      SetMensajeConfirmacion(
        `¿Está seguro de aceptar asignando : ${aulaSeleccionada} a  esta solicitud?`,
      );
      getID();
      console.log(aulasId);
    }
  }, [aulaSeleccionada]);

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
        <button
          type="button"
          className="btn text-white aceptadaButton ml-8"
          disabled={!radioAceptar}
          onClick={getAulas}
        >
          Seleccionar Aula
        </button>

        <Modal
          hideBackdrop
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 500 }} className="">
            <div className="text-center colorPrimary text-white px-18 py-2 rounded-t-lg">
              <h3 id="child-modal-title" className="col-span-3">
                Asignar aulas
              </h3>
            </div>

            <div id="child-modal-description">
              <FormControl>
                {/* <FormLabel id="aulas-recomendadas-label">
                  Seleccione una aula:
                </FormLabel> */}
                <RadioGroup
                  className="mx-8 my-8 align-middle"
                  name="aulas-recomendadas"
                  aria-labelledby="aulas-recomendadas-label"
                  value={value}
                  onChange={handleChange}
                >
                  {listaMostrar.length!=0 ? (
                    listaMostrar.map(aula => {
                      return (
                        <FormControlLabel
                          key={nanoid(6)}
                          control={<Radio color="success" />}
                          label={aula}
                          value={aula}
                        ></FormControlLabel>
                      );
                    })
                  ) : (
                    <div className='text-center'>
                      <p className="rechazada">
                        No hay Aulas disponibles para asignar
                      </p>
                    </div>
                  )}
                </RadioGroup>
              </FormControl>
            </div>
            <div className="float-right">
              <button
                type="button"
                className="btn colorPrimary text-white mr-2 ml-16 mb-4"
                onClick={handleClose2}
              >
                Atrás
              </button>
              {listaMostrar.length!=0 ? (
                <button
                  type="button"
                  className="btn aceptadaButton text-white mr-6 ml-2 mb-4"
                  onClick={handleClose}
                >
                  Seleccionar
                </button>
              ) : (
                ''
              )}
            </div>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }

  return (
    <div>
      <div className="card mt-3 mr-8">
        <div
          {...(prioridad
            ? { className: 'card-body bg-red-200' }
            : { className: 'card-body' })}
        >
          <div className="hstack gap-3 items-end ">
            <div className="mr-3">
              {prioridad ? '(*) ' : ''}Número de solicitud de aula:{' '}
              {id_solicitud + '-' + id_usuario}
            </div>
            <div className="mr-4">Fecha: {fecha_requerida_solicitud}</div>
            <div className="mr-2">Nombre Docente: {name}</div>
          </div>

          <div className=" float-right top-50 end-0 translate-middle-y mr-4 ">
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
                      Responder Solicitud{' '}
                    </h3>
                  </div>

                  <div>
                    <div className=" space-x-4  ml-12 text-left fondoModal">
                      <div className="mt-4 flex flex-col">
                        <p className="font-bold mr-4">
                          Nombre(s) de Docente(s): {docentes.toString()}
                        </p>
                        <p className="font-bold ">
                          Materia: {materia_solicitud}{' '}
                        </p>
                        <p className="font-bold ">
                          Grupo(s): {grupos.toString()}{' '}
                        </p>
                        <p className="font-bold ">
                          Cantidad de estudiantes:{' '}
                          {cantidad_estudiantes_solicitud}{' '}
                        </p>
                        <p className="font-bold ">
                          Para fecha: {fecha_requerida_solicitud}
                        </p>
                        <p className="font-bold">
                          Hora Inicio:{' '}
                          {hora_requerida_solicitud.substring(0, 5)}
                        </p>
                      </div>
                    </div>
                    <div className=" fondoModal2 grid grid-cols-2 divide-x">
                      <div className="mt-2">
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
                        <p className="aceptada mt-2 ml-8">
                          Aula(s) Seleccionada(s):
                        </p>
                        <p className="ml-8 mt-2">{aulaSeleccionada}</p>
                        <Backdrop
                          sx={{
                            color: '#fff',
                            zIndex: theme => theme.zIndex.drawer + 1,
                          }}
                          open={stateBack}
                        >
                          <CircularProgress color="inherit" />
                        </Backdrop>
                        <ChildModal />
                      </div>
                      <div className="mt-2">
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
                        <p className="font-bold mt-2 ml-8">Motivos:</p>
                        <textarea
                          className="ml-8 noEditar min-w-[80%]"
                          disabled={!radioRechazar}
                          onChange={handleChangeMotivos}
                          value={motivos}
                        ></textarea>
                      </div>
                    </div>
                    <div className="fondoModal2 text-center mb-2">
                      <ChildModalConfirmation />
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
