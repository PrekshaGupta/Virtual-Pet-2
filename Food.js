class Food{
    constructor(){
    this.foodStock = foodStock;
    }
 

    preload(){
        this.image = addImage("images/Milk.png");
    }

    getFoodStock(){
        var foodCountref = database.ref('Food');
        foodCountref.on("value", function (data){
            food = data.val();
        })
    }

    updateFoodStock(){
        database.ref('/').update({
            Food: foodStock
        })
    }

    deductFood(){}

    display(){
        var x = 80, y = 100;

        imageMode(CENTER);
        image(this.image, 720, 220, 70, 70);

        if (this.foodStock!=0){
        for(var i = 0; i<this.foodStock; i++){
            if(i%10==0){
                x = 80;
                y = y+50;
            }
            image(this.image,x,y,50,50);
            x = x+30;
          }
        }
    }
}