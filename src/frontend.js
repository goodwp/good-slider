( () => {
    if ( ! window.Swiper ) {
        console.error(
            "[Good Slider]: Please provide a custom Swiper script instance or enqueue the plugins good-slider-swiper asset."
        );
        return;
    }
    const blocks = document.querySelectorAll( ".wp-block-good-slider" );
    blocks.forEach( ( block ) => {
        block.classList.add( "is-good-slider-initializing" );
        const wrapper = block.querySelector( ":scope > .swiper-wrapper" );
        const slides = wrapper.children;

        if ( slides.length <= 1 ) {
            return; // no need to init slider if only one slide
        }

        let blockSwiperConfig = {};
        if ( block.dataset.swiperOptions ) {
            try {
                blockSwiperConfig = JSON.parse( block.dataset.swiperOptions );
            } catch ( err ) {}
        }

        const swiperInstance = new Swiper( block, {
            createElements: true,
            ...blockSwiperConfig,
        } );
        block.classList.remove( "is-good-slider-initializing" );
        block.classList.add( "is-good-slider-initialized" );
    } );
} )();
