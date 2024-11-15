<<<<<<< HEAD
const calendar = document.querySelector('.calendar');
const monthElement = calendar.querySelector('.month .date');
const daysContainer = calendar.querySelector('.days');
const eventForm = document.querySelector('.event-form');
const eventTitleInput = document.querySelector('#event-title');
const eventDateInput = document.querySelector('#event-date');
const eventIdInput = document.querySelector('#event-id');
const eventList = document.querySelector('.event-list');
const holidayList = document.querySelector('.holiday-list');

// Nama-nama bulan
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// Libur nasional Indonesia (tandai dengan `isNationalHoliday: true`)
const nationalHolidays = [
    { month: 0, day: 1, name: "New Year's Day", isNationalHoliday: true },
    { month: 1, day: 14, name: "Chinese New Year", isNationalHoliday: true },
    { month: 2, day: 30, name: "Isra Mi'raj", isNationalHoliday: true },
    { month: 3, day: 7, name: "Waisak", isNationalHoliday: true },
    { month: 4, day: 1, name: "Labour Day", isNationalHoliday: true },
    { month: 4, day: 21, name: "National Education Day", isNationalHoliday: true },
    { month: 5, day: 5, name: "Eid al-Fitr", isNationalHoliday: true },
    { month: 5, day: 6, name: "Eid al-Fitr Holiday", isNationalHoliday: true },
    { month: 6, day: 17, name: "Independence Day", isNationalHoliday: true },
    { month: 8, day: 11, name: "Idul Adha", isNationalHoliday: true },
    { month: 9, day: 28, name: "Muharram", isNationalHoliday: true },
    { month: 10, day: 25, name: "Christmas Day", isNationalHoliday: true },
    { month: 11, day: 31, name: "New Year's Eve", isNationalHoliday: true }
];

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let events = [];

// Fungsi untuk merender kalender
function renderCalendar() {
    monthElement.innerText = `${monthNames[currentMonth]} ${currentYear}`;
    daysContainer.innerHTML = '';

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Tanggal kosong sebelum tanggal 1
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        daysContainer.appendChild(emptyDiv);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateDiv = document.createElement('div');
        dateDiv.innerText = day;

        // Tandai hari Minggu dengan warna merah
        const isSunday = new Date(currentYear, currentMonth, day).getDay() === 0;
        if (isSunday) dateDiv.classList.add('sunday');

        // Tandai libur nasional dengan warna merah
        const holiday = nationalHolidays.find(h => h.day === day && h.month === currentMonth);
        if (holiday) {
            dateDiv.classList.add('holiday');
        }

        // Cek event yang ditambahkan
        const event = events.find(
            ev => ev.date.getUTCDate() === day &&
                ev.date.getUTCMonth() === currentMonth &&
                ev.date.getUTCFullYear() === currentYear
        );
        if (event) dateDiv.classList.add('event-day');

        // Fungsi selectDate dipanggil dengan tanggal yang benar
        dateDiv.addEventListener('click', () => selectDate(new Date(currentYear, currentMonth, day)));
        daysContainer.appendChild(dateDiv);
    }

    renderNationalHolidays(); // Render libur nasional di bawah kalender
}

// Fungsi untuk merender libur nasional
function renderNationalHolidays() {
    holidayList.innerHTML = ''; // Bersihkan daftar libur nasional

    nationalHolidays.forEach(holiday => {
        if (holiday.month === currentMonth) {
            const holidayItem = document.createElement('div');
            holidayItem.innerText = `${holiday.day} ${monthNames[holiday.month]}: ${holiday.name}`;
            holidayItem.classList.add('holiday-item');
            holidayList.appendChild(holidayItem);
        }
    });
}

// Fungsi untuk berpindah bulan
function changeMonth(step) {
    currentMonth += step;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear -= 1;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear += 1;
    }
    renderCalendar();
}

// Fungsi untuk memilih tanggal
function selectDate(date) {
    const adjustedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    eventDateInput.value = adjustedDate.toISOString().slice(0, 10);
    eventIdInput.value = '';
    eventTitleInput.value = '';

    const event = events.find(ev => 
        ev.date.getUTCDate() === adjustedDate.getUTCDate() &&
        ev.date.getUTCMonth() === adjustedDate.getUTCMonth() &&
        ev.date.getUTCFullYear() === adjustedDate.getUTCFullYear()
    );
    
    if (event) {
        eventIdInput.value = event.id;
        eventTitleInput.value = event.title;
    }
}

