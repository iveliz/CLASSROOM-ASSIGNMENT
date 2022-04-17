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
            <section className="preguntas-frecuentes clearfix">	
		          <div className="preguntas-frecuentes-contenedor serif"> 
		  
              {/*<div className="preguntas-frecuentes-encabezado-linea-roja"></div> 
	        	  	<h6 className="texto-h3">Preguntas frecuentes</h6>   ₍˄·͈༝·͈˄*₎◞ ̑̑*/}
      
               <div className=" preguntas sm:px-6 lg:px-8 "> 
               <h5 className="text-left my-8">En esta sección encontrará información para poder usar el sistema apropiadamente. </h5>
                 <input className="accordion-item-input" type="checkbox" name="accordion" id="item1" />
                 <label htmlFor='item1' className="accordion-item-hd">¿Cómo restablezco mi contraseña?<span className="accordion-item-hd-cta">&#9650;</span> </label>
                 <div className="accordion-item-bd respuesta">
                 <p>
                    Para restablecer la contraseña de su cuenta, vaya a su nombre de usuario de la cuenta en el menú desplegable después a cambiar contraseña. 
                    y a continuación, haga clic en cambiar contraseña.
                    Una vez estando en el formulario, siga estos pasos:
                    <li>En la entrada de Ingrese contraseña antigua, haga clic en el cuadro e introduzca su contraseña antigua.</li>
                    <li>En la entrada de Ingrese contraseña nueva, haga clic en el cuadro e introduzca su contraseña nueva.</li>
                    <li>En el siguiente paso deberá repetir la contraseña nueva para confirmar, en la entrada de Repita la contraseña nueva.</li>
                    <li> Haga clic en Confirmar.</li>
                  </p></div>
        
                <input className="accordion-item-input" type="checkbox" name="accordion" id="item2" />
                <label htmlFor='item2' className="accordion-item-hd">¿Cómo puedo cancelar una reserva?<span className="accordion-item-hd-cta">&#9650;</span></label>
                <div className="accordion-item-bd respuesta">
                  <p>
                  Vaya a Solicitudes después a pendientes y diríjase en la solicitud que quiere cancelar la reserva, 
                  luego haga clic en el botón Ver detalles y a continuación se mostrará la información correspondiente a la solicitud y diríjase al botón “cancelar reserva”.
                  </p></div>
        
                <input className="accordion-item-input" type="checkbox" name="accordion" id="item3" />
                <label htmlFor='item3' className="accordion-item-hd">¿Cómo puedo cancelar una solicitud?<span className="accordion-item-hd-cta">&#9650;</span></label>
                <div className="accordion-item-bd respuesta">
                  <p>
                  Vaya a Solicitudes después a Aceptados y diríjase en la solicitud que quiere cancelar la reserva, 
                  luego haga clic en el botón Ver detalles y a continuación se mostrará la información correspondiente a la solicitud y diríjase al botón “cancelar solicitud”.
                </p></div>

                <input className="accordion-item-input" type="checkbox" name="accordion" id="item4" />
                <label htmlFor='item4' className="accordion-item-hd">¿Cómo puedo saber el estado de mi solicitud?<span className="accordion-item-hd-cta">&#9650;</span></label>
                <div className="accordion-item-bd respuesta">
                 <p>
                 <li>Vaya a Solicitudes y dependiendo el caso de la solicitud puede navegar en los siguientes apartados: Pendientes, Aceptados y Rechazados; 
                   luego haga clic en el botón Ver detalles y a continuación se mostrará la información correspondiente a la solicitud</li>
                 <li>Diríjase al icono de la campana haga clic en el icono y se mostrarán sus solicitudes más recientes. </li>
                 </p></div>

                <input className="accordion-item-input" type="checkbox" name="accordion" id="item5" />
                <label htmlFor='item5' className="accordion-item-hd">¿Cómo puedo solicitar una aula?<span className="accordion-item-hd-cta">&#9650;</span></label>
                  <div className="accordion-item-bd respuesta">
                    <p>
                    Vaya al apartado de Solicitar a continuación se mostrará el formulario a llenar y siga los siguientes pasos:
                    <li>Seleccione su nombre en el menú desplegable Nombre(s) docente(s)
                       o también puede buscar en el mismo menú. dependiendo del caso de solicitud puede seleccionar a otros docentes relacionados.</li>
                    <li>Si hay una equivocación podrá eliminar dirigiéndose al icono X en las etiquetas generadas de Nombre(s) docente(s)</li>
                    <li>Seleccione el nombre de la materia que corresponda a su solicitud en el menú desplegable Materia , 
                      si en el caso que añadiste a otro docente relacionado, también se mostrarán materias relacionadas.</li>
                    <li>Si hay una equivocación podrá eliminar dirigiéndose al icono X en las etiquetas generadas de Materia</li>
                    <li>Seleccione el/los grupos correspondientes en el menú desplegable Grupo(s)</li>
                    <li>Si hay una equivocación podrá eliminar dirigiéndose al icono X en las etiquetas generadas de Grupo(s)</li>
                    <li>Seleccione la fecha a solicitar el aula, podrá seleccionar dirigiéndose al icono de calendario </li>
                    <li>Seleccione la hora que corresponda a su solicitud en el menú desplegable de Hora</li>
                    <li>Seleccione los períodos que corresponda a su solicitud</li>
                    <li>Seleccione el tipo de reserva que desea para su solicitud en el campo Tipo de solicitud, haga clic en el menú desplegable y seleccione el tipo.</li>
                    <li>Ingrese en el campo Cantidad de estudiantes, debe tener en cuenta que no es válido dejar la cantidad con cantidad 0.</li>
                    <li>Haga clic en Solicitar</li>
                   </p></div>

                </div>    {/*div de preguntas frecuentes contenedor serif*/} 
                </div>
            </section>   
        </div>  {/*div py 12*/} 
    </AppLayout>
  );
}
