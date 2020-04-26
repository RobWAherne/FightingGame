/////CLASSES
class Player{
  constructor(selectorLeft,selectorRight, selectorResults, selectorStamina, selectorStrength){
    this.dieOne = $("#"+selectorLeft);
    this.dieTwo = $("#"+selectorRight);
    this.results = $("#"+selectorResults);
    this.total = 2;
    this.stamina = $("#"+selectorStamina);
    this.strength = $("#"+selectorStrength);
  }
  roll(){
    
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
        num2 = randomIntFromInterval(1,6);
        //console.log(a.selectorDieOne);
        a.dieOne.removeClass().addClass("dice dice-"+num2);
      }
      
      if(i < 21){
        num = randomIntFromInterval(1,6);
        a.dieTwo.removeClass().addClass("dice dice-"+num);
      }
      
      if(i > 30){
        clearInterval(myTimer);
        this.total = num + num2;
        a.results.text(this.total);
        //a.results.hide();
        a.results.effect( "bounce", { times: 3 }, "slow" );
        console.log(this.total);
      }
      i++;
    }

        
    

  }
}
