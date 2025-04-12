import Item from "../models/item.js";

export function saveItem(req,res){
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