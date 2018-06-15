DROP GRAPH forbidden_history CASCADE;
CREATE GRAPH forbidden_history;
SET graph_path = forbidden_history;

\i ./node-types.cypher
\i ./edge-types.cypher

-- Sovereign Entities
CREATE (n:sovereign_entity {name: 'Holy See', fromdate:'325'});
CREATE (n:sovereign_entity {name: 'Knights of Malta', other_name: 'Sovereign Military Order of Malta', fromdate: '1099'});
MATCH  (s:sovereign_entity {name: 'Knights of Malta'}),(d:sovereign_entity {name: 'Holy See'}) CREATE (s)-[:serves {status: 'proven'}]->(d);
-- CREATE (n:sovereign_entity {name: 'ICRC', other_name: 'International Red Cross and Red Crescent Movement', fromdate: '1863'});

\i ./continents.cypher

-- Countries
CREATE (n:country {name: 'England'});
MATCH  (s:country {name: 'England'}),(d:continent {name: 'Europe'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
CREATE (n:country {name: 'France', fromdate: '481'});
MATCH  (s:country {name: 'France'}),(d:continent {name: 'Europe'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
CREATE (n:country {name: 'Greece'});
MATCH  (s:country {name: 'Greece'}),(d:continent {name: 'Europe'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
CREATE (n:country {name: 'Italy'});
MATCH  (s:country {name: 'Italy'}),(d:continent {name: 'Europe'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
CREATE (n:country {name: 'Scotland'});
MATCH  (s:country {name: 'Scotland'}),(d:continent {name: 'Europe'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
CREATE (n:country {name: 'Switzerland', other_name: 'Sisters of Isis', fromdate: '1291-08-01'});
MATCH  (s:country {name: 'Switzerland'}),(d:continent {name: 'Europe'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
CREATE (n:country {name: 'Vatican City', fromdate: '1929'});
MATCH  (s:country {name: 'Vatican City'}),(d:continent {name: 'Europe'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:country {name: 'Vatican City'}),(d:sovereign_entity {name: 'Holy See'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
CREATE (n:country {name: 'Egypt'});
MATCH  (s:country {name: 'Egypt'}),(d:continent {name: 'Africa'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:country {name: 'Egypt'}),(d:continent {name: 'Asia'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
CREATE (n:country {name: 'USA', fromdate: '1776-07-04'});
MATCH  (s:country {name: 'USA'}),(d:continent {name: 'North America'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
CREATE (n:country {name: 'Altlantis'});
MATCH  (s:country {name: 'Altlantis'}),(d:country {name: 'Egypt'}) CREATE (s)-[:follows {status: 'unproven'}]->(d);

-- Cities
CREATE (n:town {name: 'Athens'});
MATCH  (s:town {name: 'Athens'}),(d:country {name: 'Greece'}) CREATE (s)-[:located {status: 'proven'}]->(d);
CREATE (n:town {name: 'Geneva'});
MATCH  (s:town {name: 'Geneva'}),(d:country {name: 'Switzerland'}) CREATE (s)-[:located {status: 'proven'}]->(d);
-- MATCH  (s:sovereign_entity {name: 'ICRC'}),(d:town {name: 'Geneva'}) CREATE (s)-[:located {status: 'proven'}]->(d);
CREATE (n:town {name: 'Rome'});
MATCH  (s:town {name: 'Rome'}),(d:country {name: 'Italy'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:sovereign_entity {name: 'Holy See'}),(d:town {name: 'Rome'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:sovereign_entity {name: 'Knights of Malta'}),(d:town {name: 'Rome'}) CREATE (s)-[:located {fromdate: '1834', status: 'proven'}]->(d);
CREATE (n:town {name: 'London'});
MATCH  (s:town {name: 'London'}),(d:country {name: 'England'}) CREATE (s)-[:located {status: 'proven'}]->(d);
CREATE (n:town {name: 'Paris'});
MATCH  (s:town {name: 'Paris'}),(d:country {name: 'France'}) CREATE (s)-[:located {status: 'proven'}]->(d);
CREATE (n:town {name: 'Saintes-Maries-de-la-Mer'});
MATCH  (s:town {name: 'Saintes-Maries-de-la-Mer'}),(d:country {name: 'France'}) CREATE (s)-[:located {status: 'proven'}]->(d);
CREATE (n:town {name: 'Rennes-le-Château'});
MATCH  (s:town {name: 'Rennes-le-Château'}),(d:country {name: 'France'}) CREATE (s)-[:located {status: 'proven'}]->(d);
CREATE (n:town {name: 'Edinburgh'});
MATCH  (s:town {name: 'Edinburgh'}),(d:country {name: 'Scotland'}) CREATE (s)-[:located {status: 'proven'}]->(d);

-- Place
CREATE (n:place {name: 'City of London'});
MATCH  (s:place {name: 'City of London'}),(d:town {name: 'London'}) CREATE (s)-[:located {status: 'proven'}]->(d);
CREATE (n:place {name: 'Temple Mountain'});
CREATE (n:place {name: 'Solomon''s Temple'});
MATCH  (s:place {name: 'Solomon''s Temple'}),(d:place {name: 'Temple Mountain'}) CREATE (s)-[:located {status: 'proven'}]->(d);
CREATE (n:place {name: 'Rosslyn Chapel', fromdate: '1456-09-20'});
MATCH  (s:place {name: 'Rosslyn Chapel'}),(d:country {name: 'Scotland'}) CREATE (s)-[:located {status: 'proven'}]->(d);

-- Forces
CREATE (n:force {name: 'Pontifical Swiss Guard', fromdate: '1506-01-22'});
MATCH  (s:force {name: 'Pontifical Swiss Guard'}),(d:country {name: 'Switzerland'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:force {name: 'Pontifical Swiss Guard'}),(d:sovereign_entity {name: 'Holy See'}) CREATE (s)-[:serves {status: 'proven'}]->(d);

-- Orders
CREATE (n:"order" {name: 'Knights Templar', other_name:'Order of Solomon''s Temple', fromdate: '1118', todate: '1312-03-22'});
MATCH  (s:"order" {name: 'Knights Templar'}),(d:sovereign_entity {name: 'Holy See'}) CREATE (s)-[:serves {status: 'proven'}]->(d);
MATCH  (s:"order" {name: 'Knights Templar'}),(d:place {name: 'Temple Mountain'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:"order" {name: 'Knights Templar'}),(d:place {name: 'Rosslyn Chapel'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:"order" {name: 'Knights Templar'}),(d:country {name: 'Switzerland'}) CREATE (s)-[:follows {status: 'unproven'}]->(d);
CREATE (n:"order" {name: 'Freemasonry', fromdate:'1717-06-24'});
MATCH  (s:"order" {name: 'Freemasonry'}),(d:town {name: 'London'}) CREATE (s)-[:located {fromdate: '1717', status: 'proven'}]->(d);
MATCH  (s:"order" {name: 'Freemasonry'}),(d:town {name: 'Geneva'}) CREATE (s)-[:located {fromdate: '1791', status: 'proven'}]->(d);
MATCH  (s:"order" {name: 'Freemasonry'}),(d:town {name: 'Edinburgh'}) CREATE (s)-[:located {fromdate: '1599', status: 'proven'}]->(d);
CREATE (n:"order" {name: 'Grand Lodge of Pennsylvania', fromdate:'1731'});
MATCH  (s:"order" {name: 'Grand Lodge of Pennsylvania'}),(d:"order" {name: 'Freemasonry'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:"order" {name: 'Grand Lodge of Pennsylvania'}),(d:country {name: 'USA'}) CREATE (s)-[:located {status: 'proven'}]->(d);
CREATE (n:"order" {name: 'Les Neuf Sœurs', fromdate:'1776'});
MATCH  (s:"order" {name: 'Les Neuf Sœurs'}),(d:town {name: 'Paris'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:"order" {name: 'Les Neuf Sœurs'}),(d:"order" {name: 'Freemasonry'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);

-- Endowments
-- CREATE (n:endowment {name: 'Jerusalem Islamic Waqf'});
-- MATCH  (s:endowment {name: 'Jerusalem Islamic Waqf'}),(d:place {name: 'Temple Mountain'}) CREATE (s)-[:controls {status: 'proven'}]->(d);

-- Dynasty
CREATE (n:dynasty {name: 'Rothschild Dynasty', other_name: 'Guardians of the Papal Treasure', fromdate: '1550'});
MATCH  (s:dynasty {name: 'Rothschild Dynasty'}),(d:sovereign_entity {name: 'Holy See'}) CREATE (s)-[:controls {fromdate: '1822', status: 'unproven'}]->(d);
CREATE (n:dynasty {name: 'Merovingian Dynasty'});
CREATE (n:dynasty {name: 'Pharaohs'});
MATCH  (s:dynasty {name: 'Pharaohs'}),(d:country {name: 'Egypt'}) CREATE (s)-[:located {status: 'proven'}]->(d);
CREATE (n:dynasty {name: '21. Dynasty', fromdate: '1069 BC', todate: '945 BC'});
MATCH  (s:dynasty {name: '21. Dynasty'}),(d:dynasty {name: 'Pharaohs'}) CREATE (s)-[:located {status: 'proven'}]->(d);
CREATE (n:dynasty {name: '22. Dynasty', fromdate: '945 BC', todate: '760 BC'});
MATCH  (s:dynasty {name: '22. Dynasty'}),(d:dynasty {name: 'Pharaohs'}) CREATE (s)-[:located {status: 'proven'}]->(d);

-- Persons
CREATE (n:person {name: 'Benjamin Franklin', fromdate: '1706-01-17', todate: '1790-01-17'});
MATCH  (s:person {name: 'Benjamin Franklin'}),(d:"order" {name: 'Grand Lodge of Pennsylvania'}) CREATE (s)-[:member_of {status: 'proven', fromdate: '7130'}]->(d);
MATCH  (s:person {name: 'Benjamin Franklin'}),(d:"order" {name: 'Les Neuf Sœurs'}) CREATE (s)-[:member_of {status: 'proven'}]->(d);
-- MATCH  (s:person {name: 'Benjamin Franklin'}),(d:town {name: 'Paris'}) CREATE (s)-[:lives_in {status: 'proven'}]->(d);
-- MATCH  (s:person {name: 'Benjamin Franklin'}),(d:country {name: 'USA'}) CREATE (s)-[:lives_in {status: 'proven'}]->(d);
CREATE (n:person {name: 'Mary Magdalene'});
MATCH  (s:person {name: 'Mary Magdalene'}),(d:town {name: 'Saintes-Maries-de-la-Mer'}) CREATE (s)-[:lives_in {fromdate: '45', status: 'unproven'}]->(d);
MATCH  (s:person {name: 'Mary Magdalene'}),(d:dynasty {name: 'Merovingian Dynasty'}) CREATE (s)-[:belongs_to {status: 'unproven'}]->(d);
CREATE (n:person {name: 'Plato', fromdate: '428 BC', todate: '348 BC'});
MATCH  (s:person {name: 'Plato'}),(d:town {name: 'Athens'}) CREATE (s)-[:lives_in {status: 'proven'}]->(d);
MATCH  (s:person {name: 'Plato'}),(d:country {name: 'Egypt'}) CREATE (s)-[:lives_in {status: 'proven'}]->(d);
