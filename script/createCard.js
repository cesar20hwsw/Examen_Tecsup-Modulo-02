export const getIcono = (codigo) => {
    if (codigo == 0) {
        return './assets/images/icon-sunny.webp'
    }
    else if (codigo == 1 || codigo == 2) {
        return './assets/images/icon-partly-cloudy.webp'
    }
    else if (codigo == 3) {
        return './assets/images/icon-overcast.webp'
    }
    else if (codigo == 45 || codigo == 48) {
        return './assets/images/icon-fog.webp'
    }
    else if (codigo >= 51 && codigo <= 57) {
        return './assets/images/icon-drizzle.webp'
    }
    else if (codigo >= 61 && codigo <= 67) {
        return './assets/images/icon-rain.webp'
    }
    else if (codigo >= 80 && codigo <= 82) {
        return './assets/images/icon-rain.webp'
    }
    else if (codigo >= 71 && codigo <= 77) {
        return './assets/images/icon-snow.webp'
    }
    else if (codigo == 85 || codigo == 86) {
        return './assets/images/icon-snow.webp'
    }
    else {
        return './assets/images/icon-storm.webp'
    }
}

export const createDia = (fecha, codigo, maxima, minima) => {
    const divDia = document.createElement('div')
    const nombreDia = document.createElement('p')
    const imgDia = document.createElement('img')
    const temperaturas = document.createElement('div')
    const maximaDia = document.createElement('p')
    const minimaDia = document.createElement('p')

    divDia.classList.add('dia')
    temperaturas.classList.add('temperaturas')

    nombreDia.textContent = new Date(`${fecha}T00:00`).toLocaleDateString('en-US', { weekday: 'short' })
    imgDia.src = getIcono(codigo)
    maximaDia.textContent = `${Math.round(maxima)}°`
    minimaDia.textContent = `${Math.round(minima)}°`

    temperaturas.appendChild(maximaDia)
    temperaturas.appendChild(minimaDia)
    divDia.appendChild(nombreDia)
    divDia.appendChild(imgDia)
    divDia.appendChild(temperaturas)

    document.getElementById('dias').appendChild(divDia)
}

export const createHora = (hora, codigo, temperatura) => {
    const divHora = document.createElement('div')
    const imgHora = document.createElement('img')
    const nombreHora = document.createElement('p')
    const temperaturaHora = document.createElement('p')

    divHora.classList.add('hora')
    nombreHora.classList.add('nombreHora')

    imgHora.src = getIcono(codigo)
    nombreHora.textContent = new Date(hora).toLocaleTimeString('en-US', { hour: 'numeric' })
    temperaturaHora.textContent = `${Math.round(temperatura)}°`

    divHora.appendChild(imgHora)
    divHora.appendChild(nombreHora)
    divHora.appendChild(temperaturaHora)

    document.getElementById('listaHoras').appendChild(divHora)
}
