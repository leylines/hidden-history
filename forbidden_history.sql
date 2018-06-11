DROP GRAPH forbidden_history CASCADE;
CREATE GRAPH forbidden_history;
SET graph_path = forbidden_history;

-- Sovereign Entities
-- Node
CREATE VLABEL sovereign_entity;
-- Relations
CREATE ELABEL located;
CREATE ELABEL serves;
-- Data
CREATE (n:sovereign_entity {name: 'Holy See', fromdate:'325'});
CREATE (n:sovereign_entity {name: 'Knights of Malta', other_name: 'Sovereign Military Order of Malta', fromdate: '1099'});
MATCH  (s:sovereign_entity {name: 'Knights of Malta'}),(d:sovereign_entity {name: 'Holy See'}) CREATE (s)-[:serves]->(d);
CREATE (n:sovereign_entity {name: 'International Red Cross and Red Crescent Movement', other_name: 'ICRC', fromdate: '1863'});

-- Countries
-- Node
CREATE VLABEL country;
-- Relations
CREATE ELABEL belongs_to;
-- Data
CREATE (n:country {name: 'Switzerland', other_name: 'Sisters of Isis', fromdate: '1291-08-01'});
CREATE (n:country {name: 'USA', fromdate: '1776-07-04'});
CREATE (n:country {name: 'England'});
CREATE (n:country {name: 'France', fromdate: '481'});
CREATE (n:country {name: 'Italy'});
CREATE (n:country {name: 'Vatican City', fromdate: '1929'});
MATCH  (s:country {name: 'Vatican City'}),(d:sovereign_entity {name: 'Holy See'}) CREATE (s)-[:belongs_to]->(d);
CREATE (n:country {name: 'Scotland'});

-- Cities
-- Node
CREATE VLABEL town;
-- Relations
-- Data
CREATE (n:town {name: 'Geneva'});
MATCH  (s:town {name: 'Geneva'}),(d:country {name: 'Switzerland'}) CREATE (s)-[:located]->(d);
MATCH  (s:sovereign_entity {name: 'International Red Cross and Red Crescent Movement'}),(d:town {name: 'Geneva'}) CREATE (s)-[:located]->(d);
CREATE (n:town {name: 'Rome'});
MATCH  (s:town {name: 'Rome'}),(d:country {name: 'Italy'}) CREATE (s)-[:located]->(d);
MATCH  (s:sovereign_entity {name: 'Holy See'}),(d:town {name: 'Rome'}) CREATE (s)-[:located]->(d);
MATCH  (s:sovereign_entity {name: 'Knights of Malta'}),(d:town {name: 'Rome'}) CREATE (s)-[:located {fromdate: '1834'}]->(d);
CREATE (n:town {name: 'London'});
MATCH  (s:town {name: 'London'}),(d:country {name: 'England'}) CREATE (s)-[:located]->(d);
CREATE (n:town {name: 'Paris'});
MATCH  (s:town {name: 'Paris'}),(d:country {name: 'France'}) CREATE (s)-[:located]->(d);
CREATE (n:town {name: 'Saintes-Maries-de-la-Mer'});
MATCH  (s:town {name: 'Saintes-Maries-de-la-Mer'}),(d:country {name: 'France'}) CREATE (s)-[:located]->(d);
CREATE (n:town {name: 'Rennes-le-Château'});
MATCH  (s:town {name: 'Rennes-le-Château'}),(d:country {name: 'France'}) CREATE (s)-[:located]->(d);
CREATE (n:town {name: 'Edinburgh'});
MATCH  (s:town {name: 'Edinburgh'}),(d:country {name: 'Scotland'}) CREATE (s)-[:located]->(d);

-- Place
-- Node
CREATE VLABEL place;
-- Relations
-- Data
CREATE (n:place {name: 'City of London'});
MATCH  (s:place {name: 'City of London'}),(d:town {name: 'London'}) CREATE (s)-[:located]->(d);
CREATE (n:place {name: 'Temple Mountain'});
CREATE (n:place {name: 'Solomon''s Temple'});
MATCH  (s:place {name: 'Solomon''s Temple'}),(d:place {name: 'Temple Mountain'}) CREATE (s)-[:located]->(d);
CREATE (n:place {name: 'Rosslyn Chapel', fromdate: '1456-09-20'});
MATCH  (s:place {name: 'Rosslyn Chapel'}),(d:country {name: 'Scotland'}) CREATE (s)-[:located]->(d);

-- Forces
-- Node
CREATE VLABEL force;
-- Relations
-- Data
CREATE (n:force {name: 'Pontifical Swiss Guard', fromdate: '1506-01-22'});
MATCH  (s:force {name: 'Pontifical Swiss Guard'}),(d:country {name: 'Switzerland'}) CREATE (s)-[:belongs_to]->(d);
MATCH  (s:force {name: 'Pontifical Swiss Guard'}),(d:sovereign_entity {name: 'Holy See'}) CREATE (s)-[:serves]->(d);

