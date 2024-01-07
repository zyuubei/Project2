///////////////////////////////////////////////////////////////////////////////////////////////
// プレイヤー作成マネージャクラス
///////////////////////////////////////////////////////////////////////////////////////////////
phina.define('PlayerManager', {

  init: function() {
    this.playerDict = {};
  },

  createWizard : function(id, name, headImage, bodyImage, options={}){
    this.playerDict[id] = Wizard(headImage, bodyImage);
    this.playerDict[id].stateContext.transferState("stand");
    this.playerDict[id].setPos(options.x, options.y);
    this.playerDict[id].name = name;
    this.playerDict[id].id = id;      
    this.playerDict[id].setScale(4);
    return this.playerDict[id];    
  },

  createWarrior : function(id, name, headImage, bodyImage, options={}){
    this.playerDict[id] = Warrior(headImage, bodyImage);
    this.playerDict[id].stateContext.transferState("stand");
    this.playerDict[id].setPos(options.x, options.y);
    this.playerDict[id].name = name;
    this.playerDict[id].id = id;      
    this.playerDict[id].setScale(4);
    return this.playerDict[id];    
  },

  createGunner : function(id, name, headImage, bodyImage, options={}){
    this.playerDict[id] = Gunner(headImage, bodyImage);
    this.playerDict[id].stateContext.transferState("stand");
    this.playerDict[id].setPos(options.x, options.y);
    this.playerDict[id].name = name;
    this.playerDict[id].id = id;      
    this.playerDict[id].setScale(4);
    return this.playerDict[id];    
  },

  createNPC : function(id, name, headImage, bodyImage, options={}){
    this.playerDict[id] = NPC(headImage, bodyImage);
    this.playerDict[id].stateContext.transferState("stand");
    this.playerDict[id].setPos(options.x, options.y);
    this.playerDict[id].name = name;
    this.playerDict[id].id = id;      
    this.playerDict[id].setScale(4);
    return this.playerDict[id];    
  },

  getPlayer :function(id){
    if(this.playerDict[id]) {
      return this.playerDict[id];
    }
  },

  addChildTo:function(sp){
    for(const p in this.playerDict){
      this.playerDict[p].addChildTo(sp);
    };
  },

});


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

  free_key:function(app){
  },
  up_key:function(app){
  },
  down_key:function(app){
  },
  left_key:function(app){
  },
  right_key:function(app){
  },
  up_keydown:function(app){
  },
  down_keydown:function(app){
  },
  left_keydown:function(app){
  },
  right_keydown:function(app){
  },
  up_keyup:function(app){
  },
  down_keyup:function(app){
  },
  left_keyup:function(app){
  },
  right_keyup:function(app){
  },
  z_key:function(app){
  },
  x_key:function(app){
  },
  c_key:function(app){
  },

  z_keydown:function(app){
  },
  x_keydown:function(app){
  },
  c_keydown:function(app){
  },

  z_keyup:function(app){
  },
  x_keyup:function(app){
  },
  c_keyup:function(app){
  },
  shift_key:function(app){
  },
  shift_keydown:function(app){
  },
  shift_keyup:function(app){
  },
  shift_keyfree:function(app){
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
  },

  setPos_X: function(x){
  },

  setPos_Y: function(y){
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
    this.stateContext.update(app);
  },

  free_key:function(app){
    this.stateContext.currentState.free_key(app);
  },
  up_key:function(app){
    this.stateContext.currentState.up_key(app);
  },
  down_key:function(app){
    this.stateContext.currentState.down_key(app);
  },
  left_key:function(app){
    this.stateContext.currentState.left_key(app);
  },
  right_key:function(app){
    this.stateContext.currentState.right_key(app);
  },
  up_keydown:function(app){
    this.stateContext.currentState.up_keydown(app);
  },
  down_keydown:function(app){
    this.stateContext.currentState.down_keydown(app);
  },
  left_keydown:function(app){
    this.stateContext.currentState.left_keydown(app);
  },
  right_keydown:function(app){
    this.stateContext.currentState.right_keydown(app);
  },
  up_keyup:function(app){
    this.stateContext.currentState.up_keyup(app);
  },
  down_keyup:function(app){
    this.stateContext.currentState.down_keyup(app);
  },
  left_keyup:function(app){
    this.stateContext.currentState.left_keyup(app);
  },
  right_keyup:function(app){
    this.stateContext.currentState.right_keyup(app);
  },
  z_key:function(app){
    this.stateContext.currentState.z_key(app);
  },
  x_key:function(app){
    this.stateContext.currentState.x_key(app);
  },
  c_key:function(app){
    this.stateContext.currentState.c_key(app);
  },  
  z_keydown:function(app){
    this.stateContext.currentState.z_keydown(app);
  },
  x_keydown:function(app){
    this.stateContext.currentState.x_keydown(app);
  },
  c_keydown:function(app){
    this.stateContext.currentState.c_keydown(app);
  },
  z_keyup:function(app){
    this.stateContext.currentState.z_keyup(app);
  },
  x_keyup:function(app){
    this.stateContext.currentState.x_keyup(app);
  },
  c_keyup:function(app){
    this.stateContext.currentState.c_keyup(app);
  },
  shift_key:function(app){
    this.stateContext.currentState.shift_key(app);
  },
  shift_keydown:function(app){
    this.stateContext.currentState.shift_keydown(app);
  },
  shift_keyup:function(app){
    this.stateContext.currentState.shift_keyup(app);
  },
  shift_keyfree:function(app){
    this.stateContext.currentState.shift_keyfree(app);
  },
  transferState: function(transStateName){
    this.stateContext.transferState(transStateName);
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

