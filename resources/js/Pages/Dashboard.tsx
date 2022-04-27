import * as React from 'react';
import Welcome from '@/Jetstream/Welcome';
import AppLayout from '@/Layouts/AppLayoutTeacher';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.8rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function Dashboard() {
  const [expanded, setExpanded] = React.useState<string | false>('');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
     <AppLayout
      title="Información"
    >
      <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
               <h1 className="text-center "><b>Información</b></h1>
            </div>                         
            <div className="preguntas-frecuentes-contenedor serif "> 
               <div className=" preguntas min-h-max"> 
                 <h5 className="text-left my-8">En esta sección encontrará información para usar el sistema apropiadamente. </h5>
               </div>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <h5>¿Cómo puedo solicitar una aula?</h5>
                      </AccordionSummary>
                      <AccordionDetails>
                        <h6>
                            Vaya al apartado de <b>Solicitar</b> a continuación se mostrará el formulario a llenar y siga los siguientes pasos:
                        <li> Dependiendo del caso de solicitud puede seleccionar a otros docentes en el menú desplegable <b>Nombre(s) docente(s)</b>
                          o también puede buscar en el mismo menú.</li>
                        <li>Si hay una equivocación podrá eliminar dirigiéndose al icono X en las etiquetas generadas de Nombre(s) docente(s)</li>
                        <li>Seleccione el nombre de la materia que corresponda a su solicitud en el menú desplegable <b>Materia </b>, 
                          si en el caso que añadiste a otro docente relacionado, también se mostrarán materias relacionadas.</li>
                        <li>Si hay una equivocación podrá eliminar dirigiéndose al icono X en las etiquetas generadas de Materia</li>
                        <li>Seleccione el/los grupos correspondientes en el menú desplegable <b>Grupo(s)</b></li>
                        <li>Si hay una equivocación podrá eliminar dirigiéndose al icono X en las etiquetas generadas de Grupo(s)</li>
                        <li>Seleccione la fecha a solicitar el aula </li>
                        <li>Seleccione la hora que corresponda a su solicitud en el menú desplegable de <b>Hora</b></li>
                        <li>Seleccione los períodos que corresponda a su solicitud en el contador <b>Períodos</b>, puede guiarse con la hora fin para saber la hora exacta en que culmina la reserva</li>
                        <li>Seleccione el tipo de reserva que desea para su solicitud en el campo <b>Tipo de solicitud</b>, haga clic en el menú desplegable y seleccione el tipo.</li>
                        <li>Ingrese en el campo <b>Cantidad de estudiantes</b>, debe tener en cuenta que no es válido dejar la cantidad vacía.</li>
                        <li>Haga clic en <b>Solicitar</b></li>
                        </h6>
                      </AccordionDetails>
                    </Accordion>
                    <div> </div>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                      <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <h5>¿Cómo puedo cancelar una solicitud?</h5>
                      </AccordionSummary>
                      <AccordionDetails>
                        <h6>
                        Vaya a <b>Solicitudes</b> después a <b>Pendientes</b>, haga clic en el switch para cambiar al <code>modo cancelar solicitud</code> diríjase en la(s) solicitud(es)que quiere cancelar, 
                        luego haga clic en la caja y a continuación diríjase al botón “cancelar seleccionados”.
                        </h6>
                      </AccordionDetails>
                    </Accordion>
                    <div></div>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                      <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                        <h5>¿Cómo puedo cancelar una reserva?</h5>
                      </AccordionSummary>
                      <AccordionDetails>
                        <h6>
                        Vaya a <b>Solicitudes</b> después a <b>Aceptados</b>, haga clic en el switch para cambiar al <code>modo cancelar reserva</code> y diríjase en la(s) reserva(s)que quiere cancelar, 
                        luego haga clic en la caja y a continuación diríjase al botón “cancelar seleccionados”.
                        </h6>
                      </AccordionDetails>
                    </Accordion>
                    <div></div>
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                      <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                        <h5>¿Cómo puedo saber el estado de mi solicitud?</h5>
                      </AccordionSummary>
                      <AccordionDetails>
                        <h6>
                        Vaya a Solicitudes y dependiendo el caso de la solicitud puede navegar en los siguientes apartados: <b>Pendientes</b>, <b>Aceptados</b> y <b>Rechazados</b>; 
                        luego haga clic en el botón de detalles y a continuación se mostrará la información correspondiente a la solicitud
                        </h6>
                      </AccordionDetails>
                    </Accordion>
            </div>  
            <div className="  absolute inset-x-0 bottom-0 h-16 my-8">
              <h5 className="text-center my-8">¿Tienes alguna duda? Contactanos! 
              <a className= "text-center ml-2" href="mailto:neolancersrl@gmail.com ?
              subject=Quiero más información con respecto a los servicios que ofrecen.&body=Hola equipo Neolancer! te contacto desde su website, quisiera más información de sus servicios."> neolancersrl@gmail.com </a></h5> 
            </div>
     </div>
  </AppLayout>    
  );
}