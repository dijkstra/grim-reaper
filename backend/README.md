

Curls

create seller:

curl -H "Content-Type: application/json" -X POST -d \
    '{"name":"Eriks teashop", "address": "Drottninggatan 12"}' \
    http://localhost:8080/api/sellers




create item:

curl -H "Content-Type: application/json" -X POST -d \
    '{"name":"Eriks teashop", "address": "Drottninggatan 12"}' \
    http://localhost:8080/api/sellers

var item = new Item();
item.sellerId = "55f434732475640000000001";
item.title = "Bulle2";
item.amount = 5;
item.price = 10;
item.endTime = new Date('2015-09-12 21:00');




get item by id:

curl http://localhost:8080/api/items/55f43b189080ea0000000001


get items by seller:

curl     http://localhost:8080/api/sellers/55f434732475640000000001/items