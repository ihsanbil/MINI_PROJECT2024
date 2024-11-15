const audioPlayer = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const seekBar = document.getElementById("seekBar");
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const albumArt = document.getElementById("albumArt");
const songTitle = document.getElementById("songTitle"); // Tambahkan elemen untuk judul lagu

let currentSongIndex = 0;

const songs = [
    { 
        src: "assets/music/Avenged Sevenfold - Dear God [Official Music Video].mp3", 
        albumArt: "assets/img/avenged sevenfold - dear god.jpeg",
        title: "Avenged Sevenfold - Dear God" // Tambahkan judul lagu
    },
    { 
        src: "assets/music/Taylor Swift - Love Story.mp3", 
        albumArt: "assets/img/taylor swift-love story.jpeg",
        title: "Taylor Swift - Love Story" // Tambahkan judul lagu
    },
    { 
        src: "assets/music/Titanic • My Heart Will Go On • Celine Dion.mp3",
        albumArt: "assets/img/celine dion - my heart wil go on.jpeg",
        title: "Titanic - My Heart Will Go On" // Tambahkan judul lagu
    }
];

function loadSong(index) {
    audioPlayer.src = songs[index].src;
    albumArt.src = songs[index].albumArt;
    songTitle.textContent = songs[index].title; // Update judul lagu
    audioPlayer.load();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    seekBar.value = 0;
    currentTimeDisplay.textContent = "0:00";
    durationDisplay.textContent = "0:00";
}

playPauseBtn.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audioPlayer.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

audioPlayer.addEventListener("timeupdate", () => {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;

    seekBar.value = (currentTime / duration) * 100;

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);

    currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    durationDisplay.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
});

seekBar.addEventListener("input", () => {
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (seekBar.value / 100) * duration;
});

nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
});

prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
});

loadSong(currentSongIndex);
