window.onload = () => {
    // fetch("https://spotify23.p.rapidapi.com/playlist_tracks/?id=37i9dQZF1DX4Wsb4d7NKfP&offset=0&limit=100", {
    //     "method": "GET",
    //     "headers": {
    //         "x-rapidapi-host": "spotify23.p.rapidapi.com",
    //         "x-rapidapi-key": "19d4d980e1mshf5da12b15b1d153p18de56jsn3905560b63ba"
    //     }
    // })
    //     .then(response => {
    //         console.log(response.items);
    //
    //
    //     })
    //     .catch(err => {
    //         console.error(err);
    //     });
    let track;
    fetch("https://shazam.p.rapidapi.com/songs/list-artist-top-tracks?id=40008598&locale=en-US", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "shazam.p.rapidapi.com",
            "x-rapidapi-key": "19d4d980e1mshf5da12b15b1d153p18de56jsn3905560b63ba"
        }
    })
        .then(response => {
            // console.log(response);
            response.json().then(function (data) {
                track = data;
                console.log(track.tracks[0].url);
            })
        })
        .catch(err => {
            console.error(err);
        });

    const song_img_el = document.getElementById("song-image");
    const song_title_el = document.getElementById("song-title");
    const song_artist_el = document.getElementById("song-artist");
    const song_next_up_el = document.getElementById("song-next-up");

    const play_btn = document.getElementById("play-btn");
    const play_btn_icon = document.getElementById("play-icon");
    const prev_btn = document.getElementById("prev-btn");
    const next_btn = document.getElementById("next-btn");

    const audio_player = document.querySelector("#music-player");

    let current_song_index;
    let next_song_index;

    let songs = [
        {
            title: "Song 1 ",
            artist: "Mumin_1",
            song_path: "https://soundimage.org/wp-content/uploads/2017/05/Nighttime-Escape.mp3",
            // song_path: track.tracks[0].url,
            img_path: "images/song-1.jpg",
        },
        {
            title: "Song 2",
            artist: "Mumin_2",
            // song_path: "music/song-2.amr",
            // song_path: track.tracks[1].url,
            song_path: "https://soundimage.org/wp-content/uploads/2017/05/Nighttime-Escape.mp3",
            img_path: "images/song-2.jpg",
        },
        {
            title: "Song 3 ",
            artist: "Mumin_3",
            // song_path: "music/song-2.amr",
            // song_path: track.tracks[2].url,
            song_path: "https://soundimage.org/wp-content/uploads/2017/05/Nighttime-Escape.mp3",
            img_path: "images/song-3.jpg",
        },
        {
            title: "Song 4 ",
            artist: "Mumin_4",
            // song_path: "music/song-1.amr",
            // song_path: track.tracks[3].url,
            song_path: "https://soundimage.org/wp-content/uploads/2017/05/Nighttime-Escape.mp3",
            img_path: "images/song-4.jpg",
        },
    ];
    play_btn.addEventListener("click", TogglePlaySong);
    next_btn.addEventListener("click", () => ChangeSong());
    prev_btn.addEventListener("click", () => ChangeSong(false));

    InitPlayer();

    function InitPlayer() {
        current_song_index = 0;
        next_song_index = current_song_index + 1;
        UpdatePlayer();
    }

    function UpdatePlayer() {
        let song = songs[current_song_index];

        song_img_el.style = "background-image: url('" + song.img_path + "')";
        song_title_el.innerText = song.title;
        song_artist_el.innerText = song.artist;
        song_next_up_el.innerText =
            songs[next_song_index].title + " by " + songs[next_song_index].artist;

        audio_player.src = song.song_path;
    }

    function TogglePlaySong() {
        if (audio_player.paused) {
            audio_player.play()
                .then(() => {
                    // Audio is playing.
                })
                .catch(error => {
                    console.log(error);
                });
            play_btn_icon.classList.remove("fa-play");
            play_btn_icon.classList.add("fa-pause");
        } else {
            audio_player.pause();
            play_btn_icon.classList.add("fa-play");
            play_btn_icon.classList.remove("fa-pause");
        }
    }

    function ChangeSong(next = true) {
        if (next) {
            current_song_index++;
            next_song_index = current_song_index + 1;

            if (current_song_index > songs.length - 1) {
                current_song_index = 0;
                next_song_index = current_song_index + 1;
            }
            if (next_song_index > songs.length - 1) {
                next_song_index = 0;
            }
        } else {
            current_song_index--;
            next_song_index = current_song_index + 1;

            if (current_song_index < 0) {
                current_song_index = songs.length - 1;
                next_song_index = 0;
            }
        }

        UpdatePlayer();
        TogglePlaySong();
    }
};
