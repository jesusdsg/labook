create database labook;
use labook;

create table rols(
	id int not null auto_increment,
    name varchar(20),
    primary key (id)
);

create table users (
	id int not null auto_increment PRIMARY KEY,
	username varchar(50) default null UNIQUE,
    password varchar(150) default null, //For hashes
    email varchar(50) default null UNIQUE,
    firstname varchar(50),
    lastname varchar(50),
    address varchar(20),
    phone varchar(20),
    rol_id int,
    created timestamp default CURRENT_TIMESTAMP,
    updated timestamp default CURRENT_TIMESTAMP,
    CONSTRAINT fk_rol_id FOREIGN KEY (rol_id) references rols(id)
);