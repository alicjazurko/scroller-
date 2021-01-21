document.addEventListener('DOMContentLoaded', function(){

    const scroller = new Scroller('#root');
    document.addEventListener('wheel', (e) => scroller.listenScroll(e));

    //wsparcie dla urządzeń dotykowych
    document.addEventListener('swipeUp', () => scroller.scroll(1));
    document.addEventListener('swipeDown', () => scroller.scroll(-1));

    //klawisze góra i dół
    document.addEventListener('keydown', (e) => {
        switch (e.keyCode) {
            case 40:
                return scroller.scroll(1)
            case 38:
                return scroller.scroll(-1)
            default:
                return;
        }
    })
})