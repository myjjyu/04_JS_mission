document.addEventListener("DOMContentLoaded", () => {
  // content 요소 선택
  const content = document.getElementById("main-secend");

  fetch("http://localhost:3002/iconList") ////ajax 가져오기
    .then((response) => {
      if (!response.ok) {
        throw new Error("네트워크 응답에 문제가 있습니다.");
      }
      return response.json(); // JSON 형식으로 변환
    })
    .then((data) => {
      data.forEach((item) => {
        // 구성 블록 요소 생성
        const block = document.createElement("div");
        block.classList.add("block");

        // main-list 요소 생성
        const mainList = document.createElement("div");
        mainList.classList.add("main-list");

        // title p 요소 생성
        const title = document.createElement("p");
        title.textContent = item.title;

        // subtitle p 요소 생성
        const subtitle = document.createElement("p");
        subtitle.classList.add("menu");
        subtitle.innerHTML = `${item.subtitle} <a href="#"><img class="arrow" src="./img/arrow.png" alt="Arrow" /></a>`;

        mainList.appendChild(title);
        mainList.appendChild(subtitle);

        // img-list 요소 생성
        const imgList = document.createElement("div");
        imgList.classList.add("img-list");

        // ul 요소 생성
        const ul = document.createElement("ul");

        // 제품들을 포함하는 li 요소 생성
        item.products.forEach((product) => {
          const li = document.createElement("li");

          // img 요소 생성
          const img = document.createElement("img");
          img.src = product.image;
          img.alt = product.description;
          img.style.width = "200px";
          img.style.height = "auto"; 

          // description p 요소 생성
          const description = document.createElement("p");
          description.textContent = product.description;

          // discount p 요소 생성
          const discount = document.createElement("p");
          discount.classList.add("discount");
          discount.innerHTML = `${product.discount} <span class="original-price">${product.originalPrice}</span>`;

          // price p 요소 생성
          const price = document.createElement("p");
          price.classList.add("price");
          price.textContent = product.price;

          // shipping p 요소 생성
          const shipping = document.createElement("p");
          shipping.classList.add("shipping");
          shipping.textContent = product.shipping;

          // li 요소에 생성한 요소 추가
          li.appendChild(img);
          li.appendChild(description);
          li.appendChild(discount);
          li.appendChild(price);
          li.appendChild(shipping);

          // ul 요소에 li 추가
            ul.appendChild(li);
          });

// ---------------------------------------------------------------
         // 제품 이미지 클릭 시 페이지 이동
          // img.addEventListener("click", () => {
          //   window.location.href = "./Page.html"; 
            // 원하는 페이지 URL
          // });
          // ul 요소에 li 추가
        //   ul.appendChild(li);
        // });
// ---------------------------------------------------------------

        imgList.appendChild(ul);

        //mainList, imgList 추가
        block.appendChild(mainList);
        block.appendChild(imgList);

        //  block 추가
        content.appendChild(block);
      });
    })
    .catch((error) => {
      console.error("데이터 오류", error);
    });


// -------------------------------------------
//// 추천순, 혜택순, 낮은가격순, 높은가격순 클릭하면  해당 데이터에 컬러 및 밑줄 
  const sortLinks = document.querySelectorAll(".all_list_name a");

  // 기본 컬러 설정 (추천순 링크)
  const defaultLink = document.getElementById("sort-recommend");
  defaultLink.classList.add("active");

  sortLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

    // 글씨 컬러 초기화 및 변경 이벤트
    // 모든 링크에서 active 클래스 제거
      sortLinks.forEach((link) => link.classList.remove("active"));

     // 클릭된 링크에 active 클래스 추가
      this.classList.add("active");
    });
  });
});

    
