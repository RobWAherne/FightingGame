/*

TODO: Add strength to Dice rsult in fight
TODO: Damage click action
TODO: Link Damage bar to Stamina. Store max Stamina in Player
TODO: Animations. Health - red and wobble. Add strength to roll. Fight action. Damage bar animation.

 */




////GLOBAL VARIABLES
var fightRollCount = 0;



var headerText = $("body > div > div.row.Header > div > h1");

headerText.text("Set your stats");

let leftPlayer = new Player("left","staminaScoreLeft","strengthScoreLeft");

let rightPlayer = new Player("right","staminaScoreRight","strengthScoreRight");

let leftDice = new Dice("left", "rollFightLeft","diceOneLeft","diceTwoLeft","totalLeft",leftPlayer);

let rightDice = new Dice("right", "rollFightRight","diceOneRight","diceTwoRight","totalRight",rightPlayer);

leftDice.setMode("stamina");

rightDice.setMode("stamina");

let thisGame = new Game();

thisGame.restartGame();



$("#rollFightLeft").click(function() {
      leftDice.roll(1,6);
      leftDice.button.prop('disabled',true);
      if(fightRollCount == 0){rightDice.results.text("")}
      fightRollCount++;
});

$("#rollFightRight").click(function() {
     rightDice.roll(1,6);
     rightDice.button.prop('disabled',true);
     if(fightRollCount == 0){leftDice.results.text("")}
     fightRollCount++;
});






