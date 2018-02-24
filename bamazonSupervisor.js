const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazonDB",
});

function inquire(){
    inquirer.prompt({
        type: "rawlist",
        message: "What would you like to do?",
        choices: ["View Product Sales by Department","Create New Department"],
        name: "theChoice",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
        }
    }).then(function(inqResponse){
        switch(inqResponse.theChoice){
            case "View Product Sales by Department":
                viewSales();
                break;

            case "Create New Department":
                createDept();
                break;  
        }
    })
}

function viewSales(){
    
    connection.query("SELECT departments.department_name, departments.over_head_costs,SUM(products.product_sales) as Dept_Sales,(SUM(products.product_sales)-over_head_costs) as Total_Profits FROM departments right JOIN products ON departments.department_name = products.department_name GROUP BY department_name;",
    function (error, results){
        if (error){
            console.log(error);
        }

            console.table(results);
      inquire();  
    })
}

function createDept(){
    inquirer.prompt([{
        type: "input",
        message: "What is the name of the department?",
        name: "deptName",
    },
    {
        type: "input",
        message: "What are the overhead costs of this department?",
        name: "ohCosts",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
        }
    },
    {
        type:"input",
        message: "What product will you sell in this department?",
        name: "productName",
    },
    {
        type:"input",
        message: "At what price will it be sold?",
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
        message: "How many should we stock?",
        name: "theAmount",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
        }
    }
    ]).then(function(inqResponse){

        connection.query("INSERT INTO products SET ?",
        {
            product_name: inqResponse.productName,
            price: inqResponse.thePrice,
            stock_quantity: inqResponse.theAmount,
            department_name: inqResponse.deptName
        },
        function(error,results){
            if(error){console.log(error);}
        })

        connection.query("INSERT INTO departments SET ?",
        {
            department_name: inqResponse.deptName,
            over_head_costs: inqResponse.ohCosts,
        }, 
        function(error,results){
            if(error){console.log(error);}
            console.log(results.affectedRows + " department inserted!\n");
        })

        inquire();
    })
}

inquire();