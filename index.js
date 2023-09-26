const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const cron = require("node-cron");

cron.schedule("*/10 * * * *", () => {
  console.log("Welcome to Chowlin");
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