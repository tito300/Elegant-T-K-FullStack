const express = require('express');
const router = express.Router();

router.get('/', (req, res)=> {
    res.render('index', {"user": req.user});
})

router.get("/top-sellers", (req, res)=> {

    res.render("partials/top-sellers", { 
        "user": req.user,

        "top": [{
        id: "12395930095",    
        title: "Christmas t-shirt",
        discreption: "This is a special t-shirt for Christmas season",
        photo: "imgs/christmas-1.jpg",
        price: 24.99
    },{
        id: "123959300903059",
        title: "Funny coding t-shirt",
        discreption: "If you love coding, this is for you",
        photo: "imgs/coding-1.jpg",
        price: 19.99
    },{
        id: "1239234425930095",
        title: "Hunting t-shirt",
        discreption: "This is a special t-shirt for Hunting season",
        photo: "imgs/hunting-1.jpg",
        price: 29.99
    },{
        id: "123959334320095",
        title: "Hunting funny t-shirt",
        discreption: "This is a funny t-shirt for Hunting season",
        photo: "imgs/hunting-2.jpg",
        price: 14.99
    },{
        id: "121233395930334095",
        title: "Hunting t-shirt",
        discreption: "This is a special t-shirt for Hunting season",
        photo: "imgs/hunting-1.jpg",
        price: 29.99
    },{
        id: "12395930043333395",
        title: "Hunting funny t-shirt",
        discreption: "This is a funny t-shirt for Hunting season",
        photo: "imgs/hunting-2.jpg",
        price: 14.99
    }]})
})

module.exports = router;