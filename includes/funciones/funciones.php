<?php

function obtenerContactos () {
    include 'bd.php';
    try {
        return $db -> query ("SELECT id,nombre, empresa, numero FROM contactos");

    } catch (Exception $e) {
        echo "Error" . $e->getMessage() . "<br>";
        return false;

    }

}


// obtiene un contacto toma un id 


function obtenerContacto ($id) {

    include 'bd.php';
    try {
        return $db -> query ("SELECT id,nombre, empresa, numero FROM contactos WHERE id = $id");

    } catch (Exception $e) {
        echo "Error" . $e->getMessage() . "<br>";
        return false;

    }


}