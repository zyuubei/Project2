
var chat = document.getElementById("chat");

// ID生成
var id = Math.random().toString(32).substring(2);
document.getElementById("id").innerHTML = 'ID : ' + id;

// WS接続（Achexへ接続）
ws = new WebSocket("wss://cloud.achex.ca/chat");

// WS接続
ws.onopen = e => {
    chat.innerHTML = 'You ID : ' + id + '（' + getDateTime() + '）';
    // 認証（auth, passwordは何でもOK）
    ws.send(JSON.stringify({"auth": "hoge", "password": "1234"}));
    ws.send(JSON.stringify({"to": "hoge", "id": id, "message": 'Login'}));
}

// メッセージ受信
ws.onmessage = e => {
    var obj = JSON.parse(e.data);
    if(obj.auth == 'OK'){ 
        // 認証OK
        return;
    }
    console.log("onmessage")
    addChat(obj.id, obj.message);
}

// メッセージ送信
function sendChat(){
    let msgElem = document.getElementById("msg");
    let msg = msgElem.value;
    msgElem.value = "";
    ws.send(JSON.stringify({"to": "hoge", "id": id, "message": msg}));
}

// チャットにメッセージ挿入
function addChat(id, msg){
    chat.innerHTML = id + ' : ' + msg + '（' + getDateTime() + '）' + '<br>' + chat.innerHTML;
}

// WS切断
ws.onclosed = e => {
    ws.send(JSON.stringify({"to": "hoge", "id": id, "message": 'Logout'}));
}

// 1桁の数字を0埋めで2桁にする
var toDoubleDigits = function(num) {
    num += "";
    if (num.length === 1) {
        num = "0" + num;
    }
    return num;     
};

// 日時取得 YYYY/MM/DD HH:DD:MI:SS形式で取得
var getDateTime = function() {
    var date = new Date();
    var year = date.getFullYear();
    var month = toDoubleDigits(date.getMonth() + 1);
    var day = toDoubleDigits(date.getDate());
    var hour = toDoubleDigits(date.getHours());
    var min = toDoubleDigits(date.getMinutes());
    var sec = toDoubleDigits(date.getSeconds());
    return year + '/' + month + '/' + day + ' ' + hour + ':' + min + ':' + sec;
};