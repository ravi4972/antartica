create table users (email varchar(255) primary key,password varchar(255) not null);

create table employees (firstName varchar(255) not null,lastName varchar(255),employeeID varchar(255) primary key,organization varchar(255) not null,email varchar(255) not null,FOREIGN KEY (email) REFERENCES users(email));