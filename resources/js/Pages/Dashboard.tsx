import React from 'react';
import Welcome from '@/Jetstream/Welcome';
import AppLayout from '@/Layouts/AppLayoutTeacher';

export default function Dashboard() {
  return (
    <AppLayout
      title="Información"
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <h1 className="text-center ">Información</h1>
            </div>   
            <div className="max-w-7xl mx-auto m:px-6 my-8 ">                       
            <h5 className="text-left ">En esta sección encontrará información para poder usar el sistema apropiadamente. </h5>
            </div>
      </div>
    </AppLayout>
  );
}
