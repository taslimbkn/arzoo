// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Booking Form Handling
const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        message: document.getElementById('message').value
    };

    // Here you would typically send the data to your backend
    // For demonstration, we'll show a success message
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        alert('Booking submitted successfully! Redirecting to payment...');
        
        // Here you would redirect to payment gateway
        // window.location.href = 'payment.html';
        
    } catch (error) {
        alert('There was an error processing your booking. Please try again.');
    }
});

// Date Input Validation
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Time Input Validation
const timeInput = document.getElementById('time');
timeInput.addEventListener('change', () => {
    const selectedTime = timeInput.value;
    const [hours, minutes] = selectedTime.split(':');
    
    // Restrict booking times to business hours (9 AM to 5 PM)
    if (hours < 9 || hours >= 17) {
        alert('Please select a time between 9 AM and 5 PM');
        timeInput.value = '';
    }
});

// Testimonials Slider
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.testimonial-dots');

let currentSlide = 0;

// Create dots
testimonialSlides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

// Initialize first slide
testimonialSlides[0].classList.add('active');

function updateSlides() {
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonialSlides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    updateSlides();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
    updateSlides();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlides();
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Auto-advance slides every 5 seconds
setInterval(nextSlide, 5000);

// Services Modal Functionality
const serviceDetails = {
    relationship: {
        title: "Relationship Coaching",
        description: `Our relationship coaching services help couples:
            • Improve communication skills
            • Resolve conflicts effectively
            • Build trust and intimacy
            • Strengthen emotional connections
            • Navigate major life transitions`,
        duration: "60 minutes",
        price: "$120 per session",
        includes: ["Initial assessment", "Personalized action plan", "Weekly progress tracking", "Communication tools"]
    },
    parenting: {
        title: "Parenting Support",
        description: `Our parenting support services help parents:
            • Develop effective discipline strategies
            • Understand child development stages
            • Build stronger parent-child relationships
            • Handle challenging behaviors
            • Create positive family dynamics`,
        duration: "45 minutes",
        price: "$100 per session",
        includes: ["Parenting style assessment", "Customized parenting plan", "Behavior management strategies", "Regular progress reviews"]
    },
    family: {
        title: "Family Counseling",
        description: `Our family counseling services help families:
            • Improve family communication
            • Resolve family conflicts
            • Strengthen family bonds
            • Navigate life transitions
            • Create healthy boundaries`,
        duration: "90 minutes",
        price: "$150 per session",
        includes: ["Family dynamics assessment", "Conflict resolution tools", "Family action plan", "Follow-up support"]
    }
};

// Create modal HTML
const modalHTML = `
    <div class="service-modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2 id="modal-title"></h2>
            <p id="modal-description"></p>
            <div class="modal-details">
                <p><strong>Duration:</strong> <span id="modal-duration"></span></p>
                <p><strong>Price:</strong> <span id="modal-price"></span></p>
                <h4>Includes:</h4>
                <ul id="modal-includes"></ul>
            </div>
            <a href="#booking" class="cta-button">Book Now</a>
        </div>
    </div>
`;

// Add modal to body
document.body.insertAdjacentHTML('beforeend', modalHTML);

const modal = document.querySelector('.service-modal');
const closeModal = document.querySelector('.close-modal');

function showServiceDetails(serviceType) {
    const service = serviceDetails[serviceType];
    document.getElementById('modal-title').textContent = service.title;
    document.getElementById('modal-description').innerHTML = service.description;
    document.getElementById('modal-duration').textContent = service.duration;
    document.getElementById('modal-price').textContent = service.price;
    
    const includesList = document.getElementById('modal-includes');
    includesList.innerHTML = service.includes
        .map(item => `<li>${item}</li>`)
        .join('');
    
    modal.style.display = 'flex';
}

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Update service selection in booking form
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        const serviceType = card.getAttribute('data-service');
        const serviceSelect = document.getElementById('service');
        serviceSelect.value = serviceType;
    });
}); 