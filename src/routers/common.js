class common {
  static checkDate(data) {
      //날짜 데이터 포맷 검증 (코드리뷰)
      //ex) 2023-05-01
      //"숫자4개", "-" , "숫자2개", "-" , "숫자2개" 형식으로 검증함. 
      const regex = /\d{4}-\d{2}-\d{2}/;
      return regex.test(data);

  }
}

export { common };
