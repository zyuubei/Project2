///////////////////////////////////////////////////////////////////////////////////////////////
// プレイヤーグラフィックの描画、遷移、編集などを行う環境クラス
///////////////////////////////////////////////////////////////////////////////////////////////
phina.define('PlayerAnimationContext', {
  superClass: 'MySprite',

  init: function(playerObj, headImage, bodyImage) {
    this.superInit('null', 0, 0, 42, 42);
    
    this.playerObj = playerObj;             // プレイヤー全データ
    this.headImage = headImage;             // 頭グラフィックチップの画像パス
    this.bodyImage = bodyImage;             // 体グラフィックチップの画像パス

    // アニメーションスピ＾ド
    this.animationSpeed = 1;  // アニメーション倍率 

    // アニメーションの登録
    this._standAnim  = PlayerAnimation1(this, this.headImage, this.bodyImage, Animation1Front, Animation1Left, Animation1Right, Animation1Back);  // 立ちグラフィックアニメーション
    this._runAnim    = PlayerAnimation2(this, this.headImage, this.bodyImage, Animation2Front, Animation2Left, Animation2Right, Animation2Back);  // 走行グラフィックアニメーション
    this._walkAnim   = PlayerAnimation3(this, this.headImage, this.bodyImage, Animation3Front, Animation3Left, Animation3Right, Animation3Back);  // 歩きグラフィックアニメーション    
    this.currentAnim = this._standAnim;   // 現在の描画グラフィック

    // アニメーションのdictionary
    this.animDict = {
      stand:this._standAnim,
      walk:this._walkAnim,
      run:this._runAnim
    };

  },

  // 更新処理
  update: function(app){
  },


  // 画像を遷移させる
  // 引数：transGraphicName → 文字列で指定される("standGraphic"とか)
  transferGraphic: function(transAnimName){
    // 指定されたグラフィックがdictionaryに存在したら
    if (this.animDict[transAnimName]) { 
      this.currentAnim.posFunction();                         // 遷移元から抜ける際の処理
      this.currentAnim = this.animDict[transAnimName];     // 遷移
      this.currentAnim.preFunction();                         // 遷移先に入る際の処理
      
      // 描画リフレッシュ
      this.refresh();
    }
    else{
      console.log("PlayerAnimContext : " + transAnimName + " is not found")
    }
  },

  // 向き反転
  Reverse: function(){
    for (let key in this.animDict) {
      if (this.animDict[key].scaleX >= 0){
        this.animDict[key].graphicInit();                                   // 各ステートグラフィック初期化
        this.animDict[key].scaleX = Math.abs(this.currentAnim.scaleX) * -1; // scaleを反転
        var offset = Math.abs(8 * this.animDict[key].scaleX);               // 反転した時に見た目の位置がずれるのでoffsetセット 
        this.animDict[key].x += (this.currentAnim.width - offset);          // オフセット反映
      }
    }
  },

  // 向き正常
  notReverse: function(){
    for (let key in this.animDict) {
      if (this.animDict[key].scaleX < 0){
        this.animDict[key].scaleX = Math.abs(this.currentAnim.scaleX);      // scaleを正常に
        this.animDict[key].x = 0;                                           // 反転していた時のoffsetをクリア
      }
    }
  },

  // 親スプライトの描画リフレッシュ
  refresh: function(){
    this.children = []                        // 親スプライトに描画されてる子スプライトをクリア
    this.backgroundImage.addChildTo(this);    // 背景設定
    this.currentAnim.addChildTo(this);        // 子スプライトを描画
  },

  // グラフィックアニメーションデータの初期化処理
  graphicInit: function(){
    this.currentAnim.graphicInit();
  },

});