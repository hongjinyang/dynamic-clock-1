function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  strokeCap(ROUND);
}

function draw() {
  background(0);
  translate(width/2, height/2);
  let r1 = 175; // set the radius for seconds
  let r2 = 100; // set the radius for minutes
  
  // set up the starting and stop angle
  let startAngle = -90;
  let stopAngle = 270;

  // Draw the smoothSecond line
  push();
  let angle = map(minute(), 0, 60, startAngle, stopAngle);
  rotate(angle-90);
  for (i = 0; i < smoothSecond(); i++) {
    let sec_angle1 = map(smoothSecond(), 0, 60, -90, 90);
    let sec_angle2 = map(smoothSecond(), 0, 60, 90, 270);

    let sec_x1 = cos(sec_angle1) * r1;
    let sec_y1 = sin(sec_angle1) * r1;
    let sec_x2 = cos(sec_angle2) * r1;
    let sec_y2 = sin(sec_angle2) * r1;

    stroke(10+ i * 5);
    noFill()
    line(0, r1, sec_x1, sec_y1);
    stroke(10+ i * 5);
    noFill()
    line(0, -r1, sec_x2, sec_y2);
  }
  pop();
  
  push();
  let angle2 = map(minute(), 0, 60, startAngle, stopAngle);
  rotate(angle2-90);
  // Draw the complete smoothSecond line in 60s
  for (j = 0; j < smoothSecond(); j++) {
    let sec_angle1 = map(j, 0, 60, -90, 90);
    let sec_angle2 = map(j, 0, 60, 90, 270);

    let sec_x1 = cos(sec_angle1) * r1;
    let sec_y1 = sin(sec_angle1) * r1;
    let sec_x2 = cos(sec_angle2) * r1;
    let sec_y2 = sin(sec_angle2) * r1;
    
    stroke(10+ j * 5);
    noFill()
    line(0, r1, sec_x1, sec_y1);
    stroke(10+ j * 5);
    noFill()
    line(0, -r1, sec_x2, sec_y2);
  }
  pop();

  //push();
  //let angle = map(minute(), 0, 60, startAngle, stopAngle);
  //rotate(angle + 90);  // start on the minute position
  //stroke(255);
  //line(-100, 0, 100, 0);  // arbitrarily large
  //let each = 3;  // each step is 1/120th of the circle
  //for (let i = 0; i < second(); i++) {
  //  rotate(each);
  //  line(-100, 0, 100, 0);
  //}
  //pop();
  
  push();
  let angle3 = map(twelveHour(), 0, 12, startAngle, stopAngle);
  rotate(angle3-90);
  for (k = 0; k < smoothSecond(); k++) {
    let min_angle1 = map(k, 0, 60, -90, 90);
    let min_angle2 = map(k, 0, 60, 90, 270);

    let min_x1 = cos(min_angle1) * r2;
    let min_y1 = sin(min_angle1) * r2;
    let min_x2 = cos(min_angle2) * r2;
    let min_y2 = sin(min_angle2) * r2;

    stroke(130 - k * 5);
    noFill();
    strokeWeight(1);
    line(0, 0, min_x1, min_y1);
    stroke(200 - k * 5);
    noFill();
    strokeWeight(1);
    line(0, 0, min_x2, min_y2);
  }
  pop();
  
  push();
  let angle4 = map(twelveHour(), 0, 12, startAngle, stopAngle);
  rotate(angle4-90);
  for (l = 0; l < smoothSecond(); l++) {
    let min_angle1 = map(smoothSecond(), 0, 60, -90, 90);
    let min_angle2 = map(smoothSecond(), 0, 60, 90, 270);

    let min_x1 = cos(min_angle1) * r2;
    let min_y1 = sin(min_angle1) * r2;
    let min_x2 = cos(min_angle2) * r2;
    let min_y2 = sin(min_angle2) * r2;
    
    stroke(130 - l * 5);
    noFill();
    strokeWeight(1);
    line(0, 0, min_x1, min_y1);
    stroke(200 - l * 5);
    noFill();
    strokeWeight(1);
    line(0, 0, min_x2, min_y2);
  }
  stroke(220);
  strokeWeight(5);
  line(0, r2/7*4, 0, 0);
  pop();
  
  push();
  let angle5 = map(minute(), 0, 60, startAngle, stopAngle);
  rotate(angle5-90);
  stroke(220);
  strokeWeight(2.5);
  line(0, r2, 0, 0);
  pop();
  
  ////Draw ring of hour
  //let hourAngle = map(hour() % 12, 0, 12, -90, 270);
  //fill(220);
  //noStroke();
  //ellipse(0, 0, 5, 5);
  
  fill(255, 20);
  noStroke();
  ellipse(0, 0, r2*2, r2*2);
  
}

let prevSecond;
let millisOffset;

function smoothSecond() {
  let s = second();
  if (s != prevSecond) {
    millisOffset = millis();
    prevSecond = s;
  }
  let m = millis() - millisOffset;
  return s + (m / 1000.0);
}

// return hours that read 1 through 12 rather than 0 through 23
function twelveHour() {
  let h = hour() % 12;
  if (h === 0) {
    h = 12;
  }
  return h;
}
