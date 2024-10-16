document.addEventListener('DOMContentLoaded', () => {
    console.log("menu-bar-loader.js loaded");

    // Load the footer into the page
    fetch('/menu-bar.html')  // Ensure the correct path to menu-bar.html
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            // Inject the loaded footer HTML into the body
            document.body.insertAdjacentHTML('beforeend', data);

            // Wait for footer to be injected before initializing its components
            initializeFooter();
        })
        .catch(error => console.error('Error loading footer:', error));

    // Function to initialize footer components after loading
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
                                    "i'm doing my best okay * no seriously * this isn't as easy as it looks * " +
                                    "so i made this website so you can see what i've been up to * " +
                                    "and obviously i've been up to a lot of things * why won't these boxes go where i want them to go * " +
                                    "so anyway * as i've said i've been up to a lot of things * " +
                                    "you can click on the icons to see what i've been up to * some of it anyway * " +
                                    "for example, i've been learning how to make websites * " +
                                    "but you don't need to click on an icon to see that because you're already on a website i've made * " +
                                    "but also i've been up to some other things * mostly i've been up to some other things * " +
                                    "like for example, not doing the school work i'm supposed to be doing * css goes brrr * " +
                                    "actually the menu button doesn't work but that's because i don't know what to put there yet * " +
                                    "why did i make it clickable then? * it's a prank bro * " +
                                    "did you know that no one knows what css stands for * css stands for <s>cool stuff</s> * " +
                                    "css stands for cascading style sheets * thank you for being here * i hope you enjoy your stay *";


            const customText = document.body.getAttribute('data-scrolling-text') || defaultText;
            scrollingTextElement.textContent = customText;

            // Set the scroll duration and translateX based on text length
            const textLength = customText.length;
            const scrollDuration = textLength * 0.3; // Adjust this factor to control the speed
            const translateXDistance = textLength * 10; // Adjust this factor to control distance

            // Ensure scrolling styles are set correctly
            scrollingTextElement.style.whiteSpace = 'nowrap';
            scrollingTextElement.style.display = 'inline-block';
            scrollingTextElement.style.animation = `scroll ${scrollDuration}s linear infinite`;

            // Update the keyframes with dynamic translateX distance
            const dynamicStyle = document.createElement('style');
            dynamicStyle.innerHTML = `
                @keyframes scroll {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-${translateXDistance}%); }
                }
            `;
            document.head.appendChild(dynamicStyle);
        } else {
            console.error("Scrolling text element not found");
        }
    }
});
