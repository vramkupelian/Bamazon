
# Bamazon
Node and MySQL integration.

Tools:
\n Node.js
\n MySQL Workbench
\n VS code

bamazon.sql to be run to set up the database. 

# For node:
npm install inquirer
npm install mysql
npm install console.table (only for bamazonSupervisor.js)


# How does it work?

---For customers---
Type into commmand line: node bamazonCustomer.js
This will display the inventory and ask the customer what they would like to purchase and how many. Will repeat back the order with the total.
![customer](/customer.jpg)

---For manager---
Command Line: node bamazonManager.js
One can check inventory as well as any item that's running low (<=5 stock) inventory. One can choose to replenish inventory...
![manager](/manager1.jpg)

... or choose to add an entirely new product into the inventory.
![manager](/manager2.jpg)

---For Supervisor---
Command line: node bamazonSupervisor.js
This will allow the supervisor to view the department sales, costs and profits. Additionally, they can add a department, which also asks supervisor to enter the first product of that department.
![supervisor](/supervisor.jpg)
