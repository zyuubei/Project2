phina.define('ActorSprite', {
  superClass: 'MySprite',

  /*
    image:  画像パス
    x:      x座標
    y:      y座標
    width:   幅
    height:  高さ
  */
  init: function(image, x, y, width, height) {
    this.superInit(image, x, y, width, height);
    // 当たり判定データ
    this.hitBoxContainer = HitBoxContainer(this);
  },

  setScale: function(scale){
    this.scaleX = scale;
    this.scaleY = scale;
  }


});