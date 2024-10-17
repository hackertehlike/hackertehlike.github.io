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
    
            const timeElement = document.querySelector('.clock .time');
            const dateElement = document.querySelector('.clock .date');
            if (timeElement && dateElement) {
                timeElement.textContent = timeString;
                dateElement.textContent = dateString;
            }
        };
        updateClock();
        setInterval(updateClock, 500);
    
        // Handle the scrolling text
        const scrollingTextElement = document.querySelector('.scrolling-text');
        if (scrollingTextElement) {
            const customText = document.body.getAttribute('data-scrolling-text');
            if (customText) scrollingTextElement.textContent = customText; // Only update if attribute is present
    
            const textLength = scrollingTextElement.textContent.length;
            const scrollDuration = textLength * 0.4; // Adjust this factor to control the speed
            scrollingTextElement.style.animation = `scroll ${scrollDuration}s linear infinite`;
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
                background-color: #bababa;
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
                z-index: 1000;
            }
    
            .status-bar, .scrolling-text, .clock {
                font-family: 'Press Start 2P', Courier, monospace;
            }
    
            .scrolling-text {
                white-space: nowrap;
                display: inline-block;
                animation: scroll 150s linear infinite;
                font-size: 16px;
                color: #000;
            }
    
            @keyframes scroll {
                0% { transform: translateX(5%); }
                100% { transform: translateX(-100%); }
            }
    
            .clock {
                display: flex;
                align-items: center;
                margin-right: 20px;
            }
    
            .separator {
                margin: 0 10px;
                font-size: 18px;
            }
    
            .clock .date, .clock .time {
                font-size: 16px;
                margin-left: 10px;
            }
            
            .clock-icon {
                width: 20px;  // You can reduce this size further if needed
                height: auto; // Maintain aspect ratio
                vertical-align: middle; // Aligns the icon with the surrounding text
            }

    
            /* Responsive adjustments */
            @media screen and (max-width: 768px) {
                .menu-button {
                    font-size: 12px; /* Smaller font size */
                    padding: 6px 12px; /* Adjust padding */
                }
    
                .scrolling-text {
                    font-size: 12px; /* Smaller font size */
                    animation: scroll 120s linear infinite; /* Faster scroll to fit smaller text */
                }
    
                .footer {
                    flex-direction: column; /* Stack elements vertically */
                    padding: 5px;
                }
    
                .clock {
                    margin-bottom: 5px; /* Space between clock and other elements */
                }
            }
    
            @media screen and (max-width: 480px) {
                .menu-button {
                    font-size: 10px; /* Even smaller font size */
                    padding: 5px 10px; /* Further reduce padding */
                }
    
                .scrolling-text {
                    font-size: 10px; /* Reduce text size further */
                    animation: scroll 100s linear infinite; /* Adjust scrolling speed */
                }
    
                .footer {
                    padding: 5px;
                    justify-content: center; /* Center everything */
                }
            }
        `;
    
        const styleElement = document.createElement('style');
        styleElement.innerHTML = footerStyles;
        document.head.appendChild(styleElement);
    }
    
});
