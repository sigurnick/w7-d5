
const getData = function (){
    const URL = 'https://striveschool-api.herokuapp.com/api/product/'

    fetch(URL, {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3OWVlN2RhNTNjMTAwMTRhOTY5MDAiLCJpYXQiOjE2ODg3MTU5NjEsImV4cCI6MTY4OTkyNTU2MX0.CsC1w9VTwn-PZbjDXrVueHReS_opsja0HlPcUGeHSxk",

            'Content-Type': 'application/json',
            },
    })
    .then((res)=>{
        if(res.ok){
            return res.json()
        }else{
            throw new Error('Errore nella chiamata')
        }
    })
    .then((data)=>{
        console.log(data);




//-------------------------|Insert all cards|----------------------------
        data.forEach((data)=>{

            let newCard = document.createElement('div')
            newCard.classList.add('card', 'rounded-lg', 'bg-white','p-3')
            newCard.innerHTML = `
            <div class="card-img ">
            <img class="rounded-t-lg " src=${data.imageUrl} alt="">
          </div>
          <div class="card-text">
            <h1 class="text-lg  mb-2">${data.name}</h1>
            <p class="font-semibold text-lg">${data.price}€</p>

            <div>
            <a href="./detail.html?id=${data._id}" class="detail-btn bg-xblue py-1 px-3 rounded-lg text-base text-white hover:bg-xdarkblue">Details</a>

            <a href="./back-office.html?id=${data._id}" class="edit-btn bg-xblue py-1 px-3 rounded-lg text-base text-white hover:bg-xdarkblue">Edit</a>
            </div>
          </div>
            `

            const cardsContainer =  document.getElementById('cards-container')
            cardsContainer.appendChild(newCard)

            
        })









    })
    .catch((err)=>{
        console.log(err);
    })
}

getData()