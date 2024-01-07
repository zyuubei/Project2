///////////////////////////////////////////////////////////////////////////////////////////////
// イベントを送出する仕組みクラス
///////////////////////////////////////////////////////////////////////////////////////////////
phina.define('NPCManager', {

  init: function() {
    this.npcDict = {};
  },

  createNPC : function(id, name, headImage, bodyImage, options={}){
    this.npcDict[id] = NPC(headImage, bodyImage);
    this.npcDict[id].stateContext.transferState("stand");
    this.npcDict[id].setPos(options.x, options.y);
    this.npcDict[id].name = name;
    this.npcDict[id].id = id;      
    this.npcDict[id].setScale(4);
    return this.npcDict[id]; 

  },

  getPlayer :function(id){
    if(this.npcDict[id]) {
      return this.npcDict[id];
    }
  },

  addChildTo:function(sp){
    for(const p in this.npcDict){
      this.npcDict[p].addChildTo(sp);
    };
  },

});