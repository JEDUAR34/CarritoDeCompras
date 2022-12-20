const carrito = document.querySelector(".carrito");
const footer = document.querySelector(".footer");
const template = document.querySelector(".template");
const foot = document.querySelector(".foot");
const fragment = document.createDocumentFragment();

document.addEventListener("click", (e) => {
	if (e.target.matches(".boton")) {
		comprarCarrito(e);
	}
	if (e.target.matches(".total_agregar")) {
		botonAgregar(e);
	}
	if (e.target.matches(".total_quitar")) {
		botonRestar(e);
	}
	if (e.target.matches(".fi_boton")) {
		botonFinali(e);
	}
});

let compra = [];

const comprarCarrito = (e) => {
	const producto = {
		nombre: e.target.dataset.fruta,
		cantidad: 1,
		precio: parseInt(e.target.dataset.precio),
	};

	const indice = compra.findIndex((item) => item.nombre === producto.nombre);
	if (indice === -1) {
		compra.push(producto);
	} else {
		compra[indice].cantidad++;
	}
	pintarCarrito(e);
};

const pintarCarrito = (e) => {
	carrito.textContent = "";
	compra.forEach((item) => {
		const cloneTemplate = template.content.cloneNode(true);
		cloneTemplate.querySelector(".nume").textContent = item.cantidad;
		cloneTemplate.querySelector(".total_precio").textContent =
			item.cantidad * item.precio;
		cloneTemplate.querySelector(".texto").textContent = item.nombre;
		cloneTemplate.querySelector(".total_agregar").dataset.id = item.nombre;
		cloneTemplate.querySelector(".total_quitar").dataset.id = item.nombre;
		fragment.appendChild(cloneTemplate);
	});
	carrito.appendChild(fragment);
	agregarFooter(e);
};

const botonAgregar = (e) => {
	compra = compra.map((item) => {
		if (item.nombre === e.target.dataset.id) {
			item.cantidad++;
		}
		return item;
	});
	pintarCarrito();
};

const botonRestar = (e) => {
	compra = compra.filter((item) => {
		if (item.nombre === e.target.dataset.id) {
			if (item.cantidad > 0) {
				item.cantidad--;
			}
			if (item.cantidad == 0) {
				return;
			}
		}
		return item;
	});
	pintarCarrito();
};

const agregarFooter = (e) => {
	footer.textContent = "";
	const clonefooter = foot.content.cloneNode(true);

	const total = compra.reduce(
		(acc, current) => acc + current.cantidad * current.precio,
		0
	);

	if (total > 0) {
		clonefooter.querySelector(".fi_tota").textContent = total;
	} else {
		return;
	}
	footer.appendChild(clonefooter);
};

const botonFinali = (e) => {
	const total = compra.reduce(
		(acc, current) => acc + current.cantidad * current.precio,
		0
	);
	alert(`Muchas gracias por su compra, su total a cancelar es de $ ${total}`);
};
