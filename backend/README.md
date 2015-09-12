

Curls

create seller:

curl -H "Content-Type: application/json" -X POST -d \
    '{"name":"Eriks teashop", "address": "Drottninggatan 12"}' \
    http://146.148.25.35/api/sellers




create item:

curl -H "Content-Type: application/json" -X POST -d \
    '{"title" : "Bulle", "endTime" : "2015-09-12T19:00:00Z", "price" : 10, "amount" : 5, "sellerId" : "55f442927ddd3ada0a000001"}' \
    http://146.148.25.35/api/items


curl -H "Content-Type: application/json" -X POST -d \
    '{"title" : "Bulle", "endTime" : "2015-09-12T19:00:00Z", "price" : 10, "amount" : 5, "sellerId" : "55f442927ddd3ada0a000001"}' \
    http://localhost:8080/api/items




get item by id:

curl http://localhost:8080/api/items/55f43b189080ea0000000001


get items by seller:

curl     http://localhost:8080/api/sellers/55f434732475640000000001/items


post images

curl -v -X POST -F "image=@/Users/wallenius/Downloads/walter.jpg" http://146.148.25.35/api/images




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








