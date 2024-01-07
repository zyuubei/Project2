/////////////////////////////////////////////////////////////
// マップのメインクラス
// 主にUIからのマップ操作を受け付けるための、インターフェースを用意する
// (追加削除、拡大縮小など)
/////////////////////////////////////////////////////////////
phina.define('MapMain', {
    superClass: 'MySprite',

    // 外部読み込みの、床レイヤー設定データ,壁レイヤー設定データ,
    // トラップレイヤー設定データ、その他レイヤー設定データを指定
    init: function(FloorLayerData, WallLayer, TrapLayer, OtherLayer) {        

        // マップサイズ(ブロックの個数で指定)
        this.map_x_num = 48;        // 個数
        this.map_y_num = 48;        // 個数
        this.block_size = 16;       // px
        this.map_x_px = this.map_x_num * this.block_size;   // マップのpxサイズX方向
        this.map_y_px = this.map_y_num * this.block_size;   // マップのpxサイズY方向

        this.superInit('null', 0, 0, this.map_x_px, this.map_y_px);

        this.x = 0;
        this.y = 0;

        // 床レイヤー
        this.floorLayer = MapLayer(this, 'FloorMapTip', FloorLayerData);
        this.floorLayer.addChildTo(this);

        // 壁レイヤー
        this.wallLayer = MapLayer(this, 'WallMapTip', WallLayer);
        this.wallLayer.addChildTo(this);

        // 罠レイヤー
        this.trapLayer = MapLayer(this, 'WallMapTip', TrapLayer);
        this.trapLayer.addChildTo(this);
        
        // その他レイヤー
        this.otherLayer = MapLayer(this, 'WallMapTip', OtherLayer);
        this.otherLayer.addChildTo(this);

        this.hitBoxUnVisible()

    },

    // マップサイズ倍率設定
    setScale: function(scale){
        this.floorLayer.setScale(scale);
        this.wallLayer.setScale(scale);
        this.trapLayer.setScale(scale);
        this.otherLayer.setScale(scale);

    },

    // 当たり判定非表示
    hitBoxUnVisible: function(){
        this.floorLayer.hitBoxUnVisible();
        this.wallLayer.hitBoxUnVisible();
        this.trapLayer.hitBoxUnVisible();
        this.otherLayer.hitBoxUnVisible();
        
    },

    // 当たり判定表示
    hitBoxVisible: function(){
        this.floorLayer.hitBoxVisible();
        this.wallLayer.hitBoxVisible();
        this.trapLayer.hitBoxVisible();
        this.otherLayer.hitBoxVisible();
    },

    setPos: function(x, y){
        this.x = x;
        this.y = y;
    },

    setPos_X: function(x){
        this.x = x;
    },

    setPos_Y: function(y){
        this.y = y;
    },


});