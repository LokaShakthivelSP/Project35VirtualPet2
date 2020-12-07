class Food{
    constructor(){
        this.image=loadImage("Milk.png");
        this.foodStock=null;
        this.lastFed=0;
    }
    getFood(){
        database.ref("Food").on("value",(data)=>{
            this.foodStock=data.val();
        });
        return this.foodStock;
    }
    updateFood(x){
        database.ref("/").set({
            Food:x
        });
    }
    display(){
        var x=40;
        var y=170;

        imageMode(CENTER);

        if(this.foodStock!==0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10===0){
                    x=40;
                    y+=50;
                }
                image(this.image,x,y,60,60);
                x=x+30;
            }
        }
    }
}