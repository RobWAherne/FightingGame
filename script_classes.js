/////CLASSES
class Player{
  constructor(player, selectorStamina, selectorStrength){
    this.player = player;
    this.total = 0;
    this.stamina = $("#"+selectorStamina);
    this.strength = $("#"+selectorStrength);
  }

}


class Game{
  constructor(){
      this.round = "1";
    }

    restartGame(){
      leftPlayer.stamina.text("12");
      leftPlayer.strength.text("6");

      rightPlayer.stamina.text("12");
      rightPlayer.strength.text("6");

      if(randomIntFromInterval(1,2) == 1){
       leftDice.button.prop('disabled',true);
       rightDice.button.prop('disabled',false);
      }
      else{
       leftDice.button.prop('disabled',false);
       rightDice.button.prop('disabled',true);
      }

      //console.log(rightPlayer.fightButton.prop('disabled'));

    }

}

class Dice{
 constructor(name,button, diceOne, diceTwo,results,associatedPlayer){
    this.name = name;
    this.button = $("#"+button);
    this.dieOne = $("#"+diceOne);
    this.dieTwo = $("#"+diceTwo);
    this.results = $("#"+results);
    this.total;
    this.associatedPlayer = associatedPlayer;
    this.mode;
  }

  setMode(mode){
    //FIGHT, STAMINA, STRENGTH
    this.mode = mode;

    if(mode == "fight"){

      this.button.text("Roll to fight!");
      this.dieTwo.show();

    }else if(mode == "stamina"){

      this.button.text("Roll for Stamina");

    }else if(mode == "strength"){

      this.dieTwo.hide();
      this.button.text("Roll for Strength");
    }

  }

  roll(lowNum,highNum){

    var i = 1;
    var num;
    var num2;

    this.dieOne.rotate({ count:4, duration:0.5, easing:'ease-out' });
    this.dieTwo.rotate({ count:4, duration:0.7, easing:'ease-out' });
    
    this.results.text("");

    var myTimer = setInterval(rollDie,100,this);

    function rollDie(a){
      //console.log(a);
      if(i < 11){
        num2 = randomIntFromInterval(lowNum,highNum);
        //console.log(a.selectorDieOne);
        a.dieOne.removeClass().addClass("dice dice-"+num2);
      }
      
      if(i < 21){
        num = randomIntFromInterval(lowNum,highNum);
        a.dieTwo.removeClass().addClass("dice dice-"+num);
      }
      
      if(i > 27){

        clearInterval(myTimer);

        a.total = num + num2;
        
        switch(a.mode) {
          case "fight":
            a.results.text(a.total);
            a.results.effect( "bounce", { times: 3 }, "slow" );           
            fightRollFinished(a.associatedPlayer.player);
            break;
          case "stamina":
            a.results.text(a.total);
            a.results.effect( "bounce", { times: 1 }, "slow" );
            a.associatedPlayer.stamina.text(12+num+num2);
            a.associatedPlayer.stamina.effect( "bounce", { times: 3 }, "fast" );
            
            staminaRollFinished(a.associatedPlayer.player);
            break;
          case "strength":
            a.results.text(num2);
            a.results.effect( "bounce", { times: 3 }, "slow" );
            $(a.results).transfer( {
              to: $(a.associatedPlayer.strength),
              duration: 1000
            } );
            a.associatedPlayer.strength.text(6+num2);
            a.associatedPlayer.strength.effect( "bounce", { times: 3 }, "slow" );         
            strengthRollFinished(a.associatedPlayer.player);
            break;
          default:
            // code block
        }


        //console.log(this.total);
      }
      i++;
    }

        
    

  }

}
