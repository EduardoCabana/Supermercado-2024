"use strict";
let lista = document.getElementById("lista-productos");
const productos = ["Aceite de oliva", "Arroz por kilo ", "Puré de tomate", "Alimento p/perros", "Alimento p/gatos", "piedras sanitarias", "Aceite p/auto", "Shampoo p/autos", "Silicona", "Criquet"];
const precios = [3500, 2800, 900, 13500, 980, 1200, 24200, 3200, 1500, 42000];
const stock = [1000, 500, 500, 600, 600, 300, 50, 150, 100, 30];
const imagenes = ["../imagenes del proyecto/oliva.webp", "../imagenes del proyecto/arroz.webp",
  "../imagenes del proyecto/tomate.webp", "../imagenes del proyecto/perros.webp",
  "../imagenes del proyecto/gatos.webp", "../imagenes del proyecto/piedras.webp",
  "../imagenes del proyecto/aceiteauto.webp", "../imagenes del proyecto/sahmpooauto.webp",
  "../imagenes del proyecto/silicona.webp", "../imagenes del proyecto/criquet.webp"];
const productosConDescuento = ["Aceite de oliva", "Arroz por kilo", "Puré de tomate"];


function crearProductos(arrayProductos, arrayPrecios, arrayImagenes) {       //Funcion para crear los productos de js.
  for (let i = 0; i < arrayProductos.length; i++) {                          //Utilizo ciclo For para recorrer el arreglo productos e ir haciendo coincidir el mismo con el arreglo de precios y el de imagenes.      
    let div = document.createElement("div");                               //Creo los div para contener la info y le asigno la clase en la proxima linea.
    div.setAttribute("class", "productos");
    let img = document.createElement("img");                               //Creo las imagenes para cada producto
    img.setAttribute("src", arrayImagenes[i]);                             //Busco la imagen en el arreglo imagenes según la posición [i]
    img.setAttribute("alt", arrayProductos[i]);                            //Asigno el texto complementario en el arreglo productos según la posición [i]    
    img.setAttribute("class", "producto-img");                             //Asigno clase para la imagen
    div.appendChild(img);                                                  //Inserto la imagen en el div
    let texto = document.createElement("p");                               // Creo la info del producto valiendome de los arreglos productos y precios
    texto.textContent = `Descripción: ${arrayProductos[i]}  Precio: $${arrayPrecios[i]}`;
    texto.setAttribute("class", "descripcion");
    div.appendChild(texto);                                                //Inserto la info al div 
    lista.appendChild(div);                                                //Inserto el div en la lista de productos
    let cantidadLabel = document.createElement("label");                   //Creo una etiqueta para acompañar el input
    cantidadLabel.textContent = "Cantidad: ";                              //Le asigno el texto "Cantidad:" a la etiqueta
    let cantidadInput = document.createElement("input");                   //Creo el input para ingresar a cantidad
    cantidadInput.setAttribute("type", "number");                          //Asigno tipo 
    cantidadInput.setAttribute("min", "0");                                //Coloco el valor minimo en 0 para evitar que ingresen un valor negativo
    cantidadInput.setAttribute("value", "0");                              //Le doy valor 0 al primer valor que se visualiza en el input
    cantidadInput.setAttribute("class", "cantidad");                       //Le asigno clase al input
    cantidadInput.setAttribute("data-producto", arrayProductos[i]);        //Uso la propiedad data-producto para asociar el producto correspondiente con el imput
    cantidadInput.setAttribute("data-stock", stock[i]);                    //Uso la propiedad data-stock para asociar el stock con el input
    cantidadInput.setAttribute("data-precio", precios[i]);
    cantidadLabel.appendChild(cantidadInput);                              //Inserto el input a la etiqueta 
    div.appendChild(cantidadLabel);                                        //Inserto la etiqueta al div

    cantidadInput.addEventListener('input', function () {                   //Coloco un evento "escucha" al input para que al recibir la cantidad ingresada por el usuario, invoque a la función validar
      const cantidadIngresada = parseInt(cantidadInput.value, 10);       // Cantidad ingresada por el usuario
      validarCantidad(cantidadInput.getAttribute('data-producto'), cantidadIngresada, cantidadInput.getAttribute('data-stock'));
    });
  }
}
function calcularPrecioConDescuento(precio, producto) {
  if (productosConDescuento.includes(producto)) {
    return precio * 0.7;
  }
  return precio;
}
function validarCantidad(producto, cantidadIngresada, stockDisponible) {
  if (cantidadIngresada > stockDisponible) {
    alert(`Error: La cantidad de ${producto} supera el stock disponible (${stockDisponible}).`);
  }
};
crearProductos(productos, precios, imagenes);                                  //Ejecuto la funcion para cargar los productos con info,imagen y el input de cantidad,en el html.

document.querySelector('button').addEventListener('click', function () {        //Dejo el boton comprar en "escucha" de un click
  let totalAcumulado = 0;                                                      //Defino una variable de total acumulado con valor en 0
  let cantidadInputs = document.querySelectorAll('.cantidad');                 //Defino una variable cantidadInputs con el valor de todos los inputs del html
  let mensaje = document.getElementById("mensaje");                            //Traigo el elemento mensaje
  let validarCantidad = false;                                                  //Creo una variable para verificar si los inputs tienen un valor mayor a 0 con el valor booleano en false
  cantidadInputs.forEach(function (cantidadInput) {                             //Ejecuto una función for each para recorrer cada input
    let cantidadIngresada = parseInt(cantidadInput.value, 10);               // Voy tomando el valor de cada input 
    let precio = parseFloat(cantidadInput.getAttribute('data-precio'));      //Traigo el precio asociado al producto en cuestion con el atributo "data-precio" 
    precio = calcularPrecioConDescuento(precio, cantidadInput.getAttribute('data-producto'));
    if (cantidadIngresada > 0) {                                             //Establezco la condición para realizar la operacion tendiente a actualizar el total acumulado
      totalAcumulado += precio * cantidadIngresada;
      validarCantidad = true;                                               //Al tener un valor mayor a 0 en los inputs paso la variable validarCantidad a true
    }
    if (!validarCantidad) {                                                   //De no cumplirse el primer if validarcantidad es false y lanzo el mensaje
      mensaje.innerText = "Ingrese al menos un producto";
    }
    else {                                                                  //Sino el mensaje desaparece
      mensaje.innerText = "";
    }
  }
  );
  document.getElementById("total").textContent = totalAcumulado;               //Traigo el elemento "total" y le inserto el valor de la variable total acumulado     
}
);




















