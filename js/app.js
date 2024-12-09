const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const listaCursos = document.querySelector("#lista-cursos");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let artículosCarrito = [];

// agregar los listeners
agregarListeners();
function agregarListeners() {
  listaCursos.addEventListener("click", agregarCurso);

  // elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  // vaciar el carrito del html
  vaciarCarritoBtn.addEventListener("click", () => {
    artículosCarrito = [];

    eliminarHtml();

    console.log("vacianco carrito");
  });
}

// funciones
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosDelCurso(cursoSeleccionado);
  }
}

// elimina cursos del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    // elimina del arreglo articulo carrito por el data-id
    artículosCarrito = artículosCarrito.filter((curso) => curso.id !== cursoId);

    carritoHtml(); // volvemos a iterar sobre el carrito y mostramos su html
    console.log(artículosCarrito);
  }
}

// lee el contenido del html al que le damos click
function leerDatosDelCurso(curso) {
  // crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // Revisa si un elemento ya existe en el carrito
  const existe = artículosCarrito.some((curso) => curso.id === infoCurso.id);

  if (existe) {
    const cursos = artículosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; // retorna el objeto actualizado
      } else {
        return curso; // retorna los objetos que no son los duplicados
      }
    });
    // actualizamos la cantidad
    artículosCarrito = [...cursos];
  } else {
    // agrega elementos al arreglo del carrito

    artículosCarrito = [...artículosCarrito, infoCurso];
    // agregamos el elemento al carrito
  }

  console.log(artículosCarrito);
  carritoHtml();
}
// muestra el carrito de compras del html

function carritoHtml() {
  // limpiar el html
  eliminarHtml();

  // recorre el html y agrega en el tbody
  artículosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
    <img src='${imagen}' width="100">
    <td>${titulo}</td>
    <td>${precio}</td>
    <td>${cantidad}</td>
    <td> <a href="#" class='borrar-curso' data-id="${id}">X</td>
    `;
    // agrega el html del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

// elimina los cursos del tbody

function eliminarHtml() {
  // manera lenta de eliminar

  // contenedorCarrito.innerHTML = "";

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
