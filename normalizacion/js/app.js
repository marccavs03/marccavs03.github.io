document.getElementById("direccionForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let direccion = document.getElementById("direccionInput").value;

  axios.get(`https://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=${encodeURIComponent(direccion)}`)
    .then(response => {
      let result = response.data.direccionesNormalizadas[0];
      document.getElementById("resultDireccion").innerHTML = mostrarTabla(result);
      mostrarMapa(result.coordenadas.y, result.coordenadas.x); // Mostrar el mapa
    })
    .catch(error => {
      document.getElementById("resultDireccion").innerHTML = "Error al normalizar la dirección.";
    });
});

document.getElementById("esquinaForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let esquina = document.getElementById("esquinaInput").value;

  axios.get(`https://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=${encodeURIComponent(esquina)}`)
    .then(response => {
      let result = response.data.direccionesNormalizadas[0];
      document.getElementById("resultEsquina").innerHTML = mostrarTabla(result);
      mostrarMapa(result.coordenadas.y, result.coordenadas.x); // Mostrar el mapa
    })
    .catch(error => {
      document.getElementById("resultEsquina").innerHTML = "Error al normalizar la esquina.";
    });
});

document.getElementById("coordenadaForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let lat = document.getElementById("latInput").value;
  let lng = document.getElementById("lngInput").value;

  axios.get(`https://servicios.usig.buenosaires.gob.ar/normalizar/?lat=${lat}&lng=${lng}`)
    .then(response => {
      let result = response.data;
      document.getElementById("resultCoordenada").innerHTML = mostrarTabla(result);
      mostrarMapa(result.coordenadas.y, result.coordenadas.x); // Mostrar el mapa
    })
    .catch(error => {
      document.getElementById("resultCoordenada").innerHTML = "Error al normalizar las coordenadas.";
    });
});

// Función para generar una tabla con los resultados y mostrar un mapa
function mostrarTabla(data) {
  // Crear la tabla con los datos
  let tablaHTML = `
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Atributo</th>
          <th scope="col">Valor</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Dirección</td>
          <td>${data.direccion}</td>
        </tr>
        <tr>
          <td>Coordenadas (Lat, Lng)</td>
          <td>${data.coordenadas.y}, ${data.coordenadas.x}</td>
        </tr>
        <tr>
          <td>Partido</td>
          <td>${data.nombre_partido}</td>
        </tr>
        <tr>
          <td>Localidad</td>
          <td>${data.nombre_localidad}</td>
        </tr>
        <tr>
          <td>Calle</td>
          <td>${data.nombre_calle}</td>
        </tr>
        <tr>
          <td>Tipo</td>
          <td>${data.tipo}</td>
        </tr>
        <tr>
          <td>Altura</td>
          <td>${data.altura || "N/A"}</td>
        </tr>
        <tr>
          <td>Calle de Cruce</td>
          <td>${data.nombre_calle_cruce || "N/A"}</td>
        </tr>
      </tbody>
    </table>
  `;

  // Crear el mapa
  let mapaHTML = `
    <div id="map" style="height: 300px; width: 100%;"></div>
  `;

  // Asignar la tabla y el mapa al contenedor adecuado
  return `
    ${tablaHTML}
    ${mapaHTML}
  `;
}

// Agregar la función para mostrar el mapa con las coordenadas
function mostrarMapa(lat, lng) {
  // Crear el mapa centrado en las coordenadas
  let map = L.map('map').setView([lat, lng], 15); // Establecer el zoom a 15 para una vista más cercana

  // Agregar el mapa de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Añadir un marcador en la ubicación
  L.marker([lat, lng]).addTo(map)
    .bindPopup('Ubicación Consultada')
    .openPopup();
}
