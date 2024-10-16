document.addEventListener('DOMContentLoaded', function () {
    // Embedded story data is already available in `window.storyData`

    // Function to update chapter title (if applicable)
    function updateChapterTitle() {
        const currentURL = window.currentChapterUrl;
        const storyData = window.storyData;

        const currentIndex = storyData.chapters.findIndex(chapter => chapter.url === currentURL);
        if (currentIndex === -1) {
            console.error('Chapter not found in story data');
            return;
        }

        // Optionally, update the chapter title in the HTML
        const chapterTitleElement = document.getElementById('chapter-title');
        if (chapterTitleElement) {
            chapterTitleElement.textContent = storyData.chapters[currentIndex].title;
        }
    }

    // Update chapter title when the page loads
    updateChapterTitle();
});
