const form = document.querySelector('form')
const nameInput = document.querySelector('#name-input')
const competitorSelect = document.querySelector('#country-select')
const competitorList = document.querySelector('#country-list')

function handleSubmit(e) {
    e.preventDefault()

    if (nameInput.value < 1) {
        alert ('You must enter a competitor name')
        return
    }

    //let userRating = document.querySelector('input[name="rating"]:checked').value
    //let body = {
      //  name: nameInput.value, 
       // rating: +userRating, 
        //countryId: +countrySelect.value
    //}

    axios.post('http://localhost:4004/competitors', body)
        .then(() => {
            competitorSelect.value = 1
            nameInput.value = ''
            //document.querySelector('#ranking-one').checked = true
            getCompetitors()
        })
}

function deleteCard(id) {
    axios.delete(`http://localhost:4004/competitors/${id}`)
        .then(() => getCompetitors())
        .catch(err => console.log(err))
}

function getCompetitors() {
    competitorList.innerHTML = ''

    axios.get('http://localhost:4004/competitors/')
        .then(res => {
            res.data.forEach(elem => {
                let competitorCard = `<div class="competitor-card">
                    <h2>${elem.competitor}</h2>
                    <h3>Ranking: ${elem.ranking}/5</h3>
                    <button onclick="deleteCard(${elem['competitor_id']})">Delete</button>
                    </div>
                `

                competitorList.innerHTML += competitorCard
            })
        })
}

function getCompetitors() {
    axios.get('http://localhost:4004/competitors')
        .then(res => {
            res.data.forEach(competitor => {
                const option = document.createElement('option')
                option.setAttribute('value', competitor['competitor_id'])
                option.textContent = competitor.name
                competitorSelect.appendChild(option)
            })
        })
}

getCompetitors()
form.addEventListener('submit', handleSubmit)