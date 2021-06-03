<?php 
    include "includes/funciones/funciones.php";
    include "includes/layout/header.php"; 

    $id = filter_var($_GET['id'], FILTER_VALIDATE_INT);

    if (!$id) {
        die ("no fue valido");
    }

    $resultado = obtenerContacto($id);

    $contacto = $resultado->fetch_assoc();

?>
<div class="contenedor-barra">
    <div class="contenedor barra">
        <a href="index.php" class="btn">Volver</a>
        <h1>Editar Contactos</h1>

    </div>
</div>
<div class="bg-amarillo contenedor sombra">
    <form id="contacto" action="#">
        <legend>edita el contacto <span>Todos los campos son obligatorios</span></legend>
        <?php include "includes/layout/formulario.php"; ?>

    </form>
</div>

<?php include "includes/layout/footer.php"; ?>