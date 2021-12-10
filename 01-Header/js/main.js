gsap.registerPlugin(ScrollTrigger);

const initNav = () => {

    // arrays contains all the links in nav.
    const navLinks = gsap.utils.toArray('.main-nav a');
    const navLinksReversed = gsap.utils.toArray('.main-nav a').reverse();

    // on mouseleave, add animation class to links.
    navLinks.forEach((link) => {
        link.addEventListener(
            'mouseleave',
            () => {
                // add class `animate-out`.
                link.classList.add('animate-out');
                // remove class after 0.3s (animation time);
                setTimeout(() => {
                    link.classList.remove('animate-out');
                }, 300);
            }
        );
    });

    // returns a nav links twee(animation).
    const navAnimation = (direction) => {
        // check for the direction of the scroll.
        const isScrollingDown = direction === 1;
        const links = isScrollingDown ? navLinks : navLinksReversed;
        return gsap.to( links, // element to animate.
            {
                duration: 0.3, // duration of the animation.
                y: () => isScrollingDown ? 20 : 0,
                stagger: 0.05, // stagger the element.
                autoAlpha: () => isScrollingDown ? 0 : 1, // opacity.
                ease: 'Power4.out' // easing.
            }
        );
    }; // end navAnimation;

    // Create a ScrollTrigger.
    // adds `.has-scrolled` to the body when scrolling down 100px.
    ScrollTrigger.create({
        // start when scrolling down 100px.
        start: 100,
        // trigger end will not meet the bottom of the scroll.
        // end: 'bottom bottom-=20', 
        end: 'bottom',
        toggleClass: {
            targets: 'body', // scroll target.
            className: 'has-scrolled', // toggle class.
        },
        markers: true, // debugging marker.
        onEnter: ({direction}) => navAnimation(direction), // callback to run when past start point.
        onLeaveBack: ({direction}) => navAnimation(direction) // callback to run when scroll back to top.
    });
};

// header init.
    // Attach mouse move event to header.
const initHeader = () => {
    const header = document.querySelector('header');
    header.addEventListener('mousemove', moveImages);
};

const moveImages = (e) => {
    // destructuring
    const {clientX, clientY, target} = e;
    const {clientWidth, clientHeight} = target;
    /**
    * xPos and yPos represent the position of the mouse,
    * will use them to animate the images to follow the mouse's position,
    * `xPos` and `yPos` are the values by wich images will translate.
    * *******
    * TIP: clienX/clientWidth ==> left(0), center(0.5), right(1) 
    * to get `+` and `-` values, we use `(clientX/clientWidth)-0.5`,
    * that will give us a range of `-0.5`(left), `0`(center) and `+0.5`(right)
    */
    const xPos = (clientX / clientWidth) - 0.5;
    const yPos = (clientY / clientHeight) - 0.5;


    // modifier; we'll use it to move the images with different values.
    const modifier = (index) => index * 1.2 + 0.5;

    /***********************************
    *****LEFT IMAGES
    ***********************************/
    // move the 3 left images.
    const imagesLeft = gsap.utils.toArray('.hg__left .hg__image ');
    imagesLeft.forEach((image, index) => {
        // create a image animation(tween).
        gsap.to(image, {
            duration: 1.2,
            // translations.
            x: xPos * 20 * modifier(index),
            y: yPos * 30 * modifier(index),
            // rotations.
            rotationY: xPos * 40,
            rotationX: yPos * -10,
            ease: 'Power3.out'
        });
    });

    /***********************************
    *****RIGHT IMAGES
    ***********************************/
    // move right images
    const imagesRight = gsap.utils.toArray('.hg__right .hg__image');
    imagesRight.forEach((image, index) => {
        gsap.to(image, {
            duration: 1.2,
            x: xPos * 20 * modifier(index),
            y: yPos * -20 * modifier(index),
            rotationX: yPos * -10,
            rotationY: xPos * 40,
            ease: 'Power3.out'
        });
    });

    // circle
    gsap.to('.decor__circle', {
        duration: 1.7,
        x: xPos * 100,
        y: yPos * 100,
        ease: 'Power4.out'
    });
}; // end moveImages();

function init() {
    initNav();
    initHeader();
};

// on load run `init`
window.addEventListener('load', function(){
    init();
});
