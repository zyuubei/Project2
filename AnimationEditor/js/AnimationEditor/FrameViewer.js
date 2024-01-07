var ASSETS = {
  image: {
    'body_chip': './image/clothes/manoakazu/body_chip.png',
    'body_chip2': './image/clothes/manoakazu2/body_chip.png',
    'head_chip': './image/character/girl_long/character_chip.png',
    'dressUp_background': './image/dressUp/background.png',
    'dressUp_mirror1': './image/dressUp/mirror.png',
    'dressUp_mirror2': './image/dressUp/mirror2.png',
    'dressUp_stage': './image/dressUp/stage.png',
    'null': './image/null.png',
    'FloorMapTip':'./image/block/floor/FloorMapTip.png',
    'WallMapTip':'./image/block/wall/WallMapTip.png',
    'test_head':'./image/character/test/character_chip.png',
    'test_head2':'./image/character/test2/character_chip.png',
    'test_head3':'./image/character/test3/character_chip.png',
    'testEnemy':'./image/enemy/testEnemy/testEnemy.png',
    'NormalAttack1':'./image/action/slash1.png',
    'NormalAttack2':'./image/action/slash2.png',
    'NormalAttack3':'./image/action/fire1.png',
    'guild':'./image/other/guild2.png',
  },
};


// phina.js をグローバル領域に展開
phina.globalize();

// メイン処理
phina.main(function() {
  var app = GameApp({
    query: '#frame_viewer',
    startLabel: 'frame_view_panel',
    width: 210,
    height: 210,
    assets: ASSETS,
    fit: false,
    scenes: [
      {
        className: 'FrameViewPanel',
        label: 'frame_view_panel',
        nextLabel: 'frame_view_panel',
      },
    ]
  });
  // アプリケーション実行
  app.run();  

});


