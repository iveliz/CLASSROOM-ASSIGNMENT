import { useForm, Head } from '@inertiajs/inertia-react';
import classNames from 'classnames';
import React, { useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import JetAuthenticationCard from '@/Jetstream/AuthenticationCard';
import JetButton from '@/Jetstream/Button';
import JetInput from '@/Jetstream/Input';
import JetLabel from '@/Jetstream/Label';
import JetValidationErrors from '@/Jetstream/ValidationErrors';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Inertia } from '@inertiajs/inertia';
const endpoint = 'http://127.0.0.1:8000';

interface Props {
  token: string;
  email: string;
}

export default function ResetPassword({ token, email }: Props) {
  const route = useRoute();
  const form = useForm({
    token,
    user_name: '',
    password: '',
    password_confirmation: '',
  });
  const [errorCero, setErrorCero] = useState("");
  const [errorUno, setErrorUno] = useState("");
  const [errorDos, setErrorDos] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [stateBack, SetStateBack] = useState(false);

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleOpenBack = () => {
    SetStateBack(true);
  };

  const handleCloseBack = () => {
    SetStateBack(false);
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

  const style = {
    position: 'absolute' as 'absolute',
    inset: '50% auto auto 50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: ' 8px',
  };

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    {/*form.post(route('password.update'), {
      onFinish: () => form.reset('password', 'password_confirmation'),
    });*/} //ocurrio un problema vuelve a intentarlo mas tarde...contraseña restablecida de forma exitosa presiona aceptar para volver a iniciar sesion
    if (form.data.user_name.length == 0 || form.data.password.length == 0 || form.data.password_confirmation.length == 0) {
      alert("No se puede restablecer, existen campos vacios");
    }else if(errorCero.length>0 || errorUno.length>0 || errorDos.length>0){
      alert("No se puede restablecer, existe algún error");
    } else {
      axios
        .put(`${endpoint}/recuperarContraseña/contraseña`, { nombre_usuario: form.data.user_name, contraseña: form.data.password })
        .then(response => {
          if (response.data == 1) {
            //alert("La contraseña fue actualizada con exito");
            handleCloseBack();
            openModal();
            
          } else {
            handleCloseBack();
            alert("Ocurrio un problema revisa los datos que enviaste y vuelve a intentarlo")
          }
        });
        handleOpenBack();
    }

  }

  const controlarError = (error: any, pass: any, confPass: any) => {
    let res = "";
    if (error == 1 && pass.length < 8) {
      res = pass.length != 0 ? "La contraseña debe tener más de ocho caracteres" : "";
    } else if (error == 2 && confPass != pass) {
      res = confPass.length == 0 && pass.length == 0 ? "" : "La confirmación no es igual a la nueva contraseña";
    } else if (error == 0 && pass.length < 8) {
      res = "El usuario debe tener mas de ocho caractéres";
    }
    return res;
  }

  return (
    <JetAuthenticationCard>
      <Head title="Restablecer Contraseña" />

      <JetValidationErrors className="mb-4" />

      <form onSubmit={onSubmit}>
        <div>
          <JetLabel htmlFor="email">Nombre de Usuario:</JetLabel>
          <JetInput
            id="text"
            type="text"
            className="mt-1 block w-full"
            value={form.data.user_name}
            onChange={e => {
              let texto = e.currentTarget.value.replace(' ', '').replace(/[*+\-?^${}()|[\]\\/#|¿%&]/g, '');
              form.setData('user_name', texto)
              setErrorCero(controlarError(0, texto, ""))
            }}

            autoFocus
          />
          <p className="absolute text-sm text-red-600 mt-2 mb-0">{form.data.user_name.length > 0 ? errorCero : "El nombre de usuario es obligatorio"}</p>
        </div>

        <div className="mt-8">
          <JetLabel htmlFor="password">Contraseña Nueva:</JetLabel>
          <JetInput
            id="password"
            type="password"
            className="mt-1 block w-full"
            value={form.data.password}
            onChange={e => {
              form.setData('password', e.currentTarget.value)
              setErrorUno(controlarError(1, e.currentTarget.value, ""))
              setErrorDos(controlarError(2, e.currentTarget.value, form.data.password_confirmation));
            }}

            autoComplete="new-password"
          />
          <p className="absolute text-sm text-red-600 mt-2 mb-0">{errorUno}</p>
        </div>

        <div className="mt-8">
          <JetLabel htmlFor="password_confirmation">Confirmar Contraseña Nueva:</JetLabel>
          <JetInput
            id="password_confirmation"
            type="password"
            className="mt-1 block w-full"
            value={form.data.password_confirmation}
            onChange={e => {
              form.setData('password_confirmation', e.currentTarget.value)
              setErrorDos(controlarError(2, form.data.password, e.currentTarget.value));
            }}

            autoComplete="new-password"
          />
          <p className="absolute text-sm text-red-600 mt-2 mb-0">{errorDos}</p>
        </div>

        <div className="flex items-center justify-end mt-8">
          <JetButton
            className={classNames({ 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Restablecer Contraseña
          </JetButton>
        </div>
      </form>
      <Backdrop
          sx={{
            color: '#fff',
            zIndex: theme => theme.zIndex.drawer + 1,
          }}
          open={stateBack}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: theme => theme.zIndex.drawer + 1,
          }}
          open={modalIsOpen}
        >
      <Modal
          hideBackdrop
          open={modalIsOpen}
          onClose={()=>{}}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 500 }} className="">

            <div id="child-modal-description">
              <p className='mx-8 my-8 align-middle'>La contraseña fue restablecida con éxito, será redireccionado para iniciar sesión</p>
            </div>
            <div className="float-right">
              <button
                type="button"
                className="btn aceptadaButton text-white mr-6 ml-2 mb-4"
                onClick={()=>{Inertia.visit('login')}}
              >
                Aceptar
              </button>
            </div>
          </Box>
        </Modal>
        </Backdrop>
    </JetAuthenticationCard>
  );
}
