const claveApi = '9e122cd782b2d0333f5fe4e7fa192062';
const urlApi = 'https://api.openweathermap.org/data/2.5/weather';

let climaUbicacionActualMostrado = false;

function obtenerClimaPorCoordenadas(lat, lon) {
    axios.get(`${urlApi}?lat=${lat}&lon=${lon}&appid=${claveApi}&lang=es`)
        .then(function(respuesta) {
            mostrarClima(respuesta.data, true);
        })
        .catch(function(error) {
            console.error("Error al obtener el clima por coordenadas:", error);
            alert('No se pudo obtener la información de la ubicación actual.');
        });
}

navigator.geolocation.getCurrentPosition(function(posicion) {
    const lat = posicion.coords.latitude;
    const lon = posicion.coords.longitude;

    if (!climaUbicacionActualMostrado) {
        obtenerClimaPorCoordenadas(lat, lon);
        climaUbicacionActualMostrado = true;
    }
}, function() {
    console.log("El usuario no permitió el acceso a la ubicación.");
});

function consultarClimaPorCiudad() {
    const nombreCiudad = document.getElementById('nombreCiudad').value;
    axios.get(`${urlApi}?q=${nombreCiudad}&appid=${claveApi}&lang=es`)
        .then(function(respuesta) {
            mostrarClima(respuesta.data, false);
        })
        .catch(function(error) {
            console.error("Error al obtener el clima por ciudad:", error);
            alert('No se pudo obtener la información de la ciudad.');
        });
}

function consultarClimaPorCoordenadas() {
    const lat = document.getElementById('latitud').value;
    const lon = document.getElementById('longitud').value;
    if (lat && lon) {
        obtenerClimaPorCoordenadas(lat, lon);
    } else {
        alert('Por favor, ingrese las coordenadas.');
    }
}

function mostrarClima(datos, esUbicacionActual = false) {
    if (datos && datos.weather) {
        if (esUbicacionActual) {
            const urlIcono = `https://openweathermap.org/img/wn/${datos.weather[0].icon}@2x.png`;
            document.getElementById('iconoClimaActual').src = urlIcono;
            document.getElementById('textoClimaActual').innerText = `${datos.name}, ${datos.sys.country} | ${Math.round(datos.main.temp - 273.15)} °C`;

            document.getElementById('iconoClimaActual').classList.remove('d-none');
            document.getElementById('textoClimaActual').classList.remove('d-none');
        }

        document.getElementById('nombreUbicacion').innerText = `${datos.name}, ${datos.sys.country}`;
        document.getElementById('descripcionClima').innerText = `Estado: ${datos.weather[0].description}`;
        document.getElementById('temperatura').innerText = `Temperatura: ${Math.round(datos.main.temp - 273.15)} °C`;
        document.getElementById('coordenadas').innerText = `Coordenadas: Lat ${datos.coord.lat}, Lon ${datos.coord.lon}`;
        
        const urlIconoClima = `https://openweathermap.org/img/wn/${datos.weather[0].icon}@2x.png`;
        document.getElementById('iconoClima').src = urlIconoClima;

        document.getElementById('resultadoClima').style.display = 'block';
    } else {
        alert('No se encontraron datos para la consulta.');
    }
}

function mostrarPestaña(nombrePestaña) {
    const pestañaCiudad = document.getElementById('pestañaCiudad');
    const pestañaCoordenadas = document.getElementById('pestañaCoordenadas');
    const botonCiudad = document.getElementById('botonCiudad');
    const botonCoordenadas = document.getElementById('botonCoordenadas');

    if (nombrePestaña === 'ciudad') {
        pestañaCiudad.classList.add('active');
        pestañaCoordenadas.classList.remove('active');
        botonCiudad.classList.add('active');
        botonCoordenadas.classList.remove('active');
    } else if (nombrePestaña === 'coordenadas') {
        pestañaCiudad.classList.remove('active');
        pestañaCoordenadas.classList.add('active');
        botonCiudad.classList.remove('active');
        botonCoordenadas.classList.add('active');
    }
}