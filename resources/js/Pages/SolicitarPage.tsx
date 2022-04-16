import React from 'react';
import Welcome from '@/Jetstream/Welcome';
import AppLayout from '@/Layouts/AppLayoutTeacher';
import SolicitarCard from '@/Jetstream/SolicitarCard';
import Select from 'react-select';
import Calendar from '@/Jetstream/Calendar';
import JetButton from '@/Jetstream/Button';
import { NumberPicker } from 'react-widgets/cjs';
import 'react-widgets/styles.css';
import { useState } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { useForm } from 'react-hook-form';
import { forEach, forIn } from 'lodash';
import { Inertia } from '@inertiajs/inertia';

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

export default function () {
  const [selectedOptions, setSelectedDocentes] = useState([]);
  const [selectedMateria, setSelectedMateria] = useState();
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedHorario, setSelectedHorario] = useState();
  const [selectedTipo, setSelectedTipo] = useState();
  const [selectedPeriodo, setSelectedPeriodo] = useState();
  const [selectedCantidad, setSelectedCantidad] = useState();

  let Tipo: String;
  let Periodo : Number;
  let Cantidad: Number;
  const handleChangeGrupos = (grupos: []) => {
    setSelectedGroups(grupos);
    console.log(grupos);
  };

  const handleChangeDocentes = (docentes: []) => {
    setSelectedDocentes(docentes);
    console.log(docentes);
  };
  const handleChangeMateria = (materia: any) => {
    setSelectedMateria(materia);
    console.log(materia);
  };
  const handleChangeHorario = (horario: any) => {
    setSelectedHorario(horario);

    console.log(horario);
  };

  const handleChangeTipo = (tipo: any) => {
    setSelectedTipo(tipo);
    Tipo = tipo;
    console.log(tipo);
  };
  
  const handleChangePeriodo = (periodo: any) => {
    setSelectedPeriodo(periodo);
    Periodo = periodo;
    console.log(periodo);
  };
  const handleChangeCantidad = (cantidad: any) => {
    setSelectedPeriodo(cantidad);
    Cantidad = cantidad;
    console.log(cantidad);
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
          <h1 className="text-center">Solicitar Aula</h1>

          <div className="flex flex-col space-y-4 content-center">
            <div>
              <p className="text-left">Nombre(s) Docente(s)</p>
              <InertiaLink href="">
                <Select
                  options={docentes}
                  isMulti
                  selectOption
                  onChange={handleChangeDocentes}
                  noOptionsMessage={() => 'No hay opciones disponibles'}
                  placeholder="Selecciona o Busca Docentes"
                />
              </InertiaLink>
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
                <Calendar />
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
                onChange={handleChangePeriodo}
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
                <input className="label-cant" type="text" onChange={handleChangeCantidad}/>
              </div>
            </div>

            <button type="submit" className="btn text-white colorPrimary ">
              Solicitar
            </button>
          </div>
        </SolicitarCard>
      </AppLayout>
    </>
  );
}
