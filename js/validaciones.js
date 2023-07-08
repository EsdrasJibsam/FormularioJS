export function valida(input) {
    const tipoInput = input.dataset.tipo;
    if (validadores[tipoInput]) {
        validadores[tipoInput](input);
    }


    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector(".input.message-error").innerHTML = ""
    }else{
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector(".input-message-error").innerHTML =
        mostrarMensajeDeError(tipoInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío",
    },
    email: {
        valueMissing: "El campo correo no puede estar vacío",
        typeMismatch: "El correo no es válido",
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacío",
        patternMismatch:
        "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "Este campo no puede estar vació",
        patternMismatch: "El formato requerido es xxxxxxxxxx 10 números"
    },
    direccion: {
        valueMissing: "Este campo no puede estar vació",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres",
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vació",
        patternMismatch: "La ciudad debe contener entre 4 a 30 caracteres",
    },
    estado: {
        valueMissing: "Este campo no puede estar vació",
        patternMismatch: "El estado debe contener entre 4 a 30 caracteres",
    }

};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            console.log(tipoInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoInput][error]);
            mensaje = mensajesDeError[tipoInput][error];
        }
    });
    return mensaje;
}

function validarNacimiento(input) {
    const fechaUsuario = new Date(input.value);
    let mensaje = "";
    if (!mayorEdad(fechaUsuario)) {
        mensaje = "Debes tener al menos 18 años de edad";
    }
    input.setCustomValidity(mensaje);
}

function mayorEdad(fecha) {
    const fechaActual = new Date();
    const diferenciasFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
    );
    return diferenciasFechas <= fechaActual; 
}