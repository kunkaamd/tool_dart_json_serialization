var valueneed = 300; // number usdt
var autoborrow = setInterval(
    () => {
        console.log(123);
        if(valueneed == 0) clearInterval(autoborrow);
        document.querySelector(".borrow-repay-splitter").parentElement.firstElementChild.click();
        setTimeout( () => {
            var valueborrow = parseInt(document.querySelector(".currency.c-title").innerText.split(" ")[1].replace(",",""));
            if(valueborrow > 1 && valueborrow <= valueneed) {
                document.querySelector(".borrowAll").click();
                valueneed -= valueborrow;
                setTimeout( () => {
                    document.querySelector(".dialog-window button").click();
                },10)
            } else if (valueborrow > 1 && valueborrow < valueneed) {
                var input = document.getElementById('loanDialogInpNum');
                var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
                nativeInputValueSetter.call(input, valueneed.toString());
                var ev2 = new Event('input', { bubbles: true});
                input.dispatchEvent(ev2);
                valueneed = 0;
                setTimeout( () => {
                    document.querySelector(".dialog-window button").click();
                },10)
            } else {
                
            }
            setTimeout( () => {document.querySelector(".dialog-window .close-btn").click();} ,100)
        },250000);
    },300000
);
