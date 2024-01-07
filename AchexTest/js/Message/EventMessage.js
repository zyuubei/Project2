/////////////////////////////////////////////////////////////
// イベントメッセージ
/////////////////////////////////////////////////////////////
phina.define('EventMessage', {
    superClass: 'RectangleShape',

    init: function(x, y, message) {        
        this.superInit();
        this.x = x;
        this.y = y;
        this.width = 300;
        this.height = 33;
        this.originX = 0,
        this.originY = 0,
        this.padding = 1,
        this.fill = "black",
        this.backgroundColor = "rgb(30,30,30)",
        this.strokeWidth = 2;
        this.stroke = "white";
        this.alpha = 0.8;
        this.remove_flag = 0;

        this.messageLabel = Label({
            x:10,
            y:10,
            text:message,
            fontSize:24,
            fontWeight:"bold",
            fontFamily:"'Monaco','Consolas','MS 明朝'",
            fill:"white",
            align:"Left",
            baseline:"top",
            lineHeight:1.4,
            padding:0,
            strokeWidth:10,
        }).addChildTo(this);
        
        this.time=0;
    },

    update: function(app){
        this.time += app.deltaTime;
        if(this.time > 10000){
            this.remove_flag = 1;
            this.time = 0;
        }

    },

    positionShift: function(to_x, to_y, time) {
        this.tweener.to({
            x:this.x + to_x,
            y:this.y + to_y,
        },time,"swing").call(function(){
        }).play();
    },


});