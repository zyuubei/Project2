///////////////////////////////////////////////////////////////////////////////////////////////
// プレイヤーステートの遷移などを行う環境親クラス
///////////////////////////////////////////////////////////////////////////////////////////////
phina.define('PlayerStateContextParent', {

  init: function(playerObj) {

    this.playerObj = playerObj;                   // プレイヤーデータ
    this._standState  = PlayerState1(playerObj);
    this._runState    = PlayerState2(playerObj);
    this._walkState   = PlayerState3(playerObj);
    this._guardStand  = PlayerState4(playerObj);
    this._guardWalk   = PlayerState5(playerObj);
    this._jump        = PlayerState6(playerObj);
    this._sliding     = PlayerState7(playerObj);


    this.currentState = this._standState;         // 現在ステート

    // ステートのdictionary
    this.stateDict = {
      stand:this._standState,
      walk:this._walkState,
      run:this._runState,
      guardStand:this._guardStand,
      guardWalk:this._guardWalk,
      jump:this._jump,
      sliding:this._sliding
    };
  },

  // 更新処理
  update: function(app){
    this.currentState.update(app);
  },

  // ステート遷移
  transferState: function(transStateName){
    // 指定されたステートがdictionaryに存在したら
    if (this.stateDict[transStateName]) { 
      this.currentState.posFunction();                      // 遷移元から抜ける際の処理
      this.currentState = this.stateDict[transStateName];   // 遷移
      this.currentState.preFunction();                      // 遷移先に入る際の処理
    }
    else{
      console.log("PlayerStateContext : " + this.playerObj.name + " " + transStateName + " is not found")
    }
  },
});

///////////////////////////////////////////////////////////////////////////////////////////////
// 魔法使いプレイヤーのステート遷移などを行う環境親クラス
///////////////////////////////////////////////////////////////////////////////////////////////
phina.define('WizardStateContext', {
  superClass: 'PlayerStateContextParent',

  init: function(playerObj) {
    this.superInit(playerObj);

    this.playerObj = playerObj;               // プレイヤーデータ
    this._standState  = PlayerState1(playerObj);
    this._runState    = PlayerState2(playerObj);
    this._walkState   = PlayerState3(playerObj);
    this._guardStand  = PlayerState4(playerObj);
    this._guardWalk   = PlayerState5(playerObj);
    this._jump        = PlayerState6(playerObj);
    this._sliding     = PlayerState7(playerObj);
    this.currentState = this._standState;     // 現在ステート

    // ステートのdictionary
    this.stateDict = {
      stand:this._standState,
      walk:this._walkState,
      run:this._runState,
      guardStand:this._guardStand,
      guardWalk:this._guardWalk,
      jump:this._jump,
      sliding:this._sliding
    };

  },


});

///////////////////////////////////////////////////////////////////////////////////////////////
// 戦士プレイヤーのステート遷移などを行う環境親クラス
///////////////////////////////////////////////////////////////////////////////////////////////
phina.define('WarriorStateContext', {
  superClass: 'PlayerStateContextParent',

  init: function(playerObj) {
    this.superInit(playerObj);
    this.playerObj = playerObj;               // プレイヤーデータ

    this._standState  = PlayerState1(playerObj);
    this._runState    = PlayerState2(playerObj);
    this._walkState   = PlayerState3(playerObj);
    this._guardStand  = PlayerState4(playerObj);
    this._guardWalk   = PlayerState5(playerObj);
    this._jump        = PlayerState6(playerObj);
    this._sliding     = PlayerState7(playerObj);
    this._swordAttack1= PlayerState8(playerObj);
    this._swordAttack2= PlayerState9(playerObj);
    this._swordAttack3= PlayerState10(playerObj);
    this._swordAttack4= PlayerState11(playerObj);

    this.currentState = this._standState;     // 現在ステート

    // ステートのdictionary
    this.stateDict = {
      stand:this._standState,
      walk:this._walkState,
      run:this._runState,
      guardStand:this._guardStand,
      guardWalk:this._guardWalk,
      jump:this._jump,
      sliding:this._sliding,
      swordAttack1:this._swordAttack1,
      swordAttack2:this._swordAttack2,
      swordAttack3:this._swordAttack3,
      swordAttack4:this._swordAttack4
    };
  },


});

