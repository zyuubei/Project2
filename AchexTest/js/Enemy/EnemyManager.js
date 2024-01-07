///////////////////////////////////////////////////////////////////////////////////////////////
// 全敵マネージャ
///////////////////////////////////////////////////////////////////////////////////////////////
phina.define('EnemyManager', {

  init: function() {
    this.enemyDict = {};
  },

  createTestEnemy : function(id, name, image, options={}){
    this.enemyDict[id] = TestEnemy(image);
    this.enemyDict[id].stateContext.transferState("stand");
    this.enemyDict[id].setPos(options.x, options.y);
    this.enemyDict[id].name = name;
    this.enemyDict[id].id = id;      
    this.enemyDict[id].setScale(4);
    return this.enemyDict[id];
  },

  update: function(){
    for(const p in this.enemyDict){
      this.enemyDict[p].update();
    };

  },

  getPlayer :function(id){
    if(this.enemyDict[id]) {
      return this.enemyDict[id];
    }
  },

  addChildTo:function(sp){
    for(const p in this.enemyDict){
      this.enemyDict[p].addChildTo(sp);
    };
  },

});