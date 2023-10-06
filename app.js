const resultado = document.querySelector(".resultado");
const formulario = document.querySelector(".tiempo");
const nombreCiudad = document.querySelector("#ciudad");
const nombrePais = document.querySelector("#pais");
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  if (nombreCiudad.value === "" || nombrePais.value === "") {
    error("completar ambos campos");
    return;
  }

  api(nombreCiudad.value, nombrePais.value);
});
function api(ciudad, pais) {
  const apiId = "45fb544c17d8e9f84f627a8875863455";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},{state code},${pais}&appid=${apiId}
`;
  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((dataJSON) => {
      if (dataJSON.cod == "404") {
        error("ciudad no encontrada");
      } else {
        encontrada(dataJSON);
      }
    });
  localStorage.setItem("nombre", JSON.stringify(contenido));
}
const minombreStorage = JSON.parse(localStorage.getItem("nombre"));
console.log(minombreStorage);
function encontrada(data) {
  const {
    name,
    main: { temp, temp_min, temp_max },
    weather: [icono],
  } = data;
  const grados = centigrados(temp);
  const min = centigrados(temp_min);
  const max = centigrados(temp_max);

  const contenido = document.createElement("div");
  contenido.innerHTML = `
    <h4> clima en ${name}</h4>
    <img src="https://openweathermap.org/img/wn/${icono.icon}@2x.png" alt="iconos">
    <h2>${grados}°C</h2>
    <p>temp max: ${max}°C</p>
    <p>temp min: ${min}°C</p>`;
  resultado.appendChild(contenido);
}
function error(mensaje) {
  const sms = document.createElement("p");
  sms.classList.add("mensajes");
  sms.innerHTML = mensaje;
  formulario.appendChild(sms);
  setTimeout(() => {
    sms.remove();
  }, 3000);
}
function centigrados(temp) {
  return parseInt(temp - 273.15);
}
