import React from 'react';
import Welcome from '@/Jetstream/Welcome';
import AppLayout from '@/Layouts/AppLayoutTeacher';
import SolicitarCard from '@/Jetstream/SolicitarCard';
import Select from 'react-select';
import { NumberPicker } from 'react-widgets/cjs';
import 'react-widgets/styles.css';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { addDays, subDays } from 'date-fns';
import { Inertia } from '@inertiajs/inertia';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { values } from 'lodash';

registerLocale('es', es);

var hoy = new Date();
var day1 = new Date('01/07/1970');
var difference = Math.abs(hoy.getTime() - day1.getTime());
var days = difference / (1000 * 3600 * 24);

const grupo = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
];

const tiporeserva = [
  { label: 'Examen', value: 'Examen' },
  { label: 'Clases', value: 'Clases' },
  { label: 'Laboratorio', value: 'Laboratorio' },
];

const materias = [
  {
    label: 'Introduccion a la Programación',
    value: 'Introduccion a la Programación',
  },
  {
    label: 'Elementos de la Programación',
    value: 'Elementos de la Programación',
  },
  { label: 'Programacion web', value: 'Programacion web' },
];

const docentes = [
  { label: 'Leticia Blanco', value: 'Leticia Blanco', id: 2 },
  { label: 'Vladimir Costa', value: 'Vladimir Costa', id: 3 },
  { label: 'Rosemary Torrico', value: 'Rosemary Torrico', id: 5 },
  { label: 'Corina ', value: 'Corina ', id: 4 },
  { label: 'Patricia', value: 'Patricia', id: 6 },
];
const horarios = [
  { label: '06:45', value: '06:45' },
  { label: '08:15', value: '08:15' },
  { label: '11:15', value: '11:15' },
  { label: '12:45', value: '12:45' },
  { label: '14:15', value: '14:15' },
  { label: '15:45', value: '15:45' },
  { label: '17:15', value: '17:15' },
  { label: '18:45', value: '18:45' },
  { label: '20:15', value: '20:15' },
];

