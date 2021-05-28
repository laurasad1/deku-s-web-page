const slider = document.querySelector("#slider");

let sliderS = document.querySelectorAll(".sliderS");

let sliderSLast = sliderS[sliderS.length - 1];

const btnRight = document.querySelector("#btnderecha");

const btnLeft = document.querySelector("#btnizquierda");


slider.insertAdjacentElement("afterbegin", sliderSLast);


function Next() 
{
    let sliderSPrimero = document.querySelectorAll(".sliderS")[0];

    slider.style.marginLeft = "-200%";
    slider.style.transition = "all 1s";

    setTimeout(() => 
    {
        slider.style.transition = "none";
        slider.insertAdjacentElement("beforeend", sliderSPrimero);
        slider.style.marginLeft = "-100%"
    }, 1000);

}

btnRight.addEventListener('click', () => 
{

    Next();
});

function Prev() 
{
    let sliderS = document.querySelectorAll(".sliderS");
    let sliderSLast = sliderS[sliderS.length - 1];

    slider.style.marginLeft = "0";
    slider.style.transition = "all 1s";

    setTimeout(() => 
    {
        slider.style.transition = "none";
        slider.insertAdjacentElement("afterbegin", sliderSLast);
        slider.style.marginLeft = "-100%"
    }, 1000);

}

btnLeft.addEventListener('click', () => 
{
    Prev();
});





    setInterval(() => 
    {
        Next();
    }, 10000)
