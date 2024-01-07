phina.define('MySprite', {
  superClass: 'phina.display.Sprite',

  /*
    image:  画像パス
    name:   パーツ識別用の名前
    x:      x座標
    y:      y座標
    width:   幅
    height:  高さ
  */
  init: function(image, x, y, width, height) {
    this.superInit(image, width, height);
    this.x = x;     // 描画スプライトからの相対x
    this.y = y;     // 描画スプライトからの相対y
    this.width = width;
    this.height = height;
    this.originX = 0;
    this.originY = 0;

    this.backgroundImage = RectangleShape({originX:0,originY:0,width:this.width,height:this.height,padding:0,backgroundColor:"red",fill:"red"}).addChildTo(this).setPosition(0,0);
    this.backgroundImage.visible = false;

  },
  
  draw: function(canvas){
    canvas.save();                        //canvasの状態をスタックに保存
    canvas.imageSmoothingEnabled = false; //ここがミソ拡大時の補完を無効に
    this.superMethod('draw', canvas);     //スーパークラスのdrawメソッド呼び出し
    canvas.restore();                     //他に影響が出ないように状態を戻す
  },

  
  // バックグラウンドカラーを可視化
  backgroundVisible: function(){
    this.backgroundImage.visible = true;
  },

  // バックグラウンドカラーを透明化
  backgroundInvisible: function(){
    this.backgroundImage.visible = false;
  },

});