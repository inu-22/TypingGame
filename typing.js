document.onkeydown = typeGame;  //キー押下時に関数typeGame()を呼び出す

//文字を格納する配列
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",","];
//キーコードを格納する配列
var kcode = [65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,44];

//問題（ことわざ）
var wordlist = ["aaiebakouiu","isogabamaware","uogokoroarebamizugokoro","ennositanotikaramoti","oninomenimonamida","kaiinunitewokamareru","kyuusiniissyouwoeru","kutihawazawainomoto","geijutuhanagakujinseihamijikasi","koukaisakinitatazu","sarumokikaraotiru","siranugahotoke","suimoamaimokamiwaketa","zenhaisoge","daihasyouwokaneru","tirimotumorebayamatonaru","turuhasennenkamehamannen","tenhanibutuwoataezu","tokihakanenari","nagaimononihamakarero","nidoarukotohasandoaru","nukanikugi","nekonotemokaritai","norenniudeosi","hayaokihasanmonnotoku","hinonaitokoronikemurihatatanu","hukusuibonnikaerazu","benkeinonakidokoro","hotokenokaomosando","mayugewoyomareru","mikaradetasabi","musumehitorinimukohatinin","menihame,hanihaha","motonosayaniosamaru","yakeisinimizu","yudantaiteki","yowarimenitatarime","rakuhakunotane,kuharakunotane","ryouyakuhakutininigasi","ruihatomowoyobu","reiniyottereinogotosi","rongoyominorongosirazu","waraukadonihahukukitaru"];
var wordlistJapanese = ["ああ言えばこう言う","急がば回れ","魚心あれば水心","縁の下の力持ち","鬼の目にも涙","飼い犬に手を噛まれる","九死に一生を得る","口は禍の元","芸術は長く人生は短し","後悔先に立たず","猿も木から落ちる","知らぬが仏","酸いも甘いも噛み分けた","善は急げ","大は小を兼ねる","塵も積もれば山となる","鶴は千年亀は万年","天は二物を与えず","時は金なり","長い物には巻かれろ","二度あることは三度ある","糠に釘","猫の手も借りたい","暖簾に腕押し","早起きは三文の徳","火のないところに煙は立たぬ","覆水盆に反らず","弁慶の泣き所","仏の顔も三度","眉毛を読まれる","身から出た錆","娘一人に婿八人","目には目、歯には歯","元の鞘に納まる","焼け石に水","油断大敵","弱り目に祟り目","楽は苦の種、苦は楽の種","良薬は口に苦し","類は友を呼ぶ","例によって例の如し","論語読みの論語知らず","笑う門には福来たる"];

//0～25までの乱数を格納する配列
var rnd = new Array();
// それぞれの時間を格納する配列
var recTime = new Array();
  
//グローバル変数群
var mondai = ""; /*問題の文字列を格納*/
var mondai1 = ""; /*問題の文字列を格納*/
var cnt_question = 0; /* 何問目か格納 */
var cnt_game = 0; /* 何回目の挑戦か格納 */
var typStart,typEnd;   /* 開始時と終了時の時刻を格納 */
var cnt_miss = 0; /* タイプミスの回数を数える変数 */
var kcodelist;

//問題の文字と対応するkcodelistを生成する関数(indexOFなど関数の使い方間違えてるから調べなおす)
function getkclist(mondai1) {
  var num; //添え字
  num = mondai.indexOf;
　kcodelist.push = kcode[num];
}

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