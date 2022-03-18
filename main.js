// document.onreadystatechange = function() {
//     if (document.readyState !== "complete") {
//         document.querySelector(".player").style.visibility = "hidden";
//         document.querySelector("#loader").style.visibility = "visible";
//     } else {
//         document.querySelector("#loader").style.display = "none";
//         document.querySelector(".player").style.visibility = "visible";
//     }
// };
window.onload = () => {
    fetch("https://shazam.p.rapidapi.com/songs/list-recommendations?key=484129036&locale=en-US", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "shazam.p.rapidapi.com",
            "x-rapidapi-key": "19d4d980e1mshf5da12b15b1d153p18de56jsn3905560b63ba"
        }
    })
        .then(response => {
            // console.log(response);
            response.json().then(function (data) {
                // console.log(data)
                if (response) {
                    hideloader();
                }
                songsPlayer(data);
            })
        })
        .catch(err => {
            console.error(err);
        });
    function hideloader() {
        document.getElementById('loader').style.display = 'none';
        document.querySelector(".app-wrapper").style.visibility = "visible"
    }
    function songsPlayer(songData){
        // console.log(songData.tracks.length)


        // for (let i = 0; i < songData.tracks.length; i++) {
        //     console.log(songData.tracks[i].share['href'])
        // }


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
                title: songData.tracks[1].title,
                artist: songData.tracks[1].subtitle,
                song_path: './music/AREWESTILLFRIENDS.mp3',
                // song_path: songData.tracks[1].share['href'],
                img_path: songData.tracks[1].share['image']
            },
            {
                title: songData.tracks[2].title,
                artist: songData.tracks[2].subtitle,
                song_path: './music/BloodOrangeOutOfYourLeaguefeatSteveLacy.mp3',
                // song_path: songData.tracks[2].share['href'],
                img_path: songData.tracks[2].share['image']
            },
            {
                title: songData.tracks[3].title,
                artist: songData.tracks[3].subtitle,
                song_path: './music/RightonTimefeatLonr.mp3',
                // song_path: songData.tracks[3].share['href'],
                img_path: songData.tracks[3].share['image']
            },
            {
                title: songData.tracks[4].title,
                artist: songData.tracks[4].subtitle,
                song_path: './music/NothingWithoutYou.mp3',
                // song_path: songData.tracks[4].share['href'],
                img_path: songData.tracks[4].share['image']
            },
            {
                title: songData.tracks[5].title,
                artist: songData.tracks[5].subtitle,
                song_path: './music/RoadToYouOfficialVisual.mp3',
                // song_path: songData.tracks[0].share['href'],
                img_path: songData.tracks[5].share['image']
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
    }

};
