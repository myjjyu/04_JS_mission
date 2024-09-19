document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("All_list");
  let currentSort = "recommend"; // 기본정렬 : 추천순 5개 정렬
  let currentList = "NewList"; // 기본리스트 : 신상품 5개 정렬  // 없으면 초반에 화면에 아무것도 안뜸,,

  const urlParams = new URLSearchParams(window.location.search);
  const listParam = urlParams.get("list");
  if (listParam) {
    currentList = listParam; //신상품, 베스트, 특가상품 선택시 페이지가 자동으로 해당목록 업데이트
  }

  function renderData(data) {
    content.innerHTML = ""; // 이전 콘텐츠 초기화 후 제품 추가

    // 제품정보 및 이미지 스타일
    data.forEach((product, index) => {
      const li = document.createElement("li"); // 제품정보

      const img = document.createElement("img"); // 제품 이미지 및 스타일
      img.src = product.image;
      img.alt = product.description;
      img.style.width = "200px";
      img.style.height = "auto";

      const description = document.createElement("p"); // 제품설명
      description.textContent = product.description;

      // 할인가 및 원래가격
      const discount = document.createElement("p");
      discount.classList.add("discount");
      discount.innerHTML = `${product.discount} <span class="original-price">${product.originalPrice}</span>`;
     
      //현재 판매 가격
      const price = document.createElement("p");
      price.classList.add("price");
      price.textContent = product.price;

      //배송정보
      const shipping = document.createElement("p");
      shipping.classList.add("shipping");
      shipping.textContent = product.shipping;

      if (index === 0) {
        // 첫 번째 항목에만 링크 추가
        const a = document.createElement("a");
        a.href = "./Page.html";
        a.appendChild(img);
        a.appendChild(description);
        a.appendChild(discount);
        a.appendChild(price);
        a.appendChild(shipping);
        li.appendChild(a);
      } else {
        li.appendChild(img);
        li.appendChild(description);
        li.appendChild(discount);
        li.appendChild(price);
        li.appendChild(shipping);
      }

      content.appendChild(li); 
    });
  }

  function sortData(data, criterion) { // 데이터 정렬
    let sortedData = [...data];  // 원본 데이터 복사후 정렬

    switch (criterion) {
      case "recommend": // 기본배열(추천순)
        break;
      case "discount": // 혜택순(할인순)
        sortedData.sort(
          (a, b) => parseFloat(b.discount) - parseFloat(a.discount)
        );
        break;
      case "lowPrice": // 낮은가격순
        sortedData.sort(
          (a, b) =>
            parseFloat(a.price.replace(/[^0-9]/g, "")) -
            parseFloat(b.price.replace(/[^0-9]/g, ""))
        );
        break;
      case "highPrice": // 높은가격순
        sortedData.sort(
          (a, b) =>
            parseFloat(b.price.replace(/[^0-9]/g, "")) -
            parseFloat(a.price.replace(/[^0-9]/g, ""))
        );
        break;
    }

    renderData(sortedData); // 화면에 표시하기
  }

  function fetchData() { //ajax 가져오기
    fetch("http://localhost:3002/AllList")
      .then((response) => response.json())
      .then((data) => {
        const selectedList = data[currentList]; // 현재 선택된 리스트에 해당하는 데이터
        sortData(selectedList, currentSort);
      })
      .catch((error) => console.error("데이터에러:", error));
  }

  // 정렬 클릭하면 해당 데이터 표시하기
  // 추천순(기본)
  document
    .querySelector(".all_list_name li:nth-child(1) a")
    .addEventListener("click", (e) => {
      e.preventDefault();
      currentSort = "recommend";
      fetchData(); // 데이터 가져오기
    });

     // 혜택순(할인순)
  document
    .querySelector(".all_list_name li:nth-child(2) a")
    .addEventListener("click", (e) => {
      e.preventDefault();
      currentSort = "discount";
      fetchData(); // 데이터 가져오기
    });

     //낮은가격순
  document
    .querySelector(".all_list_name li:nth-child(3) a")
    .addEventListener("click", (e) => {
      e.preventDefault();
      currentSort = "lowPrice";
      fetchData(); // 데이터 가져오기
    });

    //높은가격순
  document
    .querySelector(".all_list_name li:nth-child(4) a")
    .addEventListener("click", (e) => {
      e.preventDefault();
      currentSort = "highPrice";
      fetchData(); // 데이터 가져오기
    });




 // 리스트 페이지 주소만 다르고 한페이지로 보이게 설정영역
  document
    .querySelector(".header-list li:nth-child(1) a")
    .addEventListener("click", (e) => {
      e.preventDefault(); // 페이지 이동방지
      currentList = "NewList";  // 신상품
      window.location.search = `?list=${currentList}`; // URL 업데이트
      fetchData(); // 데이터 가져오기
    });

  document
    .querySelector(".header-list li:nth-child(2) a")
    .addEventListener("click", (e) => {
      e.preventDefault(); // 페이지 이동방지
      currentList = "BestList"; // 베스트
      window.location.search = `?list=${currentList}`; // URL 업데이트
      fetchData(); // 데이터 가져오기
    });

  document
    .querySelector(".header-list li:nth-child(3) a")
    .addEventListener("click", (e) => {
      e.preventDefault(); // 페이지 이동방지
      currentList = "GoodList"; // 특가상품
      window.location.search = `?list=${currentList}`; // URL 업데이트
      fetchData(); // 데이터 가져오기
    });

  // 초기 데이터 렌더링
  fetchData();
});



// -------------------------------------------
//// 신상품 / 베스트 / 특가상품 클릭하면  해당 데이터에 컬러 및 밑줄 
const headerLinks = document.querySelectorAll(".header-list a");


const urlParams = new URLSearchParams(window.location.search);
const activeList = urlParams.get("list");


if (activeList) {
  headerLinks.forEach((link) => {
    if (link.dataset.list === activeList) {
      link.classList.add("active");
    }
  });
}

// 각 링크에 클릭 이벤트 추가
headerLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    // 모든 링크에서 active 클래스 제거
    headerLinks.forEach((l) => l.classList.remove("active"));

    // 클릭한 링크에만 active 클래스 추가
    this.classList.add("active");
  });
});
