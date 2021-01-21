class Scroller {
    constructor(rootSelector) {
        const rootElement = document.querySelector(rootSelector);
        this.sections = document.querySelectorAll('#root section');
        const sectionsArr = [...this.sections];
        const currentSectionIndex = sectionsArr.findIndex(this.isScrolledIntoView);
        this.currentSectionIndex = Math.max(currentSectionIndex, 0);
        this.isThrottled = false; //czy funkcja jest wstrzmana, trzeba ograniczyc scroll co sekundę, żeby nie przeskakiwało o więcej niż jedną sekcje za jednym scrollem
    }

    isScrolledIntoView(element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementBottom = Math.floor(rect.bottom);

        const isVisible = (elementTop >= 0) && (elementBottom <= window.innerHeight)
        
        return isVisible;
    }

    listenScroll =  (event) => {
        if(this.isThrottled) return;
        this.isThrottled = true;

        setTimeout(() => {
            this.isThrottled = false
        }, 1000);

        const direction = event.wheelDelta < 0 ? 1 : -1;
        this.scroll(direction);
    }

    scroll = (direction) => {
        if(direction === 1)  {
            const isLastSection = this.currentSectionIndex === this.sections.length - 1; //boolean
            if(isLastSection) {
                return
            }
        } else if(direction === -1) {
            const firstSection = this.currentSectionIndex === 0;
            if(firstSection) { 
                return;
            }
        }

        this.currentSectionIndex = this.currentSectionIndex + direction;
        this.scrollToCurrentSection();
    }

    scrollToCurrentSection = () => {
        this.sections[this.currentSectionIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }
}