// Fungsi untuk menambah atau memperbarui event
function addEvent(e) {
    e.preventDefault();
    const eventId = eventIdInput.value;
    const eventTitle = eventTitleInput.value;
    const eventDateValue = eventDateInput.value.split('-');
    const eventDate = new Date(Date.UTC(eventDateValue[0], eventDateValue[1] - 1, eventDateValue[2]));
    
    if (!eventTitle || isNaN(eventDate)) return;

    // Periksa jika event adalah libur nasional
    if (nationalHolidays.some(holiday => holiday.day === eventDate.getUTCDate() && holiday.month === eventDate.getUTCMonth())) {
        alert("You cannot edit or delete a national holiday.");
        return;
    }

    const existingEvent = events.find(ev => ev.id === eventId);
    if (existingEvent) {
        existingEvent.title = eventTitle;
        existingEvent.date = eventDate;
    } else {
        events.push({ id: Date.now().toString(), title: eventTitle, date: eventDate });
    }

    renderEvents();
    renderCalendar();
    eventForm.reset();
}

// Fungsi untuk menghapus event
function deleteEvent() {
    const eventId = eventIdInput.value;
    if (!eventId) return;

    const eventIndex = events.findIndex(ev => ev.id === eventId);
    if (eventIndex === -1) return;

    events.splice(eventIndex, 1);
    renderEvents();
    renderCalendar();
    eventForm.reset();
}

// Fungsi untuk menampilkan daftar event
function renderEvents() {
    eventList.innerHTML = '';
    events
        .sort((a, b) => a.date - b.date) // Mengurutkan event berdasarkan tanggal
        .forEach(event => {
            const eventItem = document.createElement('li');
            const formattedDate = event.date.toISOString().slice(0, 10).split('-').reverse().join('-'); // Mengubah format menjadi DD-MM-YYYY
            eventItem.textContent = `${event.title} - ${formattedDate}`;
            eventItem.dataset.id = event.id;
            eventItem.addEventListener('click', () => loadEventToForm(event.id));
            eventList.appendChild(eventItem);
        });
}

// Inisialisasi kalender dan event
renderCalendar();
renderEvents();
=======
const calendar = document.querySelector('.calendar');
const monthElement = calendar.querySelector('.month .date');
const daysContainer = calendar.querySelector('.days');
const eventForm = document.querySelector('.event-form');
const eventTitleInput = document.querySelector('#event-title');
const eventDateInput = document.querySelector('#event-date');
const eventIdInput = document.querySelector('#event-id');
const eventList = document.querySelector('.event-list');
const holidayList = document.querySelector('.holiday-list');

// Nama-nama bulan
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// Libur nasional Indonesia (tandai dengan `isNationalHoliday: true`)
const nationalHolidays = [
    { month: 0, day: 1, name: "New Year's Day", isNationalHoliday: true },
    { month: 1, day: 14, name: "Chinese New Year", isNationalHoliday: true },
    { month: 2, day: 30, name: "Isra Mi'raj", isNationalHoliday: true },
    { month: 3, day: 7, name: "Waisak", isNationalHoliday: true },
    { month: 4, day: 1, name: "Labour Day", isNationalHoliday: true },
    { month: 4, day: 21, name: "National Education Day", isNationalHoliday: true },
    { month: 5, day: 5, name: "Eid al-Fitr", isNationalHoliday: true },
    { month: 5, day: 6, name: "Eid al-Fitr Holiday", isNationalHoliday: true },
    { month: 6, day: 17, name: "Independence Day", isNationalHoliday: true },
    { month: 8, day: 11, name: "Idul Adha", isNationalHoliday: true },
    { month: 9, day: 28, name: "Muharram", isNationalHoliday: true },
    { month: 10, day: 25, name: "Christmas Day", isNationalHoliday: true },
    { month: 11, day: 31, name: "New Year's Eve", isNationalHoliday: true }
];

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let events = [];

