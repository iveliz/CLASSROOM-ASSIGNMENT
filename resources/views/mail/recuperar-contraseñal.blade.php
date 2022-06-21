@component('mail::message')
Hola!

Está recibiendo este correo electrónico porque recibimos una solicitud de restablecimiento de contraseña para su cuenta

@component('mail::button', ['url' => 'http://127.0.0.1:8000/reset-password/0afe1c1903e132838eda32e6899fd7ab8feeaa581d7e46c29cb1ebc3c802a1bf?'])
Restablecer la contraseña
@endcomponent

Si no solicitó un restablecimiento de contraseña, no se requiere ninguna otra acción.<br>
Gracias,<br>
Neolancer
@endcomponent
