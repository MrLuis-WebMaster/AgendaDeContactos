<?php
    include "includes/funciones/funciones.php";
    include "includes/layout/header.php"; 
?>

<div class="contenedor-barra">
    <h1>Agenda de Contactos</h1>
</div>

<div class="bg-amarillo contenedor sombra">
    <form id="contacto" action="#">
        <legend>Añada un contacto <span>Todos los campos son obligatorios</span></legend>
        <?php include "includes/layout/formulario.php"; ?>
    </form>
</div>

<div class="contactos contenedor">
    <div class="contenedor-contactos">
        <h1>Contactos</h1>
        <input type="text" id="buscar" class="buscador">
        <p class="total-contactos"><span></span>contactos</p>
        <div class="contenedor-tabla">
            <table id="listado-contactos">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Empresa</th>
                        <th>Telefono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php $contactos = obtenerContactos();
                        if ($contactos -> num_rows ) { 
                            foreach($contactos as $contacto) {?>
                            <tr>
                                <td><?php echo $contacto ['nombre']; ?></td>
                                <td><?php echo $contacto ['empresa']; ?></td>
                                <td><?php echo $contacto ['numero']; ?></td>
                                <td>
                                    <a class="btn" href="editar.php?id=<?php echo $contacto ['id']; ?>">
                                        <i class="fas fa-pen"></i>
                                    </a>
                                    <button data-id="<?php echo $contacto ['id']; ?>" type="button" class="btn btn-borrar">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                            <?php }
                    } ?>
                </tbody>

            </table>

        </div>


    </div>

</div>


<?php include "includes/layout/footer.php"; ?>