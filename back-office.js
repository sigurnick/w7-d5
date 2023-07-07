
const formReference = document.querySelector('form')
const addressBarContent = new URLSearchParams(location.search) 
const productId = addressBarContent.get('id')
const URL = 'https://striveschool-api.herokuapp.com/api/product/'
console.log(productId);





//-------------------------------|Form rreset function|-------------------------
const emptyForm = function(){
    const nameInput = document.getElementById('product-name')
    const brandInput = document.getElementById('product-brand')
    const descriptionInput = document.getElementById('product-description')
    const priceInput = document.getElementById('product-price')
    const urlInput = document.getElementById('product-img')
    //---------------------------
    nameInput.value = ''
    descriptionInput.value = ''
    priceInput.value = ''
    brandInput.value = ''
    urlInput.value = ''
}
//----------------------------------------------------------------------------------





//-------------------------------|Reset button event|---------------
const resetButton = document.getElementById('reset-button')
resetButton.addEventListener('click', function(e){
    emptyForm()
})
//-----------------------------------------------------------------





//-------------------------------|Save button event|---------------
formReference.addEventListener('submit', function(e){
    e.preventDefault()
    saveProduct() 
})
//-----------------------------------------------------------------








//-------------------------------|Edit product|--------------------------------------------------------------
if(productId){
document.getElementById('save-button').innerText = 'Edit'
document.querySelector('h1').innerText = 'Edit item'
const buttonContainer = document.getElementById('form-buttons')
const newDeleteButton = document.createElement('span')
newDeleteButton.classList.add('w-6/12')
newDeleteButton.innerHTML = ` <button
id="delete-button" type="button"
  class="w-full bg-xblue text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-xdarkblue transition duration-300">Save</button>`
  buttonContainer.appendChild(newDeleteButton)


fetch(URL + productId, {
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3OWVlN2RhNTNjMTAwMTRhOTY5MDAiLCJpYXQiOjE2ODg3MTU5NjEsImV4cCI6MTY4OTkyNTU2MX0.CsC1w9VTwn-PZbjDXrVueHReS_opsja0HlPcUGeHSxk",
        },
})
.then((res)=>{
    if(res.ok){
        return res.json()
    }else{
        throw new Error('Errore nel recupero dati')
    }
})
.then((data)=>{

    console.log(data);

//-------------------------------|Form reference|-----------
const nameInput = document.getElementById('product-name')
const brandInput = document.getElementById('product-brand')
const descriptionInput = document.getElementById('product-description')
const priceInput = document.getElementById('product-price')
const urlInput = document.getElementById('product-img')
//--------------------------------------------------------
//-------------------------------|Compile form|-----------
nameInput.value = data.name
brandInput.value = data.brand
descriptionInput.value = data.description
priceInput.value = data.price
urlInput.value = data.imageUrl
//--------------------------------------------------------------

})
.catch((err)=>{
    console.log(err);
})
//------------------------------------------------------------------------------------------------------------------
}












//-------------------------------|Save Product Function|--------------------------------------------------------------
const saveProduct = function (){
    

//-------------------------------|Form reference|-----------
const nameInput = document.getElementById('product-name')
  const brandInput = document.getElementById('product-brand')
  const descriptionInput = document.getElementById('product-description')
  const priceInput = document.getElementById('product-price')
  const urlInput = document.getElementById('product-img')
//----------------------------------------------------------------

 //--|Product to send|--
 const newProduct = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: urlInput.value,
    price: priceInput.value,
  }
  
  let urlToUse = URL
  let methodToUse = 'POST'
  if(productId){
    methodToUse = 'PUT'
    urlToUse = URL + productId
  }
  console.log(methodToUse);


    fetch(urlToUse, {
        method: methodToUse,
        body: JSON.stringify(newProduct),
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

        emptyForm()
    })
    .catch((err)=>{
        console.log(err);
    })
}
//------------------------------------------------------------------------------------------------------------------











