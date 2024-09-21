document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("All_list");
  let currentSort = "recommend";  // 추천순으로 정렬선택

  function renderData(data) { // 제품목록 표시함수
    content.innerHTML = ""; // 초기화 후 새로 업데이트

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
      discount.innerHTML = `${product.discount} 
      <span class="original-price">${product.originalPrice}</span>`;

      //현재 판매 가격
      const price = document.createElement("p");
      price.classList.add("price");
      price.textContent = product.price;

      //배송정보
      const shipping = document.createElement("p");
      shipping.classList.add("shipping");
      shipping.textContent = product.shipping;

      // -------------------------------------------
      // 상세페이지 하기전 스크립트
      //     li.appendChild(img);
      //     li.appendChild(description);
      //     li.appendChild(discount);
      //     li.appendChild(price);
      //     li.appendChild(shipping);

      //     content.appendChild(li); 
      //   });
      // }
      // -------------------------------------------

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
    let sortedData = [...data]; // 원본 데이터 복사후 정렬

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
        // 제이슨의 모든 배열을 allProducts설정하고 하나로 만들기 (하나로 안만들면.. 자꾸 못읽어서! 왜?)
        const allProducts = [
          ...data.NewList,
          ...data.BestList,
          ...data.GoodList,
        ];

        sortData(allProducts, currentSort); // 정렬 후 화면 표시
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

// 데이터 화면표시
  fetchData(); 
});
