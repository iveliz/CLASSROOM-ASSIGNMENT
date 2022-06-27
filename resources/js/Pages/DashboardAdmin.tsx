import * as React from 'react';
import Welcome from '@/Jetstream/Welcome';
import AppLayout from '@/Layouts/AppLayoutAdmin';
import Sidebar from '@/Jetstream/SidebarAdmin';
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
            <div className="preguntas-frecuentes-contenedor serif relative ">
               <div className=" preguntas min-h-max">
                 <h5 className="text-left my-8">En esta sección encontrará información para usar el sistema apropiadamente. </h5>
               </div>

                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <h5>¿Qué es la sección de solicitudes de registro?</h5>
                      </AccordionSummary>
                      <AccordionDetails>
                        <h6>
                          La sección de <b>solicitudes de registro</b> es un espacio de trabajo donde nos llegarán las solicitudes de registro de los docentes
                          para tener usuario, en cual verificaremos los datos de los docentes en dicha solicitud.
                        </h6>
                      </AccordionDetails>
                    </Accordion>
                    <div> </div>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                      <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <h5>¿Qué es la sección de solicitudes de aula?</h5>
                      </AccordionSummary>
                      <AccordionDetails>
                        <h6>
                          La sección de <b>solicitudes de aula</b> es un espacio de trabajo donde nos llegarán las solicitudes de aula requeridos por los docentes
                          , en cual verificaremos los datos de la solitud.
                        </h6>
                      </AccordionDetails>
                    </Accordion>

            </div>

            <div className="relative inset-x-0 bottom-0 h-16 my-8">
              <h5 className="text-center my-8">¿Tienes alguna duda? Contactanos!
              <a className= "text-center ml-2" href="mailto:neolancersrl@gmail.com ?
              subject=Quiero más información con respecto a los servicios que ofrecen.&body=Hola equipo Neolancer! te contacto desde su website, quisiera más información de sus servicios."> neolancersrl@gmail.com </a></h5>
            </div>

     </div>

  </AppLayout>
  );
}
