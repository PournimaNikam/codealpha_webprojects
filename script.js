// 🎧 Song Data
const songs = [
  { title: "Calm Inspiration", file: "songs/song1.mp3", cover: "images/cover.jpg" },
  { title: "Summer Pop", file: "songs/song2.mp3", cover: "images/cover.jpg" },
  { title: "Dreamscape Chill", file: "songs/song3.mp3", cover: "images/cover.jpg" },
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.getElementById("song-title");
const cover = document.getElementById("cover");
const currentTimeEl = document.getElementById("current");
const durationEl = document.getElementById("duration");
const playlistEl = document.getElementById("playlist");

let songIndex = 0;
let isPlaying = false;

// Load Song
function loadSong(song) {
  title.textContent = song.title;
  audio.src = song.file;
  cover.src = song.cover;
  updatePlaylistHighlight();
}
loadSong(songs[songIndex]);

// Play / Pause
function playSong() {
  isPlaying = true;
  playBtn.innerHTML = "<i class='bx bx-pause'></i>";
  audio.play();
}
function pauseSong() {
  isPlaying = false;
  playBtn.innerHTML = "<i class='bx bx-play'></i>";
  audio.pause();
}
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Next / Previous
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Progress Bar
audio.addEventListener("timeupdate", (e) => {
  const { currentTime, duration } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time) => {
    let mins = Math.floor(time / 60);
    let secs = Math.floor(time % 60);
    if (secs < 10) secs = `0${secs}`;
    return `${mins}:${secs}`;
  };
  currentTimeEl.textContent = formatTime(currentTime);
  if (duration) durationEl.textContent = formatTime(duration);
});

// Click progress bar to seek
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

// Auto next when song ends
audio.addEventListener("ended", nextSong);

// Playlist render
function renderPlaylist() {
  playlistEl.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${song.title} <i class='bx bx-music'></i>`;
    li.addEventListener("click", () => {
      songIndex = index;
      loadSong(song);
      playSong();
    });
    playlistEl.appendChild(li);
  });
}
renderPlaylist();

// Highlight current song
function updatePlaylistHighlight() {
  const items = playlistEl.querySelectorAll("li");
  items.forEach((item, index) => {
    item.classList.toggle("active", index === songIndex);
  });
}
