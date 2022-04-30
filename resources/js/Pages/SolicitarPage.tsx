import React, { useEffect, useRef } from 'react';
import AppLayout from '@/Layouts/AppLayoutTeacher';
import SolicitarCard from '@/Jetstream/SolicitarCard';
import { NumberPicker } from 'react-widgets/cjs';
import 'react-widgets/styles.css';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { addDays, subDays, addYears } from 'date-fns';
import { registerLocale } from 'react-datepicker';
import Modal from 'react-modal';
import axios from 'axios';
import Select, { components } from 'react-select';

import { usePage } from '@inertiajs/inertia-react';
import { add, min } from 'lodash';
registerLocale('es', es);
let esHoy: Date = new Date();

let horarios = [
  { label: '06:45', value: '06:45:00', pos: 1, hora: 6, minun: 45 },
  { label: '07:30', value: '07:30:00', pos: 2, hora: 7, minun: 30 },
  { label: '08:15', value: '08:15:00', pos: 3, hora: 8, minun: 15 },
  { label: '09:00', value: '09:00:00', pos: 4, hora: 9, minun: 0 },
  { label: '09:45', value: '08:15:00', pos: 5, hora: 9, minun: 45 },
  { label: '10:30', value: '10:30:00', pos: 6, hora: 10, minun: 30 },
  { label: '11:15', value: '11:15:00', pos: 7, hora: 11, minun: 15 },
  { label: '12:00', value: '12:00:00', pos: 8, hora: 12, minun: 0 },
  { label: '12:45', value: '12:45:00', pos: 9, hora: 12, minun: 45 },
  { label: '13:30', value: '13:30:00', pos: 10, hora: 13, minun: 30 },
  { label: '14:15', value: '14:15:00', pos: 11, hora: 14, minun: 15 },
  { label: '15:00', value: '15:00:00', pos: 12, hora: 15, minun: 0 },
  { label: '15:45', value: '15:45:00', pos: 13, hora: 15, minun: 45 },
  { label: '16:30', value: '16:30:00', pos: 14, hora: 16, minun: 30 },
  { label: '17:15', value: '17:15:00', pos: 15, hora: 17, minun: 15 },
  { label: '18:00', value: '18:00:00', pos: 16, hora: 18, minun: 0 },
  { label: '18:45', value: '18:45:00', pos: 17, hora: 18, minun: 45 },
  { label: '19:30', value: '19:30:00', pos: 18, hora: 19, minun: 30 },
  { label: '20:15', value: '20:15:00', pos: 19, hora: 20, minun: 15 },
  { label: '21:00', value: '21:00:00', pos: 20, hora: 21, minun: 0 },
];
let horariosMostrar: any[] = [];

let hoy = new Date();
console.log(hoy);
let ultimoDia = new Date();
ultimoDia.setMonth(11);
ultimoDia.setDate(31);
let horaActual = hoy.getHours();
let minutoActual = hoy.getMinutes();
let diaActual = hoy.getDate();
let mesActual = hoy.getMonth() + 1;
if (horaActual > 20) {
  hoy = addDays(hoy, 1);
  diaActual = hoy.getDate();
  mesActual = hoy.getMonth() + 1;
}

const tiporeserva = [
  { label: 'Examen', value: 'Examen' },
  { label: 'Clases', value: 'Clases' },
  { label: 'Laboratorio', value: 'Laboratorio' },
];

let horariosFinales = [
  '06:45',
  '07:30',
  '08:15',
  '09:00',
  '09:45',
  '10:30',
  '11:15',
  '12:00',
  '12:45',
  '13:30',
  '14:15',
  '15:00',
  '15:45',
  '16:30',
  '17:15',
  '18:00',
  '18:45',
  '19:30',
  '20:15',
  '21:00',
  '21:45',
];

const endpoint = 'http://127.0.0.1:8000';
let listaDocentesMostrar: { label: any; value: any; id: any }[] = [];
let listaMateriasMostrar: { label: any; value: any }[] = [];
let listaGruposMostrar: { label: any; value: any }[] = [];
let docentesId: any[] = [];

const fechaHoy = () => {
  let fecha = hoy;
  let sM = '';
  let sD = '';
  if (fecha.getMonth() + 1 < 10) {
    sM = '0';
  }
  if (fecha.getDate() < 10) {
    sD = '0';
  }
  let formatted_date =
    fecha.getFullYear() +
    '-' +
    sM +
    (fecha.getMonth() + 1) +
    '-' +
    sD +
    fecha.getDate();

  return formatted_date;
};

