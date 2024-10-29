let navList = document.querySelector(".nav-list");
function toggleNavList() {
  navList.style.display == "flex" ? (navList.style.display = "none") : (navList.style.display = "flex");
}

// //user and job title var arrey

// let PartnerStudio = ["rophnan and park studio", "kasmasse", "yimra", "gidey"];

// //featch json file
// fetch("assets/js/data.json")
//   .then(response => response.json())
//   .then(data => {
//     let ArtistListCont = document.getElementById("artist-list-container");
//     data.forEach(artist => {
//       let artistItem = document.createElement("div");
//       artistItem.className = "artist-item";

//       let artistName = document.createElement("li");
//       artistName.innerHTML = artist.artists;

//       artistItem.appendChild(artistName);

//       ArtistListCont.appendChild(artistItem);
//     });
//   });
