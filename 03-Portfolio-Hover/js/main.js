gsap.registerPlugin(ScrollTrigger);

const links = document.querySelectorAll('.portfolio__categories a');
const imageLarge = document.querySelector('.portfolio__image--l');
const imageSmall = document.querySelector('.portfolio__image--s');
const imageLargeInside = document.querySelector('.portfolio__image--l .image_inside');
const imageSmallInside = document.querySelector('.portfolio__image--s .image_inside');
const background = document.querySelector('.fill-background');

const portfolioInit = () => {
    links.forEach(link => {
        link.addEventListener('mouseenter', linkHoverHandler);
        link.addEventListener('mouseleave', linkHoverHandler);
        link.addEventListener('mousemove', mouseMoveHandler);
    });
};

const linkHoverHandler = (e) => {

    if (e.type === 'mouseenter') {
        // Change the images' urls.
        // FadeIn the images.
        // Fading inactive links and color to white.
        // Active link is white.
        // Change page's bg color.
        const myTimeline = gsap.timeline();
        const { imagelarge, imagesmall, color } = e.target.dataset;
        const otherLinks = [...links].filter(link => link !== e.target);

        myTimeline
            .set(imageLargeInside, { backgroundImage: `url(${imagelarge})` })
            .set(imageSmallInside, { backgroundImage: `url(${imagesmall})` })
            .to([imageLarge, imageSmall], { autoAlpha: 1 })
            .to(otherLinks, { color: '#fff', autoAlpha: 0.2 }, 0)
            .to(e.target, { color: '#fff', autoAlpha: 1 }, 0)
            .to(background, { backgroundColor: color, ease: 'none' }, 0);

    } else if (e.type === 'mouseleave') {
        // FadeOut images.
        // All links Black.
        // Background color defaults to initial color #ACB7AE.
        const myTimeline = gsap.timeline();

        myTimeline
            .to([imageLarge, imageSmall], { autoAlpha: 0 })
            .to(links, { color: '#000', autoAlpha: 1 }, 0)
            .to(background, { backgroundColor: '#ACB7AE', ease: 'none' }, 0);

    }
};

const mouseMoveHandler = (e) => {
    // Get mouse position.
    // Calculate distance of movement.
    // Animation.

    const { clientY } = e;
    const yPos = document.querySelector('.portfolio__categories').clientHeight - clientY;

    gsap.to(imageLarge, {
        duration: 1.2,
        y: yPos / -8,
        ease: 'Power3.out'
    });

    gsap.to(imageSmall, {
        duration: 1.3,
        y: yPos / -6,
        ease: 'Power3.out'
    });

};

function init() {
    portfolioInit();
}

window.addEventListener('load', function() {
    init();
});
