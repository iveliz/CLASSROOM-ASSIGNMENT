import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, Head } from '@inertiajs/inertia-react';
import classNames from 'classnames';
import React, { PropsWithChildren, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import JetApplicationMark from '@/Jetstream/ApplicationMark';
import JetBanner from '@/Jetstream/Banner';
import JetDropdown from '@/Jetstream/Dropdown';
import JetDropdownLink from '@/Jetstream/DropdownLink';
import JetNavLink from '@/Jetstream/NavLink';
import JetResponsiveNavLink from '@/Jetstream/ResponsiveNavLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePage } from '@inertiajs/inertia-react';
import { Team } from '@/types';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Badge } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { endpoint } from '@/Const/Endpoint';
library.add(fas);
import Echo from 'laravel-echo';
import { render } from '@headlessui/react/dist/utils/render';
window.Pusher = require('pusher-js');

declare global {
  interface Window {
    Echo: any;
    Pusher: any;
  }
}

interface Props {
  title: string;
  renderHeader?(): JSX.Element;
}

export default function AppLayout({
  title,
  renderHeader,
  children,
}: PropsWithChildren<Props>) {
  const [listaNotificaciones, SetListaNotificaciones] = useState<any[]>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [listaMensajes, SetListaMensajes] = useState<any[]>([]);
  const [mapMensajes, setMapMensajes] = useState<Map<any, any>>(new Map());
  const [isReceived, setIsReceived] = useState<boolean>(false);
  const [listaId, SetListaId] = useState<any[]>([]);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const page = useTypedPage();
  const route = useRoute();
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  const [lis, setLis] = useState<{}>();
  const [message, setMessage] = useState('');

  const getNotificaciones = async () => {
    SetListaNotificaciones([]);
    await axios.get(`${endpoint}/notificaciones/${id}`).then(response => {
      SetListaNotificaciones(response.data);

    });
  };

  useEffect(() => {
    const echo = new Echo({
      broadcaster: 'pusher',
      key: 'ASDASD2121',
      wsHost: window.location.hostname,
      wsPort: 6001,
      forceTLS: false,
      disableStats: true,
    });

    echo
      .private('App.Models.User.'.concat(id))
      .notification((notification: any) => {
        if (!mapMensajes.has(notification.id)) {
          //getNotificaciones();
          //listaMensajes.push(notification.message);

          const aux = {
            mensaje: notification.message,
            tipo: notification.tipo,
          };

          setMapMensajes(mapMensajes.set(notification.id, aux));
          setIsReceived(true);
          //mapMensajes.set(notification.id,notification.message);

        }
      });
  }, [listaNotificaciones]);

  const getMensajeNoti = () => {
    if (listaNotificaciones != null) {
      for (let noti of listaNotificaciones) {

        let idNotiMap = noti.id;
        [noti.data].map((noti: any) => {
          //listaMensajes.push(noti.mensaje);
          const aux = { mensaje: noti.mensaje, tipo: noti.tipo };
          setMapMensajes(mapMensajes.set(idNotiMap, aux));
        });
      }


    }
  };

  useEffect(() => {
    getMensajeNoti();
  }, [listaNotificaciones]);

  useEffect(() => {
    getNotificaciones();
  }, []);


  const { user }: any = usePage().props;
  function switchToTeam(e: React.FormEvent, team: Team) {
    e.preventDefault();
    Inertia.put(
      route('current-team.update'),
      {
        team_id: team.id,
      },
      {
        preserveState: false,
      },
    );
  }
  let { id, name, email } = user;
  function logout(e: React.FormEvent) {
    e.preventDefault();
    Inertia.post(route('logout'));
  }

  function leerNotifiacion(idUsuario: any, idNoti: any) {
    axios
      .post(`${endpoint}/leerNotificacion`, { id: idUsuario, idNoti: idNoti })
      .then(response => {});
  }
  return (
    <div>
      <Head title={title} />

      <JetBanner />

      <div className="min-h-screen bg-gray-100">
        <nav className="colorPrimary border-b border-gray-100 drop-shadow-2xl">
          {/* <!-- Primary Navigation Menu --> */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                {/* <!-- Logo --> */}
                <div className="flex-shrink-0 flex items-center">
                  <JetApplicationMark className="block h-9 w-auto" />
                </div>

                {/* <!-- Navigation Links --> */}
                <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                  <JetNavLink
                    href={route('dashboard')}
                    active={route().current('dashboard')}
                  >
                    Información
                  </JetNavLink>

                  <JetNavLink
                    href={route('solicitar')}
                    active={route().current('solicitar')}
                  >
                    Solicitar
                  </JetNavLink>

                  <JetNavLink
                    href={route('solicitudes')}
                    active={route().current('solicitudes')}
                  >
                    Solicitudes
                  </JetNavLink>
                </div>
              </div>

              <div className="hidden sm:flex sm:items-center sm:ml-6">
                <div className="ml-3 relative">
                  <div className="mr-4 mt-2 ">
                    <Button
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                    >
                      {isReceived ? (
                        <div
                          key={nanoid(5)}
                          onClick={() => setIsReceived(false)}
                        >
                          <Badge color="error" variant="dot">
                            <FontAwesomeIcon
                              icon={['fas', 'bell']}
                              inverse
                              className="text-2xl mb-2 "
                            />
                          </Badge>
                        </div>
                      ) : (
                        <div key={nanoid(5)}>
                          <Badge variant="dot">
                            <FontAwesomeIcon
                              icon={['fas', 'bell']}
                              inverse
                              className="text-2xl mb-2 "
                            />
                          </Badge>
                        </div>
                      )}
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      {mapMensajes.size != 0 ? (
                        Array.from(mapMensajes).map(([key, value]) => {
                          return (
                            <div className="text-neutral-900" key={nanoid(5)}>
                              {value.tipo === 'res_aceptada' ? (
                                <MenuItem
                                  onClick={handleClose}
                                  key={nanoid(6)}
                                  className="m-2 text-justify"
                                >
                                  <a
                                    className="no-underline "
                                    onClick={() => {

                                      leerNotifiacion(id, key);

                                    }}
                                    style={{
                                      color: '#1C9027',
                                      fontWeight: 'bold',
                                    }}
                                    href={route('solicitudes/aceptadas')}
                                  >
                                  <span style={{color: "#000"}} >
                                  {value.mensaje.split("").slice(0,56)}
                                  </span>
                                  <span  >
                                  {value.mensaje.split("").slice(56,value.mensaje.length)}
                                  </span>
                                    <Divider />
                                  </a>
                                </MenuItem>
                              ) : (
                                <MenuItem
                                  onClick={handleClose}
                                  key={nanoid(6)}
                                  className="m-2 text-justify font-semibold
                                "
                                >
                                  <a
                                    className="no-underline"
                                    onClick={() => {

                                      leerNotifiacion(id, key);

                                    }}
                                    style={{
                                      color: '#C7261B',
                                      fontWeight: 'bold',
                                    }}
                                    href={route('solicitudes/rechazadas')}
                                  >
                                   <span style={{color: "#000"}} >
                                  {value.mensaje.split("").slice(0,56)}
                                  </span>
                                  <span  >
                                  {value.mensaje.split("").slice(56,value.mensaje.length)}
                                  </span>
                                    <Divider />
                                  </a>
                                </MenuItem>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-neutral-900">
                          <MenuItem onClick={handleClose} key={nanoid(6)}>
                            <ListItemText primary="No hay notificaciones" />
                            <Divider />
                          </MenuItem>
                        </div>
                      )}
                    </Menu>
                  </div>
                  {/* <!-- Teams Dropdown --> */}
                  {page.props.jetstream.hasTeamFeatures ? (
                    <JetDropdown
                      align="right"
                      width="60"
                      renderTrigger={() => (
                        <span className="inline-flex rounded-md">
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition"
                          >
                            {page.props.user.current_team?.name}

                            <svg
                              className="ml-2 -mr-0.5 h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </span>
                      )}
                    >
                      <div className="w-60">
                        {/* <!-- Team Management --> */}
                        {page.props.jetstream.hasTeamFeatures ? (
                          <>
                            <div className="block px-4 py-2 text-xs text-gray-400">
                              Manage Team
                            </div>

                            {/* <!-- Team Settings --> */}
                            <JetDropdownLink
                              href={route('teams.show', [
                                page.props.user.current_team!,
                              ])}
                            >
                              Team Settings
                            </JetDropdownLink>

                            {page.props.jetstream.canCreateTeams ? (
                              <JetDropdownLink href={route('teams.create')}>
                                Create New Team
                              </JetDropdownLink>
                            ) : null}

                            <div className="border-t border-gray-100"></div>

                            {/* <!-- Team Switcher --> */}
                            <div className="block px-4 py-2 text-xs text-gray-400">
                              Switch Teams
                            </div>

                            {page.props.user.all_teams?.map(team => (
                              <form
                                onSubmit={e => switchToTeam(e, team)}
                                key={team.id}
                              >
                                <JetDropdownLink as="button">
                                  <div className="flex items-center">
                                    {team.id ==
                                      page.props.user.current_team_id && (
                                      <svg
                                        className="mr-2 h-5 w-5 text-green-400"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                      </svg>
                                    )}
                                    <div>{team.name}</div>
                                  </div>
                                </JetDropdownLink>
                              </form>
                            ))}
                          </>
                        ) : null}
                      </div>
                    </JetDropdown>
                  ) : null}
                </div>

                {/* <!-- Settings Dropdown --> */}
                <div className="ml-3 relative">
                  <JetDropdown
                    align="right"
                    width="48"
                    renderTrigger={() =>
                      page.props.jetstream.managesProfilePhotos ? (
                        <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition">
                          <img
                            className="h-8 w-8 rounded-full object-cover"
                            src={page.props.user.profile_photo_url}
                            alt={page.props.user.name}
                          />
                        </button>
                      ) : (
                        <span className="inline-flex rounded-md">
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition"
                          >
                            {page.props.user.name}

                            <svg
                              className="ml-2 -mr-0.5 h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </span>
                      )
                    }
                  >
                    {/* <!-- Account Management --> */}
                    <div className="block px-4 py-2 text-xs text-gray-400">
                      Administrar Cuenta
                    </div>

                    <JetDropdownLink
                      href={route('cambiar_contrasenia_docente')}
                    >
                      Cambiar Contraseña
                    </JetDropdownLink>

                    <JetDropdownLink href={route('configurar_correos_docente')}>
                      Configurar Correos
                    </JetDropdownLink>

                    {page.props.jetstream.hasApiFeatures ? (
                      <JetDropdownLink href={route('api-tokens.index')}>
                        API Tokens
                      </JetDropdownLink>
                    ) : null}

                    <div className="border-t border-gray-100"></div>

                    {/* <!-- Authentication --> */}
                    <form onSubmit={logout}>
                      <JetDropdownLink as="button">
                        Cerrar Sesión
                      </JetDropdownLink>
                    </form>
                  </JetDropdown>
                </div>
              </div>

              {/* <!-- Hamburger --> */}
              <div className="-mr-2 flex items-center sm:hidden">
                <button
                  onClick={() =>
                    setShowingNavigationDropdown(!showingNavigationDropdown)
                  }
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition"
                >
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className={classNames({
                        hidden: showingNavigationDropdown,
                        'inline-flex': !showingNavigationDropdown,
                      })}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                    <path
                      className={classNames({
                        hidden: !showingNavigationDropdown,
                        'inline-flex': showingNavigationDropdown,
                      })}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* <!-- Responsive Navigation Menu --> */}
          <div
            className={classNames('sm:hidden', {
              block: showingNavigationDropdown,
              hidden: !showingNavigationDropdown,
            })}
          >
            <div className="pt-2 pb-3 space-y-1">
              <JetResponsiveNavLink
                href={route('dashboard')}
                active={route().current('dashboard')}
              >
                Información
              </JetResponsiveNavLink>

              <JetResponsiveNavLink
                href={route('solicitar')}
                active={route().current('solicitar')}
              >
                Solicitar
              </JetResponsiveNavLink>
              <JetResponsiveNavLink
                href={route('solicitudes')}
                active={route().current('solicitudes')}
              >
                Solicitudes
              </JetResponsiveNavLink>
            </div>

            {/* <!-- Responsive Settings Options --> */}
            <div className="pt-4 pb-1 border-t border-gray-200">
              <div className="flex items-center px-4">
                {page.props.jetstream.managesProfilePhotos ? (
                  <div className="flex-shrink-0 mr-3">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={page.props.user.profile_photo_url}
                      alt={page.props.user.name}
                    />
                  </div>
                ) : null}

                <div>
                  <div className="font-medium text-base text-sky-300">
                    {page.props.user.name}
                  </div>
                  <div className="font-medium text-sm text-sky-300">
                    {page.props.user.email}
                  </div>
                </div>
              </div>

              <div className="mt-3 space-y-1">
                <JetResponsiveNavLink
                  href={route('cambiar_contrasenia_docente')}
                  active={route().current('cambiar_contrasenia_docente')}
                >
                  Cambiar Contraseña
                </JetResponsiveNavLink>

                <JetResponsiveNavLink
                  href={route('configurar_correos_docente')}
                  active={route().current('configurar_correos_docente')}
                >
                  Configurar Correos
                </JetResponsiveNavLink>

                {page.props.jetstream.hasApiFeatures ? (
                  <JetResponsiveNavLink
                    href={route('api-tokens.index')}
                    active={route().current('api-tokens.index')}
                  >
                    API Tokens
                  </JetResponsiveNavLink>
                ) : null}

                {/* <!-- Authentication --> */}
                <form method="POST" onSubmit={logout}>
                  <JetResponsiveNavLink as="button">
                    Cerrar Sesión
                  </JetResponsiveNavLink>
                </form>

                {/* <!-- Team Management --> */}
                {page.props.jetstream.hasTeamFeatures ? (
                  <>
                    <div className="border-t border-gray-200"></div>

                    <div className="block px-4 py-2 text-xs text-gray-400">
                      Manage Team
                    </div>

                    {/* <!-- Team Settings --> */}
                    <JetResponsiveNavLink
                      href={route('teams.show', [
                        page.props.user.current_team!,
                      ])}
                      active={route().current('teams.show')}
                    >
                      Team Settings
                    </JetResponsiveNavLink>

                    {page.props.jetstream.canCreateTeams ? (
                      <JetResponsiveNavLink
                        href={route('teams.create')}
                        active={route().current('teams.create')}
                      >
                        Create New Team
                      </JetResponsiveNavLink>
                    ) : null}

                    <div className="border-t border-gray-200"></div>

                    {/* <!-- Team Switcher --> */}
                    <div className="block px-4 py-2 text-xs text-gray-400">
                      Switch Teams
                    </div>
                    {page.props.user?.all_teams?.map(team => (
                      <form onSubmit={e => switchToTeam(e, team)} key={team.id}>
                        <JetResponsiveNavLink as="button">
                          <div className="flex items-center">
                            {team.id == page.props.user.current_team_id && (
                              <svg
                                className="mr-2 h-5 w-5 text-green-400"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            )}
                            <div>{team.name}</div>
                          </div>
                        </JetResponsiveNavLink>
                      </form>
                    ))}
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </nav>

        {/* <!-- Page Heading --> */}
        {renderHeader ? (
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              {renderHeader()}
            </div>
          </header>
        ) : null}

        {/* <!-- Page Content --> */}
        <main>{children}</main>
      </div>
    </div>
  );
}
