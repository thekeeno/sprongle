

// premultiplier parameters

let d_mul;
let p_mul;
let f_mul;

let harmType;



//empty arrays for the generated parameters

let f = [];
let d = [];
let p = [];

//integer selector parameters

let stroke_type = 0;


//time parameters


let t_max;
let i_max;
let s_step;
let s_init;
let s;
let points;
let t_offset;

//visual parameters
let zoom = 0.25;
let fps = 60;

let show_end_dots;

let colPeriod;

// meta parameters

let metaPoints =[];
let meta_i = 0;

function setup() {

  d_mul = 0.005; //premultiplier for decay type vars
  p_mul = PI; //premultiplier for angle-like vars  
  f_mul = 1; //premultiplier for frequency-like vars


  s_step = 0.001
  s_init = 0.95;
  s = s_init;
  t_max = 40;
  i_max = 1000;
  generateParameters();
  frameRate(fps);
  createCanvas(700,700);

}



function draw() {
  clear()
  background(0);

  //generateParameters();

  points = generateHarm();
  metaPoints[meta_i] = points[1];
  
  drawHarm(points,'green');
  drawLabel();
  //drawHarm(metaPoints,'white');
  
  //drawLines();
  //drawEllipses();

  s += s_step;
  f[0] +=0.0001;
  f[1] -=0.0002;
  t_offset += 0.05
  meta_i++;

}

function mouseClicked() {
  generateParameters();

}

function drawLabel(){
  fill('white');

  textSize(20);
  if(stroke_type == 5){
    text('haha gay sprongle🥺', 10, 30);
  }
  else{
    text('haha sprongle', 10, 30);
  }
  
  text('click for another s̴̡̞͍̻͔̥͇̳̞̼̞̱͍͛̓̏̈́̽͐̔͊̉͗͐͝ͅp̸͍̺̟̮̗̤̀̀̎͒̌̋̀̓̾͊̓̆͝͝͝ř̶̨̨̛̹̠͉͈̙̳̼̦̳̬̤̼͌̓̂͆͂ͅo̵̮̹̹̰̞̅̓͌̇͆̑n̶͎̗̭̖̎̀͑͒̅̔́̾͒̀͜g̵̮̼̟̼̲̝̘̻̻̳͓̱̯̠͊̾͜͠ļ̶̢̡̞͉͎̟̬̦̞͚̘͆̍e̶̠̯̺̰̅̾̏̋̾̆̽̌̇̽', 10, height- 60);
}

function generateHarm(){ //generate all the points in the harmograph
  let pts = [];
  for(let i = 0; i<i_max;i++){
    pts[i] = [];
    for(let dim = 0; dim<3; dim++){
      let t = t_offset + i*t_max/i_max;
      if(harmType){ //multiply two harms
        pts[i][dim] = 2*harmFunc(t,d[dim+3],f[dim+3],p[dim+3])*harmFunc(t,d[dim],f[dim],p[dim]);
      }
      else{//add two harms
        pts[i][dim] = harmFunc(t,d[dim+3],f[dim+3],p[dim+3])+harmFunc(t,d[dim],f[dim],p[dim]);
      }
      
    }

  }
  return pts;
}

function drawHarm(data, mono_colour){ //draws the stuff you give it
  //stroke(mono_colour);
 // draw lines
 
  let x1;
  let x2;
  let y1;
  let y2;
  let z1;
  let z2;
  for(let i = 0; i<(data.length -1);i++){
    fill('white');
    //x1 = data[i][0];
    //y1 = data[i][1];
    //z1 = data[i][2];
    //x2 = data[i+1][0];
    //y2 = data[i+1][1];
    //z2 = data[i+1][2];
    //stroke_type = 5;
    switch(stroke_type){
      case 0: //white to grey
        stroke(100+200*data[i][2]);
        break;

      case 1: //green
        stroke('green');
        break;

      case 2:
        stroke(300-300*data[i][2],300*data[i][2],300*data[i][2]);
        break;

      case 3: 
        stroke(300*data[i][2],300-300*data[i][2],300*data[i][2]);
        break;

      case 4: //shimmer? this does not work now.
        stroke(3*(i%100));
        break;

      case 5: //colour shimmer
        
        stroke(hslToRgb((i%colPeriod)/colPeriod,1,0.5));
        break;


      

    }
    line(rescaleX(data[i][0]),rescaleY(data[i][1]),rescaleX(data[i+1][0]),rescaleY(data[i+1][1]));

    
    
    //line(200,300,400,500);
    //console.log(x1);

  }
  if (show_end_dots){
    ellipse(rescaleX(data[0][0]), rescaleY(data[0][1]), 7);
    ellipse(rescaleX(data[data.length-1][0]), rescaleY(data[data.length-1][1]), 7);
  }
    stroke(mono_colour);
  
  

}




function generateParameters() { //generate a new set of 6x3 random parameters
  for(let i = 0; i <6; i++){
    d[i] = d_mul*random()
    p[i] = p_mul*random()
    f[i] = f_mul*(random([2,3]) + 0.1*random());
  }

  stroke_type = int(random(6));
  t_offset = 0;
  colPeriod = 10+random(100); //colour period for rainbow etc
  show_end_dots = int(random(2));
  harmType = int(random(2));
}

function harmFunc(tt,dd,ff,pp){// generic single decaying harmonic function
  return exp(-dd*tt)*sin(tt*ff+pp);
}

function rescaleX(x){
  return width*(0.5 + zoom*x);
}

function rescaleY(y){
  return height*(0.5 + zoom*y);
}



/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}