// API Keys
const openWeatherApiKey = '1d249362b36f6d94dd68ce13354944a2';
const geoapifyApiKey = '3e8e65058cad4b68ac5ad742d380d5fd';

// Inisialisasi peta menggunakan Leaflet.js
const map = L.map('map').setView([-6.1751, 106.8650], 13); // Jakarta sebagai default lokasi

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Fungsi untuk mencari lokasi dan menampilkan marker
document.getElementById('search-btn').addEventListener('click', () => {
    const destination = document.getElementById('search-destination').value.trim();

    if (!destination) {
        alert('Masukkan destinasi!');
        return;
    }

    // Mencari lokasi menggunakan OpenStreetMap
    fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(destination)}&format=json`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                alert('Lokasi tidak ditemukan!');
                return;
            }

            const { lat, lon, display_name } = data[0];

            // Geser peta ke lokasi tujuan
            map.setView([lat, lon], 13);

            // Tambahkan marker
            L.marker([lat, lon]).addTo(map)
                .bindPopup(`<b>${display_name || 'Nama tempat tidak tersedia'}</b>`)
                .openPopup();

            // Panggil fungsi cuaca dan tempat
            fetchWeather(lat, lon, destination);
            fetchPlaces(lat, lon);
        })
        .catch(error => console.error('Error fetching location:', error));
});

// Fungsi untuk mendapatkan cuaca
function fetchWeather(lat, lon, city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!data.main) {
                document.getElementById('weather-info').innerHTML = `<p>Cuaca tidak tersedia untuk lokasi ini.</p>`;
                return;
            }

            const temp = (data.main.temp - 273.15).toFixed(1);
            const desc = data.weather[0]?.description || 'Deskripsi cuaca tidak tersedia';

            const weatherHTML = `
                <h4>${city}</h4>
                <p>Suhu: ${temp}°C</p>
                <p>Cuaca: ${desc}</p>
            `;
            document.getElementById('weather-info').innerHTML = weatherHTML;
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            document.getElementById('weather-info').innerHTML = '<p>Gagal memuat data cuaca.</p>';
        });
}

// Fungsi untuk mendapatkan rekomendasi tempat menggunakan Geoapify API
function fetchPlaces(lat, lon) {
    const url = `https://api.geoapify.com/v2/places?categories=tourism&lat=${lat}&lon=${lon}&apiKey=${geoapifyApiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.features.length === 0) {
                document.getElementById('places-info').innerHTML = `<p>Tidak ada tempat wisata yang ditemukan.</p>`;
                return;
            }

            let placesHTML = '<ul>';
            data.features.forEach(place => {
                const name = place.properties.name;
                const address = place.properties.address_line1;

                if (name && address) {
                    placesHTML += `<li><b>${name}</b><br>${address}</li>`;
                }
            });
            placesHTML += '</ul>';
            document.getElementById('places-info').innerHTML = placesHTML;
        })
        .catch(error => {
            console.error('Error fetching places:', error);
            document.getElementById('places-info').innerHTML = '<p>Gagal memuat data tempat wisata.</p>';
        });
}

// Fungsi untuk mengelola itinerary
// Fungsi untuk mengelola itinerary
document.getElementById('itinerary-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const destination = document.getElementById('itinerary-input').value.trim();
    const date = document.getElementById('itinerary-date').value.trim();
    const activity = document.getElementById('itinerary-activity').value.trim();
    const transport = document.getElementById('itinerary-transport').value.trim();
    const accommodation = document.getElementById('itinerary-accommodation').value.trim();

    if (!destination || !date || !activity || !transport || !accommodation) {
        alert('Isi semua detail untuk itinerary!');
        return;
    }

    const list = document.getElementById('itinerary-list');
    const listItem = document.createElement('li');

    // Menampilkan detail itinerary
    listItem.innerHTML = `
        <strong>${destination}</strong><br>
        Tanggal: ${date}<br>
        Aktivitas: ${activity}<br>
        Transportasi: ${transport}<br>
        Akomodasi: ${accommodation}
    `;

    // Membuat container untuk tombol
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    // Membuat tombol Edit dengan ikon
    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.innerHTML = '<i class="fas fa-edit"></i>'; // Ikon edit dari Font Awesome
    editButton.addEventListener('click', () => {
        document.getElementById('itinerary-input').value = destination;
        document.getElementById('itinerary-date').value = date;
        document.getElementById('itinerary-activity').value = activity;
        document.getElementById('itinerary-transport').value = transport;
        document.getElementById('itinerary-accommodation').value = accommodation;

        // Menghapus item lama dari list setelah edit
        listItem.remove();
    });

    // Membuat tombol Hapus dengan ikon
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Ikon trash dari Font Awesome
    removeButton.addEventListener('click', () => listItem.remove());

    // Menambahkan tombol-tombol ke dalam container
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(removeButton);

    // Menambahkan container tombol ke dalam list item
    listItem.appendChild(buttonContainer);

    // Menambahkan list item ke dalam daftar itinerary
    list.appendChild(listItem);

    // Reset form input setelah menambahkan itinerary
    document.getElementById('itinerary-form').reset();
});
