const HEADER_HEIGHT = 80; // 헤더 높이 설정
const FOOTER_HEIGHT = '17rem'; // 푸터 높이 설정
let pageLength; // 페이지 수 초기화
let flag = true;
let curPage = 1; // 현재 페이지 초기화 1
let top_value = []; // 각 section 높이
$(function () {
  mouseWheelEvent();
  menuAct();
});

function mouseWheelEvent() {
  const sections = $('.main_section');
  pageLength = sections.length; // 전체 페이지(<section>) 수

  for (let i = 1; i <= sections.length; i++) {
    top_value[i] = $(`.main_section:nth-child(${i})`).offset().top;
  }
  wheelAct(pageLength);
  pointClick();
}

function wheelAct() {
  $(document).on('wheel', function (e) {
    if (!flag) {
      return;
    }
    flag = false;
    let mouseVal = e.originalEvent.deltaY;
    if (mouseVal > 0) {
      if (!(curPage >= pageLength)) {
        curPage++;
        pageMove(pageLength);
      }
    } else {
      if (!(curPage <= 1)) {
        curPage--;
        pageMove(pageLength);
      }
    }
    setTimeout(() => {
      flag = true;
    }, 1000);
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
