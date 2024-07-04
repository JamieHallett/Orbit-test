const sunY = 325;
let sunX = 225;
let right = 0;
let left = 0;
let up = 0;
let down = 0;
let squarevel = 5;
const thesquare = {
  elem : document.getElementById("square"),
  X : 0,
  Y : 0,
  radius : 10,
  Xvel : 0,
  Yvel : 0,
  Xaccel : 0,
  Yaccel : 0,
}
let mode = true;
let trail = false;
let projectileID = 0;
const projecRadius = 2.5;

function squareleft(v) {
  thesquare.X -= v; //moves square left
  square.style.left = thesquare.X - thesquare.radius + "px";
}

function squareright(v) {
  thesquare.X += v; //moves square right
  square.style.left = thesquare.X - thesquare.radius + "px";
}

function squareup(v) {
  thesquare.Y -= v; //moves square up
  square.style.top = thesquare.Y - thesquare.radius + "px";
}

function squaredown(v) {
  thesquare.Y += v; //moves square down
  square.style.top = thesquare.Y - thesquare.radius + "px";
}

const slider = document.getElementById("myRange");
const output = document.getElementById("slidervalue");

output.innerHTML = slider.value; // Display the default slider value
//squaresize = slider.value / 5;

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
  sun.style.left = this.value -25 + "px";
  sunX = this.value;
  //square.style.width = this.value + "px";
  //squaresize = this.value / 5;
}

// Add event listener on keydown
document.addEventListener('keydown', (event) => {
  const name = event.key;
  // const code = event.code;
  // Alert the key name and key code on keydown
  // alert(`Key pressed ${name} \r\n Key code value: ${code}`);

  if (name.toLowerCase() == "a") {
    left = 1;
  }
  if (name.toLowerCase() == "d") {
    right = 1;
  }
  if (name.toLowerCase() == "w") {
    up = 1;
  }
  if (name.toLowerCase() == "s") {
    down = 1;
  }
  if (name.toLowerCase() == " ") {
    jump();
  }

}, false);

document.addEventListener('keyup', (event) => {
  const name = event.key;

  if (name.toLowerCase() == "a") {
    left = 0;
  }
  if (name.toLowerCase() == "d") {
    right = 0;
  }
  if (name.toLowerCase() == "w") {
    up = 0; 
  }
  if (name.toLowerCase() == "s") {
    down = 0;
  }
  if (name.toLowerCase() == "b") {
    makeprojectile()
  }

}, false);

function stuff() {
  movement();
  //projectilemove();
  if (mode) {
    gravity();
  }
  if (false && trail) {
    makeprojectile();
  }
}
function gravity(obj = thesquare) { 
  //applies gravity to thesquare by default
  const Xdist = sunX - obj.X;
  const Ydist = sunY - obj.Y;
  const dist = Math.sqrt(Ydist * Ydist + Xdist * Xdist);
  
  const sin_theta = Ydist / dist;
  const cos_theta = Xdist / dist;
  
  obj.Yaccel = 100 * sin_theta / Math.pow(dist, 2);
  obj.Xaccel = 100 * cos_theta / Math.pow(dist, 2);
  obj.Yvel += obj.Yaccel;
  obj.Xvel += obj.Xaccel;
  
  squaredown(obj.Yvel);
  squareright(obj.Xvel);
}

function movement() { // there may be an easier way to do this
  if (!mode) {
    if (right == 1) {
      squareright(squarevel);
    }
    if (left == 1) {
      squareleft(squarevel);
    }
    if (up == 1) {
      squareup(squarevel);
    }
    if (down == 1) {
      squaredown(squarevel);
    }
  }

}

function removsquare() {
  const elmnt = document.getElementById("othersquare");
  elmnt.remove();
}

function removTrail() {
  const elmnts = document.getElementById("trailcontainer").childNodes;
  const len = elmnts.length;
  for (let i = 0; i < len; i++) {
    //console.log(elmnts[0]);
    elmnts[0].remove();
    
    // turns out HTMLCollections and NodeLists automatically update when you add or remove elements
    // this requires me to set the length in a constant
    // so that it doesn't change, which would cause the loop to break exactly halfway through, which it used to do
    // I also had to remove element 0, not i, from the collection - otherwise it would delete elements in an alternating pattern, which it used to do
  }
}

function makeTrail() {
  projectileID ++;
  const projectile = document.createElement("div");
  projectile.className = "trailelem";
  projectile.id = projectileID
  projectile.style.left = thesquare.X - projecRadius + "px";
  projectile.style.top = thesquare.Y - projecRadius + "px";
  document.getElementById("trailcontainer").appendChild(projectile);
}

function projectilemove() {
  const projectiles = document.getElementById("projectilecontainer").childNodes;
  for (let i = 0; i < projectiles.length; i++) {
    const projectile = projectiles[i];
    //console.log(projectile.style.left.slice(0, -2));
    projectile.style.left = (Number(projectile.style.left.slice(0,-2)) + 10) + "px";
    //projectile.style.top = Number(projectile.style.top) + 10 + "px";
  }
}

function updateStats() {
  document.getElementById("stats").innerHTML = "squareX: " + thesquare.X + "<br>squareY: " + thesquare.Y + "<br>squareXvel: " + thesquare.Xvel + "<br>squareYvel: " + thesquare.Yvel + "<br>Xaccel: " + thesquare.Xaccel*100 + "<br>Yaccel: " + thesquare.Yaccel*100 + "<br>trail: " + trail + "<br>mode: " + mode + "<br>nothing: " + null ;
}

function lowfreqstuff() {
  if (trail) {
    makeTrail();
    //console.log("eeee")
  }
  updateStats();
}

setInterval(stuff, 10);
setInterval(lowfreqstuff, 100)
