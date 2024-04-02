// Function to fetch and render bookings
function fetchAndRenderBookings() {
    axios.get("https://crudcrud.com/api/6d1d126e18c5460f877285de11c4c20c/Busbooking")
        .then(response => {
            const bookings = response.data;
            renderBookings(bookings);
        })
        .catch(error => console.error('Error fetching bookings:', error));
}

// Function to render bookings
function renderBookings(bookings) {
    const bookingList = document.getElementById("bookingList");
    bookingList.innerHTML = "";

    bookings.forEach(booking => {
        const bookingItem = document.createElement("li");
        bookingItem.classList.add("booking-item");
        bookingItem.innerHTML = `
            <span>Name: ${booking.name}, Email: ${booking.email}, Phone: ${booking.phone}, Bus: ${booking.bus}</span>
            <button class="edit-btn" onclick="editBooking('${booking._id}', '${booking.name}', '${booking.email}', '${booking.phone}', '${booking.bus}')">Edit</button>
            <button class="delete-btn" onclick="deleteBooking('${booking._id}')">Delete</button>
        `;
        bookingList.appendChild(bookingItem);
    });
}

// Function to add booking
function addBooking() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const bus = document.getElementById("bus").value;

    if (name && email && phone && bus) {
        const newBooking = {
            name: name,
            email: email,
            phone: phone,
            bus: bus
        };

        axios.post("https://crudcrud.com/api/6d1d126e18c5460f877285de11c4c20c/Busbooking", newBooking)
            .then(response => {
                fetchAndRenderBookings();
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("phone").value = "";
            })
            .catch(error => console.error('Error adding booking:', error));
    } else {
        alert('Please fill in all fields.');
    }
}

// Function to delete booking
function deleteBooking(bookingId) {
    axios.delete(`https://crudcrud.com/api/6d1d126e18c5460f877285de11c4c20c/Busbooking/${bookingId}`)
        .then(() => fetchAndRenderBookings())
        .catch(error => console.error('Error deleting booking:', error));
}

// Function to edit booking
function editBooking(id, name, email, phone, bus) {
    const newName = prompt("Enter new name:", name);
    const newEmail = prompt("Enter new email:", email);
    const newPhone = prompt("Enter new phone:", phone);
    const newBus = prompt("Enter new bus:", bus);

    if (newName !== null && newEmail !== null && newPhone !== null && newBus !== null) {
        const updatedBooking = {
            name: newName,
            email: newEmail,
            phone: newPhone,
            bus: newBus
        };

        axios.put(`https://crudcrud.com/api/6d1d126e18c5460f877285de11c4c20c/Busbooking/${id}`, updatedBooking)
            .then(() => fetchAndRenderBookings())
            .catch(error => console.error('Error updating booking:', error));
    }
}

// Initial setup
fetchAndRenderBookings();
