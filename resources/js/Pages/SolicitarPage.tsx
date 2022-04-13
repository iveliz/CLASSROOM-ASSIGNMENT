import React from 'react';
import Welcome from '@/Jetstream/Welcome';
import AppLayout from '@/Layouts/AppLayoutTeacher';
import SolicitarCard from '@/Jetstream/SolicitarCard';
import Select from 'react-select';
import * as horarios from '../Const/horarios'
import * as docentes from '../Const/docentesPrueba';
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
          <div>
             <p className="text-left">Nombre(s) Docente(s)</p>
             <Select options={docentes}
             isMulti
             placeholder="Selecciona o Busca Docentes"
             ></Select>
          </div>
          <p>Hora de inicio</p>
          <div>
          <Select options={horarios} 
          placeholder="06:45"
          onChange={(opt: { label: any; value: any; }) => console.log(opt.label, opt.value)}
          >
    
          </Select>
          </div>

        </SolicitarCard>
      </AppLayout>
    </>
  );
}
