///////////////////////////////////////////////////////////////////////////////////////////////
// 当たり判定用HitBoxクラス
///////////////////////////////////////////////////////////////////////////////////////////////
phina.define('HitBox', {
    superClass: 'phina.display.RectangleShape',

    init: function(parentSp, x, y, w, h) {
        this.superInit();

        // Rectangleクラスのメンバの設定をHitBox用に調節する
        this.x = x;                 // HitBoxを持つ親スプライト座標を0とした場合の相対x座標
        this.y = y;                 // HitBoxを持つ親スプライト座標を0とした場合の相対y座標
        
        this._width = w;            // 当たり判定 width
        this._height = h;           // 当たり判定 height
        
        this.originX = 0;           // Rectangle中心が座標0に設定されているため、originを0にして左上を座標0にする
        this.originY = 0;           // Rectangle中心が座標0に設定されているため、originを0にして左上を座標0にする
        this.padding = 0;           // Rectangleはなぜかpaddingが初期値設定されているため0に修正する
        
        this.fill = 'red';          // 赤色で塗りつぶし 
        this.alpha = 0.5;           // 赤を半透明に

        // HitBox用のメンバを追加
        this.parentSp = parentSp    // HitBoxを持っている親スプライト(ほぼActorSpriteが親になる)
        this.abs_x = this.parentSp.x + (this.parentSp.scaleX * this.x); // HitBoxの絶対x座標
        this.abs_y = this.parentSp.y + (this.parentSp.scaleX * this.y); // HitBoxの絶対y座標
        this.abs_w = this.parentSp.scaleX * this._width;                // HibBoxのwidth(親スプライトの拡大率は,子であるHibBoxの見た目には反映されるがwidthに反映されないため)
        this.abs_h = this.parentSp.scaleY * this._height;               // HibBoxのheight(親スプライトの拡大率は,子であるHibBoxの見た目には反映されるがheightに反映されないため)
        this.offset_x = (this.parentSp.scaleX * this.x);
        this.offset_y = (this.parentSp.scaleY * this.y);
        this.left = this.abs_x;                     // 絶対座標の左位置
        this.right = this.abs_x + this.abs_w;       // 絶対座標の右位置
        this.top = this.abs_y;                      // 絶対座標の上位置 
        this.bottom = this.abs_y + this.abs_h;      // 絶対座標の下位置 

        this.active = 1;            // HitBoxのアクティブフラグ

    },

    update: function(){
        // HitBoxの絶対座標を更新
        this.offset_x = (this.parentSp.scaleX * this.x);
        this.offset_y = (this.parentSp.scaleY * this.y);
        this.abs_x = this.parentSp.x + (this.parentSp.scaleX * this.x); // HitBoxの絶対x座標
        this.abs_y = this.parentSp.y + (this.parentSp.scaleX * this.y); // HitBoxの絶対y座標
        this.abs_w = this.parentSp.scaleX * this._width;    // HibBoxのwidth(親スプライトの拡大率は,子であるHibBoxの見た目には反映されるがwidthに反映されないため)
        this.abs_h = this.parentSp.scaleY * this._height;   // HibBoxのheight(親スプライトの拡大率は,子であるHibBoxの見た目には反映されるがheightに反映されないため)        
        this.abs_left   = this.abs_x;               // 絶対座標の左位置
        this.abs_right  = this.abs_x + this.abs_w   // 絶対座標の右位置
        this.abs_top    = this.abs_y;               // 絶対座標の上位置 
        this.abs_bottom = this.abs_y + this.abs_h;  // 絶対座標の下位置 

    },

    setPos: function(x ,y ,w ,h ){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this._width = w;            // 当たり判定 width
        this._height = h;           // 当たり判定 height
        
    },


});
