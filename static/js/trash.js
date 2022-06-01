function elementInCenter(el) {
    let bounds = el.getBoundingClientRect();
    return (
        (bounds.top + bounds.height / 2 < window.innerHeight / 2 + 113) &&
        (bounds.top + bounds.height / 2 > window.innerHeight / 2 - 113)
    );
}

$(function () {
        console.log(window.matchMedia('(max-width: 768px)').matches)
        if (window.matchMedia('(max-width: 768px)').matches) {
            $(window).on('scroll', function (e) {
                $('.gallery-item').each(function () {
                    if (elementInCenter(this)) {

                        this.classList.add('centered')
                    } else {
                        this.classList.remove('centered')
                    }
                });
            });

        }
    }
);