///////////////////////////////////////////////////////////////////////////////////////////////
// ガンナープレイヤーのステート遷移などを行う環境親クラス
///////////////////////////////////////////////////////////////////////////////////////////////
phina.define('GunnerStateContext', {
  superClass: 'PlayerStateContextParent',

  init: function(playerObj) {
    this.superInit(playerObj);
    this.playerObj = playerObj;               // プレイヤーデータ
    this._standState  = PlayerState1(playerObj);
    this._runState    = PlayerState2(playerObj);
    this._walkState   = PlayerState3(playerObj);
    this._guardStand  = PlayerState4(playerObj);
    this._guardWalk   = PlayerState5(playerObj);
    this._jump        = PlayerState6(playerObj);
    this._sliding     = PlayerState7(playerObj);
    this.currentState = this._standState;     // 現在ステート

    // ステートのdictionary
    this.stateDict = {
      stand:this._standState,
      walk:this._walkState,
      run:this._runState,
      guardStand:this._guardStand,
      guardWalk:this._guardWalk,
      jump:this._jump,
      sliding:this._sliding
    };
  },

});

///////////////////////////////////////////////////////////////////////////////////////////////
// ガンナープレイヤーのステート遷移などを行う環境親クラス
///////////////////////////////////////////////////////////////////////////////////////////////
phina.define('NPCStateContext', {
  superClass: 'PlayerStateContextParent',

  init: function(playerObj) {
    this.superInit(playerObj);
    this.playerObj = playerObj;               // プレイヤーデータ

    this._standState  = PlayerState1(playerObj);
    this._runState    = PlayerState2(playerObj);
    this._walkState   = PlayerState3(playerObj);
    this._guardStand  = PlayerState4(playerObj);
    this._guardWalk   = PlayerState5(playerObj);
    this._jump        = PlayerState6(playerObj);
    this._sliding     = PlayerState7(playerObj);
    this.currentState = this._standState;     // 現在ステート

    // ステートのdictionary
    this.stateDict = {
      stand:this._standState,
      walk:this._walkState,
      run:this._runState,
      guardStand:this._guardStand,
      guardWalk:this._guardWalk,
      jump:this._jump,
      sliding:this._sliding
    };

  },

});

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
  // 何も押されない
  free_key:function(app){
  },
  // upキー
  up_key:function(app){
  },
  // downキー
  down_key:function(app){
  },
  // leftキー
  left_key:function(app){
  },
  // rightキー
  right_key:function(app){
  },
  // upキーダウン
  up_keydown:function(app){
  },
  // downキーダウン
  down_keydown:function(app){
  },
  // leftキーダウン
  left_keydown:function(app){
  },
  // rightキーダウン
  right_keydown:function(app){
  },
  // upキーアップ
  up_keyup:function(app){
  },
  // downキーアップ
  down_keyup:function(app){
  },
  // leftキーアップ
  left_keyup:function(app){
  },
  // rightキーアップ
  right_keyup:function(app){
  },
  // zキー
  z_key: function(app){
  },
  // xキー
  x_key: function(app){
  },
  // cキー
  c_key: function(app){
  },
  // zキー
  z_keydown:function(app){
  },
  // xキー
  x_keydown:function(app){
  },
  // cキー
  c_keydown:function(app){
  },
  // zキー
  z_keyup: function(app){
  },
  // xキー
  x_keyup: function(app){
  },
  // cキー
  c_keyup: function(app){
  },
  // shiftキー
  shift_key: function(app){
  },
  
  shift_keydown: function(app){
  },
  shift_keyup: function(app){
  },
  // shiftキー
  shift_keyfree: function(app){
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

/*****************************************************/
// State01 : 立ちステート
/*****************************************************/
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
    console.log("PlayerState : " +"Enter StandState");
    this.playerObj.animContext.transferGraphic("stand");
    this.playerObj.speed = 0;
  },

  // ステート遷移のpos実行処理
  posFunction: function(){
    console.log("PlayerState : " +"Leave StandState");
  },

  // 何も押されない
  free_key:function(app){
  },
  // upキー
  up_key:function(app){
    this.playerObj.transferState("walk");
    this.playerObj.LookBack();
  },
  // downキー
  down_key:function(app){
    this.playerObj.transferState("walk");
    this.playerObj.LookFront();
  },
  // leftキー
  left_key:function(app){
    this.playerObj.transferState("walk");
    if(app.keyboard.getKey('up') != true && app.keyboard.getKey('down') != true){
      this.playerObj.LookLeft();
    }
  },
  // rightキー
  right_key:function(app){
    this.playerObj.transferState("walk");
    if(app.keyboard.getKey('up') != true && app.keyboard.getKey('down') != true){
      this.playerObj.LookRight();
    }
  },
  // zキー
  z_keydown: function(app){
    this.playerObj.transferState("swordAttack1");
  },
  // xキー
  x_keydown: function(app){
    this.playerObj.transferState("jump");
  },
  // cキー
  c_key: function(app){
    this.playerObj.transferState("guardStand");
  },

});


