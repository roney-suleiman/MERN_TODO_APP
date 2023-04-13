const router = require('express').Router();

//import todo model
const todoItemsModel = require('../models/todoitems');


// create first route , add todo to our database
router.post('/api/item', async (req, res) => {
    try{
        const newItem = new todoItemsModel({
            item: req.body.item
        })
        //save this item in database
        const saveItem = await newItem.save();
        res.status(200).json(saveItem)
    }
    catch(err){
        res.json(err)
    }
})

//create second route , get data frome database
router.get('/api/items', async (req, res) => {
    try {
        const allTodoItems = await todoItemsModel.find({})
        res.status(200).json(allTodoItems);             //return all items in database in json format
    }
    catch (err) {
        res.json(err)
    }
});

//create therd route , update item
router.put('/api/item/:id', async (req, res) => {
    try {
        //find the item by its id and update it
        const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json('item updated')
    }
    catch (err) {
        res.json(err)
    }
})


//create fourth rout, delete data from database
router.delete('/api/item/:id', async (req, res) => {
    try {
        const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
        res.status(200).json('item deleted');
    }
    catch (err) {
        res.json(err)
    }
})
//export router
module.exports = router;
