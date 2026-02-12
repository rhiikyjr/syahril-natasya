document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const openingLayer = document.getElementById('opening-layer');
    const btnOpen = document.getElementById('btn-open');
    const recipientNameEl = document.getElementById('recipient-name');
    const guestInput = document.getElementById('guest-input');
    const inputWrapper = document.getElementById('input-wrapper');
    const btnCopy = document.getElementById('btn-copy');

    // --- 1. Recipient Logic ---
    const params = new URLSearchParams(window.location.search);
    const urlTo = params.get('to');

    if (urlTo) {
        const decodedName = decodeURIComponent(urlTo);
        recipientNameEl.textContent = decodedName;
        inputWrapper.style.display = 'none'; // Hide input if name is in URL
    } else {
        // Allow user to type name
        guestInput.addEventListener('input', (e) => {
            const val = e.target.value;
            recipientNameEl.textContent = val.trim() || 'Tamu Undangan';
        });
    }

    // --- 2. Opening Sequence ---
    btnOpen.addEventListener('click', () => {
        // 1. Trigger Curtain Animation
        openingLayer.classList.add('is-open');
        
        // 2. Unlock Scroll
        document.body.style.overflowY = 'auto';

        // 3. Play Music (Optional - Placeholder)
        // playAudio(); 
    });

    // Lock scroll initially
    document.body.style.overflowY = 'hidden';


    // --- 3. Scroll Reveal Observer ---
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-up');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                // Optional: Unobserve after reveal
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // --- 4. Copy Link Logic ---
    btnCopy.addEventListener('click', async () => {
        const currentName = recipientNameEl.textContent;
        const baseUrl = window.location.origin + window.location.pathname;
        // Use 'Tamu Undangan' as default if empty, but prefer URL param or input
        let nameToShare = currentName === 'Tamu Undangan' ? '' : currentName;
        
        // If user typed a name, use that. If URL had a name, use that.
        if (guestInput.value.trim()) nameToShare = guestInput.value.trim();
        else if (urlTo) nameToShare = decodeURIComponent(urlTo);

        const shareUrl = nameToShare 
            ? `${baseUrl}?to=${encodeURIComponent(nameToShare)}`
            : baseUrl;

        try {
            await navigator.clipboard.writeText(shareUrl);
            const originalText = btnCopy.textContent;
            btnCopy.textContent = "Tersalin!";
            setTimeout(() => {
                btnCopy.textContent = originalText;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
            alert('Gagal menyalin. Link: ' + shareUrl);
        }
    });
});
