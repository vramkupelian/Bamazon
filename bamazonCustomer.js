const mysql = require("mysql");
const inquirer = require("inquirer");
// const async = require("async");

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazonDB"
});

connection.connect(function(error){
    if(error){
        console.log(error);
    }
    // console.log(`Connect as id ${connection.threadId}`);
});

function start (){
    console.log("Here is our product list: ");
    connection.query("SELECT * FROM products", function (error, results){
        if (error){
            console.log(error);
        }
    
        for(var i=0; i<results.length;i++){
            console.log("ID#: " + results[i].item_id + " | Product: " + results[i].product_name + " | Department: " + results[i].department_name + " | Price($): " +
             results[i].price + " | Stock left: " + results[i].stock_quantity);
        }
         whichProduct();
    })  
}

function whichProduct(){
        inquirer.prompt([
            {
                type: "input",
                message: "\nWhat is the ID# of the item you'd like to purchase?",
                name: "purchaseItemNumber",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                  }
            },
            {
                type: "input",
                message: "\nHow many would you like to purchase?",
                name: "purchaseQuantity",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                  }
            }
        ]).then(function(inqResponse){
            
            if(inqResponse.purchaseItemNumber){
              
                connection.query(
                    "SELECT * FROM products WHERE ?",
                    [
                      {
                        item_id: inqResponse.purchaseItemNumber
                      }
                    
                    ],function(error,results){
                        if (error){throw error}

                        if(inqResponse.purchaseQuantity > results[0].stock_quantity){
                            console.log("Insufficient Quantity! We only have " + results[0].stock_quantity + " left.");
                        }else{
                            console.log("\n");
                            console.log("ID#: " + results[0].item_id);
                            console.log("Product: " + results[0].product_name);
                            console.log("Price: " + results[0].price);
                            console.log("Quantity Requested: " + inqResponse.purchaseQuantity);  
                            console.log("Total($): " + results[0].price*inqResponse.purchaseQuantity); 

                            connection.query("UPDATE products SET ? WHERE ?",[
                            {
                                stock_quantity: results[0].stock_quantity - inqResponse.purchaseQuantity,
                                product_sales: results[0].product_sales + (results[0].price * inqResponse.purchaseQuantity)
                            },
                            {
                                item_id: inqResponse.purchaseItemNumber
                            }])
                        }                      
                    })
            }
            start();
        })
    }
start();
// start().then(whichProduct);