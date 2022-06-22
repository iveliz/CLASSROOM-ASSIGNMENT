<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
 
class SoliNotification extends Notification implements ShouldBroadcast
{
    use Queueable;

    public $message;
    public $id_soli;
    public $tipo;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($message,$id_soli,$tipo)
    {
        $this->message = $message;
        $this->id_soli = $id_soli;
        $this->tipo = $tipo;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['broadcast','database'];
    }

    public function toArray($notifiable)
    {
        return [
            'mensaje' => $this->message,
            'id_solicitud' => $this->id_soli,
            'tipo' => $this->tipo,
        ];
    }

    public function toBroadcast($notifiable): BroadcastMessage {
        return new BroadcastMessage([
            'message' => "$this->message",
            'id_solicitud' => $this->id_soli,
        ]);
    }
}
