const formulario = document.getElementById("formRegistro");
const erroresBox = document.getElementById("errores");
const usuarioBox = document.getElementById("usuario");
const claveBox = document.getElementById("contrasena");
const repetirClaveBox = document.getElementById("repetirContrasena");
const salir = document.getElementById("salir");

function limpiarErrores() {
    erroresBox.textContent = ""
}

usuarioBox.addEventListener("click", limpiarErrores);
claveBox.addEventListener("click", limpiarErrores);
repetirClaveBox.addEventListener("click", limpiarErrores);

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    erroresBox.textContent = "";

    const usuario = document.getElementById("usuario").value.trim();
    const clave = document.getElementById("contrasena").value;
    const repetir = document.getElementById("repetirContrasena").value;

    if (clave !== repetir) {
        erroresBox.textContent = "Las contraseñas no coinciden.";
        return;
    }

    const fd = new FormData();
    fd.append("usuario", usuario);
    fd.append("clave", clave);
    fd.append("confirmar", "1");

    try {
        const resp = await fetch("../../php/public/formregistro.php", {
            method: "POST",
            body: fd
        });

        const data = await resp.json();

        if (!resp.ok || !data.resultado) {

            if (data && data.errores) {
                const msgs = Object.values(data.errores).join(" | ");
                erroresBox.textContent = msgs || (data.mensaje ?? "Error de validación.");
            } else {
                erroresBox.textContent = (data && data.mensaje) ? data.mensaje : "Error en el registro.";
            }
            return;
        }
        window.location.href = "jugarPartida.html";
    } catch (err) {
        erroresBox.textContent = "No se pudo conectar con el servidor.";
    }
});

salir.addEventListener("click", () => {
      window.location.href = "../../index.html";
    });

