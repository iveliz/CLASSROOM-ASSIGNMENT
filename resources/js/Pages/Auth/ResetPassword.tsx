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
  const [errorCero,setErrorCero] = useState("");
  const [errorUno,setErrorUno] = useState("");
  const [errorDos,setErrorDos] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    {/*form.post(route('password.update'), {
      onFinish: () => form.reset('password', 'password_confirmation'),
    });*/} //ocurrio un problema vuelve a intentarlo mas tarde...contraseña restablecida de forma exitosa presiona aceptar para volver a iniciar sesion
    if(form.data.user_name.length==0 || form.data.password.length==0 || form.data.password_confirmation.length==0){
      alert("Existen campos vacios");
    }else {
      axios
      .put(`${endpoint}/recuperarContraseña/contraseña`, { nombre_usuario: form.data.user_name, contraseña: form.data.password })
      .then(response => {
        if (response.data == 1) {
          alert("La contraseña fue actualizada con exito");
        } else {
          alert("Ocurrio un problema revisa los datos que enviaste")
        }
      });
    }
    
  }

  const controlarError = (error:any, pass:any, confPass:any) => {
    let res = "";
    if (error == 1 && pass.length < 8) {
      res = "La contraseña debe tener mas de ocho caractéres";
    }else if (error == 2 && confPass!=pass){
      res = "Las confirmacion no es igual a la nueva contraseña"
    }else if (error == 0 && pass.length<8){
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
              form.setData('user_name', e.currentTarget.value)
              setErrorCero(controlarError(0,form.data.user_name,""))
            }}
            required
            autoFocus
          />
          <p className="absolute text-sm text-red-600 mt-2 mb-0">{errorCero}</p>
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
              setErrorUno(controlarError(1,e.currentTarget.value,""))
            }}
            required
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
            onChange={e =>
              {
                form.setData('password_confirmation', e.currentTarget.value)
                setErrorDos(controlarError(2,form.data.password,e.currentTarget.value));
            }}
            required
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
    </JetAuthenticationCard>
  );
}
