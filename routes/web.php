<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\usuarioController;
use Inertia\Inertia;
use App\Http\Controllers\materiaController;
use App\Http\Controllers\GrupoController;
use App\Http\Controllers\SolicitudesController;
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
  'auth:sanctum',
  config('jetstream.auth_session'),
  'verified',
])->group(function () {
  Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
  })->name('dashboard');
});

Route::middleware([
  'auth:sanctum',
  config('jetstream.auth_session'),
  'verified',
])->group(function () {
  Route::get('/solicitudes/pendientes', function () {
    return Inertia::render('SolicitudesPage');
  })->name('solicitudes');
});

Route::middleware([
  'auth:sanctum',
  config('jetstream.auth_session'),
  'verified',
])->group(function () {
  Route::get('/solicitudes/aceptadas', function () {
    return Inertia::render('Aceptados');
  })->name('solicitudes/aceptadas');
});

Route::middleware([
  'auth:sanctum',
  config('jetstream.auth_session'),
  'verified',
])->group(function () {
  Route::get('/solicitudes/rechazadas', function () {
    return Inertia::render('Rechazados');
  })->name('solicitudes/rechazadas');
});

Route::resource('solicitar', materiaController::class)->middleware([
  'auth:sanctum',
  'verified',
]);

Route::resource('prueba_solicitudes', SolicitudesController::class)->middleware(
  ['auth:sanctum', 'verified']
);

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
