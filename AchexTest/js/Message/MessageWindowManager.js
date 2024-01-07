///////////////////////////////////////////////////////////////////////////////////////////////
// イベントを送出する仕組みクラス
///////////////////////////////////////////////////////////////////////////////////////////////
phina.define('MessageWindowManager', {
  _static: {
    // イベントタイプ -> リスナ配列のマップ
    messageWindowDict: {},
    messageWindowCurrent: null,
    active_flag:0,

    createMessageWindow : function(id, name, messages){
      this.messageWindowDict[id] = MessageWindow(id, name, messages);
      return this.messageWindowDict[id];    
    },

    getMessageWindow :function(id){
      if(this.massageWindowDict[id]) {
        return this.messageWindowDict[id];
      }
    },

    openMessageWindow : function(sprite, id){
      if(this.active_flag == 0){
        if(this.messageWindowDict[id]) {
          this.messageWindowDict[id].addChildTo(sprite);
          this.messageWindowCurrent = this.messageWindowDict[id];
          this.messageWindowCurrent.openWindow();  // 開くアニメーション
          this.active_flag = 1;
        }
      }
    },

    nextMessage: function(){
      if(this.active_flag != 0){
        if(this.messageWindowCurrent.messageNext()){
          this.closeMessageWindow();
        }
      }
    },

    closeMessageWindow:function(){
      var self = this;
      this.messageWindowCurrent.tweener.scaleTo(0.0,100).call(function(){
        self.messageWindowCurrent.remove();
        self.active_flag = 0;
      }).play();
    },

  },
});