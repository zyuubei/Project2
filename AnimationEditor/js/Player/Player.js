/////////////////////////////////////////////////////////////
// プレイヤーキャラクターインターフェースクラス
/////////////////////////////////////////////////////////////
phina.define('PlayerInterface', {
  superClass: 'ActorSprite',

  init: function() {
    this.superInit('null', 0, 0, 42, 42);
  },

  // 更新
  update: function(app){
  },

  // 前向き
  LookFront: function(){

  },

  // 左向き
  LookLeft: function(){
  },

  // 右向き
  LookRight: function(){
  },

  // 後向き
  LookBack: function(){
  },

  // X軸方向の移動
  Move_Right: function(){
  },

  // X軸方向の移動
  Move_Left: function(){
  },

  // Y軸方向の移動
  Move_Up: function(){
  },

  // Y軸方向の移動
  Move_Down: function(){
  },

  // ポジションセット
  setPos: function(x, y){
    this.x = x;
    this.y = y;
  },

  setPos_X: function(x){
    this.x = x;
  },

  setPos_Y: function(y){
    this.y = y;
  },

});

/////////////////////////////////////////////////////////////
// プレイヤーキャラクターの親クラス
/////////////////////////////////////////////////////////////
phina.define('PlayerParent', {
  superClass: 'PlayerInterface',

  init: function(headImage, bodyImage) {
    this.superInit();
    
    // アニメーションデータ
    this.animContext = PlayerAnimationContext(this, headImage, bodyImage);
    this.animContext.addChildTo(this);

    // ActorSpriteの当たり判定データをプレイヤー用に配置
    this.hitBoxContainer.createHitBox(8, 13, 14, 16);    
    this.hitBoxContainer.addChildTo();

    // ステートデータ
    this.stateContext = PlayerStateContextParent(this);

    // 基本データ
    this.job = "none";
    this.x = 0;                // プレイヤーx座標 
    this.y = 0;                // プレイヤーy座標
    this.direction = "front";   // 向き front left right back
    this.speed=8;
    this.id = "";
    this.name = "";

    // アクションデータ(デバッグ)
    this.action = null;
  },

  // 更新
  update: function(app){
    this.stateContext.update();
  },

  // 前向き
  LookFront: function(){
    if (this.direction != "front"){
      this.direction = "front";
      this.animContext.graphicInit();  // 方向を変えたら描画データ更新
      this.animContext.notReverse();
    }
  },

  // 左向き
  LookLeft: function(){
    if (this.direction != "left"){
      this.direction = "left";
      this.animContext.graphicInit();  // 方向を変えたら描画データ更新
      this.animContext.notReverse();
    }
  },

  // 右向き
  LookRight: function(){
    if (this.direction != "right"){
      this.direction = "right";
      this.animContext.graphicInit();  // 方向を変えたら描画データ更新
      this.animContext.Reverse();      // 左向きの反転
    }
  },

  // 後向き
  LookBack: function(){
    if (this.direction != "back"){
      this.direction = "back";
      this.animContext.graphicInit();  // 方向を変えたら描画データ更新
      this.animContext.notReverse();
    }
  },

  // X軸方向の移動
  Move_Right: function(){
    this.x += this.speed;
  },

  // X軸方向の移動
  Move_Left: function(){
    this.x += (this.speed*-1);
  },

  // Y軸方向の移動
  Move_Up: function(){
    this.y += (this.speed*-1);
  },

  // Y軸方向の移動
  Move_Down: function(){
    this.y += this.speed;
  },

  setPos: function(x, y){
    this.x = x;
    this.y = y;
  },

  setPos_X: function(x){
    this.x = x;
  },

  setPos_Y: function(y){
    this.y = y;
  },

});

/////////////////////////////////////////////////////////////
// プレイヤー　魔法使い
/////////////////////////////////////////////////////////////
phina.define('Wizard', {
  superClass: 'PlayerParent',

  init: function(headImage, bodyImage) {
    this.superInit(headImage, bodyImage);
    
    // ステートデータ
    this.stateContext = WizardStateContext(this);

    // 基本データ
    this.job = "Wizard";
  },

});

/////////////////////////////////////////////////////////////
// プレイヤー　戦士
/////////////////////////////////////////////////////////////
phina.define('Warrior', {
  superClass: 'PlayerParent',

  init: function(headImage, bodyImage) {
    this.superInit(headImage, bodyImage);
    
    // ステートデータ
    this.stateContext = WarriorStateContext(this);

    // 基本データ
    this.job = "Warrior";
  },

});

/////////////////////////////////////////////////////////////
// プレイヤー　ガンナー
/////////////////////////////////////////////////////////////
phina.define('Gunner', {
  superClass: 'PlayerParent',

  init: function(headImage, bodyImage) {
    this.superInit(headImage, bodyImage);
    
    // ステートデータ
    this.stateContext = GunnerStateContext(this);

    // 基本データ
    this.job = "Gunner";
  },

});


/////////////////////////////////////////////////////////////
// プレイヤー　NPC
/////////////////////////////////////////////////////////////
phina.define('NPC', {
  superClass: 'PlayerParent',

  init: function(headImage, bodyImage) {
    this.superInit(headImage, bodyImage);
    
    // ステートデータ
    this.stateContext = NPCStateContext(this);

    // 基本データ
    this.job = "NPC";
  },

});

