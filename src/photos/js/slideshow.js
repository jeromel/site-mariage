const slideshow = document.getElementById('slideshow');
const container = document.getElementById('main');
const image = document.getElementById('image');
const imageCache1 = document.getElementById('image-cache1');
const imageCache2 = document.getElementById('image-cache2');
const imageCache3 = document.getElementById('image-cache3');
const imageCache4 = document.getElementById('image-cache4');
const imageCache5 = document.getElementById('image-cache5');

const prevButton = document.getElementById('prevButton');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const nextButton = document.getElementById('nextButton');
const fullscreenButton = document.getElementById('fullscreenButton');

const imageFolder = 'pictures/';
let currentImageIndex = 1;
let isPlaying = false;
let interval;

function loadCaches(index) {
  if (index < numImages-5) {
    imageCache1.src = `${imageFolder}picture${index+1}.jpg`;

    imageCache1.onload = function () {};

  }
}

function loadImage(index) {
  image.src = `${imageFolder}picture${index}.jpg`;
  loadCaches(index);
  image.onload = function() {
    const ratio = image.naturalHeight/image.naturalWidth;

    if (image.naturalWidth < image.naturalHeight) {
      setPortrait(image);
    } else {


      if (ratio >= 0.66 && ratio < 0.75) {
        setLandscape(image);
      }
      else if (ratio >= 0.75) {
        setSquare(image);
      } 
      else {
        setPanoramic(image);
      }
    }
  };
}

function removeImageStyles(image) {
  image.classList.remove('portrait');
  image.classList.remove('landscape');
  image.classList.remove('panoramic');
  image.classList.remove('square');
}

function setSquare(image) {
  removeImageStyles(image);

  image.classList.add('square');
}

function setPanoramic(image) {
  removeImageStyles(image);

  image.classList.add('panoramic');
}

function setLandscape(image) {
  removeImageStyles(image);

  image.classList.add('landscape');
}

function setPortrait(image) {
  removeImageStyles(image);

  image.classList.add('portrait');
}

function nextImage() {
  currentImageIndex++;
  if (currentImageIndex > numImages) {
    currentImageIndex = 1;
  }
  loadImage(currentImageIndex);
}

function prevImage() {
  currentImageIndex--;
  if (currentImageIndex < 1) {
    currentImageIndex = numImages;
  }
  loadImage(currentImageIndex);
}

function togglePlay() {
  if (isPlaying) {
    clearInterval(interval);
    isPlaying = false;
    document.getElementById('playIcon').style.display = 'inline';
    document.getElementById('pauseIcon').style.display = 'none';
  } else {
    interval = setInterval(nextImage, 2000);
    isPlaying = true;
    document.getElementById('playIcon').style.display = 'none';
    document.getElementById('pauseIcon').style.display = 'inline';  
  }
}

function setButtonGroupLight() {
  const buttonGroup = document.querySelector('.btn-group');

  buttonGroup.querySelectorAll('.btn').forEach(button => {
    button.classList.remove('btn-dark');
    button.classList.add('btn-secondary');
  });
}

function setButtonGroupDark() {
  const buttonGroup = document.querySelector('.btn-group');

  buttonGroup.querySelectorAll('.btn').forEach(button => {
    button.classList.remove('btn-secondary');
    button.classList.add('btn-dark');
  });
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();

    onExitFullscreen();
  } else {
    
    enterFullscreen();
  }
}

function enterFullscreen() {
  slideshow.requestFullscreen();
  setButtonGroupDark();
}

function onExitFullscreen() {
  setButtonGroupLight();   
}

window.addEventListener('resize', function handleResize(event) {
  if (window.innerHeight >= screen.height-10) {
      enterFullscreen();
  } else {
      onExitFullscreen();
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && document.fullscreenElement) {
    // L'utilisateur a appuyé sur la touche "Escape" en mode plein écran
    document.exitFullscreen(); 
  }
  else if (event.key == "" || event.key == "Space" || event.keyCode == 32) {
    togglePlay(); 
  }
  else if (event.key === 'ArrowLeft') {
    prevImage();
  } else if (event.key === 'ArrowRight') {
    nextImage();
  }
});

function onFullscreenButtonClick() {
  toggleFullscreen();
}

playButton.addEventListener('click', togglePlay);
nextButton.addEventListener('click', nextImage);
prevButton.addEventListener('click', prevImage);
fullscreenButton.addEventListener('click', onFullscreenButtonClick);

const numImages = 684; // Change this to the number of images in your folder
loadImage(currentImageIndex);
