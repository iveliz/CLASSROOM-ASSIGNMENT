import React from 'react';
import Check from '../Icons/Check'
import Xsquare from '../Icons/X-square'
import Watch from '../Icons/Watch'
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import route from 'ziggy-js';
import '../../css/app.css'
export default function () {
    return (
      <>
        <Navigation
            // you can use your own router's api to get pathname
            activeItemId="/management/members"
            onSelect={({itemId}) => {
              // maybe push to the route
            }}
            items={[
              {
                title: 'Pendientes',
                itemId: 'dashboard',
                 elemBefore: () => <Watch></Watch>,
                // you can use your own custom Icon component as well
                // icon is optional
                
              },
              {
                title: 'Aceptados',
                itemId: 'aceptados',
                elemBefore: () => <Check></Check>,
                
              },
              {
                title: 'Rechazados',
                itemId: 'another',
                elemBefore: () => <Xsquare></Xsquare>,
              },
            ]}
          />
      </>
    );
}