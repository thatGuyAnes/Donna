gsap.registerPlugin(ScrollTrigger);

// nav init.
const initNav = () => {
    // get all the links. 
    const navLinks = gsap.utils.toArray('.main-nav a');
    // on mouseleave, add animation class to the link.
    navLinks.forEach(link => {
        link.addEventListener('mouseleave', () => {
            // add `animate-out`
            link.classList.add('animate-out');
            // remove the class after the animation time run out.
            setTimeout(() => {
                link.classList.remove('animate-out');
            }, 300);
        });
    });
};

function init() {
    initNav();
}

// On page load, call `init`.
window.addEventListener('load', function(){
    init();
});
