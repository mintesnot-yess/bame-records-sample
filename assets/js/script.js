let navList = document.querySelector(".nav-list");
let audio = document.getElementById("audio");
let playButton = document.querySelectorAll(".play-audio");
let PlayToHidden = document.querySelectorAll(".play-hidden");
let ArtistName = document.querySelector(".artist");
let MusicTitle = document.querySelector(".title");
let AlbemArt = document.querySelector(".bg-image");
let YoutubeLink = document.querySelector(".youtube-link");
let VolumeCtr = document.querySelector(".volume");

function toggleNavList() {
  navList.style.display == "flex" ? (navList.style.display = "none") : (navList.style.display = "flex");
}

let StudioImages = document.querySelectorAll("#studio-images img");
//music source list

let musics = [
  {
    artist: "negestat",
    title: "Ere ",
    albem_art: "negestat1.jpg",
    music: "Negestat - Eree (Official Music Video) (mp3cut.net) (1).mp3",
    link: "https://www.youtube.com/watch?v=wbfCiClxLlM ",
    "created-at": null
  },
  {
    artist: "selena gomez",
    title: "im so far",
    albem_art: "freepik__candid-image-photography-natural-textures-highly-r__57292.jpeg",
    music: "Se Acabo Remix (Explicit) - The Beatnuts Feat. Method Man TikTok dance.mp3",
    link: "https://www.youtube.com/watch?v=wbfCiClxLlM",
    "created-at": null
  }
];

ArtistName.textContent = musics[0].artist;
MusicTitle.textContent = musics[0].title;
AlbemArt.style.background = `url("assets/music/albem-arts/${musics[0].albem_art}") center/cover`;
YoutubeLink.href = musics.link;

audio.src = `assets/music/music-src/${musics[0].music}`;

$(".NextMusicBtn").click(function(e) {
  MusicCurrentIndex = (MusicCurrentIndex + 1) % musics.length;

  ArtistName.textContent = musics[MusicCurrentIndex].artist;
  MusicTitle.textContent = musics[MusicCurrentIndex].title;
  YoutubeLink.href = musics[MusicCurrentIndex].link;
  AlbemArt.style.background = `url("assets/music/albem-arts/${musics[MusicCurrentIndex].albem_art}") center/cover`;
  audio.src = `assets/music/music-src/${musics[MusicCurrentIndex].music}`;
  AudioPlayer();
});

$(".previousMusicBtn").click(function(e) {
  MusicCurrentIndex = (MusicCurrentIndex - 1) % musics.length;
  YoutubeLink.href = musics[MusicCurrentIndex].link;

  ArtistName.textContent = musics[MusicCurrentIndex].artist;
  MusicTitle.textContent = musics[MusicCurrentIndex].title;
  AlbemArt.style.background = `url("assets/music/albem-arts/${musics[MusicCurrentIndex].albem_art}") center/cover`;
  audio.src = `assets/music/music-src/${musics[MusicCurrentIndex].music}`;
  AudioPlayer();
});

audio.addEventListener("ended", function() {
  YoutubeLink.style.height = "100%";
  setTimeout(() => {
    YoutubeLink.style.height = "0%";

    MusicCurrentIndex = (MusicCurrentIndex + 1) % musics.length;
    ArtistName.textContent = musics[MusicCurrentIndex].artist;
    MusicTitle.textContent = musics[MusicCurrentIndex].title;
    YoutubeLink.href = musics[MusicCurrentIndex].link;
    AlbemArt.style.background = `url("assets/music/albem-arts/${musics[MusicCurrentIndex].albem_art}") center/cover`;
    audio.src = `assets/music/music-src/${musics[MusicCurrentIndex].music}`;
    AudioPlayer();
  }, 10000);
});

// -------------------=============================

let ImageCurrentIndexBame = 0;
let ImageCurrentIndex = 0;
StudioImages[1].style.flex = "1";
StudioImages[1].style.height = "100%";

let MusicCurrentIndex = 0;
var ImageNext = true;

function StudioImageNext() {
  StudioImages[ImageCurrentIndex].style.flex = "0";
  StudioImages[ImageCurrentIndex].style.height = "0";
  ImageCurrentIndex = (ImageCurrentIndex + 1) % StudioImages.length;

  StudioImages[ImageCurrentIndex].style.flex = "1";
  StudioImages[ImageCurrentIndex].style.height = "100%";
}

function AudioPlayer() {
  if (audio.paused) {
    audio.play();
    VolumeCtr.style.flex = "1";
  } else {
    audio.pause();
    VolumeCtr.style.flex = "0";
  }
}

audio.addEventListener("pause", function() {
  playButton.forEach(item => {
    item.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
  });
});
audio.addEventListener("play", function() {
  playButton.forEach(item => {
    item.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
  });
});

