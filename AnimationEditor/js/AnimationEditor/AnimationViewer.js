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

  // スプライトシート
  spritesheet: {
    "playerAction1_ss":
    {
      // フレーム情報
      "frame": {
        "width": 32, // 1フレームの画像サイズ（横）
        "height": 32, // 1フレームの画像サイズ（縦）
        "cols": 8, // フレーム数（横）
        "rows": 1, // フレーム数（縦）
      },
      // アニメーション情報
      "animations" : {
        "start": { // アニメーション名
          "frames": [0], // フレーム番号範囲
          "next": "active", // 次のアニメーション
          "frequency": 5, // アニメーション間隔
        },
        "active": { // アニメーション名
          "frames": [1,2,3,4,5,6], // フレーム番号範囲
          "next": "end", // 次のアニメーション
          "frequency": 5, // アニメーション間隔
        },
        "end": { // アニメーション名
          "frames": [7], // フレーム番号範囲
          "next": "end", // 次のアニメーション
          "frequency": 5, // アニメーション間隔
        },
      }
    },

    "playerAction2_ss":
    {
      // フレーム情報
      "frame": {
        "width": 32, // 1フレームの画像サイズ（横）
        "height": 32, // 1フレームの画像サイズ（縦）
        "cols": 8, // フレーム数（横）
        "rows": 1, // フレーム数（縦）
      },
      // アニメーション情報
      "animations" : {
        "start": { // アニメーション名
          "frames": [0], // フレーム番号範囲
          "next": "active", // 次のアニメーション
          "frequency": 5, // アニメーション間隔
        },
        "active": { // アニメーション名
          "frames": [1,2,3,4,5], // フレーム番号範囲
          "next": "end", // 次のアニメーション
          "frequency": 5, // アニメーション間隔
        },
        "end": { // アニメーション名
          "frames": [6], // フレーム番号範囲
          "next": "end", // 次のアニメーション
          "frequency": 5, // アニメーション間隔
        },
      }
    },


    "playerAction3_ss":
    {
      // フレーム情報
      "frame": {
        "width": 40, // 1フレームの画像サイズ（横）
        "height": 40, // 1フレームの画像サイズ（縦）
        "cols": 7, // フレーム数（横）
        "rows": 3, // フレーム数（縦）
      },
      // アニメーション情報
      "animations" : {
        "start": { // アニメーション名
          "frames": [7,8,9], // フレーム番号範囲
          "next": "active", // 次のアニメーション
          "frequency": 5, // アニメーション間隔
        },
        "active": { // アニメーション名
          "frames": [10,11,10,9], // フレーム番号範囲
          "next": "active", // 次のアニメーション
          "frequency": 5, // アニメーション間隔
        },
        "end": { // アニメーション名
          "frames": [11,12,13], // フレーム番号範囲
          "next": "end", // 次のアニメーション
          "frequency": 5, // アニメーション間隔
        },
      }
    },
    "testEnemy_stand_right_ss":
    {
      // フレーム情報
      "frame": {
        "width": 70, // 1フレームの画像サイズ（横）
        "height": 62, // 1フレームの画像サイズ（縦）
        "cols": 5, // フレーム数（横）
        "rows": 4, // フレーム数（縦）
      },
      // アニメーション情報
      "animations" : {
        "stand_right": { // アニメーション名
          "frames": [10,11,12], // フレーム番号範囲
          "next": "stand_right_end", // 次のアニメーション
          "frequency": 12, // アニメーション間隔
        },
        "stand_right_end": { // アニメーション名
          "frames": [11], // フレーム番号範囲
          "next": "stand_right", // 次のアニメーション
          "frequency": 12, // アニメーション間隔
        },
        "attackAntic_right": { // アニメーション名
          "frames": [13], // フレーム番号範囲
          "next": "attackAntic_right", // 次のアニメーション
          "frequency": 12, // アニメーション間隔
        },
        "attack_right": { // アニメーション名
          "frames": [14], // フレーム番号範囲
          "next": "attack_right", // 次のアニメーション
          "frequency": 12, // アニメーション間隔
        },
      }
    },

    "character_ss":
    {
      // フレーム情報
      "frame": {
        "width": 32, // 1フレームの画像サイズ（横）
        "height": 32, // 1フレームの画像サイズ（縦）
        "cols": 5, // フレーム数（横）
        "rows": 5, // フレーム数（縦）
      },
      // アニメーション情報
      "animations" : {
        "hair_stand_front": { // アニメーション名
          "frames": [5,6,7], // フレーム番号範囲
          "next": "hair_stand_front", // 次のアニメーション
          "frequency": 8, // アニメーション間隔
        },
        "hair_stand_side_depth1": { // アニメーション名
          "frames": [10,11,12], // フレーム番号範囲
          "next": "hair_stand_side_depth1", // 次のアニメーション
          "frequency": 8, // アニメーション間隔
        },
        "hair_stand_side_depth2": { // アニメーション名
          "frames": [15,16,17], // フレーム番号範囲
          "next": "hair_stand_side_depth2", // 次のアニメーション
          "frequency": 8, // アニメーション間隔
        },
        "hair_stand_back": { // アニメーション名
          "frames": [20,21,22], // フレーム番号範囲
          "next": "hair_stand_back", // 次のアニメーション
          "frequency": 8, // アニメーション間隔
        },
        "hair_walk_front": { // アニメーション名
          "frames": [5,6], // フレーム番号範囲
          "next": "hair_walk_front", // 次のアニメーション
          "frequency": 5, // アニメーション間隔
        },
        "hair_walk_side_depth1": { // アニメーション名
          "frames": [10,11], // フレーム番号範囲
          "next": "hair_walk_side_depth1", // 次のアニメーション
          "frequency": 5, // アニメーション間隔
        },
        "hair_walk_side_depth2": { // アニメーション名
          "frames": [15,16], // フレーム番号範囲
          "next": "hair_walk_side_depth2", // 次のアニメーション
          "frequency": 5, // アニメーション間隔
        },
        "hair_walk_back": { // アニメーション名
          "frames": [20,21], // フレーム番号範囲
          "next": "hair_walk_back", // 次のアニメーション
          "frequency": 5, // アニメーション間隔
        },
        "hair_run_front": { // アニメーション名
          "frames": [8,9], // フレーム番号範囲
          "next": "hair_run_front", // 次のアニメーション
          "frequency": 5, // アニメーション間隔
        },
        "hair_run_side_depth1": { // アニメーション名
          "frames": [13,14], // フレーム番号範囲
          "next": "hair_run_side_depth1", // 次のアニメーション
          "frequency": 5, // アニメーション間隔
        },
        "hair_run_side_depth2": { // アニメーション名
          "frames": [18,19], // フレーム番号範囲
          "next": "hair_run_side_depth2", // 次のアニメーション
          "frequency": 5, // アニメーション間隔
        },
        "hair_run_back": { // アニメーション名
          "frames": [23,24], // フレーム番号範囲
          "next": "hair_run_back", // 次のアニメーション
          "frequency": 5, // アニメーション間隔
        },
      }
    },
  }


};

