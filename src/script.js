// Define la API Key en una constante
const apiKey = "dcb66753beab8eeb43ed7f4376e3244e"; // Obtén una API Key de OpenWeatherMap

// Obtén referencias a los elementos del DOM
const searchForm = document.getElementById("search");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-result");

// Agrega un listener para el evento 'submit' del formulario
searchForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Evita que el formulario se envíe y recargue la página

  const ciudad = searchInput.value;
  if (ciudad) {
    // Llama a la función obtenerClima con la ciudad ingresada
    await obtenerClima(ciudad);
  } else {
    mostrarError("Por favor, ingrese una ciudad válida.");
  }
});
// Define una función para mostrar un mensaje de error
function mostrarError(mensaje) {
  searchResults.innerHTML = `<p class="error">${mensaje}</p>`;
}

// Define una función para limpiar los resultados
function limpiarResultados() {
  searchResults.innerHTML = "";
}

// Define una función para obtener el clima
async function obtenerClima(ciudad) {
  limpiarResultados();

  try {
    // Realiza una solicitud a la API de OpenWeatherMap utilizando la API Key y la ciudad ingresada
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}`
    );
    
    // Parsea la respuesta como JSON
    const data = await response.json();

    if (response.ok) {
      // Extrae los datos relevantes de la respuesta JSON
      const temperatureCelsius = Math.round(data.main.temp - 273.15);
      const temperatureFahrenheit = Math.round((temperatureCelsius * 9/5) + 32);
      const description = data.weather[0].description;
      const cityName = data.name;
      const country = data.sys.country;

          // Actualiza el contenido del elemento searchResults con los datos del clima
      searchResults.innerHTML = `
      <p> Clima en ${cityName}, ${country}:</p>
      <p> Descripción: ${description}</p>
      <p> Temperatura en Celsius: ${temperatureCelsius}°C</p>
      <p> Temperatura en Fahrenheit: ${temperatureFahrenheit}°F</p>`;
    } else {
      mostrarError("Ciudad no encontrada.");
    }
  } catch (error) {
    console.error("Error:", error);
    mostrarError("Ocurrió un error al obtener el clima.");
  }
}

// Define una función para mostrar la temperatura en Fahrenheit
function mostrarTemperaturaFahrenheit() {
  const temperatureCelsiusElement = searchResults.querySelector("p:contains('Temperatura en Celsius')");
  const temperatureCelsius = parseFloat(temperatureCelsiusElement.innerText.split(":")[1]);
  const temperatureFahrenheit = (temperatureCelsius * 9/5) + 32;
  temperatureCelsiusElement.innerText = ` Temperatura en Celsius: ${temperatureCelsius}°C`;
  searchResults.innerHTML += `<p> Temperatura en Fahrenheit: ${temperatureFahrenheit}°F</p>`;
}
