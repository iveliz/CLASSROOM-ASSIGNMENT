import React from 'react';
import Welcome from '@/Jetstream/Welcome';
import AppLayout from '@/Layouts/AppLayoutTeacher';
import SolicitarCard from '@/Jetstream/SolicitarCard';
import Select from 'react-select';
import Calendar from '@/Jetstream/Calendar';

const grupo = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
]



const materias= [
  { label: 'Introduccion a la Programación', value: 'Introduccion a la Programación' },
  { label: 'Elementos de la Programación', value: 'Elementos de la Programación' },
  { label: 'Programacion web', value: 'Programacion web' },
]


const docentes = [
  { label: 'Leticia Blanco', value: 'Leticia Blanco' },
  { label: 'Vladimir Costa', value:'Vladimir Costa' },
  { label: 'Rosemary Torrico', value: 'Rosemary Torrico' },
  { label: 'Boris Calancha', value: 'Boris Calancha' },
  { label: 'Marcelo Flores', value: 'Marcelo Flores'},
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
  return (
    <>
      <AppLayout title="Informacion">

        <div>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg"></div>
          </div>
        </div>
        <SolicitarCard>
          <h1 className="text-center">Solicitar Aula</h1>
          <div className='flex flex-col space-y-4'>
          <div>
            <p className="text-left">Nombre(s) Docente(s)</p>
            <Select
              options={docentes}
              isMulti
              noOptionsMessage={() => 'No hay opciones disponibles'}
              placeholder="Selecciona o Busca Docentes"
            ></Select>
          </div>
          <div>
            <p className="text-left">Materias</p>
            <Select
              options={materias}
              noOptionsMessage={() => 'No hay opciones disponibles'}
              placeholder="Materia"
            ></Select>
          </div>
          <div>
            <p className="text-left">Grupo(s)</p>
            <Select
              options={grupo}
              isSearchable={false}
              isMulti
              noOptionsMessage={() => 'No hay opciones disponibles'}
              placeholder="Grupo"
            ></Select>
          </div>
          <div className="grid grid-flow-col auto-cols-max">
            <div className='mr-3'>
              <p>Fecha Inicio</p>
              <Calendar></Calendar>
            </div>
            <div>
              <p>Hora de inicio</p>
              <Select
                options={horarios}
                placeholder="06:45"
                isSearchable={false}
                noOptionsMessage={() => 'No hay opciones disponibles'}
                onChange={(opt: { label: any; value: any }) =>
                  console.log(opt.label, opt.value)
                }
              ></Select>
            </div>
          </div>
          </div>
         
        </SolicitarCard>
      </AppLayout>
    </>
  );
}
