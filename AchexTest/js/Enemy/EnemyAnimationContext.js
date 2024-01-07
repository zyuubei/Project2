///////////////////////////////////////////////////////////////////////////////////////////////
// グラフィックの描画、遷移、編集などを行う環境クラス
///////////////////////////////////////////////////////////////////////////////////////////////
phina.define('EnemyAnimationContextParent', {
  superClass: 'MySprite',

  init: function(mainObj,image) {
    this.superInit('null', 0, 0, mainObj.width, mainObj.height);
    
    this.mainObj = mainObj;               // プレイヤーデータ

    this.backgroundImage = RectangleShape({originX:0,originY:0,width:this.width,height:this.height,padding:0,backgroundColor:"green",fill:"green"}).addChildTo(this).setPosition(0,0);
    this.currentAnim;                             // 現在の描画グラフィック

    // グラフィックのdictionary
    this.animDict = {};

    // 描画リフレッシュ
    this.refresh();
    this.backgroundInvisible();

  },

  // 更新処理
  update: function(app){
    this.currentAnim.update();
  },


  // 画像を遷移させる
  // 引数：transGraphicName → 文字列で指定される("standGraphic"とか)
  transferGraphic: function(transGraphicName){
    // 指定されたグラフィックがdictionaryに存在したら
    if (this.animDict[transGraphicName]) { 
      this.currentAnim.posFunction();                          // 遷移元から抜ける際の処理
      this.currentAnim = this.animDict[transGraphicName];   // 遷移
      this.currentAnim.preFunction();                          // 遷移先に入る際の処理
      
      // 描画リフレッシュ
      this.refresh();
    }
    else{
      console.log("EnemyGraphicContext : " + transGraphicName + " is not found")
    }
  },

  // 向き反転
  Reverse: function(){
    for (let key in this.animDict) {
      if (this.animDict[key].scaleX >= 0){
        this.animDict[key].graphicInit();                                      // 各ステートグラフィック初期化
        this.animDict[key].scaleX = Math.abs(this.currentAnim.scaleX) * -1; // scaleを反転
        var offset = Math.abs(8 * this.animDict[key].scaleX);                  // 反転した時に見た目の位置がずれるのでoffsetセット 
        this.animDict[key].x += (this.currentAnim.width - offset);          // オフセット反映
      }
    }
  },

  // 向き正常
  notReverse: function(){
    for (let key in this.animDict) {
      if (this.animDict[key].scaleX < 0){
        this.animDict[key].scaleX = Math.abs(this.currentAnim.scaleX);      // scaleを正常に
        this.animDict[key].x = 0;                                              // 反転していた時のoffsetをクリア
      }
    }
  },

  // 親スプライトの描画リフレッシュ
  refresh: function(){
    this.children = []                        // 親スプライトに描画されてる子スプライトをクリア
    this.backgroundImage.addChildTo(this);    // 背景設定
    this.currentAnim.addChildTo(this);     // 子スプライトを描画
  },

  // グラフィックアニメーションデータの初期化処理
  graphicInit: function(){
    this.currentAnim.graphicInit();
  },

  // プレイヤーグラフィックを可視化
  graphicVisible: function(){
    this.visible = true;
  },

  // プレイヤーグラフィックを透明化
  graphicInvisible: function(){
    this.visible = false;
  },

});



///////////////////////////////////////////////////////////////////////////////////////////////
// グラフィックの描画、遷移、編集などを行う環境クラス
///////////////////////////////////////////////////////////////////////////////////////////////
phina.define('TestEnemyAnimationContext', {
  superClass: 'MySprite',

  init: function(mainObj,image) {
    this.superInit('null', 0, 0, mainObj.width, mainObj.height);
    
    this.mainObj = mainObj;               // プレイヤーデータ

    this.backgroundImage = RectangleShape({originX:0,originY:0,width:this.width,height:this.height,padding:0,backgroundColor:"green",fill:"green"}).addChildTo(this).setPosition(0,0);

    this._standAnim        = EnemyAnimation1(this,image);       // 走行グラフィックアニメーション
    this._attackAnticAnim  = EnemyAnimation2(this,image);       // 立ちグラフィックアニメーション
    this._attackAnim       = EnemyAnimation3(this,image);       // 歩きグラフィックアニメーション    
    this.currentAnim = this._standAnim;                         // 現在の描画グラフィック

    // グラフィックのdictionary
    this.animDict = {
      stand:this._standAnim,
      attackAntic:this._attackAnticAnim,
      attack:this._attackAnim
    };

  },


});