// AI Marketing Summit 2025 - Interactive Behavior

document.addEventListener('DOMContentLoaded', () => {
  // --- COUNTDOWN TIMER ---
  // Target: March 28, 2027 at 10:00 AM PT (so countdown is actively ticking in 2026/2027)
  // Timezone PT: US Pacific (Daylight time starts mid-March, so -07:00 UTC)
  const targetDateStr = '2027-03-28T10:00:00-07:00';
  const targetDate = new Date(targetDateStr).getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      // If it somehow passed, show zeroes
      if (daysEl) daysEl.innerText = '00';
      if (hoursEl) hoursEl.innerText = '00';
      if (minutesEl) minutesEl.innerText = '00';
      if (secondsEl) secondsEl.innerText = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, '0');
  }

  // Update immediately and then every second
  updateCountdown();
  setInterval(updateCountdown, 1000);


  // --- FORM VALIDATION & SUCCESS STATE ---
  const registrationForm = document.getElementById('registration-form');
  const fullNameInput = document.getElementById('full-name');
  const workEmailInput = document.getElementById('work-email');
  const companyNameInput = document.getElementById('company-name');
  
  const landingWrapper = document.getElementById('landing-page-wrapper');
  const successScreen = document.getElementById('success-screen');
  const jokeTextEl = document.getElementById('joke-text');

  const btnGoBack = document.getElementById('btn-go-back');
  const btnAddCalendar = document.getElementById('btn-add-calendar');

  // Curated list of marketing jokes
  const MARKETING_JOKES = [
    "Why did the marketer break up with the calendar? Too many dates, not enough conversions.",
    "Why don't marketers like to go to trampolines? They are terrified of high bounce rates.",
    "How many marketers does it take to change a lightbulb? None, they've already automated it.",
    "Why did the marketing AI go to therapy? It was suffering from too many hallucinations and not enough attribution.",
    "What's a copywriter's favorite drink? Brand-y.",
    "Why did the SEO marketer cross the road? To get hit by search volume.",
    "Why did the email marketer get kicked out of the party? Because they wouldn't stop spamming the dance floor.",
    "What's a marketer's favorite type of clothing? A funnel-neck sweater.",
    "Why did the chatbot fail its marketing exam? It kept giving automated responses instead of thinking outside the box."
  ];

  // Helper to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Remove errors on input/typing
  fullNameInput.addEventListener('input', () => {
    fullNameInput.closest('.form-group').classList.remove('has-error');
  });

  workEmailInput.addEventListener('input', () => {
    workEmailInput.closest('.form-group').classList.remove('has-error');
  });

  // Handle Form Submission
  registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFormValid = true;

    const nameValue = fullNameInput.value.trim();
    const emailValue = workEmailInput.value.trim();

    // Validate Name
    if (nameValue === '') {
      fullNameInput.closest('.form-group').classList.add('has-error');
      isFormValid = false;
    } else {
      fullNameInput.closest('.form-group').classList.remove('has-error');
    }

    // Validate Email
    if (emailValue === '' || !isValidEmail(emailValue)) {
      workEmailInput.closest('.form-group').classList.add('has-error');
      isFormValid = false;
    } else {
      workEmailInput.closest('.form-group').classList.remove('has-error');
    }

    if (isFormValid) {
      handleSuccessfulRegistration(nameValue);
    }
  });

  // Display success view with transitions
  function handleSuccessfulRegistration(name) {
    // Select a random marketing joke
    const randomIndex = Math.floor(Math.random() * MARKETING_JOKES.length);
    jokeTextEl.textContent = `"${MARKETING_JOKES[randomIndex]}"`;

    // Apply smooth transition: Fade out main landing page content
    landingWrapper.style.transition = 'opacity 0.4s ease';
    landingWrapper.style.opacity = '0';

    setTimeout(() => {
      // Hide landing page wrapper and reset styles
      landingWrapper.classList.add('hidden');
      
      // Reveal success screen
      successScreen.classList.remove('hidden');
      
      // Allow browsers to register the removeClass before adding show for transition
      setTimeout(() => {
        successScreen.classList.add('show');
        
        // Trigger simulated confetti effects using absolute elements dynamically
        triggerSimulatedConfetti();
      }, 50);
    }, 400);
  }

  // Back to home button resets everything cleanly
  btnGoBack.addEventListener('click', () => {
    // Smooth transition back
    successScreen.classList.remove('show');
    
    setTimeout(() => {
      successScreen.classList.add('hidden');
      
      // Reset form fields
      registrationForm.reset();
      
      // Clear error classes
      document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('has-error');
      });

      // Show landing wrapper and fade it back in
      landingWrapper.classList.remove('hidden');
      setTimeout(() => {
        landingWrapper.style.opacity = '1';
      }, 50);
    }, 400);
  });

  // Calendar addition simulation
  btnAddCalendar.addEventListener('click', () => {
    // Show a beautiful simulated calendar link action
    const btnText = btnAddCalendar.innerHTML;
    btnAddCalendar.innerHTML = 'Adding...';
    btnAddCalendar.disabled = true;
    
    setTimeout(() => {
      btnAddCalendar.innerHTML = '✓ Added to Calendar';
      btnAddCalendar.style.background = 'rgba(34, 197, 94, 0.1)';
      btnAddCalendar.style.borderColor = '#22c55e';
      btnAddCalendar.style.color = '#22c55e';
      
      // Simple alert confirmation
      alert(`Calendar invitation generated for Sarah Jenkins' Keynote, David Chen's Content session, Elena Rostova's Analytics session, and the Q&A panel. Starts March 28th, 2025 at 10:00 AM PT!`);
    }, 1200);
  });

  // --- Confetti Generation Helper ---
  function triggerSimulatedConfetti() {
    const confettiColors = ['#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];
    
    for (let i = 0; i < 60; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'absolute';
      confetti.style.width = `${Math.random() * 8 + 6}px`;
      confetti.style.height = `${Math.random() * 12 + 6}px`;
      confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      confetti.style.top = `-20px`;
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.opacity = Math.random();
      confetti.style.borderRadius = '2px';
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      // Random animation parameters
      const duration = Math.random() * 3 + 2;
      const horizontalShift = (Math.random() - 0.5) * 200;
      
      confetti.style.transition = `top ${duration}s linear, left ${duration}s ease-out, transform ${duration}s ease-in-out, opacity ${duration}s ease-out`;
      successScreen.appendChild(confetti);
      
      // Trigger movement frame
      setTimeout(() => {
        confetti.style.top = '105vh';
        confetti.style.left = `calc(${confetti.style.left} + ${horizontalShift}px)`;
        confetti.style.transform = `rotate(${Math.random() * 1080}deg)`;
        confetti.style.opacity = '0';
      }, 100);

      // Clean up DOM after animation completes
      setTimeout(() => {
        confetti.remove();
      }, duration * 1000 + 200);
    }
  }
});
