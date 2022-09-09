function counter(num = 0) {
    let count = num;
    const get = () => {
        console.log(count);
        return count;
    };
    const next = () => {
        count++;
    };
    return [get, next];
}
const [getA, nextA] = counter(1);
getA(); // 1
nextA();
getA(); // 2
const [getB, nextB] = counter(10);
nextB();
getA(); // 2
getB(); // 11
nextA();
getA(); // 3
getB(); // 11
