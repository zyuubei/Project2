phina.define('ActionInterface', {
  superClass: 'ActorSprite',

  init: function(image, x, y, w, h) {
    this.superInit(image, x, y, w, h);
    
    // アクションID
    this.id = 0;

    // 発生前フレーム
    this.startFrame = 1;

    // 持続フレーム
    this.activeFrame = 1;

    // 発生後フレーム
    this.endFrame = 1;

    // 終了フラグ
    this.endFlag = 0;
    this.startFlag = 0;

    // フレームカウント
    this.__frameCnt = 0;

  },

  // 更新処理
  update: function(app){

    if(this.startFlag == 1){
      
      // 終了処理
      if(this.__frameCnt == this.startFrame + this.activeFrame+ this.endFrame){
        this.endFlag=1;
        this.startFlag=0;
        this.remove();
      }
      // 発生語フレーム
      else if(this.__frameCnt == this.startFrame + this.activeFrame){
        this.__endFrameFunction();
      }
      // 持続フレーム
      else if(this.__frameCnt == this.startFrame){
        this.__activeFrameFunction();
      }
      // 発生前フレーム
      else if(this.__frameCnt == 0){
        this.__startFrameFunction();
      }
      else{
        //pass
      }

      // フレームカウントアップ
      this.__frameCnt++;
    }

  },

  startAction:function(){
    this.startFlag = 1;
  },

  // 描画データの初期化
  __graphicInit: function(){
  },

  // 発生前フレーム処理
  __startFrameFunction: function(){
  },

  // 持続フレーム処理
  __activeFrameFunction: function(){
  },

  // 発生後フレーム処理
  __endFrameFunction: function(){
  },

});