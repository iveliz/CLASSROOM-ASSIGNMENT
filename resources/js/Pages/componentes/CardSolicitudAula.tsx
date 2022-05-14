import React from 'react';
const endpoint = 'http://127.0.0.1:8000'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';


const style = {
  position: 'absolute' as 'absolute',
  inset: '50% auto auto 50%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400, 
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface SolicitudAula {
    id_solicitud: Number;
    id_usuario: Number;
    fecha_requerida_solicitud: String;
    name: String;
    prioridad: String;
    aulas:String[];
}

export default function (
  {
    id_solicitud,
    id_usuario,
    fecha_requerida_solicitud,
    name,
    prioridad
  }: SolicitudAula,
     
) {
  function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <React.Fragment>
        <Button onClick={handleOpen}>Seleccionar aula(s)</Button>
        <Modal
          hideBackdrop
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 407}}> 
            {/*  <div className='text-center colorPrimary text-white'> */}
              <h2 id="child-modal-title" >Asignar aulas</h2>
            {/*</div> */}
         
          <p id="child-modal-description">
              aulas
          </p>
            {/* 
            <Button onClick={handleClose}>Seleccionar</Button>
            <Button onClick={handleClose}>Atrás</Button>
            */}
         </Box> 
        </Modal>
      </React.Fragment>
    );
  }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-25%',
      transform: 'translate(-50%, -50%)',
      padding: 0,
    },
  };
  const customStyles2 = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  return (
    <div>
      <div className="card mt-3 mr-8">
        <div {...(prioridad ? {"className":"card-body bg-red-200"}:{"className":"card-body"})}>
          <div className="hstack gap-3 items-end ">
            <div className="mr-3">{prioridad?'(*) ':''}Número de solicitud de registro: {id_solicitud+"-"+id_usuario}</div>
            <div className="mr-4">Fecha: {fecha_requerida_solicitud}</div>
            <div>Nombre Docente: {name}</div>
          </div>

          <div className="position-absolute top-50 end-0 translate-middle-y mr-4">
     <div>
      <Button onClick={handleOpen}>Responder</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Text in a modal</h2>
          <p id="parent-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
          <ChildModal />
        </Box>
      </Modal>
    </div>
          </div>
        </div>
      </div>
    </div>
  );
}
