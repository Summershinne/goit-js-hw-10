import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector('.form');


formEl.addEventListener('submit', onSubmit);


function onSubmit(event) {
    event.preventDefault();
    makePromise(Object.fromEntries(new FormData(event.target))).then((delay) => {
        iziToast.show({
            message: `✅ Fulfilled promise in ${delay}ms`
        })
    }).catch((delay) => {
        iziToast.show({
            message: `❌ Rejected promise in ${delay}ms`
        })
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


