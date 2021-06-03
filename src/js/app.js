const formularioContactos = document.querySelector("#contacto"),
      listadoContactos = document.querySelector("#listado-contactos tbody"),
      inputBuscador = document.querySelector("#buscar");

Eventos();

function Eventos () {
    //Cuando el formulario de crear o editar se ejecuta
    formularioContactos.addEventListener("submit", LeerFormulario);


    //eliminar contactos 

    if (listadoContactos) {

        listadoContactos.addEventListener("click", eliminarContactos);
    }

    //buscador 

    inputBuscador.addEventListener("input",buscarContactos)

    //numero contactos
    NumeroContactos();

}
// Filtrado de contactos

function buscarContactos (e) {
    const expresion = new RegExp(e.target.value, "i"),
          registros = document.querySelectorAll("tbody tr");
    registros.forEach(registro => {
        registro.style.display = "none";

        if(registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1) {

            registro.style.display = "table-row";
        }
        NumeroContactos();
    })
}

// Numero de contactos 

function NumeroContactos () {
    const Total = document.querySelectorAll("tbody tr"),
          contenedorNumero = document.querySelector(".total-contactos span");
    let totalContactos = 0;

    Total.forEach(total => {
        if (total.style.display === "" || total.style.display === "table-row") {
            totalContactos++;
        }
    })
    contenedorNumero.textContent = totalContactos;
}

function LeerFormulario (e) {
    e.preventDefault();
    // Leer Los Datos

    const nombre = document.querySelector("#nombre").value,
          empresa = document.querySelector("#empresa").value,
          telefono = document.querySelector("#telefono").value
          accion = document.querySelector("#accion").value;


    if (nombre === "" || empresa === "" || telefono === "") {
        MostrarNotificacion ("Faltan Campos", "error");
    } else {
        //pasa la validacion, crear llamado a AJAX
        const infoContacto = new FormData();
        infoContacto.append("nombre",nombre);
        infoContacto.append("empresa",empresa);
        infoContacto.append("telefono",telefono);
        infoContacto.append("accion",accion);
            if ( accion === "crear") {
                //crearemos un nuevo elemento 
                insertarBD(infoContacto);
                
            }
            else {
                //Editar el elemento
                const idRegistro = document.querySelector("#id").value;
                infoContacto.append("id",idRegistro);
                actualizarRegistro(infoContacto);
            }
    }
}
// inserta en la BD via ajax
function insertarBD (datos) {
    //llamado ajax


    //crear el objeto
    const xhr = new XMLHttpRequest();

    //abrir la conexion

    xhr.open("POST", "includes/modelos/modelos-contactos.php",true );

    //pasar los datos
    xhr.onload = function () {
        if (this.status === 200) {
            console.log(JSON.parse(xhr.responseText));
            //leemos la repuesta de php
            const respuesta = JSON.parse(xhr.responseText);
/*             console.log(respuesta.empresa);
 */        
            //insertar un elemento en la tabla
            const nuevoContacto = document.createElement("TR");
            nuevoContacto.innerHTML = `
                <td>${respuesta.datos.nombre}</td>
                <td>${respuesta.datos.empresa}</td>
                <td>${respuesta.datos.telefono}</td>
            `;

            //Crear contenedor para los botones

            const contenedorAcciones = document.createElement("TD");

            //crear el icono de editar 
            const iconoEditar = document.createElement("I");
            iconoEditar.classList.add("fas","fa-pen");

            //Crear el enlace para editar
            const btnEditar = document.createElement("A");
            btnEditar.appendChild(iconoEditar);

            btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;

            btnEditar.classList.add("btn");
             
            //Agregarlo al padre 

            contenedorAcciones.appendChild(btnEditar);

            //Crear el icono de eliminar
            const iconoTrash = document.createElement("I");
            iconoTrash.classList.add("fas","fa-trash");

            //crear el boton de eliminar 

            const btnEliminar = document.createElement("BUTTON");
            btnEliminar.appendChild(iconoTrash);
            btnEliminar.setAttribute("data-id",respuesta.datos.id_insertado);
            btnEliminar.classList.add("btn");

            //agregarlo al padre

            contenedorAcciones.appendChild(btnEliminar);

            //Agregarlo al tr
            nuevoContacto.appendChild(contenedorAcciones);

            //agregarlo a los contactos
            listadoContactos.appendChild(nuevoContacto);

            //resetear el form
            document.querySelector("form").reset();

            //mostrar la notificacion

            MostrarNotificacion("Creado Correctamente", "correcto");


            // actualiza el numero de contactos
            NumeroContactos();
        }
    }


    //enviar los datos
    xhr.send(datos);

}

function actualizarRegistro(datos) {
    // crear el objeto
    const xhr = new XMLHttpRequest();

    // abrir la conexión
    xhr.open('POST', 'includes/modelos/modelos-contactos.php', true);

    // leer la respuesta
    xhr.onload = function() {
         if(this.status === 200) {
              const respuesta = JSON.parse(xhr.responseText);

              if(respuesta.respuesta === 'correcto'){
                   // mostrar notificación de Correcto
                   MostrarNotificacion('Contacto Editado Correctamente', 'correcto');
              } else {
                   // hubo un error
                   MostrarNotificacion('Hubo un error...', 'error');
              }
              // Después de 3 segundos redireccionar
              setTimeout(() => {
                   window.location.href = 'index.php';
              }, 4000);
         }
    }

    // enviar la petición
    xhr.send(datos);
}

function eliminarContactos (e) {

    if (e.target.parentElement.classList.contains("btn-borrar")) {
        //Tomar ID
        const id = e.target.parentElement.getAttribute("data-id");

/*         console.log(id);
 */   
         //Preguntar al usuario si desea eliminar 

         const respuesta = confirm ("estas seguro(a)de eliminar?");

         if (respuesta) { 
             //llamado AJAX
             //Crear el objeto 
             const xhr = new XMLHttpRequest();

             //abrir la conexion

             xhr.open('GET',`includes/modelos/modelos-contactos.php?id=${id}&accion=borrar`, true);


            // leer la respuesta
            xhr.onload = function() {
                if(this.status === 200) {
                     const resultado = JSON.parse(xhr.responseText);
                     
                     if (resultado.respuesta == "correcto") {
                        //eliminar del DOM

                        e.target.parentElement.parentElement.parentElement.remove();

                        //Mostrar notificacion

                        MostrarNotificacion("contacto eliminado", "correcto");

                        //actualiza el numero

                        NumeroContactos();


                     } else {
                         MostrarNotificacion("Hubo un error","error");

                     }
                  

                }
            }
             //enviar la peticion 

             xhr.send();
         } 
    }

}

// notificacion en pantalla 

function MostrarNotificacion (mensaje, clase) {
    const notificacion = document.createElement("DIV");
    notificacion.classList.add(clase,"notificacion", "sombra");
    notificacion.textContent = mensaje;

    //formulario
        formularioContactos.insertBefore(notificacion, document.querySelector("form legend"));

    // Ocultar y mostrar la notificacion 
        setTimeout( () => {
            notificacion.classList.add("PopUp");
            setTimeout(() => {
                notificacion.classList.remove("PopUp");
                setTimeout(() => {
                    notificacion.remove();
                }, 500);
            }, 3000);
        }, 100)

}