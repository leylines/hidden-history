DROP GRAPH hidden_history CASCADE;
CREATE GRAPH hidden_history;
SET graph_path = hidden_history;

\i 01-node-types.cypher
\i 02-edge-types.cypher
\i 03-empire.cypher
\i 04-place.cypher
\i 05-organisation.cypher
\i 06-dynasty.cypher
\i 07-person.cypher
\i 08-belief.cypher
\i 09-event.cypher
\i 10-knowledge.cypher
\i 11-artifact.cypher
\i 99-hidden_history.cypher
