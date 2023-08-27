// alert("connected")
const cookie = document.cookie.split("=")[1]
// const url = "https://chowlinapi.onrender.com"
const url = "http://localhost:5000"




const setCookie = (name,value,days) => {
    
    const expirationDate = new Date();

    expirationDate.setDate(expirationDate.getDate() + days);

    const expires = `expires=${expirationDate.toUTCString()}`

    document.cookie=`${name}=${value};${expires}; path=/`

}