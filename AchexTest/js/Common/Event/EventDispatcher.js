///////////////////////////////////////////////////////////////////////////////////////////////
// イベントを送出する仕組みクラス
///////////////////////////////////////////////////////////////////////////////////////////////
phina.define('EventDispatcher', {
  _static: {
    // イベントタイプ -> リスナ配列のマップ
    listenerMap: {},

    getListeners : function(eventType){
      // イベントタイプに対するリスナ配列が存在しなかったら作成する
      if(!this.listenerMap[eventType]) {
        this.listenerMap[eventType] = [];
      }
  
      return this.listenerMap[eventType];
    
    },

    // イベントタイプに対してコールバックを登録する
    addEventListener : function(eventType, callback, options = {}) {
      // リスナ情報を作る
      const listener = {
      once: !!options.once,   // optionからはonceが来る想定。onceがtrueだと1度しか実行されない感じ
      callback                // callback関数
    };

      // イベントのリスナを登録する
      this.getListeners(eventType).push(listener);
    },

    // イベントを送出する
    // イベントは
    //     { type: 'test', message: 'Hello' }
    // のようなオブジェクト
    //dispatchEvent(eventType, event)で登録されたeventTypeのコールバック関数（イベント情報）を実行する仕組みを記述
    dispatchEvent: function(eventType, event) {
      // イベントタイプに登録されている各リスナを呼び出す
      // 呼び出し時には一応イベントオブジェクトも渡しておく
      const listenerList = this.getListeners(eventType);
      for(const listener of listenerList) {
        listener.callback(event); // 呼び出す
      }

      // onceリスナを削除する
      const filtered = listenerList.filter((lsn) => !lsn.once);
      this.listenerMap[eventType] = filtered;
    },

    // コールバック関数をリスナ配列から削除する
    removeEventListener: function(eventType, callback) {
      const listenerList = this.getListeners(eventType);
      const index = listenerList.findIndex((lsn) => lsn.callback === callback);
      if(index >= 0) {
        listenerList.splice(index, 1);
      }
    },

  },

});