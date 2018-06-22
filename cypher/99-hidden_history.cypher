-- Countries
MATCH  (s:place {name: 'Germany'}),(d:place {name: 'Europe'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'England'}),(d:place {name: 'Europe'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'France'}),(d:place {name: 'Europe'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Greece'}),(d:place {name: 'Europe'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Italy'}),(d:place {name: 'Europe'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Scotland'}),(d:place {name: 'Europe'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Switzerland'}),(d:place {name: 'Europe'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Vatican City'}),(d:place {name: 'Europe'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Vatican City'}),(d:organisation {name: 'Holy See'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Egypt'}),(d:place {name: 'Africa'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Egypt'}),(d:place {name: 'Asia'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'USA'}),(d:place {name: 'North America'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Canada'}),(d:place {name: 'North America'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Altlantis'}),(d:place {name: 'Egypt'}) CREATE (s)-[:succesor {status: 'unproven'}]->(d);

-- Towns
MATCH  (s:place {name: 'Athens'}),(d:place {name: 'Greece'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Geneva'}),(d:place {name: 'Switzerland'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Einsiedeln'}),(d:place {name: 'Switzerland'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Rome'}),(d:place {name: 'Italy'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'London'}),(d:place {name: 'England'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Paris'}),(d:place {name: 'France'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Saintes-Maries-de-la-Mer'}),(d:place {name: 'France'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Rennes-le-Château'}),(d:place {name: 'France'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Edinburgh'}),(d:place {name: 'Scotland'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Washington, D.C.'}),(d:place {name: 'USA'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Philadelphia'}),(d:place {name: 'USA'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Chartres'}),(d:place {name: 'France'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Alexandria'}),(d:place {name: 'Egypt'}) CREATE (s)-[:located {status: 'proven'}]->(d);

-- Place
MATCH  (s:place {name: 'City of London'}),(d:place {name: 'London'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Solomon''s Temple'}),(d:place {name: 'Temple Mountain'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Rosslyn Chapel'}),(d:place {name: 'Scotland'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Mount Sinai'}),(d:place {name: 'Egypt'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Einsiedeln Abbey'}),(d:place {name: 'Einsiedeln'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Einsiedeln Abbey'}),(d:belief {name: 'Christianity'}) CREATE (s)-[:follows {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Chartres Cathedral'}),(d:place {name: 'Chartres'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Chartres Cathedral'}),(d:belief {name: 'Christianity'}) CREATE (s)-[:follows {status: 'proven'}]->(d);
MATCH  (s:place {name: 'Nova Scotia'}),(d:place {name: 'Canada'}) CREATE (s)-[:located {status: 'located'}]->(d);
MATCH  (s:place {name: 'Oak Island'}),(d:place {name: 'Nova Scotia'}) CREATE (s)-[:located {status: 'located'}]->(d);

-- Empire
MATCH  (s:empire {name: 'Kingdom of Israel'}),(d:belief {name: 'Christianity'}) CREATE (s)-[:follows {status: 'proven'}]->(d);

-- Forces
MATCH  (s:organisation {name: 'Pontifical Swiss Guard'}),(d:place {name: 'Switzerland'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);

-- Political Entities
MATCH  (s:organisation {name: 'Holy See'}),(d:place {name: 'Rome'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:organisation {name: 'Holy See'}),(d:organisation {name: 'Pontifical Swiss Guard'}) CREATE (s)-[:controls {status: 'proven'}]->(d);
MATCH  (s:organisation {name: 'Holy See'}),(d:organisation {name: 'Knights Templar'}) CREATE (s)-[:controls {status: 'proven'}]->(d);
MATCH  (s:organisation {name: 'Holy See'}),(d:organisation {name: 'Knights of Malta'}) CREATE (s)-[:controls {status: 'proven'}]->(d);
MATCH  (s:organisation {name: 'Holy See'}),(d:belief {name: 'Christianity'}) CREATE (s)-[:controls {status: 'proven'}]->(d);
MATCH  (s:organisation {name: 'Knights of Malta'}),(d:place {name: 'Rome'}) CREATE (s)-[:located {fromdate: '1834', status: 'proven'}]->(d);

-- Orders
MATCH  (s:organisation {name: 'Knights Templar'}),(d:place {name: 'Temple Mountain'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:organisation {name: 'Knights Templar'}),(d:place {name: 'Rosslyn Chapel'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:organisation {name: 'Knights Templar'}),(d:place {name: 'Chartres'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:organisation {name: 'Knights Templar'}),(d:place {name: 'Oak Island'}) CREATE (s)-[:located {status: 'unproven'}]->(d);
MATCH  (s:organisation {name: 'Knights Templar'}),(d:place {name: 'Switzerland'}) CREATE (s)-[:succesor {status: 'unproven'}]->(d);
MATCH  (s:organisation {name: 'Knights Templar'}),(d:event {name: '1. Crusade'}) CREATE (s)-[:participate {status: 'proven'}]->(d);
MATCH  (s:organisation {name: 'Knights Templar'}),(d:organisation {name: 'Freemasonry'}) CREATE (s)-[:succesor {status: 'unproven'}]->(d);
MATCH  (s:organisation {name: 'Freemasonry'}),(d:place {name: 'London'}) CREATE (s)-[:located {fromdate: '1717', status: 'proven'}]->(d);
MATCH  (s:organisation {name: 'Freemasonry'}),(d:place {name: 'Geneva'}) CREATE (s)-[:located {fromdate: '1791', status: 'proven'}]->(d);
MATCH  (s:organisation {name: 'Freemasonry'}),(d:place {name: 'Edinburgh'}) CREATE (s)-[:located {fromdate: '1599', status: 'proven'}]->(d);
MATCH  (s:organisation {name: 'Grand Lodge of Pennsylvania'}),(d:organisation {name: 'Freemasonry'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:organisation {name: 'Grand Lodge of Pennsylvania'}),(d:place {name: 'Philadelphia'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:organisation {name: 'Les Neuf Sœurs'}),(d:place {name: 'Paris'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:organisation {name: 'Les Neuf Sœurs'}),(d:organisation {nameFrance: 'Freemasonry'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:organisation {name: 'Loge Zur Behutsamkeit'}),(d:organisation {name: 'Freemasonry'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:organisation {name: 'Loge Zur Behutsamkeit'}),(d:place {name: 'Germany'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:organisation {name: 'Federal Lodge No. 1'}),(d:organisation {name: 'Freemasonry'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:organisation {name: 'Federal Lodge No. 1'}),(d:place {name: 'Washington, D.C.'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:organisation {name: 'Ionic Lodge No. 28'}),(d:organisation {name: 'Freemasonry'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:organisation {name: 'Ionic Lodge No. 28'}),(d:place {name: 'USA'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:organisation {name: 'Grand Lodge of Nova Scotia'}),(d:organisation {name: 'Freemasonry'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:organisation {name: 'Grand Lodge of Nova Scotia'}),(d:place {name: 'Canada'}) CREATE (s)-[:located {status: 'proven'}]->(d);

-- Dynasty
MATCH  (s:dynasty {name: 'Rothschild Dynasty'}),(d:organisation {name: 'Holy See'}) CREATE (s)-[:controls {fromdate: '1822', status: 'unproven'}]->(d);
MATCH  (s:dynasty {name: 'Pharaohs'}),(d:place {name: 'Egypt'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:dynasty {name: '21. Dynasty'}),(d:dynasty {name: 'Pharaohs'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:dynasty {name: '21. Dynasty'}),(d:empire {name: 'Kingdom of Israel'}) CREATE (s)-[:equal {status: 'proven'}]->(d);
MATCH  (s:dynasty {name: '22. Dynasty'}),(d:dynasty {name: 'Pharaohs'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);

-- Persons
MATCH  (s:person {name: 'Psusennes II.'}),(d:dynasty {name: '21. Dynasty'}) CREATE (s)-[:member_of {status: 'proven'}]->(d);
MATCH  (s:person {name: 'Psusennes II.'}),(d:person {name: 'David'}) CREATE (s)-[:equal {status: 'proven'}]->(d);
MATCH  (s:person {name: 'David'}),(d:empire {name: 'Kingdom of Israel'}) CREATE (s)-[:member_of {status: 'proven'}]->(d);
MATCH  (s:person {name: 'David'}),(d:person {name: 'Salomon'}) CREATE (s)-[:related {status: 'proven'}]->(d);
MATCH  (s:person {name: 'Salomon'}),(d:empire {name: 'Kingdom of Israel'}) CREATE (s)-[:member_of {status: 'proven'}]->(d);
MATCH  (s:person {name: 'Salomon'}),(d:person {name: 'Jesus'}) CREATE (s)-[:member_of {status: 'proven'}]->(d);
MATCH  (s:person {name: 'Jesus'}),(d:person {name: 'Mary Magdalene'}) CREATE (s)-[:related {status: 'unproven'}]->(d);
MATCH  (s:person {name: 'Jesus'}),(d:dynasty {name: 'Merovingian Dynasty'}) CREATE (s)-[:member_of {status: 'unproven'}]->(d);
MATCH  (s:person {name: 'Mary Magdalene'}),(d:place {name: 'Saintes-Maries-de-la-Mer'}) CREATE (s)-[:located {fromdate: '45', status: 'unproven'}]->(d);
MATCH  (s:person {name: 'Mary Magdalene'}),(d:dynasty {name: 'Merovingian Dynasty'}) CREATE (s)-[:member_of {status: 'unproven'}]->(d);
MATCH  (s:person {name: 'Benjamin Franklin'}),(d:organisation {name: 'Grand Lodge of Pennsylvania'}) CREATE (s)-[:member_of {status: 'proven', fromdate: '7130'}]->(d);
MATCH  (s:person {name: 'Benjamin Franklin'}),(d:organisation {name: 'Les Neuf Sœurs'}) CREATE (s)-[:member_of {status: 'proven'}]->(d);
MATCH  (s:person {name: 'Plato'}),(d:belief {name: 'Classical Greek philosophy'}) CREATE (s)-[:follows {status: 'proven'}]->(d);
MATCH  (s:person {name: 'Plato'}),(d:knowledge {name: 'Library of Alexandria'}) CREATE (s)-[:located {status: 'unproven'}]->(d);
MATCH  (s:person {name: 'Adam Weishaupt'}),(d:organisation {name: 'Illuminati'}) CREATE (s)-[:member_of {status: 'proven'}]->(d);
MATCH  (s:person {name: 'Adam Weishaupt'}),(d:organisation {name: 'Loge Zur Behutsamkeit'}) CREATE (s)-[:member_of {status: 'proven'}]->(d);
MATCH  (s:person {name: 'Richard Evelyn Byrd'}),(d:organisation {name: 'Federal Lodge No. 1'}) CREATE (s)-[:member_of {status: 'proven'}]->(d);
MATCH  (s:person {name: 'Richard Evelyn Byrd'}),(d:event {name: 'Operation Highjump'}) CREATE (s)-[:participate {status: 'proven'}]->(d);
MATCH  (s:person {name: 'Richard Evelyn Byrd'}),(d:event {name: 'German Antarctic Expedition'}) CREATE (s)-[:related {status: 'proven'}]->(d);
MATCH  (s:person {name: 'Whipple Van Buren Phillips'}),(d:person {name: 'Howard Phillips Lovecraft'}) CREATE (s)-[:related {status: 'proven'}]->(d);
MATCH  (s:person {name: 'Whipple Van Buren Phillips'}),(d:organisation {name: 'Ionic Lodge No. 28'}) CREATE (s)-[:member_of {status: 'member_of'}]->(d);
MATCH  (s:person {name: 'Howard Phillips Lovecraft'}),(d:knowledge {name: 'At the Mountains of Madness'}) CREATE (s)-[:creator {status: 'proven'}]->(d);

-- Events
MATCH  (s:event {name: '1. Crusade'}),(d:place {name: 'France'}) CREATE (s)-[:located { status: 'proven'}]->(d);
MATCH  (s:event {name: '1. Crusade'}),(d:place {name: 'Temple Mountain'}) CREATE (s)-[:located { status: 'proven'}]->(d);
MATCH  (s:event {name: 'Operation Highjump'}),(d:place {name: 'USA'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:event {name: 'Operation Highjump'}),(d:place {name: 'Antarctica'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:event {name: 'German Antarctic Expedition'}),(d:place {name: 'Germany'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:event {name: 'German Antarctic Expedition'}),(d:place {name: 'Antarctica'}) CREATE (s)-[:located {status: 'proven'}]->(d);

-- Artifacts
MATCH  (s:artifact {name: 'Ark of the Covenant'}),(d:place {name: 'Mount Sinai'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:artifact {name: 'Ark of the Covenant'}),(d:place {name: 'Temple Mountain'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:artifact {name: 'Ark of the Covenant'}),(d:belief {name: 'Christianity'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:artifact {name: 'Holy Grail'}),(d:belief {name: 'Christianity'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:artifact {name: 'Holy Grail'}),(d:person {name: 'Jesus'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);
MATCH  (s:artifact {name: 'Black Madonna'}),(d:place {name: 'Saintes-Maries-de-la-Mer'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:artifact {name: 'Black Madonna'}),(d:place {name: 'Einsiedeln Abbey'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:artifact {name: 'Black Madonna'}),(d:place {name: 'Chartres Cathedral'}) CREATE (s)-[:located {status: 'proven'}]->(d);
MATCH  (s:artifact {name: 'Black Madonna'}),(d:belief {name: 'Christianity'}) CREATE (s)-[:belongs_to {status: 'proven'}]->(d);

-- Knowledge
MATCH  (s:knowledge {name: 'At the Mountains of Madness'}),(d:place {name: 'Antarctica'}) CREATE (s)-[:about {status: 'proven'}]->(d);
MATCH  (s:knowledge {name: 'Library of Alexandria'}),(d:place {name: 'Alexandria'}) CREATE (s)-[:located {status: 'proven'}]->(d);

-- Belief
MATCH  (s:belief {name: 'Classical Greek philosophy'}),(d:place {name: 'Athens'}) CREATE (s)-[:located {status: 'proven'}]->(d);
