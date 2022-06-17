<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function leerNotificacion(Request $request){
        $id = $request->id;
        $idNoti = $request->idNoti;
        $user = User::find($id);
        $user->unreadNotifications->find($idNoti)->markAsRead();
    }

    public function leerTodas(Request $request){
        $mensaje = $request->mensaje;
        $id_solicitud = $request->id_solicitud;
        /*$users = User::where('id_role',1);
        foreach($users as $user){
            $user->unreadNotifications->where('data','LIKE','%'.$mensaje.'%'.$id_solicitud.'%')->markAsRead();
        }*/
        
        $notis = DB::table('notifications')->where('data','LIKE','%'.$mensaje.'%'.$id_solicitud.'%')->whereNull('read_at')->get();
        $notis = $notis->pluck('id');
        User::whereIn('id_role',[1,3])->each(function(User $user) use ($notis){
            $user->unreadNotifications->whereIn('id',$notis)->markAsRead();
        });
        /*foreach($notis as $noti){
            $noti->read_at = date('Y-m-d h:i:s', time());
            $noti->save();
        }*/
        return $notis;
    }

    public function obtenerNotificaciones($id){
        $user = User::find($id);
        return $user->unreadNotifications;
    }
}
