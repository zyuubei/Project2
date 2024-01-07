phina.define('PlayerStateInterface', {

  init: function(playerObj) {    
    // プレイヤーのステート情報を取得(値参照)
    this.playerObj = playerObj;
  },

  // 毎フレーム更新処理
  update: function(app){
  },
  
  // ステート遷移のpos実行処理
  posFunction: function(){
  },

  // ステート遷移時のpre実行処理
  preFunction: function(){
  },

});

phina.define('PlayerStateParent', {
  superClass: 'PlayerStateInterface',

  init: function(playerObj) {
    this.superInit(playerObj);
    this.name = "";
  },

  // 更新処理
  update: function(app){
  },
  
  // ステート遷移時のpre実行処理
  preFunction: function(){
  },

  // ステート遷移のpos実行処理
  posFunction: function(){
  },

});


phina.define('PlayerState1', {
  superClass: 'PlayerStateParent',

  init: function(playerObj) {
    this.superInit(playerObj);
    this.name = "stand";

  },

  // 更新処理
  update: function(app){
  },
  
  // ステート遷移時のpre実行処理
  preFunction: function(){
    console.log("PlayerStateStand : " +"Enter StandState");
    this.playerObj.animContext.transferGraphic("stand");
  },

  // ステート遷移のpos実行処理
  posFunction: function(){
    console.log("PlayerStateStand : " +"Leave StandState");

  },

});




phina.define('PlayerState2', {
  superClass: 'PlayerStateParent',

  init: function(playerObj) {
    this.superInit(playerObj);
    this.name = "run";

  },

  // 更新処理
  update: function(app){
  },

  // ステート遷移時のpre実行処理
  preFunction: function(){
    console.log("PlayerStateRun : " + "Enter RunState")
    this.playerObj.speed = 16;
    this.playerObj.animContext.transferGraphic("run");
  },


  // ステート遷移のpos実行処理
  posFunction: function(){
    console.log("PlayerStateRun : " + "Leave RunState");
    this.playerObj.speed = 8;
  },


});




phina.define('PlayerState3', {
  superClass: 'PlayerStateParent',

  init: function(playerObj) {
    this.superInit(playerObj);
    this.name = "walk";

  },

  // 更新処理
  update: function(app){
  },

  // ステート遷移時のpre実行処理
  preFunction: function(){
    console.log("PlayerStateWalk : " + "Enter WalkState")
    this.playerObj.animContext.transferGraphic("walk");
  },

  // ステート遷移のpos実行処理
  posFunction: function(){
    console.log("PlayerStateWalk : " + "Leave WalkState")
  },

});