phina.define('FrameViewPanel', {
  superClass: 'phina.display.DisplayScene',

  init: function() {
    this.superInit();
    this.backgroundColor = 'green';

    this.frameList  = new Array();
    this.currentSelectFrame = "";
    this.frameIDCnt = 0;
    this.nowDirection = 0;  //0:正面, 1:横, 2:後ろ
    this.nowState = 0;      //0:立ち, 1:走り, 2:歩き

    this.clipBoard = ClipBoard();
    this.writeFileConfig = WriteConfigFile(this);
    this.readFileConfig = ReadConfigFile(this);
    this.readFileConfigOld = ReadConfigFileOld(this);

    // リストボックスオブジェクト取得
    this.frameListBox = $('#frameListBox');   // リストボックスオブジェクト

    // ボタンオブジェクト取得
    this.readConfigFile     = $('#config_input_button');      // Json読み込みボタンオブジェクト取得
    this.frameAddButton     = $('#frame_add_button');         // フレーム追加ボタンオブジェクト取得
    this.frameDeleteButton  = $('#frame_delete_button');      // フレーム削除ボタンオブジェクト取得
    this.frameCopyButton    = $('#frame_copy_button');        // フレームコピーボタンオブジェクト取得
    this.framePasteButton   = $('#frame_paste_button');       // フレームペーストボタンオブジェクト取得
    this.frameViewFrontButton   = $('#frame_view_front');     // フレームView正面向きボタンオブジェクト取得
    this.frameViewSideButton    = $('#frame_view_side');      // フレームView横向きボタンオブジェクト取得
    this.frameViewBackButton    = $('#frame_view_back');      // フレームView後ろ向きボタンオブジェクト取得
    this.animationUpdateButton  = $('#animation_update');     // アニメーション更新ボタンオブジェクト取得
    this.standButton      = $('#frame_view_stand');       // 立ちボタンオブジェクト取得
    this.runButton        = $('#frame_view_run');         // 走りボタンオブジェクト取得
    this.walkButton       = $('#frame_view_walk');        // 歩きボタンオブジェクト取得

    // inputボックスオブジェクト取得
    this.property1_input = $('#property1');
    this.property2_input_x = $('#property2_x');
    this.property2_input_y = $('#property2_y');
    this.property2_input_r = $('#property2_r');
    this.property3_input_x = $('#property3_x');
    this.property3_input_y = $('#property3_y');
    this.property3_input_r = $('#property3_r');
    this.property4_input_x = $('#property4_x');
    this.property4_input_y = $('#property4_y');
    this.property4_input_r = $('#property4_r');
    this.property5_input_x = $('#property5_x');
    this.property5_input_y = $('#property5_y');
    this.property5_input_r = $('#property5_r');
    this.property6_input_x = $('#property6_x');
    this.property6_input_y = $('#property6_y');
    this.property6_input_r = $('#property6_r');
    this.property7_input_x = $('#property7_x');
    this.property7_input_y = $('#property7_y');
    this.property7_input_r = $('#property7_r');
    this.property8_input_x = $('#property8_x');
    this.property8_input_y = $('#property8_y');
    this.property8_input_r = $('#property8_r');
    this.property9_input_x = $('#property9_x');
    this.property9_input_y = $('#property9_y');
    this.property9_input_r = $('#property9_r');

    this.frameAddButton.on('click', this.FrameAdd.bind(this));         // フレーム追加イベント
    this.frameDeleteButton.on('click', this.FrameDelete.bind(this));   // フレーム追加イベント
    this.frameCopyButton.on('click', this.FrameCopy.bind(this));       // フレームコピーイベント
    this.framePasteButton.on('click', this.FramePaste.bind(this));     // フレームペーストイベント
    this.frameViewFrontButton.on('click', this.LookFront.bind(this));   
    this.frameViewSideButton.on('click', this.LookSide.bind(this));
    this.frameViewBackButton.on('click', this.LookBack.bind(this));
    this.animationUpdateButton.on('click', this.animationUpdate.bind(this));
    this.standButton.on('click', this.stand.bind(this));
    this.runButton.on('click', this.run.bind(this));
    this.walkButton.on('click', this.walk.bind(this));


    // inputボックスイベント追加
    this.property1_input.on('input',  this.property1_input_action.bind(this));
    this.property2_input_x.on('input',  this.property2_input_x_action.bind(this));
    this.property2_input_y.on('input',  this.property2_input_y_action.bind(this));
    this.property2_input_r.on('input',  this.property2_input_r_action.bind(this));
    this.property3_input_x.on('input',  this.property3_input_x_action.bind(this));
    this.property3_input_y.on('input',  this.property3_input_y_action.bind(this));
    this.property3_input_r.on('input',  this.property3_input_r_action.bind(this));
    this.property4_input_x.on('input',  this.property4_input_x_action.bind(this));
    this.property4_input_y.on('input',  this.property4_input_y_action.bind(this));
    this.property4_input_r.on('input',  this.property4_input_r_action.bind(this));
    this.property5_input_x.on('input',  this.property5_input_x_action.bind(this));
    this.property5_input_y.on('input',  this.property5_input_y_action.bind(this));
    this.property5_input_r.on('input',  this.property5_input_r_action.bind(this));
    this.property6_input_x.on('input',  this.property6_input_x_action.bind(this));
    this.property6_input_y.on('input',  this.property6_input_y_action.bind(this));
    this.property6_input_r.on('input',  this.property6_input_r_action.bind(this));
    this.property7_input_x.on('input',  this.property7_input_x_action.bind(this));
    this.property7_input_y.on('input',  this.property7_input_y_action.bind(this));
    this.property7_input_r.on('input',  this.property7_input_r_action.bind(this));
    this.property8_input_x.on('input',  this.property8_input_x_action.bind(this));
    this.property8_input_y.on('input',  this.property8_input_y_action.bind(this));
    this.property8_input_r.on('input',  this.property8_input_r_action.bind(this));
    this.property9_input_x.on('input',  this.property9_input_x_action.bind(this));
    this.property9_input_y.on('input',  this.property9_input_y_action.bind(this));
    this.property9_input_r.on('input',  this.property9_input_r_action.bind(this));

    this.FrameAdd();
    this.animationInit();
  },

  // フレーム
  FrameAdd: function(){
    // フレームボックスが空の場合、もしくは何も選択されていない場合最後尾にフレーム追加
    if(this.frameListBox.children('div').length <= 0 || this.currentSelectFrame == ""){
      this.frameListBox.append('<div id = "frameNum_'+ String(this.frameIDCnt) + '" style="border:1px solid #000000;">フレーム ' + this.frameIDCnt +'</div>');
    }

    // 選択されているフレームの後ろに追加
    else{
      var selectID = "frameNum_" + String(this.currentSelectFrame.frameID);
      $('#'+selectID).after('<div id = "frameNum_'+ String(this.frameIDCnt) + '" style="border:1px solid #000000;">フレーム ' + this.frameIDCnt +'</div>');
    }

    // 新規フレームスプライト作成
    var frame = Frame(this,'head_chip','body_chip', 0, 0, 64, 64, this.frameIDCnt);
    this.frameList.splice(this._getSelectedFrameListNum()+1,0,frame);
    frame.Selected();
    if(this.nowDirection==0){
      frame.LookFront();
    }else if(this.nowDirection==1){
      frame.LookSide();
    }else{
      frame.LookBack();
    }
    this.frameIDCnt += 1;

  },

  FrameDelete: function(){
    if(this.currentSelectFrame != ""){
      var deleteID = this.currentSelectFrame.frameID;
      
      for(let i=0; i<this.frameList.length;i++){
        if(deleteID == this.frameList[i].frameID){
          if(i!=0){
            $('#frameNum_'+String(deleteID)).remove();
            this.frameList.splice(i,1);
            this.frameList[i-1].Selected();
          }
        } 
      }
    }
  },

  FrameCopy: function(){
    if(this.currentSelectFrame!=""){
      this.clipBoard.Copy(this.currentSelectFrame);
    }
  },

  FramePaste: function(){
    if(this.currentSelectFrame!=""){
      this.clipBoard.Paste(this.currentSelectFrame);
    }
  },

  animationInit:function(){
    this.LookFront();
    this.animationUpdate();
    this.LookBack();
    this.animationUpdate();
    this.LookSide();
    this.animationUpdate();
    this.LookFront();
  },

  animationUpdate: function(){
    var targetAnimation = "";
    if(this.nowDirection == 0){
      if(this.nowState == 0){
        targetAnimation = Animation1Front;
      }else if(this.nowState == 1){
        targetAnimation = Animation2Front;
      }else{
        targetAnimation = Animation3Front;
      }
    }else if(this.nowDirection == 1){
      if(this.nowState == 0){
        targetAnimation = Animation1Left;
      }else if(this.nowState == 1){
        targetAnimation = Animation2Left;
      }else{
        targetAnimation = Animation3Left;
      }
    }else{
      if(this.nowState == 0){
        targetAnimation = Animation1Back;
      }else if(this.nowState == 1){
        targetAnimation = Animation2Back;
      }else{
        targetAnimation = Animation3Back;
      }
    }

    if(this.frameList.length > 0){

      if(this.frameList.length < targetAnimation.length){
        var val =  Math.abs(targetAnimation.length - this.frameList.length);

        for(let i=0; i < val; i++){
          targetAnimation.pop();
        }

        for(let i=0; i < this.frameList.length; i++){
          targetAnimation[i].frameCnt = this.frameList[i].frameCnt;
          targetAnimation[i].head_px.x = this.frameList[i].head.x;
          targetAnimation[i].head_px.y = this.frameList[i].head.y;
          targetAnimation[i].head_px.rotation = this.frameList[i].head.rotation;
          targetAnimation[i].body_px.x = this.frameList[i].body.x;
          targetAnimation[i].body_px.y = this.frameList[i].body.y;
          targetAnimation[i].body_px.rotation = this.frameList[i].body.rotation;
          targetAnimation[i].rightHand_px.x = this.frameList[i].arm_right.x;
          targetAnimation[i].rightHand_px.y = this.frameList[i].arm_right.y;
          targetAnimation[i].rightHand_px.rotation = this.frameList[i].arm_right.rotation;
          targetAnimation[i].leftHand_px.x = this.frameList[i].arm_left.x;
          targetAnimation[i].leftHand_px.y = this.frameList[i].arm_left.y;
          targetAnimation[i].leftHand_px.rotation = this.frameList[i].arm_left.rotation;
          targetAnimation[i].rightLeg_px.x = this.frameList[i].leg_right.x;
          targetAnimation[i].rightLeg_px.y = this.frameList[i].leg_right.y;
          targetAnimation[i].rightLeg_px.rotation = this.frameList[i].leg_right.rotation;
          targetAnimation[i].leftLeg_px.x = this.frameList[i].leg_left.x;
          targetAnimation[i].leftLeg_px.y = this.frameList[i].leg_left.y;
          targetAnimation[i].leftLeg_px.rotation = this.frameList[i].leg_left.rotation;
          targetAnimation[i].option1_px.x = this.frameList[i].option_depth1.x;
          targetAnimation[i].option1_px.y = this.frameList[i].option_depth1.y;
          targetAnimation[i].option1_px.rotation = this.frameList[i].option_depth1.rotation;
          targetAnimation[i].option2_px.x = this.frameList[i].option_depth2.x;
          targetAnimation[i].option2_px.y = this.frameList[i].option_depth2.y;
          targetAnimation[i].option2_px.rotation = this.frameList[i].option_depth2.rotation;
        }

      }else if(this.frameList.length > targetAnimation.length){
        for(let i=0; i < this.frameList.length; i++){
          if(i < targetAnimation.length){
            targetAnimation[i].frameCnt = this.frameList[i].frameCnt;
            targetAnimation[i].head_px.x = this.frameList[i].head.x;
            targetAnimation[i].head_px.y = this.frameList[i].head.y;
            targetAnimation[i].head_px.rotation = this.frameList[i].head.rotation;
            targetAnimation[i].body_px.x = this.frameList[i].body.x;
            targetAnimation[i].body_px.y = this.frameList[i].body.y;
            targetAnimation[i].body_px.rotation = this.frameList[i].body.rotation;
            targetAnimation[i].rightHand_px.x = this.frameList[i].arm_right.x;
            targetAnimation[i].rightHand_px.y = this.frameList[i].arm_right.y;
            targetAnimation[i].rightHand_px.rotation = this.frameList[i].arm_right.rotation;
            targetAnimation[i].leftHand_px.x = this.frameList[i].arm_left.x;
            targetAnimation[i].leftHand_px.y = this.frameList[i].arm_left.y;
            targetAnimation[i].leftHand_px.rotation = this.frameList[i].arm_left.rotation;
            targetAnimation[i].rightLeg_px.x = this.frameList[i].leg_right.x;
            targetAnimation[i].rightLeg_px.y = this.frameList[i].leg_right.y;
            targetAnimation[i].rightLeg_px.rotation = this.frameList[i].leg_right.rotation;
            targetAnimation[i].leftLeg_px.x = this.frameList[i].leg_left.x;
            targetAnimation[i].leftLeg_px.y = this.frameList[i].leg_left.y;
            targetAnimation[i].leftLeg_px.rotation = this.frameList[i].leg_left.rotation;
            targetAnimation[i].option1_px.x = this.frameList[i].option_depth1.x;
            targetAnimation[i].option1_px.y = this.frameList[i].option_depth1.y;
            targetAnimation[i].option1_px.rotation = this.frameList[i].option_depth1.rotation;
            targetAnimation[i].option2_px.x = this.frameList[i].option_depth2.x;
            targetAnimation[i].option2_px.y = this.frameList[i].option_depth2.y;
            targetAnimation[i].option2_px.rotation = this.frameList[i].option_depth2.rotation;
          }else{
            var frameCnt = this.frameList[i].frameCnt;
            var head_px = {"x": this.frameList[i].head.x, "y": this.frameList[i].head.y, "rotation": this.frameList[i].head.rotation};
            var body_px = {"x": this.frameList[i].body.x, "y": this.frameList[i].body.y, "rotation": this.frameList[i].body.rotation};
            var rightHand_px = {"x": this.frameList[i].arm_right.x, "y": this.frameList[i].arm_right.y, "rotation": this.frameList[i].arm_right.rotation};
            var leftHand_px = {"x": this.frameList[i].arm_left.x, "y": this.frameList[i].arm_left.y, "rotation": this.frameList[i].arm_left.rotation};
            var rightLeg_px = {"x": this.frameList[i].leg_right.x, "y": this.frameList[i].leg_right.y, "rotation": this.frameList[i].leg_right.rotation};
            var leftLeg_px = {"x": this.frameList[i].leg_left.x, "y": this.frameList[i].leg_left.y, "rotation": this.frameList[i].leg_left.rotation};
            var option1_px = {"x": this.frameList[i].option_depth1.x, "y": this.frameList[i].option_depth1.y, "rotation": this.frameList[i].option_depth1.rotation};
            var option2_px = {"x": this.frameList[i].option_depth2.x, "y": this.frameList[i].option_depth2.y, "rotation": this.frameList[i].option_depth2.rotation};
            var dictData = {"frameCnt":frameCnt,"head_px":head_px,"body_px":body_px,"rightHand_px":rightHand_px,"leftHand_px":leftHand_px,"rightLeg_px":rightLeg_px,"leftLeg_px":leftLeg_px,"option1_px":option1_px,"option2_px":option2_px};
            targetAnimation.push(dictData);
    
          }
        }
      }else{
        for(let i=0; i < this.frameList.length; i++){
          targetAnimation[i].frameCnt = this.frameList[i].frameCnt;
          targetAnimation[i].head_px.x = this.frameList[i].head.x;
          targetAnimation[i].head_px.y = this.frameList[i].head.y;
          targetAnimation[i].head_px.rotation = this.frameList[i].head.rotation;
          targetAnimation[i].body_px.x = this.frameList[i].body.x;
          targetAnimation[i].body_px.y = this.frameList[i].body.y;
          targetAnimation[i].body_px.rotation = this.frameList[i].body.rotation;
          targetAnimation[i].rightHand_px.x = this.frameList[i].arm_right.x;
          targetAnimation[i].rightHand_px.y = this.frameList[i].arm_right.y;
          targetAnimation[i].rightHand_px.rotation = this.frameList[i].arm_right.rotation;
          targetAnimation[i].leftHand_px.x = this.frameList[i].arm_left.x;
          targetAnimation[i].leftHand_px.y = this.frameList[i].arm_left.y;
          targetAnimation[i].leftHand_px.rotation = this.frameList[i].arm_left.rotation;
          targetAnimation[i].rightLeg_px.x = this.frameList[i].leg_right.x;
          targetAnimation[i].rightLeg_px.y = this.frameList[i].leg_right.y;
          targetAnimation[i].rightLeg_px.rotation = this.frameList[i].leg_right.rotation;
          targetAnimation[i].leftLeg_px.x = this.frameList[i].leg_left.x;
          targetAnimation[i].leftLeg_px.y = this.frameList[i].leg_left.y;
          targetAnimation[i].leftLeg_px.rotation = this.frameList[i].leg_left.rotation;
          targetAnimation[i].option1_px.x = this.frameList[i].option_depth1.x;
          targetAnimation[i].option1_px.y = this.frameList[i].option_depth1.y;
          targetAnimation[i].option1_px.rotation = this.frameList[i].option_depth1.rotation;
          targetAnimation[i].option2_px.x = this.frameList[i].option_depth2.x;
          targetAnimation[i].option2_px.y = this.frameList[i].option_depth2.y;
          targetAnimation[i].option2_px.rotation = this.frameList[i].option_depth2.rotation;
        }
      }
    }
  },


  LookFront: function(){
    this.nowDirection=0;
    for(let i=0; i<this.frameList.length;i++){
      this.frameList[i].Selected();
      this.frameList[i].LookFront();
    }
  },

  LookSide: function(){
    this.nowDirection=1;
    for(let i=0; i<this.frameList.length;i++){
      this.frameList[i].Selected();
      this.frameList[i].LookSide();
    }
  },

  LookBack: function(){
    this.nowDirection=2;
    for(let i=0; i<this.frameList.length;i++){
      this.frameList[i].Selected();
      this.frameList[i].LookBack();
    }
  },

  SetPropertyDataFromFrame:function(frameData){
    this.property1_input.val(frameData.frameCnt);
    this.property2_input_x.val(frameData.head.x);
    this.property2_input_y.val(frameData.head.y);
    this.property2_input_r.val(frameData.head.rotation);
    this.property3_input_x.val(frameData.body.x);
    this.property3_input_y.val(frameData.body.y);
    this.property3_input_r.val(frameData.body.rotation);
    this.property4_input_x.val(frameData.arm_right.x);
    this.property4_input_y.val(frameData.arm_right.y);
    this.property4_input_r.val(frameData.arm_right.rotation);
    this.property5_input_x.val(frameData.arm_left.x);
    this.property5_input_y.val(frameData.arm_left.y);
    this.property5_input_r.val(frameData.arm_left.rotation);
    this.property6_input_x.val(frameData.leg_right.x);
    this.property6_input_y.val(frameData.leg_right.y);
    this.property6_input_r.val(frameData.leg_right.rotation);
    this.property7_input_x.val(frameData.leg_left.x);
    this.property7_input_y.val(frameData.leg_left.y);
    this.property7_input_r.val(frameData.leg_left.rotation);
    this.property8_input_x.val(frameData.option_depth1.x);
    this.property8_input_y.val(frameData.option_depth1.y);
    this.property8_input_r.val(frameData.option_depth1.rotation);
    this.property9_input_x.val(frameData.option_depth2.x);
    this.property9_input_y.val(frameData.option_depth2.y);
    this.property9_input_r.val(frameData.option_depth2.rotation);
  },

  property1_input_action: function(){
    this.currentSelectFrame.frameCnt = this.property1_input.val();
  },
  property2_input_x_action: function(){
    this.currentSelectFrame.head.x = this.property2_input_x.val();
  },
  property2_input_y_action: function(){
    this.currentSelectFrame.head.y = this.property2_input_y.val();
  },
  property2_input_r_action: function(){
    this.currentSelectFrame.head.rotation = this.property2_input_r.val();
  },
  property3_input_x_action: function(){
    this.currentSelectFrame.body.x = this.property3_input_x.val();    
  },
  property3_input_y_action: function(){
    this.currentSelectFrame.body.y = this.property3_input_y.val();
  },
  property3_input_r_action: function(){
    this.currentSelectFrame.body.rotation = this.property3_input_r.val();
  },
  property4_input_x_action: function(){
    this.currentSelectFrame.arm_right.x = this.property4_input_x.val();    
  },
  property4_input_y_action: function(){
    this.currentSelectFrame.arm_right.y = this.property4_input_y.val();
  },
  property4_input_r_action: function(){
    this.currentSelectFrame.arm_right.rotation = this.property4_input_r.val();
  },
  property5_input_x_action: function(){
    this.currentSelectFrame.arm_left.x = this.property5_input_x.val();
  },
  property5_input_y_action: function(){
    this.currentSelectFrame.arm_left.y = this.property5_input_y.val();
  },
  property5_input_r_action: function(){
    this.currentSelectFrame.arm_left.rotation = this.property5_input_r.val();
  },
  property6_input_x_action: function(){
    this.currentSelectFrame.leg_right.x = this.property6_input_x.val();
  },
  property6_input_y_action: function(){
    this.currentSelectFrame.leg_right.y = this.property6_input_y.val();
  },
  property6_input_r_action: function(){
    this.currentSelectFrame.leg_right.rotation = this.property6_input_r.val();
  },
  property7_input_x_action: function(){
    this.currentSelectFrame.leg_left.x = this.property7_input_x.val();
  },
  property7_input_y_action: function(){
    this.currentSelectFrame.leg_left.y = this.property7_input_y.val();
  },
  property7_input_r_action: function(){
    this.currentSelectFrame.leg_left.rotation = this.property7_input_r.val();
  },
  property8_input_x_action: function(){
    this.currentSelectFrame.option_depth1.x = this.property8_input_x.val();
  },
  property8_input_y_action: function(){
    this.currentSelectFrame.option_depth1.y = this.property8_input_y.val();
  },
  property8_input_r_action: function(){
    this.currentSelectFrame.option_depth1.rotation = this.property8_input_r.val();
  },
  property9_input_x_action: function(){
    this.currentSelectFrame.option_depth2.x = this.property9_input_x.val();    
  },
  property9_input_y_action: function(){
    this.currentSelectFrame.option_depth2.y = this.property9_input_y.val();  
  },
  property9_input_r_action: function(){
    this.currentSelectFrame.option_depth2.rotation = this.property9_input_r.val();  
  },

  _getSelectedFrameListNum: function(){
    var selectedID = this.currentSelectFrame.frameID;
    var selectedNum = "";
    for(var i = 0; i < this.frameList.length; i++){
      if(selectedID == this.frameList[i].frameID){
        selectedNum = i;
      }
    }
    return selectedNum;
  },

  stand:function(){
    this.nowState = 0;
    if(this.nowDirection==0){
      this.LookFront();
    }else if(this.nowDirection==1){
      this.LookSide();
    }else{
      this.LookBack();
    }
  },

  run:function(){
    this.nowState = 1;
    if(this.nowDirection==0){
      this.LookFront();
    }else if(this.nowDirection==1){
      this.LookSide();
    }else{
      this.LookBack();
    }

  },

  walk:function(){
    this.nowState = 2;
    if(this.nowDirection==0){
      this.LookFront();
    }else if(this.nowDirection==1){
      this.LookSide();
    }else{
      this.LookBack();
    }
  },

});


