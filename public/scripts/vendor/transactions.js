// alert("Connected Bro")


const transactionsContainer = document.getElementById("transactions-array")


const getUserTransactions = async () => {
    
 const response = await fetch(url + "/transactions/get/vendor", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization":`Bearer ${vendorCookie}`
        }
 })
    
    const data = await response.json()


    if (data.transactions.length > 0) {

    
        
        transactionsContainer.innerHTML = data.transactions.map(transaction => {


            const date = new Date(transaction.createdAt)
            
            return `
            
            <div class="single-transaction">

                <div class="transaction-icon ${transaction.transactionType === "credit" ? "credit" : ""} ${transaction.transactionType === "debit" ? "debit" : ""} ${transaction.status === "failed" ? "failed" : ""}">

                    <i class="fa-solid  ${transaction.transactionType === "credit" ? "fa-arrow-up" : "fa-arrow-down"}"></i>

                </div>

                <div class="transaction-details">

                 <p>${date.toLocaleString(undefined,{month:"short",day:"2-digit",year:"numeric"})}</p>

                <p>${transaction.description}</p>

                <h3 style="margin-top: 10px;">₦ ${transaction.amount}</h3>


                <p>${transaction.transactionType}</p>

                </div>

               

                <!-- <button>Report a Problem</button> -->


            </div>
            
            
            `


        }).join("")


    }

 //console.log(data)


}

getUserTransactions()