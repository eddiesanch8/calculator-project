console.log(`connected!`)

class Calculator{
    constructor(prevOutput, currentOutput) {
        this.prevOutput = prevOutput;
        this.currentOutput = currentOutput;
    }

}








//1.  I need a way to declare all my vars for now  
const calcBtn = document.querySelectorAll(`.calc__btn--num`)
const operationBtn= document.querySelectorAll(`.calc__btn--op`)
const equalBtn = document.querySelector(`.calc__btn--equal`);
const allClearBtn = document.querySelector(`.calc__btn--clear`);
const deleteBtn = document.querySelector(`.calc__btn--delete`);
const prevOutput = document.querySelector(`.previous`)
const currentOutput = document.querySelector(`.current`)

console.log(calcButtons, equals, clear, deleteNum, operands)

//input is captured, I need a way to make calculations

operationBtn.forEach( (btn) => {

    btn.addEventListener( `click`, () => {





// end of Event Listner 
    })

    // End of .forEach function 
})





//4. Maybe the function run depends on the button clicked? Or the index?

//5. Once the calculation is created, I need to display the calculation

