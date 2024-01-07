///////////////////////////////////////////////////////////////////////////////////////////////
// プレイヤーステートの遷移などを行う環境親クラス
///////////////////////////////////////////////////////////////////////////////////////////////
phina.define('EnemyStateContextParent', {

  init: function(mainObj) {

    this.mainObj = mainObj;
    this.currentState       = this._standState;

    // ステートのdictionary
    this.stateDict = {};

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
      console.log("EnemyStateContext : " + transStateName + " is not found")
    }
  },
});


///////////////////////////////////////////////////////////////////////////////////////////////
// テストエネミー ステートの遷移などを行う環境クラス
///////////////////////////////////////////////////////////////////////////////////////////////
phina.define('TestEnemyStateContext', {
  superClass: 'EnemyStateContextParent',

  init: function(mainObj) {
    this.superInit(mainObj);

    this._standState        = EnemyState1(this.mainObj);
    this._attackAnticState  = EnemyState2(this.mainObj);
    this._attackState       = EnemyState3(this.mainObj);
    this.currentState       = this._standState;

    // ステートのdictionary
    this.stateDict = {
      stand:this._standState,
      attackAntic:this._attackAnticState,
      attack:this._attackState
    };

  },


});