$(function () {
    imgSlider();
})

function test() {
    console.log('test');
}

function imgSlider() {
    const outer = document.querySelector('.outer');
    const innerList = document.querySelector('.inner-list');
    const inners = document.querySelectorAll('.inner');
    const sliderIdentifier = $(".slider_idf");
    let currentIndex = 0; // 현재 슬라이드 화면 인덱스
    let currentTransition; // 현재 슬라이드 트랜지션

    inners.forEach((inner) => {
        inner.style.width = `${outer.clientWidth}px`; // inner의 width를 모두 outer의 width로 만들기
    })

    innerList.style.width = `${outer.clientWidth * inners.length}px`; // innerList의 width를 inner의 width * inner의 개수로 만들기

    /*이벤트 등록하기*/
    let isSlide = false; // 슬라이드 status
    let slideStartX = 0; // 처음 눌러진 슬라이드의 X값
    let slideGab = 0; // 처음 눌러진 슬라이드의 X값과 현재 눌러진 슬라이드의 X값의 차이
    const flipGab = 80; // 화면이 넘어가지기 위한 기준 값

// 화면을 처음 클릭할 때
    const slideStart = (clientX) => {
        slideStartX = clientX;
        isSlide = true;

        // 트랜지션 상태를 저장해두고 비워두기 (트랜지션이 적용되어 있으면 반응이 느려짐)
        currentTransition = window.getComputedStyle(innerList).transition;
        innerList.style.transition = 'initial';
    }

// 화면을 클릭하고 이동할 때
    const slideMove = (clientX) => {
        if (isSlide) {
            slideGab = slideStartX - clientX;
            if (currentIndex >= inners.length - 1 && slideGab > 0) {
                slideGab = 0;
            }

            // slideGab만큼 화면 움직이기
            innerList.style.marginLeft = `-${outer.clientWidth * currentIndex + slideGab}px`;
        }
    }

// 화면 클릭이 중단될 때
    const slideEnd = () => {
        // flipGab을 기준으로 화면 넘어갈지를 판단
        if (slideGab >= flipGab) {
            currentIndex++;
            currentIndex = currentIndex >= inners.length ? inners.length - 1 : currentIndex;
        } else if (slideGab <= -flipGab) {
            currentIndex--;
            currentIndex = currentIndex < 0 ? 0 : currentIndex;
        }
        innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`;
        slideGab = 0;
        isSlide = false;

        // 트랜지션 상태 원복
        innerList.style.transition = currentTransition;
    }
    // 선택 이미지 표시
    const slideIdentifier = () => {
        $(".idf_select").removeClass('idf_select');
        sliderIdentifier[currentIndex].classList.add('idf_select');
    }

    /*마우스 이벤트 등록 (웹 전용)*/
    innerList.addEventListener('mousedown', (e) => {
        slideStart(e.clientX);
    })

    innerList.addEventListener('mousemove', (e) => {
        slideMove(e.clientX);
    })

    innerList.addEventListener('mouseup', () => {
        slideEnd();
        slideIdentifier();
    })

    /*터치 이벤트 등록 (모바일 전용)*/
    innerList.addEventListener('touchstart', (e) => {
        slideStart(e.changedTouches[0].clientX);
    })

    innerList.addEventListener('touchmove', (e) => {
        slideMove(e.changedTouches[0].clientX);
    })

    innerList.addEventListener('touchend', () => {
        slideEnd();
        slideIdentifier();
    })
}