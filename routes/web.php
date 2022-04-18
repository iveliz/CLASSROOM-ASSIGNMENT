<?php

use App\Http\Controllers\GrupoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\usuarioController;
use Inertia\Inertia;
use App\Http\Controllers\materiaController;
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

route::get('/prueba', 'App\Http\Controllers\GrupoController@prueba');
route::get('/grupoDe/{id}', 'App\Http\Controllers\GrupoController@grupoDe');
route::get('/gruposDe/{id}', 'App\Http\Controllers\GrupoController@gruposDe');
route::get('/gruposDeVarios', 'App\Http\Controllers\GrupoController@gruposDeVarios');
route::get('/grupoMateria/{materia}', 'App\Http\Controllers\GrupoController@grupoMateria');

Route::controller(GrupoController::class)->group(function () {
  Route::get('/grupos','index');
  Route::get('/grupos/{materia}','grupoMateria');
  Route::post('/grupo','metodo');
});

Route::controller(materiaController::class)->group(function () {
  Route::post('/materias','show');
});

Route::resource('solicitar',materiaController::class)
->middleware(['auth:sanctum','verified']);

Route::resource('prueba_solicitudes', SolicitudesController::class)
    ->middleware(['auth:sanctum','verified']);
