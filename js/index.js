(function readyJS(win, doc){
'use strict';
let lastScrollTop = 0;
let barShow = false;
let header = doc.querySelector(".navbar");

let btnbar = doc.querySelector(".btnbar");
let leftbar = doc.querySelector(".leftbar");

let btnConta = doc.querySelector(".btnContact");
let resultConta = doc.querySelector(".resultado");

window.addEventListener("scroll", function(){
    //header.classList.toggle("sticky", window.scrollY > lastScrollTop);
    
    let scrollTop = window.pageYOffset || doc.documentElement.scrollTop;
    if(scrollTop > lastScrollTop && barShow == false){
        header.classList.add("sticky");
    }
    else{
        header.classList.remove("sticky");
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

btnConta.addEventListener("click", EventContact, false);
btnbar.addEventListener("click", btnLeftbar, false);

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

// const showRequiredCategory = event => {
//     const links = doc.querySelectorAll('.work-category button');
//     for(i = 0; i < links.length; i++){
//         if(links[i].hasAttribute('class')){
//             links[i].classList.remove('active');
//         }
//     }

//     event.classList.add('active');
// }

})(window,document);