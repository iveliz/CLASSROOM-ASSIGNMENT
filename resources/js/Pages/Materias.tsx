import { useForm, Head, usePage } from '@inertiajs/inertia-react';
import Modal from 'react-modal';
import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import JetAuthenticationCard from '@/Jetstream/CardAsignacion';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import JetLabel from '@/Jetstream/Label';
import ListItemText from '@mui/material/ListItemText';
import JetValidationErrors from '@/Jetstream/ValidationErrors';
import axios from 'axios';
import Select from 'react-select';
import { styled } from '@mui/material/styles';
import AppLayout from '@/Layouts/AppLayoutAdmin';
import { Box, IconButton } from '@mui/material';
import TabPanel from '@/Jetstream/TabPanel';
import JetButton from '@/Jetstream/Button';
import classNames from 'classnames';
const endpoint = 'http://127.0.0.1:8000';

export default function Materias(this: any) {
  const { user }: any = usePage().props;
  let { id, name, email } = user;

  const customStyles = {
    overlay: {
      background: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      minheight: '500px',
      height: 'auto',
      overflow: 'visible',
      marginRight: '-25%',
      transform: 'translate(-50%, -50%)',
      padding: 0,
    },
  };

  const form = useForm({
    name: { label: '', value: 0 },
    carrera: { label: '', value: 0 },
    materia: { label: '', value: 0 },
    grupos: [],
  });

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [stateBack, SetStateBack] = useState(false);
  const [Message, SetMessage] = useState('');
  const [listDocentes, SetListDocentes] = useState<any>();
  const [listMaterias, SetListMaterias] = useState<any>();
  const [listCarreras, SetLisCarreras] = useState<any>();
  const [stateCarrera, SetStateCarrera] = useState(false);
  const [stateMateria, SetStateMateria] = useState(true);
  const [stateGroups, SetStateGroups] = useState(true);
  const [stateDocente, SetStateDocente] = useState(true);
  const [stateChargeMateria, SetStateChargeMateria] = useState(false);
  const [stateChargeGroups, SetStateChargeGroups] = useState(false);
  const [stateButtonAdd, SetStateButtonAdd] = useState(true);
  const [listGrupos, SetListGrupos] = useState<any>();
  const [pagination, SetPagination] = useState(0);
  const [listaMateriasDocente, SetStateListaMaterias] = useState<any>([]);
  const [toDelete, SetToDelete] = useState<any>();
  const [NotCompleteForm, SetCompleteForm] = useState(true);

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }
  function openModal2() {
    setIsOpen2(true);
  }

  function afterOpenModal2() {}

  function closeModal2() {
    setIsOpen2(false);
    clearForm();
    SetStateMateria(true);
    SetStateGroups(true);
  }

  const handleOpenBack = () => {
    SetStateBack(true);
  };

  const handleCloseBack = () => {
    SetStateBack(false);
  };

  const getDocentes = () => {
    SetStateDocente(true);
    axios.post(`${endpoint}/docentes`).then(response => {
      let aux = [];
      for (let { name, id } of response.data) {
        aux.push({ label: name, value: id });
      }
      SetListDocentes(aux);
      SetStateDocente(false);
    });
  };

  const getMaterias = (id_carrera: number) => {
    SetStateChargeMateria(true);
    axios.post(`${endpoint}/materiasCarrera`, { id_carrera }).then(response => {
      let aux = [];
      for (let { nombre_materia, id_materia } of response.data) {
        aux.push({ label: nombre_materia, value: id_materia });
      }
      SetListMaterias(aux);
      if (form.data.carrera.value != 0) {
        SetStateMateria(false);
      }
      SetStateChargeMateria(false);
      SetStateCarrera(false);
    });
  };

  const getCarrera = () => {
    axios.post(`${endpoint}/carreras`).then(response => {
      let aux = [];
      for (let { nombre_carrera, id_carrera } of response.data) {
        aux.push({ label: nombre_carrera, value: id_carrera });
      }
      SetLisCarreras(aux);
    });
  };

  const getMateriasDocente = (id_usuario: number) => {
    SetMessage('');
    SetStateDocente(true);
    SetStateButtonAdd(true);
    SetStateListaMaterias([]);
    axios.post(`${endpoint}/materiasDocente`, { id_usuario }).then(response => {
      console.log(response.data);
      if (response.data != 0) {
        let aux = [];
        for (let {
          nombre_materia,
          id_materia,
          nombre_carrera,
          grupos,
        } of response.data) {
          let ng = [];
          let nt = [];
          for (let { codigo_grupo, id_grupo } of grupos) {
            ng.push(codigo_grupo);
            nt.push(id_grupo);
          }

          aux.push({
            materia: nombre_materia,
            carrera: nombre_carrera,
            id: id_materia,
            grupos: ng.join(','),
            id_grupos: nt,
          });
        }
        SetStateListaMaterias(aux);
      } else {
        SetMessage('Este docente no tiene materias asignadas');
      }
      SetStateDocente(false);
      SetStateButtonAdd(false);
    });
  };

  const getGrupos = (id_materia: number) => {
    SetStateGroups(true);
    SetStateMateria(true);
    SetStateCarrera(true);
    SetStateChargeGroups(true);
    axios.post(`${endpoint}/gruposMateria`, { id_materia }).then(response => {
      let aux = [];
      for (let { id_grupo, codigo_grupo } of response.data) {
        aux.push({ label: codigo_grupo, value: id_grupo });
      }
      SetListGrupos(aux);

      if (form.data.carrera.value != 0) {
        SetStateMateria(false);
      }
      if (form.data.materia.value != 0) {
        SetStateGroups(false);
      }
      SetStateChargeGroups(false);
      SetStateCarrera(false);
      SetStateMateria(false);
    });
  };

  const changePages = (event: React.SyntheticEvent, newValue: number) => {
    SetPagination(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    form.setData('materia', { label: '', value: 0 });
    if (form.data.carrera.value != 0) {
      getMaterias(form.data.carrera.value);
    }
  }, [form.data.carrera]);

  useEffect(() => {
    form.setData('grupos', []);
    if (form.data.materia.value != 0) {
      getGrupos(form.data.materia.value);
    }
  }, [form.data.materia]);

  useEffect(() => {
    if (form.data.grupos != null) {
      if (form.data.grupos.length !== 0) {
        SetCompleteForm(false);
      } else {
        SetCompleteForm(true);
      }
    } else {
      SetCompleteForm(true);
    }
  }, [form.data.grupos]);

  const handleChangeCarrera = () => {
    SetStateMateria(true);
    SetStateGroups(true);
    SetStateCarrera(true);
  };

  const handleChangeMateria = () => {
    SetStateMateria(true);
    SetStateCarrera(true);
  };

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(form.data.grupos);
    if (NotCompleteForm) {
      alert('Por favor, rellene todas las casillas');
    } else {
      crearMateria();
      clearForm();
    }
  }

  const clearForm = () =>{
    form.reset("carrera","materia","grupos");
  }

  const crearMateria = () => {
    handleOpenBack();
    let gruposId = form.data.grupos.map((x: any) => {
      return x.value;
    });
    let codigogrupos = form.data.grupos.map((x: any) => {
      return x.label;
    });
    let toCreate = {
      id_carrera: form.data.carrera.value,
      id_materia: form.data.materia.value,
      id_usuario: form.data.name.value,
      codigo_grupos: codigogrupos,
      id_grupos: gruposId,
      id_admin: id,
    };
    axios.post(`${endpoint}/agregarMateria`, toCreate).then(response => {
      if (response.data == 2) {
        alert('Esta materia ha sido asignada recientemente , intente de nuevo');
        closeModal2();
        clearForm();
      } else if (response.data == 0) {
        alert('Ha ocurrido un error, por favor recargue la página');
      } else {
        listaMateriasDocente.push({
          materia: form.data.materia.label,
          id: form.data.materia.value,
          carrera: form.data.carrera.label,
          grupos: codigogrupos.join(','),
          id_grupos: gruposId,
        }),
          handleCloseBack();
      }
    });
    closeModal2();
  };

  const confirmateDelete = () => {
    handleOpenBack();
    if (toDelete != null) {
      let deleting = {
        id_materia: toDelete.id,
        id_usuario: form.data.name.value,
        id_grupos: toDelete.id_grupos,
        id_admin: id,
      };
      console.log(deleting);
      axios.post(`${endpoint}/quitarMateria`, deleting).then(response => {
        if (response.data == 0) {
          alert('Ha ocurrido un error, por favor recargue la página');
        } else {
          console.log(response);
          handleCloseBack();
          SetStateListaMaterias(
            listaMateriasDocente.filter(
              (mt: { materia: any }) => mt != toDelete,
            ),
          );
          if (listaMateriasDocente.length == 0) {
            SetMessage('Este docente no tiene materias asignadas');
            SetStateDocente(false);
          }
        }
      });
      closeModal();
    }
  };

  const deleteM = (materia: any) => {
    openModal();
    SetToDelete(materia);
  };

  useEffect(() => {
    getCarrera();
    getDocentes();
  }, []);

  return (
    <AppLayout title="Informacion">
      <JetAuthenticationCard>
        <Head title="Register" />

        <JetValidationErrors className="mb-4" />
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={pagination} onChange={changePages} variant="fullWidth">
            <Tab
              label="Asignar"
              {...a11yProps(0)}
              sx={{ fontWeight: '200', fontFamily: 'Nunito' }}
            />
            <Tab
              label="Eliminar"
              {...a11yProps(1)}
              sx={{ fontWeight: '200', fontFamily: 'Nunito' }}
            />
          </Tabs>
          <Backdrop
            sx={{
              color: '#fff',
              zIndex: theme => theme.zIndex.drawer + 1,
            }}
            open={stateBack}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
        <TabPanel value={pagination} index={0}>
          <h3 className="font-bold text-center">Asignar materias</h3>

          <div className="mt-4">
            <JetLabel htmlFor="name">Nombre Docente</JetLabel>
            <Select
              id="selectDocente"
              options={listDocentes}
              value={form.data.name}
              onChange={(e: { label: string; value: number }) => {
                form.setData('name', e);
                getMateriasDocente(e.value);
              }}
              isClearable={false}
              isLoading={stateDocente}
              isDisabled={stateDocente}
              placeholder="Selecciona un Docente"
              required
            ></Select>
          </div>

          <div className="mt-4">
            <button
              type="button"
              className="btn aceptadaButton text-white"
              onClick={openModal2}
              disabled={stateButtonAdd}
            >
              + Añadir Materias
            </button>
          </div>

          <Grid item xs={12} md={6}>
            <div className="text-center colorPrimary text-white px-48 py-2 mt-4">
              <h4 className="col-span-3">Lista de Materias</h4>
            </div>
            <Demo>
              {listaMateriasDocente == null ||
              listaMateriasDocente.length == 0 ? (
                <h4 className="text-center text-slate-400 mt-4">
                  {form.data.name.label == ''
                    ? 'Seleccione Docente...'
                    : Message != ''||listaMateriasDocente.length==0
                    ? Message
                    : 'Cargando...'}
                </h4>
              ) : (
                <List
                  component="nav"
                  sx={{
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 300,
                    bgcolor: '#cccccc',
                  }}
                >
                  {listaMateriasDocente.map((materia: any) => {
                    return (
                      <ListItem key={nanoid(5)} divider>
                        <ListItemText
                          primary={
                            <>
                              <div>
                                <p className="font-bold">
                                  {'Materia: '}
                                  <span className="font-thin">
                                    {materia.materia}
                                  </span>
                                </p>

                                <p className="font-bold">
                                  {'Carrera: '}
                                  <span className="font-thin">
                                    {materia.carrera}
                                  </span>
                                </p>
                                <p className="font-bold">
                                  {'Grupo(s): '}
                                  <span className="font-thin">
                                    {materia.grupos}
                                  </span>
                                </p>
                              </div>
                            </>
                          }
                        ></ListItemText>
                      </ListItem>
                    );
                  })}
                </List>
              )}
            </Demo>
          </Grid>

          <Modal
            isOpen={modalIsOpen2}
            onAfterOpen={afterOpenModal2}
            onRequestClose={closeModal2}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
            <div className="text-center colorPrimary text-white px-48 py-2">
              <h3 className="col-span-3">Añadir Materia</h3>
            </div>
            <form onSubmit={onSubmit}>
              <div className="ml-4 mr-4 space-x-4 mt-4">
                <p className="font-bold ml-4">Carrera</p>
                <Select
                  id="selectCarreras"
                  options={listCarreras}
                  value={form.data.carrera}
                  onChange={(e: { label: string; value: number }) => {
                    form.setData('carrera', e);
                    handleChangeCarrera();
                  }}
                  isDisabled={stateCarrera}
                  isClearable={false}
                  placeholder="Selecciona una Carrera"
                  noOptionsMessage={() => 'No hay carreras disponibles'}
                ></Select>
                <p className="font-bold mt-4">Materia</p>
                <Select
                  id="selectMaterias"
                  options={listMaterias}
                  isLoading={stateChargeMateria}
                  value={form.data.materia}
                  onChange={(e: { label: string; value: number }) => {
                    form.setData('materia', e);
                    handleChangeMateria;
                  }}
                  isDisabled={stateMateria}
                  isClearable={false}
                  placeholder="Selecciona una Materia"
                  noOptionsMessage={() =>
                    'No hay materias disponibles para esta carrera'
                  }
                ></Select>
                <p className="font-bold mt-4">Grupo(s)</p>
                <Select
                  id="selectGroups"
                  options={listGrupos}
                  value={form.data.grupos}
                  onChange={(e: any) => {
                    form.setData('grupos', e);
                  }}
                  isMulti
                  isLoading={stateChargeGroups}
                  isDisabled={stateGroups}
                  isClearable={false}
                  placeholder="Selecciona grupos"
                  noOptionsMessage={() =>
                    'No hay grupos disponibles para esta materia'
                  }
                ></Select>
                <div className="float-right mb-4 mt-4">
                  <button
                    onClick={closeModal2}
                    type="submit"
                    className="btn colorPrimary text-white  mr-4 text-right"
                  >
                    Cerrar
                  </button>
                  <button
                    className="btn aceptadaButton text-white text-right"
                    disabled={NotCompleteForm}
                    type="submit"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </form>
          </Modal>
        </TabPanel>

        <TabPanel value={pagination} index={1}>
          <h3 className="font-bold text-center">Quitar Materias</h3>
          <form>
            <div className="mt-4">
              <JetLabel htmlFor="name">Nombre Docente</JetLabel>
              <Select
                id="selectDocente"
                options={listDocentes}
                value={form.data.name}
                onChange={(e: { label: string; value: number }) =>
                  form.setData('name', e)
                }
                isClearable={false}
                isLoading={stateDocente}
                isDisabled={stateDocente}
                placeholder="Selecciona un Docente"
                required
              ></Select>
            </div>

            <Grid item xs={12} md={6}>
              <div className="text-center colorPrimary text-white px-48 py-2 mt-4">
                <h4 className="col-span-3">Lista de Materias</h4>
              </div>
              <Demo>
                {listaMateriasDocente == null ||
              listaMateriasDocente.length == 0 ? (
                <h4 className="text-center text-slate-400 mt-4">
                  {form.data.name.label == ''
                    ? 'Seleccione Docente...'
                    : Message != ''||listaMateriasDocente.length==0
                    ? Message
                    : 'Cargando...'}
                </h4>
                ) : (
                  <List
                    component="nav"
                    sx={{
                      position: 'relative',
                      overflow: 'auto',
                      maxHeight: 300,
                      bgcolor: '#cccccc',
                    }}
                  >
                    {listaMateriasDocente.map((materia: any) => {
                      return (
                        <ListItem key={nanoid(5)} divider>
                          <ListItemText
                            primary={
                              <>
                                <div>
                                  <p className="font-bold">
                                    {'Materia: '}
                                    <span className="font-thin">
                                      {materia.materia}
                                    </span>
                                  </p>

                                  <p className="font-bold">
                                    {'Carrera: '}
                                    <span className="font-thin">
                                      {materia.carrera}
                                    </span>
                                  </p>
                                  <p className="font-bold">
                                    {'Grupo(s): '}
                                    <span className="font-thin">
                                      {materia.grupos}
                                    </span>
                                  </p>
                                </div>
                              </>
                            }
                          ></ListItemText>
                          <IconButton onClick={() => deleteM(materia)}>
                            <DeleteSharpIcon color="error"></DeleteSharpIcon>
                          </IconButton>
                        </ListItem>
                      );
                    })}
                  </List>
                )}
              </Demo>
            </Grid>

            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
              ariaHideApp={false}
            >
              <div className="text-center colorPrimary text-white px-48 py-2">
                <h3 className="col-span-3">Eliminar Materia</h3>
              </div>
              <div className="font-bold text-center mt-4">
                ¿Está seguro de eliminar esta materia?
              </div>
              <form className="d-flex justify-content-center space-x-4 mt-4 mb-4">
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
                    className="btn aceptadaButton text-white text-right ml-4"
                    onClick={confirmateDelete}
                    type="button"
                  >
                    Aceptar
                  </button>
                </div>
              </form>
            </Modal>
          </form>
        </TabPanel>
      </JetAuthenticationCard>
    </AppLayout>
  );
}
