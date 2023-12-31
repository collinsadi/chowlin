const express = require("express")
const router = express.Router()





const checkLogin = (request, response,next)=>{

    const jwt = request.cookies.jwt

    if (!jwt) {
        
     return   response.redirect("/store")
    }

    next()

}



router.get("/user/dashboard",checkLogin, (request, response) => {
    
    response.render("user/dashboard")
})
router.get("/user/dashboard/orders",checkLogin, (request, response) => {
    
    response.render("user/orders")
})
router.get("/user/dashboard/payments",checkLogin, (request, response) => {
    
    response.render("user/transactions")
})
router.get("/user/dashboard/wallet",checkLogin, (request, response) => {
    
    response.render("user/wallet")
})
router.get("/user/dashboard/settings",checkLogin, (request, response) => {
    
    response.render("user/settings")
})

router.get("/auth/user/password/reset/:token", (request, response) => {
    
    response.render("user/passwordReset")
})

router.get("/user/orders/invoice/:orderid",checkLogin, (request, response) => {
    
    response.render("user/invoice")
})


module.exports = router