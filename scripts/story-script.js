document.addEventListener('DOMContentLoaded', function () {
    // Function to toggle the chapter list visibility
    function toggleChapterMenu() {
        const chapterList = document.getElementById('chapter-list');
        if (chapterList) { // Ensure chapter list exists
            chapterList.style.display = chapterList.style.display === 'block' ? 'none' : 'block';
        }
    }

    // Fetch the chapter data from the JSON file
    function fetchChapters() {
        console.log("Fetching chapters...");
        fetch('/chapters.json') // Ensure the path to chapters.json is correct
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                handleChapterNavigation(data); // Update navigation for the current chapter
                populateChapterMenu(data); // Populate the chapter menu
                checkIfSingleChapterStory(data); // Check if the story has only one chapter
            })
            .catch(err => console.error('Failed to load chapters:', err));
    }

    // Function to update chapter navigation (Previous/Next)
    function handleChapterNavigation(data) {
        const prevChapterLink = document.getElementById('prev-chapter');
        const nextChapterLink = document.getElementById('next-chapter');
        
        if (!prevChapterLink || !nextChapterLink) {
            console.error('Navigation links are missing on the page.');
            return;
        }

        const currentURL = window.location.pathname.split("/").pop(); // Get the current chapter filename (e.g., chapter1.html)
        const storySlug = window.location.pathname.split("/")[2]; // Get the story folder name (e.g., 3rfm)
    
        // Find the current story based on the slug in the URL
        const currentStory = data.stories.find(story => story.slug === storySlug);
        if (!currentStory) {
            console.error('Story not found');
            return;
        }

        const chapters = currentStory.chapters;
        const currentIndex = chapters.findIndex(chapter => chapter.url.includes(currentURL));
        if (currentIndex === -1) {
            console.error('Chapter not found');
            return;
        }

        // Previous Chapter
        if (currentIndex > 0) {
            prevChapterLink.href = chapters[currentIndex - 1].url; // Use absolute URL from chapters.json
            prevChapterLink.style.display = 'inline-block'; // Make sure it's visible
        } else {
            prevChapterLink.style.display = 'none'; // Hide if it's the first chapter
        }

        // Next Chapter
        if (currentIndex < chapters.length - 1) {
            nextChapterLink.href = chapters[currentIndex + 1].url; // Use absolute URL from chapters.json
            nextChapterLink.style.display = 'inline-block'; // Make sure it's visible
        } else {
            nextChapterLink.style.display = 'none'; // Hide if it's the last chapter
        }

        // Optionally, update the chapter title in the HTML
        const chapterTitleElement = document.getElementById('chapter-title');
        if (chapterTitleElement) {
            chapterTitleElement.textContent = chapters[currentIndex].title;
        }
    }
    
    // Function to populate chapter menu dynamically
    function populateChapterMenu(data) {
        const chapterList = document.getElementById('chapter-list');
        if (!chapterList) {
            console.error('Chapter list element is missing on the page.');
            return;
        }

        const currentURL = window.location.pathname.split("/").pop();
        const storySlug = window.location.pathname.split("/")[2];
        const currentStory = data.stories.find(story => story.slug === storySlug);

        if (!currentStory) {
            console.error('Story not found');
            return;
        }

        chapterList.innerHTML = ''; // Clear existing content

        currentStory.chapters.forEach(chapter => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = chapter.url; // Use absolute URL from chapters.json
            link.textContent = chapter.title;
            li.appendChild(link);
            chapterList.appendChild(li);
        });
    }

    // Function to check if the story has only one chapter and hide the menu and buttons
    function checkIfSingleChapterStory(data) {
        const chapterMenu = document.querySelector('.chapter-menu');
        const prevNextNav = document.querySelector('.prev-next');

        const currentURL = window.location.pathname.split("/").pop();
        const storySlug = window.location.pathname.split("/")[2];
        const currentStory = data.stories.find(story => story.slug === storySlug);

        if (!currentStory) {
            console.error('Story not found');
            return;
        }

        const chapters = currentStory.chapters;

        // If there's only one chapter, hide the navigation and menu
        if (chapters.length === 1) {
            console.log("This is a single-chapter story. Hiding navigation and menu.");
            if (chapterMenu) chapterMenu.style.display = 'none'; // Hide chapter menu
            if (prevNextNav) prevNextNav.style.display = 'none'; // Hide prev/next buttons
        }
    }

    // Add event listener to toggle the chapter menu
    const chapterMenuButton = document.querySelector('.chapter-menu button');
    if (chapterMenuButton) {
        chapterMenuButton.addEventListener('click', toggleChapterMenu);
    }

    // Fetch chapters when the page loads
    fetchChapters();
});
