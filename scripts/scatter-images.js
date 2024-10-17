document.addEventListener('DOMContentLoaded', () => {
    const imageFolderPath = '/pictures/';
    const imageNames = [
        'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 
        'img6.jpg', 'img7.jpg', 'img8.jpg', 'img9.jpg', 'img10.jpg', 
        'img11.jpg', 'img12.jpg', 'img13.jpg', 'img14.jpg', 'img15.jpg', 
        'img16.jpg', 'img17.jpg', 'img18.jpg', 'img19.jpg', 'img20.jpg', 
        'img21.jpg', 'img22.jpg', 'img23.jpg'
    ];
    
    const container = document.getElementById('images-container');
    const placedImages = [];
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const overlay = document.getElementById('modal-overlay');
    let zIndexCounter = 1; // To keep track of the highest z-index
    imageNames.forEach(name => {
        const img = document.createElement('img');
        img.src = imageFolderPath + name;
        img.classList.add('scattered-image');
        img.style.position = 'absolute';
    
        // Ensure the larger dimension is set to 250px
        img.onload = () => {
            if (img.naturalWidth > img.naturalHeight) {
                img.style.width = '250px';
                img.style.height = 'auto';
            } else {
                img.style.height = '250px';
                img.style.width = 'auto';
            }
    
            // Place the image ensuring it stays within the container boundaries
            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;
    
            const maxLeft = containerWidth - img.offsetWidth;
            const maxTop = containerHeight - img.offsetHeight;
    
            img.style.left = Math.random() * maxLeft + 'px';
            img.style.top = Math.random() * maxTop + 'px';
        };
    
        placedImages.push(img);
        container.appendChild(img);
    
        // Enlarge image on click, but not after dragging
        let dragged = false;
    
        img.addEventListener('mousedown', () => {
            dragged = false;
        });
    
        img.addEventListener('mousemove', () => {
            dragged = true;
        });
    
        img.addEventListener('mouseup', () => {
            if (!dragged) {
                modalImg.src = img.src;  // Set the image source before showing the modal
                modalImg.onload = () => { // Only show modal after the new image is fully loaded
                    modal.style.display = 'block';
                    overlay.style.display = 'block';
                };
            }
        });
    
        // Make images draggable and bring to front on interaction
        img.addEventListener('mousedown', (e) => {
            e.preventDefault();
            // Bring the clicked image to the top
            img.style.zIndex = ++zIndexCounter;
    
            const shiftX = e.clientX - img.getBoundingClientRect().left;
            const shiftY = e.clientY - img.getBoundingClientRect().top;
    
            const moveAt = (pageX, pageY) => {
                const newLeft = Math.min(container.offsetWidth - img.offsetWidth, Math.max(0, pageX - shiftX));
                const newTop = Math.min(container.offsetHeight - img.offsetHeight, Math.max(0, pageY - shiftY));
    
                img.style.left = newLeft + 'px';
                img.style.top = newTop + 'px';
            };
    
            const onMouseMove = (e) => {
                moveAt(e.pageX, e.pageY);
            };
    
            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                dragged = false; // Reset dragged state
            };
    
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
    
            img.ondragstart = () => false; // Prevent default drag behavior
        });
    });
    

    // Close modal when clicking on overlay
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            modal.style.display = 'none';
            overlay.style.display = 'none';
        }
    });

    // Close modal when clicking outside the image in the modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            overlay.style.display = 'none';
        }
    });
});
