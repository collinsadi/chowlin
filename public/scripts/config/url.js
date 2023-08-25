// alert("connected")
const cookie = null
const url = "http://localhost:5000"



const setCookie = (name,value,days) => {
    
    const expirationDate = new Date();

    expirationDate.setDate(expirationDate.getDate() + days);

    const expires = `expires=${expirationDate.toUTCString()}`

    document.cookie=`${name}=${value};${expires}; path=/`

}