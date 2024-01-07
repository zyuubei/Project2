/////////////////////////////////////////////////////////////
// メッセージウィンドウクラス
// メッセージウィンドウの描画、開く、メッセージ送り、閉じる機能を持つ
/////////////////////////////////////////////////////////////
phina.define('EventMessageWindow', {
    superClass: 'MySprite',

    init: function() {        
        this.superInit('null', 1000, 0, 300, 300);
        this.eventMessageList = [];
        this.listMax = 10;
        this.alpha = 0.8;

        // メッセージの内容欄
        this.mainWindow = RectangleShape({
            x:0,
            y:0,
            width:400,
            height:400,
            originX:0,
            originY:0,
            padding:15,
            fill:"transparent",
            stroke:"transparent",
            alpha:0,
        }).addChildTo(this);

    },

    update: function(){
        // メッセージラベルが枠上限を超えたら古いやつを削除
        if(this.eventMessageList.length !=0 ){
            for(var i=0; i < this.eventMessageList.length;i++){
                if(this.eventMessageList[i].remove_flag == 1){
                    this.eventMessageList[i].remove();
                    this.eventMessageList.pop();
                }
            }
        }
    },


    // イベントメッセージ追加
    addMessage: function(message){
        // メッセージラベルが枠上限を超えたら古いやつを削除
        if(this.eventMessageList.length >= this.listMax){
            this.eventMessageList[this.listMax-1].remove();
            this.eventMessageList.pop();
        }
                
        //メッセージラベル作成
        var em = EventMessage(30,0,message);   
        this.eventMessageList.unshift(em);
        em.addChildTo(this.mainWindow);

        for(var i=0; i < this.eventMessageList.length;i++){
            this.eventMessageList[i].positionShift(0, 35, 200);
        }

        
    },    


});