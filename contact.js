// Smooth scroll for Back to Top
document.querySelector('.back-to-top').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Optional: Add a click animation to the submit button
document.querySelector('.submit-btn').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission for demo purposes
    const btn = e.target;
    btn.classList.add('clicked');
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    const inputs = document.querySelectorAll('input, textarea');

    // Add floating label effect
    inputs.forEach(input => {
        input.addEventListener('focus', (e) => {
            e.target.previousElementSibling.style.transform = 'translateY(-25px)';
            e.target.previousElementSibling.style.fontSize = '0.8em';
        });

        input.addEventListener('blur', (e) => {
            if (!e.target.value) {
                e.target.previousElementSibling.style.transform = 'translateY(0)';
                e.target.previousElementSibling.style.fontSize = '1em';
            }
        });
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Message sent successfully!');
                form.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            alert('Error sending message. Please try again.');
        }
    });
});