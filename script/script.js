function duplicateChips(wrapperIds) {
    function duplicateImages(imgContainer, containerHeight) {
        let contentHeight = imgContainer.offsetHeight;
        while (contentHeight < containerHeight * 2) {
            const imgs = imgContainer.querySelectorAll('img');
            imgs.forEach(img => {
                const clone = document.createElement('img');
                clone.src = img.src;
                clone.alt = img.alt;
                imgContainer.appendChild(clone);
            });
            contentHeight = imgContainer.offsetHeight;
        }
    }

    function resetScroll(imgContainer, contentHeight) {
        imgContainer.style.transition = 'none';
        imgContainer.style.transform = `translateY(-${contentHeight / 2}px)`;
        requestAnimationFrame(() => {
            imgContainer.style.transition = 'transform 25s linear';
            imgContainer.style.transform = `translateY(-${contentHeight}px)`;
        });
    }

    wrapperIds.forEach(wrapperId => {
        const wrapper = document.getElementById(wrapperId);
        const imgContainer = wrapper.querySelector('.chips__img');
        const containerHeight = wrapper.offsetHeight;

        duplicateImages(imgContainer, containerHeight);

        imgContainer.style.transition = 'transform 25s linear';
        imgContainer.style.transform = `translateY(-${imgContainer.offsetHeight / 2}px)`;

        imgContainer.addEventListener('transitionend', function () {
            if (imgContainer.getBoundingClientRect().bottom <= wrapper.getBoundingClientRect().bottom) {
                resetScroll(imgContainer, imgContainer.offsetHeight);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    duplicateChips(['wrapper1', 'wrapper2', 'wrapper3']);

    const blogWrapper = document.getElementById('blogWrapper');
    const ps = new PerfectScrollbar(blogWrapper, {
        wheelSpeed: 0.3,
        wheelPropagation: true,
        minScrollbarLength: 20,
        swipeEasing: true,
        swipeEasingAmount: 0.3
    });

    const blogItems = document.querySelectorAll(".blog__item");

    blogItems.forEach(item => {
        item.addEventListener("click", function () {
            blogItems.forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");
        });
    });
});
