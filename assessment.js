'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
const monthInput = document.getElementById('user-month');
const dayInput = document.getElementById('user-day');
/**
 * 指定した要素の子どもを全て除去する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
  while (element.firstChild) {
    // 子どもの要素があるかぎり除去
    element.removeChild(element.firstChild);
  }
}

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    // 名前が空の時は処理を終了する
    return;
  }

  //test code

 console.log(getResult(userNameInput.value,monthInput.value,dayInput.value,firstWord,secondWord))

  // 診断結果表示エリアの作成
  removeAllChildren(resultDivided);
  const header = document.createElement('h3');
  header.innerText = '今日のあなたを象徴する言葉';
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result =(getResult(userNameInput.value,monthInput.value,dayInput.value,firstWord,secondWord));
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  // ツイートエリアの作成
  removeAllChildren(tweetDivided);
  const anchor = document.createElement('a');
  const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('今日の名前占い') +
    '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #今日の名前占い';
  tweetDivided.appendChild(anchor);

  // widgets.js の設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
};


const firstWord = [
  `信念は`,
  '崇高な目標は',
  '概念は',
  '果実は',
  '酒の肴は',
  'こだわりのイカは',
  '素朴な太陽は'
];
const secondWord = [
  `浮かぶ`,
  'never give up',
  'ふわふわと漂う',
  '三角と四角になる',
  '黒くなったり白くなったりする',
  '繊細さを極める',
  '白米の上に乗る'
];

function sumCodeNum(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfcharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
  }
  return sumOfcharCode;
}

/**
 * ユーザー名と月と日を引数にして文字コードの合計と月日の合計を返す
 * @param {string}
 * @return {integer}
 * 
 */
function sumCodeAndMonthAndDay(userName,m,d){
  if(!(isInt(m) && isInt(d))){
    alert('月日は半角数字で入力してください');
  }else {
    if(!(0 < m && m < 13) || !(0 < d && d < 32)){
      alert('月日は実際に存在する月日を入力してください');
    }
  }
  return sumCodeNum(userName) + m + d;
}

/**
 引数がintの時trueを返す
 @param {}
 @return {boolean}
 */
function isInt(num){
  return !isNaN(num);
}

/**
 * inputされた値の合計と配列を引数にしてinputされた値の合計を配列の長さで割ったあまりを添え字にして配列の要素を返す
 * @param {integer,array}
 * @return {string}
 * 
 */
function getWord(n,a) {
  let num = n % a.length;
  console.log(num + a);
  return a[num];
}




/**
 * 名前と月日と配列二つを引数にして、表示する占い結果の内容を返す
 * @param {string,integer,integer,array,array}
 * @return {string}
 */
function getResult(un,m,d,fw,sw) {
  
  //インプットの合計の値を算出する
  let num = sumCodeAndMonthAndDay(un,m,d,fw,sw);
  //firstwordを算出する
  let fword = getWord(num,fw);
  console.log(`num=${num}fw=${fw}`);
  //secondwordを算出する3を足して ２で割ったあたいから
  let sumanddiv = Math.floor((num + 3) / 2);
  let sword = getWord(sumanddiv,sw);
  console.log(`sumanddiv=${sumanddiv}sw=${sw}`);

  return fword + sword;
}