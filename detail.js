const URL = "https://striveschool-api.herokuapp.com/api/product/";
const addressBarContent = new URLSearchParams(location.search);
const eventId = addressBarContent.get("id");

const getItem = function () {
  fetch(URL + eventId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3OWVlN2RhNTNjMTAwMTRhOTY5MDAiLCJpYXQiOjE2ODg3MTU5NjEsImV4cCI6MTY4OTkyNTU2MX0.CsC1w9VTwn-PZbjDXrVueHReS_opsja0HlPcUGeHSxk",

      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel recupero dei dettagli dell'evento");
      }
    })
    .then((detail) => {
      console.log(detail);

      //--------------------|Insert card into detail page|-----------------------------------
      const newCard = document.createElement("div");
      const cardContainer = document.getElementById("card-container");

      newCard.classList.add(
        "card",
        "rounded-lg",
        "p-10",
        "bg-white",
        "flex",
        "flex-col",
        "md:flex-row",
        "justify-start",
        "items-center",
        "gap-14"
      );
      newCard.innerHTML = `
        <div class="card-img">
        <img
          class="rounded-t-lg w-[800px] lg:w-[1200px]"
          src=${detail.imageUrl}
          alt=""
        />
      </div>
    
      <div class="card-text pl-11 flex flex-col gap-2">
        <div class="flex items-center gap-3">
          <h1 class="text-3xl font-bold text-xdarkblue mb-2">${detail.name}</h1>
          <h3 class="font-light">${detail.brand}</h3>
        </div>
    
       
        <p class="pr-12">
        <span class="mb-2">${detail.description}</span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
          vero est doloremque quis, possimus error alias autem, corrupti
          commodi vel enim. Labore, dignissimos ducimus cum quos aliquid
          consequuntur hic unde!
        </p>
        <p class="font-semibold text-2xl">${detail.price}€</p>
    
        <div class="mt-3">
          <a
            href="./back-office.html?id=${detail._id}"
            class="edit-btn bg-xblue py-2 px-4 rounded-lg text-xl text-white hover:bg-xdarkblue"
            >Edit</a
          >

          <button id="delete-btn" class="edit-btn bg-xblue py-2 px-4 rounded-lg text-xl text-white hover:bg-xdarkblue">Delete</button>
        </div>
      </div>
        
        `;

      cardContainer.appendChild(newCard);
    //-------------------------------------------------------------------------------------------------------------------





    //-------------------------------------------------------|Delete item|-----------------------------------------------
    const deleteButton = document.getElementById('delete-btn')
    deleteButton.addEventListener('click', function(){

        fetch(URL + eventId, {
            method: 'DELETE',
            headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3OWVlN2RhNTNjMTAwMTRhOTY5MDAiLCJpYXQiOjE2ODg3MTU5NjEsImV4cCI6MTY4OTkyNTU2MX0.CsC1w9VTwn-PZbjDXrVueHReS_opsja0HlPcUGeHSxk",
              },
          })
            .then((res) => {
              if (res.ok) {
               
                alert('EVENTO ELIMINATO!')
                location.assign('index.html')
              } else {
               
                throw new Error("Problema nell'eliminazione dell'evento")
              }
            })
            .catch((err) => {
              console.log(err)
            })
    })
    //-------------------------------------------------------------------------------------------------------------------

    })

    .catch((err) => {
      console.log(err);
    });
};

getItem();
