document.getElementById("direccionForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let direccion = document.getElementById("direccionInput").value;
  
    axios.get(`https://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=${encodeURIComponent(direccion)}`)
      .then(response => {
        let result = response.data.direccionesNormalizadas[0];
        document.getElementById("resultDireccion").innerHTML = generateTable(result);
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
        document.getElementById("resultEsquina").innerHTML = generateTable(result);
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
        document.getElementById("resultCoordenada").innerHTML = generateTable(result);
      })
      .catch(error => {
        document.getElementById("resultCoordenada").innerHTML = "Error al normalizar las coordenadas.";
      });
  });
  
  // Función para generar una tabla con los resultados
  function generateTable(data) {
    return `
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
  }
  