// Fungsi untuk merender kalender
function renderCalendar() {
    monthElement.innerText = `${monthNames[currentMonth]} ${currentYear}`;
    daysContainer.innerHTML = '';

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Tanggal kosong sebelum tanggal 1
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        daysContainer.appendChild(emptyDiv);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateDiv = document.createElement('div');
        dateDiv.innerText = day;

        // Tandai hari Minggu dengan warna merah
        const isSunday = new Date(currentYear, currentMonth, day).getDay() === 0;
        if (isSunday) dateDiv.classList.add('sunday');

        // Tandai libur nasional dengan warna merah
        const holiday = nationalHolidays.find(h => h.day === day && h.month === currentMonth);
        if (holiday) {
            dateDiv.classList.add('holiday');
        }

        // Cek event yang ditambahkan
        const event = events.find(
            ev => ev.date.getUTCDate() === day &&
                ev.date.getUTCMonth() === currentMonth &&
                ev.date.getUTCFullYear() === currentYear
        );
        if (event) dateDiv.classList.add('event-day');

        // Fungsi selectDate dipanggil dengan tanggal yang benar
        dateDiv.addEventListener('click', () => selectDate(new Date(currentYear, currentMonth, day)));
        daysContainer.appendChild(dateDiv);
    }

    renderNationalHolidays(); // Render libur nasional di bawah kalender
}

// Fungsi untuk merender libur nasional
function renderNationalHolidays() {
    holidayList.innerHTML = ''; // Bersihkan daftar libur nasional

    nationalHolidays.forEach(holiday => {
        if (holiday.month === currentMonth) {
            const holidayItem = document.createElement('div');
            holidayItem.innerText = `${holiday.day} ${monthNames[holiday.month]}: ${holiday.name}`;
            holidayItem.classList.add('holiday-item');
            holidayList.appendChild(holidayItem);
        }
    });
}

// Fungsi untuk berpindah bulan
function changeMonth(step) {
    currentMonth += step;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear -= 1;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear += 1;
    }
    renderCalendar();
}

// Fungsi untuk memilih tanggal
function selectDate(date) {
    const adjustedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    eventDateInput.value = adjustedDate.toISOString().slice(0, 10);
    eventIdInput.value = '';
    eventTitleInput.value = '';

    const event = events.find(ev => 
        ev.date.getUTCDate() === adjustedDate.getUTCDate() &&
        ev.date.getUTCMonth() === adjustedDate.getUTCMonth() &&
        ev.date.getUTCFullYear() === adjustedDate.getUTCFullYear()
    );
    
    if (event) {
        eventIdInput.value = event.id;
        eventTitleInput.value = event.title;
    }
}

// Fungsi untuk menambah atau memperbarui event
function addEvent(e) {
    e.preventDefault();
    const eventId = eventIdInput.value;
    const eventTitle = eventTitleInput.value;
    const eventDateValue = eventDateInput.value.split('-');
    const eventDate = new Date(Date.UTC(eventDateValue[0], eventDateValue[1] - 1, eventDateValue[2]));
    
    if (!eventTitle || isNaN(eventDate)) return;

    // Periksa jika event adalah libur nasional
    if (nationalHolidays.some(holiday => holiday.day === eventDate.getUTCDate() && holiday.month === eventDate.getUTCMonth())) {
        alert("You cannot edit or delete a national holiday.");
        return;
    }

    const existingEvent = events.find(ev => ev.id === eventId);
    if (existingEvent) {
        existingEvent.title = eventTitle;
        existingEvent.date = eventDate;
    } else {
        events.push({ id: Date.now().toString(), title: eventTitle, date: eventDate });
    }

    renderEvents();
    renderCalendar();
    eventForm.reset();
}

// Fungsi untuk menghapus event
function deleteEvent() {
    const eventId = eventIdInput.value;
    if (!eventId) return;

    const eventIndex = events.findIndex(ev => ev.id === eventId);
    if (eventIndex === -1) return;

    events.splice(eventIndex, 1);
    renderEvents();
    renderCalendar();
    eventForm.reset();
}

// Fungsi untuk menampilkan daftar event
function renderEvents() {
    eventList.innerHTML = '';
    events
        .sort((a, b) => a.date - b.date) // Mengurutkan event berdasarkan tanggal
        .forEach(event => {
            const eventItem = document.createElement('li');
            const formattedDate = event.date.toISOString().slice(0, 10).split('-').reverse().join('-'); // Mengubah format menjadi DD-MM-YYYY
            eventItem.textContent = `${event.title} - ${formattedDate}`;
            eventItem.dataset.id = event.id;
            eventItem.addEventListener('click', () => loadEventToForm(event.id));
            eventList.appendChild(eventItem);
        });
}

// Inisialisasi kalender dan event
renderCalendar();
renderEvents();
>>>>>>> 3cd3e5f3efdfedb3b84c5cd44ab6fd243193e592
