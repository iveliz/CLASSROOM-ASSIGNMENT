<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Lang;


class RecuperarContraseñaMail extends Mailable
{
    use Queueable, SerializesModels;

  
   public function __construct()
   {
     
   }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
      $url="http://127.0.0.1:8000/reset-password/0afe1c1903e132838eda32e6899fd7ab8feeaa581d7e46c29cb1ebc3c802a1bf?";
        return $this->subject('Notificación de restablecimiento de contraseña')->view('RecuperarContra');
               $this->line('Está recibiendo este correo electrónico porque recibimos una solicitud de restablecimiento de contraseña para su cuenta.')
               ->action(Lang::get('Restablecer la contraseña'), $url);
        
    }
}
