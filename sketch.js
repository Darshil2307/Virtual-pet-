var dog; 
var happyDog;
var database;
var foodS;
var foodStock;
var dognor;
        
function preload()
{
  dognor = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();



  dog = createSprite(250,300,250,250);
  dog.addImage(dognor);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
    foodStock.on("value",readStock);
}


function draw()
 {
   background(46,139,87) ; 
  dog.display();
  //text.display();

  if(keyWentUp(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  drawSprites();

  fill(255);
  stroke("black");
  text("food remaning :"+foodS,170,200);
  textSize(20);
  text("Note: Press UP_ARROW key to feed milk to Maxi",40,20);  
}

function readStock(data){
  foodS = data.val();
  }

  function writeStock(x){
    if(x <= 0){
      x = 20;
    }
    else{
      x = x-1;
    }
      database.ref("/").update({
        Food : x,
      })
    }
