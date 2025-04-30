import { Console } from '@woowacourse/mission-utils';
import InputView from './InputView.js';
import OutputView from './OutputView.js';

class App {
  async run() {
    Console.print("안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.");
    const date = await InputView.readDate();
    const order = await InputView.readOrder();

    const day = new Date(`2023-12-${String(date).padStart(2, '0')}`).getDay();
    // 받은 문자열을 날짜 객체로 바꿈, 2자리 수로 만든 후, getDay는 이 날짜가 무슨 요일인지 숫자로 알려줌 (ex : 일요일 -> 1, 월요일 ->1)
    const totalPrice = this.calculateTotal(order);

    const dday = this.dDayDiscount(date);
    const weekday = this.weekDessert(day, order);
    const weekend = this.weekendMain(day, order);
    const special = this.starDiscount(date);
    const gift = this.gift(totalPrice);
    const discount = dday + weekday + weekend + special;
    const benefit = discount + gift.price;
    const final = totalPrice - discount;
    const badge = this.badge(benefit);

    OutputView.printResult({
      date,
      order,
      totalPrice,
      dday,
      weekday,
      weekend,
      special,
      gift: gift.name,
      giftValue: gift.price,
      totalBenefit: benefit,
      finalPrice: final,
      badge
    });
  }

  calculateTotal(order) {
    const priceTable = {
      양송이수프: 6000, 타파스: 5500, 시저샐러드: 8000,
      티본스테이크: 55000, 바비큐립: 54000, 해산물파스타: 35000, 크리스마스파스타: 25000,
      초코케이크: 15000, 아이스크림: 5000,
      제로콜라: 3000, 레드와인: 60000, 샴페인: 25000
    };
    let total = 0;

    for (const menu in order) { // menu에는 음식 이름이 저장 (key)
      const count = order[menu]; // count에는 주문한 개수가 저장 (value)
      const price = priceTable[menu]; // priceTable에서 menu의 가격을 가져옴
      total += price * count;
    }

    return total;

  }

  dDayDiscount(date) {
    if (date >= 1 && date <= 25) {
      return 1000 + (date - 1) * 100;
    }
    return 0; // 예외처리
  }

  weekDessert(day, order) {
    const desserts = ['초코케이크', '아이스크림'];

    if (day >= 0 && day <= 4) { // 0 : 일요일, 4 : 목요일
      let discount = 0;

      for (const menu of desserts) { // of는 배열의 값을 저장
        // for ~ in : 보통 객체 또는 배열에서 객체의 key가 필요할 때
        // for ~ of : 배열에서 값이 필요할 때
        if (order[menu]) {
          discount += order[menu] * 2023; // 디저트 할인
        }
      }

      return discount;
    }

    return 0;
  }

  weekendMain(day, order) {
    const mains = ['티본스테이크', '바비큐립', '해산물파스타', '크리스마스파스타'];

    if (day === 5 || day === 6) { // 금요일(5), 토요일(6)일 때만
      let discount = 0;

      for (const menu of mains) { // menu에 mains 배열의 값을 저장
        if (order[menu]) {
          discount += order[menu] * 2023;
        }
      }

      return discount;
    }

    return 0; // 주말이 아니면 할인 없음 (예외 처리)
  }

  starDiscount(date) {
    const stars = [3, 10, 17, 24, 25, 31];

    if (stars.includes(date)) { // 배열에 특정 값이 포함되어 있는지 확인하는 메서드
      return 1000;
    }
    return 0;
  }

  gift(price) {
    if (price >= 120000) {
      return { name : '샴페인', price : 25000};
    }
    return { name : '없음', price : 0};
  }

  badge(benefit) { // benefit = 할인받은 총액
    if (benefit >= 20000) return '산타';
    if (benefit >= 10000) return '트리';
    if (benefit >= 5000) return '별';
    return '없음';
  }
}

export default App;
