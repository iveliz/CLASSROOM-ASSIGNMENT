import React from 'react';
import DeleteUserForm from '@/Domains/Profile/DeleteUserForm';
import LogoutOtherBrowserSessions from '@/Domains/Profile/LogoutOtherBrowserSessionsForm';
import TwoFactorAuthenticationForm from '@/Domains/Profile/TwoFactorAuthenticationForm';
import UpdatePasswordForm from '@/Domains/Profile/UpdatePasswordForm';
import UpdateProfileInformationForm from '@/Domains/Profile/UpdateProfileInformationForm';
import useTypedPage from '@/Hooks/useTypedPage';
import JetSectionBorder from '@/Jetstream/SectionBorder';
import AppLayout from '@/Layouts/AppLayoutTeacher';
import { Session } from '@/types';

interface Props {
  sessions: Session[];
  confirmsTwoFactorAuthentication: boolean;
}

export default function Prueba({
  sessions,
  confirmsTwoFactorAuthentication,
}: Props,) {
  const page = useTypedPage();

  return (
    <AppLayout
      title={'Cambiar contraseña'}
    >
      <div>
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
          {page.props.jetstream.canUpdatePassword ? (
            <div className="mt-10 sm:mt-0">
              <UpdatePasswordForm />

              <JetSectionBorder />
            </div>
          ) : null}
        </div>
      </div>
    </AppLayout>
  );
}
