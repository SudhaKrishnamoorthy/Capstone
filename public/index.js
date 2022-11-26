const form = document.querySelector('new-competitor-form')
const input = document.querySelector('#new-competitor-input')
const competitorSelect = document.querySelector('#competitor-select')
const competitorList = document.querySelector('#competitor-list')


function handleSubmit(e) {
    e.preventDefault()

    if (input.value < 1) {
        alert ('You must enter a competitor name')
        return;
    }

    //let userRating = document.querySelector('input[name="rating"]:checked').value
    let body = {
        name: "nameInput.value" 
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
//function deleteCompetitor(id) {
    //axios.delete(`http://localhost:4004/competitors/${id}`)
        //.then(() => getCompetitors())
        //.then(() => {})
        //.catch(err => console.log(err))
//}



function getCompetitors() {
    competitorList.innerHTML = ''

    axios.get('http://localhost:4004/competitors/')
        .then(res => {
            res.data.forEach(elem => {

                competitorList.innerHTML += competitor
            })
        })
}

function getCompetitors() {
    axios.get('http://localhost:4004/competitors')
        .then(res => {
            console.log(res.data)
            res.data.forEach(competitor => {
                const option = document.createElement('div')
                option.innerHTML = competitor.name
                competitorSelect.appendChild('div')
            })
        })
}

getCompetitors()
form.addEventListener('submit', handleSubmit)