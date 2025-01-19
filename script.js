console.log("Enjoy the day with music");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let nextButton = document.getElementById('next'); // Next song button
let prevButton = document.getElementById('prev'); // Previous song button
let currentTimeDisplay = document.getElementById('currentTime'); // Current time display
let durationDisplay = document.getElementById('duration'); // Total duration display

let songs = [
    { songName: "Kollagottey", filePath: "songs/1.mp3", coverPath: "covers/cover1.png" },
    { songName: "Tere-Bina", filePath: "songs/2.mp3", coverPath: "covers/cover2.png" },
    { songName: "Nijame ne chebutunna", filePath: "songs/3.mp3", coverPath: "covers/cover3.png" },
    { songName: "Mumbai motam manake", filePath: "songs/4.mp3", coverPath: "covers/cover4.png" },
    { songName: "Dhak-Dhak", filePath: "songs/5.mp3", coverPath: "covers/cover5.png" },
    { songName: "My Love is Gone", filePath: "songs/6.mp3", coverPath: "covers/cover6.png" },
    { songName: "Undiporaadhey", filePath: "songs/7.mp3", coverPath: "covers/cover7.png" },
];

// Update song items with details
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Play or pause song
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Update progress bar on time update
audioElement.addEventListener('timeupdate', () => {
    if (audioElement.duration) {
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;

        // Update current time display
        currentTimeDisplay.textContent = formatTime(audioElement.currentTime);
    }
});

// Seek to a specific part of the song
myProgressBar.addEventListener('input', () => {
    if (audioElement.duration) {
        audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
    }
});

// Play a specific song when clicking on a song item
songItems.forEach((element, index) => {
    element.addEventListener('click', () => {
        songIndex = index;
        playSong();
    });
});

// Play next song
nextButton.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length; // Loop back to first song
    playSong();
});

// Play previous song
prevButton.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length; // Loop back to last song
    playSong();
});

// Play the current song
function playSong() {
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;

    // Update duration display
    audioElement.addEventListener('loadedmetadata', () => {
        durationDisplay.textContent = formatTime(audioElement.duration);
    });
}

// Format time in mm:ss format
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Play next song automatically when current song ends
audioElement.addEventListener('ended', () => {
    nextButton.click();
});