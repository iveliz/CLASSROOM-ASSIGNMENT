<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>Se ha completado su registro satisfactoriamente!</h2>
        <p>El nombre de usuario para el acceso a su cuenta es: {{ $info->user_name }}
        <p>La contraseña para el acceso a su ecuenta es: {{ $info->password }}  
        <p>Esta informacion es privada y exclusiva ,no comparta con nadie .
</body>
</html>