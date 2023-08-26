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
router.get("/auth/login", (request, response) => {
    
    response.render("auth/login")
})
router.get("/auth/signup", (request, response) => {
    
    response.render("auth/signup")
})



module.exports = router