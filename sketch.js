//Create variables here
var dog,foodStock,database,lastFed,food,name;

function preload()
{
	//load images here
  dogImg=loadImage("dogImg.png");
  happyImg=loadImage("dogImg1.png");
}

function setup() {
	createCanvas(500, 500);

  database=firebase.database();

  dog = createSprite(380,370,0,0);
  dog.addImage(dogImg);
  dog.scale=0.3;

  name=null;

  dogName=createInput("Dog's Name");
  dogName.position(500,140);

  setName=createButton("Set Name");
  setName.position(700,140);
  setName.mousePressed(addName);

  food=new Food();

}

function draw() { 
  background(46,139,87); 

  drawSprites();

  database.ref("FeedTime").on("value",(data)=>{
    lastFed=data.val();
  });

  foodStock=food.getFood();

  food.display();

  if(foodStock===0){
    dog.addImage(dogImg);
  }

  //add styles here
  textSize(20);
  fill("black");
  textAlign(CENTER);
  text("Food remaining: " +foodStock,250,180);

  text("Feed Your Dog "+name,250,50);
 
 

  if(lastFed>=12)
    text("Last fed time: " + lastFed%12 + " PM",150,420);
  else if(lastFed===0)
    text("Last fed time: 12",150,120);
  else
    text("Last fed time: " + lastFed + " AM",150,420);

}
    
function feedDog(){
  if(foodStock>0){
    dog.addImage(happyImg);

    food.updateFood((food.getFood())-1);
    database.ref("/").set({
      Food:(food.getFood()),
      FeedTime:hour()
    })
  }
}

function addFood(){
  if(foodStock<20){
    foodStock++;
    database.ref("/").set({
      Food:foodStock,
      FeedTime:hour()
    })
  }
}

function addName(){
  name=dogName.value();

  dogName.hide();
  setName.hide();

  feed=createButton("Feed "+name);
  feed.position(500,150);
  feed.mousePressed(feedDog);

  add=createButton("Add Food");
  add.position(650,150);
  add.mousePressed(addFood);
}