/*****************************************************/
// State02 : 走りステート
/*****************************************************/
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
    console.log("PlayerState : " + "Enter RunState")
    this.playerObj.animContext.transferGraphic("run");
    this.playerObj.speed = 16;
  },


  // ステート遷移のpos実行処理
  posFunction: function(){
    console.log("PlayerState : " + "Leave RunState");
  },

  // 何も押されない
  free_key:function(app){
    this.playerObj.transferState("stand");
  },
  // upキー
  up_key:function(app){
    this.playerObj.Move_Up();
    this.playerObj.LookBack();
  },
  // downキー
  down_key:function(app){
    this.playerObj.Move_Down();
    this.playerObj.LookFront();
  },
  // leftキー
  left_key:function(app){
    this.playerObj.Move_Left();
    if(app.keyboard.getKey('up') != true && app.keyboard.getKey('down') != true){
      this.playerObj.LookLeft();
    }
  },
  // rightキー
  right_key:function(app){
    this.playerObj.Move_Right();
    if(app.keyboard.getKey('up') != true && app.keyboard.getKey('down') != true){
      this.playerObj.LookRight();
    }
  },
  // zキー
  z_keydown: function(app){
    this.playerObj.transferState("swordAttack1");
  },
  // xキー
  x_keydown: function(app){
    this.playerObj.transferState("jump");
  },
  // cキー
  c_key: function(app){
    this.playerObj.transferState("guardWalk");
  },
  // shiftキーアップ
  shift_keyup: function(app){
    this.playerObj.transferState("walk");
  },

});


/*****************************************************/
// State03 : 歩きステート
/*****************************************************/
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
    console.log("PlayerState : " + "Enter WalkState")
    this.playerObj.animContext.transferGraphic("walk");
    this.playerObj.speed = 8;
  },

  // ステート遷移のpos実行処理
  posFunction: function(){
    console.log("PlayerState : " + "Leave WalkState")
  },
  // 何も押されない
  free_key:function(app){
    this.playerObj.transferState("stand");
  },
  // upキー
  up_key:function(app){
    this.playerObj.Move_Up();
    this.playerObj.LookBack();
  },
  // downキー
  down_key:function(app){
    this.playerObj.Move_Down();
    this.playerObj.LookFront();
  },
  // leftキー
  left_key:function(app){
    this.playerObj.Move_Left();
    if(app.keyboard.getKey('up') != true && app.keyboard.getKey('down') != true){
      this.playerObj.LookLeft();
    }
  },
  // rightキー
  right_key:function(app){
    this.playerObj.Move_Right();
    if(app.keyboard.getKey('up') != true && app.keyboard.getKey('down') != true){
      this.playerObj.LookRight();
    }
  },
  // zキー
  z_keydown: function(app){
    this.playerObj.transferState("swordAttack1");
  },
  // xキー
  x_keydown: function(app){
    this.playerObj.transferState("jump");
  },
  // cキー
  c_key: function(app){
    this.playerObj.transferState("guardWalk");
  },
  // shiftキー
  shift_key: function(app){
    this.playerObj.transferState("run");
  },

});


