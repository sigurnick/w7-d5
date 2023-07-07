//--------------|Show red warnign to user Function|-----------------
const showRedAlert = function (err) {
  const redAlert = document.getElementById("red-alert");
  const textRedAlert = document.getElementById("red-alert-text");
  textRedAlert.innerText = err;
  redAlert.classList.remove("hidden");
};
//-------------------------------------------------------------------
//--------------|Show green alert Function|----------------------------------
const showGreenAlert = function (text) {
  const greenAlert = document.getElementById("green-alert");
  const textRedAlert = document.getElementById("green-alert-text");
  textRedAlert.innerText = text;
  greenAlert.classList.remove("hidden");
  const removeAlert = function () {
    greenAlert.classList.add("hidden");
  };
  setTimeout(removeAlert, 5000);
};
//-------------------------------------------------------------------




const getData = function () {
  const URL = "https://striveschool-api.herokuapp.com/api/product/";

  fetch(URL, {
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
        throw new Error("Errore nel recupero dei dati");
      }
    })
    .then((data) => {
      console.log(data);

      //---------|Show green alert|------
      showGreenAlert("Contenuto caricato correttamente");

      const spinner = document.getElementById("spinner-home");
      spinner.classList.add("hidden");

      //-------------------------|Insert all cards|----------------------------
      data.forEach((data) => {
        let newCard = document.createElement("div");

        //Card
        newCard.classList.add(
          "card",
          "rounded-lg",
          "bg-white",
          "p-3",
          "flex",
          "flex-col",
          "justify-between",
          "gap-2",
          "h-[350px]",
          "hover:scale-110"
        );

          //Card content
        newCard.innerHTML = `
         
            <img class="rounded-t-lg object-scale-down h-48 w-96" src=${data.imageUrl} alt="">
          
          <div class="card-text flex flex-col justify-end gap-1">
            <h1 class="text-lg  mb-2">${data.name}</h1>
            <p class="font-semibold text-lg">${data.price}€</p>

            <div>
            <a href="./detail.html?id=${data._id}" class="detail-btn bg-xblue py-2 px-4 rounded-lg text-base text-white hover:bg-xdarkblue">Details</a>

            <a href="./back-office.html?id=${data._id}" class="edit-btn bg-xblue py-2 px-4 rounded-lg text-base text-white hover:bg-xdarkblue">Edit</a>
            </div>
          </div>
            `;

        const cardsContainer = document.getElementById("cards-container");
        cardsContainer.appendChild(newCard);
      });
    })
    .catch((err) => {
      showRedAlert(err);
    });
};

getData();
