class Swiper {
    constructor() {
        this.initialY = null;
        this.initialX = null;

        document.addEventListener('touchstart', (e) => this.startTouch(e))
        document.addEventListener('touchmove', (e) => this.moveTouch(e))

        this.events = {
            swipeUp: new Event('swipeUp'),
            swipeDown: new Event('swipeDown'),
            swipeLeft: new Event('swipeLeft'),
            swipeRight: new Event('swipeRight'),
        }
    }

    startTouch(event) {
        event.preventDefault();
        
        this.initialX = event.touches[0].clientX;
        this.initialY = event.touches[0].clientY;
    }

    moveTouch(event) {
        
        if(!this.initialX || !this.initialY) return;

        const currentX = event.touches[0].clientX;
        const currentY = event.touches[0].clientY;

        const diffX = this.initialX - currentX;
        const diffY = this.initialY - currentY;

        if(Math.abs(diffX) > Math.abs(diffY)) {
            
            //jesteśmy w osi X
            if(diffX > 0) {
                //swipe w lewo 
                document.dispatchEvent(this.events.swipeLeft)
            } else {
                //swipe w prawo
                document.dispatchEvent(this.events.swipeRight)
            }
        } else {
            //jesteśmy w osi Y
            if(diffY > 0) {
                //swipe w górę 
                document.dispatchEvent(this.events.swipeUp)
            } else if(diffY <= 0){
                //swipe w dół
                document.dispatchEvent(this.events.swipeDown)
            }
        }
        

        this.initialX = null;
        this.initialY = null;
    }
}

new Swiper();