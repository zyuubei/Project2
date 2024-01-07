/////////////////////////////////////////////////////////////
// Enemyのステート親
/////////////////////////////////////////////////////////////
phina.define('EnemyStateInterface', {

  init: function(enemyObj) {
  },

  // 更新処理
  update: function(app){
  },

  // ステート遷移のpos実行処理
  posFunction: function(){
  },

  // ステート遷移時のpre実行処理
  preFunction: function(){
  },

});


/////////////////////////////////////////////////////////////
// Enemyのステート親
/////////////////////////////////////////////////////////////
phina.define('EnemyStateParent', {
  superClass: 'EnemyStateInterface',

  init: function(enemyObj) {
    this.superInit(enemyObj);

    this._frameCnt=0;
  },

  // 更新処理
  update: function(app){
  },

  // ステート遷移のpos実行処理
  posFunction: function(){
  },

  // ステート遷移時のpre実行処理
  preFunction: function(){
  },

});


/////////////////////////////////////////////////////////////
// TestEnemyの立ちステート
/////////////////////////////////////////////////////////////
phina.define('EnemyState1', {
  superClass: 'EnemyStateParent',

  init: function(enemyObj) {
    this.superInit(enemyObj);

    this._frameCnt=0;
  },

  // 更新処理
  update: function(app){
  },

  // ステート遷移のpos実行処理
  posFunction: function(){
    console.log("TestEnemyStateStand : " + "Leave")
  },

  // ステート遷移時のpre実行処理
  preFunction: function(){
    console.log("TestEnemyStateStand : " + "Enter");
    this.enemyObj.animContext.transferGraphic("stand");

  },

});

/////////////////////////////////////////////////////////////
// TestEnemyの立ちステート
/////////////////////////////////////////////////////////////
phina.define('TestEnemyStateStand', {
  superClass: 'EnemyStateParent',

  init: function(enemyObj) {
    this.superInit(enemyObj);

    this._frameCnt=0;
  },

  // 更新処理
  update: function(app){
  },

  // ステート遷移のpos実行処理
  posFunction: function(){
    console.log("TestEnemyStateStand : " + "Leave")
  },

  // ステート遷移時のpre実行処理
  preFunction: function(){
    console.log("TestEnemyStateStand : " + "Enter");
    this.enemyObj.animContext.transferGraphic("stand");

  },

});

/////////////////////////////////////////////////////////////
// TestEnemyの攻撃予備動作ステート
/////////////////////////////////////////////////////////////
phina.define('TestEnemyStateAttackAntic', {
  superClass: 'EnemyStateParent',

  init: function(enemyObj) {
    this.superInit(enemyObj);

    this._frameCnt = 0;
  },

  // 更新処理
  update: function(app){
    this._frameCnt++;
    if(this._frameCnt > 30){
      this.enemyObj.stateContext.transferState("attackState");
    }
  },

  // ステート遷移のpos実行処理
  posFunction: function(){
    this._frameCnt=0;
    console.log("TestEnemyStateAttackAntic : " + "Leave")
  },

  // ステート遷移時のpre実行処理
  preFunction: function(){
    console.log("TestEnemyStateAttackAntic : " + "Enter")
    this.enemyObj.animContext.transferGraphic("attackAntic");

  },

});


/////////////////////////////////////////////////////////////
// TestEnemyの攻撃ステート
/////////////////////////////////////////////////////////////
phina.define('TestEnemyStateAttack', {
  superClass: 'EnemyStateParent',

  init: function(enemyObj) {
    this.superInit(enemyObj);
    this._frameCnt = 0;
  },

  // 更新処理
  update: function(app){
    this._frameCnt++;

    if(this._frameCnt == 5){
      //this.enemyObj.mainObj.ActionShot();
    }

    if(this._frameCnt > 90){
      this.enemyObj.stateContext.transferState("standState");
    }

  },

  // ステート遷移のpos実行処理
  posFunction: function(){
    this._frameCnt = 0;
    console.log("TestEnemyStateAttack : " + "Leave")
  },

  // ステート遷移時のpre実行処理
  preFunction: function(){
    console.log("TestEnemyStateAttack : " + "Enter")
    this.enemyObj.animContext.transferGraphic("attack");

  },

});

