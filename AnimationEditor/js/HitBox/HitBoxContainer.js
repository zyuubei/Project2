///////////////////////////////////////////////////////////////////////////////////////////////
// 当たり判定用HitBoxContainerクラス
///////////////////////////////////////////////////////////////////////////////////////////////
phina.define('HitBoxContainer', {

    init: function(parentSp) {
        this.hitBoxList = [];
        this.parentSp = parentSp;
    },

    createHitBox: function(x, y, w, h){
        var hitBox = HitBox(this.parentSp, x, y, w, h);
        hitBox.setPos(x, y, w, h);
        this.hitBoxList.push(hitBox);
        return hitBox;
    },

    addChildTo: function(){
        for(hit_i=0; hit_i < this.hitBoxList.length; hit_i++){
            this.hitBoxList[hit_i].addChildTo(this.parentSp);
        }
    },

    Active:function(){
        for(hit_i=0; hit_i < this.hitBoxList.length; hit_i++){
            this.hitBoxList[hit_i].active = 1;
        }
    },

    DeActive: function(){
        for(hit_i=0; hit_i < this.hitBoxList.length; hit_i++){
            this.hitBoxList[hit_i].active = 0;
        }
    },

    Visible:function(){
        for(hit_i=0; hit_i < this.hitBoxList.length; hit_i++){
            this.hitBoxList[hit_i].alpha = 0.5;
        }
    },

    UnVisible:function(){
        for(hit_i=0; hit_i < this.hitBoxList.length; hit_i++){
            this.hitBoxList[hit_i].alpha = 0.0;
        }
    },

    getHitBox: function(hit_i){
        return this.hitBoxList[hit_i];
    },

});
