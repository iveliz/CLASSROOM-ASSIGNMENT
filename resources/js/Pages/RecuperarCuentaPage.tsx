import { useForm, Head } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import classNames from 'classnames';
import React, { useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import JetAuthenticationCard from '@/Jetstream/AuthenticationCard';
import JetValidationErrors from '@/Jetstream/ValidationErrors';
import JetButton from '@/Jetstream/Button';
import JetInput from '@/Jetstream/Input';
import JetLabel from '@/Jetstream/Label';
import axios from 'axios';

interface Props {
  status: string;
}

export default function RecuperarCuentaPage({ status }: Props) {
  const route = useRoute();
  const [usuario, setUsuario] = useState('');
  const [envio, setEnvio] = useState(false);
  const [error, setError] = useState(false);
  const [bandera, setBandera] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [envioExitoso, setEnvioExitoso] = useState(false);
  const [envioEmail, setEnvioEmail] = useState(false);
  const endpoint = 'http://127.0.0.1:8000';

  const form = useForm({
    email: '',
  });

  function onSubmitUser(e: React.FormEvent) {
    e.preventDefault();

    axios
      .post(`${endpoint}/recuperarContraseña`, { user_name: usuario })
      .then(response => {
        if (response.data == 1) {
          //
          //setError(false);
          //Inertia.visit(route('password.request'));
          setBandera(true);
        } else {
          //
          setError(true);
          setEnvio(false);
        }
      });
    setEnvio(true);
    //Inertia.visit(route('password.request'));
  }

  function onSubmitEmail(e: React.FormEvent) {
    e.preventDefault();

    axios
      .post(`${endpoint}/recuperarContraseña/correoElectronico`, {
        correo: form.data.email,
      })
      .then(response => {
        if (response.data == 1) {
          setErrorEmail(false);
          setEnvioExitoso(true);
        } else {
          setErrorEmail(true);
          setEnvioEmail(false);
        }
      });
    setEnvioEmail(true);
    //form.post(route('password.email'));
  }

  return bandera ? (
    <JetAuthenticationCard>
      <Head title="Recuperar contraseña" />
      <div className="mb-4 text-sm text-gray-600">
        Ahora introduce uno de los correos que tienes en tu cuenta para poder
        recuperar tu contraseña.
      </div>

      {errorEmail ? (
        <p className="mb-2 text-sm text-red-600">
          Este correo no corresponde a su cuenta
        </p>
      ) : envioExitoso ? (
        <p className="mb-2 text-sm text-green-600">
          Ya se envio un correo para la recuperación
        </p>
      ) : (
        <p> </p>
      )}

      <form onSubmit={onSubmitEmail}>
        <div>
          <JetLabel htmlFor="email">Correo Electrónico:</JetLabel>
          <JetInput
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={form.data.email}
            onChange={e => form.setData('email', e.currentTarget.value)}
            required
            autoFocus
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <JetButton
            className={classNames({ 'opacity-25': envioEmail })}
            disabled={envioEmail}
          >
            Recuperar Contraseña
          </JetButton>
        </div>
      </form>
    </JetAuthenticationCard>
  ) : (
    <JetAuthenticationCard>
      <Head title="Recuperar contraseña" />
      <div className="mb-4 text-sm text-gray-600">
        ¿Perdiste tu contraseña?, no hay problema, introduce tu nombre de
        usuario para buscar tu cuenta
      </div>

      {error ? (
        <p className="mb-2 text-sm text-red-600">
          Esta cuenta no esta registrada
        </p>
      ) : (
        <p> </p>
      )}

      <form onSubmit={onSubmitUser}>
        <div>
          <JetLabel htmlFor="email">Nombre de Usuario:</JetLabel>

          <JetInput
            id="user"
            type="text"
            className="mt-1 block w-full"
            value={usuario}
            onChange={e => setUsuario(e.currentTarget.value)}
            required
            autoFocus
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <JetButton
            className={classNames({ 'opacity-25': envio })}
            disabled={envio}
          >
            Siguiente
          </JetButton>
        </div>
      </form>
    </JetAuthenticationCard>
  );
}
