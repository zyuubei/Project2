
///////////////////////////////////////////////////////////////
// プレイヤーアクション1
// 
///////////////////////////////////////////////////////////////
phina.define('Action1', {
  superClass: 'ActionInterface',

  init: function(x, y) {

    // Action画像をAssetに追加
    var img = 'NormalAttack1';
    var w = 32;
    var h = 32;
    this.superInit(img, x, y, w, h);
    
    // 管理用データ
    this.name = "NormalAttack1";  // アクション名称
    this.id = 1;                  // アクションID

    // アニメーションデータ
    this.alpha = 0;               // 初期透明度
    this.startFrame   = 2;       // 発生前フレーム
    this.activeFrame  = 10;      // 持続フレーム
    this.endFrame     = 2;       // 発生後フレーム    
    this.anim  = FrameAnimation('playerAction1_ss').attachTo(this);
    this.anim.ss.getAnimation('start').frequency = 2;   // アニメーションのコマ送り速度
    this.anim.ss.getAnimation('active').frequency = 2;  // 同上
    this.anim.ss.getAnimation('end').frequency = 3;     // 同上 

    // 当たり判定データ
    this.hitBoxContainer.createHitBox(this, 5,5,20,15); // 当たり判定    
    this.hitBoxContainer.addChildTo(this);
    this.hitBoxContainer.DeActive();         // 当たり判定非アクティブ化
  },


  // 発生前フレーム処理
  __startFrameFunction: function(){
    this.alpha = 1;                 // (当たり判定)発生前から表示開始
    this.anim.gotoAndPlay('start'); // 開始アニメーション
  },

  // 持続フレーム処理
  __activeFrameFunction: function(){
    this.hitBoxContainer.Active();             // 当たり判定発生
    this.anim.gotoAndPlay('active');  // 持続アニメーション
  },

  // 発生後フレーム処理
  __endFrameFunction: function(){
    this.anim.gotoAndPlay('end');
  },

});


///////////////////////////////////////////////////////////////
// プレイヤーアクション2
// 
// 
// 
///////////////////////////////////////////////////////////////
phina.define('Action2', {
  superClass: 'ActionInterface',

  init: function(x, y) {

    var img = 'NormalAttack2';
    var w = 32;
    var h = 32;
    this.superInit(img, x, y, w, h);
    
    // 管理用データ
    this.name = "NormalAttack2";  // アクション名称
    this.id = 2;                  // アクションID

    // アニメーションデータ
    this.alpha = 0;               // 初期透明度
    this.startFrame   = 5;       // 発生前フレーム
    this.activeFrame  = 20;      // 持続フレーム
    this.endFrame     = 5;       // 発生後フレーム    
    this.anim  = FrameAnimation('playerAction1_ss').attachTo(this);
    this.anim.ss.getAnimation('start').frequency = 5;   // アニメーションのコマ送り速度
    this.anim.ss.getAnimation('active').frequency = 5;  // 同上
    this.anim.ss.getAnimation('end').frequency = 5;     // 同上 

    // 当たり判定データ
    this.hitBoxContainer.createHitBox(this, 5,5,20,25); // 当たり判定    
    this.hitBoxContainer.addChildTo(this);
    this.hitBoxContainer.DeActive();         // 当たり判定非アクティブ化
  },


  // 発生前フレーム処理
  __startFrameFunction: function(){
    this.alpha = 1;                 // (当たり判定)発生前から表示開始
    this.anim.gotoAndPlay('start'); // 開始アニメーション
  },

  // 持続フレーム処理
  __activeFrameFunction: function(){
    this.hitBoxContainer.Active();             // 当たり判定発生
    this.anim.gotoAndPlay('active');  // 持続アニメーション
  },

  // 発生後フレーム処理
  __endFrameFunction: function(){
    this.anim.gotoAndPlay('end');
  },

});


///////////////////////////////////////////////////////////////
// プレイヤーアクション3
// 
// 
// 
///////////////////////////////////////////////////////////////
phina.define('Action3', {
  superClass: 'ActionInterface',

  init: function(x, y) {

    var img = 'NormalAttack3';
    var w = 40;
    var h = 40;
    this.superInit(img, x, y, w, h);
    
    // 管理用データ
    this.name = "NormalAttack3";  // アクション名称
    this.id = 3;                  // アクションID

    // アニメーションデータ
    this.alpha = 0;               // 初期透明度
    this.startFrame   = 15;       // 発生前フレーム
    this.activeFrame  = 120;      // 持続フレーム
    this.endFrame     = 15;       // 発生後フレーム    
    this.anim  = FrameAnimation('playerAction3_ss').attachTo(this);
    this.anim.ss.getAnimation('start').frequency = 5;   // アニメーションのコマ送り速度
    this.anim.ss.getAnimation('active').frequency = 5;  // 同上
    this.anim.ss.getAnimation('end').frequency = 5;     // 同上 

    // 当たり判定データ
    this.hitBoxContainer.createHitBox(5,15,30,15); // 当たり判定
    this.hitBoxContainer.addChildTo();
    this.hitBoxContainer.DeActive();         // 当たり判定非アクティブ化
    this.hitBoxContainer.UnVisible();         // 当たり判定非アクティブ化  },
  },

  // 発生前フレーム処理
  __startFrameFunction: function(){
    this.alpha = 1;                 // (当たり判定)発生前から表示開始
    this.anim.gotoAndPlay('start'); // 開始アニメーション
  },

  // 持続フレーム処理
  __activeFrameFunction: function(){
    this.hitBoxContainer.Active();             // 当たり判定発生
    this.hitBoxContainer.Visible();             // 当たり判定発生
    this.anim.gotoAndPlay('active');  // 持続アニメーション
  },

  // 発生後フレーム処理
  __endFrameFunction: function(){
    this.anim.gotoAndPlay('end');
  },


});