$(document).ready(function() {
    
    //Mostramos alerta al presionar el boton de bienvenida
    $("#welcomeBtn").on("click", function() {
        alert("¡Hola! Bienvenido a mi perfil profesional.");
    });

    //Para cambiar el color de fondo de un elemento con un boton
    $("#colorBtn").on("click", function() {
        $("body").css("background-color", "rgb(235, 245, 251)");

    // Guardar el color de fondo en localStorage.
        localStorage.setItem("bodyBackgroundColor", "rgb(235, 245, 251)");
    });

    // Agregamos dinamicamente elementos a una lista usando el formulario
    $("#profileForm").on("submit", function(event) {
        event.preventDefault();

        //Validar formulario: mostrar errores si campos estan vacios
        let name = $("#nameInput").val();
        let email = $("#emailInput").val();
        let message = $("#messageTextarea").val();
        
        if (!name || !email || !message) {
            alert("Error: Por favor, rellena todos los campos del formulario.");
            return;
        }

        //Guardamos datos del formulario en localStorage
        let formData = {
            name: name,
            email: email,
            message: message
        };
        localStorage.setItem("contactForm", JSON.stringify(formData));

        alert("¡Formulario enviado con éxito!");
        
        //Agregamos un elemento a la lista
        $("#skillsList").append("<li>" + name + " - Nuevo dato</li>");

        //Limpiamos el formulario
        $("#profileForm")[0].reset();
    });

    //Cambiamos el contenido de un <p> con un boton
    $("#welcomeBtn").on("click", function() {
        $("#targetP").text("¡El contenido ha sido actualizado con un mensaje dinámico!");
    });
    
    //Imagen de perfil crece al hacer mouseover
    $("#profileImg").hover(
        function() { // mouseover
            $(this).css("transform", "scale(1.1)");
        },
        function() { // mouseout
            $(this).css("transform", "scale(1)");
        }
    );

    //Mantener color de fondo al recargar la pagina
    let savedColor = localStorage.getItem("bodyBackgroundColor");
    if (savedColor) {
        $("body").css("background-color", savedColor);
    }
    
    //Precargamos datos del formulario al abrir la pagina
    let savedForm = localStorage.getItem("contactForm");
    if (savedForm) {
        let formData = JSON.parse(savedForm);
        $("#nameInput").val(formData.name);
        $("#emailInput").val(formData.email);
        $("#messageTextarea").val(formData.message);
    }

    //Logica para la pagina demo-api-rest.html
    $("#callApiBtn").on("click", function() {
        $("#apiResult").text("Cargando datos...");
        
        $.ajax({
            url: "https://s1uplfovq4.execute-api.us-east-1.amazonaws.com/default/example",
            type: "GET",
            dataType: "json", 
            success: function(response) {
                // Muestra solo el valor del atributo "mensaje"
                $("#apiResult").html(`
                    <h4 class="text-success">Mensaje de la API:</h4>
                    <p class="mb-0"><strong>${response.mensaje}</strong></p>
                `);
            },
            error: function() {
                $("#apiResult").html(`
                    <h4 class="text-danger">Error</h4>
                    <p class="mb-0">No se pudo conectar a la API. Revisar la consola para conocer detalles del error.</p>
                `);
            }
        });
    });
});