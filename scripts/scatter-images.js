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
        };

        let overlap;
        let attempts = 0;
        do {
            if (attempts > 100) {
                container.style.height = container.offsetHeight + 500 + 'px';
                attempts = 0;
            }
            img.style.top = Math.random() * container.offsetHeight + 'px';
            img.style.left = Math.random() * container.offsetWidth + 'px';

            overlap = placedImages.some(existingImg => {
                const rect1 = img.getBoundingClientRect();
                const rect2 = existingImg.getBoundingClientRect();
                return !(rect1.right < rect2.left || 
                         rect1.left > rect2.right || 
                         rect1.bottom < rect2.top || 
                         rect1.top > rect2.bottom);
            });
            attempts++;
        } while (overlap);

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
                modal.style.display = 'block';
                overlay.style.display = 'block';
                modalImg.src = img.src;
            }
        });

        // Make images draggable
        img.addEventListener('mousedown', (e) => {
            e.preventDefault();
            const shiftX = e.clientX - img.getBoundingClientRect().left;
            const shiftY = e.clientY - img.getBoundingClientRect().top;

            const moveAt = (pageX, pageY) => {
                img.style.left = Math.min(container.offsetWidth - img.offsetWidth, Math.max(0, pageX - shiftX)) + 'px';
                img.style.top = Math.max(0, pageY - shiftY) + 'px';
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
