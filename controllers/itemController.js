import Item from "../models/item.js";

export function saveItem(req,res){
    if(req.user.role != "admin"){
            res.json({
                message : "Unauthorized access!"
            })
            return
    }
    const item = new Item(req.body)
    item.save().then(
        ()=>{
            res.json({
                "message":"Item saved successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                "message":"Item not saved"
            })
        }
    )
}
export function getAllItems(req,res){
    Item.find().then(
        (items)=>{
            res.json(items)
        }
    ).catch(
        ()=>{
            res.json({
                "message": "An error occured"
            })
        }
    )
}