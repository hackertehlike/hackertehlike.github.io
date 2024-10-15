document.addEventListener('DOMContentLoaded', function () {
    // Fetch the chapter data from the JSON file
    function fetchChapters() {
        console.log("Fetching chapters...");
        fetch('/chapters.json') // Use an absolute path to ensure it works regardless of URL depth
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log("Chapters fetched successfully.");
                return response.json();
            })
            .then(data => {
                console.log("Data received:", data);
                handleChapterNavigation(data); // Update navigation for the current chapter
            })
            .catch(err => console.error('Failed to load chapters:', err));
    }

    // Function to update chapter navigation (Previous/Next)
    function handleChapterNavigation(data) {
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

        // Update the Next/Previous links
        const prevChapterLink = document.getElementById('prev-chapter');
        const nextChapterLink = document.getElementById('next-chapter');

        // Previous Chapter
        if (currentIndex > 0) {
            prevChapterLink.href = chapters[currentIndex - 1].url;
            prevChapterLink.style.visibility = 'visible';
        } else {
            prevChapterLink.style.visibility = 'hidden'; // Hide if it's the first chapter
        }

        // Next Chapter
        if (currentIndex < chapters.length - 1) {
            nextChapterLink.href = chapters[currentIndex + 1].url;
            nextChapterLink.style.visibility = 'visible';
        } else {
            nextChapterLink.style.visibility = 'hidden'; // Hide if it's the last chapter
        }

        // Optionally, update the chapter title in the HTML
        document.getElementById('chapter-title').textContent = chapters[currentIndex].title;
    }

    // Fetch chapters when the page loads
    fetchChapters();
});
