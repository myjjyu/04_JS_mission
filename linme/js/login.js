// 로그인 눈아이콘 //
document.getElementById("eyePassword").addEventListener("click", function () {
  const passwordInput = document.getElementById("passwordInput");
  const passwordIcon = document.getElementById("eyePassword");

  // 패스워드가 표시된 상태인지 확인
  if (passwordInput.type === "password") {
    // 패스워드 보이기
    passwordInput.type = "text";
    passwordIcon.src = "./img/login/password(2).png";
  } else {
    // 패스워드 숨기기
    passwordInput.type = "password";
    passwordIcon.src = "./img/login/password.png";
  }
});



// 로그인 //
document.querySelector("#join_form").addEventListener("submit", (e) => {
  e.preventDefault(); // 제출 방지

  const email = document.querySelector("#email").value;
  const passwordInput = document.querySelector("#passwordInput").value;

  if (!email) {
    Swal.fire({
      title: "이메일을 입력해주세요.",
      confirmButtonText: "확인",
      width: 300,
      height: 145,
      customClass: {
        confirmButton: "alert-button",
        title: "title-text",
      },
    });
    return; // 이메일 입력이 없으면 비밀번호 검사 안함
  }

  if (!passwordInput) {
    Swal.fire({
      title: "비밀번호를 입력해주세요.",
      confirmButtonText: "확인",
      width: 300,
      height: 145,
      customClass: {
        confirmButton: "alert-button",
        title: "title-text",
      },
    });
    return; // 비밀번호 입력이 없으면 검사 안함
  }

  // 모두 입력 완료시
  alert("입력형식 검사 완료!!!");
});
