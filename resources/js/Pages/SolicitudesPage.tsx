import React, { useState } from 'react';
import Welcome from '@/Jetstream/Welcome';
import AppLayout from '@/Layouts/AppLayoutTeacher';
import Sidebar from '@/Jetstream/Sidebar';
import { solicitudes } from '@/Const/solicitudes';
import Cardsolicitud from '@/Jetstream/CardsolicitudPendiente';
import axios from 'axios';
import { useEffect } from 'react';
import Modal from 'react-modal';
import { nanoid } from 'nanoid';
import { usePage } from '@inertiajs/inertia-react';
const endpoint = 'http://127.0.0.1:8000';
export default function () {
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

  function ocultarBarra() {
    let divB = document.querySelector(
      'AppLayout .grid grid-cols-6 gap-4 .col-span-5 .mt-6 .barraCeleste',
    );
    divB;
  }

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenVoid, setIsOpenVoid] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  function openModalVoid() {
    setIsOpenVoid(true);
  }

  function afterOpenModalVoid() {}

  function closeModalVoid() {
    setIsOpenVoid(false);
  }

  const [listaSoliState, SetlistaSoli] = useState<any[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [listaSeleccion, setListaSeleccion] = useState<number[]>([]);

  const [renderizar, SetRenderizar] = useState(true);

  const { user }: any = usePage().props;
  let { id, name, email } = user;

  const getSolicitudes = () => {
    if (renderizar) {
      setMensaje(true);
      axios
        .get(`${endpoint}/api/solicitudes/pendientes/${id}`)
        .then(response => {
          SetlistaSoli(response.data);
          setMensaje(false);
        });
    }
  };

  useEffect(() => {
    getSolicitudes();
  }, []);

  useEffect(() => {
    if (
      listaSoliState.length === listaSeleccion.length &&
      listaSoliState.length != 0
    ) {
      setIsCheckAll(true);
    } else {
      setIsCheckAll(false);
    }
  }, [listaSoliState, listaSeleccion]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isCheckAll) {
      setListaSeleccion([]);
    } else {
      setListaSeleccion(listaSoliState.map(item => item.id_solicitud));
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    if (!checked) {
      setListaSeleccion(
        listaSeleccion.filter(item => `soliAccept${item}` !== id),
      );
    } else {
      setListaSeleccion([
        ...listaSeleccion,
        Number(id.replace('soliAccept', '')),
      ]);
    }
  };
  const cancelarSolicitudes = () => {
    SetRenderizar(false);
    let ids_solicitud = {
      ids_selecionados: listaSeleccion,
    };
    axios
      .post(`${endpoint}/api/solicitudes/cancelarPorArreglo`, ids_solicitud)
      .then(response => {
        if (response.data == 1) {
          SetlistaSoli(
            listaSoliState.filter(item => {
              let { id_solicitud } = item;
              return !listaSeleccion.includes(id_solicitud);
            }),
          );
          setListaSeleccion([]);
          closeModal();
        } else if (response.data == 0) {
        }
      });
  };

  const abrirModals = () => {
    if (listaSeleccion.length == 0) {
      openModalVoid();
    } else {
      openModal();
    }
  };

  const [progressActivo, setProgressActivo] = useState(false);
  const [mensaje, setMensaje] = useState(true);

  return (
    <AppLayout title="Informacion">
      <div className="grid grid-cols-6 gap-4">
        <div className=" colorPrimary mt-6 drop-shadow-lg ">
          <Sidebar></Sidebar>
        </div>
        <div className="col-span-5">
          <div className=" mt-6 ">
            <div className="d-flex flex-row">
              <h1 className="p-2 mb-2  font-bold ">Solicitudes Pendientes </h1>
            </div>

            <div className="text-center mr-8">
              {mensaje ? (
                <h5 className="mt-10">Espere...</h5>
              ) : listaSoliState.length === 0 ? (
                <h5 className="mt-10">
                  Aun no hay solicitudes para mostrar..gri..gri
                </h5>
              ) : (
                ''
              )}
            </div>

            {listaSoliState.length !== 0 && (
              <div id="barraCeleste" className="barraC">
                <div className="fondoBarra mr-8 ">
                  <div className="flex">
                    <div className="mt-3 ml-4">
                      <input
                        type="checkbox"
                        name="selectAllAceptados"
                        id="selectAllAceptados"
                        onChange={handleSelectAll}
                        checked={isCheckAll}
                      />
                    </div>
                    <div className="mt-3 ml-6">
                      <p className="text-white ">Seleccionar todas</p>
                    </div>
                    <div className="flex mt-2 position-absolute end-0  mr-10">
                      <button
                        type="button"
                        className="btn botonBarra text-white"
                        onClick={abrirModals}
                      >
                        Cancelar Seleccionadas
                      </button>
                    </div>

                    <Modal
                      isOpen={modalIsOpen}
                      onAfterOpen={afterOpenModal}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                      ariaHideApp={false}
                    >
                      <div className="font-bold">
                        ¿Está seguro de que desea cancelar las solicitudes
                        seleccionadas?
                      </div>
                      <form className="d-flex justify-content-center space-x-4 mt-4">
                        <div>
                          <button
                            onClick={closeModal}
                            type="button"
                            className="btn btn-danger text-white"
                          >
                            Cancelar
                          </button>
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={cancelarSolicitudes}
                            className="btn colorPrimary text-white"
                          >
                            Aceptar
                          </button>
                        </div>
                      </form>
                    </Modal>
                    <div>
                      <Modal
                        isOpen={modalIsOpenVoid}
                        onAfterOpen={afterOpenModalVoid}
                        onRequestClose={closeModalVoid}
                        style={customStyles}
                        contentLabel="Example Modal"
                        ariaHideApp={false}
                      >
                        <div className="font-bold">
                          No has seleccionado ninguna solicitud para cancelar.
                        </div>
                        <form className="d-flex justify-content-center space-x-4 mt-4">
                          <div></div>
                          <div>
                            <button
                              type="button"
                              onClick={closeModalVoid}
                              className="btn colorPrimary text-white"
                            >
                              Cerrar
                            </button>
                          </div>
                        </form>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            {listaSoliState.map(card => (
              <Cardsolicitud
                {...card}
                handleSelect={handleSelect}
                listaSeleccion={listaSeleccion}
                setProgressActivo={setProgressActivo}
                key={nanoid(5)}
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
