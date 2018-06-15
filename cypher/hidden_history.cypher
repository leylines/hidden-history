DROP GRAPH hidden_history CASCADE;
CREATE GRAPH hidden_history;
SET graph_path = hidden_history;

\i ./node-types.cypher
\i ./edge-types.cypher

\i ./sovereign_entities.cypher
\i ./continents.cypher
\i ./countries.cypher
\i ./towns.cypher
\i ./places.cypher
\i ./forces.cypher
\i ./order.cypher
\i ./dynasties.cypher
\i ./persons.cypher

-- Sovereign Entities
MATCH  (s:sovereign_entity {name: 'Knights of Malta'}),(d:sovereign_entity {name: 'Holy See'}) CREATE (s)-[:serves {status: 'proven'}]->(d);

-- Countries
MATCH  (s:country {name: 'England'}),(d:continent {name: 'Europe'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:country {name: 'France'}),(d:continent {name: 'Europe'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:country {name: 'Greece'}),(d:continent {name: 'Europe'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:country {name: 'Italy'}),(d:continent {name: 'Europe'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:country {name: 'Scotland'}),(d:continent {name: 'Europe'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:country {name: 'Switzerland'}),(d:continent {name: 'Europe'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:country {name: 'Vatican City'}),(d:continent {name: 'Europe'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:country {name: 'Vatican City'}),(d:sovereign_entity {name: 'Holy See'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:country {name: 'Egypt'}),(d:continent {name: 'Africa'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:country {name: 'Egypt'}),(d:continent {name: 'Asia'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:country {name: 'USA'}),(d:continent {name: 'North America'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:country {name: 'Altlantis'}),(d:country {name: 'Egypt'}) CREATE (s)-[:follows {status: 'unproven'}]->(d);

-- Towns
MATCH  (s:town {name: 'Athens'}),(d:country {name: 'Greece'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:town {name: 'Geneva'}),(d:country {name: 'Switzerland'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:town {name: 'Rome'}),(d:country {name: 'Italy'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:sovereign_entity {name: 'Holy See'}),(d:town {name: 'Rome'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:sovereign_entity {name: 'Knights of Malta'}),(d:town {name: 'Rome'}) CREATE (s)-[:located {fromdate: '1834', status: 'proven'}]->(d);
MATCH  (s:town {name: 'London'}),(d:country {name: 'England'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:town {name: 'Paris'}),(d:country {name: 'France'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:town {name: 'Saintes-Maries-de-la-Mer'}),(d:country {name: 'France'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:town {name: 'Rennes-le-Château'}),(d:country {name: 'France'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:town {name: 'Edinburgh'}),(d:country {name: 'Scotland'}) CREATE (s)-[:located {status: 'proven'}]->(d);

-- Place
MATCH  (s:place {name: 'City of London'}),(d:town {name: 'London'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Solomon''s Temple'}),(d:place {name: 'Temple Mountain'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Rosslyn Chapel'}),(d:country {name: 'Scotland'}) CREATE (s)-[:located {status: 'proven'}]->(d);

-- Forces
MATCH  (s:force {name: 'Pontifical Swiss Guard'}),(d:country {name: 'Switzerland'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:force {name: 'Pontifical Swiss Guard'}),(d:sovereign_entity {name: 'Holy See'}) CREATE (s)-[:serves {status: 'proven'}]->(d);

-- Orders
MATCH  (s:"order" {name: 'Knights Templar'}),(d:sovereign_entity {name: 'Holy See'}) CREATE (s)-[:serves {status: 'proven'}]->(d);
MATCH  (s:"order" {name: 'Knights Templar'}),(d:place {name: 'Temple Mountain'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:"order" {name: 'Knights Templar'}),(d:place {name: 'Rosslyn Chapel'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:"order" {name: 'Knights Templar'}),(d:country {name: 'Switzerland'}) CREATE (s)-[:follows {status: 'unproven'}]->(d);
MATCH  (s:"order" {name: 'Freemasonry'}),(d:town {name: 'London'}) CREATE (s)-[:located {fromdate: '1717', status: 'proven'}]->(d);
MATCH  (s:"order" {name: 'Freemasonry'}),(d:town {name: 'Geneva'}) CREATE (s)-[:located {fromdate: '1791', status: 'proven'}]->(d);
MATCH  (s:"order" {name: 'Freemasonry'}),(d:town {name: 'Edinburgh'}) CREATE (s)-[:located {fromdate: '1599', status: 'proven'}]->(d);
MATCH  (s:"order" {name: 'Grand Lodge of Pennsylvania'}),(d:"order" {name: 'Freemasonry'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:"order" {name: 'Grand Lodge of Pennsylvania'}),(d:country {name: 'USA'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:"order" {name: 'Les Neuf Sœurs'}),(d:town {name: 'Paris'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:"order" {name: 'Les Neuf Sœurs'}),(d:"order" {name: 'Freemasonry'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);

-- Dynasty
MATCH  (s:dynasty {name: 'Rothschild Dynasty'}),(d:sovereign_entity {name: 'Holy See'}) CREATE (s)-[:controls {fromdate: '1822', status: 'unproven'}]->(d);
MATCH  (s:dynasty {name: 'Pharaohs'}),(d:country {name: 'Egypt'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:dynasty {name: '21. Dynasty'}),(d:dynasty {name: 'Pharaohs'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:dynasty {name: '22. Dynasty'}),(d:dynasty {name: 'Pharaohs'}) CREATE (s)-[:located {status: 'proven'}]->(d);

-- Persons
MATCH  (s:person {name: 'Benjamin Franklin'}),(d:"order" {name: 'Grand Lodge of Pennsylvania'}) CREATE (s)-[:member_of {status: 'proven', fromdate: '7130'}]->(d);
MATCH  (s:person {name: 'Benjamin Franklin'}),(d:"order" {name: 'Les Neuf Sœurs'}) CREATE (s)-[:member_of {status: 'proven'}]->(d);
MATCH  (s:person {name: 'Mary Magdalene'}),(d:town {name: 'Saintes-Maries-de-la-Mer'}) CREATE (s)-[:lives_in {fromdate: '45', status: 'unproven'}]->(d);
MATCH  (s:person {name: 'Mary Magdalene'}),(d:dynasty {name: 'Merovingian Dynasty'}) CREATE (s)-[:belongs_to {status: 'unproven'}]->(d);
MATCH  (s:person {name: 'Plato'}),(d:town {name: 'Athens'}) CREATE (s)-[:lives_in {status: 'proven'}]->(d);
MATCH  (s:person {name: 'Plato'}),(d:country {name: 'Egypt'}) CREATE (s)-[:lives_in {status: 'proven'}]->(d);
