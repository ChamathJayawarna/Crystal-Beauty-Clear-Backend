import Order from "../models/order.js"


export function createOrder(req,res){
    if(req.user == null){
        res.status(401).json({
            message : "You must be logged first"
        })
        return
    }
    const body = req.body
    const orderData = {
        orderId : "",
        email : req.user.email,
        productName : body.productName,
        address : body.address,
        phoneNumber : body.phoneNumber,
        billItems : [],
        subTotal : 0,
        discountTotal : 0,
        finalTotal : 0
    }
    Order.find().sort({
        date: -1,
    }).limit(1).then(
        (lastBills)=>{
            if(lastBills.length == 0){
                orderData.orderId = "ORD00001"
            }else{
                const lastBill = lastBills[0]
                const lastOrderId = lastBill.orderId // ORD00551
                const lastOrderNumber = lastOrderId.replace("ORD","") // 00551
                const lastOrderNumberInt = parseInt(lastOrderNumber) //551
                const newOrderNumberInt = lastOrderNumberInt + 1 //552
                const newOrderNumberStr = newOrderNumberInt.toString().padStart(4,'0') // 00552
                orderData.orderId = "ORD"+newOrderNumberStr
            }

            for(let i = 0; i < body.billItems.length; i++){

                const billItem = body.billItems[i]
                // check product exist

            }

            const order = new Order(orderData)
            order.save().then(
                ()=>{
                    res.json({
                        message: "Order saved successfully"
                    })
                }
            ).catch(
                ()=>{
                    res.status(500).json({
                        message: "Order not saved"
                    })
                }
            )

        }
    )

}

export function getOrders(req,res){

    if(req.user == null){
        res.status(401).json(
            {
                message: "You must be logged in first"
            }
        )
        return
    }
    if(req.user.role == "admin"){
        Order.find().then(
            (orders)=>{
                res.json(orders)
            }
        ).catch(
            (err)=>{
                res.status(500).json({
                    message: "Orders are not found"
                })
            }
        )
    }else{
        Order.find({
            email: req.user.email
        }).then(
            (orders)=>{
                res.json(orders)
            }
        ).catch(
            (err)=>{
                res.status(500).json({
                    message: "Orders are not found"
                })
            }
        )
    }
}