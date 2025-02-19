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
const genderSelect = document.getElementById('gender');
const genderNotice = document.querySelector('.gender-notice');
const submitButton = document.querySelector('.submit-button');

// Gender validation
genderSelect.addEventListener('change', () => {
    if (genderSelect.value !== 'female') {
        genderNotice.style.display = 'block';
        submitButton.disabled = true;
        submitButton.style.opacity = '0.5';
    } else {
        genderNotice.style.display = 'none';
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
    }
});

// Date and Time Input Validation
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Time validation based on selected date
function validateTimeSlot() {
    const selectedDate = new Date(dateInput.value);
    const selectedTime = timeInput.value;
    const [hours, minutes] = selectedTime.split(':');
    const dayOfWeek = selectedDate.getDay(); // 0 is Sunday, 6 is Saturday
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Convert hours to number for comparison
    const hour = parseInt(hours);

    // Weekend validation (10 AM to 10 PM)
    if (isWeekend) {
        if (hour < 10 || hour >= 22) {
            alert('Weekend appointments are available between 10 AM and 10 PM only');
            timeInput.value = '';
            return false;
        }
    } 
    // Weekday validation (7 PM to 10 PM)
    else {
        if (hour < 19 || hour >= 22) {
            alert('Weekday appointments are available between 7 PM and 10 PM only');
            timeInput.value = '';
            return false;
        }
    }
    return true;
}

// Add event listeners for date and time inputs
dateInput.addEventListener('change', () => {
    if (timeInput.value) {
        validateTimeSlot();
    }
});

timeInput.addEventListener('change', validateTimeSlot);

// Update the booking form submission handler
bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Gender validation
    if (genderSelect.value !== 'female') {
        alert('Our services are currently available for women only.');
        return;
    }

    // Time slot validation
    if (!validateTimeSlot()) {
        return;
    }

    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        gender: document.getElementById('gender').value,
        service: document.getElementById('service').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        message: document.getElementById('message').value
    };

    try {
        // Show payment instructions
        alert(`Please complete your payment using PhonePe:\n\n` +
              `1. Open PhonePe app\n` +
              `2. Scan the QR code\n` +
              `3. Amount: ${serviceDetails[formData.service].price}\n` +
              `4. UPI ID: 9352831309@axl\n\n` +
              `Your booking will be confirmed after payment.`);
        
    } catch (error) {
        alert('There was an error processing your booking. Please try again.');
    }
});

// Testimonials Slider
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.testimonial-dots');

let currentSlide = 0;

// Initialize testimonials
function initializeTestimonials() {
    // Create dots
    testimonialSlides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Set initial active slide
    testimonialSlides[0].classList.add('active');
}

function updateSlides() {
    testimonialSlides.forEach((slide, index) => {
        slide.classList.remove('active');
        slide.style.transition = 'opacity 0.5s ease-in-out';
        if (index === currentSlide) {
            slide.classList.add('active');
        }
    });

    // Update dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
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

// Initialize testimonials when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeTestimonials();
    
    // Add event listeners for navigation
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }

    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
});

// Services Modal Functionality
const serviceDetails = {
    relationship: {
        title: "Women's Relationship Coaching",
        description: `Our relationship coaching services help couples:
            • Improve communication skills
            • Resolve conflicts effectively
            • Build trust and intimacy
            • Strengthen emotional connections
            • Navigate major life transitions`,
        duration: "60 minutes",
        price: "Rs. 499 per session",
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
        price: "Rs. 999 per session",
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
        price: "Rs. 1499 per session",
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