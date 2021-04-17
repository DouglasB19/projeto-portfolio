(function readyJS(win,doc){
'use strict';
let lastScrollTop = 0;
let barShow = false;

let currentRotation = 360;

let slideCount = 0;
let timeClear;

let header = doc.querySelector(".navbar");

let btnbar = doc.querySelector(".btnbar");
let leftbar = doc.querySelector(".leftbar");

let btnConta = doc.querySelector(".btnContact");
let resultConta = doc.querySelector(".resultado");

let photoRotation = doc.querySelector(".myphoto");

let btnSlide = doc.querySelectorAll(".btnSlide");
let imgSlide = doc.querySelectorAll(".imgSlide");

win.addEventListener("scroll", function(){
    //header.classList.toggle("sticky", window.scrollY > lastScrollTop);
    
    let scrollTop = window.pageYOffset || doc.documentElement.scrollTop;
    if(scrollTop > lastScrollTop && barShow == false){
        header.classList.add("remove");
    }
    else{
        header.classList.remove("remove");
    }
    lastScrollTop = scrollTop;
});

function btnLeftbar(){
    if(leftbar.classList.contains("show")){
        leftbar.classList.remove("show");
        barShow = false;
    }
    else{
        leftbar.classList.add("show");
        barShow = true;
    }
}

function EventContact(){
    if(resultConta.classList.contains("show")){
        resultConta.classList.remove("show");
    }
    else{
        resultConta.classList.add("show");
    }
}

function EventRotation(){
    currentRotation += 360;
    photoRotation.style.transform = 'translateX(calc(-50% + 100px)) rotate(' + currentRotation + 'deg)';
}

btnbar.addEventListener("click", btnLeftbar, false);
btnConta.addEventListener("click", EventContact, false);
photoRotation.addEventListener("click", EventRotation, false);


const spans = doc.querySelectorAll('h1 span')
spans.forEach(span => span.addEventListener('mouseover', function(e){
    span.classList.add('animated', 'rubberBand')
}))
spans.forEach(span => span.addEventListener('mouseout', function(e){
    span.classList.remove('animated', 'rubberBand')
}))

const htmlBar = doc.querySelector('.bar-html')
const cssBar = doc.querySelector('.bar-css')
const jsBar = doc.querySelector('.bar-javascript')
const reactBar = doc.querySelector('.bar-react')

var t1 = new TimelineLite();

t1.fromTo(htmlBar, .75, {width: `calc(0% - 6px)`}, {width: `calc(90% - 6px)`, ease: Power4.easeOut})
    .fromTo(cssBar, .75, {width: `calc(0% - 6px)`}, {width: `calc(95% - 6px)`, ease: Power4.easeOut})
    .fromTo(jsBar, .75, {width: `calc(0% - 6px)`}, {width: `calc(75% - 6px)`, ease: Power4.easeOut})
    .fromTo(reactBar, .75, {width: `calc(0% - 6px)`}, {width: `calc(70% - 6px)`, ease: Power4.easeOut})

const contoller = new ScrollMagic.Controller()
const scene = new ScrollMagic.Scene({
    triggerElement: '.skills',
    triggerHook: 0
})
.setTween(t1)
.addTo(contoller)

function clickSlide(event){
    clearInterval(timeClear);
    for(let i = 0; i < btnSlide.length; i++){
        if(btnSlide[i].hasAttribute('class')){
            btnSlide[i].classList.remove('active');
            imgSlide[i].classList.remove('show');
        }
    }
    slideCount = event.target.id;  
    event.target.classList.add('active');
    imgSlide[event.target.id].classList.add('show');
    setTime();
}

function showDivs(){
    for(let i = 0; i < imgSlide.length; i++) {
        btnSlide[i].classList.remove('active');
        imgSlide[i].classList.remove('show');
    }
    slideCount++;  
    if(slideCount == imgSlide.length){slideCount = 0}
    btnSlide[slideCount].classList.add('active');
    imgSlide[slideCount].classList.add('show');
}

function setTime(){
    timeClear = setInterval(showDivs, 5000);
}

timeClear = setInterval(showDivs, 5000);

for(let i = 0; i < btnSlide.length; i++){
    btnSlide[i].addEventListener("click", clickSlide, false);
}

})(window,document);