phina.define('Frame', {
  superClass: 'phina.display.Sprite',

  init: function(viewObj, c_head, c_body, x, y, width, height, frameID) {
    this.superInit('null', width, height);
    
    this.viewObj = viewObj;
    this.frameID        = frameID
    this.frameCnt       = 4;

    this.option_depth2_dx = 0;
    this.option_depth2_dy = 32;
    this.option_depth2_r = 0;
    this.option_depth1_dx = 0;
    this.option_depth1_dy = 32;
    this.option_depth1_r = 0;
    this.body_dx = 0;
    this.body_dy = 0;
    this.body_r = 0;
    this.head_dx = 0;
    this.head_dy = 0;
    this.head_r = 0;
    this.arm_right_dx = 0;
    this.arm_right_dy = 16;
    this.arm_right_r = 0;
    this.arm_left_dx = 0;
    this.arm_left_dy = 24;
    this.arm_left_r = 0;
    this.leg_right_dx = 32;
    this.leg_right_dy = 16;
    this.leg_right_r = 0;
    this.leg_left_dx = 32;
    this.leg_left_dy = 24;
    this.leg_left_r = 0;

    this.option_depth2  = FrameSprite(c_head,"option_depth2",1,1,this.option_depth2_dx,this.option_depth2_dy,32,32,this.option_depth2_r).addChildTo(this);  // オプション(奥)
    this.option_depth1  = FrameSprite(c_head,"option_depth1",1,1,this.option_depth1_dx,this.option_depth1_dy,32,32,this.option_depth1_r).addChildTo(this);  // オプション(手前)
    this.body           = FrameSprite(c_body,"body",1,1,this.body_dx,this.body_dy,16,16,this.body_r).addChildTo(this);            // 体
    this.head           = FrameSprite(c_head,"head",1,1,this.head_dx,this.head_dy,32,32,this.head_r).addChildTo(this);            // 頭
    this.arm_right      = FrameSprite(c_body,"arm_right",1,1,this.arm_right_dx,this.arm_right_dy,8,8,this.arm_right_r).addChildTo(this);        // 右腕
    this.arm_left       = FrameSprite(c_body,"arm_left",1,1,this.arm_left_dx,this.arm_left_dy,8,8,this.arm_left_r).addChildTo(this);         // 左腕
    this.leg_right      = FrameSprite(c_body,"leg_right",1,1,this.leg_right_dx,this.leg_right_dy,8,8,this.leg_right_r).addChildTo(this);       // 右足
    this.leg_left       = FrameSprite(c_body,"leg_left",1,1,this.leg_left_dx,this.leg_left_dy,8,8,this.leg_left_r).addChildTo(this);        // 左足
    
    this.frameHtmlObj   = $('#frameNum_' + String(frameID));
    this.frameHtmlObj.on('click', this.Selected.bind(this));
    
  },

  Selected:function(){
    this.viewObj.currentSelectFrame = this;         // 現在選択フレームをこのフレームに設定
    this.viewObj.SetPropertyDataFromFrame(this);    // プロパティ欄の値をこのフレームの値にする

    // 現在選択フレームを青枠にする
    for (let i = 0; i < this.viewObj.frameList.length ; i++){
        this.viewObj.frameList[i].frameHtmlObj.css('border', "solid 1px black");
    }
    this.frameHtmlObj.css('border', "solid 2px blue");

    // 現在選択フレームをViewに表示する
    this.viewObj.children = new Array();
    this.setScale(5);
    this.addChildTo(this.viewObj);

  },

  LookFront: function(){
    if(this.viewObj.nowState==0){
      this.standFront();
    }else if(this.viewObj.nowState==1){
      this.runFront();
    }else{
      this.walkFront();
    }
    this.option_depth2.setScreenPos_NoPos(this.option_depth2_dx,this.option_depth2_dy,32,32,this.option_depth2_r);
    this.option_depth1.setScreenPos_NoPos(this.option_depth1_dx,this.option_depth1_dy,32,32,this.option_depth1_r);
    this.body.setScreenPos_NoPos(this.body_dx,this.body_dy,16,16,this.body_r);
    this.head.setScreenPos_NoPos(this.head_dx,this.head_dy,32,32,this.head_r);
    this.arm_right.setScreenPos_NoPos(this.arm_right_dx,this.arm_right_dy,8,8,this.arm_right_r);
    this.arm_left.setScreenPos_NoPos(this.arm_left_dx,this.arm_left_dy,8,8,this.arm_left_r);
    this.leg_right.setScreenPos_NoPos(this.leg_right_dx,this.leg_right_dy,8,8,this.leg_right_r);
    this.leg_left.setScreenPos_NoPos(this.leg_left_dx,this.leg_left_dy,8,8,this.leg_left_r);
    
    var newList = new Array();
    if(this.viewObj.nowState==0){
      for(var i = 0; i < this.children.length; i++){
        if(this.children[i].name == "option_depth2"){
          newList[0] = (this.children[i]);
        }else if(this.children[i].name == "option_depth1"){
          newList[1] = (this.children[i]); 
        }else if(this.children[i].name == "leg_left"){
          newList[2] = (this.children[i]);
        }else if(this.children[i].name == "leg_right"){
          newList[3] = (this.children[i]); 
        }else if(this.children[i].name == "body"){
          newList[4] = (this.children[i]); 
        }else if(this.children[i].name == "head"){
          newList[5] = (this.children[i]); 
        }else if(this.children[i].name == "arm_right"){
          newList[6] = (this.children[i]); 
        }else if(this.children[i].name == "arm_left"){
          newList[7] = (this.children[i]); 
        }else{
          //newList[8] = (this.children[i]); 
        }
      }
    }else if(this.viewObj.nowState==1){
      for(var i = 0; i < this.children.length; i++){
        if(this.children[i].name == "option_depth2"){
          newList[0] = (this.children[i]);
        }else if(this.children[i].name == "option_depth1"){
          newList[1] = (this.children[i]); 
        }else if(this.children[i].name == "leg_left"){
          newList[2] = (this.children[i]);
        }else if(this.children[i].name == "leg_right"){
          newList[3] = (this.children[i]); 
        }else if(this.children[i].name == "body"){
          newList[4] = (this.children[i]); 
        }else if(this.children[i].name == "head"){
          newList[5] = (this.children[i]); 
        }else if(this.children[i].name == "arm_right"){
          newList[6] = (this.children[i]); 
        }else if(this.children[i].name == "arm_left"){
          newList[7] = (this.children[i]); 
        }else{
          //newList[8] = (this.children[i]); 
        }
      }
    }else{
      for(var i = 0; i < this.children.length; i++){
        if(this.children[i].name == "option_depth2"){
          newList[0] = (this.children[i]);
        }else if(this.children[i].name == "option_depth1"){
          newList[1] = (this.children[i]); 
        }else if(this.children[i].name == "leg_left"){
          newList[2] = (this.children[i]);
        }else if(this.children[i].name == "leg_right"){
          newList[3] = (this.children[i]); 
        }else if(this.children[i].name == "body"){
          newList[4] = (this.children[i]); 
        }else if(this.children[i].name == "head"){
          newList[5] = (this.children[i]); 
        }else if(this.children[i].name == "arm_right"){
          newList[6] = (this.children[i]); 
        }else if(this.children[i].name == "arm_left"){
          newList[7] = (this.children[i]); 
        }else{
          //newList[8] = (this.children[i]); 
        }
      }
    } 
    this.children = newList;
  },

  LookSide: function(){
    if(this.viewObj.nowState==0){
      this.standSide();
    }else if(this.viewObj.nowState==1){
      this.runSide();
    }else{
      this.walkSide();
    }

    this.option_depth2.setScreenPos_NoPos(this.option_depth2_dx,this.option_depth2_dy,32,32,this.option_depth2_r);
    this.option_depth1.setScreenPos_NoPos(this.option_depth1_dx,this.option_depth1_dy,32,32,this.option_depth1_r);
    this.body.setScreenPos_NoPos(this.body_dx,this.body_dy,16,16,this.body_r);
    this.head.setScreenPos_NoPos(this.head_dx,this.head_dy,32,32,this.head_r);
    this.arm_right.setScreenPos_NoPos(this.arm_right_dx,this.arm_right_dy,8,8,this.arm_right_r);
    this.arm_left.setScreenPos_NoPos(this.arm_left_dx,this.arm_left_dy,8,8,this.arm_left_r);
    this.leg_right.setScreenPos_NoPos(this.leg_right_dx,this.leg_right_dy,8,8,this.leg_right_r);
    this.leg_left.setScreenPos_NoPos(this.leg_left_dx,this.leg_left_dy,8,8,this.leg_left_r);


    var newList = new Array();

    if(this.viewObj.nowState==0){
      for(var i = 0; i < this.children.length; i++){
        if(this.children[i].name == "leg_right"){
          newList[0] = (this.children[i]);
        }else if(this.children[i].name == "leg_left"){
          newList[1] = (this.children[i]); 
        }else if(this.children[i].name == "option_depth2"){
          newList[2] = (this.children[i]);
        }else if(this.children[i].name == "body"){
          newList[3] = (this.children[i]); 
        }else if(this.children[i].name == "head"){
          newList[4] = (this.children[i]); 
        }else if(this.children[i].name == "arm_right"){
          newList[5] = (this.children[i]); 
        }else if(this.children[i].name == "option_depth1"){
          newList[6] = (this.children[i]); 
        }else if(this.children[i].name == "arm_left"){
          newList[7] = (this.children[i]); 
        }else{
          //newList[8] = (this.children[i]); 
        }
      }
    }else if(this.viewObj.nowState==1){
      for(var i = 0; i < this.children.length; i++){
        if(this.children[i].name == "option_depth2"){
          newList[0] = (this.children[i]);
        }else if(this.children[i].name == "leg_right"){
          newList[1] = (this.children[i]); 
        }else if(this.children[i].name == "leg_left"){
          newList[2] = (this.children[i]);
        }else if(this.children[i].name == "arm_right"){
          newList[3] = (this.children[i]); 
        }else if(this.children[i].name == "body"){
          newList[4] = (this.children[i]); 
        }else if(this.children[i].name == "head"){
          newList[5] = (this.children[i]); 
        }else if(this.children[i].name == "option_depth1"){
          newList[6] = (this.children[i]); 
        }else if(this.children[i].name == "arm_left"){
          newList[7] = (this.children[i]); 
        }else{
          //newList[8] = (this.children[i]); 
        }
      }
    }else{
      for(var i = 0; i < this.children.length; i++){
        if(this.children[i].name == "leg_right"){
          newList[0] = (this.children[i]);
        }else if(this.children[i].name == "leg_left"){
          newList[1] = (this.children[i]); 
        }else if(this.children[i].name == "arm_right"){
          newList[2] = (this.children[i]);
        }else if(this.children[i].name == "option_depth2"){
          newList[3] = (this.children[i]); 
        }else if(this.children[i].name == "body"){
          newList[4] = (this.children[i]); 
        }else if(this.children[i].name == "head"){
          newList[5] = (this.children[i]); 
        }else if(this.children[i].name == "option_depth1"){
          newList[6] = (this.children[i]); 
        }else if(this.children[i].name == "arm_left"){
          newList[7] = (this.children[i]); 
        }else{
          //newList[8] = (this.children[i]); 
        }
      }
    } 

    this.children = newList;

  },
  LookBack: function(){
    if(this.viewObj.nowState==0){
      this.standBack();
    }else if(this.viewObj.nowState==1){
      this.runBack();
    }else{
      this.walkBack();
    }
    this.option_depth2.setScreenPos_NoPos(this.option_depth2_dx,this.option_depth2_dy,32,32,this.option_depth2_r);
    this.option_depth1.setScreenPos_NoPos(this.option_depth1_dx,this.option_depth1_dy,32,32,this.option_depth1_r);
    this.body.setScreenPos_NoPos(this.body_dx,this.body_dy,16,16,this.body_r);
    this.head.setScreenPos_NoPos(this.head_dx,this.head_dy,32,32,this.head_r);
    this.arm_right.setScreenPos_NoPos(this.arm_right_dx,this.arm_right_dy,8,8,this.arm_right_r);
    this.arm_left.setScreenPos_NoPos(this.arm_left_dx,this.arm_left_dy,8,8,this.arm_left_r);
    this.leg_right.setScreenPos_NoPos(this.leg_right_dx,this.leg_right_dy,8,8,this.leg_right_r);
    this.leg_left.setScreenPos_NoPos(this.leg_left_dx,this.leg_left_dy,8,8,this.leg_left_r);


    var newList = new Array();
    if(this.viewObj.nowState==0){
      for(var i = 0; i < this.children.length; i++){
        if(this.children[i].name == "arm_right"){
          newList[0] = (this.children[i]);
        }else if(this.children[i].name == "leg_right"){
          newList[1] = (this.children[i]); 
        }else if(this.children[i].name == "body"){
          newList[2] = (this.children[i]);
        }else if(this.children[i].name == "head"){
          newList[3] = (this.children[i]); 
        }else if(this.children[i].name == "leg_left"){
          newList[4] = (this.children[i]); 
        }else if(this.children[i].name == "option_depth2"){
          newList[5] = (this.children[i]); 
        }else if(this.children[i].name == "option_depth1"){
          newList[6] = (this.children[i]); 
        }else if(this.children[i].name == "arm_left"){
          newList[7] = (this.children[i]); 
        }else{
          //newList[8] = (this.children[i]); 
        }
      }
    }else if(this.viewObj.nowState==1){
      for(var i = 0; i < this.children.length; i++){
        if(this.children[i].name == "leg_right"){
          newList[0] = (this.children[i]);
        }else if(this.children[i].name == "leg_left"){
          newList[1] = (this.children[i]); 
        }else if(this.children[i].name == "arm_left"){
          newList[2] = (this.children[i]);
        }else if(this.children[i].name == "body"){
          newList[3] = (this.children[i]); 
        }else if(this.children[i].name == "head"){
          newList[4] = (this.children[i]); 
        }else if(this.children[i].name == "arm_right"){
          newList[5] = (this.children[i]); 
        }else if(this.children[i].name == "option_depth2"){
          newList[6] = (this.children[i]); 
        }else if(this.children[i].name == "option_depth1"){
          newList[7] = (this.children[i]); 
        }else{
          //newList[8] = (this.children[i]); 
        }
      }
    }else{
      for(var i = 0; i < this.children.length; i++){
        if(this.children[i].name == "arm_left"){
          newList[0] = (this.children[i]);
        }else if(this.children[i].name == "leg_right"){
          newList[1] = (this.children[i]); 
        }else if(this.children[i].name == "leg_left"){
          newList[2] = (this.children[i]);
        }else if(this.children[i].name == "body"){
          newList[3] = (this.children[i]); 
        }else if(this.children[i].name == "head"){
          newList[4] = (this.children[i]); 
        }else if(this.children[i].name == "arm_right"){
          newList[5] = (this.children[i]); 
        }else if(this.children[i].name == "option_depth2"){
          newList[6] = (this.children[i]); 
        }else if(this.children[i].name == "option_depth1"){
          newList[7] = (this.children[i]); 
        }else{
          //newList[8] = (this.children[i]); 
        }
      }
    } 

    this.children = newList;
  },

  standFront:function(){
    this.option_depth2.alpha = 0;
    this.option_depth2_dx = 0;
    this.option_depth2_dy = 0;
    this.option_depth1_dx = 0;
    this.option_depth1_dy = 32;
    this.body_dx = 0;
    this.body_dy = 0;
    this.head_dx = 0;
    this.head_dy = 0;
    this.arm_right_dx = 0;
    this.arm_right_dy = 16;
    this.arm_left_dx = 0;
    this.arm_left_dy = 24;
    this.leg_right_dx = 32;
    this.leg_right_dy = 16;
    this.leg_left_dx = 32;
    this.leg_left_dy = 24;
  },

  standSide:function(){
    this.option_depth2.alpha = 1;
    this.option_depth2_dx = 0;
    this.option_depth2_dy = 96;
    this.option_depth1_dx = 0;
    this.option_depth1_dy = 64;
    this.body_dx = 32;
    this.body_dy = 0;
    this.head_dx = 32;
    this.head_dy = 0;
    this.arm_right_dx = 16;
    this.arm_right_dy = 16;
    this.arm_left_dx = 16;
    this.arm_left_dy = 24;
    this.leg_right_dx = 48;
    this.leg_right_dy = 16;
    this.leg_left_dx = 48;
    this.leg_left_dy = 24;
  },

  standBack:function(){
    this.option_depth2.alpha = 0;
    this.option_depth2_dx = 0;
    this.option_depth2_dy = 0;
    this.option_depth1_dx = 0;
    this.option_depth1_dy = 128;
    this.body_dx = 48;
    this.body_dy = 0;
    this.head_dx = 64;
    this.head_dy = 0;
    this.arm_right_dx = 24;
    this.arm_right_dy = 16;
    this.arm_left_dx = 24;
    this.arm_left_dy = 24;
    this.leg_right_dx = 56;
    this.leg_right_dy = 16;
    this.leg_left_dx = 56;
    this.leg_left_dy = 24;
  },

  runFront:function(){
    this.option_depth2.alpha = 0;
    this.option_depth2_dx = 0;
    this.option_depth2_dy = 32;
    this.option_depth1_dx = 96;
    this.option_depth1_dy = 32;
    this.body_dx = 0;
    this.body_dy = 0;
    this.head_dx = 0;
    this.head_dy = 0;
    this.arm_right_dx = 0;
    this.arm_right_dy = 16;
    this.arm_left_dx = 0;
    this.arm_left_dy = 24;
    this.leg_right_dx = 32;
    this.leg_right_dy = 16;
    this.leg_left_dx = 32;
    this.leg_left_dy = 16;
  },

  runSide:function(){
    this.option_depth2.alpha = 1;
    this.option_depth2_dx = 96;
    this.option_depth2_dy = 96;
    this.option_depth1_dx = 96;
    this.option_depth1_dy = 64;
    this.body_dx = 32;
    this.body_dy = 0;
    this.head_dx = 32;
    this.head_dy = 0;
    this.arm_right_dx = 16;
    this.arm_right_dy = 16;
    this.arm_left_dx = 16;
    this.arm_left_dy = 24;
    this.leg_right_dx = 48;
    this.leg_right_dy = 16;
    this.leg_left_dx = 48;
    this.leg_left_dy = 24;
  },

  runBack:function(){
    this.option_depth2.alpha = 0;
    this.option_depth2_dx = 0;
    this.option_depth2_dy = 0;
    this.option_depth1_dx = 96;
    this.option_depth1_dy = 128;
    this.body_dx = 48;
    this.body_dy = 0;
    this.head_dx = 64;
    this.head_dy = 0;
    this.arm_right_dx = 24;
    this.arm_right_dy = 16;
    this.arm_left_dx = 24;
    this.arm_left_dy = 24;
    this.leg_right_dx = 56;
    this.leg_right_dy = 16;
    this.leg_left_dx = 56;
    this.leg_left_dy = 24;
  },

  walkFront:function(){
    this.option_depth2.alpha = 0;
    this.option_depth2_dx = 0;
    this.option_depth2_dy = 0;
    this.option_depth1_dx = 0;
    this.option_depth1_dy = 32;
    this.body_dx = 0;
    this.body_dy = 0;
    this.head_dx = 0;
    this.head_dy = 0;
    this.arm_right_dx = 0;
    this.arm_right_dy = 16;
    this.arm_left_dx = 0;
    this.arm_left_dy = 24;
    this.leg_right_dx = 32;
    this.leg_right_dy = 16;
    this.leg_left_dx = 32;
    this.leg_left_dy = 24;
  },

  walkSide:function(){
    this.option_depth2.alpha = 1;
    this.option_depth2_dx = 0;
    this.option_depth2_dy = 96;
    this.option_depth1_dx = 0;
    this.option_depth1_dy = 64;
    this.body_dx = 32;
    this.body_dy = 0;
    this.head_dx = 32;
    this.head_dy = 0;
    this.arm_right_dx = 16;
    this.arm_right_dy = 16;
    this.arm_left_dx = 16;
    this.arm_left_dy = 24;
    this.leg_right_dx = 48;
    this.leg_right_dy = 16;
    this.leg_left_dx = 48;
    this.leg_left_dy = 24;
  },

  walkBack:function(){
    this.option_depth2.alpha = 0;
    this.option_depth2_dx = 0;
    this.option_depth2_dy = 0;
    this.option_depth1_dx = 0;
    this.option_depth1_dy = 128;
    this.body_dx = 48;
    this.body_dy = 0;
    this.head_dx = 64;
    this.head_dy = 0;
    this.arm_right_dx = 24;
    this.arm_right_dy = 16;
    this.arm_left_dx = 24;
    this.arm_left_dy = 24;
    this.leg_right_dx = 56;
    this.leg_right_dy = 16;
    this.leg_left_dx = 56;
    this.leg_left_dy = 24;
  },

  SetFrameDataFromProperty:function(){
    this.frameCnt         = this.viewObj.property1_input;
    this.head.x           = this.viewObj.property2_input_x;
    this.head.y           = this.viewObj.property2_input_y;
    this.head.rotation           = this.viewObj.property2_input_r;
    this.body.x           = this.viewObj.property3_input_x;
    this.body.y           = this.viewObj.property3_input_y;
    this.body.rotation           = this.viewObj.property3_input_r;
    this.arm_right.x      = this.viewObj.property4_input_x;
    this.arm_right.y      = this.viewObj.property4_input_y;
    this.arm_right.rotation      = this.viewObj.property4_input_r;
    this.arm_left.x       = this.viewObj.property5_input_x;  
    this.arm_left.y       = this.viewObj.property5_input_y;  
    this.arm_left.rotation       = this.viewObj.property5_input_r;  
    this.leg_right.x      = this.viewObj.property6_input_x;    
    this.leg_right.y      = this.viewObj.property6_input_y;    
    this.leg_right.rotation      = this.viewObj.property6_input_r;    
    this.leg_left.x       = this.viewObj.property7_input_x;     
    this.leg_left.y       = this.viewObj.property7_input_y;     
    this.leg_left.rotation       = this.viewObj.property7_input_r;     
    this.option_depth1.x  = this.viewObj.property8_input_x;     
    this.option_depth1.y  = this.viewObj.property8_input_y;     
    this.option_depth1.rotation  = this.viewObj.property8_input_r;     
    this.option_depth2.x  = this.viewObj.property9_input_x;     
    this.option_depth2.y  = this.viewObj.property9_input_y;
    this.option_depth2.rotation  = this.viewObj.property9_input_r;

  },
});


