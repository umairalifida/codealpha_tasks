// =====================================
// SONG DATA
// =====================================

const songs = [
  {
    title: "SoundHelix Song 1",
    artist: "SoundHelix",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
  },

  {
    title: "SoundHelix Song 2",
    artist: "SoundHelix",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
  },

  {
    title: "SoundHelix Song 3",
    artist: "SoundHelix",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80",
  },
];
const audio = document.getElementById("audio");

const playButton = document.getElementById("play");

const prevButton = document.getElementById("prev");

const nextButton = document.getElementById("next");

const progress = document.getElementById("progress");

const volume = document.getElementById("volume");

const currentTime = document.getElementById("current-time");

const duration = document.getElementById("duration");

const songTitle = document.getElementById("song-title");

const artist = document.getElementById("artist");

const cover = document.getElementById("cover");

const playlist = document.getElementById("playlist");

const albumArt = document.querySelector(".album-art");

let songIndex = 0;

function loadSong(index) {
  const song = songs[index];

  songTitle.textContent = song.title;

  artist.textContent = song.artist;

  cover.src = song.cover;

  audio.src = song.src;

  updatePlaylist();
}

// =====================================
// PLAY SONG
// =====================================

function playSong() {
  audio.play();

  playButton.textContent = "⏸";

  albumArt.classList.add("playing");
}

// =====================================
// PAUSE SONG
// =====================================

function pauseSong() {
  audio.pause();

  playButton.textContent = "▶";

  albumArt.classList.remove("playing");
}

playButton.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

// =====================================
// NEXT
// =====================================

function nextSong() {
  songIndex++;

  if (songIndex >= songs.length) {
    songIndex = 0;
  }

  loadSong(songIndex);

  playSong();
}

nextButton.addEventListener("click", nextSong);

function previousSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songIndex);

  playSong();
}

prevButton.addEventListener("click", previousSong);

// =====================================
// PROGRESS UPDATE
// =====================================

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) {
    return;
  }

  const percent = (audio.currentTime / audio.duration) * 100;

  progress.value = percent;

  currentTime.textContent = formatTime(audio.currentTime);
});

// =====================================
// LOAD DURATION
// =====================================

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(audio.duration);
});

// =====================================
// CHANGE PROGRESS
// =====================================

progress.addEventListener("input", () => {
  if (!audio.duration) {
    return;
  }

  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

function formatTime(seconds) {
  if (isNaN(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = Math.floor(seconds % 60);

  return minutes + ":" + remainingSeconds.toString().padStart(2, "0");
}

// =====================================
// AUTOPLAY NEXT SONG
// =====================================

audio.addEventListener("ended", () => {
  nextSong();
});

function createPlaylist() {
  playlist.innerHTML = "";

  songs.forEach((song, index) => {
    const item = document.createElement("div");

    item.classList.add("playlist-song");

    item.innerHTML = `

                <span class="playlist-number">
                    ${index + 1}
                </span>

                <div class="playlist-info">

                    <div class="playlist-title">
                        ${song.title}
                    </div>

                    <div class="playlist-artist">
                        ${song.artist}
                    </div>

                </div>

            `;

    item.addEventListener("click", () => {
      songIndex = index;

      loadSong(songIndex);

      playSong();
    });

    playlist.appendChild(item);
  });
}

function updatePlaylist() {
  const items = document.querySelectorAll(".playlist-song");

  items.forEach((item, index) => {
    item.classList.toggle("active", index === songIndex);
  });
}

createPlaylist();

loadSong(songIndex);

audio.volume = 1;