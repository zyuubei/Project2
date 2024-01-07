/////////////////////////////////////////////////////////////
// TestEnemyのグラフィックインターフェース
/////////////////////////////////////////////////////////////
phina.define('EnemyAnimationInterface', {
  superClass: 'MySprite',

  init: function(graphicObj) {
      this.superInit('null', 0, 0, graphicObj.width, graphicObj.height);
  },

  // 更新処理
  update: function(app){

  },

  // グラフィック遷移のpos実行処理
  posFunction: function(){
  },

  // グラフィック遷移のpos実行処理
  preFunction: function(){
  },

  // グラフィック描画データの初期化
  graphicInit: function(){
  },
  
});

/////////////////////////////////////////////////////////////
// Enemyのグラフィック親クラス
// グラフィッククラスはこのクラスを継承すること
/////////////////////////////////////////////////////////////
phina.define('EnemyAnimationParent', {
  superClass: 'EnemyAnimationInterface',

  init: function(graphicObj) {
      this.superInit('null', 0, 0, graphicObj.width, graphicObj.height);
  },

  // 更新処理
  update: function(app){

  },

  // グラフィック遷移のpos実行処理
  posFunction: function(){
  },

  // グラフィック遷移のpos実行処理
  preFunction: function(){
  },

  // グラフィック描画データの初期化
  graphicInit: function(){
  },
  
});


/////////////////////////////////////////////////////////////
// TestEnemyの立ちグラフィック
/////////////////////////////////////////////////////////////
phina.define('EnemyAnimation1', {
  superClass: 'EnemyAnimationInterface',

  init: function(graphicObj, image) {
    this.superInit(graphicObj);
    this.graphicObj   = graphicObj;
    
    this.mainSp       = Sprite('null',0,0,this.graphicObj.width, this.graphicObj.height); // mainSp
    this.testEnemySp  = MySprite(image,0,0,this.graphicObj.width, this.graphicObj.height).addChildTo(this.mainSp);
    this.anim1        = FrameAnimation('testEnemy_stand_right_ss').attachTo(this.testEnemySp);    

    this.outlineSp      = Sprite('null',0,0,this.graphicObj.width, this.graphicObj.height); // mainSpから作った黒縁のスプライト
    this.testEnemySp_ol = EnemyOutlineSprite(image,0,0,this.graphicObj.width, this.graphicObj.height).addChildTo(this.outlineSp);
    this.anim1_ol       = FrameAnimation('testEnemy_stand_right_ss').attachTo(this.testEnemySp_ol); 

    this.outlineSp.addChildTo(this);
    this.mainSp.addChildTo(this);       

    this.anim1.gotoAndPlay('stand_right');
    this.anim1_ol.gotoAndPlay('stand_right');

    this._frameCnt=0;

  },

  // 更新処理
  update: function(){

  },

  // グラフィック遷移のpos実行処理
  posFunction: function(){
    console.log("TestEnemyGraphicStand : " + "Leave");
  },

  // グラフィック遷移のpre実行処理
  preFunction: function(){
    console.log("TestEnemyGraphicStand : " + "Enter");
  },

  // グラフィック描画データの初期化
  graphicInit: function(){

  },


});


/////////////////////////////////////////////////////////////
// TestEnemyの攻撃予備動作グラフィック
/////////////////////////////////////////////////////////////
phina.define('EnemyAnimation2', {
  superClass: 'EnemyAnimationInterface',

  init: function(graphicObj, image) {
    this.superInit(graphicObj);
    this.graphicObj      = graphicObj;

    this.mainSp       = Sprite('null',0,0,this.graphicObj.width, this.graphicObj.height); // mainSp
    this.testEnemySp  = MySprite(image,0,0,this.graphicObj.width, this.graphicObj.height).addChildTo(this.mainSp);
    this.anim1        = FrameAnimation('testEnemy_stand_right_ss').attachTo(this.testEnemySp);    

    this.outlineSp      = Sprite('null',0,0,this.graphicObj.width, this.graphicObj.height); // mainSpから作った黒縁のスプライト
    this.testEnemySp_ol = EnemyOutlineSprite(image,0,0,this.graphicObj.width, this.graphicObj.height).addChildTo(this.outlineSp);
    this.anim1_ol       = FrameAnimation('testEnemy_stand_right_ss').attachTo(this.testEnemySp_ol); 

    this.outlineSp.addChildTo(this);
    this.mainSp.addChildTo(this);

    this.anim1.gotoAndPlay('attackAntic_right');
    this.anim1_ol.gotoAndPlay('attackAntic_right');

    this._frameCnt = 0;

  },

  // 更新処理
  update: function(){

  },

  // グラフィック遷移のpos実行処理
  posFunction: function(){
    console.log("TestEnemyGraphicAttackAntic : " + "Leave");
  },

  // グラフィック遷移のpre実行処理
  preFunction: function(){
    console.log("TestEnemyGraphicAttackAntic : " + "Enter");    
  },

  // グラフィック描画データの初期化
  graphicInit: function(){
    
  },

});

/////////////////////////////////////////////////////////////
// TestEnemyの攻撃グラフィック
/////////////////////////////////////////////////////////////
phina.define('EnemyAnimation3', {
  superClass: 'EnemyAnimationInterface',

  init: function(graphicObj, image) {
    this.superInit(graphicObj);
    this.graphicObj      = graphicObj;

    this.mainSp       = Sprite('null',0,0,this.graphicObj.width, this.graphicObj.height); // mainSp
    this.testEnemySp  = MySprite(image,0,0,this.graphicObj.width, this.graphicObj.height).addChildTo(this.mainSp);
    this.anim1        = FrameAnimation('testEnemy_stand_right_ss').attachTo(this.testEnemySp);    

    this.outlineSp      = Sprite('null',0,0,this.graphicObj.width, this.graphicObj.height); // mainSpから作った黒縁のスプライト
    this.testEnemySp_ol = EnemyOutlineSprite(image,0,0,this.graphicObj.width, this.graphicObj.height).addChildTo(this.outlineSp);
    this.anim1_ol       = FrameAnimation('testEnemy_stand_right_ss').attachTo(this.testEnemySp_ol); 

    this.outlineSp.addChildTo(this);
    this.mainSp.addChildTo(this);       

    this.anim1.gotoAndPlay('attack_right');
    this.anim1_ol.gotoAndPlay('attack_right');

    this._frameCnt = 0;
  },

  // 更新処理
  update: function(){

  },

  // グラフィック遷移のpos実行処理
  posFunction: function(){
    this._frameCnt=0;
    console.log("TestEnemyGraphicAttack : " + "Leave");
  },

  // グラフィック遷移のpre実行処理
  preFunction: function(){
    console.log("TestEnemyGraphicAttack : " + "Enter");
  },

  // グラフィック描画データの初期化
  graphicInit: function(){
  },

});
