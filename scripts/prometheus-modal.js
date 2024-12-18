document.addEventListener('DOMContentLoaded', function () {
    console.log("Game soundtrack modal loaded.");

    // Function to open a modal
    function openModal(modalId) {
        console.log("Opening modal...", modalId);
        document.getElementById(modalId).style.display = 'block';
    }

    // Function to close the modal
    function closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    // Close the modal when clicking outside of it
    window.onclick = function(event) {
        const prometheusModal = document.getElementById('prometheusModal');
        if (event.target === prometheusModal) {
            closeModal('prometheusModal');
        }
    }

    // Attach the openModal function to the "Prometheus" icon button
    const openPrometheusModalButton = document.getElementById('open-prometheus-modal');
    if (openPrometheusModalButton) {
        openPrometheusModalButton.addEventListener('click', function(event) {
            event.preventDefault();  // Prevents the default behavior of the link
            openModal('prometheusModal');
        });
    }

    // Attach the closeModal function to the close button inside the modal
    const closeModalButtons = document.querySelectorAll('.close, .close-btn');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            closeModal(button.closest('.modal').id);
        });
    });

    // Function to play the selected music file
    window.playMusic = function(filename) {
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.src = '/music/' + filename; // Ensure this path is correct
        audioPlayer.style.display = 'block'; // Show the audio player when playing a track
        audioPlayer.play();
        console.log("Playing:", filename);
    }
});
