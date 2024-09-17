const icons = [
  { url: "./img/혈액순환.png", title: "혈액순환" },
  { url: "./img/피부건강.png", title: "피부건강" },
  { url: "./img/운동:근육.png", title: "운동/근육" },
  { url: "./img/남성건강.png", title: "남성건강" },
  { url: "./img/여성건강.png", title: "여성건강" },
  { url: "./img/형당.png", title: "혈당" },
  { url: "./img/눈건강.png", title: "눈건강" },
  { url: "./img/간건강.png", title: "간건강" },
  { url: "./img/뼈건강.png", title: "뼈건강" },
  { url: "./img/다이어트.png", title: "다이어트" },
  { url: "./img/스트레스.png", title: "스트레스" },
  { url: "./img/기관지.png", title: "기관지" },
  { url: "./img/면역력.png", title: "면역력" },
  { url: "./img/혈관.png", title: "혈관" },
  { url: "./img/관절.png", title: "관절" },
  { url: "./img/소화기기관.png", title: "소화기기관" },
  { url: "./img/갱년기.png", title: "갱년기" },
  { url: "./img/임산부.png", title: "임산부" },
  { url: "./img/피로:활력.png", title: "피로/활력" },
  { url: "./img/장건강.png", title: "장건강" },
  { url: "./img/치아:잇몸.png", title: "치아/잇몸" },
  { url: "./img/빈혈.png", title: "빈혈" },
  { url: "./img/항산화.png", title: "항산화" },
  { url: "./img/혈압.png", title: "혈압" },
];

// 아이콘 리스트 가져오기
const iconList = document.getElementById("iconList");

// 이미지 반복 생성
icons.forEach((icon) => {
  const swiperIcon = document.createElement("div");
  swiperIcon.classList.add("swiper-icon");
  
  // a 링크 생성
  const link = document.createElement("a");
  link.href = "#";
  
  // img 요소 생성
  const img = document.createElement("img");
  img.src = icon.url;
  img.alt = icon.title;
  
  // 제목 요소 생성
  const title = document.createElement("p");
  title.textContent = icon.title;
  title.classList.add("icon-title");
  
  // a 링크에 img 추가
  link.appendChild(img);
  
  // swiper-icon div에 a 링크 및 제목 추가
  swiperIcon.appendChild(link);
  swiperIcon.appendChild(title);
  
  // iconList에 swiper-icon 추가
  iconList.appendChild(swiperIcon);
});

// 클릭 시 색상http://127.0.0.1:5500/index.html# 변경 기능
const swiperIcons = document.querySelectorAll('.swiper-icon');

swiperIcons.forEach(icon => {
  icon.addEventListener('click', function(event) {
    event.preventDefault(); // 링크의 기본 동작 방지
    
    // 모든 아이콘에서 active 클래스 제거
    swiperIcons.forEach(icon => icon.classList.remove('active'));
    
    // 클릭된 아이콘에 active 클래스 추가
    this.classList.add('active');
  });
});


    