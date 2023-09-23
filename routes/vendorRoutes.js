const express = require("express")
const router = express.Router()





const checkLogin = (request, response,next)=>{

    const jwt = request.cookies.jwt

    if (!jwt) {
        
     return   response.redirect("/store")
    }

    next()

}


router.get("/vendor/login.php", (request, response) => {
    
    response.render("vendor/login")
})
router.get("/vendor/login", (request, response) => {
    
    response.redirect("/vendor/login.php")
})
router.get("/vendor/dashboard",checkLogin, (request, response) => {
    
    response.render("vendor/dashboard")
})
router.get("/vendor/menu",checkLogin, (request, response) => {
    
    response.render("vendor/menu")
})
router.get("/vendor/dashboard/orders",checkLogin, (request, response) => {
    
    response.render("vendor/orders")
})
// router.get("/vendor/dashboard/me.php",checkLogin, (request, response) => {
    
//     response.render("vendor/orders")
// })


module.exports = router