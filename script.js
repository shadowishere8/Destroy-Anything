let pressHeight = 0;
let pressing = false;
let mascotImage = null;
let canvas = document.getElementById('press-canvas');
let ctx = canvas.getContext('2d');
let startButton = document.getElementById('start-press');
let uploadButton = document.getElementById('image-upload');

canvas.width = 800;
canvas.height = 600;

// Load image when user uploads it
uploadButton.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            let img = new Image();
            img.onload = function() {
                mascotImage = img;
                draw();
            };
            img.src = e.target.resul