phina.define('ClipBoard', {

  init: function() {
    this.frameCnt       = 4;	                     // 表示するフレーム時間
    this.head           = {"x":1,"y":1,"rotation":0};     // 頭px位置指定
    this.body           = {"x":1,"y":1,"rotation":0};     // 体px位置指定
    this.arm_right      = {"x":1,"y":1,"rotation":0};     // 右手px位置指定
    this.arm_left       = {"x":1,"y":1,"rotation":0};     // 左手px位置指定
    this.leg_right      = {"x":1,"y":1,"rotation":0};     // 右足px位置指定
    this.leg_left       = {"x":1,"y":1,"rotation":0};     // 左足px位置指定
    this.option_depth1  = {"x":1,"y":1,"rotation":0};     // オプション1px位置指定
    this.option_depth2  = {"x":1,"y":1,"rotation":0};     // オプション1px位置指定

  },

  Copy: function(frame) {
    this.head.x           = frame.head.x;     
    this.head.y           = frame.head.y;     
    this.head.rotation           = frame.head.rotation;     
    this.body.x           = frame.body.x;     
    this.body.y           = frame.body.y;     
    this.body.rotation           = frame.body.rotation;     
    this.arm_right.x      = frame.arm_right.x;
    this.arm_right.y      = frame.arm_right.y;
    this.arm_right.rotation      = frame.arm_right.rotation;
    this.arm_left.x       = frame.arm_left.x;  
    this.arm_left.y       = frame.arm_left.y;  
    this.arm_left.rotation       = frame.arm_left.rotation;  
    this.leg_right.x      = frame.leg_right.x;    
    this.leg_right.y      = frame.leg_right.y;    
    this.leg_right.rotation      = frame.leg_right.rotation;    
    this.leg_left.x       = frame.leg_left.x;     
    this.leg_left.y       = frame.leg_left.y;     
    this.leg_left.rotation       = frame.leg_left.rotation;     
    this.option_depth1.x  = frame.option_depth1.x;     
    this.option_depth1.y  = frame.option_depth1.y;     
    this.option_depth1.rotation  = frame.option_depth1.rotation;     
    this.option_depth2.x  = frame.option_depth2.x;     
    this.option_depth2.y  = frame.option_depth2.y;     
    this.option_depth2.rotation  = frame.option_depth2.rotation;     
  },

  Paste: function(frame) {
    frame.head.x           = this.head.x;     
    frame.head.y           = this.head.y;     
    frame.head.rotation           = this.head.rotation;     
    frame.body.x           = this.body.x;     
    frame.body.y           = this.body.y;     
    frame.body.rotation           = this.body.rotation;     
    frame.arm_right.x      = this.arm_right.x;
    frame.arm_right.y      = this.arm_right.y;
    frame.arm_right.rotation      = this.arm_right.rotation;
    frame.arm_left.x       = this.arm_left.x;  
    frame.arm_left.y       = this.arm_left.y;  
    frame.arm_left.rotation       = this.arm_left.rotation;  
    frame.leg_right.x      = this.leg_right.x;    
    frame.leg_right.y      = this.leg_right.y;    
    frame.leg_right.rotation      = this.leg_right.rotation;    
    frame.leg_left.x       = this.leg_left.x;     
    frame.leg_left.y       = this.leg_left.y;     
    frame.leg_left.rotation       = this.leg_left.rotation;     
    frame.option_depth1.x  = this.option_depth1.x;     
    frame.option_depth1.y  = this.option_depth1.y;     
    frame.option_depth1.rotation  = this.option_depth1.rotation;     
    frame.option_depth2.x  = this.option_depth2.x;     
    frame.option_depth2.y  = this.option_depth2.y;     
    frame.option_depth2.rotation  = this.option_depth2.rotation;     
  },



});


