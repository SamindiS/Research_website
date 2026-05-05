document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Particles for Hero Section
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: ['#02b2aa', '#f6a112', '#ffffff'] },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 4, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#ffffff',
          opacity: 0.1,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.5 } },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
  }

  // 2. Initialize Vanilla Tilt for 3D Cards
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.demo-card, .tile-card, .slide-card, .team'), {
      max: 8,
      speed: 400,
      glare: true,
      'max-glare': 0.15,
      scale: 1.02
    });
  }

  // 3. Form Submission Handling with Web3Forms
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Basic UI loading state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <circle cx="12" cy="12" r="10" opacity="0.25"/>
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke-dasharray="8 8" class="spin-anim"/>
        </svg>
        Sending...
      `;
      submitBtn.disabled = true;
      formStatus.innerHTML = '';
      formStatus.className = 'form-status';

      const formData = new FormData(contactForm);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      try {
        const response = await fetch('https://formsubmit.co/ajax/senseaiproject.web@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: json
        });
        const result = await response.json();
        
        if (result.success === "true") {
          formStatus.innerHTML = '✨ Message sent successfully! We will get back to you soon.';
          formStatus.classList.add('success');
          contactForm.reset();
        } else if (result.success === "false" && result.message.includes("Activation")) {
           // FormSubmit sends an activation email on the very first try
          formStatus.innerHTML = '⚠️ Please check your email (senseaiproject.web@gmail.com) to ACTIVATE this form first!';
          formStatus.classList.add('error');
        } else {
          console.log(result);
          formStatus.innerHTML = '✨ Message sent! (If first time, please check your email to activate the form).';
          formStatus.classList.add('success');
          contactForm.reset();
        }
      } catch (error) {
        console.log(error);
        formStatus.innerHTML = '❌ Network error. Please check your connection and try again.';
        formStatus.classList.add('error');
      } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        
        // Clear message after 5 seconds
        setTimeout(() => {
          formStatus.innerHTML = '';
          formStatus.className = 'form-status';
        }, 5000);
      }
    });
  }

  // 4. Smooth Scroll Reveal (Optional enhancement over the current CSS approach)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.section-head, .timeline, .contact-container').forEach(el => {
    observer.observe(el);
  });
});
