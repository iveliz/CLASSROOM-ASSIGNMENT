import React from 'react';
import DeleteUserForm from '@/Domains/Profile/DeleteUserForm';
import LogoutOtherBrowserSessions from '@/Domains/Profile/LogoutOtherBrowserSessionsForm';
import TwoFactorAuthenticationForm from '@/Domains/Profile/TwoFactorAuthenticationForm';
import UpdatePasswordForm from '@/Domains/Profile/UpdatePasswordForm';
import UpdateEmails from '@/Domains/Profile/UpdateEmails';
import useTypedPage from '@/Hooks/useTypedPage';
import JetSectionBorder from '@/Jetstream/SectionBorder';
import AppLayout from '@/Layouts/AppLayoutAdmin';
import { Session } from '@/types';

interface Props {
  sessions: Session[];
  confirmsTwoFactorAuthentication: boolean;
}

export default function Show({
  sessions,
  confirmsTwoFactorAuthentication,
}: Props) {
  const page = useTypedPage();

  return (
    <AppLayout
      title={'Configurar correos'}
    >
      <div>
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
          {page.props.jetstream.canUpdateProfileInformation ? (
            <div>
              <UpdateEmails user={page.props.user} />

              <JetSectionBorder />
            </div>
          ) : null}
        </div>
      </div>
    </AppLayout>
  );
}
