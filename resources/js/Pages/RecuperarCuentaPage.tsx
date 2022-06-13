import { useForm, Head } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import JetAuthenticationCard from '@/Jetstream/AuthenticationCard';
import JetButton from '@/Jetstream/Button';
import JetInput from '@/Jetstream/Input';
import JetLabel from '@/Jetstream/Label';
import JetValidationErrors from '@/Jetstream/ValidationErrors';

interface Props {
  status: string;
}

export default function RecuperarCuentaPage({ status }: Props) {
  const route = useRoute();
  const form = useForm({
    email: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    //form.post(route('password.request'));
    Inertia.visit(route('password.request'));
  }

  return (
    <JetAuthenticationCard>
      <div className="mb-4 text-sm text-gray-600">
      ¿Perdiste tu contraseña?, no hay problema, introduce tu nombre de usuario para buscar tu cuenta
      </div>

      <p className='mb-2 text-sm text-red-600'>Mensaje error</p>

      <form onSubmit={onSubmit}>
        <div>
          <JetLabel htmlFor="email">Nombre de Usuario:</JetLabel>
          
          <JetInput
            id="user"
            type="text"
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
            Siguiente
          </JetButton>
        </div>
      </form>
    </JetAuthenticationCard>
  );
}
