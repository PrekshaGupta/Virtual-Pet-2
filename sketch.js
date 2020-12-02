//Create variables here
var dog, happyDog;
var DogImg, happyDogImg;
var database;
var foodS, foodStock;
var feed, addFood; // for buttons
var fedTime, lastFed;
var foodObj;

function preload(){
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  food = new Food();

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function draw() {  
  background(46,139,87);

  //if (keyDown(UP_ARROW)){
  //  writeStock(foodS);
  //  dog.addImage(happyDogImg)
  //}

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })

  food.display();

  //add styles here
  drawSprites();
  textSize(13);
  fill(255,255,255);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  text("NOTE: Press UP_ARROW Key to feed Drago milk!",130,30)

}

//Function to read values from database
function readStock(data){
  foodS = data.val();
}

//Function to write values in database
function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}