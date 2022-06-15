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
      
        return $this->subject('Notificación de restablecimiento de contraseña')->view('RecuperarContra');   
    }
}
