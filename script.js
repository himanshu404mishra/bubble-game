let timer = 60;
let score = 0;
let hitrn = null;
function makeNewBuble() {
  let clutter = "";

  let pannel_btm_height = document.querySelector("#p-btm").getBoundingClientRect().height-40;
  let pannel_btm_width = document.querySelector("#p-btm").getBoundingClientRect().width-40
  let row_height = 70;
  let col_width = 70;

  let no_of_rows = Math.floor(pannel_btm_height/row_height)
  let no_of_cols = Math.floor(pannel_btm_width/col_width)
  let no_of_bubble = Math.floor(no_of_rows*no_of_cols);

  for (let i = 0; i < no_of_bubble; i++) {
    let rn = Math.floor(Math.random() * 10);
    clutter += `<div class="bubble" >${rn}<div id="${i}" data-val="${rn}" class="back"></div></div>`;
  }
  document.querySelector("#p-btm").innerHTML = clutter;
}

(function () {
  let timerInterval = setInterval(() => {
    if (timer > 0) {
      timer--;
      document.querySelector("#timer").innerHTML = timer;
    } else {
      clearInterval(timerInterval);
      document.querySelector("#p-btm").innerHTML="<h1 id='gameOver'>Game Over</h1>";
    }
  }, 1000);
})();

function getNewHit() {
  hitrn = Math.floor(Math.random() * 10);
  document.querySelector("#hit").innerHTML = hitrn;
}

function increaseScore() {
  score += 10;
  document.querySelector("#score").innerHTML = score;
}

document.querySelector("#p-btm").addEventListener("click", function (e) {

  document.querySelectorAll(".back").forEach(val=>{
    // console.log(val.id == e.target.id);
    if (e.target.id == val.id) {  
        document.getElementById(`${val.id}`).parentElement.style.transform = "rotateY(0)"
        document.getElementById(`${val.id}`).style.display = "none"
        let clickedNum = parseInt(e.target.dataset.val);
        if (hitrn == clickedNum) {
          increaseScore();
          getNewHit();
          let makebubleinterval = setTimeout(() => {
            makeNewBuble();
            clearInterval(makebubleinterval)
          }, 2500);
        }
        let rotateTimeOut = setTimeout(() => {
          document.getElementById(`${val.id}`).parentElement.style.transform = "rotateY(180deg)"
          document.getElementById(`${val.id}`).style.display = "block"
            clearInterval(rotateTimeOut)
        }, 2000);
    }
  })

});

getNewHit();
makeNewBuble();
