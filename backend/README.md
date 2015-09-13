

Curls

create seller:

curl -H "Content-Type: application/json" -X POST -d \
    '{"name":"Eriks teashop", "address": "Drottninggatan 12"}' \
    http://146.148.25.35/api/sellers




create item:

curl -H "Content-Type: application/json" -X POST -d \
    '{"title" : "Bulle", "endTime" : "2015-09-12T19:00:00Z", "price" : 10, "amount" : 5, "sellerId" : "55f442927ddd3ada0a000001", "imageId": "55f498628db5c40000000001"}' \
    http://146.148.25.35/api/items


curl -H "Content-Type: application/json" -X POST -d \
    '{"title" : "Bulle", "endTime" : "2015-09-12T19:00:00Z", "price" : 10, "amount" : 5, "sellerId" : "55f442927ddd3ada0a000001"}' \
    http://localhost:8080/api/items




get item by id:

curl http://localhost:8080/api/items/55f43b189080ea0000000001


get items by seller:

curl     http://localhost:8080/api/sellers/55f434732475640000000001/items


post images

curl -v -X POST -F "image=@/Users/wallenius/Downloads/Battlehack/kanelbulle-recept.jpg" http://146.148.25.35/api/images
55f528c5eb3d2f5b51000001

curl -X POST -F "image=@/Users/wallenius/Downloads/Battlehack/kottbullemacka_01.jpg" http://146.148.25.35/api/images
55f5291feb3d2f5b51000003

curl -X POST -F "image=@/Users/wallenius/Downloads/Battlehack/peppes limpa.JPG" http://146.148.25.35/api/images
55f5291feb3d2f5b51000005

curl -X POST -F "image=@/Users/wallenius/Downloads/Battlehack/shrimpsandwish-2.jpg" http://146.148.25.35/api/images
55f5291feb3d2f5b51000008

curl -X POST -F "image=@/Users/wallenius/Downloads/Battlehack/smorgastarta.jpg" http://146.148.25.35/api/images
55f52920eb3d2f5b5100000a

curl -X POST -F "image=@/Users/wallenius/Downloads/Battlehack/vallmo-frallor.jpg" http://146.148.25.35/api/images
55f52920eb3d2f5b51000010




{
    "_id" : ObjectId("55f442927ddd3ada0a000001"),
    "address" : "Riddargatan 4",
    "name" : "Konditori Sturekatten",
}
{
    "_id" : ObjectId("55f442ab7ddd3ada0a000002"),
    "address" : "Drottninggatan 81",
    "name" : "Espresso House",
}
{
    "_id" : ObjectId("55f52a9a57190cdedef2aade"),
    "address" : "Kungsgatan 14",
    "name" : "Cafe Vurma",
}










#### Server setup
Static ip: 146.148.25.35

sudo apt-get update
sudo apt-get install mongodb
curl --silent --location https://deb.nodesource.com/setup_0.12 | sudo bash -
sudo apt-get install --yes nodejs

ssh-keygen -t rsa
cat .ssh/id_rsa.pub   # Add to Github

git clone git@github.com:dijkstra/grim-reaper.git

cd grim-reaper/backend/
npm install
sudo PORT=80 node server.js








