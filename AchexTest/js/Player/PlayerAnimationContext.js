///////////////////////////////////////////////////////////////////////////////////////////////
// プレイヤーグラフィックの描画、遷移、編集などを行う環境クラス
///////////////////////////////////////////////////////////////////////////////////////////////
phina.define('PlayerAnimationContext', {
  superClass: 'MySprite',

  init: function(playerObj, headImage, bodyImage) {
    this.superInit('null', 0, 0, 42, 42);
    
    this.playerObj = playerObj;             // プレイヤー全データ
    this.headImage = headImage;             // 頭グラフィックチップの画像パス
    this.bodyImage = bodyImage;             // 体グラフィックチップの画像パス

    // アニメーションスピ＾ド
    this.animationSpeed = 1;  // アニメーション倍率 

    // アニメーションの登録
    this._standAnim  = PlayerAnimation1(this, this.headImage, this.bodyImage, StandFront, StandLeft, StandRight, StandBack);  
    this._runAnim    = PlayerAnimation2(this, this.headImage, this.bodyImage, RunFront, RunLeft, RunRight, RunBack); 
    this._walkAnim   = PlayerAnimation3(this, this.headImage, this.bodyImage, WalkFront, WalkLeft, WalkRight, WalkBack); 
    this._guardStandAnim  = PlayerAnimation4(this, this.headImage, this.bodyImage, GuardStandFront, GuardStandLeft, GuardStandRight, GuardStandBack); 
    this._guardWalkAnim   = PlayerAnimation5(this, this.headImage, this.bodyImage, GuardWalkFront, GuardWalkLeft, GuardWalkRight, GuardWalkBack);   
    this._jumpAnim        = PlayerAnimation6(this, this.headImage, this.bodyImage, JumpFront, JumpLeft, JumpRight, JumpBack); 
    this._slidingAnim     = PlayerAnimation7(this, this.headImage, this.bodyImage, SlidingFront, SlidingLeft, SlidingRight, SlidingBack);  
    this._swordAttack1Anim     = PlayerAnimation8(this, this.headImage, this.bodyImage, SwordAttack1Front, SwordAttack1Left, SwordAttack1Right, SwordAttack1Back); 
    this._swordAttack2Anim     = PlayerAnimation9(this, this.headImage, this.bodyImage, SwordAttack2Front, SwordAttack2Left, SwordAttack2Right, SwordAttack2Back);
    this._swordAttack3Anim     = PlayerAnimation10(this, this.headImage, this.bodyImage, SwordAttack3Front, SwordAttack3Left, SwordAttack3Right, SwordAttack3Back); 
    this._swordAttack4Anim     = PlayerAnimation11(this, this.headImage, this.bodyImage, SwordAttack4Front, SwordAttack4Left, SwordAttack4Right, SwordAttack4Back);

    this.currentAnim = this._standAnim;   // 現在の描画グラフィック

    // アニメーションのdictionary
    this.animDict = {
      stand:this._standAnim,
      walk:this._walkAnim,
      run:this._runAnim,
      guardStand:this._guardStandAnim,
      guardWalk:this._guardWalkAnim,
      jump:this._jumpAnim,
      sliding:this._slidingAnim,
      swordAttack1:this._swordAttack1Anim,
      swordAttack2:this._swordAttack2Anim,
      swordAttack3:this._swordAttack3Anim,
      swordAttack4:this._swordAttack4Anim
    };

  },

  // 更新処理
  update: function(app){
  },


  // 画像を遷移させる
  // 引数：transGraphicName → 文字列で指定される("standGraphic"とか)
  transferGraphic: function(transAnimName){
    // 指定されたグラフィックがdictionaryに存在したら
    if (this.animDict[transAnimName]) { 
      this.currentAnim.posFunction();                         // 遷移元から抜ける際の処理
      this.currentAnim = this.animDict[transAnimName];     // 遷移
      this.currentAnim.preFunction();                         // 遷移先に入る際の処理
      
      // 描画リフレッシュ
      this.refresh();
    }
    else{
      console.log("PlayerAnimContext : " + transAnimName + " is not found")
    }
  },

  // 向き反転
  Reverse: function(){
    for (let key in this.animDict) {
      if (this.animDict[key].scaleX >= 0){
        this.animDict[key].graphicInit();                                   // 各ステートグラフィック初期化
        this.animDict[key].scaleX = Math.abs(this.currentAnim.scaleX) * -1; // scaleを反転
        var offset = Math.abs(8 * this.animDict[key].scaleX);               // 反転した時に見た目の位置がずれるのでoffsetセット 
        this.animDict[key].x += (this.currentAnim.width - offset);          // オフセット反映
      }
    }
  },

  // 向き正常
  notReverse: function(){
    for (let key in this.animDict) {
      if (this.animDict[key].scaleX < 0){
        this.animDict[key].scaleX = Math.abs(this.currentAnim.scaleX);      // scaleを正常に
        this.animDict[key].x = 0;                                           // 反転していた時のoffsetをクリア
      }
    }
  },

  // 親スプライトの描画リフレッシュ
  refresh: function(){
    this.children = []                        // 親スプライトに描画されてる子スプライトをクリア
    this.backgroundImage.addChildTo(this);    // 背景設定
    this.currentAnim.addChildTo(this);        // 子スプライトを描画
  },

  // グラフィックアニメーションデータの初期化処理
  graphicInit: function(){
    this.currentAnim.graphicInit();
  },

});



