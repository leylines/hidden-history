-- Sovereign entities
CREATE (n:political_entity {name: 'Holy See', fromdate:'325'});
CREATE (n:political_entity {name: 'Knights of Malta', other_name: 'Sovereign Military Order of Malta', fromdate: '1099'});
-- CREATE (n:political_entity {name: 'ICRC', other_name: 'International Red Cross and Red Crescent Movement', fromdate: '1863'});
-- Countries
CREATE (n:political_entity {name: 'England'});
CREATE (n:political_entity {name: 'France', fromdate: '481'});
CREATE (n:political_entity {name: 'Greece'});
CREATE (n:political_entity {name: 'Germany'});
CREATE (n:political_entity {name: 'Italy'});
CREATE (n:political_entity {name: 'Scotland'});
CREATE (n:political_entity {name: 'Switzerland', other_name: 'Sisters of Isis', fromdate: '1291-08-01'});
CREATE (n:political_entity {name: 'Vatican City', fromdate: '1929'});
CREATE (n:political_entity {name: 'Egypt'});
CREATE (n:political_entity {name: 'USA', fromdate: '1776-07-04'});
CREATE (n:political_entity {name: 'Altlantis'});
