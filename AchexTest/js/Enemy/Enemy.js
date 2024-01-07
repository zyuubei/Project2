/////////////////////////////////////////////////////////////
// TestEnemyのメインクラス
/////////////////////////////////////////////////////////////
phina.define('EnemyInterface', {
  superClass: 'ActorSprite',

  init: function(image) {    
    this.superInit('null', 0, 0, 70, 62);
    
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

  setPos: function(x, y){
  },

  setPos_X: function(x){
  },

  setPos_Y: function(y){
  },

});



/////////////////////////////////////////////////////////////
// TestEnemyのメインクラス
/////////////////////////////////////////////////////////////
phina.define('EnemyParent', {
  superClass: 'EnemyInterface',

  init: function(image) {    
    this.superInit('null', 0, 0, 70, 62);
    
    // 基本データ
    this.x = 0;                // プレイヤーx座標 
    this.y = 0;                // プレイヤーy座標
    this.direction = "right";   // 向き front left right back
    this.speed=8;
    this.id = "";
    this.name = "";

    // グラフィックデータ
    this.animContext = EnemyAnimationContext(this, image);
    this.animContext.addChildTo(this);

    // ActorSpriteの当たり判定データを配置し直し
    this.hitBoxContainer.createHitBox(20, 20, 30, 35);    
    this.hitBoxContainer.addChildTo();

    // ステートデータ
    this.stateContext = EnemyStateContext(this);

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
      this.graphicContext.graphicInit();  // 方向を変えたら描画データ更新
      this.graphicContext.notReverse();
    }
  },

  // 左向き
  LookLeft: function(){
    if (this.direction != "left"){
      this.direction = "left";
      this.graphicContext.graphicInit();  // 方向を変えたら描画データ更新
      this.graphicContext.notReverse();
    }
  },

  // 右向き
  LookRight: function(){
    if (this.direction != "right"){
      this.direction = "right";
      this.graphicContext.graphicInit();  // 方向を変えたら描画データ更新
      this.graphicContext.Reverse();      // 左向きの反転
    }
  },

  // 後向き
  LookBack: function(){
    if (this.direction != "back"){
      this.direction = "back";
      this.graphicContext.graphicInit();  // 方向を変えたら描画データ更新
      this.graphicContext.notReverse();
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
// TestEnemyのメインクラス
/////////////////////////////////////////////////////////////
phina.define('TestEnemy', {
  superClass: 'EnemyParent',

  init: function(image) {    
    this.superInit(image);
    
    // 基本データ
    this.x = 0;                // プレイヤーx座標 
    this.y = 0;                // プレイヤーy座標
    this.direction = "right";   // 向き front left right back
    this.speed=8;
    this.id = "";
    this.name = "";

    // グラフィックデータ
    this.animContext = TestEnemyAnimationContext(this, image);
    this.animContext.addChildTo(this);

    // ActerSpriteの当たり判定データを配置し直し
    this.hitBoxContainer.createHitBox(20, 20, 30, 35);    
    this.hitBoxContainer.addChildTo();

    // ステートデータ
    this.stateContext = TestEnemyStateContext(this);

    // アクションデータ(デバッグ)
    this.action = null;
  },

  // 更新
  update: function(app){
    this.stateContext.update();
  },


});


