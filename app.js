document.addEventListener("DOMContentLoaded", function(){
    const songs = [
        {title: "Style", file: "songs/style.mp3", image: "assets/1989.jpeg"},
        {title: "Slut!", file: "songs/slut!.mp3", image: "assets/1989.jpeg"},
        {title: "Blank space", file: "songs/blank-space.mp3", image: "assets/1989.jpeg"},
    ];

    let currentSongIndex = 0;
    let audioPlayer = document.getElementById("audio-player");
    let audioSource = document.getElementById("audio-source");
    let songTitle = document.getElementById("song-title");
    let songImage = document.getElementById("song-image-img");
    let playPauseBtn = document.getElementById("play-pause");
    let progressBar = document.getElementById("progress-bar");
    let elapsedTimeDisplay = document.getElementById("elapsed-time");
    let totalTimeDisplay = document.getElementById("total-time");

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    }

    //make a function to update the player with the current song

    function updatePlayer(){
        const currentSong = songs[currentSongIndex];
        songTitle.textContent = currentSong.title;
        audioSource.src = currentSong.file;
        songImage.src = currentSong.image;

        audioPlayer.load();
        progressBar.value = 0;    // reload the progress bar when switching songs
        elapsedTimeDisplay.textContent = "0:00";
        totalTimeDisplay.textContent = "0:00";
    }

    //event listener for the play-pause button

    playPauseBtn.addEventListener("click", function(){
        if(audioPlayer.paused){
            audioPlayer.play();
            playPauseBtn.style.backgroundImage = "url(assets/pause.jpg)";
        }else{
            audioPlayer.pause();
            playPauseBtn.style.backgroundImage = "url(assets/play.jpg)";
        }
    });

    //event listener for previous song button

    document.getElementById("prev").addEventListener("click", function(){
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        updatePlayer();
        audioPlayer.play();    //Play the selected song
        playPauseBtn.style.backgroundImage = "url(assets/pause.jpg)";
    });

    //event listener for next song button

    document.getElementById("next").addEventListener("click", function(){
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        updatePlayer();
        audioPlayer.play();    //Play the selected song
        playPauseBtn.style.backgroundImage = "url(assets/pause.jpg)";
    });

    // event listener to show total duration once loaded

    audioPlayer.addEventListener("loadedmetadata", function () {
        totalTimeDisplay.textContent = formatTime(audioPlayer.duration);
    });

    //event listener to update progress bar as the song plays

    audioPlayer.addEventListener("timeupdate", function(){
        if(audioPlayer.duration){
            const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;      // progress as a percentage
            progressBar.value = audioPlayer.currentTime / audioPlayer.duration;     // fraction 0–1
            elapsedTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
            totalTimeDisplay.textContent = formatTime(audioPlayer.duration - audioPlayer.currentTime);
            progressBar.style.background = `linear-gradient(to right, var(--pink) ${progressPercent}%, var(--aud-bg) ${progressPercent}%)`;
        }
    });

    //event listener for progress bar input (seek)

    progressBar.addEventListener("input", function(){
        if(audioPlayer.duration){
            const seekTime = audioPlayer.duration*progressBar.value;
            audioPlayer.currentTime = seekTime;
        }
    });

    progressBar.addEventListener("input", function(){
        const value = (this.value - this.min) / (this.max - this.min) * 100;
        this.style.background = `linear-gradient(to right, var(--pink) ${value}%, var(--aud-bg) ${value}%)`;
    });
})