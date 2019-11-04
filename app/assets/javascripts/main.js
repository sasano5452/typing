
'use strict';

window.onload = function(){

// 変数宣言
  let words = [];
  let word;          
  let loc;     // 文字が何番目かを管理したい 重要
  let score;
  let miss;
  const countLimit = 3 * 1000;  //カウントリミット
  const timeLimit = 15 * 1000 + countLimit;  //タイムリミット
  let startTime;
  let isPlaying = false;
  let total = 0;

//id要素の取得
  const target = document.getElementById('target');
  const totalLabel = document.getElementById('total');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');
  const modal = document.getElementById('modal');
  const mask = document.getElementById('mask');
  const umi = document.getElementById('umi');
  const result = document.getElementById('result');
  const mask_white = document.getElementById('mask_white');
  const mask_box_count = document.getElementById('mask_box_count');


// モーダルを消す処理
  mask.addEventListener('click', function () {
    modal.classList.add('hidden');
    mask.classList.add('hidden');
  });
  
//クリックでrubyゲームスタート
  ruby.addEventListener('click', () =>{
    mask_white.classList.remove('hidden');
    umi.classList.remove('hidden2');
    ruby.textContent = ''
    start.textContent = ''
    words.length = 0;
    words = [
      'ruby','puts','length','rpartition','include','rindex',
      'gets','hash','if','else','each','reverse','capitalaize',
      'while','elseif','true','false','return','swapcase','replace','clear',
      'class','new','with','index','round','split','partition'
    ];
    if (isPlaying === true) {
      return}
    isPlaying = true;  

    loc = 0;
    score = 0;
    miss = 0;
    totalLabel.textContent = total;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    word = words[Math.floor(Math.random() * words.length)];
    target.textContent = word;
    startTime = Date.now();
    updateTimer();
  })

//クリックでjsゲームスタート
  start.addEventListener('click', () =>{
    mask_white.classList.remove('hidden');
    umi.classList.remove('hidden2');
    ruby.textContent = ''
    start.textContent = ''
    words.length = 0;
    words = [
      'function','target','document','settimeout','this','call',
      'var','let','const','false','console','random','addeventListener','isplaying',
      'ajax','click','empty','remove','add','getelementbyid',
      'text','attr','show','val','sumit'
    ];
    if (isPlaying === true) {
      return}
    isPlaying = true;  
    loc = 0;
    score = 0;
    miss = 0;
    totalLabel.textContent = total;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    word = words[Math.floor(Math.random() * words.length)];
    target.textContent = word;
    startTime = Date.now();
    updateTimer();
  })

//単語の正誤をカウント
  window.addEventListener('keydown',(e)=>{
    if (isPlaying !== true) {
      return;
    }
    if (e.key === word[loc]) {     //打ったキーとwordのloc番目の文字が同じなら
      loc++;
      document.getElementById("target").style.color = "";
      // 単語が正解なら次の単語に行く処理
      if (loc === word.length) {
        word = words[Math.floor(Math.random() * words.length)];  // ランダムに単語をだす
        loc = 0;
        document.getElementById('sound').play(); //音がなります
        total++;
        totalLabel.textContent = total;
      }
      updataTarget();
      score++;
      scoreLabel.textContent = score;

    } else {
      document.getElementById("target").style.color = "red";
      miss++;
      missLabel.textContent = miss;
    }
  });

  //入力した単語を_に変える (_と残りの文字を結合する)
  function updataTarget() {
    let placeholder ='';
    for (let i = 0; i < loc; i++){
      placeholder += '_';
    }
    target.textContent = placeholder + word.substring(loc);
  }

 //時間制限
  function updateTimer() {
    const timeLeft = startTime + timeLimit - Date.now();
    const timeRight = startTime + countLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(2);
    mask_box_count.textContent = (timeRight / 1000).toFixed(0);
   //時間を動かす 
    const timeoutId = setTimeout(() => {
      updateTimer();
        }, 10);
   // カウントが終わるとtypingスタート    
    if (timeRight < 0) {
      mask_white.classList.add('hidden');
      umi.classList.remove('hidden');
    }
    if (timeLeft < 0) {
      isPlaying = false;
      clearTimeout(timeoutId);
    //モードルを出す処理
      modal.classList.remove('hidden');
      mask.classList.remove('hidden');
      umi.classList.add('hidden');
      umi.classList.add('hidden2');
      target.textContent = '';
      document.getElementById("target").style.color = "";
      timerLabel.textContent = '0.00'
      setTimeout(() => {
        showResult();
      }, 100);
      ruby.textContent = "ruby Replay"
      start.textContent = "javascript play"
    };
  };


  //正答率の計算    
  function showResult() {
    const accuracy = score + miss === 0 ? 0 :score / (score + miss) * 100;
    // console.log(score);  クッキーをうちこめ
    result.textContent = accuracy.toFixed(2)
  };
};

