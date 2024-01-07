/////////////////////////////////////////////////////////////
// マップレイヤークラス
/////////////////////////////////////////////////////////////
phina.define('MapLayer', {
    superClass: 'MySprite',

    init: function(mapObj, img, LayerData) {
        this.superInit('null', 0, 0, mapObj.map_x_px, mapObj.map_y_px);

        this.layerSizeX = mapObj.map_x_num;      // ブロックの個数X軸
        this.layerSizeY = mapObj.map_y_num;      // ブロックの個数Y軸
        
        this.blockList = [];        // レイヤーConfigFileから作成したブロックデータのリスト
        
        this._autoLayerCreate(LayerData, img);
        
        for(i=0; i < this.blockList.length; i++){
            this.blockList[i].addChildTo(this);
        }
        
    },

    // レイヤーの倍率指定
    setScale: function(scale){
        for(i=0; i < this.blockList.length; i++){ 
            this.blockList[i].setScale(scale);
            this.blockList[i].hitBoxContainer.updatePosition();
        }
    },

    // 当たり判定の非表示
    hitBoxUnVisible: function(){
        for(i=0; i < this.blockList.length; i++){
            this.blockList[i].hitBoxContainer.UnVisible();
        }
    },

    // 当たり判定の表示
    hitBoxVisible: function(){
        for(i=0; i < this.blockList.length; i++){
            this.blockList[i].hitBoxContainer.Visible();
        }
    },


    //レイヤーConfigFileからブロックのリストを自動で作成
    _autoLayerCreate: function(layerData, image){
        var cnt=0;
        // 床ブロックを配置する

        for(i = 0; i < this.layerSizeX; i++){ 
            for(j = 0; j < this.layerSizeY; j++){
                var num = (i * this.layerSizeX) + j;                
                var id  = layerData[num].id;        // レイヤーConfigデータのidデータを取得
                var hit = layerData[num].hit;       // レイヤーConfigデータのhitデータを取得
                var pos = this._mapTipReader(id);   // 指定idに該当するMapTipのポジションを取得                
                // idが0でなければ
                if (id != 0){
                    var bk  = NormalBlock(image, j * 16, i * 16, pos["dx"], pos["dy"], pos["dw"], pos["dh"]);   // ブロック作成
                    if (hit != 0){
                        bk.hitBoxContainer.Active();    // hitが0でなければ
                        bk.hitBoxContainer.Visible();   // hitが0でなければ
                    }
                    this.blockList.push(bk);
                }
            }
        }
    },

    // IDを指定すると該当するマップチップのポジションdx,dy,dw,dhをreturnする
    _mapTipReader: function(id){
        var bk_w = 16;
        var bk_h = 16;
        var mapTip_w = 16;
        var mapTip_h = 16;
        var row = Math.trunc(id / mapTip_w);
        var col = Math.trunc(id - row * mapTip_w);
        var dx = col * 16;
        var dy = row * 16;
        var dw = bk_w;
        var dh = bk_h;
        return {"dx":dx, "dy":dy, "dw":dw, "dh":dh};
    },

});