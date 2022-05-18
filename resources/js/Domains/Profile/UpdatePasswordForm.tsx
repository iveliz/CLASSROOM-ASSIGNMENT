import { useForm } from '@inertiajs/inertia-react';
import classNames from 'classnames';
import React, { useRef, useState} from 'react';
import useRoute from '@/Hooks/useRoute';
import JetActionMessage from '@/Jetstream/ActionMessage';
import JetButton from '@/Jetstream/Button';
import JetFormSection from '@/Jetstream/FormSection';
import JetInput from '@/Jetstream/Input';
import JetInputError from '@/Jetstream/InputError';
import JetLabel from '@/Jetstream/Label';
import { fromPairs } from 'lodash';
import Modal from 'react-modal';

export default function UpdatePasswordForm() {
  const route = useRoute();
  const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });
  const passwordRef = useRef<HTMLInputElement>(null);
  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const [errorUno,setErrorUno] = useState('');
  const [errorDos,setErrorDos] = useState('');
  const [errorTres,setErrorTres] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenDos, setIsOpenDos] = useState(false);

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModalDos() {}

  function closeModalDos() {
    setIsOpenDos(false);
  }

  function openModalDos() {
    setIsOpenDos(true);
  }


  function updatePassword() {
    form.put(route('user-password.update'), {
      errorBag: 'updatePassword',
      preserveScroll: true,
      onSuccess: () => {
        //openModalDos();
        form.reset()
      },
      onError: () => {
        if (form.errors.password) {
          form.reset('password', 'password_confirmation');
          passwordRef.current?.focus();
        }

        if (form.errors.current_password) {
          form.reset('current_password');
          currentPasswordRef.current?.focus();
        }
      },
    });
  }

  const reportarError = (contrasenia:any, aux:any, error: any) => {
    let res = '';
    if(contrasenia!=''){
      if(contrasenia.length<8){
        
        res += 'La contraseña debe tener mas de 8 caracteres. '
      }
      if(contrasenia==aux && error == 2){
        res += 'La contraseña nueva no puede ser igual a la contraseña actual'
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

  return (
    <JetFormSection
      onSubmit={()=>{
        console.log(errorUno.length,'-',errorDos.length,'-',errorTres.length)
        console.log(errorUno,'-',errorDos,'-',errorTres)
        if(form.data.current_password==''||form.data.password==''||form.data.password_confirmation==''){
          alert('Existen campos vacios, no se puede confirmar');
        }else if(errorUno.length>0||errorDos.length>0||errorTres.length>0){
          alert('No se puede confirmar hay cambios no validos');
        }else{
          openModal();
        }
        //updatePassword
      }}
      title={'Cambiar contraseña'}
      description={
        'Asegúrese de que su cuenta esté usando una contraseña larga y aleatoria para mantenerse seguro.'
      }
      renderActions={() => (
        <>
          <JetActionMessage on={form.recentlySuccessful} className="mr-3">
            Contraseña actualizada correctamente.
          </JetActionMessage>

          <JetButton
            className={classNames({ 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Confirmar
          </JetButton>
        </>
      )}
    >
      <div className="col-span-6 sm:col-span-4">
        <JetLabel htmlFor="current_password">Contraseña Actual</JetLabel>
        <JetInput
          id="current_password"
          type="password"
          className="mt-1 block w-full"
          ref={currentPasswordRef}
          value={form.data.current_password}
          onChange={e =>{
            form.setData('current_password', e.currentTarget.value)
            console.log(e.currentTarget.value.length)
            if(e.currentTarget.value.length==0 && form.data.password.length>0){
              console.log('entra')
              setErrorUno('Este campo es obligatorio') 
            }else if(e.currentTarget.value.length<8 && e.currentTarget.value.length>0){
              setErrorUno('La contraseña debe tener más de 8 caracteres.')
            }else{
              setErrorUno('')
            }
            
            //setErrorUno(reportarError(e.currentTarget.value,'',1))
            if(e.currentTarget.value.length<=30 && form.data.password.length<=30){
              setErrorDos(reportarError(form.data.password,e.currentTarget.value,2))

            }

            if(e.currentTarget.value.length>30){
              setErrorUno('La contraseña no puede tener mas de 30 caracteres')
            }
          }
          }
          autoComplete="current-password"
        />
        <p className="absolute text-sm text-red-600 mt-2 mb-0">{`${form.errors.current_password==undefined?errorUno:(form.data.current_password.length>0?form.errors.current_password:'')}`}</p>
      </div>

      <div className="col-span-6 sm:col-span-4 mt-2">
        <JetLabel htmlFor="password">Contraseña Nueva</JetLabel>
        <JetInput
          id="password"
          type="password"
          className="mt-1 block w-full"
          value={form.data.password}
          onChange={e => {
            form.setData('password', e.currentTarget.value)
            setErrorDos(reportarError(e.currentTarget.value,form.data.current_password,2))
            
            if(e.currentTarget.value.length>0 && form.data.current_password.length==0){
              setErrorUno('Este campo es obligatorio')
            }else if(form.data.current_password.length<=30){

              setErrorUno('');
            }
            form.data.password_confirmation.length>0?e.currentTarget.value===form.data.password_confirmation?setErrorTres(''):setErrorTres('La confirmación no es igual a la nueva contraseña'):setErrorTres('')
            if(e.currentTarget.value.length==0 && form.data.password_confirmation.length>0){
              setErrorDos('Este campo es obligatorio') 
            }else{
              //setErrorDos('')
              
            }
            if(e.currentTarget.value.length>0 && form.data.password_confirmation.length==0){
              setErrorTres('Este campo es obligatorio')
            }else{
              //setErrorTres('')
            }
            if(e.currentTarget.value.length>30){
              setErrorDos('La contraseña no puede tener mas de 30 caracteres')
            }
          }}
          autoComplete="new-password"
          ref={passwordRef}
        />
        <p className="absolute text-sm text-red-600 mt-2 mb-0">{errorDos}</p>
      </div>

      <div className="col-span-6 sm:col-span-4 mt-2">
        <JetLabel htmlFor="password_confirmation">Confirmar Contraseña Nueva</JetLabel>
        <JetInput
          id="password_confirmation"
          type="password"
          
          className="mt-1 block w-full"
          value={form.data.password_confirmation}
          onChange={e =>{
            form.setData('password_confirmation', e.currentTarget.value)
            form.data.password.length>0?e.currentTarget.value===form.data.password?setErrorTres(''):setErrorTres('La confirmación no es igual a la nueva contraseña'):setErrorTres('')
            if(e.currentTarget.value.length>0 && form.data.password.length==0){
              setErrorDos('Este campo es obligatorio') 
            }else{
              if((form.data.current_password!=form.data.password)||(form.data.current_password.length==0&&form.data.password.length==0)){
                if(errorDos.length==0 || e.currentTarget.value.length==0 ){
                  if(form.data.password.length <=30){

                    setErrorDos('')
                  }
                }
              }
            }
            
          }
          }
          autoComplete="new-password"
        />
        <p className="absolute text-sm text-red-600 mt-2 mb-0">{errorTres}</p>
        
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
                {'Esta seguro de actualizar su contraseña'}
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
                    onClick={()=>{
                      closeModal();
                      updatePassword();
                    }}
                    className="btn colorPrimary text-white"
                  >
                    Aceptar
                  </button>
                </div>
              </form>
            </Modal>
            <Modal
              isOpen={modalIsOpenDos}
              onAfterOpen={afterOpenModalDos}
              onRequestClose={closeModalDos}
              style={customStyles}
              contentLabel="Example Modal"
              ariaHideApp={false}
            >
              <div className="font-bold">
                {'Contraseña cambiada, se cerrara la sesión ...'}
              </div>
              
            </Modal>
    </JetFormSection>
  );
}

