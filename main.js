const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load images
// // const enemy2 = new Image();
// enemy2.src = 'virus.png'
let carImage = new Image();
carImage.src = 'dogeKecil.png';
const backgroundImage = new Image();
backgroundImage.src = 'bgAlien.jpg';

// doge object
let car = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    width: 150,
    height: 100,
    speed: 4
};
// Draw car
function drawCar() {
    ctx.drawImage(carImage, car.x, car.y, car.width, car.height);
}


// Draw background
function drawBackground() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

// Clear canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
// Update game state
function update() {
    clearCanvas();
    drawBackground();
    drawCar();
    drawOtherCars();
    updateOtherCars();
    detectCollision();
    drawScore();
    suara.play();
    
    
    // backgroundY += 5; 
    // Perbarui posisi latar belakang
    // Menggerakkan latar belakang ke bawah
    if (backgroundY >= canvas.height) {
        backgroundY = 0; // Mengatur ulang posisi latar belakang jika sudah mencapai batas bawah canvas
    }
}





let sound = new Audio('horn.mp3')

function horn(){
  sound.play();
  sound.playbackRate = 1.5
  sound.volume = 0.5
}

let suara = new Audio('backsound.mp3')
suara.volume = 1


let lose = new Audio('gameOver.mp3')
lose.playbackRate = 1

let coin = new Audio('coin.mp3')
coin.playbackRate = 2

let ledak = new Image('ledakan.png')

let score = 0;
let highScore = 0;


// Fungsi untuk menampilkan skor
function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "35px Arial";
    ctx.fillText("Score: " + score, 1, 60);
    ctx.fillText("High score: " + highScore, 5, 100);
}

// Fungsi untuk menambah skor
function increaseScore(nilai) {
    score += nilai;
    if (score > highScore) {
      highScore = score;
    } // Atur skor sesuai dengan preferensi Anda
}

function scoreMinus(nilai){
  score -= nilai;
  
}

 
// Fungsi untuk mereset skor
function resetScore() {
    score = 0;
}

function ubahObjek(oesan) {
    carImage.src = 'dogeBesar.png';
    car.width = 300;
    car.height = 120;
    
    // Mengganti objek atau gambar
}

function cekSkor() {
    if (score >= 5) {
        ubahObjek();
    }
}

function cekSkor2() {
    if (score < 10) {
        carImage.src = 'dogeKecil.png'
        
    }
}
// Variabel untuk menyimpan posisi vertikal latar belakang
let backgroundY = 0;

// Draw background
function drawBackground() {
    ctx.drawImage(backgroundImage, 0, backgroundY, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, backgroundY - canvas.height, canvas.width, canvas.height);
}

// Event listeners for car movement using buttons
document.getElementById('moveLeft').addEventListener('click', function() {
    if (car.x > 0) {
        car.x -= 100;
    }
});

document.getElementById('moveRight').addEventListener('click', function() {
    if (car.x < canvas.width - car.width) {
        car.x += 100;
    }
});

// Array untuk menyimpan mobil tambahan
const otherCars = [];

// Fungsi untuk membuat daging tambahan secara acak
function createOtherCar() {
  const objectType = Math.random() < .5 ? 'food' : 'enemy' ; // Pilih tipe objek secara acak
  const img = new Image();
  img.src = objectType === 'food' ? 'daging.png' : 'virus.png' ;

    const otherCar = {
        x: Math.random() * (canvas.width - 50), // Posisi x acak
          y: +50, // Mulai di atas canvas
          width: 70, // Lebar gambar
          height: 50, // Tinggi gambar
          speed: Math.random() * 3 + 2, // Kecepatan jatuh acak
          type: objectType, // Tipe objek: 'food' atau 'enemy'
          image: img
        
    };
    otherCars.push(otherCar);
}

// Fungsi untuk menggambar daging 
function drawOtherCars() {
  otherCars.forEach(function(otherCar) {
    ctx.drawImage(otherCar.image, otherCar.x, otherCar.y, otherCar.width, otherCar.height);
  });
}




// Fungsi untuk mengurangi score
function updateOtherCars() {
    otherCars.forEach(function(otherCar) {
        otherCar.y += otherCar.speed;
        if (otherCar.y > canvas.height) {
          
          
          
          
        }
    });
}


// Fungsi untuk mendeteksi tabrakan antara pemain dan objek jatuh

function detectCollision() {
  for (let i = 0; i < otherCars.length; i++) {
    const otherCar2 = otherCars[i];
    if (car.x < otherCar2.x + otherCar2.height &&
      car.x + car.height > otherCar2.x &&
      car.y < otherCar2.y + otherCar2.width &&
      car.y + car.height > otherCar2.y) {
      // Terjadi tabrakan
      if (otherCar2.type === 'enemy') {
        // Jika objek adalah musuh, game over
        lose.play();
        suara.pause();
        gameOver();
        resetScore();
        cekSkor2();
        resetGame();
        return; // Keluar dari fungsi setelah game over
      } else {
        otherCar2.type === 'food'
        coin.play();
        increaseScore(2);
        cekSkor();
        otherCars.splice(otherCars.indexOf(otherCar2), 1);
      }
      // Jika objek adalah makanan, score bertambah 
    }
  }
}




function gameOver() {
  cancelAnimationFrame(gameLoop); 
  // Hentikan loop animasi
 
    alert('Game Over!'); 
    
   // Tampilkan pesan game over
  // Anda bisa menambahkan logika lain untuk menangani game over, seperti restart game
}





// Fungsi untuk mereset game
function resetGame() {
  suara.currentTime = 0;
    // Reset posisi mobil utama
    car.x = canvas.width / 2 - car.width / 2;
    car.y = canvas.height - 100;
    // Hapus semua mobil tambahan
    otherCars.length = 0; 
}




// Membuat mobil tambahan secara acak setiap beberapa detik
setInterval(function() {
    createOtherCar();
}, 800);



suara.loop = true;


// Game loop
function gameLoop() {
    update();
    
    
    requestAnimationFrame(gameLoop);
    
}


// Start the game loop
 gameloop();
alert('kumpulkan score sebanyak 5 untuk upgrade doge')


// Optional: Add functionality to toggle sidebar
document.addEventListener("DOMContentLoaded", function() {
  const sidebar = document.querySelector('.sidebar');
  const content = document.querySelector('.content');

  sidebar.addEventListener('click', function() {
    sidebar.classList.toggle('active');
    content.classList.toggle('active');
  });
});

function closeSidebar() {
  
  const sidebar = document.getElementById("sidebar");
  const openBtn = document.getElementById("openBtn");
  
  
  sidebar.classList.add('closed');
  openBtn.style.display = 'block';
}

function openSidebar() {
  
  const sidebar = document.getElementById("sidebar");
  const openBtn = document.getElementById("openBtn");
  
  
  sidebar.style.display = 'block'
  sidebar.classList.remove('closed');
  openBtn.style.display = 'none'
  
}

function kirim(){
   const url = `https://wa.me/6285885497377?text=Halo, nama saya ${nama.value}, ${pesan.value}`
   
   window.open(url)
  }
