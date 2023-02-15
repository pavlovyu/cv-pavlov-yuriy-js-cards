//********************************************* dragAndDrop Сергій ***************************************************//

export default function dragAndDrop(card) {

    card ? setDragAndDrop(card) : document.querySelectorAll('[data-card-main]').forEach(setDragAndDrop);

    function setDragAndDrop(card) {
        const main = document.querySelector('.main');
        card.addEventListener('mousedown',(e)=> {
            e.preventDefault();

            let shiftX = e.clientX - card.getBoundingClientRect().left;
            let shiftY = e.clientY - card.getBoundingClientRect().top;

            !e.target.classList.contains("mn-close") && !e.target.classList.contains("btn") ?  main.append(card) : null;

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

            function onMouseMove(e) {
                let newLeft = e.clientX - shiftX - main.getBoundingClientRect().left;
                let rightEdge = main.offsetWidth - card.offsetWidth - 14;
                let newTop = e.clientY - shiftY - main.getBoundingClientRect().top;
                let bottomEdge = main.offsetHeight - card.offsetHeight - 14;

                if (newLeft < 8) {
                    newLeft = 8;
                }
                if (newLeft > rightEdge) {
                    newLeft = rightEdge;
                }
                card.style.left = newLeft + 'px';

                if (newTop < 8) {
                    newTop = 8;
                }
                if (newTop > bottomEdge) {
                    newTop = bottomEdge;
                }
                card.style.top = newTop + 'px';
            }

            function onMouseUp() {
                document.removeEventListener('mouseup', onMouseUp);
                document.removeEventListener('mousemove', onMouseMove);
            }
        })
    }
}