-- Orders
-- Node
CREATE VLABEL "order";
-- Relations
CREATE ELABEL "unproven";
-- Data
CREATE (n:"order" {name: 'Knights Templar', other_name:'Order of Solomon''s Temple', fromdate: '1118', todate: '1312-03-22'});
MATCH  (s:"order" {name: 'Knights Templar'}),(d:sovereign_entity {name: 'Holy See'}) CREATE (s)-[:serves]->(d);
MATCH  (s:"order" {name: 'Knights Templar'}),(d:place {name: 'Temple Mountain'}) CREATE (s)-[:located]->(d);
MATCH  (s:"order" {name: 'Knights Templar'}),(d:place {name: 'Rosslyn Chapel'}) CREATE (s)-[:located]->(d);
MATCH  (s:"order" {name: 'Knights Templar'}),(d:country {name: 'Switzerland'}) CREATE (s)-[:unproven]->(d);
CREATE (n:"order" {name: 'Freemasonry', fromdate:'1717-06-24'});
MATCH  (s:"order" {name: 'Freemasonry'}),(d:town {name: 'London'}) CREATE (s)-[:located {fromdate: '1717'}]->(d);
MATCH  (s:"order" {name: 'Freemasonry'}),(d:town {name: 'Geneva'}) CREATE (s)-[:located {fromdate: '1791'}]->(d);
MATCH  (s:"order" {name: 'Freemasonry'}),(d:town {name: 'Edinburgh'}) CREATE (s)-[:located {fromdate: '1599'}]->(d);
CREATE (n:"order" {name: 'Grand Lodge of Pennsylvania', fromdate:'1731'});
MATCH  (s:"order" {name: 'Grand Lodge of Pennsylvania'}),(d:"order" {name: 'Freemasonry'}) CREATE (s)-[:belongs_to]->(d);
MATCH  (s:"order" {name: 'Grand Lodge of Pennsylvania'}),(d:country {name: 'USA'}) CREATE (s)-[:located {fromdate: '1731'}]->(d);
CREATE (n:"order" {name: 'Les Neuf Sœurs', fromdate:'1776'});
MATCH  (s:"order" {name: 'Les Neuf Sœurs'}),(d:town {name: 'Paris'}) CREATE (s)-[:located]->(d);
MATCH  (s:"order" {name: 'Les Neuf Sœurs'}),(d:"order" {name: 'Freemasonry'}) CREATE (s)-[:belongs_to]->(d);

-- Endowments
-- Node
CREATE VLABEL endowment;
-- Relations
CREATE ELABEL controls;
-- Data
CREATE (n:endowment {name: 'Jerusalem Islamic Waqf'});
MATCH  (s:endowment {name: 'Jerusalem Islamic Waqf'}),(d:place {name: 'Temple Mountain'}) CREATE (s)-[:controls]->(d);

-- Families
-- Node
CREATE VLABEL family;
-- Relations
-- Data
CREATE (n:family {name: 'Rothschild Dynasty', other_name: 'Guardians of the Papal Treasure', fromdate: '1550'});
MATCH  (s:family {name: 'Rothschild Dynasty'}),(d:sovereign_entity {name: 'Holy See'}) CREATE (s)-[:controls {fromdate: '1822'}]->(d);
CREATE (n:family {name: 'Merovingian Dynasty'});

-- Persons
-- Node
CREATE VLABEL person;
-- Relations
CREATE ELABEL lives_in;
CREATE ELABEL member_of;
CREATE ELABEL related;
CREATE ELABEL knows;
-- Data
CREATE (n:person {name: 'Benjamin Franklin', fromdate: '1706-01-17', todate: '1790-01-17'});
MATCH  (s:person {name: 'Benjamin Franklin'}),(d:"order" {name: 'Freemasonry'}) CREATE (s)-[:member_of]->(d);
MATCH  (s:person {name: 'Benjamin Franklin'}),(d:"order" {name: 'Les Neuf Sœurs'}) CREATE (s)-[:member_of]->(d);
MATCH  (s:person {name: 'Benjamin Franklin'}),(d:town {name: 'Paris'}) CREATE (s)-[:lives_in]->(d);
CREATE (n:person {name: 'Mary Magdalene'});
MATCH  (s:person {name: 'Mary Magdalene'}),(d:town {name: 'Saintes-Maries-de-la-Mer'}) CREATE (s)-[:lives_in {fromdate: '45'}]->(d);
MATCH  (s:person {name: 'Mary Magdalene'}),(d:family {name: 'Merovingian Dynasty'}) CREATE (s)-[:member_of]->(d);