/*****************************************************/
// State04 : 立ち(ガード)ステート
/*****************************************************/
phina.define('PlayerState4', {
  superClass: 'PlayerStateParent',

  init: function(playerObj) {
    this.superInit(playerObj);
    this.name = "guardStand";

  },

  // 更新処理
  update: function(app){
  },

  // ステート遷移時のpre実行処理
  preFunction: function(){
    console.log("PlayerState : " + "Enter GuardStandState")
    this.playerObj.animContext.transferGraphic("guardStand");
    this.playerObj.speed = 0;
  },

  // ステート遷移のpos実行処理
  posFunction: function(){
    console.log("PlayerState : " + "Leave GuardStandState")
  },
  // upキーダウン
  up_keydown:function(app){
    this.playerObj.transferState("guardWalk");
  },
  // downキーダウン
  down_keydown:function(app){
    this.playerObj.transferState("guardWalk");
  },
  // leftキーダウン
  left_keydown:function(app){
    this.playerObj.transferState("guardWalk");
  },
  // rightキーダウン
  right_keydown:function(app){
    this.playerObj.transferState("guardWalk");
  },
  // zキー
  z_keydown: function(app){
  },
  // cキーup
  c_keyup: function(app){
    this.playerObj.transferState("stand");
  },
  // shiftキー
  shift_key: function(app){

  },
  shift_keyfree: function(app){

  },
});


/*****************************************************/
// State05 : 歩き(ガード)ステート
/*****************************************************/
phina.define('PlayerState5', {
  superClass: 'PlayerStateParent',

  init: function(playerObj) {
    this.superInit(playerObj);
    this.name = "guardWalk";

  },

  // 更新処理
  update: function(app){
  },

  // ステート遷移時のpre実行処理
  preFunction: function(){
    console.log("PlayerState : " + "Enter GuardWalkState")
    this.playerObj.animContext.transferGraphic("guardWalk");
    this.playerObj.speed = 8;
  },

  // ステート遷移のpos実行処理
  posFunction: function(){
    console.log("PlayerState : " + "Leave GuardWalkState");
  },

  // 何も押されない
  free_key:function(app){
    this.playerObj.transferState("guardStand");
  },
  // upキー
  up_key:function(app){
    this.playerObj.Move_Up();
  },
  // downキー
  down_key:function(app){
    this.playerObj.Move_Down();
  },
  // leftキー
  left_key:function(app){
    this.playerObj.Move_Left();
  },
  // rightキー
  right_key:function(app){
    this.playerObj.Move_Right();
  },
  // upキーダウン
  up_keydown:function(app){
  },
  // downキーダウン
  down_keydown:function(app){
  },
  // leftキーダウン
  left_keydown:function(app){
  },
  // rightキーダウン
  right_keydown:function(app){
  },
  c_keyup: function(app){
    this.playerObj.transferState("stand");
  },
  shift_key: function(app){
  },
  shift_keyfree: function(app){
  },
});

/*****************************************************/
// State05 : ジャンプステート
/*****************************************************/
phina.define('PlayerState6', {
  superClass: 'PlayerStateParent',

  init: function(playerObj) {
    this.superInit(playerObj);
    this.name = "jump";
    this._stateEndCnt = 0;
    this.jumpEndDirection = 0; //ジャンプ中は方向画変えられないためジャンプが終わった際の押されている方向を保持しておく
  },

  // 更新処理
  update: function(app){
    this._stateEndCnt++;
    if(this.playerObj.direction=="front"){
      this.playerObj.y += this.playerObj.speed;
    }else if(this.playerObj.direction=="left"){
      this.playerObj.x -= this.playerObj.speed;
    }else if(this.playerObj.direction=="right"){
      this.playerObj.x += this.playerObj.speed;
    }else{
      this.playerObj.y -= this.playerObj.speed;
    }
    if(this._stateEndCnt==30){
      this._standEndCnt=0;
      this.playerObj.transferState("walk");
    }
  },

  // ステート遷移時のpre実行処理
  preFunction: function(){
    console.log("PlayerState : " + "Enter JumpState")
    this.playerObj.animContext.transferGraphic("jump");
  },

  // ステート遷移のpos実行処理
  posFunction: function(){
    console.log("PlayerState : " + "Leave JumpState");
    this._stateEndCnt = 0;
    if(this.jumpEndDirection == 0){
      this.playerObj.LookFront();
    }else if(this.jumpEndDirection == 1){
      this.playerObj.LookLeft();
    }else if(this.jumpEndDirection == 2){
      this.playerObj.LookRight();
    }else{
      this.playerObj.LookBack();
    }
  },

  // 何も押されない
  free_key:function(app){
  },
  // upキー
  up_key:function(app){
    this.jumpEndDirection = 3;
  },
  // downキー
  down_key:function(app){
    this.jumpEndDirection = 0;
  },
  // leftキー
  left_key:function(app){
    this.jumpEndDirection = 1;
  },
  // rightキー
  right_key:function(app){
    this.jumpEndDirection = 2;
  },

});

