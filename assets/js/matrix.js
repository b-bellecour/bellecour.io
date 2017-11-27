//matrix

// Get canvas
var cvs = document.getElementById('cvs');

// Canvas fills window
cvs.height = window.innerHeight;
cvs.width = window.innerWidth;

// Get canvas context
var ctx = cvs.getContext('2d');

// Set font, size & number of columns
var font = 'arial';
var fontSize = 14;
ctx.font = fontSize + 'px ' + font;
var cols = cvs.width / fontSize;

// Characters
var charSet;
charSet = '0123456789ABCDEF脆弱性%$カタカナ文字化け'; // Hex
charSet = charSet.split(''); // Convert string to array

// One drop per column, row set randomly
var drops = [];
for (var col = 0; col < cols; col++)
  drops[col] = Math.floor(Math.random() * cvs.height);

// Call rain() every 25ms
setInterval(rain, 50);

function rain() {
  // Background, black, translucent
  /* This is key to the fade effect, clear the window with an alpha of 0.05, which doesn't clear it entirely but leaves existing text progressively dimmed with each subsequent call to rain()
   */
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  
  // For each column / drop
  for (var col = 0; col < drops.length; col++) {
    // Pick a random char
    var char = charSet[Math.floor(Math.random() * charSet.length)];
    // Pick a random colour
    ctx.fillStyle = randColour();
    // Draw the char
    ctx.fillText(char, col * fontSize, drops[col] * fontSize);
    // Randomly reset drop back to top row
    if (Math.random() > 0.99)
      drops[col] = 0;

    drops[col]++; // Move drop down a row
  }
}

function randColour()
{
  return'rgb(' + 
    Math.floor(Math.random() * 10000) + ',' + 
    Math.floor(Math.random() * 5000) + ',' + 
    Math.floor(Math.random() * 10000) + ')';
}

//hider

$(document).on("click", function(e){
    if($(e.target).is("#unhide")){
      $("#hide").show();
    }
});

//smooth scroll


