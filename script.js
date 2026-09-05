// Sample data - replace with your own images
let images = [
    {
        id: 1,
        title: 'Amazing Sunset',
        url: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=400&h=400&fit=crop',
        redirectUrl: 'https://example.com/1',
        likes: 245,
        liked: false
    },
    {
        id: 2,
        title: 'Ocean Waves',
        url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=400&fit=crop',
        redirectUrl: 'https://example.com/2',
        likes: 189,
        liked: false
    },
    {
        id: 3,
        title: 'Mountain Peak',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
        redirectUrl: 'https://example.com/3',
        likes: 312,
        liked: false
    },
    {
        id: 4,
        title: 'Forest Path',
        url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
        redirectUrl: 'https://example.com/4',
        likes: 267,
        liked: false
    },
    {
        id: 5,
        title: 'Desert Dunes',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
        redirectUrl: 'https://example.com/5',
        likes: 198,
        liked: false
    },
    {
        id: 6,
        title: 'City Lights',
        url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=400&fit=crop',
        redirectUrl: 'https://example.com/6',
        likes: 421,
        liked: false
    }
];

// DOM Elements
const feedGrid = document.getElementById('feedGrid');
const uploadBtn = document.getElementById('uploadBtn');
const imageModal = document.getElementById('imageModal');
const uploadModal = document.getElementById('uploadModal');
const closeModal = document.getElementById('closeModal');
const closeUploadModal = document.getElementById('closeUploadModal');
const uploadForm = document.getElementById('uploadForm');
const likeBtn = document.getElementById('likeBtn');
const commentBtn = document.getElementById('commentBtn');

let currentImageId = null;

// Load images on page load
document.addEventListener('DOMContentLoaded', () => {
    loadFeed();
    setupEventListeners();
});

// Load and display feed
function loadFeed() {
    feedGrid.innerHTML = '';
    images.forEach(image => {
        const card = createImageCard(image);
        feedGrid.appendChild(card);
    });
}

// Create image card element
function createImageCard(image) {
    const card = document.createElement('div');
    card.className = 'image-card';
    card.innerHTML = `
        <img src="${image.url}" alt="${image.title}" onerror="this.src='https://via.placeholder.com/300?text=Image+Error'">
        <div class="image-card-overlay">
            <div class="image-card-title">${image.title}</div>
            <div class="image-card-stats">
                <span>❤️ ${image.likes}</span>
                <span>💬 0</span>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => openImageModal(image));
    return card;
}

// Open image modal
function openImageModal(image) {
    currentImageId = image.id;
    document.getElementById('modalImage').src = image.url;
    document.getElementById('modalTitle').textContent = image.title;
    document.getElementById('redirectLink').href = image.redirectUrl;
    document.getElementById('likeCount').textContent = image.likes;
    
    // Update like button state
    const likeBtn = document.getElementById('likeBtn');
    if (image.liked) {
        likeBtn.classList.add('liked');
    } else {
        likeBtn.classList.remove('liked');
    }
    
    imageModal.classList.add('show');
}

// Close image modal
function closeImageModalFunc() {
    imageModal.classList.remove('show');
    currentImageId = null;
}

// Open upload modal
function openUploadModal() {
    uploadModal.classList.add('show');
}

// Close upload modal
function closeUploadModalFunc() {
    uploadModal.classList.remove('show');
    uploadForm.reset();
}

// Setup event listeners
function setupEventListeners() {
    uploadBtn.addEventListener('click', openUploadModal);
    closeModal.addEventListener('click', closeImageModalFunc);
    closeUploadModal.addEventListener('click', closeUploadModalFunc);
    
    // Like button
    likeBtn.addEventListener('click', () => {
        const image = images.find(img => img.id === currentImageId);
        if (image) {
            image.liked = !image.liked;
            image.likes += image.liked ? 1 : -1;
            document.getElementById('likeCount').textContent = image.likes;
            likeBtn.classList.toggle('liked');
        }
    });
    
    // Upload form
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newImage = {
            id: images.length + 1,
            title: document.getElementById('imageTitle').value,
            url: document.getElementById('imageUrl').value,
            redirectUrl: document.getElementById('redirectUrl').value,
            likes: 0,
            liked: false
        };
        
        images.unshift(newImage);
        loadFeed();
        closeUploadModalFunc();
        
        // Show success message
        alert('Image uploaded successfully! 🎉');
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            closeImageModalFunc();
        }
        if (e.target === uploadModal) {
            closeUploadModalFunc();
        }
    });
}

// Infinite scroll (optional)
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        // Load more images if needed
        console.log('Reached bottom - load more images');
    }
});