import React, { useState } from 'react';
import Check from '../Icons/Check';
import Xsquare from '../Icons/X-square';
import Watch from '../Icons/Watch';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import route from 'ziggy-js';
import '../../css/app.css';
import { Inertia } from '@inertiajs/inertia';
export default function () {
  let ruta = window.location.pathname;
  ruta = ruta.replace('/solicitudes/', '');
  console.log(ruta);
  return (
    <>
      <Navigation
        // you can use your own router's api to get pathname
        activeItemId={ruta}
        onSelect={({ itemId }) => {
          if (itemId != ruta &&itemId!="") {
            Inertia.visit(itemId);
          }
        }}
        items={[
          {
            title: 'Pendientes',
            itemId: 'pendientes',
            elemBefore: () => <Watch></Watch>,
            // you can use your own custom Icon component as well
            // icon is optional
          },
          {
            title: 'Aceptadas',
            itemId: '',
            elemBefore: () => <Check></Check>,
            subNav: [
              {
               title:"Aceptadas Vigentes",
               itemId:"aceptadas",
               elemBefore: () => <p className='text-white'>o</p>,
              },
              {
                title: 'Aceptadas Vencidas',
                itemId: 'aceptadas-vencidas',
                 elemBefore: () => <p className='text-white'>o</p>,
                // Requires v1.9.1+ (https://github.com/abhijithvijayan/react-minimal-side-navigation/issues/13)
              },
            ],
          },
          {
            title: 'Rechazadas',
            itemId: 'rechazadas',
            elemBefore: () => <Xsquare></Xsquare>,
          },
        ]}
      />
    </>
  );
}
