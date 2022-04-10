import React from 'react';
import Welcome from '@/Jetstream/Welcome';
import AppLayout from '@/Layouts/AppLayoutTeacher';
import SolicitarCard from '@/Jetstream/SolicitarCard';
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
          <h1 className='text-center'>Solicitar Aula</h1>

        </SolicitarCard>
      </AppLayout>

      
    </>
  );
}