phina.define('PlayerAnimationInterface', {
  superClass: 'MySprite',

  init: function(playerObj) {
      this.superInit('null', 0, 0, 42, 42);
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

phina.define('PlayerAnimationParent', {
  superClass: 'PlayerAnimationInterface',

  init: function(playerGraphicObj, c_head, c_body, animationFront, animationLeft, animationRight, animationBack) {
      this.superInit();
      this.name = "";
      this.playerGraphicObj      = playerGraphicObj;

      this.mainSp         = Sprite('null',0,0,42,42); // キャラクターのグラフィック本体のスプライト
      this.outlineSp      = Sprite('null',0,0,42,42); // mainSpから作った黒縁のスプライト
      this.mainSp.originX = 0;
      this.mainSp.originY = 0;
      this.outlineSp.originX = 0;
      this.outlineSp.originY = 0;
      
      this.animationFront = animationFront;
      this.animationLeft  = animationLeft;
      this.animationRight = animationRight;
      this.animationBack  = animationBack;

      // mainSpに乗せる、キャラクターのグラフィック
      this.option_depth2  = PlayerSprite(c_head,"option_depth2",0,0,0,64,32,32).addChildTo(this.mainSp);  // オプション(奥)
      this.option_depth1  = PlayerSprite(c_head,"option_depth1",0,0,0,32,32,32).addChildTo(this.mainSp);  // オプション(手前)
      this.body           = PlayerSprite(c_body,"body",0,0,0,0,16,16).addChildTo(this.mainSp);            // 体
      this.head           = PlayerSprite(c_head,"head",0,0,0,0,32,32).addChildTo(this.mainSp);            // 頭
      this.arm_right      = PlayerSprite(c_body,"arm_right",0,0,0,16,8,8).addChildTo(this.mainSp);        // 右腕
      this.arm_left       = PlayerSprite(c_body,"arm_left",0,0,0,24,8,8).addChildTo(this.mainSp);         // 左腕
      this.leg_right      = PlayerSprite(c_body,"leg_right",0,0,24,16,8,8).addChildTo(this.mainSp);       // 右足
      this.leg_left       = PlayerSprite(c_body,"leg_left",0,0,32,16,8,8).addChildTo(this.mainSp);        // 左足
  
      // outlineSpに乗せる、キャラクターの黒縁のグラフィック
      this.option_depth2_ol  = PlayerOutlineSprite(c_head,"option_depth2",0,0,0,64,32,32).addChildTo(this.outlineSp);  // オプション(奥)
      this.option_depth1_ol  = PlayerOutlineSprite(c_head,"option_depth1",0,0,0,32,32,32).addChildTo(this.outlineSp);  // オプション(手前)
      this.body_ol           = PlayerOutlineSprite(c_body,"body",0,0,0,0,16,16).addChildTo(this.outlineSp);            // 体
      this.head_ol           = PlayerOutlineSprite(c_head,"head",0,0,0,0,32,32).addChildTo(this.outlineSp);            // 頭
      this.arm_right_ol      = PlayerOutlineSprite(c_body,"arm_right",0,0,0,16,8,8).addChildTo(this.outlineSp);        // 右腕
      this.arm_left_ol       = PlayerOutlineSprite(c_body,"arm_left",0,0,0,24,8,8).addChildTo(this.outlineSp);         // 左腕
      this.leg_right_ol      = PlayerOutlineSprite(c_body,"leg_right",0,0,24,16,8,8).addChildTo(this.outlineSp);       // 右足
      this.leg_left_ol       = PlayerOutlineSprite(c_body,"leg_left",0,0,32,16,8,8).addChildTo(this.outlineSp);        // 左足

      this.outlineSp.addChildTo(this);
      this.mainSp.addChildTo(this);

      this.anim1 = FrameAnimation('character_ss').attachTo(this.option_depth1);
      this.anim2 = FrameAnimation('character_ss').attachTo(this.option_depth2);    
      this.anim1_ol = FrameAnimation('character_ss').attachTo(this.option_depth1_ol);
      this.anim2_ol = FrameAnimation('character_ss').attachTo(this.option_depth2_ol);

      this._cnt=[0];
      this._sw1=[0];
      this._cnt_ol=[0];
      this._sw1_ol=[0];
  
      this.debugCnt = 0;


  },

  // 更新処理
  update: function(){
    this.debugCnt++;
    if(this.debugCnt >= this.playerGraphicObj.animationSpeed){
      this._Animation();
      this.debugCnt = 0
    }
  },

  // グラフィック遷移のpos実行処理
  posFunction: function(){
  },

  // グラフィック遷移のpos実行処理
  preFunction: function(){
    this._partsPosInit(this.option_depth1, this.head, this.body, this.option_depth2, this.arm_right, this.arm_left, this.leg_right, this.leg_left);
    this._partsPosInit(this.option_depth1_ol, this.head_ol, this.body_ol, this.option_depth2_ol, this.arm_right_ol, this.arm_left_ol, this.leg_right_ol, this.leg_left_ol);
    this._sortSpriteDepthInit(this.mainSp);
    this._sortSpriteDepthInit(this.outlineSp);
    this._frameAnimationInit(this.anim1,this.amin2,this.option_depth1,this.option_depth2);
    this._frameAnimationInit(this.anim1_ol,this.amin2_ol,this.option_depth1_ol,this.option_depth2_ol);
    this._cnt[0]=0;
    this._sw1[0]=0;
    this._cnt_ol=[0];
    this._sw1_ol=[0];
  },

  // グラフィック描画データの初期化
  graphicInit: function(){
    this._partsPosInit(this.option_depth1, this.head, this.body, this.option_depth2, this.arm_right, this.arm_left, this.leg_right, this.leg_left);
    this._partsPosInit(this.option_depth1_ol, this.head_ol, this.body_ol, this.option_depth2_ol, this.arm_right_ol, this.arm_left_ol, this.leg_right_ol, this.leg_left_ol);
    this._sortSpriteDepthInit(this.mainSp);
    this._sortSpriteDepthInit(this.outlineSp);
    this._frameAnimationInit(this.anim1,this.amin2,this.option_depth1,this.option_depth2);
    this._frameAnimationInit(this.anim1_ol,this.amin2_ol,this.option_depth1_ol,this.option_depth2_ol);
    this._cnt[0]=0;
    this._sw1[0]=0;
    this._cnt_ol=[0];
    this._sw1_ol=[0];
  },


  // アニメーション
  _Animation: function(){
    // 前方向
    if(this.playerGraphicObj.playerObj.direction == 'front'){
      this._AnimationFront(this._cnt, this._sw1,this.option_depth1, this.head, this.body, this.option_depth2, this.arm_right, this.arm_left, this.leg_right, this.leg_left);
      this._AnimationFront(this._cnt_ol, this._sw1_ol,this.option_depth1_ol, this.head_ol, this.body_ol, this.option_depth2_ol, this.arm_right_ol, this.arm_left_ol, this.leg_right_ol, this.leg_left_ol);
    }
    // 左方向
    else if(this.playerGraphicObj.playerObj.direction == 'left'){
      this._AnimationLeft(this._cnt, this._sw1,this.option_depth1, this.head, this.body, this.option_depth2, this.arm_right, this.arm_left, this.leg_right, this.leg_left);
      this._AnimationLeft(this._cnt_ol, this._sw1_ol,this.option_depth1_ol, this.head_ol, this.body_ol, this.option_depth2_ol, this.arm_right_ol, this.arm_left_ol, this.leg_right_ol, this.leg_left_ol);
    }
    // 右方向
    else if(this.playerGraphicObj.playerObj.direction == 'right'){
      this._AnimationRight(this._cnt, this._sw1,this.option_depth1, this.head, this.body, this.option_depth2, this.arm_right, this.arm_left, this.leg_right, this.leg_left);
      this._AnimationRight(this._cnt_ol, this._sw1_ol,this.option_depth1_ol, this.head_ol, this.body_ol, this.option_depth2_ol, this.arm_right_ol, this.arm_left_ol, this.leg_right_ol, this.leg_left_ol);
    }
    // 後方向
    else if(this.playerGraphicObj.playerObj.direction == 'back'){
      this._AnimationBack(this._cnt, this._sw1,this.option_depth1, this.head, this.body, this.option_depth2, this.arm_right, this.arm_left, this.leg_right, this.leg_left);
      this._AnimationBack(this._cnt_ol, this._sw1_ol,this.option_depth1_ol, this.head_ol, this.body_ol, this.option_depth2_ol, this.arm_right_ol, this.arm_left_ol, this.leg_right_ol, this.leg_left_ol);
    }
  },  

  _frameAnimationInit: function(anim1, anim2, option_depth1, option_depth2){
  },

  // 各パーツの初期位置を設定
  _partsPosInit: function(option_depth1, head, body, option_depth2, arm_right, arm_left, leg_right, leg_left){
  },

  // キャラの向いてる方向に応じてスプライトの重なる順番を入れ替える
  _sortSpriteDepthInit: function(masterSp){    
  },

  // 前向きアニメーション
  _AnimationFront: function(cnt, sw1, option_depth1, head, body, option_depth2, arm_right, arm_left, leg_right, leg_left){
    cnt[0]++;
    
    if(cnt[0] <= this.animationFront[sw1[0]].frameCnt){
      head.x      = this.animationFront[sw1[0]].head_px.x;
      head.y      = this.animationFront[sw1[0]].head_px.y;
      head.rotation = this.animationFront[sw1[0]].head_px.rotation;
      body.x      = this.animationFront[sw1[0]].body_px.x;
      body.y      = this.animationFront[sw1[0]].body_px.y;
      body.rotation      = this.animationFront[sw1[0]].body_px.rotation;
      arm_right.x = this.animationFront[sw1[0]].rightHand_px.x;
      arm_right.y = this.animationFront[sw1[0]].rightHand_px.y;
      arm_right.rotation = this.animationFront[sw1[0]].rightHand_px.rotation;
      arm_left.x  = this.animationFront[sw1[0]].leftHand_px.x;
      arm_left.y  = this.animationFront[sw1[0]].leftHand_px.y;
      arm_left.rotation  = this.animationFront[sw1[0]].leftHand_px.rotation;
      leg_right.x = this.animationFront[sw1[0]].rightLeg_px.x;
      leg_right.y = this.animationFront[sw1[0]].rightLeg_px.y;
      leg_right.rotation = this.animationFront[sw1[0]].rightLeg_px.rotation;
      leg_left.x  = this.animationFront[sw1[0]].leftLeg_px.x;
      leg_left.y  = this.animationFront[sw1[0]].leftLeg_px.y;
      leg_left.rotation  = this.animationFront[sw1[0]].leftLeg_px.rotation;
      option_depth1.x = this.animationFront[sw1[0]].option1_px.x;
      option_depth1.y = this.animationFront[sw1[0]].option1_px.y;
      option_depth1.rotation = this.animationFront[sw1[0]].option1_px.rotation;
      option_depth2.x = this.animationFront[sw1[0]].option2_px.x;
      option_depth2.y = this.animationFront[sw1[0]].option2_px.y;
      option_depth2.rotation = this.animationFront[sw1[0]].option2_px.rotation;
    }
    else{
      cnt[0] = 0;
      sw1[0] = sw1[0] + 1;
    }
    if(this.animationFront.length <= sw1[0]){
      sw1[0] = 0;
    }
    
  },

  // 左向きアニメーション
  _AnimationLeft: function(cnt, sw1, option_depth1, head, body, option_depth2, arm_right, arm_left, leg_right, leg_left){
    cnt[0]++;
    
    if(cnt[0] <= this.animationLeft[sw1[0]].frameCnt){
      head.x      = this.animationLeft[sw1[0]].head_px.x;
      head.y      = this.animationLeft[sw1[0]].head_px.y;
      head.rotation      = this.animationLeft[sw1[0]].head_px.rotation;

      body.x      = this.animationLeft[sw1[0]].body_px.x;
      body.y      = this.animationLeft[sw1[0]].body_px.y;
      body.rotation      = this.animationLeft[sw1[0]].body_px.rotation;

      arm_right.x = this.animationLeft[sw1[0]].rightHand_px.x;
      arm_right.y = this.animationLeft[sw1[0]].rightHand_px.y;
      arm_right.rotation = this.animationLeft[sw1[0]].rightHand_px.rotation;
      arm_left.x  = this.animationLeft[sw1[0]].leftHand_px.x;
      arm_left.y  = this.animationLeft[sw1[0]].leftHand_px.y;
      arm_left.rotation  = this.animationLeft[sw1[0]].leftHand_px.rotation;
      leg_right.x = this.animationLeft[sw1[0]].rightLeg_px.x;
      leg_right.y = this.animationLeft[sw1[0]].rightLeg_px.y;
      leg_right.rotation = this.animationLeft[sw1[0]].rightLeg_px.rotation;
      leg_left.x  = this.animationLeft[sw1[0]].leftLeg_px.x;
      leg_left.y  = this.animationLeft[sw1[0]].leftLeg_px.y;
      leg_left.rotation  = this.animationLeft[sw1[0]].leftLeg_px.rotation;
      option_depth1.x = this.animationLeft[sw1[0]].option1_px.x;
      option_depth1.y = this.animationLeft[sw1[0]].option1_px.y;
      option_depth1.rotation = this.animationLeft[sw1[0]].option1_px.rotation;
      option_depth2.x = this.animationLeft[sw1[0]].option2_px.x;
      option_depth2.y = this.animationLeft[sw1[0]].option2_px.y;
      option_depth2.rotation = this.animationLeft[sw1[0]].option2_px.rotation;

    }else{
      cnt[0] = 0;
      sw1[0] = sw1[0] + 1;
    }
    if(this.animationLeft.length <= sw1[0]){
      sw1[0] = 0;
    }
  },

  // 右向きアニメーション
  _AnimationRight: function(cnt, sw1, option_depth1, head, body, option_depth2, arm_right, arm_left, leg_right, leg_left){
    this._AnimationLeft(cnt, sw1, option_depth1, head, body, option_depth2, arm_right, arm_left, leg_right, leg_left);
  },

  // 後向きアニメーション
  _AnimationBack: function(cnt, sw1, option_depth1, head, body, option_depth2, arm_right, arm_left, leg_right, leg_left){
    cnt[0]++;
    
    if(cnt[0] <= this.animationBack[sw1[0]].frameCnt){
      head.x      = this.animationBack[sw1[0]].head_px.x;
      head.y      = this.animationBack[sw1[0]].head_px.y;
      head.rotation      = this.animationBack[sw1[0]].head_px.rotation;

      body.x      = this.animationBack[sw1[0]].body_px.x;
      body.y      = this.animationBack[sw1[0]].body_px.y;
      body.rotation      = this.animationBack[sw1[0]].body_px.rotation;

      arm_right.x = this.animationBack[sw1[0]].rightHand_px.x;
      arm_right.y = this.animationBack[sw1[0]].rightHand_px.y;
      arm_right.rotation = this.animationBack[sw1[0]].rightHand_px.rotation;
      arm_left.x  = this.animationBack[sw1[0]].leftHand_px.x;
      arm_left.y  = this.animationBack[sw1[0]].leftHand_px.y;
      arm_left.rotation  = this.animationBack[sw1[0]].leftHand_px.rotation;
      leg_right.x = this.animationBack[sw1[0]].rightLeg_px.x;
      leg_right.y = this.animationBack[sw1[0]].rightLeg_px.y;
      leg_right.rotation = this.animationBack[sw1[0]].rightLeg_px.rotation;
      leg_left.x  = this.animationBack[sw1[0]].leftLeg_px.x;
      leg_left.y  = this.animationBack[sw1[0]].leftLeg_px.y;
      leg_left.rotation  = this.animationBack[sw1[0]].leftLeg_px.rotation;
      option_depth1.x = this.animationBack[sw1[0]].option1_px.x;
      option_depth1.y = this.animationBack[sw1[0]].option1_px.y;
      option_depth1.rotation = this.animationBack[sw1[0]].option1_px.rotation;
      option_depth2.x = this.animationBack[sw1[0]].option2_px.x;
      option_depth2.y = this.animationBack[sw1[0]].option2_px.y;
      option_depth2.rotation = this.animationBack[sw1[0]].option2_px.rotation;

    }else{
      cnt[0] = 0;
      sw1[0] = sw1[0] + 1;
    }
    if(this.animationBack.length <= sw1[0]){
      sw1[0] = 0;
    }
  },

});


phina.define('PlayerAnimation1', {
  superClass: 'PlayerAnimationParent',

  init: function(playerGraphicObj, c_head, c_body, animationFront, animationLeft, animationRight, animationBack) {
    this.superInit(playerGraphicObj, c_head, c_body, animationFront, animationLeft, animationRight, animationBack);

    this.name = "stand";

  },

  // 各パーツの初期位置を設定
  _partsPosInit: function(option_depth1, head, body, option_depth2, arm_right, arm_left, leg_right, leg_left){
    if(this.playerGraphicObj.playerObj.direction == 'front'){      
      option_depth2.alpha = 0;
      option_depth1.setScreenPos(this.animationFront[0].option1_px.x,this.animationFront[0].option1_px.y,0,32,32,32,this.animationFront[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationFront[0].option2_px.x,this.animationFront[0].option2_px.y,0,32,32,32,this.animationFront[0].option2_px.rotation);
      head.setScreenPos(this.animationFront[0].head_px.x,this.animationFront[0].head_px.y,0,0,32,32,this.animationFront[0].head_px.rotation);
      body.setScreenPos(this.animationFront[0].body_px.x,this.animationFront[0].body_px.y,0,0,16,16,this.animationFront[0].body_px.rotation);
      arm_right.setScreenPos(this.animationFront[0].rightHand_px.x,this.animationFront[0].rightHand_px.y,0,16,8,8,this.animationFront[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationFront[0].leftHand_px.x,this.animationFront[0].leftHand_px.y,0,24,8,8,this.animationFront[0].leftHand_px.rotation);    
      leg_right.setScreenPos(this.animationFront[0].rightLeg_px.x,this.animationFront[0].rightLeg_px.y,32,16,8,8,this.animationFront[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationFront[0].leftLeg_px.x,this.animationFront[0].leftLeg_px.y,32,24,8,8,this.animationFront[0].leftLeg_px.rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'left'){
      option_depth2.setScreenPos(this.animationLeft[0].option2_px.x,this.animationLeft[0].option2_px.y,0,96,32,32,this.animationLeft[0].option2_px.rotation);
      option_depth2.alpha = 1.0;
      head.setScreenPos(this.animationLeft[0].head_px.x,this.animationLeft[0].head_px.y,32,0,32,32,this.animationLeft[0].head_px.rotation);
      body.setScreenPos(this.animationLeft[0].body_px.x,this.animationLeft[0].body_px.y,32,0,16,16,this.animationLeft[0].body_px.rotation);
      option_depth1.setScreenPos(this.animationLeft[0].option1_px.x,this.animationLeft[0].option1_px.y,0,64,32,32,this.animationLeft[0].option1_px.rotation);
      arm_right.setScreenPos(this.animationLeft[0].rightHand_px.x,this.animationLeft[0].rightHand_px.y,16,16,8,8,this.animationLeft[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationLeft[0].leftHand_px.x,this.animationLeft[0].leftHand_px.y,24,16,8,8,this.animationLeft[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationLeft[0].rightLeg_px.x,this.animationLeft[0].rightLeg_px.y,48,16,8,8,this.animationLeft[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationLeft[0].leftLeg_px.x,this.animationLeft[0].leftLeg_px.y,48,24,8,8,this.animationLeft[0].leftLeg_px .rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'right'){
      option_depth2.setScreenPos(this.animationRight[0].option2_px.x,this.animationRight[0].option2_px.y,0,96,32,32,this.animationRight[0].option2_px.rotation);
      option_depth2.alpha = 1.0;
      head.setScreenPos(this.animationRight[0].head_px.x,this.animationRight[0].head_px.y,32,0,32,32,this.animationRight[0].head_px.rotation);
      body.setScreenPos(this.animationRight[0].body_px.x,this.animationRight[0].body_px.y,32,0,16,16,this.animationRight[0].body_px.rotation);
      option_depth1.setScreenPos(this.animationRight[0].option1_px.x,this.animationRight[0].option1_px.y,0,64,32,32,this.animationRight[0].option1_px.rotation);
      arm_right.setScreenPos(this.animationRight[0].rightHand_px.x,this.animationRight[0].rightHand_px.y,16,16,8,8,this.animationRight[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationRight[0].leftHand_px.x,this.animationRight[0].leftHand_px.y,24,16,8,8,this.animationRight[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationRight[0].rightLeg_px.x,this.animationRight[0].rightLeg_px.y,48,16,8,8,this.animationRight[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationRight[0].leftLeg_px.x,this.animationRight[0].leftLeg_px.y,48,24,8,8,this.animationRight[0].leftLeg_px.rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'back'){
      option_depth1.setScreenPos(this.animationBack[0].option1_px.x,this.animationBack[0].option1_px.y,0,128,32,32,this.animationBack[0].option1_px.rotation);
      head.setScreenPos(this.animationBack[0].head_px.x,this.animationBack[0].head_px.y,64,0,32,32,this.animationBack[0].head_px.rotation);
      body.setScreenPos(this.animationBack[0].body_px.x,this.animationBack[0].body_px.y,48,0,16,16,this.animationBack[0].body_px.rotation);
      option_depth2.alpha = 0;
      arm_right.setScreenPos(this.animationBack[0].rightHand_px.x,this.animationBack[0].rightHand_px.y,24,16,8,8,this.animationBack[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationBack[0].leftHand_px.x,this.animationBack[0].leftHand_px.y,24,24,8,8,this.animationBack[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationBack[0].rightLeg_px.x,this.animationBack[0].rightLeg_px.y,56,16,8,8,this.animationBack[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationBack[0].leftLeg_px.x,this.animationBack[0].leftLeg_px.y,56,24,8,8,this.animationBack[0].leftLeg_px.rotation);
    }
  },

  // キャラの向いてる方向に応じてスプライトの重なる順番を入れ替える
  _sortSpriteDepthInit: function(masterSp){    
    var newList = new Array();

    // [手前] 左腕>右足>オプ2>オプ1>左足>胴>頭>右腕 [奥]
    if(this.playerGraphicObj.playerObj.direction == 'front'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "arm_left"){
          newList[0] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth2"){
          newList[1] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_left"){
          newList[3] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_right"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'right'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "leg_left"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "arm_left"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth2"){
          newList[2] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "body"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_right"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'left'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "leg_right"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_left"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth2"){
          newList[2] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "body"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'back'){
      for(var i = 0; i < masterSp.children.length; i++){      
        if(masterSp.children[i].name == "arm_right"){
          newList[0] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_right"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_left"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth2"){
          newList[5] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      } 
    }

    masterSp.children = newList;

  },

});

phina.define('PlayerAnimation2', {
  superClass: 'PlayerAnimationParent',

  init: function(playerGraphicObj, c_head, c_body, animationFront, animationLeft, animationRight, animationBack) {
    this.superInit(playerGraphicObj, c_head, c_body, animationFront, animationLeft, animationRight, animationBack);

    this.name = "run"

  },

  // フレームアニメーション初期設定
  _frameAnimationInit: function(anim1, anim2, option_depth1, option_depth2){

    option_depth1.accessories = [];
    option_depth2.accessories = [];

    try{
      anim1.remove();
      anim2.remove();
    } catch(error){
      //pass
    }
    anim1 = FrameAnimation('character_ss').attachTo(option_depth1);
    anim2 = FrameAnimation('character_ss').attachTo(option_depth2);

    if(this.playerGraphicObj.playerObj.direction == 'front'){
      anim1.gotoAndPlay('hair_run_front');
    }
    else if(this.playerGraphicObj.playerObj.direction == 'left'){
      anim1.gotoAndPlay('hair_run_side_depth1');
      anim2.gotoAndPlay('hair_run_side_depth2');
    }
    else if(this.playerGraphicObj.playerObj.direction == 'right'){
      anim1.gotoAndPlay('hair_run_side_depth1');
      anim2.gotoAndPlay('hair_run_side_depth2');
    }
    else if(this.playerGraphicObj.playerObj.direction == 'back'){
      anim1.gotoAndPlay('hair_run_back');
    }
    else{
      anim1.gotoAndPlay('hair_run_front');
    }
  },

  // 各パーツの初期位置を設定
  _partsPosInit: function(option_depth1, head, body, option_depth2, arm_right, arm_left, leg_right, leg_left){
    if(this.playerGraphicObj.playerObj.direction == 'front'){
      option_depth2.alpha = 0;
      option_depth1.setScreenPos(this.animationFront[0].option1_px.x,this.animationFront[0].option1_px.y,96,32,32,32,this.animationFront[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationFront[0].option2_px.x,this.animationFront[0].option2_px.y,128,32,32,32,this.animationFront[0].option2_px.rotation);
      head.setScreenPos(this.animationFront[0].head_px.x,this.animationFront[0].head_px.y,0,0,32,32,this.animationFront[0].head_px.rotation);
      body.setScreenPos(this.animationFront[0].body_px.x,this.animationFront[0].body_px.y,0,0,16,16,this.animationFront[0].body_px.rotation);
      arm_right.setScreenPos(this.animationFront[0].rightHand_px.x,this.animationFront[0].rightHand_px.y,0,16,8,8,this.animationFront[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationFront[0].leftHand_px.x,this.animationFront[0].leftHand_px.y,0,24,8,8,this.animationFront[0].leftHand_px.rotation);    
      leg_right.setScreenPos(this.animationFront[0].rightLeg_px.x,this.animationFront[0].rightLeg_px.y,32,16,8,8,this.animationFront[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationFront[0].leftLeg_px.x,this.animationFront[0].leftLeg_px.y,32,24,8,8,this.animationFront[0].leftLeg_px.rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'left'){      
      option_depth2.alpha = 1.0;
      option_depth1.setScreenPos(this.animationLeft[0].option1_px.x,this.animationLeft[0].option1_px.y,96,64,32,32,this.animationLeft[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationLeft[0].option2_px.x,this.animationLeft[0].option2_px.y,128,64,32,32,this.animationLeft[0].option2_px.rotation);
      head.setScreenPos(this.animationLeft[0].head_px.x,this.animationLeft[0].head_px.y,32,0,32,32,this.animationLeft[0].head_px.rotation);
      body.setScreenPos(this.animationLeft[0].body_px.x,this.animationLeft[0].body_px.y,32,0,16,16,this.animationLeft[0].body_px.rotation);
      arm_right.setScreenPos(this.animationLeft[0].rightHand_px.x,this.animationLeft[0].rightHand_px.y,16,16,8,8,this.animationLeft[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationLeft[0].leftHand_px.x,this.animationLeft[0].leftHand_px.y,16,24,8,8,this.animationLeft[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationLeft[0].rightLeg_px.x,this.animationLeft[0].rightLeg_px.y,48,16,8,8,this.animationLeft[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationLeft[0].leftLeg_px.x,this.animationLeft[0].leftLeg_px.y,48,24,8,8,this.animationLeft[0].leftLeg_px .rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'right'){
      option_depth2.alpha = 1.0;
      option_depth1.setScreenPos(this.animationRight[0].option1_px.x,this.animationRight[0].option1_px.y,96,64,32,32,this.animationRight[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationRight[0].option2_px.x,this.animationRight[0].option2_px.y,128,64,32,32,this.animationRight[0].option2_px.rotation);
      head.setScreenPos(this.animationRight[0].head_px.x,this.animationRight[0].head_px.y,32,0,32,32,this.animationRight[0].head_px.rotation);
      body.setScreenPos(this.animationRight[0].body_px.x,this.animationRight[0].body_px.y,32,0,16,16,this.animationRight[0].body_px.rotation);
      arm_right.setScreenPos(this.animationRight[0].rightHand_px.x,this.animationRight[0].rightHand_px.y,16,16,8,8,this.animationRight[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationRight[0].leftHand_px.x,this.animationRight[0].leftHand_px.y,24,16,8,8,this.animationRight[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationRight[0].rightLeg_px.x,this.animationRight[0].rightLeg_px.y,48,16,8,8,this.animationRight[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationRight[0].leftLeg_px.x,this.animationRight[0].leftLeg_px.y,48,24,8,8,this.animationRight[0].leftLeg_px.rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'back'){
      option_depth2.alpha = 0;
      option_depth1.setScreenPos(this.animationBack[0].option1_px.x,this.animationBack[0].option1_px.y,96,128,32,32,this.animationBack[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationBack[0].option2_px.x,this.animationBack[0].option2_px.y,128,128,32,32);
      head.setScreenPos(this.animationBack[0].head_px.x,this.animationBack[0].head_px.y,64,0,32,32,this.animationBack[0].head_px.rotation);
      body.setScreenPos(this.animationBack[0].body_px.x,this.animationBack[0].body_px.y,48,0,16,16,this.animationBack[0].body_px.rotation);
      arm_right.setScreenPos(this.animationBack[0].rightHand_px.x,this.animationBack[0].rightHand_px.y,24,16,8,8,this.animationBack[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationBack[0].leftHand_px.x,this.animationBack[0].leftHand_px.y,24,24,8,8,this.animationBack[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationBack[0].rightLeg_px.x,this.animationBack[0].rightLeg_px.y,56,16,8,8,this.animationBack[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationBack[0].leftLeg_px.x,this.animationBack[0].leftLeg_px.y,56,24,8,8,this.animationBack[0].leftLeg_px.rotation);
    }
  },

  // キャラの向いてる方向に応じてスプライトの重なる順番を入れ替える
  _sortSpriteDepthInit: function(masterSp){    
    var newList = new Array();

    // [手前] 左腕>右足>オプ2>オプ1>左足>胴>頭>右腕 [奥]
    if(this.playerGraphicObj.playerObj.direction == 'front'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "option_depth2"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_left"){
          newList[2] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_right"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'right'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "option_depth2"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_right"){
          newList[1] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_left"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'left'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "option_depth2"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_right"){
          newList[1] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_left"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'back'){
      for(var i = 0; i < masterSp.children.length; i++){      
        if(masterSp.children[i].name == "leg_right"){
          newList[0] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_left"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth2"){
          newList[6] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      } 
    }

    masterSp.children = newList;

  },

});

phina.define('PlayerAnimation3', {
  superClass: 'PlayerAnimationParent',

  init: function(playerGraphicObj, c_head, c_body, animationFront, animationLeft, animationRight, animationBack) {
    this.superInit(playerGraphicObj, c_head, c_body, animationFront, animationLeft, animationRight, animationBack);

    this.name = "walk";

  },

  // フレームアニメーション初期設定
  _frameAnimationInit: function(anim1, anim2, option_depth1, option_depth2){
    option_depth1.accessories = [];
    option_depth2.accessories = [];
    
    try{
      anim1.remove();
      anim2.remove();
    } catch(error){
      //pass
    }
    anim1 = FrameAnimation('character_ss').attachTo(option_depth1);
    anim2 = FrameAnimation('character_ss').attachTo(option_depth2);
    
    if(this.playerGraphicObj.playerObj.direction == 'front'){
      anim1.gotoAndPlay('hair_walk_front');
    }
    else if(this.playerGraphicObj.playerObj.direction == 'left'){
      anim1.gotoAndPlay('hair_walk_side_depth1');
      anim2.gotoAndPlay('hair_walk_side_depth2');
    }
    else if(this.playerGraphicObj.playerObj.direction == 'right'){
      anim1.gotoAndPlay('hair_walk_side_depth1');
      anim2.gotoAndPlay('hair_walk_side_depth2');
    }
    else if(this.playerGraphicObj.playerObj.direction == 'back'){
      anim1.gotoAndPlay('hair_walk_back');
    }
    else{
      anim1.gotoAndPlay('hair_walk_front');
    }
    
  },


  // 各パーツの初期位置を設定
  _partsPosInit: function(option_depth1, head, body, option_depth2, arm_right, arm_left, leg_right, leg_left){
    if(this.playerGraphicObj.playerObj.direction == 'front'){
      option_depth2.alpha = 0;
      option_depth1.setScreenPos(this.animationFront[0].option1_px.x,this.animationFront[0].option1_px.y,0,32,32,32,this.animationFront[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationFront[0].option2_px.x,this.animationFront[0].option2_px.y,0,32,32,32,this.animationFront[0].option2_px.rotation);
      head.setScreenPos(this.animationFront[0].head_px.x,this.animationFront[0].head_px.y,0,0,32,32,this.animationFront[0].head_px.rotation);
      body.setScreenPos(this.animationFront[0].body_px.x,this.animationFront[0].body_px.y,0,0,16,16,this.animationFront[0].body_px.rotation);
      arm_right.setScreenPos(this.animationFront[0].rightHand_px.x,this.animationFront[0].rightHand_px.y,0,16,8,8,this.animationFront[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationFront[0].leftHand_px.x,this.animationFront[0].leftHand_px.y,0,24,8,8,this.animationFront[0].leftHand_px.rotation);    
      leg_right.setScreenPos(this.animationFront[0].rightLeg_px.x,this.animationFront[0].rightLeg_px.y,32,16,8,8,this.animationFront[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationFront[0].leftLeg_px.x,this.animationFront[0].leftLeg_px.y,32,24,8,8,this.animationFront[0].leftLeg_px.rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'left'){
      option_depth2.alpha = 1.0;
      option_depth1.setScreenPos(this.animationLeft[0].option1_px.x,this.animationLeft[0].option1_px.y,0,64,32,32,this.animationLeft[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationLeft[0].option2_px.x,this.animationLeft[0].option2_px.y,0,64,32,32,this.animationLeft[0].option2_px.rotation);
      head.setScreenPos(this.animationLeft[0].head_px.x,this.animationLeft[0].head_px.y,32,0,32,32,this.animationLeft[0].head_px.rotation);
      body.setScreenPos(this.animationLeft[0].body_px.x,this.animationLeft[0].body_px.y,32,0,16,16,this.animationLeft[0].body_px.rotation);
      arm_right.setScreenPos(this.animationLeft[0].rightHand_px.x,this.animationLeft[0].rightHand_px.y,16,16,8,8,this.animationLeft[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationLeft[0].leftHand_px.x,this.animationLeft[0].leftHand_px.y,16,24,8,8,this.animationLeft[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationLeft[0].rightLeg_px.x,this.animationLeft[0].rightLeg_px.y,48,16,8,8,this.animationLeft[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationLeft[0].leftLeg_px.x,this.animationLeft[0].leftLeg_px.y,48,24,8,8,this.animationLeft[0].leftLeg_px .rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'right'){
      option_depth2.alpha = 1.0;
      option_depth1.setScreenPos(this.animationRight[0].option1_px.x,this.animationRight[0].option1_px.y,0,64,32,32,this.animationRight[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationRight[0].option2_px.x,this.animationRight[0].option2_px.y,0,64,32,32,this.animationRight[0].option2_px.rotation);
      head.setScreenPos(this.animationRight[0].head_px.x,this.animationRight[0].head_px.y,32,0,32,32,this.animationRight[0].head_px.rotation);
      body.setScreenPos(this.animationRight[0].body_px.x,this.animationRight[0].body_px.y,32,0,16,16,this.animationRight[0].body_px.rotation);
      arm_right.setScreenPos(this.animationRight[0].rightHand_px.x,this.animationRight[0].rightHand_px.y,16,16,8,8,this.animationRight[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationRight[0].leftHand_px.x,this.animationRight[0].leftHand_px.y,24,16,8,8,this.animationRight[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationRight[0].rightLeg_px.x,this.animationRight[0].rightLeg_px.y,48,16,8,8,this.animationRight[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationRight[0].leftLeg_px.x,this.animationRight[0].leftLeg_px.y,48,24,8,8,this.animationRight[0].leftLeg_px.rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'back'){
      option_depth2.alpha = 0;
      option_depth1.setScreenPos(this.animationBack[0].option1_px.x,this.animationBack[0].option1_px.y,0,128,32,32,this.animationBack[0].option1_px.rotation);
      //option_depth2.setScreenPos(this.animationBack[0].option2_px.x,this.animationBack[0].option2_px.y,0,96,32,32);
      head.setScreenPos(this.animationBack[0].head_px.x,this.animationBack[0].head_px.y,64,0,32,32,this.animationBack[0].head_px.rotation);
      body.setScreenPos(this.animationBack[0].body_px.x,this.animationBack[0].body_px.y,48,0,16,16,this.animationBack[0].body_px.rotation);
      arm_right.setScreenPos(this.animationBack[0].rightHand_px.x,this.animationBack[0].rightHand_px.y,24,16,8,8,this.animationBack[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationBack[0].leftHand_px.x,this.animationBack[0].leftHand_px.y,24,24,8,8,this.animationBack[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationBack[0].rightLeg_px.x,this.animationBack[0].rightLeg_px.y,56,16,8,8,this.animationBack[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationBack[0].leftLeg_px.x,this.animationBack[0].leftLeg_px.y,56,24,8,8,this.animationBack[0].leftLeg_px.rotation);
    }
  },

  // キャラの向いてる方向に応じてスプライトの重なる順番を入れ替える
  _sortSpriteDepthInit: function(masterSp){    
    var newList = new Array();

    // [手前] 左腕>右足>オプ2>オプ1>左足>胴>頭>右腕 [奥]
    if(this.playerGraphicObj.playerObj.direction == 'front'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "option_depth2"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_left"){
          newList[2] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_right"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'right'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "leg_right"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_left"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth2"){
          newList[3] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'left'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "leg_right"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_left"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth2"){
          newList[3] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'back'){
      for(var i = 0; i < masterSp.children.length; i++){      
        if(masterSp.children[i].name == "arm_left"){
          newList[0] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_right"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_left"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth2"){
          newList[6] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      } 
    }

    masterSp.children = newList;

  },

});

phina.define('PlayerAnimation4', {
  superClass: 'PlayerAnimationParent',

  init: function(playerGraphicObj, c_head, c_body, animationFront, animationLeft, animationRight, animationBack) {
    this.superInit(playerGraphicObj, c_head, c_body, animationFront, animationLeft, animationRight, animationBack);

    this.name = "guardStand";

  },

  // 各パーツの初期位置を設定
  _partsPosInit: function(option_depth1, head, body, option_depth2, arm_right, arm_left, leg_right, leg_left){
    if(this.playerGraphicObj.playerObj.direction == 'front'){
      option_depth2.alpha = 0;
      option_depth1.setScreenPos(this.animationFront[0].option1_px.x,this.animationFront[0].option1_px.y,0,32,32,32,this.animationFront[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationFront[0].option2_px.x,this.animationFront[0].option2_px.y,0,32,32,32,this.animationFront[0].option2_px.rotation);
      head.setScreenPos(this.animationFront[0].head_px.x,this.animationFront[0].head_px.y,0,0,32,32,this.animationFront[0].head_px.rotation);
      body.setScreenPos(this.animationFront[0].body_px.x,this.animationFront[0].body_px.y,0,0,16,16,this.animationFront[0].body_px.rotation);
      arm_right.setScreenPos(this.animationFront[0].rightHand_px.x,this.animationFront[0].rightHand_px.y,0,16,8,8,this.animationFront[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationFront[0].leftHand_px.x,this.animationFront[0].leftHand_px.y,0,24,8,8,this.animationFront[0].leftHand_px.rotation);    
      leg_right.setScreenPos(this.animationFront[0].rightLeg_px.x,this.animationFront[0].rightLeg_px.y,32,16,8,8,this.animationFront[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationFront[0].leftLeg_px.x,this.animationFront[0].leftLeg_px.y,32,24,8,8,this.animationFront[0].leftLeg_px.rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'left'){
      option_depth2.alpha = 1.0;
      option_depth1.setScreenPos(this.animationLeft[0].option1_px.x,this.animationLeft[0].option1_px.y,0,64,32,32,this.animationLeft[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationLeft[0].option2_px.x,this.animationLeft[0].option2_px.y,0,64,32,32,this.animationLeft[0].option2_px.rotation);
      head.setScreenPos(this.animationLeft[0].head_px.x,this.animationLeft[0].head_px.y,32,0,32,32,this.animationLeft[0].head_px.rotation);
      body.setScreenPos(this.animationLeft[0].body_px.x,this.animationLeft[0].body_px.y,32,0,16,16,this.animationLeft[0].body_px.rotation);
      arm_right.setScreenPos(this.animationLeft[0].rightHand_px.x,this.animationLeft[0].rightHand_px.y,16,16,8,8,this.animationLeft[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationLeft[0].leftHand_px.x,this.animationLeft[0].leftHand_px.y,16,24,8,8,this.animationLeft[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationLeft[0].rightLeg_px.x,this.animationLeft[0].rightLeg_px.y,48,16,8,8,this.animationLeft[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationLeft[0].leftLeg_px.x,this.animationLeft[0].leftLeg_px.y,48,24,8,8,this.animationLeft[0].leftLeg_px .rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'right'){
      option_depth2.alpha = 1.0;
      option_depth1.setScreenPos(this.animationRight[0].option1_px.x,this.animationRight[0].option1_px.y,0,64,32,32,this.animationRight[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationRight[0].option2_px.x,this.animationRight[0].option2_px.y,0,64,32,32,this.animationRight[0].option2_px.rotation);
      head.setScreenPos(this.animationRight[0].head_px.x,this.animationRight[0].head_px.y,32,0,32,32,this.animationRight[0].head_px.rotation);
      body.setScreenPos(this.animationRight[0].body_px.x,this.animationRight[0].body_px.y,32,0,16,16,this.animationRight[0].body_px.rotation);
      arm_right.setScreenPos(this.animationRight[0].rightHand_px.x,this.animationRight[0].rightHand_px.y,16,16,8,8,this.animationRight[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationRight[0].leftHand_px.x,this.animationRight[0].leftHand_px.y,24,16,8,8,this.animationRight[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationRight[0].rightLeg_px.x,this.animationRight[0].rightLeg_px.y,48,16,8,8,this.animationRight[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationRight[0].leftLeg_px.x,this.animationRight[0].leftLeg_px.y,48,24,8,8,this.animationRight[0].leftLeg_px.rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'back'){
      option_depth2.alpha = 0;
      option_depth1.setScreenPos(this.animationBack[0].option1_px.x,this.animationBack[0].option1_px.y,0,128,32,32,this.animationBack[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationBack[0].option2_px.x,this.animationBack[0].option2_px.y,0,96,32,32,this.animationBack[0].option2_px.rotation);
      head.setScreenPos(this.animationBack[0].head_px.x,this.animationBack[0].head_px.y,64,0,32,32,this.animationBack[0].head_px.rotation);
      body.setScreenPos(this.animationBack[0].body_px.x,this.animationBack[0].body_px.y,48,0,16,16,this.animationBack[0].body_px.rotation);
      arm_right.setScreenPos(this.animationBack[0].rightHand_px.x,this.animationBack[0].rightHand_px.y,24,16,8,8,this.animationBack[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationBack[0].leftHand_px.x,this.animationBack[0].leftHand_px.y,24,24,8,8,this.animationBack[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationBack[0].rightLeg_px.x,this.animationBack[0].rightLeg_px.y,56,16,8,8,this.animationBack[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationBack[0].leftLeg_px.x,this.animationBack[0].leftLeg_px.y,56,24,8,8,this.animationBack[0].leftLeg_px.rotation);

    }
  },

  // キャラの向いてる方向に応じてスプライトの重なる順番を入れ替える
  _sortSpriteDepthInit: function(masterSp){    
    var newList = new Array();

    // [手前] 左腕>右足>オプ2>オプ1>左足>胴>頭>右腕 [奥]
    if(this.playerGraphicObj.playerObj.direction == 'front'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "option_depth2"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_left"){
          newList[2] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_right"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'right'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "leg_right"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_left"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth2"){
          newList[3] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'left'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "leg_right"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_left"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth2"){
          newList[3] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'back'){
      for(var i = 0; i < masterSp.children.length; i++){      
        if(masterSp.children[i].name == "arm_left"){
          newList[0] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_right"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_left"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth2"){
          newList[6] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      } 
    }

    masterSp.children = newList;

  },

});

phina.define('PlayerAnimation5', {
  superClass: 'PlayerAnimationParent',

  init: function(playerGraphicObj, c_head, c_body, animationFront, animationLeft, animationRight, animationBack) {
    this.superInit(playerGraphicObj, c_head, c_body, animationFront, animationLeft, animationRight, animationBack);

    this.name = "guardWalk";

  },

  // フレームアニメーション初期設定
  _frameAnimationInit: function(anim1, anim2, option_depth1, option_depth2){
    option_depth1.accessories = [];
    option_depth2.accessories = [];
    
    try{
      anim1.remove();
      anim2.remove();
    } catch(error){
      //pass
    }
    anim1 = FrameAnimation('character_ss').attachTo(option_depth1);
    anim2 = FrameAnimation('character_ss').attachTo(option_depth2);
    
    if(this.playerGraphicObj.playerObj.direction == 'front'){
      anim1.gotoAndPlay('hair_walk_front');
    }
    else if(this.playerGraphicObj.playerObj.direction == 'left'){
      anim1.gotoAndPlay('hair_walk_side_depth1');
      anim2.gotoAndPlay('hair_walk_side_depth2');
    }
    else if(this.playerGraphicObj.playerObj.direction == 'right'){
      anim1.gotoAndPlay('hair_walk_side_depth1');
      anim2.gotoAndPlay('hair_walk_side_depth2');
    }
    else if(this.playerGraphicObj.playerObj.direction == 'back'){
      anim1.gotoAndPlay('hair_walk_back');
    }
    else{
      anim1.gotoAndPlay('hair_walk_front');
    }
    
  },


  // 各パーツの初期位置を設定
  _partsPosInit: function(option_depth1, head, body, option_depth2, arm_right, arm_left, leg_right, leg_left){
    if(this.playerGraphicObj.playerObj.direction == 'front'){
      option_depth2.alpha = 0;
      option_depth1.setScreenPos(this.animationFront[0].option1_px.x,this.animationFront[0].option1_px.y,0,32,32,32,this.animationFront[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationFront[0].option2_px.x,this.animationFront[0].option2_px.y,0,32,32,32,this.animationFront[0].option2_px.rotation);
      head.setScreenPos(this.animationFront[0].head_px.x,this.animationFront[0].head_px.y,0,0,32,32,this.animationFront[0].head_px.rotation);
      body.setScreenPos(this.animationFront[0].body_px.x,this.animationFront[0].body_px.y,0,0,16,16,this.animationFront[0].body_px.rotation);
      arm_right.setScreenPos(this.animationFront[0].rightHand_px.x,this.animationFront[0].rightHand_px.y,0,16,8,8,this.animationFront[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationFront[0].leftHand_px.x,this.animationFront[0].leftHand_px.y,0,24,8,8,this.animationFront[0].leftHand_px.rotation);    
      leg_right.setScreenPos(this.animationFront[0].rightLeg_px.x,this.animationFront[0].rightLeg_px.y,32,16,8,8,this.animationFront[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationFront[0].leftLeg_px.x,this.animationFront[0].leftLeg_px.y,32,24,8,8,this.animationFront[0].leftLeg_px.rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'left'){
      option_depth2.alpha = 1.0;
      option_depth1.setScreenPos(this.animationLeft[0].option1_px.x,this.animationLeft[0].option1_px.y,0,64,32,32,this.animationLeft[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationLeft[0].option2_px.x,this.animationLeft[0].option2_px.y,0,64,32,32,this.animationLeft[0].option2_px.rotation);
      head.setScreenPos(this.animationLeft[0].head_px.x,this.animationLeft[0].head_px.y,32,0,32,32,this.animationLeft[0].head_px.rotation);
      body.setScreenPos(this.animationLeft[0].body_px.x,this.animationLeft[0].body_px.y,32,0,16,16,this.animationLeft[0].body_px.rotation);
      arm_right.setScreenPos(this.animationLeft[0].rightHand_px.x,this.animationLeft[0].rightHand_px.y,16,16,8,8,this.animationLeft[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationLeft[0].leftHand_px.x,this.animationLeft[0].leftHand_px.y,16,24,8,8,this.animationLeft[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationLeft[0].rightLeg_px.x,this.animationLeft[0].rightLeg_px.y,48,16,8,8,this.animationLeft[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationLeft[0].leftLeg_px.x,this.animationLeft[0].leftLeg_px.y,48,24,8,8,this.animationLeft[0].leftLeg_px .rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'right'){
      option_depth2.alpha = 1.0;
      option_depth1.setScreenPos(this.animationRight[0].option1_px.x,this.animationRight[0].option1_px.y,0,64,32,32,this.animationRight[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationRight[0].option2_px.x,this.animationRight[0].option2_px.y,0,64,32,32,this.animationRight[0].option2_px.rotation);
      head.setScreenPos(this.animationRight[0].head_px.x,this.animationRight[0].head_px.y,32,0,32,32,this.animationRight[0].head_px.rotation);
      body.setScreenPos(this.animationRight[0].body_px.x,this.animationRight[0].body_px.y,32,0,16,16,this.animationRight[0].body_px.rotation);
      arm_right.setScreenPos(this.animationRight[0].rightHand_px.x,this.animationRight[0].rightHand_px.y,16,16,8,8,this.animationRight[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationRight[0].leftHand_px.x,this.animationRight[0].leftHand_px.y,24,16,8,8,this.animationRight[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationRight[0].rightLeg_px.x,this.animationRight[0].rightLeg_px.y,48,16,8,8,this.animationRight[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationRight[0].leftLeg_px.x,this.animationRight[0].leftLeg_px.y,48,24,8,8,this.animationRight[0].leftLeg_px.rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'back'){
      option_depth2.alpha = 0;
      option_depth1.setScreenPos(this.animationBack[0].option1_px.x,this.animationBack[0].option1_px.y,0,128,32,32,this.animationBack[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationBack[0].option2_px.x,this.animationBack[0].option2_px.y,0,96,32,32,this.animationBack[0].option2_px.rotation);
      head.setScreenPos(this.animationBack[0].head_px.x,this.animationBack[0].head_px.y,64,0,32,32,this.animationBack[0].head_px.rotation);
      body.setScreenPos(this.animationBack[0].body_px.x,this.animationBack[0].body_px.y,48,0,16,16,this.animationBack[0].body_px.rotation);
      arm_right.setScreenPos(this.animationBack[0].rightHand_px.x,this.animationBack[0].rightHand_px.y,24,16,8,8,this.animationBack[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationBack[0].leftHand_px.x,this.animationBack[0].leftHand_px.y,24,24,8,8,this.animationBack[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationBack[0].rightLeg_px.x,this.animationBack[0].rightLeg_px.y,56,16,8,8,this.animationBack[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationBack[0].leftLeg_px.x,this.animationBack[0].leftLeg_px.y,56,24,8,8,this.animationBack[0].leftLeg_px.rotation);
    }
  },

  // キャラの向いてる方向に応じてスプライトの重なる順番を入れ替える
  _sortSpriteDepthInit: function(masterSp){    
    var newList = new Array();

    // [手前] 左腕>右足>オプ2>オプ1>左足>胴>頭>右腕 [奥]
    if(this.playerGraphicObj.playerObj.direction == 'front'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "option_depth2"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_left"){
          newList[2] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_right"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'right'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "leg_right"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_left"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth2"){
          newList[3] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'left'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "leg_right"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_left"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth2"){
          newList[3] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'back'){
      for(var i = 0; i < masterSp.children.length; i++){      
        if(masterSp.children[i].name == "arm_left"){
          newList[0] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_right"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_left"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth2"){
          newList[6] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      } 
    }

    masterSp.children = newList;

  },

});

phina.define('PlayerAnimation6', {
  superClass: 'PlayerAnimationParent',

  init: function(playerGraphicObj, c_head, c_body, animationFront, animationLeft, animationRight, animationBack) {
    this.superInit(playerGraphicObj, c_head, c_body, animationFront, animationLeft, animationRight, animationBack);

    this.name = "jump";

  },

  // フレームアニメーション初期設定
  _frameAnimationInit: function(anim1, anim2, option_depth1, option_depth2){
    option_depth1.accessories = [];
    option_depth2.accessories = [];
    
    try{
      anim1.remove();
      anim2.remove();
    } catch(error){
      //pass
    }
    anim1 = FrameAnimation('character_ss').attachTo(option_depth1);
    anim2 = FrameAnimation('character_ss').attachTo(option_depth2);
    
    if(this.playerGraphicObj.playerObj.direction == 'front'){
      anim1.gotoAndPlay('hair_walk_front');
    }
    else if(this.playerGraphicObj.playerObj.direction == 'left'){
      anim1.gotoAndPlay('hair_walk_side_depth1');
      anim2.gotoAndPlay('hair_walk_side_depth2');
    }
    else if(this.playerGraphicObj.playerObj.direction == 'right'){
      anim1.gotoAndPlay('hair_walk_side_depth1');
      anim2.gotoAndPlay('hair_walk_side_depth2');
    }
    else if(this.playerGraphicObj.playerObj.direction == 'back'){
      anim1.gotoAndPlay('hair_walk_back');
    }
    else{
      anim1.gotoAndPlay('hair_walk_front');
    }
    
  },


  // 各パーツの初期位置を設定
  _partsPosInit: function(option_depth1, head, body, option_depth2, arm_right, arm_left, leg_right, leg_left){
    if(this.playerGraphicObj.playerObj.direction == 'front'){
      option_depth2.alpha = 0;
      option_depth1.setScreenPos(this.animationFront[0].option1_px.x,this.animationFront[0].option1_px.y,0,32,32,32,this.animationFront[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationFront[0].option2_px.x,this.animationFront[0].option2_px.y,0,32,32,32,this.animationFront[0].option2_px.rotation);
      head.setScreenPos(this.animationFront[0].head_px.x,this.animationFront[0].head_px.y,0,0,32,32,this.animationFront[0].head_px.rotation);
      body.setScreenPos(this.animationFront[0].body_px.x,this.animationFront[0].body_px.y,0,0,16,16,this.animationFront[0].body_px.rotation);
      arm_right.setScreenPos(this.animationFront[0].rightHand_px.x,this.animationFront[0].rightHand_px.y,0,16,8,8,this.animationFront[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationFront[0].leftHand_px.x,this.animationFront[0].leftHand_px.y,0,24,8,8,this.animationFront[0].leftHand_px.rotation);    
      leg_right.setScreenPos(this.animationFront[0].rightLeg_px.x,this.animationFront[0].rightLeg_px.y,32,16,8,8,this.animationFront[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationFront[0].leftLeg_px.x,this.animationFront[0].leftLeg_px.y,32,24,8,8,this.animationFront[0].leftLeg_px.rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'left'){
      option_depth2.alpha = 1.0;
      option_depth1.setScreenPos(this.animationLeft[0].option1_px.x,this.animationLeft[0].option1_px.y,0,64,32,32,this.animationLeft[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationLeft[0].option2_px.x,this.animationLeft[0].option2_px.y,0,64,32,32,this.animationLeft[0].option2_px.rotation);
      head.setScreenPos(this.animationLeft[0].head_px.x,this.animationLeft[0].head_px.y,32,0,32,32,this.animationLeft[0].head_px.rotation);
      body.setScreenPos(this.animationLeft[0].body_px.x,this.animationLeft[0].body_px.y,32,0,16,16,this.animationLeft[0].body_px.rotation);
      arm_right.setScreenPos(this.animationLeft[0].rightHand_px.x,this.animationLeft[0].rightHand_px.y,16,16,8,8,this.animationLeft[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationLeft[0].leftHand_px.x,this.animationLeft[0].leftHand_px.y,16,24,8,8,this.animationLeft[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationLeft[0].rightLeg_px.x,this.animationLeft[0].rightLeg_px.y,48,16,8,8,this.animationLeft[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationLeft[0].leftLeg_px.x,this.animationLeft[0].leftLeg_px.y,48,24,8,8,this.animationLeft[0].leftLeg_px .rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'right'){
      option_depth2.alpha = 1.0;
      option_depth1.setScreenPos(this.animationRight[0].option1_px.x,this.animationRight[0].option1_px.y,0,64,32,32,this.animationRight[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationRight[0].option2_px.x,this.animationRight[0].option2_px.y,0,64,32,32,this.animationRight[0].option2_px.rotation);
      head.setScreenPos(this.animationRight[0].head_px.x,this.animationRight[0].head_px.y,32,0,32,32,this.animationRight[0].head_px.rotation);
      body.setScreenPos(this.animationRight[0].body_px.x,this.animationRight[0].body_px.y,32,0,16,16,this.animationRight[0].body_px.rotation);
      arm_right.setScreenPos(this.animationRight[0].rightHand_px.x,this.animationRight[0].rightHand_px.y,16,16,8,8,this.animationRight[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationRight[0].leftHand_px.x,this.animationRight[0].leftHand_px.y,24,16,8,8,this.animationRight[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationRight[0].rightLeg_px.x,this.animationRight[0].rightLeg_px.y,48,16,8,8,this.animationRight[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationRight[0].leftLeg_px.x,this.animationRight[0].leftLeg_px.y,48,24,8,8,this.animationRight[0].leftLeg_px.rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'back'){
      option_depth2.alpha = 0;
      option_depth1.setScreenPos(this.animationBack[0].option1_px.x,this.animationBack[0].option1_px.y,0,128,32,32,this.animationBack[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationBack[0].option2_px.x,this.animationBack[0].option2_px.y,0,96,32,32,this.animationBack[0].option2_px.rotation);
      head.setScreenPos(this.animationBack[0].head_px.x,this.animationBack[0].head_px.y,64,0,32,32,this.animationBack[0].head_px.rotation);
      body.setScreenPos(this.animationBack[0].body_px.x,this.animationBack[0].body_px.y,48,0,16,16,this.animationBack[0].body_px.rotation);
      arm_right.setScreenPos(this.animationBack[0].rightHand_px.x,this.animationBack[0].rightHand_px.y,24,16,8,8,this.animationBack[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationBack[0].leftHand_px.x,this.animationBack[0].leftHand_px.y,24,24,8,8,this.animationBack[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationBack[0].rightLeg_px.x,this.animationBack[0].rightLeg_px.y,56,16,8,8,this.animationBack[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationBack[0].leftLeg_px.x,this.animationBack[0].leftLeg_px.y,56,24,8,8,this.animationBack[0].leftLeg_px.rotation);
    }
  },

  // キャラの向いてる方向に応じてスプライトの重なる順番を入れ替える
  _sortSpriteDepthInit: function(masterSp){    
    var newList = new Array();

    // [手前] 左腕>右足>オプ2>オプ1>左足>胴>頭>右腕 [奥]
    if(this.playerGraphicObj.playerObj.direction == 'front'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "option_depth2"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_left"){
          newList[2] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_right"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'right'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "leg_right"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_left"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth2"){
          newList[3] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'left'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "leg_right"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_left"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth2"){
          newList[3] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'back'){
      for(var i = 0; i < masterSp.children.length; i++){      
        if(masterSp.children[i].name == "arm_left"){
          newList[0] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_right"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_left"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth2"){
          newList[6] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      } 
    }

    masterSp.children = newList;

  },

});

phina.define('PlayerAnimation7', {
  superClass: 'PlayerAnimationParent',

  init: function(playerGraphicObj, c_head, c_body, animationFront, animationLeft, animationRight, animationBack) {
    this.superInit(playerGraphicObj, c_head, c_body, animationFront, animationLeft, animationRight, animationBack);

    this.name = "sliding"

  },

  // フレームアニメーション初期設定
  _frameAnimationInit: function(anim1, anim2, option_depth1, option_depth2){

    option_depth1.accessories = [];
    option_depth2.accessories = [];

    try{
      anim1.remove();
      anim2.remove();
    } catch(error){
      //pass
    }
    anim1 = FrameAnimation('character_ss').attachTo(option_depth1);
    anim2 = FrameAnimation('character_ss').attachTo(option_depth2);

    if(this.playerGraphicObj.playerObj.direction == 'front'){
      anim1.gotoAndPlay('hair_run_front');
    }
    else if(this.playerGraphicObj.playerObj.direction == 'left'){
      anim1.gotoAndPlay('hair_run_side_depth1');
      anim2.gotoAndPlay('hair_run_side_depth2');
    }
    else if(this.playerGraphicObj.playerObj.direction == 'right'){
      anim1.gotoAndPlay('hair_run_side_depth1');
      anim2.gotoAndPlay('hair_run_side_depth2');
    }
    else if(this.playerGraphicObj.playerObj.direction == 'back'){
      anim1.gotoAndPlay('hair_run_back');
    }
    else{
      anim1.gotoAndPlay('hair_run_front');
    }
  },

  // 各パーツの初期位置を設定
  _partsPosInit: function(option_depth1, head, body, option_depth2, arm_right, arm_left, leg_right, leg_left){
    if(this.playerGraphicObj.playerObj.direction == 'front'){
      option_depth2.alpha = 0;
      option_depth1.setScreenPos(this.animationFront[0].option1_px.x,this.animationFront[0].option1_px.y,96,32,32,32,this.animationFront[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationFront[0].option2_px.x,this.animationFront[0].option2_px.y,128,32,32,32,this.animationFront[0].option2_px.rotation);
      head.setScreenPos(this.animationFront[0].head_px.x,this.animationFront[0].head_px.y,0,0,32,32,this.animationFront[0].head_px.rotation);
      body.setScreenPos(this.animationFront[0].body_px.x,this.animationFront[0].body_px.y,0,0,16,16,this.animationFront[0].body_px.rotation);
      arm_right.setScreenPos(this.animationFront[0].rightHand_px.x,this.animationFront[0].rightHand_px.y,0,16,8,8,this.animationFront[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationFront[0].leftHand_px.x,this.animationFront[0].leftHand_px.y,0,24,8,8,this.animationFront[0].leftHand_px.rotation);    
      leg_right.setScreenPos(this.animationFront[0].rightLeg_px.x,this.animationFront[0].rightLeg_px.y,32,16,8,8,this.animationFront[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationFront[0].leftLeg_px.x,this.animationFront[0].leftLeg_px.y,32,24,8,8,this.animationFront[0].leftLeg_px.rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'left'){
      option_depth2.alpha = 1.0;
      option_depth1.setScreenPos(this.animationLeft[0].option1_px.x,this.animationLeft[0].option1_px.y,96,64,32,32,this.animationLeft[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationLeft[0].option2_px.x,this.animationLeft[0].option2_px.y,128,64,32,32,this.animationLeft[0].option2_px.rotation);
      head.setScreenPos(this.animationLeft[0].head_px.x,this.animationLeft[0].head_px.y,32,0,32,32,this.animationLeft[0].head_px.rotation);
      body.setScreenPos(this.animationLeft[0].body_px.x,this.animationLeft[0].body_px.y,32,0,16,16,this.animationLeft[0].body_px.rotation);
      arm_right.setScreenPos(this.animationLeft[0].rightHand_px.x,this.animationLeft[0].rightHand_px.y,16,16,8,8,this.animationLeft[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationLeft[0].leftHand_px.x,this.animationLeft[0].leftHand_px.y,16,24,8,8,this.animationLeft[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationLeft[0].rightLeg_px.x,this.animationLeft[0].rightLeg_px.y,48,16,8,8,this.animationLeft[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationLeft[0].leftLeg_px.x,this.animationLeft[0].leftLeg_px.y,48,24,8,8,this.animationLeft[0].leftLeg_px .rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'right'){
      option_depth2.alpha = 1.0;
      option_depth1.setScreenPos(this.animationRight[0].option1_px.x,this.animationRight[0].option1_px.y,96,64,32,32,this.animationRight[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationRight[0].option2_px.x,this.animationRight[0].option2_px.y,128,64,32,32,this.animationRight[0].option2_px.rotation);
      head.setScreenPos(this.animationRight[0].head_px.x,this.animationRight[0].head_px.y,32,0,32,32,this.animationRight[0].head_px.rotation);
      body.setScreenPos(this.animationRight[0].body_px.x,this.animationRight[0].body_px.y,32,0,16,16,this.animationRight[0].body_px.rotation);
      arm_right.setScreenPos(this.animationRight[0].rightHand_px.x,this.animationRight[0].rightHand_px.y,16,16,8,8,this.animationRight[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationRight[0].leftHand_px.x,this.animationRight[0].leftHand_px.y,24,16,8,8,this.animationRight[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationRight[0].rightLeg_px.x,this.animationRight[0].rightLeg_px.y,48,16,8,8,this.animationRight[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationRight[0].leftLeg_px.x,this.animationRight[0].leftLeg_px.y,48,24,8,8,this.animationRight[0].leftLeg_px.rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'back'){
      option_depth2.alpha = 0;
      option_depth1.setScreenPos(this.animationBack[0].option1_px.x,this.animationBack[0].option1_px.y,96,128,32,32,this.animationBack[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationBack[0].option2_px.x,this.animationBack[0].option2_px.y,96,96,32,32,this.animationBack[0].option2_px.rotation);
      head.setScreenPos(this.animationBack[0].head_px.x,this.animationBack[0].head_px.y,64,0,32,32,this.animationBack[0].head_px.rotation);
      body.setScreenPos(this.animationBack[0].body_px.x,this.animationBack[0].body_px.y,48,0,16,16,this.animationBack[0].body_px.rotation);
      arm_right.setScreenPos(this.animationBack[0].rightHand_px.x,this.animationBack[0].rightHand_px.y,24,16,8,8,this.animationBack[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationBack[0].leftHand_px.x,this.animationBack[0].leftHand_px.y,24,24,8,8,this.animationBack[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationBack[0].rightLeg_px.x,this.animationBack[0].rightLeg_px.y,56,16,8,8,this.animationBack[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationBack[0].leftLeg_px.x,this.animationBack[0].leftLeg_px.y,56,24,8,8,this.animationBack[0].leftLeg_px.rotation);
    }
  },

  // キャラの向いてる方向に応じてスプライトの重なる順番を入れ替える
  _sortSpriteDepthInit: function(masterSp){    
    var newList = new Array();

    // [手前] 左腕>右足>オプ2>オプ1>左足>胴>頭>右腕 [奥]
    if(this.playerGraphicObj.playerObj.direction == 'front'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "option_depth2"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_left"){
          newList[2] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_right"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'right'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "option_depth2"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_right"){
          newList[1] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_left"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'left'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "option_depth2"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_right"){
          newList[1] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_left"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'back'){
      for(var i = 0; i < masterSp.children.length; i++){      
        if(masterSp.children[i].name == "leg_right"){
          newList[0] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_left"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth2"){
          newList[6] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      } 
    }

    masterSp.children = newList;

  },

});

phina.define('PlayerAnimation8', {
  superClass: 'PlayerAnimationParent',

  init: function(playerGraphicObj, c_head, c_body, animationFront, animationLeft, animationRight, animationBack) {
    this.superInit(playerGraphicObj, c_head, c_body, animationFront, animationLeft, animationRight, animationBack);

    this.name = "swordAttack1"

  },

  // フレームアニメーション初期設定
  _frameAnimationInit: function(anim1, anim2, option_depth1, option_depth2){

    option_depth1.accessories = [];
    option_depth2.accessories = [];

    try{
      anim1.remove();
      anim2.remove();
    } catch(error){
      //pass
    }
    /*
    anim1 = FrameAnimation('character_ss').attachTo(option_depth1);
    anim2 = FrameAnimation('character_ss').attachTo(option_depth2);

    if(this.playerGraphicObj.playerObj.direction == 'front'){
      anim1.gotoAndPlay('hair_run_front');
    }
    else if(this.playerGraphicObj.playerObj.direction == 'left'){
      anim1.gotoAndPlay('hair_run_side_depth1');
      anim2.gotoAndPlay('hair_run_side_depth2');
    }
    else if(this.playerGraphicObj.playerObj.direction == 'right'){
      anim1.gotoAndPlay('hair_run_side_depth1');
      anim2.gotoAndPlay('hair_run_side_depth2');
    }
    else if(this.playerGraphicObj.playerObj.direction == 'back'){
      anim1.gotoAndPlay('hair_run_back');
    }
    else{
      anim1.gotoAndPlay('hair_run_front');
    }
    */
  },

  // 各パーツの初期位置を設定
  _partsPosInit: function(option_depth1, head, body, option_depth2, arm_right, arm_left, leg_right, leg_left){
    if(this.playerGraphicObj.playerObj.direction == 'front'){
      option_depth2.alpha = 0;
      option_depth1.setScreenPos(this.animationFront[0].option1_px.x,this.animationFront[0].option1_px.y,0,32,32,32,this.animationFront[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationFront[0].option2_px.x,this.animationFront[0].option2_px.y,0,0,32,32,this.animationFront[0].option2_px.rotation);
      head.setScreenPos(this.animationFront[0].head_px.x,this.animationFront[0].head_px.y,0,0,32,32,this.animationFront[0].head_px.rotation);
      body.setScreenPos(this.animationFront[0].body_px.x,this.animationFront[0].body_px.y,0,0,16,16,this.animationFront[0].body_px.rotation);
      arm_right.setScreenPos(this.animationFront[0].rightHand_px.x,this.animationFront[0].rightHand_px.y,0,16,8,8,this.animationFront[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationFront[0].leftHand_px.x,this.animationFront[0].leftHand_px.y,0,24,8,8,this.animationFront[0].leftHand_px.rotation);    
      leg_right.setScreenPos(this.animationFront[0].rightLeg_px.x,this.animationFront[0].rightLeg_px.y,32,16,8,8,this.animationFront[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationFront[0].leftLeg_px.x,this.animationFront[0].leftLeg_px.y,32,24,8,8,this.animationFront[0].leftLeg_px.rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'left'){
      option_depth2.alpha = 1.0;
      option_depth1.setScreenPos(this.animationLeft[0].option1_px.x,this.animationLeft[0].option1_px.y,0,64,32,32,this.animationLeft[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationLeft[0].option2_px.x,this.animationLeft[0].option2_px.y,0,96,32,32,this.animationLeft[0].option2_px.rotation);
      head.setScreenPos(this.animationLeft[0].head_px.x,this.animationLeft[0].head_px.y,32,0,32,32,this.animationLeft[0].head_px.rotation);
      body.setScreenPos(this.animationLeft[0].body_px.x,this.animationLeft[0].body_px.y,32,0,16,16,this.animationLeft[0].body_px.rotation);
      arm_right.setScreenPos(this.animationLeft[0].rightHand_px.x,this.animationLeft[0].rightHand_px.y,16,16,8,8,this.animationLeft[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationLeft[0].leftHand_px.x,this.animationLeft[0].leftHand_px.y,16,24,8,8,this.animationLeft[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationLeft[0].rightLeg_px.x,this.animationLeft[0].rightLeg_px.y,48,16,8,8,this.animationLeft[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationLeft[0].leftLeg_px.x,this.animationLeft[0].leftLeg_px.y,48,24,8,8,this.animationLeft[0].leftLeg_px .rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'right'){
      option_depth2.alpha = 1.0;
      option_depth1.setScreenPos(this.animationRight[0].option1_px.x,this.animationRight[0].option1_px.y,0,64,32,32,this.animationRight[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationRight[0].option2_px.x,this.animationRight[0].option2_px.y,0,96,32,32,this.animationRight[0].option2_px.rotation);
      head.setScreenPos(this.animationRight[0].head_px.x,this.animationRight[0].head_px.y,32,0,32,32,this.animationRight[0].head_px.rotation);
      body.setScreenPos(this.animationRight[0].body_px.x,this.animationRight[0].body_px.y,32,0,16,16,this.animationRight[0].body_px.rotation);
      arm_right.setScreenPos(this.animationRight[0].rightHand_px.x,this.animationRight[0].rightHand_px.y,16,16,8,8,this.animationRight[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationRight[0].leftHand_px.x,this.animationRight[0].leftHand_px.y,24,16,8,8,this.animationRight[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationRight[0].rightLeg_px.x,this.animationRight[0].rightLeg_px.y,48,16,8,8,this.animationRight[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationRight[0].leftLeg_px.x,this.animationRight[0].leftLeg_px.y,48,24,8,8,this.animationRight[0].leftLeg_px.rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'back'){
      option_depth2.alpha = 0;
      option_depth1.setScreenPos(this.animationBack[0].option1_px.x,this.animationBack[0].option1_px.y,0,128,32,32,this.animationBack[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationBack[0].option2_px.x,this.animationBack[0].option2_px.y,0,96,32,32,this.animationBack[0].option2_px.rotation);
      head.setScreenPos(this.animationBack[0].head_px.x,this.animationBack[0].head_px.y,64,0,32,32,this.animationBack[0].head_px.rotation);
      body.setScreenPos(this.animationBack[0].body_px.x,this.animationBack[0].body_px.y,48,0,16,16,this.animationBack[0].body_px.rotation);
      arm_right.setScreenPos(this.animationBack[0].rightHand_px.x,this.animationBack[0].rightHand_px.y,24,16,8,8,this.animationBack[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationBack[0].leftHand_px.x,this.animationBack[0].leftHand_px.y,24,24,8,8,this.animationBack[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationBack[0].rightLeg_px.x,this.animationBack[0].rightLeg_px.y,56,16,8,8,this.animationBack[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationBack[0].leftLeg_px.x,this.animationBack[0].leftLeg_px.y,56,24,8,8,this.animationBack[0].leftLeg_px.rotation);
    }
  },

  // キャラの向いてる方向に応じてスプライトの重なる順番を入れ替える
  _sortSpriteDepthInit: function(masterSp){    
    var newList = new Array();

    // [手前] 左腕>右足>オプ2>オプ1>左足>胴>頭>右腕 [奥]
    if(this.playerGraphicObj.playerObj.direction == 'front'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "option_depth2"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_left"){
          newList[2] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_right"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'right'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "option_depth2"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_right"){
          newList[1] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_left"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'left'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "option_depth2"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_right"){
          newList[1] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_left"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'back'){
      for(var i = 0; i < masterSp.children.length; i++){      
        if(masterSp.children[i].name == "leg_right"){
          newList[0] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_left"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth2"){
          newList[6] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      } 
    }

    masterSp.children = newList;

  },

});

phina.define('PlayerAnimation9', {
  superClass: 'PlayerAnimationParent',

  init: function(playerGraphicObj, c_head, c_body, animationFront, animationLeft, animationRight, animationBack) {
    this.superInit(playerGraphicObj, c_head, c_body, animationFront, animationLeft, animationRight, animationBack);

    this.name = "swordAttack2"

  },

  // フレームアニメーション初期設定
  _frameAnimationInit: function(anim1, anim2, option_depth1, option_depth2){

    option_depth1.accessories = [];
    option_depth2.accessories = [];

    try{
      anim1.remove();
      anim2.remove();
    } catch(error){
      //pass
    }
    /*
    anim1 = FrameAnimation('character_ss').attachTo(option_depth1);
    anim2 = FrameAnimation('character_ss').attachTo(option_depth2);

    if(this.playerGraphicObj.playerObj.direction == 'front'){
      anim1.gotoAndPlay('hair_run_front');
    }
    else if(this.playerGraphicObj.playerObj.direction == 'left'){
      anim1.gotoAndPlay('hair_run_side_depth1');
      anim2.gotoAndPlay('hair_run_side_depth2');
    }
    else if(this.playerGraphicObj.playerObj.direction == 'right'){
      anim1.gotoAndPlay('hair_run_side_depth1');
      anim2.gotoAndPlay('hair_run_side_depth2');
    }
    else if(this.playerGraphicObj.playerObj.direction == 'back'){
      anim1.gotoAndPlay('hair_run_back');
    }
    else{
      anim1.gotoAndPlay('hair_run_front');
    }
    */
  },

  // 各パーツの初期位置を設定
  _partsPosInit: function(option_depth1, head, body, option_depth2, arm_right, arm_left, leg_right, leg_left){
    if(this.playerGraphicObj.playerObj.direction == 'front'){
      option_depth2.alpha = 0;
      option_depth1.setScreenPos(this.animationFront[0].option1_px.x,this.animationFront[0].option1_px.y,96,32,32,32,this.animationFront[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationFront[0].option2_px.x,this.animationFront[0].option2_px.y,128,32,32,32,this.animationFront[0].option2_px.rotation);
      head.setScreenPos(this.animationFront[0].head_px.x,this.animationFront[0].head_px.y,0,0,32,32,this.animationFront[0].head_px.rotation);
      body.setScreenPos(this.animationFront[0].body_px.x,this.animationFront[0].body_px.y,0,0,16,16,this.animationFront[0].body_px.rotation);
      arm_right.setScreenPos(this.animationFront[0].rightHand_px.x,this.animationFront[0].rightHand_px.y,0,16,8,8,this.animationFront[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationFront[0].leftHand_px.x,this.animationFront[0].leftHand_px.y,0,24,8,8,this.animationFront[0].leftHand_px.rotation);    
      leg_right.setScreenPos(this.animationFront[0].rightLeg_px.x,this.animationFront[0].rightLeg_px.y,32,16,8,8,this.animationFront[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationFront[0].leftLeg_px.x,this.animationFront[0].leftLeg_px.y,32,24,8,8,this.animationFront[0].leftLeg_px.rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'left'){
      option_depth2.alpha = 1.0;
      option_depth1.setScreenPos(this.animationLeft[0].option1_px.x,this.animationLeft[0].option1_px.y,0,64,32,32,this.animationLeft[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationLeft[0].option2_px.x,this.animationLeft[0].option2_px.y,0,96,32,32,this.animationLeft[0].option2_px.rotation);
      head.setScreenPos(this.animationLeft[0].head_px.x,this.animationLeft[0].head_px.y,32,0,32,32,this.animationLeft[0].head_px.rotation);
      body.setScreenPos(this.animationLeft[0].body_px.x,this.animationLeft[0].body_px.y,32,0,16,16,this.animationLeft[0].body_px.rotation);
      arm_right.setScreenPos(this.animationLeft[0].rightHand_px.x,this.animationLeft[0].rightHand_px.y,16,16,8,8,this.animationLeft[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationLeft[0].leftHand_px.x,this.animationLeft[0].leftHand_px.y,16,24,8,8,this.animationLeft[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationLeft[0].rightLeg_px.x,this.animationLeft[0].rightLeg_px.y,48,16,8,8,this.animationLeft[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationLeft[0].leftLeg_px.x,this.animationLeft[0].leftLeg_px.y,48,24,8,8,this.animationLeft[0].leftLeg_px .rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'right'){
      option_depth2.alpha = 1.0;
      option_depth1.setScreenPos(this.animationRight[0].option1_px.x,this.animationRight[0].option1_px.y,0,64,32,32,this.animationRight[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationRight[0].option2_px.x,this.animationRight[0].option2_px.y,0,96,32,32,this.animationRight[0].option2_px.rotation);
      head.setScreenPos(this.animationRight[0].head_px.x,this.animationRight[0].head_px.y,32,0,32,32,this.animationRight[0].head_px.rotation);
      body.setScreenPos(this.animationRight[0].body_px.x,this.animationRight[0].body_px.y,32,0,16,16,this.animationRight[0].body_px.rotation);
      arm_right.setScreenPos(this.animationRight[0].rightHand_px.x,this.animationRight[0].rightHand_px.y,16,16,8,8,this.animationRight[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationRight[0].leftHand_px.x,this.animationRight[0].leftHand_px.y,24,16,8,8,this.animationRight[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationRight[0].rightLeg_px.x,this.animationRight[0].rightLeg_px.y,48,16,8,8,this.animationRight[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationRight[0].leftLeg_px.x,this.animationRight[0].leftLeg_px.y,48,24,8,8,this.animationRight[0].leftLeg_px.rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'back'){
      option_depth2.alpha = 0;
      option_depth1.setScreenPos(this.animationBack[0].option1_px.x,this.animationBack[0].option1_px.y,0,128,32,32,this.animationBack[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationBack[0].option2_px.x,this.animationBack[0].option2_px.y,0,96,32,32,this.animationBack[0].option2_px.rotation);
      head.setScreenPos(this.animationBack[0].head_px.x,this.animationBack[0].head_px.y,64,0,32,32,this.animationBack[0].head_px.rotation);
      body.setScreenPos(this.animationBack[0].body_px.x,this.animationBack[0].body_px.y,48,0,16,16,this.animationBack[0].body_px.rotation);
      arm_right.setScreenPos(this.animationBack[0].rightHand_px.x,this.animationBack[0].rightHand_px.y,24,16,8,8,this.animationBack[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationBack[0].leftHand_px.x,this.animationBack[0].leftHand_px.y,24,24,8,8,this.animationBack[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationBack[0].rightLeg_px.x,this.animationBack[0].rightLeg_px.y,56,16,8,8,this.animationBack[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationBack[0].leftLeg_px.x,this.animationBack[0].leftLeg_px.y,56,24,8,8,this.animationBack[0].leftLeg_px.rotation);
    }
  },

  // キャラの向いてる方向に応じてスプライトの重なる順番を入れ替える
  _sortSpriteDepthInit: function(masterSp){    
    var newList = new Array();

    // [手前] 左腕>右足>オプ2>オプ1>左足>胴>頭>右腕 [奥]
    if(this.playerGraphicObj.playerObj.direction == 'front'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "option_depth2"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_left"){
          newList[2] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_right"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'right'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "option_depth2"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_right"){
          newList[1] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_left"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'left'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "option_depth2"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_right"){
          newList[1] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_left"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'back'){
      for(var i = 0; i < masterSp.children.length; i++){      
        if(masterSp.children[i].name == "leg_right"){
          newList[0] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_left"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth2"){
          newList[6] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      } 
    }

    masterSp.children = newList;

  },

});


phina.define('PlayerAnimation10', {
  superClass: 'PlayerAnimationParent',

  init: function(playerGraphicObj, c_head, c_body, animationFront, animationLeft, animationRight, animationBack) {
    this.superInit(playerGraphicObj, c_head, c_body, animationFront, animationLeft, animationRight, animationBack);

    this.name = "swordAttack3"

  },

  // フレームアニメーション初期設定
  _frameAnimationInit: function(anim1, anim2, option_depth1, option_depth2){

    option_depth1.accessories = [];
    option_depth2.accessories = [];

    try{
      anim1.remove();
      anim2.remove();
    } catch(error){
      //pass
    }
    /*
    anim1 = FrameAnimation('character_ss').attachTo(option_depth1);
    anim2 = FrameAnimation('character_ss').attachTo(option_depth2);

    if(this.playerGraphicObj.playerObj.direction == 'front'){
      anim1.gotoAndPlay('hair_run_front');
    }
    else if(this.playerGraphicObj.playerObj.direction == 'left'){
      anim1.gotoAndPlay('hair_run_side_depth1');
      anim2.gotoAndPlay('hair_run_side_depth2');
    }
    else if(this.playerGraphicObj.playerObj.direction == 'right'){
      anim1.gotoAndPlay('hair_run_side_depth1');
      anim2.gotoAndPlay('hair_run_side_depth2');
    }
    else if(this.playerGraphicObj.playerObj.direction == 'back'){
      anim1.gotoAndPlay('hair_run_back');
    }
    else{
      anim1.gotoAndPlay('hair_run_front');
    }
    */
  },

  // 各パーツの初期位置を設定
  _partsPosInit: function(option_depth1, head, body, option_depth2, arm_right, arm_left, leg_right, leg_left){
    if(this.playerGraphicObj.playerObj.direction == 'front'){
      option_depth2.alpha = 0;
      option_depth1.setScreenPos(this.animationFront[0].option1_px.x,this.animationFront[0].option1_px.y,96,32,32,32,this.animationFront[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationFront[0].option2_px.x,this.animationFront[0].option2_px.y,128,32,32,32,this.animationFront[0].option2_px.rotation);
      head.setScreenPos(this.animationFront[0].head_px.x,this.animationFront[0].head_px.y,0,0,32,32,this.animationFront[0].head_px.rotation);
      body.setScreenPos(this.animationFront[0].body_px.x,this.animationFront[0].body_px.y,0,0,16,16,this.animationFront[0].body_px.rotation);
      arm_right.setScreenPos(this.animationFront[0].rightHand_px.x,this.animationFront[0].rightHand_px.y,0,16,8,8,this.animationFront[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationFront[0].leftHand_px.x,this.animationFront[0].leftHand_px.y,0,24,8,8,this.animationFront[0].leftHand_px.rotation);    
      leg_right.setScreenPos(this.animationFront[0].rightLeg_px.x,this.animationFront[0].rightLeg_px.y,32,16,8,8,this.animationFront[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationFront[0].leftLeg_px.x,this.animationFront[0].leftLeg_px.y,32,24,8,8,this.animationFront[0].leftLeg_px.rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'left'){
      option_depth2.alpha = 1.0;
      option_depth1.setScreenPos(this.animationLeft[0].option1_px.x,this.animationLeft[0].option1_px.y,0,64,32,32,this.animationLeft[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationLeft[0].option2_px.x,this.animationLeft[0].option2_px.y,0,96,32,32,this.animationLeft[0].option2_px.rotation);
      head.setScreenPos(this.animationLeft[0].head_px.x,this.animationLeft[0].head_px.y,32,0,32,32,this.animationLeft[0].head_px.rotation);
      body.setScreenPos(this.animationLeft[0].body_px.x,this.animationLeft[0].body_px.y,32,0,16,16,this.animationLeft[0].body_px.rotation);
      arm_right.setScreenPos(this.animationLeft[0].rightHand_px.x,this.animationLeft[0].rightHand_px.y,16,16,8,8,this.animationLeft[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationLeft[0].leftHand_px.x,this.animationLeft[0].leftHand_px.y,16,24,8,8,this.animationLeft[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationLeft[0].rightLeg_px.x,this.animationLeft[0].rightLeg_px.y,48,16,8,8,this.animationLeft[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationLeft[0].leftLeg_px.x,this.animationLeft[0].leftLeg_px.y,48,24,8,8,this.animationLeft[0].leftLeg_px .rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'right'){
      option_depth2.alpha = 1.0;
      option_depth1.setScreenPos(this.animationRight[0].option1_px.x,this.animationRight[0].option1_px.y,0,64,32,32,this.animationRight[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationRight[0].option2_px.x,this.animationRight[0].option2_px.y,0,96,32,32,this.animationRight[0].option2_px.rotation);
      head.setScreenPos(this.animationRight[0].head_px.x,this.animationRight[0].head_px.y,32,0,32,32,this.animationRight[0].head_px.rotation);
      body.setScreenPos(this.animationRight[0].body_px.x,this.animationRight[0].body_px.y,32,0,16,16,this.animationRight[0].body_px.rotation);
      arm_right.setScreenPos(this.animationRight[0].rightHand_px.x,this.animationRight[0].rightHand_px.y,16,16,8,8,this.animationRight[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationRight[0].leftHand_px.x,this.animationRight[0].leftHand_px.y,24,16,8,8,this.animationRight[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationRight[0].rightLeg_px.x,this.animationRight[0].rightLeg_px.y,48,16,8,8,this.animationRight[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationRight[0].leftLeg_px.x,this.animationRight[0].leftLeg_px.y,48,24,8,8,this.animationRight[0].leftLeg_px.rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'back'){
      option_depth2.alpha = 0;
      option_depth1.setScreenPos(this.animationBack[0].option1_px.x,this.animationBack[0].option1_px.y,0,128,32,32,this.animationBack[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationBack[0].option2_px.x,this.animationBack[0].option2_px.y,0,96,32,32,this.animationBack[0].option2_px.rotation);
      head.setScreenPos(this.animationBack[0].head_px.x,this.animationBack[0].head_px.y,64,0,32,32,this.animationBack[0].head_px.rotation);
      body.setScreenPos(this.animationBack[0].body_px.x,this.animationBack[0].body_px.y,48,0,16,16,this.animationBack[0].body_px.rotation);
      arm_right.setScreenPos(this.animationBack[0].rightHand_px.x,this.animationBack[0].rightHand_px.y,24,16,8,8,this.animationBack[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationBack[0].leftHand_px.x,this.animationBack[0].leftHand_px.y,24,24,8,8,this.animationBack[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationBack[0].rightLeg_px.x,this.animationBack[0].rightLeg_px.y,56,16,8,8,this.animationBack[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationBack[0].leftLeg_px.x,this.animationBack[0].leftLeg_px.y,56,24,8,8,this.animationBack[0].leftLeg_px.rotation);
    }
  },

  // キャラの向いてる方向に応じてスプライトの重なる順番を入れ替える
  _sortSpriteDepthInit: function(masterSp){    
    var newList = new Array();

    // [手前] 左腕>右足>オプ2>オプ1>左足>胴>頭>右腕 [奥]
    if(this.playerGraphicObj.playerObj.direction == 'front'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "option_depth2"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_left"){
          newList[2] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_right"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'right'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "option_depth2"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_right"){
          newList[1] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_left"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'left'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "option_depth2"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_right"){
          newList[1] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_left"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'back'){
      for(var i = 0; i < masterSp.children.length; i++){      
        if(masterSp.children[i].name == "leg_right"){
          newList[0] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_left"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth2"){
          newList[6] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      } 
    }

    masterSp.children = newList;

  },

});


phina.define('PlayerAnimation11', {
  superClass: 'PlayerAnimationParent',

  init: function(playerGraphicObj, c_head, c_body, animationFront, animationLeft, animationRight, animationBack) {
    this.superInit(playerGraphicObj, c_head, c_body, animationFront, animationLeft, animationRight, animationBack);

    this.name = "swordAttack4"

  },

  // フレームアニメーション初期設定
  _frameAnimationInit: function(anim1, anim2, option_depth1, option_depth2){

    option_depth1.accessories = [];
    option_depth2.accessories = [];

    try{
      anim1.remove();
      anim2.remove();
    } catch(error){
      //pass
    }
    /*
    anim1 = FrameAnimation('character_ss').attachTo(option_depth1);
    anim2 = FrameAnimation('character_ss').attachTo(option_depth2);

    if(this.playerGraphicObj.playerObj.direction == 'front'){
      anim1.gotoAndPlay('hair_run_front');
    }
    else if(this.playerGraphicObj.playerObj.direction == 'left'){
      anim1.gotoAndPlay('hair_run_side_depth1');
      anim2.gotoAndPlay('hair_run_side_depth2');
    }
    else if(this.playerGraphicObj.playerObj.direction == 'right'){
      anim1.gotoAndPlay('hair_run_side_depth1');
      anim2.gotoAndPlay('hair_run_side_depth2');
    }
    else if(this.playerGraphicObj.playerObj.direction == 'back'){
      anim1.gotoAndPlay('hair_run_back');
    }
    else{
      anim1.gotoAndPlay('hair_run_front');
    }
    */
  },

  // 各パーツの初期位置を設定
  _partsPosInit: function(option_depth1, head, body, option_depth2, arm_right, arm_left, leg_right, leg_left){
    if(this.playerGraphicObj.playerObj.direction == 'front'){
      option_depth2.alpha = 0;
      option_depth1.setScreenPos(this.animationFront[0].option1_px.x,this.animationFront[0].option1_px.y,96,32,32,32,this.animationFront[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationFront[0].option2_px.x,this.animationFront[0].option2_px.y,128,32,32,32,this.animationFront[0].option2_px.rotation);
      head.setScreenPos(this.animationFront[0].head_px.x,this.animationFront[0].head_px.y,0,0,32,32,this.animationFront[0].head_px.rotation);
      body.setScreenPos(this.animationFront[0].body_px.x,this.animationFront[0].body_px.y,0,0,16,16,this.animationFront[0].body_px.rotation);
      arm_right.setScreenPos(this.animationFront[0].rightHand_px.x,this.animationFront[0].rightHand_px.y,0,16,8,8,this.animationFront[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationFront[0].leftHand_px.x,this.animationFront[0].leftHand_px.y,0,24,8,8,this.animationFront[0].leftHand_px.rotation);    
      leg_right.setScreenPos(this.animationFront[0].rightLeg_px.x,this.animationFront[0].rightLeg_px.y,32,16,8,8,this.animationFront[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationFront[0].leftLeg_px.x,this.animationFront[0].leftLeg_px.y,32,24,8,8,this.animationFront[0].leftLeg_px.rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'left'){
      option_depth2.alpha = 1.0;
      option_depth1.setScreenPos(this.animationLeft[0].option1_px.x,this.animationLeft[0].option1_px.y,0,64,32,32,this.animationLeft[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationLeft[0].option2_px.x,this.animationLeft[0].option2_px.y,0,96,32,32,this.animationLeft[0].option2_px.rotation);
      head.setScreenPos(this.animationLeft[0].head_px.x,this.animationLeft[0].head_px.y,32,0,32,32,this.animationLeft[0].head_px.rotation);
      body.setScreenPos(this.animationLeft[0].body_px.x,this.animationLeft[0].body_px.y,32,0,16,16,this.animationLeft[0].body_px.rotation);
      arm_right.setScreenPos(this.animationLeft[0].rightHand_px.x,this.animationLeft[0].rightHand_px.y,16,16,8,8,this.animationLeft[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationLeft[0].leftHand_px.x,this.animationLeft[0].leftHand_px.y,16,24,8,8,this.animationLeft[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationLeft[0].rightLeg_px.x,this.animationLeft[0].rightLeg_px.y,48,16,8,8,this.animationLeft[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationLeft[0].leftLeg_px.x,this.animationLeft[0].leftLeg_px.y,48,24,8,8,this.animationLeft[0].leftLeg_px .rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'right'){
      option_depth2.alpha = 1.0;
      option_depth1.setScreenPos(this.animationRight[0].option1_px.x,this.animationRight[0].option1_px.y,0,64,32,32,this.animationRight[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationRight[0].option2_px.x,this.animationRight[0].option2_px.y,0,96,32,32,this.animationRight[0].option2_px.rotation);
      head.setScreenPos(this.animationRight[0].head_px.x,this.animationRight[0].head_px.y,32,0,32,32,this.animationRight[0].head_px.rotation);
      body.setScreenPos(this.animationRight[0].body_px.x,this.animationRight[0].body_px.y,32,0,16,16,this.animationRight[0].body_px.rotation);
      arm_right.setScreenPos(this.animationRight[0].rightHand_px.x,this.animationRight[0].rightHand_px.y,16,16,8,8,this.animationRight[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationRight[0].leftHand_px.x,this.animationRight[0].leftHand_px.y,24,16,8,8,this.animationRight[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationRight[0].rightLeg_px.x,this.animationRight[0].rightLeg_px.y,48,16,8,8,this.animationRight[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationRight[0].leftLeg_px.x,this.animationRight[0].leftLeg_px.y,48,24,8,8,this.animationRight[0].leftLeg_px.rotation);
    }
    else if(this.playerGraphicObj.playerObj.direction == 'back'){
      option_depth2.alpha = 0;
      option_depth1.setScreenPos(this.animationBack[0].option1_px.x,this.animationBack[0].option1_px.y,0,128,32,32,this.animationBack[0].option1_px.rotation);
      option_depth2.setScreenPos(this.animationBack[0].option2_px.x,this.animationBack[0].option2_px.y,0,96,32,32,this.animationBack[0].option2_px.rotation);
      head.setScreenPos(this.animationBack[0].head_px.x,this.animationBack[0].head_px.y,64,0,32,32,this.animationBack[0].head_px.rotation);
      body.setScreenPos(this.animationBack[0].body_px.x,this.animationBack[0].body_px.y,48,0,16,16,this.animationBack[0].body_px.rotation);
      arm_right.setScreenPos(this.animationBack[0].rightHand_px.x,this.animationBack[0].rightHand_px.y,24,16,8,8,this.animationBack[0].rightHand_px.rotation);
      arm_left.setScreenPos(this.animationBack[0].leftHand_px.x,this.animationBack[0].leftHand_px.y,24,24,8,8,this.animationBack[0].leftHand_px.rotation);
      leg_right.setScreenPos(this.animationBack[0].rightLeg_px.x,this.animationBack[0].rightLeg_px.y,56,16,8,8,this.animationBack[0].rightLeg_px.rotation);
      leg_left.setScreenPos(this.animationBack[0].leftLeg_px.x,this.animationBack[0].leftLeg_px.y,56,24,8,8,this.animationBack[0].leftLeg_px.rotation);
    }
  },

  // キャラの向いてる方向に応じてスプライトの重なる順番を入れ替える
  _sortSpriteDepthInit: function(masterSp){    
    var newList = new Array();

    // [手前] 左腕>右足>オプ2>オプ1>左足>胴>頭>右腕 [奥]
    if(this.playerGraphicObj.playerObj.direction == 'front'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "option_depth2"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_left"){
          newList[2] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_right"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'right'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "option_depth2"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_right"){
          newList[1] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_left"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'left'){
      for(var i = 0; i < masterSp.children.length; i++){
        if(masterSp.children[i].name == "option_depth2"){
          newList[0] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_right"){
          newList[1] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "leg_left"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[6] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      }
    }

    if(this.playerGraphicObj.playerObj.direction == 'back'){
      for(var i = 0; i < masterSp.children.length; i++){      
        if(masterSp.children[i].name == "leg_right"){
          newList[0] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "leg_left"){
          newList[1] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_left"){
          newList[2] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "body"){
          newList[3] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "head"){
          newList[4] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "arm_right"){
          newList[5] = (masterSp.children[i]); 
        }else if(masterSp.children[i].name == "option_depth2"){
          newList[6] = (masterSp.children[i]);
        }else if(masterSp.children[i].name == "option_depth1"){
          newList[7] = (masterSp.children[i]); 
        }else{
          //newList[8] = (masterSp.children[i]); 
        }
      } 
    }

    masterSp.children = newList;

  },

});


phina.define('PlayerSprite', {
  superClass: 'phina.display.Sprite',

  init: function(image, name, x, y, dx, dy, dw, dh) {
    this.superInit(image, dw, dh);
    this.name = name;
    this.x = x;
    this.y = y;
    this.srcRect.x = dx;    
    this.srcRect.y = dy;
    this.width = dw;
    this.height = dh;
    this.originX = 0;
    this.originY = 0;

  },
  
  draw: function(canvas){
    canvas.save();                        //canvasの状態をスタックに保存
    canvas.imageSmoothingEnabled = false; //ここがミソ拡大時の補完を無効に
    this.superMethod('draw', canvas);     //スーパークラスのdrawメソッド呼び出し
    canvas.restore();                     //他に影響が出ないように状態を戻す
  },
  
  setScreenPos: function(x, y, dx, dy, dw, dh, r){
    this.x = x;
    this.y = y;
    this.rotation = r;
    this.srcRect.x = dx;    
    this.srcRect.y = dy;
    this.width = dw;
    this.height = dh;
  },

});

phina.define('PlayerOutlineSprite', {
  superClass: 'PlayerSprite',

  /*
    image:  画像パス
    name:   パーツ識別用の名前
    x:      x座標
    y:      y座標
    dx:     ソース画像全体に対する、描画位置の始点x座標を指定
    dy:     ソース画像全体に対する、描画位置の始点y座標を指定
    dw:     ソース画像全体に対する、描画位置の幅wを指定
    dh:     ソース画像全体に対する、描画位置の高hを指定
  */
  init: function(image, name, x, y, dx, dy, dw, dh) {
    // 輪郭スプライトを作成,自動でAssetに追加してくれる名前は”元+Outline”
    this.borderOutlineTexture(image);

    this.superInit(image + "Outline", name, x, y, dx, dy, dw, dh);
  }, 

  // 縁を黒で囲う処理
  borderOutlineTexture: function(textureName){
    var texture = phina.asset.AssetManager.get("image", textureName);
    var w = texture.domElement.width;
    var h = texture.domElement.height;
    
    // 元画像
    var src = phina.graphics.Canvas().setSize(w, h);
    src.context.drawImage(texture.domElement, 0, 0);

    // 元画像からピクセルデータを取り出す
    var srcData = src.context.getImageData(0, 0, w, h);

    // 輪郭のみの画像
    var dst = phina.graphics.Canvas().setSize(w, h);
    dst.fillStyle = "black";
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var cIndex = ((y + 0) * w + (x + 0)) * 4 + 3;
        var a = srcData.data[cIndex]; // 対象ピクセルのアルファ値
        var lIndex = ((y + 0) * w + (x - 1)) * 4 + 3;
        var rIndex = ((y + 0) * w + (x + 1)) * 4 + 3;
        var tIndex = ((y - 1) * w + (x + 0)) * 4 + 3;
        var bIndex = ((y + 1) * w + (x + 0)) * 4 + 3;
        var l = (0 <= lIndex && lIndex < srcData.data.length) ? srcData.data[lIndex] : 255; // 左隣のピクセルのアルファ値
        var r = (0 <= rIndex && rIndex < srcData.data.length) ? srcData.data[rIndex] : 255; // 右
        var t = (0 <= tIndex && tIndex < srcData.data.length) ? srcData.data[tIndex] : 255; // 上
        var b = (0 <= bIndex && bIndex < srcData.data.length) ? srcData.data[bIndex] : 255; // 下
        // 対象ピクセルが不透明で、上下左右に透明なピクセルがある場合
        if (a > 0 && (l == 0 || r == 0 || t == 0 || b == 0)) {
          dst.fillRect(x-1, y-1, 3, 3); // 1x1の四角を描画
        }
      }
    }
    phina.asset.AssetManager.set("image", textureName + "Outline", dst);
  },

});