DROP GRAPH forbidden_history CASCADE;
CREATE GRAPH forbidden_history;
SET graph_path = forbidden_history;

-- Juridical Entities
-- Node
CREATE VLABEL juridical_entity;
-- Data
CREATE (n:juridical_entity {name: 'Holy See', fromdate:'325'});

-- Countries
-- Node
CREATE VLABEL country;
-- Relations
CREATE ELABEL belongs_to;
-- Data
CREATE (n:country {name: 'Switzerland', fromdate:'1291-08-01'});
CREATE (n:country {name: 'USA', fromdate:'1776-07-04'});
CREATE (n:country {name: 'England'});
CREATE (n:country {name: 'France', fromdate:'481'});
CREATE (n:country {name: 'Italy'});
CREATE (n:country {name: 'Vatican City', fromdate:'1929'});
MATCH  (s:country {name: 'Vatican City'}),(d:juridical_entity {name: 'Holy See'}) CREATE (s)-[:belongs_to]->(d);

-- Cities
-- Node
CREATE VLABEL city;
-- Relations
CREATE ELABEL is_situated_in;
-- Data
CREATE (n:city {name: 'Geneva'});
MATCH  (s:city {name: 'Geneva'}),(d:country {name: 'Switzerland'}) CREATE (s)-[:is_situated_in]->(d);
CREATE (n:city {name: 'Rome'});
MATCH  (s:city {name: 'Rome'}),(d:country {name: 'Italy'}) CREATE (s)-[:is_situated_in]->(d);
CREATE (n:city {name: 'London'});
MATCH  (s:city {name: 'London'}),(d:country {name: 'England'}) CREATE (s)-[:is_situated_in]->(d);
CREATE (n:city {name: 'Paris'});
MATCH  (s:city {name: 'Paris'}),(d:country {name: 'France'}) CREATE (s)-[:is_situated_in]->(d);

-- Place
-- Node
CREATE VLABEL place;
-- Relations
-- CREATE ELABEL is_situated_in;
-- Data
CREATE (n:place {name: 'City of London'});
MATCH  (s:place {name: 'City of London'}),(d:city {name: 'London'}) CREATE (s)-[:is_situated_in]->(d);
CREATE (n:place {name: 'Temple Mountain'});

-- Forces
-- Node
CREATE VLABEL force;
-- Relations
-- CREATE ELABEL recruited;
CREATE ELABEL serves;
-- Data
CREATE (n:force {name: 'Pontifical Swiss Guard', fromdate:'1506-01-22'});
MATCH  (s:force {name: 'Pontifical Swiss Guard'}),(d:country {name: 'Switzerland'}) CREATE (s)-[:belongs_to]->(d);
MATCH  (s:force {name: 'Pontifical Swiss Guard'}),(d:juridical_entity {name: 'Holy See'}) CREATE (s)-[:serves]->(d);

-- Orders
-- Node
CREATE VLABEL "order";
-- Relations
CREATE ELABEL controls;
-- Data
CREATE (n:"order" {name: 'Knights Templar', other_name:'Order of Solomon''s Temple', fromdate:'1118', todate:'1312-03-22'});
MATCH  (s:"order" {name: 'Knights Templar'}),(d:juridical_entity {name: 'Holy See'}) CREATE (s)-[:serves]->(d);
MATCH  (s:"order" {name: 'Knights Templar'}),(d:place {name: 'Temple Mountain'}) CREATE (s)-[:controls]->(d);
CREATE (n:"order" {name: 'Freemasonry', fromdate:'1717-06-24'});
MATCH  (s:"order" {name: 'Freemasonry'}),(d:city {name: 'London'}) CREATE (s)-[:is_situated_in]->(d);
MATCH  (s:"order" {name: 'Freemasonry'}),(d:country {name: 'USA'}) CREATE (s)-[:is_situated_in]->(d);
MATCH  (s:"order" {name: 'Freemasonry'}),(d:city {name: 'Geneva'}) CREATE (s)-[:is_situated_in]->(d);
CREATE (n:"order" {name: 'Les Neuf Sœurs', fromdate:'1776'});
MATCH  (s:"order" {name: 'Les Neuf Sœurs'}),(d:city {name: 'Paris'}) CREATE (s)-[:is_situated_in]->(d);
MATCH  (s:"order" {name: 'Les Neuf Sœurs'}),(d:"order" {name: 'Freemasonry'}) CREATE (s)-[:belongs_to]->(d);

-- Endowments
-- Node
CREATE VLABEL endowment;
-- Data
CREATE (n:endowment {name: 'Jerusalem Islamic Waqf'});
MATCH  (s:endowment {name: 'Jerusalem Islamic Waqf'}),(d:place {name: 'Temple Mountain'}) CREATE (s)-[:controls]->(d);

-- Persons
-- Node
CREATE VLABEL person;
-- Relations
CREATE ELABEL lives_in;
CREATE ELABEL member_of;
CREATE ELABEL related;
CREATE ELABEL knows;
-- Data
CREATE (n:person {name: 'Benjamin Franklin', fromdate:'1706-01-17', todate:'1790-01-17'});
MATCH  (s:person {name: 'Benjamin Franklin'}),(d:"order" {name: 'Freemasonry'}) CREATE (s)-[:member_of]->(d);
MATCH  (s:person {name: 'Benjamin Franklin'}),(d:"order" {name: 'Les Neuf Sœurs'}) CREATE (s)-[:member_of]->(d);
MATCH  (s:person {name: 'Benjamin Franklin'}),(d:city {name: 'Paris'}) CREATE (s)-[:lives_in]->(d);
