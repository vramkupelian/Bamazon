const mysql = require("mysql");
const inquirer = require("inquirer");

var connection  = mysql.createConnection({
host: "127.0.0.1",
port: 3306,
user: "root",
password: "",
database: "bamazonDB",
});

connection.connect(function(error){
    if(error){
        console.log(error);
        console.log("Something went wrong");
    }
});

function inquire(){
    inquirer.prompt({
        type: "rawlist",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory",
        "Add to Inventory", "Add New Product"],
        name: "theChoice",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
    }).then(function(inqResponse){
        switch(inqResponse.theChoice){
            case "View Products for Sale":
                viewStock();
                break;

            case "View Low Inventory":
                lowInventory();
                break;

            case "Add to Inventory":
                addInventory();
                break;

            case  "Add New Product":
                addProduct();
                break;   
        }
    })
}

function viewStock(){
    console.log("Here is our product list: ");
    connection.query("SELECT * FROM products", function (error, results){
        if (error){
            console.log(error);
        }
        for(var i=0; i<results.length;i++){
            console.log("ID#: " + results[i].item_id + " | Product: " + results[i].product_name + " | Department: " + results[i].department_name + " | Price($): " +
             results[i].price + " | Stock left: " + results[i].stock_quantity);
        }
    inquire();  
    })
}

function lowInventory(){
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5" , function(error, results){
        if(error){console.log(error);}

        console.log("These items are low on inventory:");
        for(var i=0; i<results.length;i++){
            console.log("ID#: " + results[i].item_id + " | Product: " + results[i].product_name + " | Department: " + results[i].department_name + " | Price($): " +
            results[i].price + " | Stock left: " + results[i].stock_quantity);
        }
    inquire();    
    })
}

function addInventory(){
    inquirer.prompt([
        {
        type: "input",
        message: "What is the ID# of the item of which you'd like to add to inventory?",
        name: "theID",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
        {
        type: "input",
        message: "How many units would you like to add to inventory?",
        name: "theAmount",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
    }]).then(function(inqResponse){

        connection.query(`UPDATE products SET stock_quantity = stock_quantity + ${inqResponse.theAmount} WHERE item_id = ${inqResponse.theID}`,
      
            function(error, results){
                if(error){console.log(error);}
            })     
        inquire();
    }) 
}

function addProduct(){
    inquirer.prompt([
        {
        type: "input",
        message: "What is the product you'd like to add?",
        name: "theProduct"
        },
        {
           type: "input",
           message: "In which department will this item be sold?",
           name: "theDept", 
        },
        {
            type: "input",
            message:"At what price will the item be sold?",
            name: "thePrice",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
        },
        {
            type: "input",
            message: "How many units should be stocked?",
            name: "theAmount",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
        }]).then(function(inqResponse){
            console.log("Inserting a new product...\n");
            var query = connection.query(
                "INSERT INTO products SET ?",
            {
            product_name: inqResponse.theProduct,
            department_name: inqResponse.theDept,
            price: inqResponse.thePrice,
            stock_quantity: inqResponse.theAmount
            },
            function(err, res) {
                if(err){console.log(err);}
            // console.log(res.affectedRows + " product inserted!\n");
            inquire();
            }
        );
        // inquire();
        })
}


inquire();