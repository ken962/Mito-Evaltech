document.addEventListener("DOMContentLoaded", function(){
    // Fallback for IntersectionObserver
    if(!('IntersectionObserver' in window)){
      document.querySelectorAll('.section').forEach(function(section){
        section.classList.add('visible');
      });
    }
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });
    sections.forEach(section => observer.observe(section));
    
    // Hamburger menu fade-out timer that resets on interaction
    let fadeTimer = null;
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector(".nav");
    
    function startFadeTimer(){
      clearTimeout(fadeTimer);
      fadeTimer = setTimeout(()=>{
        nav.classList.remove("active");
        hamburger.setAttribute('aria-expanded', 'false');
      }, 5000);
    }
    
    function toggleNav(e){
      nav.classList.toggle("active");
      const expanded = nav.classList.contains("active");
      hamburger.setAttribute('aria-expanded', expanded);
      if(expanded){
        startFadeTimer();
      } else {
        clearTimeout(fadeTimer);
      }
      e.preventDefault();
    }
    
    hamburger.addEventListener("click", toggleNav);
    hamburger.addEventListener("touchstart", toggleNav);
    nav.addEventListener("mouseenter", () => { clearTimeout(fadeTimer); });
    nav.addEventListener("mouseleave", startFadeTimer);
  });