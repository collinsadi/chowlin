const express = require("express")
const router = express.Router()





const checkLogin = (request, response,next)=>{

    const jwt = request.cookies.jwt

    if (!jwt) {
        
     return   response.redirect("/store")
    }

    next()

}


router.get("/vendor/dashboard",checkLogin, (request, response) => {
    
    response.render("vendor/dashboard")
})


module.exports = router