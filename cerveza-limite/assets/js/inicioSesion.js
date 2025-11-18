 const formulario = document.getElementById("formlogin");
    const erroresBox = document.getElementById("errores");
    const usuarioBox = document.getElementById("usuario");
    const claveBox = document.getElementById("contrasena");
    const btnRegistro = document.getElementById("registrarse");

    function limpiarErrores() {
    erroresBox.textContent = "";
    }

    // Borrar errores al escribir
    usuarioBox.addEventListener("click", limpiarErrores);
    claveBox.addEventListener("click", limpiarErrores);

    formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    erroresBox.textContent = "";

    const usuario = usuarioBox.value.trim();
    const clave = claveBox.value;

    if (!usuario || !clave) {
    erroresBox.textContent = "Usuario y contraseña son obligatorios.";
    return;
    }

    const fd = new FormData();
    fd.append("usuario", usuario);
    fd.append("clave", clave);
    fd.append("entrar", "1"); 

    try {
    const resp = await fetch("../../php/public/formlogin.php", {
    method: "POST",
    body: fd
    });

    const data = await resp.json();

    if (!resp.ok || !data.resultado) {
    erroresBox.textContent = data.mensaje ?? "Usuario o contraseña incorrectos.";
    return;
    }

    window.location.href = "../html/jugarPartida.html";
    } catch (err) {
    console.error(err);
    erroresBox.textContent = "No se pudo conectar con el servidor.";
    }
    });

    btnRegistro.addEventListener("click", () => {
    window.location.href = "../html/registro.html";
    });