document.onkeydown = typeGame;  //キー押下時に関数typeGame()を呼び出す

//文字を格納する配列
var alphabet = new Array("Ａ","Ｂ","Ｃ","Ｄ","Ｅ","Ｆ","Ｇ","Ｈ","Ｉ","Ｊ","Ｋ","Ｌ","Ｍ","Ｎ","Ｏ","Ｐ","Ｑ","Ｒ","Ｓ","Ｔ","Ｕ","Ｖ","Ｗ","Ｘ","Ｙ","Ｚ");

//キーコードを格納する配列
var kcode = new Array(65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90);
  
//0～25までの乱数を格納する配列
var rnd = new Array();
// それぞれの時間を格納する配列
var recTime = new Array();
  
//グローバル変数群
var mondai = ""; /*問題の文字列を格納*/
var cnt_question = 0; /* 何問目か格納 */
var cnt_game = 0; /* 何回目の挑戦か格納 */
var typStart,typEnd;   /* 開始時と終了時の時刻を格納 */
var cnt_miss = 0; /* タイプミスの回数を数える変数 */

//0～25までの乱数を10個作成して配列rndに格納する関数
function ransu() {
  for (var i = 0; i < 10; i++) {
    rnd[i] = Math.floor( Math.random() * 26 );
  }
}

//タイピングゲームの問題をセットする関数
function gameSet() {
  //問題文とカウント数をクリアする
  mondai = "";
  cnt_question = 0;
  //乱数作成関数の呼び出し
  ransu();
  
  //問題文の作成（配列alphabetの要素をランダムに10文字繋げる）
  //mondai= "" + alphabet[rnd[0]] + alphabet[rnd[1]] + … + alphabet[rnd[9]]となる
  for (var i = 0; i < 10; i++) {
    mondai =  mondai + alphabet[ rnd[i] ];
  }
  
  //問題枠に表示する
  document.getElementById("mondai").innerHTML = mondai;
}

//キー入力を受け取る関数
function typeGame(evt) {
  var kc;  //入力されたキーコードを格納する変数
  //入力されたキーのキーコードを取得
  if (document)　{
    kc = event.keyCode;
  }　else　{
    kc = evt.which;
  }
  //入力されたキーコードと、問題文のキーコードを比較
  if (kc == kcode[ rnd[cnt_question] ])　{
    //以下、キーコードが一致した時の処理    
    //最初の1文字が入力された時間を記録する
    if (cnt_question == 0)　{ 
      typStart = new Date();
    }
    
    cnt_question++; //カウント数を＋１にする
    
    //全文字入力したか確認
    if (cnt_question < 10)　{
      //問題文の頭の一文字を切り取る
      mondai = mondai.substring(1,mondai.Length);

      //問題枠に表示する
      document.getElementById("mondai").innerHTML = mondai;
    }　else　{
      //全文字入力していたら、終了時間を記録する
      typEnd = new Date();
      //全文字入力していたら、総挑戦数を記録する
      cnt_game++;
      
      //終了時間－開始時間で掛かったミリ秒を取得する
      var keika = typEnd - typStart;
      
      //1000で割って「切捨て」、秒数を取得
      var sec = Math.floor( keika/1000 );
      
      //1000で割った「余り(%で取得できる）」でミリ秒を取得
      var msec = keika % 1000;
      
      //問題終了を告げる文字列を作成
      var time1 = "時間：" + sec + "秒" + msec;
      //問題枠にゲーム終了コメントを表示
      if (sec > 5) {
        document.getElementById("mondai").innerHTML = "遅いですねえ";	
      } else if (sec > 3) {
        document.getElementById("mondai").innerHTML = "はやい！！";
      } else {
        document.getElementById("mondai").innerHTML = "あなたは神です👼";
        msec += "✨";/* 神記録の最後に絵文字つけたい　*/
      }
      // 時間とタイプミス回数を表示する
      document.getElementById("result").innerHTML = "<br>\n"+ time1 + "<br>\n" + "タイプミス："+ cnt_miss;
      // record_boxにこれまでの記録時間を表示する
      document.getElementById("element").innerHTML += "第" + cnt_game + "回 " + sec + "秒" + msec +  "<br>\n";
      // タイプミスの回数を初期値に戻す
      cnt_miss = 0;
    }
  } else {
    cnt_miss++;
  }
}