document.onkeydown = typeGame;  //キー押下時に関数typeGame()を呼び出す

//文字を格納する配列
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",","];
//キーコードを格納する配列
var kcode = [65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,44];

//問題（ことわざ）
var proverblist = ["aaiebakouiu","isogabamaware","uogokoroarebamizugokoro","ennositanotikaramoti","oninomenimonamida","kaiinunitewokamareru","kyuusiniissyouwoeru","kutihawazawainomoto","geijutuhanagakujinseihamijikasi","koukaisakinitatazu","sarumokikaraotiru","siranugahotoke","suimoamaimokamiwaketa","zenhaisoge","daihasyouwokaneru","tirimotumorebayamatonaru","turuhasennenkamehamannen","tenhanibutuwoataezu","tokihakanenari","nagaimononihamakarero","nidoarukotohasandoaru","nukanikugi","nekonotemokaritai","norenniudeosi","hayaokihasanmonnotoku","hinonaitokoronikemurihatatanu","hukusuibonnikaerazu","benkeinonakidokoro","hotokenokaomosando","mayugewoyomareru","mikaradetasabi","musumehitorinimukohatinin","menihamehanihaha","motonosayaniosamaru","yakeisinimizu","yudantaiteki","yowarimenitatarime","rakuhakunotanekuharakunotane","ryouyakuhakutininigasi","ruihatomowoyobu","reiniyottereinogotosi","rongoyominorongosirazu","waraukadonihahukukitaru"];
var proverbJpn = ["ああ言えばこう言う","急がば回れ","魚心あれば水心","縁の下の力持ち","鬼の目にも涙","飼い犬に手を噛まれる","九死に一生を得る","口は禍の元","芸術は長く人生は短し","後悔先に立たず","猿も木から落ちる","知らぬが仏","酸いも甘いも噛み分けた","善は急げ","大は小を兼ねる","塵も積もれば山となる","鶴は千年亀は万年","天は二物を与えず","時は金なり","長い物には巻かれろ","二度あることは三度ある","糠に釘","猫の手も借りたい","暖簾に腕押し","早起きは三文の徳","火のないところに煙は立たぬ","覆水盆に反らず","弁慶の泣き所","仏の顔も三度","眉毛を読まれる","身から出た錆","娘一人に婿八人","目には目歯には歯","元の鞘に納まる","焼け石に水","油断大敵","弱り目に祟り目","楽は苦の種苦は楽の種","良薬は口に苦し","類は友を呼ぶ","例によって例の如し","論語読みの論語知らず","笑う門には福来たる"];

//0～25までの乱数を格納する配列
var rnd = new Array();

// それぞれの時間を格納する配列
var recTime = new Array();
  
//グローバル変数群
var quiz = ""; /*問題の文字列を格納*/
var quizJpn = ""; /*日本語の問題の文字列を格納*/
var kcodelist = []; /* 問題のkcodeを格納する配列 */
var cnt_question = 0; /* 何問目か格納 */
var cnt_game = 0; /* 何回目の挑戦か格納 */
var cnt_miss = 0; /* タイプミスの回数を数える変数 */
var typStart,typEnd;   /* 開始時と終了時の時刻を格納 */
var jpnIndex = ""; /* 選ばれた問題に対応する日本語を格納する変数 */
var arrLength = 0; 	/*　問題の配列長を格納する変数 */

//はじめにkclistの中身を空っぽにし、受け取った配列のキーコードをkclistに格納する関数
function makekclist(quiz) {
  kcodelist = [];
  for(var i = 0; quiz[i] != null; i++) {
		getkc(quiz[i]);
	}    
}    
//検索する文字を受け取り、対応するアスキーコードをkicodelistにpushする関数
function getkc(moji) {
  var num; //添え字
  num = alphabet.indexOf(moji);
  kcodelist.push(kcode[num]);  
}  
//受け取った配列かランダムに1つ選び、選んだ問題を返す関数。さらに添え字をjpnIndexに代入する。
function chooseQuiz(arr) {
	var arrIndex = Math.floor(Math.random() * arr.length);
	jpnIndex = arrIndex; 
	return arr[arrIndex];
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
  quiz = "";
  quizJpn = "";
	cnt_question = 0;
	arrLength = 0;
  //問題をランダムに選ぶ
	quiz = chooseQuiz(proverblist);
	quizJpn = proverbJpn[jpnIndex];
	//選んだ問題のkclistをつくる
	makekclist(quiz);
	//選んだ問題の配列長（要素数）をarrLengthに格納する
	arrLength = quiz.length;
	//問題枠に表示する
  document.getElementById("mondaiwaku").innerHTML = quizJpn + "<br>\n" + quiz;
}

//キー入力を受け取る関数
function typeGame(evt) {
  //入力されたキーコードと、問題文のキーコードを比較
  if (event.keyCode == kcodelist[cnt_question])　{
    //以下、キーコードが一致した時の処理    
    //最初の1文字が入力された時間を記録する
    if (cnt_question == 0)　{ 
      typStart = new Date();
    }
    
    cnt_question++; //カウント数を＋１にする
    
    //全文字入力したか確認
    if (cnt_question < arrLength)　{
      //問題文の頭の一文字を切り取る
      quiz = quiz.substring(1,quiz.Length);
      // quizJpn = quizJpn.substring(1,quiz.Length);

			//問題枠に表示する
  		document.getElementById("mondaiwaku").innerHTML = quizJpn + "<br>\n" + quiz;
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
        document.getElementById("mondaiwaku").innerHTML = "遅いですねえ";	
      } else if (sec > 3) {
        document.getElementById("mondaiwaku").innerHTML = "はやい！！";
      } else {
        document.getElementById("mondaiwaku").innerHTML = "あなたは神です👼";
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