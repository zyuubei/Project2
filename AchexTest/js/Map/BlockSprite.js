phina.define('BlockSprite', {
  superClass: 'ActorSprite',

  /*
    image:  画像パス
    x:      x座標
    y:      y座標
    dx:     ソース画像全体に対する、描画位置の始点x座標を指定
    dy:     ソース画像全体に対する、描画位置の始点y座標を指定
    dw:     ソース画像全体に対する、描画位置の幅wを指定
    dh:     ソース画像全体に対する、描画位置の高hを指定
  */
  init: function(image, x, y, dx, dy, dw, dh) {
    this.superInit(image, x, y, dw, dh);
    this.x = x;
    this.y = y;
    this.srcRect.x = dx;    
    this.srcRect.y = dy;
    this.width = dw;
    this.height = dh;
    this.originX = 0;
    this.originY = 0;
    this.hitBoxContainer = HitBoxBlockContainer(this);
    
  },
    
  setScreenPos: function(x, y, dx, dy, dw, dh){
    this.x = x;
    this.y = y;
    this.srcRect.x = dx;    
    this.srcRect.y = dy;
    this.width = dw;
    this.height = dh;
  },

  // スケール設定
  setScale: function(scale){
    this.scaleX = scale;
    this.scaleY = scale;
    this.x *= scale;
    this.y *= scale;
  },

});

///////////////////////////////////////////////////////////////////////////////////////////////
// フィールドのブロック
///////////////////////////////////////////////////////////////////////////////////////////////
phina.define('NormalBlock', {
  superClass: 'BlockSprite',
  init: function(img, x, y, dx, dy, dw, dh) {
      this.superInit(img, x, y, dx, dy, dw, dh);
      var test = this.hitBoxContainer.createHitBox(0, 0, 16, 16);      
      test.x = 0;
      test.y = 0;
      this.hitBoxContainer.DeActive();
      this.hitBoxContainer.UnVisible();
      this.hitBoxContainer.addChildTo();
  },



});
