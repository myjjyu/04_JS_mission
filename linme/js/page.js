// 상품설명, 리뷰, 상품문의 클릭시 컬러변경 이벤트
const tabs = document.querySelectorAll(".tab-link");

tabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    // 모든 탭에서 'on' 클래스 제거
    tabs.forEach((t) => t.classList.remove("on"));
    // 클릭한 탭에만 'on' 클래스 추가
    this.classList.add("on");
  });
});

// 수량 + 클릭시 증가 - 클릭시 감소 에 따른 함계금액 값 구하기

document.addEventListener("DOMContentLoaded", function () {
  // 초기 값
  let quantity = 1;
  const unitPrice = 12300;

  const minusButton = document.querySelector(".minus");
  const plusButton = document.querySelector(".plus");
  const numberDisplay = document.querySelector(".number");
  const totalPriceDisplay = document.querySelector(".total-price");

  // 수량과 총 금액 업데이트 함수
  function updateTotal() {
    numberDisplay.textContent = quantity;
    const totalPrice = unitPrice * quantity;
    totalPriceDisplay.innerHTML = `${totalPrice.toLocaleString()} <span>원</span>`;
  }

  // - 버튼 클릭
  minusButton.addEventListener("click", function () {
    if (quantity > 1) {
      quantity--;
      updateTotal();
    } else {
      Swal.fire({
        title: "최저 수량 미만으로 선택할 수 없습니다.",
        confirmButtonText: "확인",
        width: 300,
        height: 145,
        customClass: {
          confirmButton: "alert-button",
          title: "title-text",
        },
      });
    }
  });
  // + 버튼 클릭
  plusButton.addEventListener("click", function () {
    quantity++;
    updateTotal();
  });

  updateTotal();
});
