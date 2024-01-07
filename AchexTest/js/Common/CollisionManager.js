///////////////////////////////////////////////////////////////////////////////////////////////
// 当たり判定の衝突を管理するクラス
///////////////////////////////////////////////////////////////////////////////////////////////
phina.define('CollisionManager', {
  superClass: 'phina.display.Sprite',

  init: function(panel, playerManager, map, npcManager) {
    this.superInit('null',42, 42);
    this.panel = panel;
    this.playerManager = playerManager;
    this.map = map;
    this.npcManager = npcManager;
  },

  update: function(){
    this.player_wall_collisionCheck();
    this.player_npc_collisionCheck();
  },

  // プレイヤーと壁の当たり判定
  player_wall_collisionCheck(){

    // マップのブロック分ループ
    for(i = 0; i < this.map.wallLayer.blockList.length; i++){

      // プレイヤーの分ループ
      for(const p_k in this.playerManager.playerDict){
        var wall = this.map.wallLayer.blockList[i];       // 壁
        var player = this.playerManager.playerDict[p_k];  // プレイヤー
        var coll_data = this._hitBoxCollisionCheck(player, wall);
        if(coll_data["hit_flag"]){
          this._act1CollisionBack(coll_data, player,wall);
        }

      }
    }
  },

  // プレイヤーアクションとNPCの当たり判定    
  player_npc_collisionCheck(){

    for(const n_k in this.npcManager.npcDict){
      for(const p_k in this.playerManager.playerDict){
        var player = this.playerManager.playerDict[p_k];
        var npc = this.npcManager.npcDict[n_k];
        var coll_data = this._hitBoxCollisionCheck(player, npc);
        if(coll_data["hit_flag"]){
          this._act1CollisionBack(coll_data, player,npc);
        }
      }
    }

  },


  //////////////////////////////////////////////////////////////////////////
  // 当たり判定衝突判定処理
  // 
  // 処理の方針：
  // Act2に対してAct1が右上、右下、左上、左下のどこにいるかを判定
  // さらにAct2とAct1が重なっている場合、重なっている部分の短径の形で
  // 右から衝突 or 左から衝突 or 上から衝突 or 下から衝突を判定する
  // 判定結果をreturnする
  //////////////////////////////////////////////////////////////////////////
  _hitBoxCollisionCheck: function(act1, act2){
    var act1_hitBox = act1.hitBoxContainer.hitBoxList[0];
    var act2_hitBox = act2.hitBoxContainer.hitBoxList[0];

    // HibBoxのどちらもActiveの場合判定
    if(act1_hitBox.active == 1 && act2_hitBox.active == 1){
      
        // act1の当たり判定スプライトの左右上下の位置を取得           
        var act1_left   = act1_hitBox.abs_left;
        var act1_right  = act1_hitBox.abs_right;
        var act1_top    = act1_hitBox.abs_top;
        var act1_bottom = act1_hitBox.abs_bottom;

        // act2の当たり判定スプライトの左右上下の位置を取得       
        var act2_left   = act2_hitBox.abs_left;
        var act2_right  = act2_hitBox.abs_right;
        var act2_top    = act2_hitBox.abs_top;
        var act2_bottom = act2_hitBox.abs_bottom;

        // 中心座標を求める
        var act1_center_x = (act1_left + act1_right) / 2;    // act1の当たり判定スプライトの中心x座標
        var act1_center_y = (act1_top + act1_bottom) / 2;    // act1の当たり判定スプライトの中心y座標
        var act2_center_x = (act2_left + act2_right) / 2;    // act2の当たり判定スプライトの中心x座標
        var act2_center_y = (act2_top + act2_bottom) / 2;    // act2の当たり判定スプライトの中心y座標
        
        //当たり判定が重なっているか True False
        var hit_flag = (act1_left < act2_right) && (act1_right > act2_left) && (act1_top < act2_bottom) && (act1_bottom > act2_top);

        var left_right_judge = "None";        // 当たったスプライトが左右どちらにあるか判定 左:left, 右:right, どちらでもない:None
        var top_bottom_judge = "None";        // 当たったスプライトが上下どちらにあるか判定 上:top, 下:bottom, どちらでもない:None
        var collision_direction = "None";   // 当たったスプライトが上下左右どちらからぶつかってきたか判定, left,right,top,bottom
        
        // 衝突していたら
        if (hit_flag){
            // actor1とactor2の重なりが左右のどちらかを識別
            if(act1_center_x > act2_center_x){
              left_right_judge = "right";
            }else{
              left_right_judge = "left";
            }
            // actor1とactor2の重なりが上下のどちらかを識別
            if(act1_center_y < act2_center_y){ 
              top_bottom_judge = "top"
            }else{
              top_bottom_judge = "bottom";  
            }
            // actor2が右下にいる場合
            if(left_right_judge == "right" && top_bottom_judge == "bottom"){
                // 重なっている範囲の短形が縦長の場合は”右から衝突”
                if(Math.abs(act2_right - act1_left) < Math.abs(act2_bottom - act1_top)){
                    collision_direction = "right";
                }
                // 重なっている範囲の短形が横長の場合は”下から衝突”
                else if(Math.abs(act2_right - act1_left) > Math.abs(act2_bottom - act1_top)){
                    collision_direction = "bottom";
                }
                else{
                    collision_direction = "right_and_bottom";                
                }
            }
            // actor2が右上にいる場合
            else if(left_right_judge == "right" && top_bottom_judge == "top"){
                // 重なっている範囲の短形が縦長の場合は”右から衝突”
                if(Math.abs(act2_right - act1_left) < Math.abs(act2_top - act1_bottom)){
                    collision_direction = "right";
                }
                else if(Math.abs(act2_right - act1_left) > Math.abs(act2_top - act1_bottom)){
                    collision_direction = "top";
                }
                // 重なっている範囲の短形が横長の場合は”上から衝突”
                else{
                    collision_direction = "right_and_top";
                }
            }
            // actor2が左下にいる場合
            else if(left_right_judge == "left" && top_bottom_judge == "bottom"){
                // 重なっている範囲の短形が縦長の場合は”左から衝突”
                if(Math.abs(act2_left - act1_right) < Math.abs(act2_bottom - act1_top)){
                    collision_direction = "left";
                }
                // 重なっている範囲の短形が横長の場合は”下から衝突”
                else if(Math.abs(act2_left - act1_right) > Math.abs(act2_bottom - act1_top)){
                    collision_direction = "bottom";
                }
                else{
                    collision_direction = "left_and_bottom";
                }
            }
            else if(left_right_judge == "left" && top_bottom_judge == "top"){
                // 重なっている範囲の短形が縦長の場合は”左から衝突”
                if(Math.abs(act2_left - act1_right) < Math.abs(act2_top - act1_bottom)){
                    collision_direction = "left";
                }
                // 重なっている範囲の短形が横長の場合は”上から衝突”
                else if(Math.abs(act2_left - act1_right) > Math.abs(act2_top - act1_bottom)){
                    collision_direction = "top";
                }
                else{
                    collision_direction = "left_top";
                }
            }
    
        }
        // act2の当たり判定スプライトの左右上下の位置を取得       
        return {"hit_flag":hit_flag, "collision_direction": collision_direction};
        
    }else{
        return false;    
    }
  },  

  _act1CollisionBack: function(coll_data, act1, act2){

    var act1_hitBox = act1.hitBoxContainer.hitBoxList[0];
    var act2_hitBox = act2.hitBoxContainer.hitBoxList[0];

    // プレイヤーをぶつかった壁に重ならないように戻す
    if(coll_data["hit_flag"]){
      var retPos;
      // プレイヤーが右方向から衝突した場合
      if(coll_data["collision_direction"] == "right"){        
        retPos = act2_hitBox.abs_right - act1_hitBox.offset_x;
        act1.x = retPos;
      }

      // プレイヤーが左方向から衝突した場合
      if(coll_data["collision_direction"] == "left"){
        retPos = act2_hitBox.abs_left - act1_hitBox.abs_w - act1_hitBox.offset_x; 
        act1.x = retPos;
      }

      // プレイヤーが下方向から衝突した場合
      else if(coll_data["collision_direction"] == "bottom"){
        retPos = act2_hitBox.abs_bottom - act1_hitBox.offset_y;
        act1.y = retPos;
      }
      // プレイヤーが上方向から衝突した場合
      else if(coll_data["collision_direction"] == "top"){       
        retPos = act2_hitBox.abs_top - act1_hitBox.abs_h - act1_hitBox.offset_y;
        act1.y = retPos;
      }
      else if(coll_data["collision_direction"] == "right_bottom"){
        retPos = act2_hitBox.abs_right - act1_hitBox.offset_x;
        act1.x = retPos;
        retPos = act2_hitBox.abs_bottom - act1_hitBox.offset_y;
        act1.y = retPos;
      }
      else if(coll_data["collision_direction"] == "left_bottom"){
        retPos = act2_hitBox.abs_left - act1_hitBox.abs_w - act1_hitBox.offset_x;
        act1.x = retPos;
        retPos = act2_hitBox.abs_bottom -  act1_hitBox.offset_y;
        act1.y = retPos;
      }
      else if(coll_data["collision_direction"] == "right_top"){
        retPos = act2_hitBox.abs_right - act1_hitBox.offset_x;
        act1.x = retPos;
        retPos = act2_hitBox.abs_top - act1.hibBox.abs_h - act1_hitBox.offset_y;
        act1.y = retPos;
      }
      else if(coll_data["collision_direction"] == "right_bottom"){
        retPos = act2_hitBox.abs_left - act1_hitBox.abs_w - act1_hitBox.offset_x;; 
        act1.x = retPos;
        retPos = act2_hitBox.abs_top - act1_hitBox.abs_h - act1_hitBox.offset_y;
        act1.y = retPos;
      }

    }

  },

});