export default function (props:{docentes: any,docentes2:any}) {
  const [selectedOptions, setSelectedDocentes] = useState([]);
  const [selectedMateria, setSelectedMateria] = useState();
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedHorario, setSelectedHorario] = useState();
  const [selectedTipo, setSelectedTipo] = useState();
  const [selectedPeriodo, setSelectedPeriodo] = useState();
  const [selectedCantidad, setSelectedCantidad] = useState();
  const [startDate, setStartDate] = useState(hoy);
  let recibirDocentes=[];

  for(let {id,name}of props.docentes){
     recibirDocentes.push({label :name,value:name,id:id});
  }


  let cantidadS: Number = 0;
  let gruposS: [] = [];
  let docentesId: any[] = [];
  let docentesNombres: [] = [];
  let horarioS: any = '';
  let tipoS: String = '';
  let prioridad: String = '';
  let periodoS: Number = 1;
  let fechaS: String = '';
  let materiaS: String = '';

  const handleChangeGrupos = (grupos: []) => {
    setSelectedGroups(grupos);
    for (let { value } of grupos) {
      gruposS.push(value);
    }
    console.log(gruposS);
  };

  const handleChangeDocentes = (docentes: []) => {
    setSelectedDocentes(docentes);
    let idS=["hola xdxdxdxdxdxd"];
    let prueba=["asdjasuifnsrfiluhsd ngsdrhuig"]
    docentesId = [];
    docentesNombres = [];
    if (docentes != null) {
      if (docentes.length > 1) {
        for (let { id } of docentes) {
          docentesId.push(id);
        }
        for (let { value } of docentes) {
          docentesNombres.push(value);
        }
      } else {
        for (let { id } of docentes) {
             idS=id
             console.log("entro aquis")
        }
        Inertia.get('solicitar/{prueba}', {
          idS
        },{
            preserveState: true,
            onSuccess:()=>{
              recibirDocentes=[];
              for(let {id,name}of props.docentes){
                recibirDocentes.push({label :name,value:name,id:id});
              }
               docentesId=[];
               for (let {id} of props.docentes) {
                docentesId.push(id);
               }
              
            }
           })

         
      }
    }

    console.log(docentesNombres);
    console.log(docentesId);
  };

  const handleChangeMateria = (materia: any) => {
    setSelectedMateria(materia);
    let { label, value } = materia;
    materiaS = value;
    console.log(materiaS);
  };
  const handleChangeHorario = (horario: any) => {
    setSelectedHorario(horario);
    let { label, value } = horario;
    horarioS = value + ':00';
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
    console.log(periodoS);
  };

  const handleChangeCantidad = (cantidad: any) => {
    setSelectedCantidad(cantidad);
    cantidadS = cantidad;
    console.log(cantidadS);
  };
  const handleChangeCalendario = (fecha: any) => {
    let s = '';
    if (fecha.getMonth() + 1 < 10) {
      s = '0';
    }
    if (fecha.getDate() < 10) {
      s = '0';
    }
    let formatted_date =
      fecha.getFullYear() +
      '-' +
      s +
      (fecha.getMonth() + 1) +
      '-' +
      s +
      fecha.getDate();
    setStartDate(fecha);
    fechaS = formatted_date;
    console.log(fechaS);
  };
  const solicitud = [
    {
      id: docentesNombres,
      Materia: materiaS,
      Grupos: [],
      Horario: horarioS,
      Tipo: tipoS,
      Periodo: periodoS,
      Cantidad: cantidadS,
      Fecha: fechaS,
    },
  ];

  return (
    <>
      <AppLayout title="Informacion">
        <div>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg" />
          </div>
        </div>
    {  console.log(props.docentes)}
        <SolicitarCard>
          <h1 className="text-center">Solicitar aula</h1>

          <div className="flex flex-col space-y-4 content-center">
            <div>
              <p className="text-left">Nombre(s) Docente(s)</p>
              <Select
                options={recibirDocentes}
                isMulti
                selectOption
                onChange={handleChangeDocentes}
                noOptionsMessage={() => 'No hay opciones disponibles'}
                placeholder="Selecciona o Busca Docentes"
              />
            </div>
            <div>
              <p className="text-left">Materias</p>
              <Select
                options={materias}
                onChange={handleChangeMateria}
                noOptionsMessage={() => 'No hay opciones disponibles'}
                placeholder="Materia"
              />
            </div>
            <div>
              <p className="text-left">Grupo(s)</p>
              <Select
                options={grupo}
                isSearchable={false}
                isMulti
                onChange={handleChangeGrupos}
                noOptionsMessage={() => 'No hay opciones disponibles'}
                placeholder="Grupo"
              />
            </div>
            <div className="grid grid-flow-col auto-cols-max">
              <div className="mr-8">
                <p>Fecha Inicio</p>

                <DatePicker
                  locale="es"
                  selected={startDate}
                  excludeDateIntervals={[
                    { start: subDays(new Date(), days), end: addDays(hoy, -1) },
                  ]}
                  onChange={handleChangeCalendario}
                />
              </div>
              <div className="mr-8">
                <p>Hora de inicio</p>
                <Select
                  options={horarios}
                  placeholder="06:45"
                  isSearchable={false}
                  noOptionsMessage={() => 'No hay opciones disponibles'}
                  onChange={handleChangeHorario}
                />
              </div>
              <div>
                <p>Periodos</p>
                <NumberPicker
                  defaultValue={1}
                  min={1}
                  max={3}
                  onChange={handleChangePeriodo}
                  onKeyPress={event => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              </div>
            </div>
            <div className="grid grid-flow-col auto-cols-max">
              <div className="mr-14">
                <p>Tipo de Reserva</p>
                <Select
                  options={tiporeserva}
                  placeholder="Reserva"
                  isSearchable={false}
                  noOptionsMessage={() => 'No hay opciones disponibles'}
                  onChange={handleChangeTipo}
                />
              </div>
              <div>
                <p>Cantidad de estudiantes</p>
                <input
                  className="label-cant"
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
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Solicitar
            </button>
          </div>
        </SolicitarCard>
      </AppLayout>
    </>
  );
}
