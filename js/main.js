const HEADER_HEIGHT = 80; // 헤더 높이 설정
const FOOTER_HEIGHT = '17rem'; // 푸터 높이 설정
let pageLength; // 페이지 수 초기화
let flag = true; // 페이지 이동 이벤트 제한 true : 이동가능 | false : 이동불가능
const PAGE_LIMIT = 500; // 페이지 이동 제한 시간 설정
let curPage = 1; // 현재 페이지 초기화 1

$(function () {
  pageStart();
  menuAct();
});

function pageStart() {
  const sections = $('.main_section');
  pageLength = sections.length; // 전체 페이지(<section>) 수
  if (isMobile()) {
    slideScreen(); // 모바일 터치 이벤트
  } else {
    wheelAct(); // PC 휠 이벤트
  }
  pointClick(); // 화면 우측 포인트 클릭시 페이지 이동
}

function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
}

function wheelAct() {
  $(document).on('wheel', function (e) {
    let mouseVal = e.originalEvent.deltaY;
    screenMove(mouseVal);
  });
}

function pageMove() {
  let curTop = window.innerHeight * (curPage - 1) - HEADER_HEIGHT * (curPage - 2);
  $('.section_con').css('transform', `translateY(-${curTop - HEADER_HEIGHT}px)`);
  pointColor(curPage);
  if (curPage === pageLength) {
    touchFooter();
  } else {
    leaveFooter();
  }
}

function touchFooter() {
  const footer = $('#footer');
  setTimeout(() => {
    footer.css({ opacity: '1', bottom: '0' });
  }, 300);
}

function leaveFooter() {
  const footer = $('#footer');
  footer.css({ opacity: '0', bottom: `-${FOOTER_HEIGHT}` });
}

function pointColor() {
  let point = $('.point_page');
  point.removeClass('page_act');
  let curPoint = $(`.point_page:nth-child(${curPage})`);
  curPoint.addClass('page_act');
}

const pointClick = () => {
  $(document).on('click', '.point_page', function () {
    curPage = $(this).index() + 1;
    pointColor();
    pageMove();
  });
};

function slideScreen() {
  let startY, endY;
  window.document.body.addEventListener('touchstart', (e) => {
    startY = e.changedTouches[0].screenY;
  });
  window.document.body.addEventListener('touchend', (e) => {
    endY = e.changedTouches[0].screenY;
    let mouseVal = startY - endY;
    screenMove(mouseVal);
  });
}

function screenMove(mouseVal) {
  if (!flag) {
    return;
  }
  flag = false;
  if (mouseVal > 0) {
    if (!(curPage >= pageLength)) {
      curPage++;
      pageMove(pageLength);
    }
  } else if (mouseVal < 0) {
    if (!(curPage <= 1)) {
      curPage--;
      pageMove(pageLength);
    }
  }
  setTimeout(() => {
    flag = true;
  }, PAGE_LIMIT);
}

// ---- 헤더 아코디언 js START ----
function menuAct() {
  let headerBoard = document.getElementsByClassName('menu_item');

  for (i = 0; i < headerBoard.length; i++) {
    headerBoard[i].addEventListener('mouseover', function () {
      let boardChild = this.querySelector('.item_board');
      boardChild.classList.add('board_act');
    });

    headerBoard[i].addEventListener('mouseleave', function () {
      let boardChild = this.querySelector('.item_board');
      boardChild.classList.remove('board_act');
    });
  }
}
// ---- 헤더 아코디언 js END ----
