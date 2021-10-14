// Global Variables

let slideBar = document.querySelector(".range");
let play = document.querySelector(".vidStuff .fa-play");
let pause = document.querySelector(".vidStuff .fa-pause");
let skipBtn = document.querySelector(".vidStuff .fa-forward");
let prevBtn = document.querySelector(".vidStuff .fa-backward");
let imgDisplayer = document.querySelector(".player");
let loop = document.querySelector(" #loop");
let volumeBar = document.querySelector('.volumeBar');
let spaceNum = 0;
let looped = 0;
let audioList = [{
        img: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/19380484711509.5d6599ccb9296.jpg",
        mp3: "retroFunk 60.mp3",
        artist: "8bit"
    },
    {
        img: "https://i.pinimg.com/originals/15/84/e2/1584e2180669d73ef53b945690b6b63d.jpg",
        mp3: "8_bit Surf.mp3",
        artist: "8bit"
    },
    {
        img: "https://geo-media.beatport.com/image_size/1400x1400/b8b5c4d5-39e8-4044-964c-ea46e5a61d85.jpg",
        mp3: "Jimmy wantme.mp3",
        artist: "Jimmy Hardwind"
    },
    {
        img: "https://i.scdn.co/image/ab67616d0000b27307875d4d12a5301950323dc9",
        mp3: "FREDJI-Happy-Life.mp3",
        artist: "Fredji"
    },
    {
        img: "https://m.media-amazon.com/images/I/81O+pZFrlCL._SS500_.jpg",
        mp3: "Arcade-Puzzler.mp3",
        artist: "8bit"
    },
    {
        img: "https://www1.beatzjam.com/wp-content/uploads/2021/09/Screenshot_20210903-125401_Opera-Mini.jpg",
        mp3: "ckay-nwantitiRemix.mp3",
        artist: "Ckay, DJ-Yo and DJ-Alex"
    },
    {
        img: "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/997/1000x0/phoenix-1629450032-e3Y8K6Fqvn.jpg",
        mp3: "NCS-Phoenix.mp3",
        artist: "Netrum & Halvorsen[NCS_Release]"
    },
    {
        img: "https://upload.wikimedia.org/wikipedia/commons/3/38/Turn_Down_For_What_-_Single.jpg",
        mp3: "turn.mp3",
        artist: "DJ-Snake"
    },
]
let index = 0;
let count = 0;
let audio = new Audio(audioList[index].mp3);
let displayImg = audioList[index].img;
imgDisplayer.style.background = `url(${displayImg})`
imgDisplayer.style.backgroundSize = "100% 100%";
let paused;


// Functions and Logic here

function none() {
    paused = true;
    play.style.display = "none";
    pause.style.display = "inline-block";
}

function inline_block() {
    paused = false;
    play.style.display = "inline-block";
    pause.style.display = "none";
}

function playSong() {
    none()
    audio.play();
}

function pauseSong() {
    inline_block()
    audio.pause()
}


function timeUpdate() {
    return (audio.addEventListener("timeupdate", () => {
        let progress = (audio.currentTime / audio.duration) * 100;
        slideBar.value = progress;
        slideBar.addEventListener("change", () => {
            audio.currentTime = slideBar.value * audio.duration / 100;
        })
    }))
}
timeUpdate()


function ended() {
    audio.addEventListener("ended", skip)
}
ended()




function skip() {
    none();
    loop.style.color = 'white';
    audio.pause();
    if (index >= audioList.length - 1) {
        index = -1;
    }
    index++;
    audio = new Audio(audioList[index].mp3);
    audio.play();
    displayImg = audioList[index].img;
    imgDisplayer.style.background = `url(${displayImg})`
    imgDisplayer.style.backgroundSize = "100% 100%";
    looped = 0;

    timeUpdate()
    ended();
}



function prev() {
    none()
    loop.style.color = 'white';
    audio.pause();
    if (index == 0) {
        index = audioList.length;
    }
    index--;
    audio = new Audio(audioList[index].mp3);
    audio.play();
    displayImg = audioList[index].img;
    imgDisplayer.style.background = `url(${displayImg})`
    imgDisplayer.style.backgroundSize = "100% 100%";
    timeUpdate();
    ended();
}


function loopIt() {
    looped += 1;
    if (looped == 1) {
        audio.loop = true;
        loop.style.color = "lightgreen";
        setTimeout(() => {
            alert("Track looped!")
        }, 300)
    } else if (looped == 2) {
        audio.loop = false;
        loop.style.color = "white";
        looped = 0;
    } else {
        audio.loop = false;
        loop.style.color = "white";
        looped = 0;
    }

}

function changeVolume() {
    audio.volume = volumeBar.value / 100;
    console.log(audio.volume)
}


function space() {
    document.addEventListener("keydown", (e) => {
        if (e.key == " ") {
            if (paused == true) {
                pauseSong()
            } else {
                playSong()
            }
        }
    })
}
space()

// Event Listeners

play.addEventListener("click", playSong)
pause.addEventListener("click", pauseSong)
skipBtn.addEventListener("click", skip)
prevBtn.addEventListener("click", prev)
loop.addEventListener("click", loopIt)
volumeBar.addEventListener("change", changeVolume)