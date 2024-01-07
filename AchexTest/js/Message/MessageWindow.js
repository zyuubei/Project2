/////////////////////////////////////////////////////////////
// メッセージウィンドウクラス
// メッセージウィンドウの描画、開く、メッセージ送り、閉じる機能を持つ
/////////////////////////////////////////////////////////////
phina.define('MessageWindow', {
    superClass: 'MySprite',

    init: function(id, name, messages) {        
        this.superInit('null', 100, 600, 1200, 300);
        this.id = id;                               // メッセージウィンドウ固有ID
        this.messages = messages;                   // メッセージ配列
        this.currentMessage = this.messages[0];     // 現在表示メッセージ
        this.name = name;                           //  発言者の名前
        this.alpha = 0.8;
        this.scaleX = 0;
        this.scaleY = 0;
        this._currentNo = 0;                       // 現在配列No

        // メッセージの話主の名前欄
        this.nameWindow = RectangleShape({
            x:0,
            y:0,
            width:150,
            height:80,
            originX:0,
            originY:0,
            padding:15,
            fill:"black",
            stroke:"white",
            strokeWidth:15,
            backgroundColor:"black",
            }).addChildTo(this);

        // メッセージの内容欄
        this.mainWindow = RectangleShape({
            x:0,
            y:110,
            width:1200,
            height:200,
            originX:0,
            originY:0,
            padding:15,
            fill:"black",
            stroke:"white",
            strokeWidth:15,
            backgroundColor:"black",
            }).addChildTo(this);

        this.nameLabel = Label({
            x:35,
            y:35,
            padding:0,
            text:this.name,
            fill:"white",
            strokeWidth:10,
            fontSize:42,
            fontWeight:"bold",
            fontFamily:"'Monaco','Consolas','MS 明朝'",
            align:"Left",
            baseline:"top",
            lineHeight:1.4,
        }).addChildTo(this.nameWindow);
        this.nameWindow = this.nameLabel.calcCanvasWidth();
        
        this.messageLabel = Label({
            x:35,
            y:100,
            text:this._messageArrange(this.currentMessage),
            fontSize:42,
            fontWeight:"bold",
            fontFamily:"'Monaco','Consolas','MS 明朝'",
            fill:"white",
            align:"Left",
            baseline:"top",
            lineHeight:1.4,
            padding:0,
            strokeWidth:10,
        }).addChildTo(this.mainWindow);

    },

    // メッセージウィンドウのテキスト送り
    messageNext: function(){
        if(this._currentNo < this.messages.length){ this._currentNo++; }
        this.currentMessage = this.messages[this._currentNo];
        this.currentMessage = this._messageArrange(this.currentMessage);
        this.messageLabel.text = this.currentMessage;

        // メッセージを全部表示し終わっていたらendフラグ立てる
        var end_flag = 0;
        if(this.currentMessage == null || this.currentMessage == undefined){
            this.currentMessage = "";
            this._currentNo = 0;
            end_flag = 1;
        }

        if(this.messageLabel.text == undefined){
            this.messageLabel.text = " ";
        }
        return end_flag;
    },    

    // メッセージウィンドウを開く
    openWindow: function(){
        this._currentNo = 0;
        this.currentMessage = this.messages[0];
        this.currentMessage = this._messageArrange(this.currentMessage);
        this.messageLabel.text = this.currentMessage;
        this.tweener.scaleTo(1.0,100).play();  // 開くアニメーション
    },

    // メッセージウィンドウを閉じる
    closeWindow: function(){
    },

    // phina.jsのラベルが文字の行数に応じて枠の高さが変わってしまうため
    // 改行を強制的に3つにする
    _messageArrange: function(message){
        if(message != undefined){
            var targetStr = "\n"
            var count = (message.match(new RegExp( targetStr, "g" )) || [] ).length;
            if(count == 0){
                message = message + "\n\n";
            }else if(count == 1){
                message = message + "\n";
            }else{            
            }
        }
        

        return message;
    }

});