/*****************************************************/
// State05 : スライディングステート
/*****************************************************/
phina.define('PlayerState7', {
  superClass: 'PlayerStateParent',

  init: function(playerObj) {
    this.superInit(playerObj);
    this.name = "sliding";

  },

  // 更新処理
  update: function(app){
  },

  // ステート遷移時のpre実行処理
  preFunction: function(){
    console.log("PlayerState : " + "Enter SlidingState")
    this.playerObj.animContext.transferGraphic("sliding");
  },

  // ステート遷移のpos実行処理
  posFunction: function(){
    console.log("PlayerState : " + "Leave SlidingState")
  },
  // 何も押されない
  free_key:function(app){
  },  
  // upキー
  up_key:function(app){
  },
  // downキー
  down_key:function(app){
  },
  // leftキー
  left_key:function(app){
  },
  // rightキー
  right_key:function(app){
  },
  // upキーダウン
  up_keydown:function(app){
  },
  // downキーダウン
  down_keydown:function(app){
  },
  // leftキーダウン
  left_keydown:function(app){
  },
  // rightキーダウン
  right_keydown:function(app){
  },
  // upキーアップ
  up_keyup:function(app){
  },
  // downキーアップ
  down_keyup:function(app){
  },
  // leftキーアップ
  left_keyup:function(app){
  },
  // rightキーアップ
  right_keyup:function(app){
  },  // zキー
  z_key: function(app){
  },
  // xキー
  x_key: function(app){
  },
  // cキー
  c_key: function(app){
  },
  // shiftキー
  shift_key: function(app){
  },
  // shiftキーダウン
  shift_keydown: function(app){
  },
  // shiftキーアップ
  shift_keyup: function(app){
  },

});

/*****************************************************/
// State08 : 剣攻撃1ステート
/*****************************************************/
phina.define('PlayerState8', {
  superClass: 'PlayerStateParent',

  init: function(playerObj) {
    this.superInit(playerObj);
    this.name = "swordAttack1";
    this._stateEndCnt = 0;
    this._nextAttackFlg = 0;
    this._zKeyPushCnt=0;
  },

  // 更新処理
  update: function(app){
    this._stateEndCnt++;
    if(this._stateEndCnt==20){
      this._standEndCnt=0;
      if(this._nextAttackFlg == 1){
        this.playerObj.transferState("swordAttack2");
      }else{
        this.playerObj.transferState("walk");
      }
      console.log("PlayerState : " + "Leave SwordAttack1State");

    }
  },

  // ステート遷移時のpre実行処理
  preFunction: function(){
    console.log("PlayerState : " + "Enter SwordAttack1State")
    this.playerObj.animContext.transferGraphic("swordAttack1");
    this.playerObj.speed = 2;
  },

  // ステート遷移のpos実行処理
  posFunction: function(){
    this._stateEndCnt = 0;
    this._nextAttackFlg = 0;
    this._zKeyPushCnt=0;
  },
  // zキー
  z_key: function(app){
    // 10F以降なら攻撃2確定
    if(this._stateEndCnt >= 10){
      this._nextAttackFlg = 1;
    }
    // 10F前なら3Fで確定
    if(this._stateEndCnt < 10){
      this._zKeyPushCnt++;
    }
    if(this._zKeyPushCnt > 3){
      this._nextAttackFlg = 1;
    }    
  },
  z_keydown: function(app){
  },
  // 何も押されない
  free_key:function(app){
  },
  // upキー
  up_key:function(app){
    this.playerObj.Move_Up();
  },
  // downキー
  down_key:function(app){
    this.playerObj.Move_Down();
  },
  // leftキー
  left_key:function(app){
    this.playerObj.Move_Left();
  },
  // rightキー
  right_key:function(app){
    this.playerObj.Move_Right();
  },

});

