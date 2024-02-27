import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
console.log(iziToast);

const formEl = document.querySelector('.form');


formEl.addEventListener('submit', onSubmit);


function onSubmit(event) {
    event.preventDefault();
    makePromise(Object.fromEntries(new FormData(event.target))).then((delay) => {
        console.log(`✅ Fulfilled promise in ${delay}ms`
)
    }).catch((delay) => {
console.log(`❌ Rejected promise in ${delay}ms`)
    })
}

function makePromise({delay, state}) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {  
            if (state === "fulfilled") {
               resolve(delay) 
            }
            else { reject(delay)}
        }, delay)
    } )
}


