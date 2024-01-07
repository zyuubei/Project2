///////////////////////////////////////////////////////////////////////////////////////////////
// イベントを送出する仕組みクラス
///////////////////////////////////////////////////////////////////////////////////////////////
phina.define('PlayerManager', {

  init: function() {
    this.playerDict = {};
  },

  createWizard : function(id, name, headImage, bodyImage, options={}){
    this.playerDict[id] = Wizard(headImage, bodyImage);
    this.playerDict[id].stateContext.transferState("stand");
    this.playerDict[id].setPos(options.x, options.y);
    this.playerDict[id].name = name;
    this.playerDict[id].id = id;      
    this.playerDict[id].setScale(5);
    return this.playerDict[id];    
  },

  createWarrior : function(id, name, headImage, bodyImage, options={}){
    this.playerDict[id] = Warrior(headImage, bodyImage);
    this.playerDict[id].stateContext.transferState("stand");
    this.playerDict[id].setPos(options.x, options.y);
    this.playerDict[id].name = name;
    this.playerDict[id].id = id;      
    this.playerDict[id].setScale(5);
    return this.playerDict[id];    
  },

  createGunner : function(id, name, headImage, bodyImage, options={}){
    this.playerDict[id] = Gunner(headImage, bodyImage);
    this.playerDict[id].stateContext.transferState("stand");
    this.playerDict[id].setPos(options.x, options.y);
    this.playerDict[id].name = name;
    this.playerDict[id].id = id;      
    this.playerDict[id].setScale(5);
    return this.playerDict[id];    
  },

  getPlayer :function(id){
    if(this.playerDict[id]) {
      return this.playerDict[id];
    }
  },

  addChildTo:function(sp){
    for(const p in this.playerDict){
      this.playerDict[p].addChildTo(sp);
    };
  },

});