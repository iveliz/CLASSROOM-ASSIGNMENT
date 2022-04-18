<?php

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

Route::resource('materias',materiaController::class)
->middleware(['auth:sanctum','verified']);


Route::resource('prueba_solicitudes', SolicitudesController::class)
    ->middleware(['auth:sanctum','verified']);

    Route::resource('solicitar', usuarioController::class)
    ->middleware(['auth:sanctum','verified']);
