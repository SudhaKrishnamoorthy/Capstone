const form = document.querySelector('#new-competitor-form')
const newCompetitorInput = document.querySelector('#new-competitor-input')
const competitorSelect = document.querySelector('#new-competitor-submit')
const competitorList = document.querySelector('#competitorList')
const competitors = document.querySelector('#competitors')


function handleSubmit(e) {
    e.preventDefault()

    if (newCompetitorInput.value < 1) {
        alert ('You must enter a competitor name')
        return;
    }

    //let userRating = document.querySelector('input[name="rating"]:checked').value
    let body = {
        name: newCompetitorInput.value 
        //rating: +userRating, 
        //competitorId: +competitorSelect.value
    }

    axios.post('http://localhost:4004/competitors', body)
        .then(() => {
            competitorSelect.value > 1
            newCompetitorInput.value = ''
            //document.querySelector('#ranking-one').checked = true
            getCompetitors()
        })
}
function deleteCompetitor(id) {
    axios.delete(`http://localhost:4004/competitors/${id}`)
        .then(() => getCompetitors())
        .then(() => {})
        .catch(err => console.log(err))
}



/*function getCompetitors() {
    competitorList.innerHTML = ''

    axios.get('http://localhost:4004/competitors/')
        .then(res => {
            res.data.forEach(elem => {
                let competitorCard = `<div class="competitorCard">
                    <h2>${elem.name}</h2>
                     <button onclick="deleteCompetitor(${elem.competitor_id})">Delete</button>
                    </div>`

                competitorList.innerHTML += competitorCard
            })
        })
}*/

function getCompetitors() {
    competitorList.innerHTML = ''
    axios.get('http://localhost:4004/competitors')
        .then(res => {
            //console.log(res.data)
            res.data.forEach(elem => {
                let competitorCard = `<div class="competitor"><div class="competitorCard" id="new-competitor-submit">
                    <h2>${elem.name}</h2>
                     <button class="deleteBtn" onclick="deleteCompetitor(${elem['competitor_id']})">Delete</button>
                    </div>
                    </div>`;
                    //console.log(competitorCard)

                //competitors.innerHTML += competitorCard
                competitorList.innerHTML +=competitorCard
            })
        })
}

getCompetitors()
form.addEventListener('submit', handleSubmit)