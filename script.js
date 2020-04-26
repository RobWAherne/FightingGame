var headerText = $("body > div > div.row.Header > div > h1");


headerText.text("Set your stats");

let leftPlayer = new Player("diceOneLeft","diceTwoLeft","totalLeft","staminaScoreLeft","strengthScoreLeft");

let rightPlayer = new Player("diceOneRight","diceTwoRight","totalRight","staminaScoreRight","strengthScoreRight");

$("#rollFightLeft").click(function() {
  leftPlayer.roll();
});

$("#rollFightRight").click(function() {
  rightPlayer.roll();
});




