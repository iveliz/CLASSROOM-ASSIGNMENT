import React, { useState } from 'react';
import Welcome from '@/Jetstream/Welcome';
import AppLayout from '@/Layouts/AppLayoutTeacher';
import Sidebar from '@/Jetstream/Sidebar';
import axios from 'axios';
import Cardsolicitud from '@/Jetstream/CardsolicitudAceptada';
import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { usePage } from '@inertiajs/inertia-react';
import Modal from 'react-modal';
const endpoint = 'http://3.238.9.78';
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

  function afterOpenModalVoid() {

  }

  function closeModalVoid() {
    setIsOpenVoid(false);
  }
  const [listaSoliState, SetlistaSoli] = useState<any[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [listaSeleccion, setListaSeleccion] = useState<number[]>([]);
  const [renderizar,SetRenderizar]=useState(true);
  console.log(listaSeleccion);
  const { user }: any = usePage().props;
  let { id, name, email } = user;

  const getSolicitudes = () => {
    if(renderizar){
      axios.get(`${endpoint}/api/solicitudes/aceptadas/${id}`).then(response => {
        console.log(response.data);
        SetlistaSoli(response.data);
      });
    }

  };

  useEffect(() => {
    getSolicitudes();
  }, []);

  useEffect(() => {
    if (listaSoliState.length === listaSeleccion.length&&listaSoliState.length!=0) {
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
    let ids_solicitud= {
      "ids_selecionados": listaSeleccion
    }
    axios
      .post(`${endpoint}/api/solicitudes/cancelarPorArreglo`, ids_solicitud)
      .then(response => {
        if(response.data==1){
          SetlistaSoli (listaSoliState.filter((item)=>{
            let {id_solicitud}=item;
            return !listaSeleccion.includes(id_solicitud);
            }));
            setListaSeleccion([]);
            closeModal();
        }else if(response.data==0){
        
        }
        console.log(response.data)
      });
  };

  const abrirModals= ()=>{
    console.log(listaSeleccion.length)
    if(listaSeleccion.length==0){
      openModalVoid();
    
    }else{
      openModal();
    }
  }

  return (
    <AppLayout title="Informacion">
      <div className="grid grid-cols-6 gap-4">
        <div className=" colorPrimary mt-6 drop-shadow-lg ">
          <Sidebar></Sidebar>
        </div>
        <div className="col-span-5">
          <div className=" mt-6 ">
            <h1 className="font-bold">Solicitudes Aceptadas</h1>
            <div className="fondoBarra  mr-8 ">
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
                  <button type="button" className="btn botonBarra text-white" onClick={abrirModals}>
                    Cancelar Seleccionadas
                  </button>
                  <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                  >
                    <div className="font-bold">
                      ¿Está seguro de que desea cancelar las reservas
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
                      <div>
                      </div>
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
          </div>
          <div>
            {listaSoliState.map(card => (
              <Cardsolicitud
                {...card}
                handleSelect={handleSelect}
                listaSeleccion={listaSeleccion}
                key={nanoid(5)}
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
