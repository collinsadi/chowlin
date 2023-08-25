const express = require("express")
const app = express()

const navRoutes = require("./routes/navRoutes")


const port = process.env.PORT || 3000

app.listen(port, () => {
    
    console.log("Server Started On Port 3000")
})




app.use(express.static("public"))
app.set("view engine","ejs")
app.use(navRoutes)