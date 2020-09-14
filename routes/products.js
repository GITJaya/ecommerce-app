const fs = require('fs');


exports.getProducts = (req, res) => {

    console.log("getProducts :  Initiate ");

    readFile('./json/product.json')
        .then(data => {

            console.log("getProducts : Success ");
            res.send(data.items);

        }).catch(error => {

            console.log("getProducts : Failure " + error);
            res.send(error);
        });
}

/**
 * Read json Items
 */

const readFile = (path) => {
    return new Promise((resolve, reject) => {

        fs.readFile(path, (err, data) => {
            if (err) reject(err);
            let product = JSON.parse(data);
            resolve(product);
        });
    });
}

module.exports.readFile = readFile;

