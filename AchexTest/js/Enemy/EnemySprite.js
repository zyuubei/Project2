phina.define('EnemySprite', {
  superClass: 'phina.display.Sprite',

  /*
    image:  画像パス
    name:   パーツ識別用の名前
    x:      x座標
    y:      y座標
    dx:     ソース画像全体に対する、描画位置の始点x座標を指定
    dy:     ソース画像全体に対する、描画位置の始点y座標を指定
    dw:     ソース画像全体に対する、描画位置の幅wを指定
    dh:     ソース画像全体に対する、描画位置の高hを指定
  */
  init: function(image, x, y, width, height) {
    this.superInit(image, width, height);
    this.x = x;     // 描画スプライトからの相対x
    this.y = y;     // 描画スプライトからの相対y
    this.width = width;
    this.height = height;
    this.originX = 0;
    this.originY = 0;

  },
  
  draw: function(canvas){
    canvas.save();                        //canvasの状態をスタックに保存
    canvas.imageSmoothingEnabled = false; //ここがミソ拡大時の補完を無効に
    this.superMethod('draw', canvas);     //スーパークラスのdrawメソッド呼び出し
    canvas.restore();                     //他に影響が出ないように状態を戻す
  },

});


phina.define('EnemyOutlineSprite', {
  superClass: 'EnemySprite',

  /*
    image:  画像パス
    name:   パーツ識別用の名前
    x:      x座標
    y:      y座標
    dx:     ソース画像全体に対する、描画位置の始点x座標を指定
    dy:     ソース画像全体に対する、描画位置の始点y座標を指定
    dw:     ソース画像全体に対する、描画位置の幅wを指定
    dh:     ソース画像全体に対する、描画位置の高hを指定
  */
  init: function(image, x, y, dx, dy, dw, dh) {
    // 輪郭スプライトを作成,自動でAssetに追加してくれる名前は”元+Outline”
    this.borderOutlineTexture(image);

    this.superInit(image + "Outline", x, y, dx, dy, dw, dh);
  }, 

  // 縁を黒で囲う処理
  borderOutlineTexture: function(textureName){
    var texture = phina.asset.AssetManager.get("image", textureName);
    var w = texture.domElement.width;
    var h = texture.domElement.height;
    
    // 元画像
    var src = phina.graphics.Canvas().setSize(w, h);
    src.context.drawImage(texture.domElement, 0, 0);

    // 元画像からピクセルデータを取り出す
    var srcData = src.context.getImageData(0, 0, w, h);

    // 輪郭のみの画像
    var dst = phina.graphics.Canvas().setSize(w, h);
    dst.fillStyle = "black";
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var cIndex = ((y + 0) * w + (x + 0)) * 4 + 3;
        var a = srcData.data[cIndex]; // 対象ピクセルのアルファ値
        var lIndex = ((y + 0) * w + (x - 1)) * 4 + 3;
        var rIndex = ((y + 0) * w + (x + 1)) * 4 + 3;
        var tIndex = ((y - 1) * w + (x + 0)) * 4 + 3;
        var bIndex = ((y + 1) * w + (x + 0)) * 4 + 3;
        var l = (0 <= lIndex && lIndex < srcData.data.length) ? srcData.data[lIndex] : 255; // 左隣のピクセルのアルファ値
        var r = (0 <= rIndex && rIndex < srcData.data.length) ? srcData.data[rIndex] : 255; // 右
        var t = (0 <= tIndex && tIndex < srcData.data.length) ? srcData.data[tIndex] : 255; // 上
        var b = (0 <= bIndex && bIndex < srcData.data.length) ? srcData.data[bIndex] : 255; // 下
        // 対象ピクセルが不透明で、上下左右に透明なピクセルがある場合
        if (a > 0 && (l == 0 || r == 0 || t == 0 || b == 0)) {
          dst.fillRect(x-1, y-1, 3, 3); // 1x1の四角を描画
        }
      }
    }
    phina.asset.AssetManager.set("image", textureName + "Outline", dst);
  },

});