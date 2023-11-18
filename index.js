const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const cron = require("node-cron");
const axios = require("axios");
const serverUrl = "https://chowlin.onrender.com/"
const apiUrl = "https://chowlinapi.onrender.com/"

// cron to keep server online (runs every 5 minutes)
cron.schedule("*/10 * * * *", () => {
  try {
    console.log("cron running for server");
    axios.get(serverUrl);
    axios.get(apiUrl)
  } catch (e) {
    console.log(e.message);
  }
});


const navRoutes = require("./routes/navRoutes")
const userRoutes = require("./routes/userRoutes")
const vendorRutes = require("./routes/vendorRoutes")

const port = process.env.PORT || 3000

app.listen(port, () => {
    
    console.log("Server Started On Port 3000")
})




app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(cookieParser())



app.use(navRoutes)
app.use(userRoutes)
app.use(vendorRutes)

app.get('/user/logout', (req, res) => {
  
  res.clearCookie('jwt').redirect('/store')

})

app.use((request, response)=>{

  response.status(404).render("nav/404")

})