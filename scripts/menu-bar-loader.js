document.addEventListener('DOMContentLoaded', () => {
    console.log("menu-bar-loader.js loaded");

    // Load the footer into the page
    fetch('/menu-bar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            // Inject the loaded footer HTML into the body
            document.body.insertAdjacentHTML('beforeend', data);

            // Inject the styles and initialize the footer components
            injectFooterStyles();
            initializeFooter();
        })
        .catch(error => console.error('Error loading footer:', error));

    function initializeFooter() {
        // Update the clock and date
        const updateClock = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const dateString = now.toLocaleDateString([], { year: 'numeric', month: 'short', day: '2-digit' });

            // Ensure the clock elements are available before updating
            const timeElement = document.querySelector('.clock .time');
            const dateElement = document.querySelector('.clock .date');
            if (timeElement && dateElement) {
                timeElement.textContent = timeString;
                dateElement.textContent = dateString;
            }
        };

        // Call the clock function once initially and set it to update every second
        updateClock();
        setInterval(updateClock, 1000);

        // Set custom scrolling text based on the data-scrolling-text attribute in the body tag
        const scrollingTextElement = document.querySelector('.scrolling-text');
        if (scrollingTextElement) {
            console.log("Scrolling text element found");

            const defaultText = "* welcome to my website * please stand by * this website is under construction * " +
                "i'm doing my best okay * no seriously * this isn't as easy as it looks * so i made this website so you can see what i've been up to *";

            const customText = document.body.getAttribute('data-scrolling-text') || defaultText;
            scrollingTextElement.textContent = customText;

            // Set the scroll duration based on the text length
            const textLength = customText.length;
            const scrollDuration = textLength * 0.3; // Adjust this factor to control the speed

            // Update the scrolling animation duration dynamically
            scrollingTextElement.style.animation = `scroll ${scrollDuration}s linear infinite`;
        } else {
            console.error("Scrolling text element not found");
        }
    }

    function injectFooterStyles() {
        console.log("Injecting footer styles");

        const footerStyles = `
            @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans&display=swap');

            body {
                background-color: #FFC0CB;
                font-family: 'Pixelify Sans', Courier, monospace;
                color: #000;
                font-size: 18px;
                cursor: url('/icons/cursor.png'), auto;
            }

            .menu-button {
                background-color: #d3cbc4;
                border: none;
                font-family: 'Press Start 2P', Courier, monospace;
                font-size: 16px !important;
                padding: 10px 20px;
                cursor: url('/icons/cursor.png'), auto;
                border-left: 2px solid white;
                border-top: 2px solid white;
                border-right: 2px solid gray;
                border-bottom: 2px solid gray;
                transition: background-color 0.3s;
            }

            .menu-button:hover {
                background-color: #486b48;
            }

            .footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: #d3cbc4;
                padding: 10px;
                position: fixed;
                bottom: 0;
                width: 100%;
            }

            .status-bar {
                overflow: hidden;
                width: 800px;
                display: flex;
            }

            .scrolling-text {
                white-space: nowrap;
                display: inline-block;
                animation: scroll 150s linear infinite;
                font-family: 'Press Start 2P', Courier, monospace;
                font-size: 16px;
                color: #000;
            }

            @keyframes scroll {
                0% {
                    transform: translateX(5%);
                }
                100% {
                    transform: translateX(-100%);
                }
            }

            .clock {
                display: flex;
                align-items: center;
                margin-right: 20px;
            }

            .separator {
                margin: 0 10px;
                font-family: 'Press Start 2P', Courier, monospace;
                font-size: 18px;
            }

            .clock .date, .clock .time {
                font-family: 'Press Start 2P', Courier, monospace;
                font-size: 16px;
                margin-left: 10px;
            }

            .clock-icon {
                width: 20px;
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.innerHTML = footerStyles;
        document.head.appendChild(styleElement);
    }
});
