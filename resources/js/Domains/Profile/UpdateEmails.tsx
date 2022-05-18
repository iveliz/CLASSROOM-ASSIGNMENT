import { Inertia } from '@inertiajs/inertia';
import { useForm, usePage } from '@inertiajs/inertia-react';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import JetActionMessage from '@/Jetstream/ActionMessage';
import JetButton from '@/Jetstream/Button';
import JetFormSection from '@/Jetstream/FormSection';
import JetInput from '@/Jetstream/Input';
import JetInputError from '@/Jetstream/InputError';
import JetLabel from '@/Jetstream/Label';
import axios from 'axios';
import { useEffect } from "react";
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import JetSecondaryButton from '@/Jetstream/SecondaryButton';
import Modal from 'react-modal';
import { User } from '@/types';

const endpoint = 'http://127.0.0.1:8000'

interface Props {
  user: User;
}

export default function UpdateEmails({ user }: Props) {
  const form = useForm({
    _method: 'PUT',
    name: user.name,
    email: user.email,
    photo: null as File | null,
  });

  const [correos,setCorreos] = useState<any>();
  const [principal,setPrincipal] = useState<any>();
  const [secundario,setSecundario] = useState<any>();
  const [erroPrincipal,setErrorPrincipal] = useState('');
  const [erroSecundario,setErrorSecundario] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [mensajeModal,setMensajeModal] = useState('');
  const [confimacion, setConfirmacion] = useState(false)


  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
 
  const getCorreos=  async()=>{
    await axios.post(`${endpoint}/correoElectronico/mostrar`,{id_usuario: user.id}).then((response)=>{
      setPrincipal(response.data[0].email_principal!=null?response.data[0].email_principal:'');
      setSecundario(response.data[0].email_secundario!=null?response.data[0].email_secundario:'');
      setCorreos({
        email_principal: response.data[0].email_principal!=null?response.data[0].email_principal:'',
        email_secundario: response.data[0].email_secundario!=null?response.data[0].email_secundario:''
      })
      console.log(response.data[0])
    })
  }

  useEffect(()=>{
    getCorreos()
   },[])

  const reportarError = (correo:any,numero:any) => {
    let res = '';
    if(correo!=undefined){
      if(correo.length==0 && numero==1){
        res += 'El correo principal es obligatorio. '
      }
      if(correo.length>0&&correo.search('@')==-1){
        res += 'El correo debe tener un @ para ser valido. '
      }
       if(correo.length>=30){
        res += 'Un correo no puede tener mas de 30 caracteres. '
      }
      if(correo.length>0 && correo==principal && numero==2){
        res += 'El correo secundario no puede ser igual al principal'
      }
      
      
    }
    return res;
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const updateEmails=()=>{
    axios
      .post(`${endpoint}/correoElectronico/actualizar`, {
        email_principal: principal,
        email_secundario: secundario,
        id_usuario: user.id
      })
      .then(response => {
        console.log(response.data);
        setConfirmacion(false)
      });
      setCorreos({
        email_principal: principal,
        email_secundario: secundario
      })
      closeModal();
      setConfirmacion(true)
      //setConfirmacion(false)
  };

  return (
    <JetFormSection
      onSubmit={()=>{}}
      title={`Correos de ${form.data.name}`}
      description={`El correo primario se utiliza para recuperar la contraseña, en caso de perder acceso a su correo primario se recomienda utilizar un correo secundario.`}
      renderActions={() => (
        <>
          <JetActionMessage on={confimacion} className="mr-3">
            Los cambios se guardaron exitosamente.
          </JetActionMessage>

          <button
            className='inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white btn colorPrimary text-base tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition'
            
            {...(principal == undefined? {'disabled':true} : {})}
            onClick={()=>{
              if(erroPrincipal==''&&erroSecundario==''){
                if(principal==correos.email_principal&&secundario==correos.email_secundario){
                  alert('No se realizo ningun cambio, no hay una actualizacion valida')
                }else{
                  if(principal!=correos.email_principal && secundario!=correos.email_secundario){
                    setMensajeModal('Esta seguro de confimar los cambios')
                  }else{
                    if(principal!=correos.email_principal){
                      setMensajeModal('Esta seguro de editar el email principal')
                    }else if(secundario!=correos.email_secundario){
                      setMensajeModal('Esta seguro de editar el email secundario')
                    }
                  }
                  openModal();
                }
              }else {
                alert('No se puede confirmar hay cambios no válidos')
              }
            }}
            
          >
            Confirmar
          </button>
        </>
      )}
    >

      {/* <!-- Email primario--> */}
      <div className="col-span-6 sm:col-span-4">
        <JetLabel htmlFor="email" value="Correo electrónico primario" />
        <JetInput
          id="email-p"
          type="text"
          className="mt-1 block w-full rounded-b-none"
          value={principal ?principal:''}
          onChange={(e) => {
            setPrincipal(e.currentTarget.value.replace(' ','').replace(/[*+\-?^${}()|[\]\\/#|¿%&]/g,''))
            setErrorPrincipal(reportarError(e.currentTarget.value,1))
            if(e.currentTarget.value==secundario && e.currentTarget.value.length>0 && secundario.length>0){
              setErrorSecundario('El correo secundario no puede ser igual al principal')
            }else{
              if(e.currentTarget.value.length!=secundario.length && secundario.length>0 && e.currentTarget.value.length>0){

                setErrorSecundario('')
              }
            }
          }}
        />
        {principal == undefined ?<LinearProgress className='absolute' />:''}
        <p className="absolute text-sm text-red-600 mt-2 mb-0">{erroPrincipal}</p>
      </div>
      {/* <!-- Email secundario --> */}
      <div className="col-span-6 sm:col-span-4 mt-2">
        <JetLabel htmlFor="email" value="Correo electrónico secundario" />
        <JetInput
          id="email"
          type="text"
          className="mt-1 block w-full rounded-b-none"
          value={secundario?secundario:''}
          onChange={(e) => {
            setSecundario(e.currentTarget.value.replace(' ','').replace(/[*+\-?^${}()|[\]\\/#|¿%&]/g,''))
            
              setErrorSecundario(reportarError(e.currentTarget.value,2))
          }}
        />
        {secundario == undefined?<LinearProgress className='absolute' />:''}
        <p className="absolute text-sm text-red-600 mt-2 mb-0">{erroSecundario}</p>
      </div>
      <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
              ariaHideApp={false}
            >
              <div className="font-bold">
                {mensajeModal}
              </div>
              <form className="d-flex justify-content-center space-x-4 mt-4">
                <div>
                  <button
                    onClick={closeModal}
                    type="button"
                    className="btn btn-danger text-white"
                  >
                    Cancelar
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={updateEmails}
                    className="btn colorPrimary text-white"
                  >
                    Aceptar
                  </button>
                </div>
              </form>
            </Modal>
    </JetFormSection>
  );
}
