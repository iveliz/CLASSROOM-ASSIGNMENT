import React from 'react';
import Check from '../Icons/Check'
import Xsquare from '../Icons/X-square'
import List from '../Icons/List'
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import route from 'ziggy-js';
import '../../css/app.css'
import { Inertia } from '@inertiajs/inertia';
export default function () {
    return (
      <>
        <Navigation
            // you can use your own router's api to get pathname
            activeItemId="/management/members"
            onSelect={({itemId}) => {
             Inertia.visit(itemId);
            }}
            items={[
            /*   {
                title: 'Aulas',
                itemId: 'aulas',
                 elemBefore: () => <List></List>,
                // you can use your own custom Icon component as well
                // icon is optional
                
              },*/
            {
                title: 'Registros',
                itemId: 'registros',
                elemBefore: () => <Check></Check>,
              
                
              }, 
            ]}
          />
      </>
    );
}