phina.define('MainPanel', {
  superClass: 'phina.display.DisplayScene',

  init: function(option) {
    this.superInit(option);
    // 背景色設定
    this.backgroundColor = 'black';

    // マップデータ読み込み
    this.map1 = MapMain(FloorLayerData, WallLayerData, TrapLayerData, OtherLayerData);  // config/Map/FloorLayer の中にあるデータ
    this.map1.addChildTo(this);
    this.map1.setScale(4);


    this.guild = MySprite('guild',900,0,496,256);
    this.guild.addChildTo(this.map1);
    this.guild.setScale(4);
    
    // プレイヤーキャラクター配置 (id, name, 顔画像, 体画像, x, y)
    this.playerManager = PlayerManager('head_chip', 'body_chip');
    this.playerManager.createWizard('player_1','player1','head_chip', 'body_chip', {x:300, y:300});
    this.playerManager.addChildTo(this.map1);
    // プレイヤー1を取得
    this.player1 = this.playerManager.getPlayer('player_1');

    // カメラ (描画するマスター画面、マップ、プレイヤー)
    this.camera1 = CameraMain(this, this.map1, this.player1);

    // 敵を配置 (id, name, 画像, x, y)
    /*
    this.enemyManager = EnemyManager();
    this.enemyManager.createTestEnemy('testEnemy_1','testEnemy_1', 'testEnemy',{x:800, y:1000});
    this.enemyManager.addChildTo(this.map1);
    this.enemy1 = this.enemyManager.getPlayer('testEnemy_1');

    */
    // NPCを配置 (id, name, 顔画像, 体画像, x, y)
    this.npcManager = NPCManager();
    this.npcManager.createNPC('npc_1','npc1','test_head2', 'body_chip',{x:1300, y:900});
    this.npcManager.addChildTo(this.map1);
    
    // 当たり判定処理統括
    this.collisionManager = CollisionManager(this, this.playerManager, this.map1, this.npcManager);
    
    // メッセージイベント登録
    MessageWindowManager.createMessageWindow("npc_1_talk1","NPC1",["この仮面をあなたにあげる","友好の証だから\n大事にしてね"]);
    this.eventMessageWindow = EventMessageWindow();
    this.eventMessageWindow.addChildTo(this);

    this.frameCnt = 0;

    var test = Action3(300,200);
    test.setScale(4);
    test.addChildTo(this.map1);
    test.startAction();


  },

  update: function(app){
    this.frameCnt++;
    this.collisionManager.update();
    this.keyboard_control(app);
    this.camera1.update();
    if(this.frameCnt > 180){
      //this.enemy1.stateContext.transferState("attackAnticState");
      this.frameCnt=0;
    }
  },


  keyboard_control: function(app){
    var key = app.keyboard;
  
    // 移動
    if (key.getKey('right')) {
      this.player1.right_key(app);
    }
    if (key.getKey('left')) {
      this.player1.left_key(app);
    }
    if (key.getKey('up')) {
      this.player1.up_key(app);
    }
    if (key.getKey('down')) {
      this.player1.down_key(app);
    }
    if (key.getKey('down') != true && key.getKey('up') != true && key.getKey('left') != true && key.getKey('right') != true){
      this.player1.free_key(app);
    }
    if (key.getKey('shift')) {
      this.player1.shift_key(app);
    }
    if (key.getKey('shift') != true) {
      this.player1.shift_keyfree(app);
    }
    // z
    if (key.getKey('z')) {
      this.player1.z_key(app);
    }
    // x
    if (key.getKey('x')) {
      this.player1.x_key(app);
    }
    // c
    if (key.getKey('c')) {
      this.player1.c_key(app);
    }


    //////////////////////////////////
    // キーダウンイベント
    //////////////////////////////////
    // 右
    if (key.getKeyDown('right')) {
      this.player1.right_keydown(app);
    }
    // 左  
    if (key.getKeyDown('left')) {
      this.player1.left_keydown(app);
    }
    // 上
    if (key.getKeyDown('up')) {
      this.player1.up_keydown(app);
    }
    // 下
    if (key.getKeyDown('down')) {
      this.player1.down_keydown(app);
    }
    // shift
    if (key.getKeyDown('shift')) {
      this.player1.shift_keydown(app);
    }
    // z
    if (key.getKeyDown('z')) {
      this.player1.z_keydown(app);
    }
    // x
    if (key.getKeyDown('x')) {
      this.player1.x_keydown(app);
    }
    // c
    if (key.getKeyDown('c')) {
      this.player1.c_keydown(app);
    }

    //////////////////////////////////
    // キーアップイベント
    //////////////////////////////////
    // z
    if (key.getKeyUp('z')) {
      this.player1.z_keyup(app);
    }
    // x
    if (key.getKeyUp('x')) {
      this.player1.x_keyup(app);
    }
    // c
    if (key.getKeyUp('c')) {
      this.player1.c_keyup(app);
    }
    // 右
    if (key.getKeyUp('right')) {
      if (key.getKey('left')) {
        this.player1.left_keydown(app);
      }
      if (key.getKey('up')) {
        this.player1.up_keydown(app);
      }
      if (key.getKey('down')) {
        this.player1.down_keydown(app);
      }
    }
    // 左  
    if (key.getKeyUp('left')) {
      if (key.getKey('right')) {
        this.player1.right_keydown(app);
      }
      if (key.getKey('up')) {
        this.player1.up_keydown(app);
      }
      if (key.getKey('down')) {
        this.player1.down_keydown(app);
      }
    }
    // 上
    if (key.getKeyUp('up')) {
      if (key.getKey('right')) {
        this.player1.right_keydown(app);
      }
      if (key.getKey('left')) {
        this.player1.left_keydown(app);
      }
      if (key.getKey('down')) {
        this.player1.down_keydown(app);
      }
    }
    // 下
    if (key.getKeyUp('down')) {
      if (key.getKey('right')) {
        this.player1.right_keydown(app);
      }
      if (key.getKey('left')) {
        this.player1.left_keydown(app);
      }
      if (key.getKey('up')) {
        this.player1.up_keydown(app);
      }
    }
    // shift
    if (key.getKeyUp('shift')) {
      this.player1.shift_keyup(app);
    }

  }
});
