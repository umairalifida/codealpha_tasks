# 🎵 JavaScript Music Player

A responsive music player built using **HTML, CSS, and vanilla JavaScript**.

The project uses the **HTML5 Audio API** to provide playback controls, progress tracking, volume control, playlist functionality, and automatic song switching.

## ✨ Features

* ▶️ Play / Pause
* ⏮ Previous song
* ⏭ Next song
* 🎵 Song title display
* 👤 Artist information
* ⏱ Current playback time
* ⏱ Total song duration
* 📊 Interactive progress bar
* 🔊 Volume control
* 📋 Dynamic playlist
* Active song indicator
* Automatic next-song playback
* Responsive design
* Smooth UI transitions

## 🎧 Audio Controls

| Control       | Function          |
| ------------- | ----------------- |
| ▶             | Play              |
| ⏸             | Pause             |
| ⏮             | Previous          |
| ⏭             | Next              |
| Progress bar  | Seek through song |
| Volume slider | Adjust volume     |

## 🛠️ Technologies

* HTML5
* CSS3
* JavaScript
* HTML5 Audio API
* DOM Manipulation

## 🎯 JavaScript Concepts

This project practices:

* JavaScript objects
* Arrays
* Functions
* DOM manipulation
* Event listeners
* Audio API
* Dynamic element creation
* `timeupdate`
* `loadedmetadata`
* `ended`
* Audio progress tracking

## 📂 Project Structure

```text
Music-Player/
│
├── index.html
├── style.css
└── script.js
```

## 🎵 Adding Songs

Songs can be added through the `songs` array:

```javascript
const songs = [

    {
        title: "Song Title",
        artist: "Artist Name",
        src: "audio-url.mp3",
        cover: "cover-image.jpg"
    }

];
```


## 📱 Responsive Design

The player is optimized for:

* Desktop
* Tablet
* Mobile

## 🔮 Future Improvements

* Shuffle mode
* Repeat mode
* Favorite songs
* Search playlist
* Lyrics support
* Multiple playlists
* Music visualizer
* Keyboard media controls
* Persistent playback using localStorage

## 👨‍💻 Author

**Umair Ali Fida**

Frontend Developer

## 📄 License

Created for learning and educational purposes.
