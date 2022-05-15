import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
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
}: SolicitudAula) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [radioAceptar, SetRadioAceptar] = useState(true);
  const [radioRechazar, SetRadioRechazar] = useState(false);
  const [aulaSeleccionada, SetAulaSeleccionada] = useState('Ninguna');
  const [motivos, SetMotivos] = useState('');
  const aulaslista = [
    { aulas: '691a,691b' },
    { aulas: '665b' },
    { aulas: '692a,692b,692d' },
    { aulas: '692a,692b,692d' },
    { aulas: '692a,692b,692d' },
    { aulas: '692a,692b,692d' },
    { aulas: '692a,692b,692d' },
    { aulas: '692a,692b,692d' },
  ];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    SetAulaSeleccionada(value.toString())
  };
  const handleClose2=()=>{
    setOpen(false);
  }
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

  };

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

  function ChildModal() {
    return (
      <React.Fragment>
        <button
          type="button"
          className="btn text-white aceptadaButton ml-8"
          disabled={!radioAceptar}
          onClick={handleOpen}
        >Seleccionar Aula</button>

        <Modal
          hideBackdrop
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 500 }} className="" >
            <div className="text-center colorPrimary text-white px-18 py-2 rounded-t-lg">
             <h3 id="child-modal-title" className="col-span-3">Asignar aulas</h3>
            </div>
         

            <p id="child-modal-description">
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
                  {aulaslista.map((aula, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        control={<Radio color="success" />}
                        label={aula.aulas}
                        value={aula.aulas}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </p>
            <div className="position-absolute bottom-0 end-0 align-text-bottom" > 
              <button
                type="button"
                className="btn colorPrimary text-white mr-4 my-6"
                onClick={handleClose2}>
                Atrás
              </button>
              <button 
                type="button" 
                className="btn aceptadaButton text-white mr-4 my-6" 
                onClick={handleClose}>
                Seleccionar
              </button>
              </div>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }

  const handleChangeAceptar = () => {
    SetRadioAceptar(true);
    SetRadioRechazar(false);
    SetMotivos('');
  };
  const handleChangeRechazar = () => {
    SetRadioAceptar(false);
    SetRadioRechazar(true);
    SetAulaSeleccionada('Ninguna');
  };

  const handleChangeMotivos = (event: { target: { value: any } }) => {
    SetMotivos(event.target.value);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  const closeModal = () => {
    setIsOpen(false);
  };
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
              {prioridad ? '(*) ' : ''}Número de solicitud de registro:{' '}
              {id_solicitud + '-' + id_usuario}
            </div>
            <div className="mr-4">Fecha: {fecha_requerida_solicitud}</div>
            <div className="mr-2">Nombre Docente: {name}</div>
          </div>

          <div className="position-absolute top-50 end-0 translate-middle-y mr-4 ">
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
                        <ChildModal></ChildModal>
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
                      <button
                        type="button"
                        className="btn colorPrimary text-white mt-4"
                      >
                        Confirmar
                      </button>
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
