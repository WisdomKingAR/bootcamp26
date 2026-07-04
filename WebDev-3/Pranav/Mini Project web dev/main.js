import './style.css';

const MOVIES = [
  { id: 1, title: "Kalki 2898 AD", genre: "Sci-Fi", location: "Mumbai", showtimes: ["12:00 PM", "7:00 PM"], rating: "8.7", price: 250, poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe0MZbS59js5st2DTmIotOs2yxNBiumXpeYxsdZD_rlQ&s=10", synopsis: "A modern avatar of Vishnu is believed to have descended to earth to protect the world from evil forces." },
  { id: 2, title: "Jawan", genre: "Action", location: "Delhi", showtimes: ["3:30 PM", "7:00 PM"], rating: "8.2", price: 220, poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrFDP9E-dzVG_J6UFZxpa6wLQCsw6WCagjp7t8Y2xpcQ&s=10", synopsis: "A high-octane action thriller about a man set to rectify the wrongs in society." },
  { id: 3, title: "3 Idiots", genre: "Comedy", location: "Bengaluru", showtimes: ["12:00 PM", "3:30 PM"], rating: "9.3", price: 180, poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSup4hTVKsOwbYUcGN8hRY3lCG8-QDP_BB_MpdqG3ZjLw&s=10", synopsis: "Two friends search for their long lost college companion and recall old memories." },
  { id: 4, title: "Dangal", genre: "Drama", location: "Pune", showtimes: ["3:30 PM", "7:00 PM"], rating: "8.9", price: 200, poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUzLcQWoIWDtK37MhSvHGATDQPddQRw94uLQsR3OLgnA&s=10", synopsis: "A former wrestler trains his two daughters to become world class wrestlers." },
  { id: 5, title: "Pathaan", genre: "Action", location: "Mumbai", showtimes: ["3:30 PM", "7:00 PM"], rating: "7.8", price: 240, poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVXGX5Zvpx3UL8WpwCOLzQonTsqB2BcnO9-T-437JsdA&s=10", synopsis: "An Indian agent races against time to stop a ruthless mercenary's attack." },
  { id: 6, title: "Avengers: Doomsday", genre: "Sci-Fi, Action, Thriller", location: "Mumbai", showtimes: ["12:00 PM", "7:00 PM"], rating: "9.0", price: 280, poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvYLTiFaec1Tk742_VfCFgCaX2oP_GdiTF5pey2qdjlg&s=10", synopsis: "Earth's mightiest heroes face a threat that could unravel reality itself." },
  { id: 7, title: "Welcome to the Jungle", genre: "Comedy, Action", location: "Pune", showtimes: ["12:00 PM", "3:30 PM"], rating: "7.5", price: 190, poster: "https://images.firstpost.com/uploads/2026/06/wel-1-2026-06-49bbb458c31cf95a05c815ecd601d09a.jpg?im=FitAndFill=(596,336)", synopsis: "A group of misfits gets stranded in the wild and must team up to find their way home." },
  { id: 8, title: "The Conjuring: Last Rites", genre: "Horror", location: "Delhi", showtimes: ["3:30 PM", "7:00 PM"], rating: "8.4", price: 230, poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHm2Dn4OQmJi6OhpU1Pk2X7hWkkCadGUf32SHtRBSweQ&s=10", synopsis: "Paranormal investigators Ed and Lorraine Warren face their final and most terrifying case yet." }
];


let activeMovie = null;
let selectedSeats = [];


const movieGrid = document.getElementById("movie-grid");
const modalElement = document.getElementById("booking-modal");
const searchInput = document.getElementById("search-input");
const cityFilter = document.getElementById("city-filter");
const genreFilter = document.getElementById("genre-filter");
const timeFilter = document.getElementById("time-filter");


function buildPosterHtml(movie, heightClass) {
  if (movie.poster === "") {
    return `<div class="w-full ${heightClass} bg-gray-700 flex items-center justify-center text-gray-400"><span>🎬 No poster added</span></div>`;
  }
  return `<img src="${movie.poster}" alt="${movie.title}" class="w-full ${heightClass} object-cover">`;
}


function buildShowtimeBadges(movie) {
  return movie.showtimes
    .map(time => `<span class="bg-indigo-950 text-indigo-300 text-xs px-2 py-1 rounded-full mr-1 border border-indigo-800">${time}</span>`)
    .join("");
}

function displayMovies(moviesToShow) {
  if (moviesToShow.length === 0) {
    movieGrid.innerHTML = `<p class="col-span-full text-center text-gray-400 py-16">No movies match your filters.</p>`;
    return;
  }

  const allCardsHtml = moviesToShow.map((movie) => {
    const posterHtml = buildPosterHtml(movie, "h-56");
    const showtimeBadges = buildShowtimeBadges(movie);

    return `
      <div class="bg-gray-900 rounded-xl shadow-md hover:bg-gray-800 border border-gray-800 hover:border-indigo-600 overflow-hidden flex flex-col">
        <div class="relative">
          ${posterHtml}
          <span class="absolute top-2 right-2 bg-black/70 text-amber-400 text-xs font-bold px-2 py-1 rounded-full">⭐ ${movie.rating}</span>
        </div>
        <div class="p-4 flex flex-col flex-1">
          <h3 class="font-bold text-lg text-gray-100 mb-1">${movie.title}</h3>
          <p class="text-xs text-indigo-400 font-semibold uppercase mb-3">${movie.genre} • 📍 ${movie.location}</p>
          <div class="flex flex-wrap gap-1 mb-4">${showtimeBadges}</div>
          <button onclick="openBookingModal(${movie.id})" class="w-full mt-auto bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm py-2.5 px-4 rounded-lg">
            Book Tickets · ₹${movie.price}
          </button>
        </div>
      </div>
    `;
  }).join("");
  movieGrid.innerHTML = allCardsHtml;
}

function filterMovies() {
  const query = searchInput.value.toLowerCase();
  const chosenCity = cityFilter.value;
  const chosenGenre = genreFilter.value;
  const chosenTime = timeFilter.value;

  const results = MOVIES.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(query);
    const matchesCity = chosenCity === "" || movie.location === chosenCity;
    const matchesGenre = chosenGenre === "" || movie.genre.includes(chosenGenre);
    const matchesTime = chosenTime === "" || movie.showtimes.includes(chosenTime);

    return matchesSearch && matchesCity && matchesGenre && matchesTime;
  });

  displayMovies(results);
}

window.openBookingModal = function (movieId) {
  activeMovie = MOVIES.find(movie => movie.id === movieId);
  selectedSeats = [];
  renderModalContent();

  modalElement.classList.remove("hidden");
  modalElement.classList.add("flex");
};

window.closeBookingModal = function () {
  modalElement.classList.add("hidden");
  modalElement.classList.remove("flex");
  activeMovie = null;
};

function renderModalContent() {
  if (activeMovie === null) return;

  const totalCost = selectedSeats.length * activeMovie.price;
  const posterHtml = buildPosterHtml(activeMovie, "h-40");

  const seatNumbers = Array.from({ length: 12 }, (_, index) => index + 1);

  const seatGridHtml = seatNumbers.map((seatNumber) => {
    const seatName = `Seat ${seatNumber}`;
    const isSelected = selectedSeats.includes(seatName);
    const seatColorClass = isSelected
      ? "bg-green-600 text-white border-green-500"
      : "bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700";

    return `<button onclick="toggleSeatSelection('${seatName}')" class="border rounded-md p-2 text-xs font-semibold text-center ${seatColorClass}">${seatNumber}</button>`;
  }).join("");

  modalElement.innerHTML = `
    <div class="bg-gray-900 rounded-xl max-w-md w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-800">
      <div class="relative">
        ${posterHtml}
        <button onclick="closeBookingModal()" class="absolute top-3 right-3 bg-black/50 text-white w-8 h-8 rounded-full text-xl">&times;</button>
      </div>
      <div class="p-5 overflow-y-auto bg-gray-900">
        <h2 class="text-xl font-bold text-white mb-1">${activeMovie.title}</h2>
        <p class="text-xs text-gray-400 mb-3">${activeMovie.genre} • ⭐ ${activeMovie.rating} • ₹${activeMovie.price}/seat</p>
        <p class="text-gray-400 text-sm mb-4 italic">"${activeMovie.synopsis}"</p>
        <hr class="mb-4 border-gray-800">
        <h4 class="text-xs font-bold text-gray-400 uppercase mb-2">Select Seats (${selectedSeats.length} chosen)</h4>
        <div class="grid grid-cols-4 gap-2 mb-6">${seatGridHtml}</div>
        <hr class="mb-4 border-gray-800">
        <div class="flex justify-between items-center mb-4">
          <span class="text-sm text-gray-400">Total Tickets Cost:</span>
          <span class="text-2xl font-black text-indigo-400">₹${totalCost}</span>
        </div>
        <button onclick="confirmBookingCheckout()" class="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-lg">
          Confirm Tickets Purchase
        </button>
      </div>
    </div>
  `;
}

// ==========================================
// 10. TOGGLE SEAT SELECTION
// Uses: .includes() to check, .filter() to remove, .push() to add
// ==========================================
window.toggleSeatSelection = function (seatName) {
  if (selectedSeats.includes(seatName)) {
    selectedSeats = selectedSeats.filter(seat => seat !== seatName);
  } else {
    selectedSeats.push(seatName);
  }
  renderModalContent();
};

// ==========================================
// 11. CONFIRM BOOKING
// Uses: .join() to build the seat summary text
// ==========================================
window.confirmBookingCheckout = function () {
  if (selectedSeats.length === 0) {
    alert("Please select at least one seat before confirming your tickets.");
    return;
  }

  const seatListText = selectedSeats.join(", ");
  const finalAmount = selectedSeats.length * activeMovie.price;

  alert(
    `🎉 BOOKING SUCCESSFUL!\n---------------------------------\nMovie: ${activeMovie.title}\nSeats Booked: ${seatListText}\nTotal Paid: ₹${finalAmount}\n\nEnjoy your show!`
  );

  closeBookingModal();
};

// ==========================================
// 12. EVENT LISTENERS
// ==========================================
searchInput.addEventListener("input", filterMovies);
cityFilter.addEventListener("change", filterMovies);
genreFilter.addEventListener("change", filterMovies);
timeFilter.addEventListener("change", filterMovies);

// ==========================================
// 13. INITIAL LOAD
// ==========================================
displayMovies(MOVIES);