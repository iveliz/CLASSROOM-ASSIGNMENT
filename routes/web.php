<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DocenteControllers\usuarioController;
use Inertia\Inertia;
use App\Http\Controllers\DocenteControllers\AulaController;

use App\Http\Controllers\DocenteControllers\materiaController;
use App\Http\Controllers\DocenteControllers\GrupoController;
use App\Http\Controllers\DocenteControllers\SolicitudesController;
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
  'role:docente'
])->group(function () {
  Route::get('/solicitar', function () {
    return Inertia::render('SolicitarPage');
  })->name('solicitar');
});

Route::middleware([
  'auth',
  'role:docente'
])->group(function () {
  Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
  })->name('dashboard');
});


Route::middleware([
  'auth',
  'role:docente'
])->group(function () {
  Route::get('/solicitudes/pendientes', function () {
    return Inertia::render('SolicitudesPage');
  })->name('solicitudes');
});


Route::middleware([
  'auth',
  'role:docente'
])->group(function () {
  Route::get('/solicitudes/aceptadas', function () {
    return Inertia::render('Aceptados');
  })->name('solicitudes/aceptadas');
});

Route::middleware([
  'auth',
  'role:docente'
])->group(function () {
  Route::get('/solicitudes/rechazadas', function () {
    return Inertia::render('Rechazados');
  })->name('solicitudes/rechazadas');
});


Route::resource('prueba_solicitudes', SolicitudesController::class)->middleware(
  ['auth:sanctum', 'verified']
);


Route::middleware([
  'auth'
])->group(function () {
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
      Route::delete('/api/solicitudes/eliminar/{id}', 'destroy');
      Route::get('/api/solicitudes/pendientes/{id}', 'listarPendientes');
      Route::post('/api/solicitudes/crear', 'crearSolicitud');
      Route::get('/api/solicitudes/rechazadas/{id}', 'listarRechazados');
      Route::get('/api/solicitudes/aceptadas/{id}', 'listarAceptados');
    });
    
    Route::controller(materiaController::class)->group(function () {
      Route::post('/materias', 'show');
    });
    
    Route::controller(AulaController::class)->group(function () {
      Route::post('/aulas', 'AulaElegida');
    });

  
 