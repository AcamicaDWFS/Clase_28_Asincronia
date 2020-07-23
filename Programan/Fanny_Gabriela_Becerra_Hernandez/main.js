const one = function first() {
    setTimeout(() => {
        console.log(1);
    }, 100);
}

const two = function second() {
    console.log(2);
}

one();
two();