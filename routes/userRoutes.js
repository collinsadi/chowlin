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



module.exports = router