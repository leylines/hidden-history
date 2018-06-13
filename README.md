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

#### Edge-Types

|name|description|attributes|
|---|---|---|
|located|geographic allocation|name, fromdate, todate, status|
|serves|serves|name, fromdate, todate, status|
|belongs_to|belongs to|name, fromdate, todate, status|
|follows|follows|name, fromdate, todate, status|
|controls|controls|name, fromdate, todate, status|
|lives_in|lives in|name, fromdate, todate, status|
|member_of|member of|name, fromdate, todate, status|
|related|related (personal)|name, fromdate, todate, status|
|knows|knows|name, fromdate, todate, status|

### ToDo-List

#### Pharaohs

#### Black Noblesse

##### Maupeou and Thales Group
* https://ahuwahzeus583992924.wordpress.com/2018/02/28/maupeou-and-thales-group/

##### Black Nobility (aristocrazia nera)
* https://ahuwahzeus583992924.wordpress.com/2018/02/23/nero-aristocrazia/

##### Knights of Malta (SMOM)
* https://ahuwahzeus583992924.wordpress.com/2018/02/03/engineers-of-war-knights-of-malta/

##### Knights of Columbus
* https://ahuwahzeus583992924.wordpress.com/2018/02/13/vatican-death-squad-of-columbus/

##### Jesuits
* https://ahuwahzeus583992924.wordpress.com/2018/02/04/jesuit-order-of-liars-terrorists-and-infiltrators/

##### Mafia clans
* https://ahuwahzeus583992924.wordpress.com/2018/02/21/made-men-of-rome/

##### Massimo (Maximus) family
* https://ahuwahzeus583992924.wordpress.com/2018/01/31/massimo-crime-family/
* http://ltvfye.blogspot.com/2018/03/massimo-mafia-of-london.html
* https://www.roguemoney.net/blog/2018/5/16/the-chair-serves-the-master

##### Breakspear (Lancelotti) family
* https://ahuwahzeus583992924.wordpress.com/2018/02/08/house-of-the-magicians/

##### Orsini (Ursus) family
* https://ahuwahzeus583992924.wordpress.com/2018/02/04/orsini-and-rosenberg-alchemical-mafia/

##### Aldobrandini / Brandolini family
* https://ahuwahzeus583992924.wordpress.com/2018/02/05/tomb-of-aldobrandini/
* https://ahuwahzeus583992924.wordpress.com/2018/04/24/vatican-accountants-and-bankers/

##### Colonna (Columna) family
* https://ahuwahzeus583992924.wordpress.com/2018/02/04/colonna-crime-corporation/

##### Borgia (Borja) family
* https://ahuwahzeus583992924.wordpress.com/2018/03/15/borgia-mafia/

##### Pallavicini (Palatinus) family
* https://ahuwahzeus583992924.wordpress.com/2018/01/31/pallavicini-crime-syndicate/

##### Torlonia family (controllers of BIS)
* https://ahuwahzeus583992924.wordpress.com/2018/01/31/torlonia-banking-mafia/

##### Theodoli (Theodosius) family (Theodosius 1st was an Archon who ordered the destruction of Goddess mysteries in 391 CE)
* https://ahuwahzeus583992924.wordpress.com/2018/02/07/devilish-tricksters/

#### King David, King Solomon and Pharaohs

* http://www.ancient-origins.net/opinion-guest-authors/king-solomon-s-mines-discovered-kings-and-pharaohs-part-i-005500
* http://www.ancient-origins.net/opinion-guest-authors/king-solomon-s-mines-discovered-ancient-treasures-part-ii-005506

#### Rothschilds

#### Windsor-Dynasty and relations to germany

#### History of Temple Mountain and Jerusalem

#### Merovingian Dynasty and relations to Mary Magdalene

#### Exodus (Moses, Ark of coventant)

#### Holy Grail, King Arthur, Avalon

#### Priory of Sion

### Authors

* **Joerg Roth** - *Initial work* - [Leylines](https://github.com/leylines)

See also the list of [contributors](https://github.com/leylines/agensgraph/contributors) who participated in this project.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details



