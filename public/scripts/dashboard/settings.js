const personalSettings = document.getElementById("personal-settings")
const securitySettings = document.getElementById("security-settings")
const walletSettings = document.getElementById("wallet-settings")
const notificationSettings = document.getElementById("notification-settings")

const activeSectionText = document.getElementById("active-settings")



const personalButton = document.getElementById("personal_btn")
const securityButton = document.getElementById("security_btn")
const walletButton = document.getElementById("wallet_btn")
const notificationButton = document.getElementById("noti_btn")


securityButton.addEventListener("click", () => {
    
    personalSettings.style.display = "none"
    securitySettings.style.display = "block"
    walletSettings.style.display = "none"
    notificationSettings.style.display = "none"



    activeSectionText.innerHTML = "Security"


    securityButton.classList.add("active")
    personalButton.classList.remove("active")
    walletButton.classList.remove("active")
    notificationButton.classList.remove("active")

})



personalButton.addEventListener("click", () => {
    
    personalSettings.style.display = "block"
    securitySettings.style.display = "none"
    walletSettings.style.display = "none"
    notificationSettings.style.display = "none"



    activeSectionText.innerHTML = "Personal Information"


    securityButton.classList.remove("active")
    personalButton.classList.add("active")
    walletButton.classList.remove("active")
    notificationButton.classList.remove("active")

})


walletButton.addEventListener("click", () => {
    
    personalSettings.style.display = "none"
    securitySettings.style.display = "none"
    walletSettings.style.display = "block"
    notificationSettings.style.display = "none"



    activeSectionText.innerHTML = "Wallet"


    securityButton.classList.remove("active")
    personalButton.classList.remove("active")
    walletButton.classList.add("active")
    notificationButton.classList.remove("active")

})

notificationButton.addEventListener("click", () => {
    
    personalSettings.style.display = "none"
    securitySettings.style.display = "none"
    walletSettings.style.display = "none"
    notificationSettings.style.display = "block"



    activeSectionText.innerHTML = "Notification"


    securityButton.classList.remove("active")
    personalButton.classList.remove("active")
    walletButton.classList.remove("active")
    notificationButton.classList.add("active")

})

