const express = require("express")
const router = express.Router()


router.get("/", (request, response) => {
    
    response.render("nav/home")
})
router.get("/store", (request, response) => {
    
    response.render("nav/store")
})
router.get("/store/vendors/:uniqueurl", (request, response) => {
    
    response.render("nav/vendor")
})
router.get("/about", (request, response) => {
    
    response.render("nav/about")
})



module.exports = router