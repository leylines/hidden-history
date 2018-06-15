# agensgraph
Agensgraph-Scripts for different purposes

![first impression](./hidden_history.png)

## Forbidden History

A Graph-Database to visualize the hidden/forbidden history

### Prerequisites

* [agensgraph](https://github.com/bitnine-oss/agensgraph) - a transactional graph database based on PostgreSQL (http://www.agensgraph.com)

### Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

### Layout

Please let me know about additional attributes, node-types or edge-type, but i think we should keep it as simple as possible :-)

#### Attributes

|attribute-name|type|
|---|---|
|name|string|
|other_name|string|
|fromdate|YYYY, YYYY-MM, YYYY-MM-DD, YYYY BC|
|todate|YYYY, YYYY-MM, YYYY-MM-DD, YYYY BC|
|status|proven\|unproven|

#### Node-Types

|name|description|attributes|
|---|---|---|
|sovereign_entity|sovereign entity but not a county|name, other_name, fromdate, todate|
|continent|continent|name|
|country|country as a sovereign entity|name, other_name, fromdate, todate|
|town|city, village etc.|name, other_name, fromdate, todate|
|place|churches, mountains etc.|name, other_name, fromdate, todate|
|force|force|name, other_name, fromdate, todate|
|order|order|name, other_name, fromdate, todate|
|dynasty|dynasty|name, other_name, fromdate, todate|
|family|family|name, other_name, fromdate, todate|
|person|person|name, other_name, fromdate, todate|
|company|company|name, other_name, fromdate, todate|

#### Edge-Types

|name|description|attributes|
|---|---|---|
|located|geographic allocation|name, status, fromdate, todate|
|serves|serves|name, status, fromdate, todate|
|belongs_to|belongs to|name, status, fromdate, todate|
|follows|follows|name, status, fromdate, todate|
|controls|controls|name, status, fromdate, todate|
|lives_in|lives in|name, status, fromdate, todate|
|member_of|member of|name, status, fromdate, todate|
|related|related (personal)|name, status, fromdate, todate|
|knows|knows|name, status, fromdate, todate|

### ToDo-list and workflow

* Visit the Link and fill in missing links, new topics and take a task if you want to.

https://docs.google.com/spreadsheets/d/1mxp-V6d-WcvtinwX8Zugc_vSUqaF4xwCecwaCOMQqM4/edit?usp=sharing

* Download and open collect.ods in https://docs.google.com or LibreOffice (maybe other Applications also work)
* Fill out the nessesary information in (first) Nodes and (then) Edges and send results to info@leylines.ch, i will then add the results to the graph

### Authors

* **Joerg Roth** - *Initial work* - [Leylines](https://github.com/leylines)

See also the list of [contributors](https://github.com/leylines/agensgraph/contributors) who participated in this project.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

