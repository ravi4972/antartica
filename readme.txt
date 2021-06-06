
About web service
Antartica RESTful web service contains 4 endpoints with base URL as 'https://ravinode.herokuapp.com/api/v1'
This web service suppport basic authentication and JWT token for authorization.
For database we are using postgree database and express module for REST implementation.


Please refer 'Antartica .postman_collection.json' file for endpoint details

Regarding file Structure:
app.js file is responsible for starting web service and database connection. On having successfull connection it will listen request on /api/v1/ path and refer it to router.js
file. 
On having successfull routing it will code functional call in functions.js code v1 folder.
.env file will be in root folder with configuration details of DB and token.

Error handel mechanism:
Every request will be validated before further action. Like checking if payload is empty or not.
For duplicate email in registration, API will handle that error and send proper response.
For sorting endpoint , if query passed by client is not column in database is also handeled by endpoint with proper message.


Table used:
1.users
  Column: email,password
2.employees
  Column : firstname,lastname,employeeid,organization,email


 