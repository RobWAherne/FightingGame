/////CLASSES
class Player{
  constructor(player,selectorLeft,selectorRight, selectorResults, selectorStamina, selectorStrength, fightButton){
    this.player = player;
    this.dieOne = $("#"+selectorLeft);
    this.dieTwo = $("#"+selectorRight);
    this.results = $("#"+selectorResults);
    this.total = 0;
    this.stamina = $("#"+selectorStamina);
    this.strength = $("#"+selectorStrength);
    this.fightButton = $("#"+fightButton);
  }


  roll(forThisScore,lowNum,highNum){
    
    var i = 1;
    var num;
    var num2;

    this.dieOne.rotate({ count:4, duration:0.5, easing:'ease-out' });
    this.dieTwo.rotate({ count:4, duration:0.7, easing:'ease-out' });
    var myTimer = setInterval(rollDie,100,this);

    //console.log(this.selectorDieOne);

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
        console.log("roll total: "+a.total);
        
        fightRollFinished(a.player);

        switch(forThisScore) {
          case "fight":
            a.results.text(a.total);
            a.results.effect( "bounce", { times: 3 }, "slow" );
            break;
          case "stamina":
            a.stamina.text(a.total);
            a.stamina.effect( "bounce", { times: 3 }, "slow" );
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


class Game{
  constructor(leftPlayer, rightPlayer){
      this.round = "1";
      this.leftPlayer = leftPlayer;
      this.rightPlayer = rightPlayer;
    }

    restartGame(){
      this.leftPlayer.stamina.text("22");
      this.leftPlayer.strength.text("9");

      this.rightPlayer.stamina.text("18");
      this.rightPlayer.strength.text("11");

      if(randomIntFromInterval(1,2) == 1){
       this.leftPlayer.fightButton.prop('disabled',true);
       this.rightPlayer.fightButton.prop('disabled',false);
      }
      else{
        this.leftPlayer.fightButton.prop('disabled',false);
        this.rightPlayer.fightButton.prop('disabled',true);
      }

      console.log(this.rightPlayer.fightButton.prop('disabled'));

    }

}
