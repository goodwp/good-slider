(() => {
    if (!window.Swiper) {
        console.error(
            "[Good Slider]: Please provide a custom Swiper script instance or enqueue the plugins good-slider-swiper asset."
        );
        return;
    }
    const blocks = document.querySelectorAll(".wp-block-good-slider");
    blocks.forEach((block) => {
        block.classList.add("swiper");
        const wrapper = document.createElement("div");
        wrapper.classList.add("swiper-wrapper");
        block.prepend(wrapper);
        const slides = block.querySelectorAll(".wp-block-good-slider-item");

        if (slides.length <= 1) {
            return; // no need to init slider if only one slide
        }

        // move slides into wrapper, and add swiper class
        slides.forEach((slide) => {
            wrapper.appendChild(slide);
            slide.classList.add("swiper-slide");
        });

        let blockSwiperConfig = {};
        if (block.dataset.swiperOptions) {
            try {
                blockSwiperConfig = JSON.parse(block.dataset.swiperOptions);
            } catch (err) {}
        }

        const swiperInstance = new Swiper(block, {
            ...blockSwiperConfig,
        });
    });
})();
