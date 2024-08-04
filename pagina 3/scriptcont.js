"use strict";

let nombre = document.getElementById("iname");
let apellido = document.getElementById("iapellido");
let email = document.getElementById("iemail");
let telefono = document.getElementById("itelefono");
let consulta = document.getElementById("iconsulta");
let btnEnviar = document.getElementById("ienviar");
let información = [];
btnEnviar.addEventListener("click", (e) => {
  e.preventDefault();
  if (!nombre.value || !apellido.value || !email.value || !telefono.value || !consulta.value) {//Valido que os campos esten todos completos 
    alert("Por favor, complete todos los campos del formulario.");
    return;
  }
  información[0] = nombre.value;
  información[1] = apellido.value;
  información[2] = email.value;
  información[3] = telefono.value;
  información[4] = consulta.value;
  console.log(
    `Su nombre y apellido es  ${información[0]}  ${información[1]}, su información de contacto es ${información[2]}${información[3]}.Su consulta es ${información[4]}`
);

  let blob = new Blob([información], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "contacto.txt");

  nombre.value = "";
  apellido.value = "";
  email.value = "";
  telefono.value = "";
  consulta.value = "";

});

