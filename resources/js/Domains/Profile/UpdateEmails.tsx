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
import JetSecondaryButton from '@/Jetstream/SecondaryButton';
import { User } from '@/types';

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
  const route = useRoute();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const page = usePage<any>();

  function updateProfileInformation() {
    form.post(route('user-profile-information.update'), {
      errorBag: 'updateProfileInformation',
      preserveScroll: true,
      onSuccess: () => clearPhotoFileInput(),
    });
  }

  function selectNewPhoto() {
    photoRef.current?.click();
  }

  function updatePhotoPreview() {
    const photo = photoRef.current?.files?.[0];

    if (!photo) {
      return;
    }

    form.setData('photo', photo);

    const reader = new FileReader();

    reader.onload = e => {
      setPhotoPreview(e.target?.result as string);
    };

    reader.readAsDataURL(photo);
  }

  function deletePhoto() {
    Inertia.delete(route('current-user-photo.destroy'), {
      preserveScroll: true,
      onSuccess: () => {
        setPhotoPreview(null);
        clearPhotoFileInput();
      },
    });
  }

  function clearPhotoFileInput() {
    if (photoRef.current?.value) {
      photoRef.current.value = '';
      form.setData('photo', null);
    }
  }

  return (
    <JetFormSection
      onSubmit={updateProfileInformation}
      title={`Correos de ${form.data.name}`}
      description={`El correo primario se utiliza recuerar la contraseña, en caso de perder acceso a su correo primario se recomienda utilizar un correo secundario.`}
      renderActions={() => (
        <>
          <JetActionMessage on={form.recentlySuccessful} className="mr-3">
            Guardado.
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

      {/* <!-- Email primario--> */}
      <div className="col-span-6 sm:col-span-4">
        <JetLabel htmlFor="email" value="Correo electrónico primario:" />
        <JetInput
          id="email"
          type="email"
          className="mt-1 block w-full"
          value={form.data.email}
          onChange={e => form.setData('email', e.currentTarget.value)}
        />
        <JetInputError message={form.errors.email} className="mt-2" />
      </div>
      {/* <!-- Email secundario --> */}
      <div className="col-span-6 sm:col-span-4">
        <JetLabel htmlFor="email" value="Correo electrónico secundario:" />
        <JetInput
          id="email"
          type="email"
          className="mt-1 block w-full"
          value={'recuperar correo'}
          onChange={e => form.setData('email', e.currentTarget.value)}
        />
        <JetInputError message={form.errors.email} className="mt-2" />
      </div>
    </JetFormSection>
  );
}
