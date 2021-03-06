function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function nextRound(playerWinner, playerLoser){

  if(playerWinner == ""){
    if(randomIntFromInterval(1,2) == 1){
    leftDice.button.prop('disabled',true);
    rightDice.button.prop('disabled',false);
    }
    else{
      leftDice.button.prop('disabled',false);
      rightDice.button.prop('disabled',true);
    }
  }else{
    playerWinner.button.prop('disabled',false);
    playerLoser.button.prop('disabled',true);
  }
  fightRollCount = 0;
}

function fightRollFinished(player){

    console.log(player);
    console.log("rollcount:" + fightRollCount);
    
    if(fightRollCount == 2){
      showWinner();
      fightRollCount = 0;
    }else if(player == "left"){
      rightDice.button.prop('disabled',false);
    }else if(player == "right"){
      leftDice.button.prop('disabled',false);
    }
}

function staminaRollFinished(player){

    console.log(player);
    console.log("rollcount:" + fightRollCount);
    
    if(fightRollCount == 2){
      leftDice.setMode("strength");
      rightDice.setMode("strength");
      fightRollCount = 0;
    }
    if(player == "left"){
      rightDice.button.prop('disabled',false);
    }else if(player == "right"){
      leftDice.button.prop('disabled',false);
    }
}

function strengthRollFinished(player){

    console.log(player);
    console.log("rollcount:" + fightRollCount);
    
    if(fightRollCount == 2){
      leftDice.setMode("fight");
      rightDice.setMode("fight");
      fightRollCount = 0;
    }
    if(player == "left"){
      rightDice.button.prop('disabled',false);
    }else if(player == "right"){
      leftDice.button.prop('disabled',false);
    }
}

function showWinner()
{
  console.log("left: "+leftPlayer.total);
  console.log("right: "+rightPlayer.total);

  if(leftDice.total > rightDice.total){
    rightPlayer.stamina.text(rightPlayer.stamina.text()-2);
    nextRound(leftDice,rightDice);
  }else if(rightDice.total > leftDice.total){
    leftPlayer.stamina.text(leftPlayer.stamina.text()-2);
    nextRound(rightDice,leftDice);
  }else
  {
    nextRound("","");
  }


}

/*
jQuery-Rotate-Plugin v0.2 by anatol.at
http://jsfiddle.net/Anatol/T6kDR/
*/
$.fn.rotate=function(options) {
  var $this=$(this), prefixes, opts, wait4css=0;
  prefixes=['-Webkit-', '-Moz-', '-O-', '-ms-', ''];
  opts=$.extend({
    startDeg: false,
    endDeg: 360,
    duration: 1,
    count: 1,
    easing: 'linear',
    animate: {},
    forceJS: false
  }, options);

  function supports(prop) {
    var can=false, style=document.createElement('div').style;
    $.each(prefixes, function(i, prefix) {
      if (style[prefix.replace(/\-/g, '')+prop]==='') {
        can=true;
      }
    });
    return can;
  }

  function prefixed(prop, value) {
    var css={};
    if (!supports.transform) {
      return css;
    }
    $.each(prefixes, function(i, prefix) {
      css[prefix.toLowerCase()+prop]=value || '';
    });
    return css;
  }

  function generateFilter(deg) {
    var rot, cos, sin, matrix;
    if (supports.transform) {
      return '';
    }
    rot=deg>=0 ? Math.PI*deg/180 : Math.PI*(360+deg)/180;
    cos=Math.cos(rot);
    sin=Math.sin(rot);
    matrix='M11='+cos+',M12='+(-sin)+',M21='+sin+',M22='+cos+',SizingMethod="auto expand"';
    return 'progid:DXImageTransform.Microsoft.Matrix('+matrix+')';
  }

  supports.transform=supports('Transform');
  supports.transition=supports('Transition');

  opts.endDeg*=opts.count;
  opts.duration*=opts.count;

  if (supports.transition && !opts.forceJS) { // CSS-Transition
    if ((/Firefox/).test(navigator.userAgent)) {
      wait4css=(!options||!options.animate)&&(opts.startDeg===false||opts.startDeg>=0)?0:25;
    }
    $this.queue(function(next) {
      if (opts.startDeg!==false) {
        $this.css(prefixed('transform', 'rotate('+opts.startDeg+'deg)'));
      }
      setTimeout(function() {
        $this
          .css(prefixed('transition', 'all '+opts.duration+'s '+opts.easing))
          .css(prefixed('transform', 'rotate('+opts.endDeg+'deg)'))
          .css(opts.animate);
      }, wait4css);

      setTimeout(function() {
        $this.css(prefixed('transition'));
        if (!opts.persist) {
          $this.css(prefixed('transform'));
        }
        next();
      }, (opts.duration*1000)-wait4css);
    });

  } else { // JavaScript-Animation + filter
    if (opts.startDeg===false) {
      opts.startDeg=$this.data('rotated') || 0;
    }
    opts.animate.perc=100;

    $this.animate(opts.animate, {
      duration: opts.duration*1000,
      easing: $.easing[opts.easing] ? opts.easing : '',
      step: function(perc, fx) {
        var deg;
        if (fx.prop==='perc') {
          deg=opts.startDeg+(opts.endDeg-opts.startDeg)*perc/100;
          $this
            .css(prefixed('transform', 'rotate('+deg+'deg)'))
            .css('filter', generateFilter(deg));
        }
      },
      complete: function() {
        if (opts.persist) {
          while (opts.endDeg>=360) {
            opts.endDeg-=360;
          }
        } else {
          opts.endDeg=0;
          $this.css(prefixed('transform'));
        }
        $this.css('perc', 0).data('rotated', opts.endDeg);
      }
    });
  }

  return $this;
};