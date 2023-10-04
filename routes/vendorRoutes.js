const express = require("express")
const router = express.Router()





const checkLogin = (request, response,next)=>{

    const jwt = request.cookies.vend

    if (!jwt) {
        
     return   response.redirect("/store")
    }

    next()

}


router.get("/vendor/signup.php", (request, response) => {
    
    response.render("vendor/signup")
})


router.get("/vendor/signup", (request, response) => {
    
    response.redirect("/vendor/signup.php")
})


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
router.get("/vendor/dashboard/wallet",checkLogin, (request, response) => {
    
    response.render("vendor/wallet")
})
router.get("/vendor/dashboard/payments",checkLogin, (request, response) => {
    
    response.render("vendor/payments")
})
router.get("/vendor/dashboard/settings",checkLogin, (request, response) => {
    
    response.render("vendor/settings")
})
// router.get("/vendor/dashboard/me.php",checkLogin, (request, response) => {
    
//     response.render("vendor/orders")
// })
router.get("/auth/vendor/password/reset/:token", (request, response) => {
    
    response.render("vendor/passwordReset")
})

router.get("/vendor/orders/invoice/:orderid",checkLogin, (request, response) => {
    
    response.render("vendor/invoice")
})

module.exports = router