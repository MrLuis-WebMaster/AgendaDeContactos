<div class="campos">
            <div class="campo">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre"
                value=" <?php echo ( isset($contacto['nombre'])) ? $contacto['nombre'] : '' ?>"
                >
            </div>
            <div class="campo">
                <label for="empresa">Empresa:</label>
                <input type="text" id="empresa"
                value=" <?php echo ( isset( $contacto['empresa'])) ? $contacto['empresa'] : '' ?>"
                >
            </div>
            <div class="campo">
                <label for="teléfono">Telefono:</label>
                <input type="tel" id="telefono"
                value=" <?php echo ( isset( $contacto['numero'])) ? $contacto['numero'] : '' ?>"
                >
            </div>
            <div class="campo enviar">
                <?php
                    $textoBtn = (isset($contacto['numero'])) ? 'guardar' : 'añadir';
                    $accion = (isset($contacto['numero'])) ? 'editar' : 'crear';
                ?>
                <input type="hidden" id="accion" value="<?php echo $accion; ?>"  >
                
                <?php if (isset($contacto['id'])) {?>
                    <input type="hidden" id="id" value="<?php echo $contacto['id']; ?>">
                <?php }?>
                <input class="btn" type="submit" value="<?php echo $textoBtn; ?>">
            </div>
</div>