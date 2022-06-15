import { useForm, Head } from '@inertiajs/inertia-react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import JetAuthenticationCard from '@/Jetstream/AuthenticationCard';
import JetButton from '@/Jetstream/Button';
import JetInput from '@/Jetstream/Input';
import JetLabel from '@/Jetstream/Label';
import JetValidationErrors from '@/Jetstream/ValidationErrors';
import axios from 'axios';

interface Props {
  status: string;
}

export default function ForgotPassword({ status }: Props) {
  const route = useRoute();
  const endpoint = 'http://127.0.0.1:8000';
  const form = useForm({
    email: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    axios
      .post(`${endpoint}/recuperarContraseña/correoElectronico`, { correo: form.data.email})
      .then(response => {
        if(response.data == 1){
          console.log("correo valido")
        }else{
          console.log("correo no valido")
        }
      });
    //form.post(route('password.email'));
  }

  return (
    <JetAuthenticationCard>
      
      <div className="mb-4 text-sm text-gray-600">
      Ahora introduce uno de los correos que tienes en tu cuenta para poder recuperar tu contraseña.
      </div>

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
      )}

      <JetValidationErrors className="mb-4" />

      <form onSubmit={onSubmit}>
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
            className={classNames({ 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Recuperar Contraseña
          </JetButton>
        </div>
      </form>
    </JetAuthenticationCard>
  );
}
