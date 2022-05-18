<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\usuarioController;
use Inertia\Inertia;
use App\Http\Controllers\AulaController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\materiaController;
use App\Http\Controllers\GrupoController;
use App\Http\Controllers\SolicitudAulaAdmController;
use App\Http\Controllers\AulasDisponiblesController;
use App\Http\Controllers\SolicitudesController;

use App\Http\Controllers\SolicitudCuentaController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
  return Inertia::render('Auth/Login');
});

Route::middleware([
  'auth',
  'auth:sanctum',
  //config('jetstream.auth_session'),
  'verified',
  'checkRoleAdmin',
])->group(function () {
  Route::get('/Informacion_administrador', function () {
    return Inertia::render('DashboardAdmin');
  })->name('dashboarda');
});

Route::middleware([
  'auth:sanctum',
 // config('jetstream.auth_session'),
  'verified',
  'checkRoleDocente',
])->group(function () {
  Route::get('/solicitar', function () {
    return Inertia::render('SolicitarPage');
  })->name('solicitar');
});

Route::middleware(['auth', 'role:docente', 'checkRoleDocente'])->group(
  function () {
    Route::get('/dashboard', function () {
      return Inertia::render('Dashboard');
    })->name('dashboard');
  }
);

Route::middleware(['auth', 'checkRoleAdmin'])->group(function () {
  Route::get('/solicitudes/aulas', function () {
    return Inertia::render('SolicitudesAdmin');
  })->name('solicitudes/aulas');
});

Route::middleware([
  'auth:sanctum',
 // config('jetstream.auth_session'),
  'verified',
  'checkRoleAdmin',
])->group(function () {
  Route::get('/solicitudes/registros', function () {
    return Inertia::render('SolicitudesAdminRegistro');
  })->name('solicitudes/registros');
});

Route::middleware([
  'auth:sanctum',
 // config('jetstream.auth_session'),
  'verified',
  'checkRoleAdmin',
])->group(function () {
  Route::get('/administrar_cuenta_admin/cambiar_contraseña', function () {
    return Inertia::render('Profile/ActualizarContraseniaAdmin');
  })->name('cambiar_contrasenia_admin');
});

Route::middleware([
  'auth:sanctum',
  //config('jetstream.auth_session'),
  'verified',
  'checkRoleAdmin',
])->group(function () {
  Route::get('/administrar_cuenta_admin/configurar_correos', function () {
    return Inertia::render('Profile/ActualizarCorreosAdmin');
  })->name('configurar_correos_admin');
});

Route::middleware([
  'auth:sanctum',
  //config('jetstream.auth_session'),
  'verified',
  'checkRoleDocente',
])->group(function () {
  Route::get('/cambiar_contraseña', function () {
    return Inertia::render('Profile/ActualizarContraseniaDocente');
  })->name('cambiar_contrasenia_docente');
});

Route::middleware([
  'auth:sanctum',
  //config('jetstream.auth_session'),
  'verified',
  'checkRoleDocente',
])->group(function () {
  Route::get('/configurar_correos', function () {
    return Inertia::render('Profile/ActualizarCorreosDocente');
  })->name('configurar_correos_docente');
});

Route::middleware([
  'auth:sanctum',
 // config('jetstream.auth_session'),
  'verified',
  'checkRoleDocente',
])->group(function () {
  Route::get('/solicitudes/pendientes', function () {
    return Inertia::render('SolicitudesPage');
  })->name('solicitudes');
});

Route::middleware(['auth', 'checkRoleDocente'])->group(function () {
  Route::get('/solicitudes/aceptadas', function () {
    return Inertia::render('Aceptados');
  })->name('solicitudes/aceptadas');
});

Route::middleware(['auth', 'checkRoleDocente'])->group(function () {
  Route::get('/solicitudes/aceptadas-vencidas', function () {
    return Inertia::render('AceptadosVencidos');
  })->name('solicitudes/aceptadas-vencidas');
});

Route::middleware(['auth', 'checkRoleDocente'])->group(function () {
  Route::get('/solicitudes/rechazadas', function () {
    return Inertia::render('Rechazados');
  })->name('solicitudes/rechazadas');
});

Route::resource('prueba_solicitudes', SolicitudesController::class)->middleware(
  ['auth:sanctum', 'verified']
);

Route::middleware(['auth'])->group(function () {
  Route::get('/admin', function () {
    return Inertia::render('adminView');
  })->name('adminView');
});

Route::controller(GrupoController::class)->group(function () {
  Route::post('/grupos', 'gruposMateria');
});

Route::controller(usuarioController::class)->group(function () {
  Route::post('/docentes', 'ObtenerDocentes');
  Route::post('/docentesid', 'ObtenerDocentesId');
});

Route::controller(SolicitudesController::class)->group(function () {
  Route::get('/api/solicitudes', 'index');
  Route::delete('/api/solicitudes/cancelar/{id}', 'cancelarSolicitud');
  Route::get('/api/solicitudes/pendientes/{id}', 'listarPendientes');
  Route::post('/api/solicitudes/crear', 'crearSolicitud');
  Route::get('/api/solicitudes/rechazadas/{id}', 'listarRechazados');
  Route::get('/api/solicitudes/aceptadas/{id}', 'listarAceptados');
  Route::get(
    '/api/solicitudes/aceptadas/sin_vencer/{id}',
    'listarAceptadasSinVencer'
  );
  Route::get(
    '/api/solicitudes/aceptadas/vencidas/{id}',
    'listarAceptadasVencidas'
  );
  Route::post(
    '/api/solicitudes/cancelarPorArreglo',
    'cancelarSolicitudPorArreglo'
  );
});

Route::controller(SolicitudAulaAdmController::class)->group(function () {
  Route::get('/solicitudesAula', 'index');
  Route::post('/confirmarSolicitud', 'confirmarSoli');
  Route::post('/rechazarSolicitud', 'rechazarSoli');
});

Route::controller(AulasDisponiblesController::class)->group(function () {
  Route::post('/aulasDisponibles', 'aulasDisponibles');
});

Route::controller(materiaController::class)->group(function () {
  Route::post('/materias', 'show');
});

Route::controller(AulaController::class)->group(function () {
  Route::post('/aulas', 'AulaElegida');
});

Route::controller(SolicitudCuentaController::class)->group(function () {
  Route::get('/SolicitudCuenta', 'verSolicitud');
});

Route::controller(EmailController::class)->group(function () {
  Route::post('/correoElectronico', 'store');
  Route::post('/correoElectronico/actualizar', 'update');
  Route::post('/correoElectronico/mostrar', 'show');
});