phina.define('FrameSprite', {
  superClass: 'phina.display.Sprite',

  init: function(image, name, x, y, dx, dy, dw, dh,r) {
    this.superInit(image, dw, dh);
    this.name = name;
    this.x = x;
    this.y = y;
    this.rotation = r;
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

  setScreenPos_NoPos: function(dx, dy, dw, dh, r){
    this.srcRect.x = dx;    
    this.srcRect.y = dy;
    this.r = r;
    this.rotation = r;
    this.width = dw;
    this.height = dh;
  },

});


phina.define('ReadConfigFile', {

  init: function(viewObj) {
    this.jsonData = "";
    this.viewObj = viewObj;
    this.readConfigFile  = document.getElementById('config_input_button');
    this.readConfigFile.addEventListener('change',  this.Read.bind(this));
    
  },

  Read: function(e) {
    var profile = e.target.files[0];
    var filename = profile.name;
    var type = profile.type;

    var reader = new FileReader();
    reader.readAsText(profile);
    reader.onload = (file) => {
      if (type == "application/json") {
        this.jsonData = JSON.parse(file.target.result);
        var currentSelectFrame = this.viewObj.frameList[this.viewObj.frameList.length - 1];
        currentSelectFrame.Selected();
        for(let i = 0; i < 100; i++){
          this.viewObj.FrameDelete();
        }
        currentSelectFrame = this.viewObj.frameList[this.viewObj.frameList.length - 1];
        currentSelectFrame.Selected();
        currentSelectFrame.frameCnt = Number(this.jsonData[[0]].frameCnt);
        currentSelectFrame.head.x = Number(this.jsonData[[0]].head_px.x);
        currentSelectFrame.head.y = Number(this.jsonData[[0]].head_px.y);
        currentSelectFrame.head.rotation = Number(this.jsonData[[0]].head_px.rotation);
        currentSelectFrame.body.x = Number(this.jsonData[[0]].body_px.x);
        currentSelectFrame.body.y = Number(this.jsonData[[0]].body_px.y);
        currentSelectFrame.body.rotation = Number(this.jsonData[[0]].body_px.rotation);
        currentSelectFrame.arm_right.x = Number(this.jsonData[[0]].rightHand_px.x);
        currentSelectFrame.arm_right.y = Number(this.jsonData[[0]].rightHand_px.y);
        currentSelectFrame.arm_right.rotation = Number(this.jsonData[[0]].rightHand_px.rotation);
        currentSelectFrame.arm_left.x = Number(this.jsonData[[0]].leftHand_px.x);
        currentSelectFrame.arm_left.y = Number(this.jsonData[[0]].leftHand_px.y);
        currentSelectFrame.arm_left.rotation = Number(this.jsonData[[0]].leftHand_px.rotation);
        currentSelectFrame.leg_right.x = Number(this.jsonData[[0]].rightLeg_px.x);
        currentSelectFrame.leg_right.y = Number(this.jsonData[[0]].rightLeg_px.y);
        currentSelectFrame.leg_right.rotation = Number(this.jsonData[[0]].rightLeg_px.rotation);
        currentSelectFrame.leg_left.x = Number(this.jsonData[[0]].leftLeg_px.x);
        currentSelectFrame.leg_left.y = Number(this.jsonData[[0]].leftLeg_px.y);
        currentSelectFrame.leg_left.rotation = Number(this.jsonData[[0]].leftLeg_px.rotation);
        currentSelectFrame.option_depth1.x = Number(this.jsonData[[0]].option1_px.x);
        currentSelectFrame.option_depth1.y = Number(this.jsonData[[0]].option1_px.y);
        currentSelectFrame.option_depth1.rotation = Number(this.jsonData[[0]].option1_px.rotation);
        currentSelectFrame.option_depth2.x = Number(this.jsonData[[0]].option2_px.x);
        currentSelectFrame.option_depth2.y = Number(this.jsonData[[0]].option2_px.y);
        currentSelectFrame.option_depth2.rotation = Number(this.jsonData[[0]].option2_px.rotation);
        this.viewObj.SetPropertyDataFromFrame(currentSelectFrame);

        for(let i = 1; i < this.jsonData.length; i++){
            this.viewObj.FrameAdd();
            currentSelectFrame = this.viewObj.frameList[this.viewObj.frameList.length - 1];
            currentSelectFrame.Selected();
            currentSelectFrame.frameCnt = Number(this.jsonData[[i]].frameCnt); 
            currentSelectFrame.head.x = Number(this.jsonData[[i]].head_px.x);
            currentSelectFrame.head.y = Number(this.jsonData[[i]].head_px.y);
            currentSelectFrame.head.rotation = Number(this.jsonData[[i]].head_px.rotation);
            currentSelectFrame.body.x = Number(this.jsonData[[i]].body_px.x);
            currentSelectFrame.body.y = Number(this.jsonData[[i]].body_px.y);
            currentSelectFrame.body.rotation = Number(this.jsonData[[i]].body_px.rotation);
            currentSelectFrame.arm_right.x = Number(this.jsonData[[i]].rightHand_px.x);
            currentSelectFrame.arm_right.y = Number(this.jsonData[[i]].rightHand_px.y);
            currentSelectFrame.arm_right.rotation = Number(this.jsonData[[i]].rightHand_px.rotation);
            currentSelectFrame.arm_left.x = Number(this.jsonData[[i]].leftHand_px.x);
            currentSelectFrame.arm_left.y = Number(this.jsonData[[i]].leftHand_px.y);
            currentSelectFrame.arm_left.rotation = Number(this.jsonData[[i]].leftHand_px.rotation);
            currentSelectFrame.leg_right.x = Number(this.jsonData[[i]].rightLeg_px.x);
            currentSelectFrame.leg_right.y = Number(this.jsonData[[i]].rightLeg_px.y);
            currentSelectFrame.leg_right.rotation = Number(this.jsonData[[i]].rightLeg_px.rotation);
            currentSelectFrame.leg_left.x = Number(this.jsonData[[i]].leftLeg_px.x);
            currentSelectFrame.leg_left.y = Number(this.jsonData[[i]].leftLeg_px.y);
            currentSelectFrame.leg_left.rotation = Number(this.jsonData[[i]].leftLeg_px.rotation);
            currentSelectFrame.option_depth1.x = Number(this.jsonData[[i]].option1_px.x);
            currentSelectFrame.option_depth1.y = Number(this.jsonData[[i]].option1_px.y);
            currentSelectFrame.option_depth1.rotation = Number(this.jsonData[[i]].option1_px.rotation);
            currentSelectFrame.option_depth2.x = Number(this.jsonData[[i]].option2_px.x);
            currentSelectFrame.option_depth2.y = Number(this.jsonData[[i]].option2_px.y);
            currentSelectFrame.option_depth2.rotation = Number(this.jsonData[[i]].option2_px.rotation);
            this.viewObj.SetPropertyDataFromFrame(currentSelectFrame);
        }
      } 
    };
  }  
});

phina.define('ReadConfigFileOld', {

  init: function(viewObj) {
    this.jsonData = "";
    this.viewObj = viewObj;
    this.readConfigFile  = document.getElementById('config_input_button_old');
    this.readConfigFile.addEventListener('change',  this.Read.bind(this));
    
  },

  Read: function(e) {
    console.log("call");
    var profile = e.target.files[0];
    var filename = profile.name;
    var type = profile.type;

    var reader = new FileReader();
    reader.readAsText(profile);
    reader.onload = (file) => {
      if (type == "application/json") {
        this.jsonData = JSON.parse(file.target.result);
        var currentSelectFrame = this.viewObj.frameList[this.viewObj.frameList.length - 1];
        currentSelectFrame.Selected();
        for(let i = 0; i < 100; i++){
          this.viewObj.FrameDelete();
        }
        currentSelectFrame = this.viewObj.frameList[this.viewObj.frameList.length - 1];
        currentSelectFrame.Selected();
        currentSelectFrame.frameCnt = Number(this.jsonData[[0]].frameCnt);
        currentSelectFrame.head.x = Number(this.jsonData[[0]].head_px.x);
        currentSelectFrame.head.y = Number(this.jsonData[[0]].head_px.y);
        currentSelectFrame.head.rotation = 0;
        currentSelectFrame.body.x = Number(this.jsonData[[0]].body_px.x);
        currentSelectFrame.body.y = Number(this.jsonData[[0]].body_px.y);
        currentSelectFrame.body.rotation = 0;
        currentSelectFrame.arm_right.x = Number(this.jsonData[[0]].rightHand_px.x);
        currentSelectFrame.arm_right.y = Number(this.jsonData[[0]].rightHand_px.y);
        currentSelectFrame.arm_right.rotation = 0;
        currentSelectFrame.arm_left.x = Number(this.jsonData[[0]].leftHand_px.x);
        currentSelectFrame.arm_left.y = Number(this.jsonData[[0]].leftHand_px.y);
        currentSelectFrame.arm_left.rotation = 0;
        currentSelectFrame.leg_right.x = Number(this.jsonData[[0]].rightLeg_px.x);
        currentSelectFrame.leg_right.y = Number(this.jsonData[[0]].rightLeg_px.y);
        currentSelectFrame.leg_right.rotation = 0;
        currentSelectFrame.leg_left.x = Number(this.jsonData[[0]].leftLeg_px.x);
        currentSelectFrame.leg_left.y = Number(this.jsonData[[0]].leftLeg_px.y);
        currentSelectFrame.leg_left.rotation = 0;
        currentSelectFrame.option_depth1.x = Number(this.jsonData[[0]].option1_px.x);
        currentSelectFrame.option_depth1.y = Number(this.jsonData[[0]].option1_px.y);
        currentSelectFrame.option_depth1.rotation = 0;
        currentSelectFrame.option_depth2.x = Number(this.jsonData[[0]].option2_px.x);
        currentSelectFrame.option_depth2.y = Number(this.jsonData[[0]].option2_px.y);
        currentSelectFrame.option_depth2.rotation = 0;
        this.viewObj.SetPropertyDataFromFrame(currentSelectFrame);

        for(let i = 1; i < this.jsonData.length; i++){
            this.viewObj.FrameAdd();
            currentSelectFrame = this.viewObj.frameList[this.viewObj.frameList.length - 1];
            currentSelectFrame.Selected();
            currentSelectFrame.frameCnt = Number(this.jsonData[[i]].frameCnt); 
            currentSelectFrame.head.x = Number(this.jsonData[[i]].head_px.x);
            currentSelectFrame.head.y = Number(this.jsonData[[i]].head_px.y);
            currentSelectFrame.head.rotation = 0;
            currentSelectFrame.body.x = Number(this.jsonData[[i]].body_px.x);
            currentSelectFrame.body.y = Number(this.jsonData[[i]].body_px.y);
            currentSelectFrame.body.rotation = 0;
            currentSelectFrame.arm_right.x = Number(this.jsonData[[i]].rightHand_px.x);
            currentSelectFrame.arm_right.y = Number(this.jsonData[[i]].rightHand_px.y);
            currentSelectFrame.arm_right.rotation =0;
            currentSelectFrame.arm_left.x = Number(this.jsonData[[i]].leftHand_px.x);
            currentSelectFrame.arm_left.y = Number(this.jsonData[[i]].leftHand_px.y);
            currentSelectFrame.arm_left.rotation = 0;
            currentSelectFrame.leg_right.x = Number(this.jsonData[[i]].rightLeg_px.x);
            currentSelectFrame.leg_right.y = Number(this.jsonData[[i]].rightLeg_px.y);
            currentSelectFrame.leg_right.rotation = 0;
            currentSelectFrame.leg_left.x = Number(this.jsonData[[i]].leftLeg_px.x);
            currentSelectFrame.leg_left.y = Number(this.jsonData[[i]].leftLeg_px.y);
            currentSelectFrame.leg_left.rotation = 0;
            currentSelectFrame.option_depth1.x = Number(this.jsonData[[i]].option1_px.x);
            currentSelectFrame.option_depth1.y = Number(this.jsonData[[i]].option1_px.y);
            currentSelectFrame.option_depth1.rotation = 0;
            currentSelectFrame.option_depth2.x = Number(this.jsonData[[i]].option2_px.x);
            currentSelectFrame.option_depth2.y = Number(this.jsonData[[i]].option2_px.y);
            currentSelectFrame.option_depth2.rotation = 0;
            this.viewObj.SetPropertyDataFromFrame(currentSelectFrame);
        }
      } 
    };
  }  
});


phina.define('WriteConfigFile', {

  init: function(viewObj) {
    this.jsonData = "";
    this.ObjectData = [];
    this.viewObj = viewObj;
    this.writeConfigFile  = $('#config_output_button');
    this.writeConfigFile.on('click',  this.Write.bind(this));
  },


  Write:function(e){
    console.log(this.viewObj.frameList.length);
    this.ObjectData = []
    for(let i = 0; i < this.viewObj.frameList.length; i++){
        var frameData = this.viewObj.frameList[i];
        var frameCnt = frameData.frameCnt;
        var head_px = {"x": frameData.head.x, "y": frameData.head.y, "rotation": frameData.head.rotation};
        var body_px = {"x": frameData.body.x, "y": frameData.body.y, "rotation": frameData.body.rotation};
        var rightHand_px = {"x": frameData.arm_right.x, "y": frameData.arm_right.y, "rotation": frameData.arm_right.rotation};
        var leftHand_px = {"x": frameData.arm_left.x, "y": frameData.arm_left.y, "rotation": frameData.arm_left.rotation};
        var rightLeg_px = {"x": frameData.leg_right.x, "y": frameData.leg_right.y, "rotation": frameData.leg_right.rotation};
        var leftLeg_px = {"x": frameData.leg_left.x, "y": frameData.leg_left.y, "rotation": frameData.leg_left.rotation};
        var option1_px = {"x": frameData.option_depth1.x, "y": frameData.option_depth1.y, "rotation": frameData.option_depth1.rotation};
        var option2_px = {"x": frameData.option_depth2.x, "y": frameData.option_depth2.y, "rotation": frameData.option_depth2.rotation};
        var data = {"frameCnt":frameCnt,"head_px":head_px,"body_px":body_px,"rightHand_px":rightHand_px,"leftHand_px":leftHand_px,"rightLeg_px":rightLeg_px,"leftLeg_px":leftLeg_px,"option1_px":option1_px,"option2_px":option2_px};
        this.ObjectData.push(data);
    }
    this.json_data = JSON.stringify(this.ObjectData);
    const blob = new Blob([String(this.json_data)], { type: 'text/plain' });
    const aTag = document.createElement('a');
    aTag.href = URL.createObjectURL(blob);
    aTag.target = '_blank';
    aTag.download = 'AnimationConfigData.json';
    aTag.click();
    URL.revokeObjectURL(aTag.href);
  }
});
