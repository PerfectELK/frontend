export default function topSliderInit() {

    // Можно получать с сервера
    const imagePathes = [
        {
            path:  '../images/top-section-bg.png',
            text: 'Наши проекты. Которые наши'
        },
        {
            path:  'https://cdn22.img.ria.ru/images/07e4/04/16/1570429979_64:0:1077:760_1920x0_80_0_0_ffa7dbad4ad06bae409e58c9e841696c.jpg',
            text: 'Наши проекты'
        },
        {
            path:  'https://s1.1zoom.ru/big3/62/341028-blackangel.jpg',
            text: 'Наши проекты'
        },
    ];
    const sliderEl = document.querySelector('.top-section-inner');

    if (!sliderEl) {
        return;
    }

    function getNumForText(num) {
        if (num <= 9) {
            return `0${num}`;
        }
        return`${num}`;
    }

    function changeImage(index) {
        if (index === currentSlideNum) {
            return;
        }

        if (index > maxImages - 1) {
            index = 0;
        }

        dots[currentSlideNum].classList.remove('active');
        textItems[currentSlideNum].classList.remove('active');

        currentSlideNum = index;

        dots[currentSlideNum].classList.add('active');
        textItems[currentSlideNum].classList.add('active');

        leftNum.innerHTML = getNumForText(currentSlideNum + 1);

        sliderImgEl.style['opacity'] = '0';
        setTimeout(() => {
            sliderImgEl.style['background-image'] = `url(${imagePathes[currentSlideNum].path})`;
            sliderImgEl.style['opacity'] = '1';
        }, 300);
    }

    let currentSlideNum = 0;

    const sliderImgEl = sliderEl.querySelector('.image');
    sliderImgEl.style['background-image'] = `url(${imagePathes[currentSlideNum].path})`;
    sliderImgEl.style['opacity'] = '1';
    

    const sliderDotsContainer = sliderEl.querySelector('.dot-container');
    sliderDotsContainer.innerHTML = '';
    const sliderTextItemsContainer = sliderEl.querySelector('.slider-text');
    sliderTextItemsContainer.innerHTML = '';

    const leftNum = sliderEl.querySelector('.slider-num .nums .left-num');
    const rightNum = sliderEl.querySelector('.slider-num .nums .right-num');

    const maxImages = imagePathes.length;
    leftNum.innerHTML = `0${currentSlideNum + 1}`;
    rightNum.innerHTML = getNumForText(maxImages);
    
    const dots = [];
    const textItems = [];
    for (const key in imagePathes) {
        const item = imagePathes[key];

        const dot = document.createElement('div');
        dot.classList.add('dot');
        sliderDotsContainer.appendChild(dot);
        dots.push(dot);
        
        const textItem = document.createElement('div');
        textItem.classList.add('text-item');
        textItem.innerHTML =  `
            <div class="num">${getNumForText(parseInt(key) + 1)}.</div>
            <div class="title">${item.text}</div>
        `;
        sliderTextItemsContainer.appendChild(textItem);
        textItems.push(textItem);
    }
    dots[currentSlideNum].classList.add('active');
    textItems[currentSlideNum].classList.add('active');


    let interval = setInterval(() => {
        changeImage(currentSlideNum + 1);
    }, 3000);

    dots.forEach((el, index) => {
        el.addEventListener('click', () => {
            clearInterval(interval);
            changeImage(index);
            interval = setInterval(() => {
                changeImage(currentSlideNum + 1);
            }, 3000);
        });
    });
    
    textItems.forEach((el, index) => {
        el.addEventListener('click', () => {
            clearInterval(interval);
            changeImage(index);
            interval = setInterval(() => {
                changeImage(currentSlideNum + 1);
            }, 3000);
        });
    });

   


}