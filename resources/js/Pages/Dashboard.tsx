import React from 'react';
import Welcome from '@/Jetstream/Welcome';
import AppLayout from '@/Layouts/AppLayoutTeacher';

export default function Dashboard() {
  return (
    <AppLayout
      title="Informacion"
    >
      <div className='centered'>
      <h1 className="text-center ...">Información</h1>
      <h3 className="text-left ...">En esta sección encontrará información para poder usar el sistema apropiadamente </h3>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          </div>
        </div>
      </div>
      </div>
    </AppLayout>
  );
}
