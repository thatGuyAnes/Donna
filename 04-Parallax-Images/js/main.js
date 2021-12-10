gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Parallax effect.
const initImageParallax = () => {
    // select all element with class of `with-parallax`.
    gsap.utils.toArray('.with-parallax').forEach((section) => {
        // get the image.
        const image = section.querySelector('img');
        // create a tween for the image.
        gsap.to(image, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                scrub: 1,
                markers: false,
            },
        });
    });
}; /* END initImageParallax() */

const initPinSteps = () => {

    // vh snippet: cross-browser
    const getVh = () => {
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        return vh;
    };

    // Update background color.
    const changeBg = (color) => {
        const background = document.documentElement.querySelector('.fill-background');
        gsap.to(background, {backgroundColor: color});
    };

    // Create a scrollTrigger on the fixed-nav.
    ScrollTrigger.create({
        trigger: '.fixed-nav', // starting the trigger.
        endTrigger: '#stage4', // ending the trigger.
        start: 'top center', // start of the scroller.
        end: 'center center', // end of the scroller.
        pin: true,
    });

    // Set links to active.
    // 1. Loop throught the stages.
    gsap.utils.toArray('.stage').forEach((stage, index) => {
        // 2. array of the links.
        const navItems = gsap.utils.toArray('.fixed-nav li');
        // 3. Create a scrolltrigger for each stage.
        ScrollTrigger.create({
            trigger: stage,
            start: 'top center',
            end: () => `+=${stage.clientHeight + getVh() / 10}`, // adding 10vh, to accomodate for the space between the stages caused by a margin bottom of 10vh on a text element.
            // 4. Toggle active class.
            toggleClass: {
                targets: navItems[index],
                className: 'is-active'
            },
            markers: true,
            // 5. Update background color.
            onEnter: () => changeBg(stage.dataset.color),
            onEnterBack: () => changeBg(stage.dataset.color),
        });
    });

}; /* END initPinSteps() */

const initScrollTo = () => {
  // Get the links from the fixed nav.
  gsap.utils.toArray(".fixed-nav a").forEach((link) => {

    const target = link.getAttribute('href');

    link.addEventListener('click', (event) => {
      event.preventDefault();
      gsap.to(window, {duration: 1.5, scrollTo: target, ease: 'Power2.easeOut'});
    });

  })
};

function init() {
  initImageParallax();
  initPinSteps();
  initScrollTo();
}

window.addEventListener('load', function () {
    init();
});