/*****************************************************/
// State08 : 剣攻撃2ステート
/*****************************************************/
phina.define('PlayerState9', {
  superClass: 'PlayerStateParent',

  init: function(playerObj) {
    this.superInit(playerObj);
    this.name = "swordAttack2";
    this._stateEndCnt = 0;
    this._nextAttackFlg = 0;
    this._zKeyPushCnt=0;    
  },

  // 更新処理
  update: function(app){
    this._stateEndCnt++;
    if(this._stateEndCnt==20){
      this._standEndCnt=0;
      if(this._nextAttackFlg == 1){
        this.playerObj.transferState("swordAttack3");
      }else{
        this.playerObj.transferState("walk");
      }
    }
  },

  // ステート遷移時のpre実行処理
  preFunction: function(){
    console.log("PlayerState : " + "Enter SwordAttack2State")
    this.playerObj.animContext.transferGraphic("swordAttack2");
    this.playerObj.speed = 2;
  },

  // ステート遷移のpos実行処理
  posFunction: function(){
    console.log("PlayerState : " + "Leave SwordAttack2State");
    this._stateEndCnt = 0;
    this._nextAttackFlg = 0;
    this._zKeyPushCnt=0;
  },

  // zキー
  z_key: function(app){
    // 10F以降なら攻撃2確定
    if(this._stateEndCnt >= 10){
      this._nextAttackFlg = 1;
    }
    // 10F前なら3Fで確定
    if(this._stateEndCnt < 10){
      this._zKeyPushCnt++;
    }
    if(this._zKeyPushCnt > 3){
      this._nextAttackFlg = 1;
    }    
  },
  
  // 何も押されない
  free_key:function(app){
  },
  // upキー
  up_key:function(app){
    this.playerObj.Move_Up();
  },
  // downキー
  down_key:function(app){
    this.playerObj.Move_Down();
  },
  // leftキー
  left_key:function(app){
    this.playerObj.Move_Left();
  },
  // rightキー
  right_key:function(app){
    this.playerObj.Move_Right();
  },

});


/*****************************************************/
// State08 : 剣攻撃3ステート
/*****************************************************/
phina.define('PlayerState10', {
  superClass: 'PlayerStateParent',

  init: function(playerObj) {
    this.superInit(playerObj);
    this.name = "swordAttack3";
    this._stateEndCnt = 0;
  },

  // 更新処理
  update: function(app){
    this._stateEndCnt++;
    if(this._stateEndCnt==15){
      this._standEndCnt=0;
      this.playerObj.transferState("swordAttack4");
    }
  },

  // ステート遷移時のpre実行処理
  preFunction: function(){
    console.log("PlayerState : " + "Enter SwordAttack3State")
    this.playerObj.animContext.transferGraphic("swordAttack3");
  },

  // ステート遷移のpos実行処理
  posFunction: function(){
    console.log("PlayerState : " + "Leave SwordAttack3State");
    this._stateEndCnt = 0;
  },

  // 何も押されない
  free_key:function(app){
  },
  // upキー
  up_key:function(app){
  },
  // downキー
  down_key:function(app){
  },
  // leftキー
  left_key:function(app){
  },
  // rightキー
  right_key:function(app){
  },

});

/*****************************************************/
// State11 : 剣攻撃3ステート
/*****************************************************/
phina.define('PlayerState11', {
  superClass: 'PlayerStateParent',

  init: function(playerObj) {
    this.superInit(playerObj);
    this.name = "swordAttack4";
    this._stateEndCnt = 0;
  },

  // 更新処理
  update: function(app){
    this._stateEndCnt++;
    if(this._stateEndCnt==20){
      this._standEndCnt=0;
      this.playerObj.transferState("walk");
    }
  },

  // ステート遷移時のpre実行処理
  preFunction: function(){
    console.log("PlayerState : " + "Enter SwordAttack4State")
    this.playerObj.animContext.transferGraphic("swordAttack4");
    this.playerObj.speed = 24;
    if(this.playerObj.direction=="front"){
      this.playerObj.y += this.playerObj.speed;
    }else if(this.playerObj.direction=="left"){
      this.playerObj.x -= this.playerObj.speed;
    }else if(this.playerObj.direction=="right"){
      this.playerObj.x += this.playerObj.speed;
    }else{
      this.playerObj.y -= this.playerObj.speed;
    }

  },

  // ステート遷移のpos実行処理
  posFunction: function(){
    console.log("PlayerState : " + "Leave SwordAttack4State");
    this._stateEndCnt = 0;
  },

  // 何も押されない
  free_key:function(app){
  },
  // upキー
  up_key:function(app){
  },
  // downキー
  down_key:function(app){
  },
  // leftキー
  left_key:function(app){
  },
  // rightキー
  right_key:function(app){
  },

});