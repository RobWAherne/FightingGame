////GLOBAL VARIABLES

var fightRollCount = 0;



var headerText = $("body > div > div.row.Header > div > h1");

headerText.text("Set your stats");

let leftPlayer = new Player("left","diceOneLeft","diceTwoLeft","totalLeft","staminaScoreLeft","strengthScoreLeft","rollFightLeft");

let rightPlayer = new Player("right","diceOneRight","diceTwoRight","totalRight","staminaScoreRight","strengthScoreRight","rollFightRight");

let thisGame = new Game(leftPlayer,rightPlayer);
thisGame.restartGame();

leftPlayer.setGame = thisGame;
rightPlayer.setGame = thisGame;




$("#rollFightLeft").click(function() {
      leftPlayer.roll("fight",1,6);
      leftPlayer.fightButton.prop('disabled',true);
      fightRollCount++;
});

$("#rollFightRight").click(function() {
     rightPlayer.roll("fight",1,6);
     rightPlayer.fightButton.prop('disabled',true);
     fightRollCount++;
});