function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return `${minutes}:${seconds}`;
}

audio.addEventListener("timeupdate", function() {
  let duration = document.querySelector("#duration");
  let MusicSlider = document.querySelector("input[type='range']");
  MusicSlider.value = (audio.currentTime / audio.duration) * 100;
  let currentTime = document.querySelector("#current-time");
  let ProgressBar = document.querySelector(".progress-bar");
  ProgressBar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
  currentTime.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration);
});

VolumeCtr.addEventListener("click", function() {
  let volume = audio.volume;
  audio.volume = volume === 0 ? 1 : 0;

  if (volume === 0) {
    VolumeCtr.innerHTML = '<i class="fa fa-volume-up" aria-hidden="true"></i>';
  } else {
    VolumeCtr.innerHTML = '<i class="fa fa-volume-off" aria-hidden="true"></i>';
  }
});

// booking form
$("#studio-booking-form").submit(function(e) {
  e.preventDefault();

  let name = $("#name").val();
  let email = $("#email").val();
  let phone = $("#phone").val();
  let date = $("#date").val();
  let time = $("#time").val();

  $.post(
    "studio-booking",
    {
      booking_submit: "",
      name: name,
      email: email,
      phone: phone,
      date: date,
      time: time
    },

    function(data) {
      if (data == "Booking successful") {
        $(".bg-msg").html(`<p>${data}</p>`);
        $("#studio-booking-form").hide();
        $("#booking-successful").show();
      } else {
        $(".bg-msg").html(`<p class="danger-text">${data}</p>`);
      }
      // show_toest(data, "booking");
    }
  );
});

function notifyMe(title, message, links) {
  if (Notification.permission === "granted") {
    const options = {
      title: title,
      body: message,
      tag: "bame-notification",
      icon: "assets/images/bame-logo.png"
    };
    const notification = new Notification(title, options);
    notification.onclick = () => {
      window.location.href = links;
      notification.close();
    };
  } else {
    Notification.requestPermission().then(function(permission) {
      if (permission === "granted") {
        notifyMe(title, message, links);
      }
    });
  }
}

function showNotification(NotTitle, message) {}

$("#refresh").click(function(e) {
  location.reload();
});
// Refresh the page

// featch booking details
$.get("studio-booking?json", function(data) {
  let bookingDate = JSON.parse(data)[0]["date"];
  let currentDate = new Date();
  let currentDateFormat = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
  //
  if (bookingDate === currentDateFormat) {
    notifyMe("BAME RECORDS Booking ALERT", `One Day Left | Look at this now`, "http://localhost:8000/#form");
  }
});

function Artists() {
  let artists = [
    {
      name: "Negestat",
      picture: "negestat.jpg ",
      link: "https://negestatofficial.com/ ",
      catagory: "Music Artist",
      "created-at": "2024-11-02"
    },
    {
      name: "Rophnan",
      picture: "freepik__candid-image-photography-natural-textures-highly-r__57291.jpeg",
      link: "https://rophnan.com/",
      catagory: "music artist",
      "created-at": "2024-11-03"
    },
    {
      name: "Tedy yo",
      picture: "teddyo.jpg",
      link: "https://negestatofficial.com/",
      catagory: "music artist",
      "created-at": "2024-11-03"
    },
    {
      name: "Jalud",
      picture: "jalud.jpg",
      link: "https://negestatofficial.com/",
      catagory: "music artist",
      "created-at": "2024-11-03"
    },
    {
      name: "samigo",
      picture: "samigo.jpeg",
      link: "https://negestatofficial.com/",
      catagory: "music artist",
      "created-at": "2024-11-03"
    },
    {
      name: "abeba desalegn",
      picture: "abeba-desalegn.jpg",
      link: "https://negestatofficial.com/",
      catagory: "music artist",
      "created-at": "2024-11-03"
    },
    {
      name: "kake",
      picture: "4zw9hzeh.png",
      link: "https://negestatofficial.com/",
      catagory: "music artist",
      "created-at": "2024-11-03"
    },
    {
      name: "kake",
      picture: "channels4_profile.jpg",
      link: "https://negestatofficial.com/",
      catagory: "music artist",
      "created-at": "2024-11-03"
    }
  ];
  let artistList = $("#artist-list");
  artists.forEach(artist => {
    let artistCard = `

 <a href="${artist.link}" class="card-list card-animation">
   <img alt="${artist.name} " src="assets/images/artist/${artist.picture}" />
    <h3>${artist.name}</h3>
       <p>${artist.catagory}</p>
       </a>
   `;
    artistList.append(artistCard);
  });
}

Artists();
