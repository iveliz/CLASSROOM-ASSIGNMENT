import { useForm, Head } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import classNames from 'classnames';
import React, {useState} from 'react';
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
  const [usuario,setUsuario] = useState('');
  const [envio,setEnvio] = useState(false);
  const [error, setError] = useState(false);
  const [bandera, setBandera] = useState(false);
  const endpoint = 'http://127.0.0.1:8000';

  const form = useForm({
    email: '',
  });

  function onSubmitUser(e: React.FormEvent) {
    e.preventDefault();
    
    axios
      .post(`${endpoint}/recuperarContraseña`, { user_name: usuario})
      .then(response => {
        if(response.data == 1){
          //console.log("el usuario existe")
          //setError(false);
          //Inertia.visit(route('password.request'));
          setBandera(true);
        }else{
          //console.log("el usuario no existe")
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
    bandera?<JetAuthenticationCard>
      <Head title="Recuperar contraseña" />
    <div className="mb-4 text-sm text-gray-600">
    Ahora introduce uno de los correos que tienes en tu cuenta para poder recuperar tu contraseña.
    </div>

    {status && (
      <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
    )}

    <JetValidationErrors className="mb-4" />

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
          className={classNames({ 'opacity-25': form.processing })}
          disabled={form.processing}
        >
          Recuperar Contraseña
        </JetButton>
      </div>
    </form>
  </JetAuthenticationCard>:
    <JetAuthenticationCard>
      <Head title="Recuperar contraseña" />
      <div className="mb-4 text-sm text-gray-600">
      ¿Perdiste tu contraseña?, no hay problema, introduce tu nombre de usuario para buscar tu cuenta
      </div>

      {error?<p className='mb-2 text-sm text-red-600'>Esta cuenta no esta registrada</p>:<p> </p>}

      <form onSubmit={onSubmitUser}>
        <div>
          <JetLabel htmlFor="email">Nombre de Usuario:</JetLabel>
          
          <JetInput
            id="user"
            type="text"
            className="mt-1 block w-full"
            //value={form.data.nombreUsuario}
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
