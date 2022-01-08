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

create table categories(
	id int not null auto_increment,
    name varchar(20),
    primary key (id)
);

create table authors(
	id int not null auto_increment,
    name varchar(20),
    primary key (id)
);

create table location(
	id int not null auto_increment,
    name varchar(20),
    primary key (id)
);

create table books (
	id int not null auto_increment PRIMARY KEY,
	title varchar(50) default null,
    description varchar(150) default null,
    isbn varchar(50) default null,
    cover varchar(150) default null,
    digital varchar(150) default null,
    year timestamp,
    category_id int,
    author_id int,
    location_id int,
    created timestamp default CURRENT_TIMESTAMP,
    updated timestamp default CURRENT_TIMESTAMP,
    borrowed int(1) default 0,),
    CONSTRAINT fk_author_id FOREIGN KEY (author_id) references authors(id),
    CONSTRAINT fk_category_id FOREIGN KEY (category_id) references categories(id),
    CONSTRAINT fk_location_id FOREIGN KEY (location_id) references location(id)
);


SELECT b.*, a.name as author_name, c.name as category_name FROM books as b INNER JOIN authors as a ON b.author_id = a.id INNER JOIN categories as c ON b.category_id = c.id


INSERT INTO `users`(`name`) VALUES ('Administrator');
INSERT INTO `users`(`name`) VALUES ('Standard');
INSERT INTO `users`(`name`) VALUES ('Reader');

INSERT INTO `authors`(`name`) VALUES ('Charles Bukowski');
INSERT INTO `authors`(`name`) VALUES ('Frank Kafka');
INSERT INTO `authors`(`name`) VALUES ('Neville Goddard');

INSERT INTO `categories`(`name`) VALUES ('Terror');
INSERT INTO `categories`(`name`) VALUES ('Drama');
INSERT INTO `categories`(`name`) VALUES ('Fantasy');

INSERT INTO `location`(`name`) VALUES ('Locker 1');
INSERT INTO `location`(`name`) VALUES ('Locker 2');
INSERT INTO `location`(`name`) VALUES ('Locker 3');