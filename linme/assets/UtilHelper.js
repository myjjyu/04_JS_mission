class UtilHelper{
  /**
   * URL dml querystring을 JSON객체로 변환하여 리턴한다
   * @returns json object
   */
  getQuery(){
    const query = new URLSearchParams(location.search);
    return Object.fromEntries(query);
  }



/**
 * 쿠키에 저장된 값을 반환한다 . 값이 없을 경우 undefiend를 반환한다
 * @param {string} name - 쿠키의 이름  
 * @returns  쿠키값
 */
getCookie(name){
  const regex = new RegExp(
    "(?:^|; )" +
      name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
      "=([^;]*)"  // 정규표현식
  );
  let matches = document.cookie.match(regex);

  // 반환활 값이 있다면 decoding을 수행하고 없다면 undefined 반환
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


/**
 * 쿠키를 저장한다
 * @param {string} name - 쿠키이름
 * @param {*} value - 저장할 값
 * @param {number} maxAge - 유효시간(초단위)
 */

setCookie(name, value, maxAge) { // 저장할 이름 , 값, 유효시간
  const encName = encodeURIComponent(name);
  const encValue = encodeURIComponent(value);
  let updatedCookie = `${encName}=${encValue};`;

  updatedCookie += "path=/;"; 

  if (maxAge !== undefined) {
    updatedCookie += `max-age=${maxAge}`;
  }

  //저장
  document.cookie = updatedCookie;
}
}

const utilHelper = new UtilHelper();
