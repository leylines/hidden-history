# agensgraph
Agensgraph-Scripts for different purposes

![first impression](./forbidden_history.png)

## Forbidden History

A Graph-Database to visualize the hidden/forbidden history

### Prerequisites

* [agensgraph](https://github.com/bitnine-oss/agensgraph) - a transactional graph database based on PostgreSQL (http://www.agensgraph.com)

### Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

### Layout

#### Attributes

|attribute-name|type|
|---|---|
|name|string|
|fromdate|YYYY, YYYY-MM, YYYY-MM-DD, YYYY BC|
|todate|YYYY, YYYY-MM, YYYY-MM-DD, YYYY BC|
|status|proven\|unproven|

#### Node-Types

|name|description|attributes|
|---|---|---|
|sovereign_entity|sovereign entity but not a county|name, fromdate, todate|
|continent|continent|name|
|country|country as a sovereign entity|name, fromdate, todate|
|town|city, village etc.|name, fromdate, todate|
|place|churches, mountains etc.|name, fromdate, todate|
|force|force|name, fromdate, todate|
|order|order|name, fromdate, todate|
|dynasty|dynasty|name, fromdate, todate|
|family|family|name, fromdate, todate|
|person|person|name, fromdate, todate|

### Authors

* **Joerg Roth** - *Initial work* - [Leylines](https://github.com/leylines)

See also the list of [contributors](https://github.com/leylines/agensgraph/contributors) who participated in this project.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details