let cantidadS = '';
let gruposS: any[] = [];
let docentesNombres: any[] = [];
let horarioS: any = '06:45:00';
let horariosx: any = 1;
let tipoS: String = 'Examen';
let prioridad: String = '';
let periodoS: Number = 1;
let fechaS: String = fechaHoy();

let materiaS: String = '';
let horarioL: any = '06:45';
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

  useEffect(() => {
    getDocentesRelacionados([id]);
    horaHoy();
  }, []);

  function horaHoy() {
    console.log('hola');
    let today: Date = esHoy;
    let dayToday = today.getDate();
    let monthToday = today.getMonth() + 1;
    horariosMostrar = [];
    if (dayToday === diaActual && monthToday === mesActual) {
      console.log('marciana');
      for (let { hora, minun, label, value, pos } of horarios) {
        if (horaActual === hora) {
          if (minutoActual < minun) {
            horariosMostrar.push({
              label: label,
              value: value,
              pos: pos,
              hora: hora,
              minun: minun,
            });
          }
        } else if (hora > horaActual) {
          horariosMostrar.push({
            label: label,
            value: value,
            pos: pos,
            hora: hora,
            minun: minun,
          });
        }
      }
    } else {
      console.log('rexd');
      horariosMostrar = horarios;
    }

    setSelectedHorario(horariosMostrar[0]);

    let { pos } = horariosMostrar[0];
    console.log("posicion"+pos)
    setHoraFin(horariosFinales[pos+1]);
  }

  const [selectedOptions, setSelectedDocentes] = useState([]);
  const [selectedMateria, setSelectedMateria] = useState<{
    label: any;
    value: any;
  }>();
  const [selectedGroups, setSelectedGroups] = useState<
    {
      label: any;
      value: any;
    }[]
  >();
  const [selectedHorario, setSelectedHorario] = useState<{
    label: any;
    value: any;
    pos: any;
  }>();
  const [selectedTipo, setSelectedTipo] = useState();
  const [selectedPeriodo, setSelectedPeriodo] = useState(1);
  const [selectedCantidad, setSelectedCantidad] = useState('');
  const [startDate, setStartDate] = useState(hoy);
  const [stateNombres, setStateNombres] = useState(true);
  const [stateMateria, setStateMateria] = useState(true);
  const [stateGrupo, setStateGrupo] = useState(true);
  const [stateMateriaCharge, setStateMateriaCharge] = useState(false);
  const [stateGrupoCharge, setStateGrupoGharge] = useState(false);
  const selectInputRef = useRef();
  const [maxOfNumber, setMaxOfNumber] = useState(6);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [horaFin, setHoraFin] = useState<String>();
  const [horaInicio, setHoraInicio] = useState<any>();

  const { user }: any = usePage().props;
  let { id, name, email } = user;

  const getGrupos = (materiaS: String, docentesId: any[]) => {
    axios
      .post(`${endpoint}/grupos`, { materia: materiaS, idDocentes: docentesId })
      .then(response => {
        listaGruposMostrar = [];
        for (let { codigo_grupo } of response.data) {
          listaGruposMostrar.push({ label: codigo_grupo, value: codigo_grupo });
        }
        setStateGrupo(false);
        setStateGrupoGharge(false);
        console.log(response.data);
      });
  };

  const getMaterias = (docentesId: any[]) => {
    listaMateriasMostrar = [];
    axios.post(`${endpoint}/materias`, { docentesId }).then(response => {
      for (let { nombre_materia } of response.data) {
        listaMateriasMostrar.push({
          label: nombre_materia,
          value: nombre_materia,
        });
      }
      setStateMateria(false);
      setStateMateriaCharge(false);
      console.log(response.data);
      console.log(listaMateriasMostrar);
    });
  };

  const getDocentesRelacionados = (Id: any[]) => {
    if (Id.length === 1) {
      axios.post(`${endpoint}/docentesid`, { Id }).then(response => {
        listaDocentesMostrar = [];
        for (let { id, name } of response.data) {
          listaDocentesMostrar.push({ label: name, value: name, id: id });
        }
        console.log(listaDocentesMostrar);
        setStateNombres(false);
        setStateMateria(true);
        setStateMateriaCharge(true);
        getMaterias(Id);
      });
    } else {
      axios.post(`${endpoint}/docentesid`, { Id }).then(response => {
        listaDocentesMostrar = [];
        for (let { id, name } of response.data) {
          listaDocentesMostrar.push({ label: name, value: name, id: id });
        }
        console.log(listaDocentesMostrar);
        setStateNombres(false);
      });
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  const handleChangeGrupos = (grupos: any) => {
    console.log(grupos);
    setSelectedGroups(grupos);
    gruposS = [];
    if (grupos != null) {
      for (let { value } of grupos) {
        gruposS.push(value);
      }
    }
  };

  const handleChangeDocentes = (docentes: []) => {
    setSelectedDocentes(docentes);
    docentesId = [];
    docentesNombres = [];
    if (docentes.length > 1) {
      for (let { id } of docentes) {
        docentesId.push(id);
      }
      for (let { value } of docentes) {
        docentesNombres.push(value);
      }
      setSelectedGroups([]);
      setSelectedMateria({ label: '', value: '' });
      setStateGrupo(true);
      setStateMateria(true);
      setStateMateriaCharge(true);
      getMaterias(docentesId);
    } else {
      setSelectedGroups([]);
      setSelectedMateria({ label: '', value: '' });
      setStateMateria(true);
      setStateNombres(true);
      setStateGrupo(true);
      getDocentesRelacionados([id]);
    }
  };

  const handleChangeMateria = (materia: any) => {
    console.log(selectedGroups + 'estado');
    setSelectedMateria(materia);
    let { label, value } = materia;
    materiaS = value;
    setSelectedGroups([]);
    setStateGrupo(true);

    if (docentesId.length > 1) {
      setStateGrupoGharge(true);
      getGrupos(materiaS, docentesId);
    } else {
      setStateGrupoGharge(true);
      getGrupos(materiaS, [id]);
    }
  };
  const handleChangeHorario = (horario: any) => {
    setSelectedHorario(horario);

    console.log(horario);
    let { label, value, pos } = horario;
    setMaxOfNumber(6);
    let numero = 21 - pos;
    if (numero < 6) {
      console.log(numero + 'entreaquis');
      setMaxOfNumber(numero);
    }
    horarioS = value;
    horariosx = pos;
    horarioL = label;
    setSelectedPeriodo(1);
    let noEncontrado = true;
    let i = 0;
    while (noEncontrado) {
      if (horariosFinales[i] === horarioL) {
        setHoraFin(horariosFinales[i + 1]);
        noEncontrado = false;
      }
      i += 1;
    }
    console.log(horarioS);
  };

  const handleChangeTipo = (tipo: any) => {
    setSelectedTipo(tipo);
    let { label, value } = tipo;
    tipoS = value;
    console.log(tipoS);
  };

  const handleChangePeriodo = (periodo: any) => {
    setSelectedPeriodo(periodo);
    periodoS = periodo;
    let noEncontrado = true;
    let i = 0;
    while (noEncontrado) {
      if (horariosFinales[i] === horarioL) {
        setHoraFin(horariosFinales[i + periodo]);
        noEncontrado = false;
      }
      i += 1;
    }
    console.log(periodoS);
  };

  const handleChangeCantidad = (cantidad: any) => {
    setSelectedCantidad(cantidad);
    cantidadS = cantidad;
    console.log(cantidadS);
  };
  const handleChangeCalendario = (fecha: any) => {
    let s = '';
    let sD = '';
    console.log(fecha.getDate());
    if (fecha.getMonth() + 1 < 10) {
      s = '0';
    }
    if (fecha.getDate() < 10) {
      sD = '0';
    }
    let formatted_date =
      fecha.getFullYear() +
      '-' +
      s +
      (fecha.getMonth() + 1) +
      '-' +
      sD +
      fecha.getDate();
    setStartDate(fecha);
    esHoy = fecha;
    horaHoy();
    fechaS = formatted_date;

    console.log(fechaS);
  };

  const solicitud = {
    id_usuario: id,
    materia_solicitud: materiaS,
    nombres_docentes_solicitud: docentesNombres,
    grupos_solicitud: gruposS,
    hora_requerida_solicitud: horarioS,
    motivo_reserva_solicitud: tipoS,
    periodos_solicitud: periodoS,
    cantidad_estudiantes_solicitud: parseInt(selectedCantidad),
    fecha_requerida_solicitud: fechaS,
  };

  const sendSoli = async () => {
    await axios
      .post(`${endpoint}/api/solicitudes/crear`, solicitud)
      .then(response => {
        closeModal();
        console.log(response.data);
      });
  };

  const validarDatos = () => {
    console.log(gruposS.length + 'tamaño xd');
    if (materiaS === '') {
      alert('El campo de materias no puede estar vacio');
    } else if (gruposS.length === 0) {
      alert('El campo de grupos no puede estar vacio');
    } else if (selectedCantidad === '') {
      alert('El campo de cantidad de estudiantes no puede estar vacio');
    } else {
      openModal();
    }
    //intentar cambiar a mensajes
    //horas posteriores en el mismo dia
  };

  const MultiValueRemove = (props: any) => {
    if (props.data.isFixed) {
      return null;
    }
    return <components.MultiValueRemove {...props} />;
  };

  return (
    <>
      <AppLayout title="Informacion">
        <div>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg" />
          </div>
        </div>

        <SolicitarCard>
          <h1 className="text-center">Solicitar aula</h1>

          <div className="flex flex-col space-y-4 content-center">
            <div>
              <p className="text-left">Nombre(s) Docente(s)</p>
              <Select
                options={listaDocentesMostrar}
                defaultValue={{
                  label: name,
                  value: name,
                  id: id,
                  isFixed: true,
                }}
                backspaceRemovesValue={false}
                isLoading={stateNombres}
                isDisabled={stateNombres}
                isClearable={false}
                isMulti
                selectOption
                components={{ MultiValueRemove }}
                onChange={handleChangeDocentes}
                noOptionsMessage={() => 'No hay opciones disponibles'}
                placeholder="Selecciona o Busca Docentes"
              />
            </div>
            <div>
              <p className="text-left">Materias</p>
              <Select
                options={listaMateriasMostrar}
                isDisabled={stateMateria}
                isSearchable={false}
                value={selectedMateria || ''}
                isLoading={stateMateriaCharge}
                isClearable={false}
                onChange={handleChangeMateria}
                noOptionsMessage={() => 'No hay opciones disponibles'}
                placeholder="Materia"
              />
            </div>
            <div>
              <p className="text-left">Grupo(s)</p>
              <Select
                ref={selectInputRef}
                options={listaGruposMostrar}
                isSearchable={false}
                value={selectedGroups}
                isDisabled={stateGrupo}
                isLoading={stateGrupoCharge}
                backspaceRemovesValue={false}
                isMulti
                onChange={handleChangeGrupos}
                noOptionsMessage={() => 'No hay opciones disponibles'}
                placeholder="Grupo"
              />
            </div>
            <div className="grid grid-flow-col auto-cols-max">
              <div className="mr-4">
                <p>Fecha Inicio</p>

                <DatePicker
                  locale="es"
                  selected={startDate}
                  includeDateIntervals={[
                    { start: addDays(hoy, -1), end: ultimoDia },
                  ]}
                  onChange={handleChangeCalendario}
                  disabledKeyboardNavigation
                  customInput={
                    <button className="btn colorPrimary text-white">
                      {fechaS}
                    </button>
                  }
                />
              </div>
              <div className="mr-4">
                <p>Hora de inicio</p>
                <Select
                  options={horariosMostrar}
                  isSearchable={false}
                  value={selectedHorario}
                  noOptionsMessage={() => 'No hay opciones disponibles'}
                  onChange={handleChangeHorario}
                />
              </div>
              <div className="mr-4">
                <p>Periodos</p>
                <NumberPicker
                  value={selectedPeriodo}
                  defaultValue={1}
                  min={1}
                  max={maxOfNumber}
                  onChange={handleChangePeriodo}
                  onKeyDown={event => {
                    event.preventDefault();
                  }}
                />
              </div>
              <div className="items-center flex flex-column ">
                <p>Hora fin</p>
                <p className="text-sky-400 font-bold">{horaFin}</p>
              </div>
            </div>
            <div className="grid grid-flow-col auto-cols-max">
              <div className="mr-14">
                <p>Tipo de Reserva</p>
                <Select
                  options={tiporeserva}
                  placeholder="Reserva"
                  isSearchable={false}
                  defaultValue={{ label: 'Examen', value: 'Examen' }}
                  noOptionsMessage={() => 'No hay opciones disponibles'}
                  onChange={handleChangeTipo}
                />
              </div>
              <div>
                <p>Cantidad de estudiantes</p>
                <input
                  className="label-cant cantidadEstudiantes"
                  type="text"
                  onKeyPress={event => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  onChange={event => handleChangeCantidad(event.target.value)}
                />
              </div>
            </div>
            <button
              type="button"
              className="btn colorPrimary text-white"
              onClick={validarDatos}
            >
              Solicitar
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
                ¿Está seguro de solicitar un aula con esos datos?
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
                    onClick={sendSoli}
                    className="btn colorPrimary text-white"
                  >
                    Aceptar
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        </SolicitarCard>
      </AppLayout>
    </>
  );
}
