import React from 'react';
import Welcome from '@/Jetstream/Welcome';
import AppLayout from '@/Layouts/AppLayoutTeacher';

export default function (props:{materiasIdDocente:any;}) {
  return (
    <AppLayout
      title="Informacion"
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
           <h1>Solicitudes</h1>
           {console.log(props.materiasIdDocente)}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
