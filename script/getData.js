import { createDia, createHora, getIcono } from './createCard.js'

let clima = {}

let ciudad = {
    name: 'Berlin',
    country: 'Germany',
    latitude: 52.52,
    longitude: 13.41
}

const mensaje = document.getElementById('mensaje')
const selectDia = document.getElementById('selectDia')

const getClima = async () => {
    const actual = 'temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m'
    const porHora = 'temperature_2m,weather_code'
    const porDia = 'weather_code,temperature_2m_max,temperature_2m_min'

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${ciudad.latitude}&longitude=${ciudad.longitude}&current=${actual}&hourly=${porHora}&daily=${porDia}&timezone=auto`

    mensaje.textContent = 'Loading...'

    const res = await fetch(url)
    const data = await res.json()
    clima = data

    mensaje.textContent = ''

    mostrarHoy()
    mostrarDias()
    llenarSelectDia()
    mostrarHoras()
}

getClima()

const mostrarHoy = () => {
    const actual = clima.current
    const unidades = clima.current_units

    document.getElementById('lugar').textContent = `${ciudad.name}, ${ciudad.country}`
    document.getElementById('fecha').textContent = new Date(actual.time).toLocaleDateString('en-US', {
        weekday: 'long', month: 'short', day: 'numeric', year: 'numeric'
    })
    document.getElementById('iconoHoy').src = getIcono(actual.weather_code)
    document.getElementById('temperatura').textContent = `${Math.round(actual.temperature_2m)}°`

    document.getElementById('sensacion').textContent = `${Math.round(actual.apparent_temperature)}°`
    document.getElementById('humedad').textContent = `${actual.relative_humidity_2m}${unidades.relative_humidity_2m}`
    document.getElementById('viento').textContent = `${actual.wind_speed_10m} ${unidades.wind_speed_10m}`
    document.getElementById('precipitacion').textContent = `${actual.precipitation} ${unidades.precipitation}`
}

const mostrarDias = () => {
    const diario = clima.daily
    document.getElementById('dias').innerHTML = ''

    for (let i = 0; i < diario.time.length; i++) {
        createDia(diario.time[i], diario.weather_code[i], diario.temperature_2m_max[i], diario.temperature_2m_min[i])
    }
}

const llenarSelectDia = () => {
    selectDia.innerHTML = ''

    for (let i = 0; i < clima.daily.time.length; i++) {
        const opcion = document.createElement('option')
        opcion.value = clima.daily.time[i]
        opcion.textContent = new Date(`${clima.daily.time[i]}T00:00`).toLocaleDateString('en-US', { weekday: 'long' })
        selectDia.appendChild(opcion)
    }
}

const mostrarHoras = () => {
    const horario = clima.hourly
    document.getElementById('listaHoras').innerHTML = ''

    for (let i = 0; i < horario.time.length; i++) {
        if (horario.time[i].includes(selectDia.value)) {
            createHora(horario.time[i], horario.weather_code[i], horario.temperature_2m[i])
        }
    }
}

selectDia.addEventListener('change', () => {
    mostrarHoras()
})

const ciudadFilter = document.getElementById('ciudadFilter')

const buscarCiudad = async () => {
    if (ciudadFilter.value != '') {
        mensaje.textContent = 'Search in progress...'

        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${ciudadFilter.value}&count=1&language=en&format=json`)
        const data = await res.json()

        if (data.results == undefined) {
            mensaje.textContent = 'No search result found!'
        }

        else {
            ciudad = data.results[0]
            getClima()
        }
    }
}

document.getElementById('btnBuscar').addEventListener('click', () => {
    buscarCiudad()
})
