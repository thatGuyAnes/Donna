gsap.registerPlugin(ScrollTrigger);

const sections = document.querySelectorAll('.rg__column');

// initGalleryReveal();
const initGalleryReveal = () => {
    sections.forEach(section => {

        // Grab elements for animation.
        section.imageContainer = section.querySelector('.rg__image');
        section.imageMask = section.querySelector('.rg__image--mask');
        section.image = section.querySelector('img');
        section.textContainer = section.querySelector('.rg__text');
        section.textCopy = section.querySelector('.rg__text--copy');
        section.textMask = section.textCopy.querySelector('.rg__text--mask');

        // Reset the initial positions.
        gsap.to([section.imageContainer, section.textCopy], {yPercent: -101});
        gsap.to([section.imageMask, section.textMask], {yPercent: 100});
        gsap.to(section.image, {scale: 1.2});

        // Add event listeners for each section.
        section.addEventListener('mouseenter', hoverHandler);
        section.addEventListener('mouseleave', hoverHandler);

    });
}; //** END `initGalleryReveal`.

// Return the text paragraph's height.
const getTextHeight = (text) => text.clientHeight;

/* Animate the sections' elements.*/
const hoverHandler = (e) => {

    const {imageContainer, imageMask, image, textContainer, textCopy, textMask} = e.target;
    
    const timeline = gsap.timeline({ defaults: {duration: 0.5, ease: 'Power4.out'}});

    if (e.type === 'mouseenter') { // on mouse enter:

        // Pull image down and push mask up to the reveal position.
        timeline.to([imageContainer, imageMask, textCopy, textMask], {yPercent: 0})
            .to(image, {scale: 1, duration: 1}, 0)
            // Text animation: move text block up by half the width of the paragraph's container.
            .to(textContainer, {y: () => -getTextHeight(textCopy) / 2}, 0);

    } else if (e.type === 'mouseleave') { // on mouse leave:

        // Reset to initial position, Push image up and pull mask down.
        timeline.to(imageMask, {yPercent: 100})
            .to(imageContainer, {yPercent: -101}, 0)
            .to(image, {scale: 1.2}, 0)
            // Text animation: reset position.
            .to(textContainer, {y: 0}, 0)
            .to(textCopy, {yPercent: -101}, 0)
            .to(textMask, {yPercent: 100}, 0);

    } //** END if;

    return timeline;

}; //** END hoverHandler;

// // START `init`.
// function init() {
//     initGalleryReveal();
// }; // END `init`

// window.addEventListener('load', function(){
//     init();
// });


// Remove inline styling set by gsap.
const removeProps = (elements) => {
    gsap.killTweensOf("*"); // Kills all any animation.
    if (elements.length && elements[0]) {
        elements.forEach(element => {
            gsap.set(element, {clearProps: 'all'});
            // gsap.killTweensOf(element);
        });
    }
};

// Handles the media query change.
const handleViewChange = () => {
    if (mediaQuery.matches) { // DESKTOP
        initGalleryReveal();
    } else { // MOBILE
        // Remove eventListeners from each colums.
        sections.forEach(section => {
            section.removeEventListener('mouseenter', hoverHandler);
            section.removeEventListener('mouseleave', hoverHandler);
            const {imageContainer, imageMask, image, textContainer, textCopy, textMask} = section;
            removeProps([imageContainer, imageMask, image, textContainer, textCopy, textMask]);
        });
    } // END if;
};

// on load run this function.
window.addEventListener('load', handleViewChange)

// Breakpoint definition.
const mediaQuery = window.matchMedia("(min-width: 768px)");

// Add listener to the breakpoint.
mediaQuery.addListener(handleViewChange);
