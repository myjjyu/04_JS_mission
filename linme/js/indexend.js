document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("All_list");
  let currentSort = "recommend"; // 기본 정렬 옵션

  function renderData(data) {
    content.innerHTML = ""; // 이전 콘텐츠 지우기

    data.forEach((product, index) => {
      const li = document.createElement("li"); // li 생성

      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.description;
      img.style.width = "200px";
      img.style.height = "auto";

      const description = document.createElement("p");
      description.textContent = product.description;

      const discount = document.createElement("p");
      discount.classList.add("discount");
      discount.innerHTML = `${product.discount} <span class="original-price">${product.originalPrice}</span>`;

      const price = document.createElement("p");
      price.classList.add("price");
      price.textContent = product.price;

      const shipping = document.createElement("p");
      shipping.classList.add("shipping");
      shipping.textContent = product.shipping;

      //     li.appendChild(img);
      //     li.appendChild(description);
      //     li.appendChild(discount);
      //     li.appendChild(price);
      //     li.appendChild(shipping);

      //     content.appendChild(li); // li를 content에 추가
      //   });
      // }

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

      content.appendChild(li); // li를 content에 추가
    });
  }

  function sortData(data, criterion) {
    let sortedData = [...data]; // 원본 데이터 배열을 복사

    switch (criterion) {
      case "recommend":
        break;
      case "discount":
        sortedData.sort(
          (a, b) => parseFloat(b.discount) - parseFloat(a.discount)
        );
        break;
      case "lowPrice":
        sortedData.sort(
          (a, b) =>
            parseFloat(a.price.replace(/[^0-9]/g, "")) -
            parseFloat(b.price.replace(/[^0-9]/g, ""))
        );
        break;
      case "highPrice":
        sortedData.sort(
          (a, b) =>
            parseFloat(b.price.replace(/[^0-9]/g, "")) -
            parseFloat(a.price.replace(/[^0-9]/g, ""))
        );
        break;
    }

    renderData(sortedData);
  }

  function fetchData() {
    fetch("http://localhost:3002/AllList")
      .then((response) => response.json())
      .then((data) => {
        // 모든 리스트를 통합하여 하나의 데이터 배열로 만듭니다.
        const allProducts = [
          ...data.NewList,
          ...data.BestList,
          ...data.GoodList,
        ];

        // 현재 정렬 기준에 맞게 데이터를 정렬하고 렌더링합니다.
        sortData(allProducts, currentSort);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  // 정렬 옵션 클릭 이벤트 리스너 추가
  document
    .querySelector(".all_list_name li:nth-child(1) a")
    .addEventListener("click", (e) => {
      e.preventDefault();
      currentSort = "recommend";
      fetchData(); // 데이터 가져오기
    });

  document
    .querySelector(".all_list_name li:nth-child(2) a")
    .addEventListener("click", (e) => {
      e.preventDefault();
      currentSort = "discount";
      fetchData(); // 데이터 가져오기
    });

  document
    .querySelector(".all_list_name li:nth-child(3) a")
    .addEventListener("click", (e) => {
      e.preventDefault();
      currentSort = "lowPrice";
      fetchData(); // 데이터 가져오기
    });

  document
    .querySelector(".all_list_name li:nth-child(4) a")
    .addEventListener("click", (e) => {
      e.preventDefault();
      currentSort = "highPrice";
      fetchData(); // 데이터 가져오기
    });

  // 초기 데이터 렌더링
  fetchData();
});

//// 신상품 / 베스트 / 특가상품 클릭, 엑티브 이벤트
const headerLinks = document.querySelectorAll(".header-list a");

// URL에서 쿼리 파라미터 'list' 값을 가져옴
const urlParams = new URLSearchParams(window.location.search);
const activeList = urlParams.get("list");

// 페이지 로드 시 URL의 list 값에 해당하는 링크에 active 클래스 추가
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
