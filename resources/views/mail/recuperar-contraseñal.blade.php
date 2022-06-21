@component('mail::message')
Hola!

Está recibiendo este correo electrónico porque recibimos una solicitud de restablecimiento de contraseña para su cuenta

@component('mail::button', ['url' => $info])
Restablecer la contraseña
@endcomponent

Si no solicitó un restablecimiento de contraseña, no se requiere ninguna otra acción.<br>
Gracias,<br>
Neolancer
@endcomponent
