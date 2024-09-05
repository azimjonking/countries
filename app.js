const API = 'https://restcountries.com/v3.1/all'
const container = document.querySelector('.container')
const searchInput = document.querySelector('#search')

fetch(API)
    .then(res => res.json())
    .then(data => {
        showData(data)

        searchInput.addEventListener('input', () => {
            showData(filterData(data))
        })
    })
    .catch(err => {
        console.log(err)
    })


function showData(data) {
    container.innerHTML = ''

    data.forEach((flag) => {
        const div = document.createElement('div')
        div.classList.add('flag')

        div.innerHTML = `
            <div class="flag-img">
                <img src="${flag.flags.png}" alt="${flag.name.official}">
            </div>
            <p>Name: <span>${flag.name.official}</span></p>
            <p>Capital: <span>${flag.capital}</span></p>
            <p>Language: <span>${flag.languages && Object.values(flag.languages).join(', ')}</span></p>
            <p>Location: <a href="${flag.maps.googleMaps}" target="_blank">⛳️ google.map</a></p>
        `

        container.appendChild(div)

    })
}



function filterData(data) {
    return data.filter((flag) =>
        flag.name.official.toLowerCase().includes(searchInput.value.toLowerCase()))
}