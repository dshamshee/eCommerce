const express = require("express");
const router = express.Router();
const returnOrderModel = require("../model/returnOrder");
const isLoggedIn = require("../middleware/isLoggedIn");


// Create return order
router.post("/create-return-order", isLoggedIn, async(req, res)=>{
    try {
        const {orderId, bankDetails, reason} = req.body;
        const returnOrder = await returnOrderModel.create({
            orderId,
            bankDetails: {
                AccountHolderName: bankDetails.accountHolderName,
                AccountNumber: bankDetails.accountNumber,
                IFSC: bankDetails.ifsc
            },
            reason
        });
        if(!returnOrder){
            return res.status(404).json({message: "Return order not created"});
        }
        
        return res.status(200).json({message: "Return order created successfully"});
    } catch (error) {
        console.log("Error in create return order", error);
        return res.status(500).json({message: error.message});
    }
})

module.exports = router;