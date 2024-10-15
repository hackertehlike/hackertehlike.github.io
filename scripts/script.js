// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    
    // Function to open the writing modal
    function openModal() {
        console.log("Opening modal...");
        document.getElementById('writingModal').style.display = 'block';
    }

    // Function to close the modal
    function closeModal() {
        document.getElementById('writingModal').style.display = 'none';
    }

    // Function to close the modal when clicking outside of it
    window.onclick = function(event) {
        const modal = document.getElementById('writingModal');
        if (event.target === modal) {
            closeModal();
        }
    }

    // Attach the openModal function to the "writing" icon button
    const openModalButton = document.getElementById('open-writing-modal');
    openModalButton.addEventListener('click', function(event) {
        event.preventDefault();  // Prevents the default behavior of the link
        openModal();
    });

    // Attach the closeModal function to the close button inside the modal
    const closeModalButton = document.querySelector('.close-btn');
    closeModalButton.addEventListener('click', function() {
        closeModal();
    });

    // Update the time and date in the footer
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

    // Update time and date every 60 seconds
    setInterval(updateTimeAndDate, 60000);
    updateTimeAndDate();

    // Fetch the chapter data from the JSON file for writing modal
    function fetchChapters() {
        console.log("Fetching chapters...");
        fetch('chapters.json') // Make sure the path is correct
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log("Chapters fetched successfully.");
                return response.json();
            })
            .then(data => {
                console.log("Data received:", data);
                populateWritingModal(data); // Populate the writing modal
            })
            .catch(err => console.error('Failed to load chapters:', err));
    }

    // Function to dynamically populate the Writing Modal from JSON
    function populateWritingModal(data) {
        console.log("Populating writing modal...");
        const modalBody = document.querySelector('.modal-body ul');
        modalBody.innerHTML = ''; // Clear previous entries

        // Loop through each story
        data.stories.forEach(story => {
            console.log("Processing story:", story.title);

            // Add the story title as a regular link for single-chapter stories
            if (story.chapters.length === 1) {
                const li = document.createElement('li');
                const link = document.createElement('a');
                link.href = story.chapters[0].url;
                link.textContent = story.title;
                li.appendChild(link);
                modalBody.appendChild(li);
            }
            // Add collapsible section for multi-chapter stories
            else {
                const li = document.createElement('li');
                const link = document.createElement('a');
                link.href = 'javascript:void(0)';
                link.textContent = story.title;
                link.classList.add('collapsible');
                link.onclick = () => toggleCollapse(link);
                li.appendChild(link);

                const chapterList = document.createElement('ul');
                chapterList.classList.add('chapter-list');
                chapterList.style.display = 'none';

                story.chapters.forEach(chapter => {
                    const chapterLi = document.createElement('li');
                    const chapterLink = document.createElement('a');
                    chapterLink.href = chapter.url;
                    chapterLink.textContent = chapter.title;
                    chapterLi.appendChild(chapterLink);
                    chapterList.appendChild(chapterLi);
                });

                li.appendChild(chapterList);
                modalBody.appendChild(li);
            }
        });
        // Add listeners for collapsible buttons after rendering
        addCollapsibleListeners();
        console.log("Writing modal populated.");
    }

    // Function to add event listeners to collapsible elements
    function addCollapsibleListeners() {
        document.querySelectorAll('.collapsible').forEach(button => {
            button.addEventListener('click', function() {
                // Toggle the visibility of the next sibling (chapter list)
                const content = this.nextElementSibling;
                content.style.display = (content.style.display === "block") ? "none" : "block";
            });
        });
    }

    // Fetch chapters when the page loads
    fetchChapters();
});
