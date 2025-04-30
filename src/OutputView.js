import { Console } from '@woowacourse/mission-utils';

const OutputView = {
    printResult(result) {
        Console.print(`\n12월 ${result.date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`);

        Console.print("<주문 메뉴>");
        for (const [menu, count] of Object.entries(result.order)) {
            Console.print(`${menu} ${count}개`);
        }

        Console.print("\n<할인 전 총주문 금액>");
        Console.print(`${result.totalPrice.toLocaleString()}원`);

        Console.print("\n<증정 메뉴>");
        Console.print(result.gift);

        Console.print("\n<혜택 내역>");
        const benefits = [];
        if (result.dday) benefits.push(`크리스마스 디데이 할인: -${result.dday.toLocaleString()}원`);
        if (result.weekday) benefits.push(`평일 할인: -${result.weekday.toLocaleString()}원`);
        if (result.weekend) benefits.push(`주말 할인: -${result.weekend.toLocaleString()}원`);
        if (result.special) benefits.push(`특별 할인: -${result.special.toLocaleString()}원`);
        if (result.giftValue) benefits.push(`증정 이벤트: -${result.giftValue.toLocaleString()}원`);
        if (benefits.length === 0) benefits.push("없음");
        benefits.forEach((line) => Console.print(line));

        Console.print("\n<총혜택 금액>");
        Console.print(`-${result.totalBenefit.toLocaleString()}원`);

        Console.print("\n<할인 후 예상 결제 금액>");
        Console.print(`${result.finalPrice.toLocaleString()}원`);

        Console.print("\n<12월 이벤트 배지>");
        Console.print(result.badge);
    }
};

export default OutputView;