// メイン処理
phina.main(function() {
  var app = GameApp({
    query: '#animation_viewer',
    startLabel: 'animation_view_panel',
    width: 210,
    height: 210,
    assets: ASSETS,
    fit: false,
    scenes: [
      {
        className: 'AnimationViewPanel',
        label: 'animation_view_panel',
        nextLabel: 'animation_view_panel',
      },
    ]
  });
  // アプリケーション実行
  app.run();  

});


phina.define('AnimationViewPanel', {
  superClass: 'phina.display.DisplayScene',

  init: function() {
    this.superInit();
    this.backgroundColor = 'green';

    // プレイヤーキャラクター配置 (id, name, 顔画像, 体画像, x, y)
    this.playerManager = PlayerManager('head_chip', 'body_chip');
    this.playerManager.createWizard('player_1','player1','head_chip', 'body_chip', {x:0, y:0});
    this.playerManager.addChildTo(this);

    this.frameViewFrontButton = document.getElementById('frame_view_front');
    this.frameViewLeftButton = document.getElementById('frame_view_side');
    this.frameViewBackButton = document.getElementById('frame_view_back');

    this.frameViewFrontButton.addEventListener('click',  this.LookFront.bind(this));
    this.frameViewLeftButton.addEventListener('click',  this.LookSide.bind(this));
    this.frameViewBackButton.addEventListener('click',  this.LookBack.bind(this));

    this.standButton      = $('#frame_view_stand');       // 立ちボタンオブジェクト取得
    this.runButton        = $('#frame_view_run');         // 走りボタンオブジェクト取得
    this.walkButton       = $('#frame_view_walk');        // 歩きボタンオブジェクト取得

    this.player1 = this.playerManager.getPlayer('player_1');
    this.player1.hitBoxContainer.UnVisible();

    this.animationUpdateButton  = $('#animation_update');     // アニメーション更新ボタンオブジェクト取得
    this.animationUpdateButton.on('click', this.animationUpdate.bind(this));
    this.standButton.on('click', this.stand.bind(this));
    this.runButton.on('click', this.run.bind(this));
    this.walkButton.on('click', this.walk.bind(this));

    this.animationUpdate();

  },

  LookFront: function(){
    this.player1.LookFront();
  },
  LookSide: function(){
    this.player1.LookLeft();
  },
  LookBack: function(){
    this.player1.LookBack();
  },

  stand: function(){
    this.player1.stateContext.transferState("stand");
  },
  run: function(){
    this.player1.stateContext.transferState("run");
  },

  walk: function(){
    this.player1.stateContext.transferState("walk");
  },

  animationUpdate: function(){
    this.player1.animContext.graphicInit();
  },
});

