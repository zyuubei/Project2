/////////////////////////////////////////////////////////////
// カメラメインクラス
// 主にUIからのマップ操作を受け付けるための、インターフェースを用意する
// (追加削除、拡大縮小など)
/////////////////////////////////////////////////////////////
phina.define('CameraMain', {

    init: function(panel, map, player) {
        this.panel  = panel;
        this.map    = map;
        this.player = player;
    },

    update: function(){
        this.scroll();
    },

    scroll: function(){
        var panel_width = (this.panel.width/2)-100;
        var panel_height = (this.panel.height/2)-100;        
        var over_x = this.player.x - panel_width;
        var over_y = this.player.y - panel_height;

        if(over_x > 0){
            this.map.x = (-1*over_x);
        }else{
            this.map.x = 0;
        }

        if(over_y > 0){
            this.map.y = (-1 * over_y);
        }else{
            this.map.y = 0;
        }
    }


});