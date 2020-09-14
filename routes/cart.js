'use strict';

const fs = require('fs');
const readFile = require('./products').readFile;

exports.addItemstoCart = (req, res) => {

    console.log("addItemstoCart : Initiate ");

    let data = JSON.stringify(req.body);

    addItems(data)
        .then(resp => {

            console.log("addItemstoCart : Success ");
            res.send(resp);

        }).catch(error => {

            console.log("addItemstoCart : Failure " + error);
            res.send(error);
        });
}

/**
 * save each item in the basket to cart
 * @param {*} data 
 */
const addItems = (data) => {

    return new Promise((resolve, reject) => {

        fs.writeFile('./json/cart.json', data, (error) => {

            if (error) reject(error);

            console.log("items added to cart");
            resolve('Success');
        });
    });
}


exports.getCartItems = (req, res) => {

    console.log("getCartItems : Initiate");

    readFile('./json/cart.json')
    .then( data => {

        var total = 0;
        var discount = 0;
        const items = [];

        data.forEach(element => {
            items.push(element.item);
            discount = discount + ( element.discount * element.quantity);
            total = total + ((element.price * element.quantity) - (element.discount * element.quantity));
        });

        if ( total > 150 ) {
            total = total - 20;
            discount = discount + 20;
        }
        console.log("getCartItems : Success");
        res.send({items, total, discount});

    }).catch(error => {

        console.log("getCartItems : Failure" + error);
        res.send(error);
    });
}