function updateTimeAndDate() {
    const now = new Date();
    
    // Update time
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    document.querySelector('.clock .time').textContent = timeString;

    // Update date
    const dateString = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    document.querySelector('.clock .date').textContent = dateString;
}

function openModal() {
    document.getElementById('writingModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('writingModal').style.display = 'none';
}



setInterval(updateTimeAndDate, 60000);
updateTimeAndDate();

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('writingModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
