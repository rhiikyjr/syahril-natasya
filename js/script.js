function getParam(name){
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function setRecipientName(name){
  const el = document.getElementById('recipient');
  if(el) el.textContent = name || 'Tamu Undangan';
}

function buildShareLink(name){
  const url = new URL(window.location.href);
  url.searchParams.set('to', name || 'Tamu Undangan');
  return url.toString();
}

document.addEventListener('DOMContentLoaded', () => {
  const toParam = getParam('to');
  const input = document.getElementById('recipientInput');
  const inputWrap = document.getElementById('recipientInputWrap');
  const cover = document.getElementById('cover');
  const openBtn = document.getElementById('openBtn');
  const shareLink = document.getElementById('shareLink');
  const copyLinkBtn = document.getElementById('copyLinkBtn');
  const hero = document.querySelector('[data-parallax]');
  const heroContent = hero ? hero.querySelector('.hero-content') : null;

  if (toParam){
    setRecipientName(decodeURIComponent(toParam));
    if(inputWrap) inputWrap.style.display = 'none';
  }else{
    setRecipientName('Tamu Undangan');
    if(input) input.value = '';
  }

  function currentRecipient(){
    const name = (toParam || (input && input.value) || 'Tamu Undangan');
    return (name || '').trim();
  }

  function updateShare(){
    const link = buildShareLink(currentRecipient());
    if(shareLink){
      shareLink.textContent = link;
      shareLink.dataset.url = link;
    }
  }

  updateShare();

  if(openBtn){
    openBtn.addEventListener('click', () => {
      const name = currentRecipient();
      setRecipientName(name);
      updateShare();
      if(cover){
        cover.style.opacity = '0';
        setTimeout(()=>{ cover.style.display = 'none'; }, 300);
      }
    });
  }

  if(copyLinkBtn){
    copyLinkBtn.addEventListener('click', async () => {
      const url = (shareLink && shareLink.dataset.url) || window.location.href;
      try{
        await navigator.clipboard.writeText(url);
        copyLinkBtn.textContent = 'Tersalin';
        setTimeout(()=> copyLinkBtn.textContent = 'Salin Tautan', 1200);
      }catch(e){
        alert('Gagal menyalin tautan. Salin manual:\n' + url);
      }
    });
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('reveal-in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold: 0.15});
  revealEls.forEach(el=> io.observe(el));

  // Parallax hero content
  function onScroll(){
    if(!heroContent) return;
    const y = window.scrollY || window.pageYOffset;
    const offset = Math.min(30, y * 0.05);
    heroContent.style.transform = `translateY(${offset}px) scale(${1 + Math.min(0.02, y*0.00008)})`;
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
});
