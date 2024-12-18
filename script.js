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
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Start the press simulation
startButton.addEventListener('click', () => {
    pressing = true;
    pressHeight = 0; // Reset press height
    requestAnimationFrame(pressSimulator);
});

// Hydraulic press simulation
function pressSimulator() {
    if (pressing && pressHeight < canvas.height / 2) {
        pressHeight += 2; // Move press down
        draw();
        requestAnimationFrame(pressSimulator); // Continue animation
    } else {
        if (pressHeight >= canvas.height / 2) {
            alert('Mascot pressed!');
        }
    }
}

// Draw function to render the press and image
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    // Draw the hydraulic press
    ctx.fillStyle = 'red';
    ctx.fillRect(0, pressHeight, canvas.width, 50);

    if (mascotImage) {
        let imgWidth = mascotImage.width;
        let imgHeight = mascotImage.height;
        let imgX = (canvas.width - imgWidth) / 2; // Center the image horizontally
        let imgY = (canvas.height - imgHeight) / 2;

        // Check if press collides with the image
        if (pressHeight + 50 >= imgY && pressHeight + 50 <= imgY + imgHeight) {
            console.log('Mascot is being pressed!');
        }

        // Draw the mascot image
        ctx.drawImage(mascotImage, imgX, imgY);
    }
}
