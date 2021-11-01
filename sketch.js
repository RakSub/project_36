var dog, happyDog,dogImage,happyDogImage;
var database;
var foodS, foodStock;


var feedPet, addFood;
var fedTime, lastFed;
var foodObj;



function preload()
{
dogImage = loadImage("images/Dog.png");
happyDogImage = loadImage("images/happydog.png");


}

function setup() {
 
	createCanvas(1000,400);
  foodObj= new Food();
  
  database = firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feedPet= createButton("Feed the Dog");
  feedPet.position(700,95);
  feedPet.mousePressed(feedDog);

  addFood= createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFood);
  dog = createSprite(800,200,150,150);
  dog.addImage(dogImage)
  dog.scale=0.15;
  
}


function draw() {  
background(46,139,87);
  
  foodObj.display();
  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  });
  fill(255,255,254);
  textSize(15);
  if(lastFed>= 12){
    text("lastFed:"+lastFed%12+" pm ", 350,30);
  }
  else if(lastFed == 0){
    text("lastFed: 12 AM", 350,30);
  }
  else{  text("lastFed:"+lastFed+" am ", 350,30);

  }
drawSprites();
  
}




function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}
  
function feedDog(){
  dog.addImage(happyDog);
  if (foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else{
   foodObj.updateFoodStock(foodObj.getFoodStock()-1);    
  }
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime: hour()
  });

}

function addFoods(){
  foodS++;
  database.ref("/").update({
    Food:foodS
  });
}