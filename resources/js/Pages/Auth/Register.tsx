import { InertiaLink, useForm, Head } from '@inertiajs/inertia-react';
import Modal from 'react-modal';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import JetAuthenticationCard from '@/Jetstream/AuthenticationCard';
import JetButton from '@/Jetstream/Button';
import JetCheckbox from '@/Jetstream/Checkbox';
import JetInput from '@/Jetstream/Input';
import JetLabel from '@/Jetstream/Label';
import JetValidationErrors from '@/Jetstream/ValidationErrors';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const endpoint = 'http://127.0.0.1:8000';

export default function Register(this: any) {
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
  const page = useTypedPage();
  const route = useRoute();
  const form = useForm({
    name: '',
    email: '',
    username: '',
    password: '',
    secondaryEmail: '',
    terms: false,
  });

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }
  const [modalIsOpen, setIsOpen] = useState(false);
  const [stateBack, SetStateBack] = useState(false);
  const [errorMessage, SetErrorMessage] = useState('');

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if(form.data.email!=''&&form.data.email==form.data.secondaryEmail){
      alert("El correo principal no puede ser igual al secundario")
    }else{
      handleOpenBack();
      let account = {
        nombre_sct_cnt: form.data.name,
        usuario_sct_cnt: form.data.username,
        correo_principal: form.data.email,
        correo_secundario: form.data.secondaryEmail,
      };
      axios.post(`${endpoint}/crearSolicitudCuenta`, account).then(response => {
        handleCloseBack();
        if(response.data==5){
          SetErrorMessage(
            'El correo principal ingresado ya esta en uso',
          );
          openModal();
        }else if(response.data==4){
          SetErrorMessage(
            'El nombre de usuario ingresado ya esta en uso',
          );
          openModal();
        }else if (response.data == 3) {
          SetErrorMessage(
            'Ya se uso antes el correo principal para hacer una solicitud',
          );
          openModal();
        } else if (response.data == 2) {
          SetErrorMessage(
            'Ya se uso antes el nombre de usuario para hacer una solicitud',
          );
          openModal();
        } else if (response.data == 1) {
          SetErrorMessage('Su solicitud fue creada con éxito');
          openModal();
          form.reset();
        } else {
          SetErrorMessage(
            'Ha ocurrido un error inesperado, intente de nuevo más tarde',
          );
          openModal();
        }
      })
    }
;
  }

  const handleOpenBack = () => {
    SetStateBack(true);
  };

  const handleCloseBack = () => {
    SetStateBack(false);
  };


  return (
    <JetAuthenticationCard>
      <Head title="Register" />

      <JetValidationErrors className="mb-4" />
      <h1 className="text-center">Solicitar cuenta</h1>
      <form onSubmit={onSubmit}>
        <div>
          <JetLabel htmlFor="name">Nombre Completo</JetLabel>
          <JetInput
            id="name"
            type="text"
            className="mt-1 block w-full"
            value={form.data.name}
            onChange={e => form.setData('name', e.currentTarget.value)}
            onInvalid={e => {
              (e.target as HTMLInputElement).setCustomValidity(
                'Debe ser sólo letras y espacios, minimo 8 carácteres',
              );
            }}
            onInput={e => {
              (e.target as HTMLInputElement).setCustomValidity('');
            }}
            required
            pattern="^[a-zA-ZÀ-ÿ- \u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ- \u00f1\u00d1]*)*[a-zA-ZÀ-ÿ- \u00f1\u00d1]{8,}"
            autoFocus
            autoComplete="name"
          />
        </div>
        <div>
          <JetLabel htmlFor="username">Nombre de Usuario</JetLabel>
          <JetInput
            id="username"
            type="text"
            className="mt-1 block w-full"
            value={form.data.username}
            onChange={e => form.setData('username', e.currentTarget.value)}
            pattern="[A-Za-z-0-9_]{8,}"
            onInvalid={e => {
              (e.target as HTMLInputElement).setCustomValidity(
                "Debe ser sólo letras, números y el carácter '_', minimo 8 carácteres",
              );
            }}
            onInput={e => {
              (e.target as HTMLInputElement).setCustomValidity('');
            }}
            required
            autoFocus
            autoComplete="username"
          />
        </div>

        <div className="mt-4">
          <JetLabel htmlFor="email">Correo electrónico principal</JetLabel>
          <JetInput
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={form.data.email}
            onChange={e => {
              form.setData('email', e.currentTarget.value);
            }}
            required
          />
        </div>

        <div className="mt-4">
          <JetLabel htmlFor="secondaryEmail">
            Correo electrónico secundario
          </JetLabel>
          <JetInput
            id="secondaryEmail"
            type="email"
            className="mt-1 block w-full"
            value={form.data.secondaryEmail}
            onChange={e =>
              form.setData('secondaryEmail', e.currentTarget.value)
            }
          />
        </div>
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: theme => theme.zIndex.drawer + 1,
          }}
          open={stateBack}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        {/*    <div className="mt-4">
          <JetLabel htmlFor="password">Password</JetLabel>
          <JetInput
            id="password"
            type="password"
            className="mt-1 block w-full"
            value={form.data.password}
            onChange={e => form.setData('password', e.currentTarget.value)}
            required
            autoComplete="new-password"
          />
        </div>

        <div className="mt-4">
          <JetLabel htmlFor="password_confirmation">Confirmar C</JetLabel>
          <JetInput
            id="password_confirmation"
            type="password"
            className="mt-1 block w-full"
            value={form.data.password_confirmation}
            onChange={e =>
              form.setData('password_confirmation', e.currentTarget.value)
            }
            required
            autoComplete="new-password"
          />
        </div> */}

        {page.props.jetstream.hasTermsAndPrivacyPolicyFeature && (
          <div className="mt-4">
            <JetLabel htmlFor="terms">
              <div className="flex items-center">
                <JetCheckbox
                  name="terms"
                  id="terms"
                  checked={form.data.terms}
                  onChange={e => form.setData('terms', e.currentTarget.checked)}
                />

                <div className="ml-2">
                  I agree to the
                  <a
                    target="_blank"
                    href={route('terms.show')}
                    className="underline text-sm text-gray-600 hover:text-gray-900"
                  >
                    Terms of Service
                  </a>
                  and
                  <a
                    target="_blank"
                    href={route('policy.show')}
                    className="underline text-sm text-gray-600 hover:text-gray-900"
                  >
                    Privacy Policy
                  </a>
                </div>
              </div>
            </JetLabel>
          </div>
        )}

        <div className="flex items-center justify-end mt-4">
     
          <InertiaLink
            href={route('login')}
            className="underline text-sm text-gray-600 hover:text-gray-900"
          >
            Ya tienes una cuenta?
          </InertiaLink>

          <JetButton
            className={classNames('ml-4', { 'opacity-25': form.processing })}
            disabled={form.processing}
            type="submit"
          >
            Solicitar
          </JetButton>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <div className="font-bold">{errorMessage}</div>
          <form className="d-flex justify-content-center space-x-4 mt-4">
            <div>
              <button
                onClick={closeModal}
                type="button"
                className="btn colorPrimary text-white"
              >
                Cerrar
              </button>
            </div>
          </form>
        </Modal>
      </form>
    </JetAuthenticationCard>
  );
}
