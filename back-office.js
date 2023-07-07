const formReference = document.querySelector("form");
const addressBarContent = new URLSearchParams(location.search);
const productId = addressBarContent.get("id");
const URL = "https://striveschool-api.herokuapp.com/api/product/";
console.log(productId);




//--------------|Show red warnign to user Function|-------------------
const showRedAlert = function (err) {
  const redAlert = document.getElementById("red-alert");
  const textRedAlert = document.getElementById("red-alert-text");
  textRedAlert.innerText = err;
  redAlert.classList.remove("hidden");
};
//---------------------------------------------------------------------
//--------------|Show green alert Function|-----------------------------
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




//-------------------------------|Form reset function|-------------------------
const emptyForm = function () {
  const nameInput = document.getElementById("product-name");
  const brandInput = document.getElementById("product-brand");
  const descriptionInput = document.getElementById("product-description");
  const priceInput = document.getElementById("product-price");
  const urlInput = document.getElementById("product-img");
  //---------------------------
  nameInput.value = "";
  descriptionInput.value = "";
  priceInput.value = "";
  brandInput.value = "";
  urlInput.value = "";
  showGreenAlert("Reset svuotato");
};
//----------------------------------------------------------------------------------



//-------------------------------|Reset button event|---------------
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", function (e) {
  let text;
  if (confirm("Are you sure?") == true) {
    text = "You pressed OK!";
    emptyForm();
  } else {
    text = "You canceled!";
  }
});
//-----------------------------------------------------------------

//-------------------------------|Save button event|---------------
formReference.addEventListener("submit", function (e) {
  e.preventDefault();
  saveProduct();
});
//-----------------------------------------------------------------

//----------------------------------------------------------|Edit product|--------------------------------------------------------------
if (productId) {
  document.getElementById("save-button").innerText = "Edit";
  document.querySelector("h1").innerText = "Edit item";
  const buttonContainer = document.getElementById("form-buttons");
  const newDeleteButton = document.createElement("span");
  newDeleteButton.classList.add("w-6/12");
  newDeleteButton.innerHTML = ` <button
id="delete-btn" type="button"
  class="w-full bg-xblue text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-xdarkblue transition duration-300">Delete</button>`;
  buttonContainer.appendChild(newDeleteButton);

  fetch(URL + productId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3OWVlN2RhNTNjMTAwMTRhOTY5MDAiLCJpYXQiOjE2ODg3MTU5NjEsImV4cCI6MTY4OTkyNTU2MX0.CsC1w9VTwn-PZbjDXrVueHReS_opsja0HlPcUGeHSxk",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel recupero dati");
      }
    })
    .then((data) => {
      showGreenAlert("Contenuto caricato correttamente");
      console.log(data);

      //-------------------------------|Form reference|---------
      const nameInput = document.getElementById("product-name");
      const brandInput = document.getElementById("product-brand");
      const descriptionInput = document.getElementById("product-description");
      const priceInput = document.getElementById("product-price");
      const urlInput = document.getElementById("product-img");
      //--------------------------------------------------------
      //-------------------------------|Compile form|-----------
      nameInput.value = data.name;
      brandInput.value = data.brand;
      descriptionInput.value = data.description;
      priceInput.value = data.price;
      urlInput.value = data.imageUrl;
      //----------------------------------------------------
    })
    .catch((err) => {
      console.log(err);
      showRedAlert(err);
    });
  //------------------------------------------------------------------------------

  //-------------------------------------------------------|Delete item|-----------------------------------------------
  const deleteButton = document.getElementById("delete-btn");
  deleteButton.addEventListener("click", function () {
    let text;
    if (confirm("Are you sure?") == true) {
      text = "You pressed OK!";

      fetch(URL + productId, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3OWVlN2RhNTNjMTAwMTRhOTY5MDAiLCJpYXQiOjE2ODg3MTU5NjEsImV4cCI6MTY4OTkyNTU2MX0.CsC1w9VTwn-PZbjDXrVueHReS_opsja0HlPcUGeHSxk",
        },
      })
        .then((res) => {
          if (res.ok) {
            showGreenAlert("Evento eliminato");
            location.assign("index.html");
          } else {
            throw new Error("Problema nell'eliminazione dell'evento");
          }
        })
        .catch((err) => {
          console.log(err);
          showRedAlert(err);
        });
    } else {
      text = "You canceled!";
    }
  });
}
//-------------------------------------------------------------------------------------------------------------------

//-------------------------------|Save Product Function|--------------------------------------------------------------
const saveProduct = function () {
  //-------------------------------|Form reference|-----------
  const nameInput = document.getElementById("product-name");
  const brandInput = document.getElementById("product-brand");
  const descriptionInput = document.getElementById("product-description");
  const priceInput = document.getElementById("product-price");
  const urlInput = document.getElementById("product-img");
  //----------------------------------------------------------------

  //--|Product to send|--
  const newProduct = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: urlInput.value,
    price: priceInput.value,
  };

  let urlToUse = URL;
  let methodToUse = "POST";
  if (productId) {
    methodToUse = "PUT";
    urlToUse = URL + productId;
  }

  fetch(urlToUse, {
    method: methodToUse,
    body: JSON.stringify(newProduct),
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
        throw new Error("Errore nella chiamata");
      }
    })
    .then((data) => {
      console.log(data);

      emptyForm();
    })
    .catch((err) => {
      console.log(err);
      showRedAlert(err);
    });
};
//------------------------------------------------------------------------------------------------------------------
