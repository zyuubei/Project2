///////////////////////////////////////////////////////////////////////////////////////////////
// プレイヤーステートの遷移などを行う環境親クラス
///////////////////////////////////////////////////////////////////////////////////////////////
phina.define('PlayerStateContextParent', {

  init: function(playerObj) {

    this.playerObj = playerObj;               // プレイヤーデータ

    this._standState = PlayerState1(playerObj);
    this._runState = PlayerState2(playerObj);
    this._walkState = PlayerState3(playerObj);
    this.currentState = this._standState;     // 現在ステート


    // ステートのdictionary
    this.stateDict = {
      stand:this._standState,
      walk:this._walkState,
      run:this._runState
    };
  },

  // 更新処理
  update: function(){
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

    // ステートのdictionary
    this.stateDict = {
      stand:PlayerState1(playerObj),
      walk: PlayerState3(playerObj),
      run:  PlayerState2(playerObj)
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

    // ステートのdictionary
    this.stateDict = {
      stand:PlayerState1(playerObj),
      walk: PlayerState3(playerObj),
      run:  PlayerState2(playerObj)
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

    // ステートのdictionary
    this.stateDict = {
      stand:PlayerState1(playerObj),
      walk: PlayerState3(playerObj),
      run:  PlayerState2(playerObj)
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

    // ステートのdictionary
    this.stateDict = {
      stand:PlayerState1(playerObj),
      walk: PlayerState3(playerObj),
      run:  PlayerState2(playerObj)
    };
  },

});