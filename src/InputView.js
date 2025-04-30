import { Console } from '@woowacourse/mission-utils';

const InputView = {
    async readDate() {
        while (true) {
            try {
                const input = await Console.readLineAsync("12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)");
                const date = Number(input);
                if (!Number.isInteger(date) || date < 1 || date > 31) {
                    throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요."); // Error 객체 생성
                }
                return date;
            } catch (e) { // e는 발생한 에러 객체
                Console.print(e.message); // 에러 메시지 문자열 : "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요."
            }
        }
    },

    async readOrder() {
        while (true) {
            try {
                const input = await Console.readLineAsync("주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1)");
                const order = {}; // 주문 객체 -> { 메뉴이름 : 개수 }
                const items = input.split(','); // 배열 생성 => { 메뉴이름-2, 메뉴이름-1 }
                const seen = new Set(); // 중복 확인
                for (const item of items) {
                    const [name, count] = item.split('-');
                    if (!name || !count || isNaN(count) || Number(count) < 1) {
                        throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
                    }
                    if (seen.has(name)) { // 이미 있으면 에러 발생(has 메서드 사용)
                        throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
                    }
                    const validMenus = [
                        '양송이수프', '타파스', '시저샐러드',
                        '티본스테이크', '바비큐립', '해산물파스타', '크리스마스파스타',
                        '초코케이크', '아이스크림',
                        '제로콜라', '레드와인', '샴페인'
                    ];
                    if (!validMenus.includes(name)) {
                        throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
                    }
                    seen.add(name);
                    order[name] = Number(count); // count-> 숫자로 변환 후 order 객체에 추가
                }

                let totalCount = 0;
                let drinkCount = 0;
                let menuCount = 0;
                const drinkList = ['제로콜라', '레드와인', '샴페인'];

                for (const menu in order) { // order 객체에서 key값만 조회
                    const count = order[menu];
                    totalCount += count;
                    menuCount += 1;
                    if (drinkList.includes(menu)) {
                        drinkCount += 1;
                    }
                }

                const onlyDrinks = drinkCount === menuCount; // 음료만 중요한 경우
                if (totalCount > 20 || onlyDrinks) {
                    throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
                }

                return order;
            } catch (e) {
                Console.print(e.message);
            }
        }
    }
};

export default InputView;
