document.addEventListener('DOMContentLoaded', function(){

    const rootElement = document.querySelector('#root');
    const sections = document.querySelectorAll('#root section')
    let currentSectionIndex = 0;
    let isThrottled = false; //czy funkcja jest wstrzmana, trzeba ograniczyc scroll co sekundę, żeby nie przeskakiwało o więcej niż jedną sekcje za jednym scrollem


    document.addEventListener('mousewheel', function(event){
        if(isThrottled) return;
        isThrottled = true;

        setTimeout(function() {
            isThrottled = false
        }, 1000);

        const direction = event.wheelDelta < 0 ? 1 : -1;
        scroll(direction);
        
    })

    function scroll(direction) {
        if(direction === 1)  {
            const isLastSection = currentSectionIndex === sections.length - 1; //boolean
            if(isLastSection) {
                return
            }
        } else if(direction === -1) {
            const firstSection = currentSectionIndex === 0;
            if(firstSection) { 
                return;
            }
        }

        currentSectionIndex = currentSectionIndex + direction;
        scrollToCurrentSection();
    }

    function scrollToCurrentSection() {
        sections[currentSectionIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }
})