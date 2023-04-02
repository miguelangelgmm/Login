let changeButton = document.querySelector("#change-elem");
const elem1 = document.getElementById('elem1');
const elem2 = document.getElementById('elem2');

const textButton = changeButton.querySelector("span");

const registerView = document.getElementById('registerView');
const loginView = document.getElementById('loginView');

function changeView(view1,view2) {
    view1.classList.add("d-none")
    view2.classList.remove("d-none")
}



let swapped = false;

function swapElements() {
    const parent = elem1.parentNode;

    elem1.classList.add("change-transition");
    elem2.classList.add("change-transition");

    //animación para cuando estan colocados en horizontal
    if (elem1.offsetTop == elem2.offsetTop) {
        const parentRight = parent.offsetWidth - elem1.offsetWidth;
        if (!swapped) {
            // Desplaza elem1 a la derecha
            elem1.style.transform = `translateX(${parentRight}px)`;
            // Desplaza elem2 a la izquierda
            elem2.style.transform = `translateX(-${parentRight}px)`;
            textButton.innerHTML = "Registrarse";

            changeView(registerView,loginView)


        } else {
            //regresan a su posición
            elem1.style.transform = `translateX(-${parentRight}px)`;
            elem2.style.transform = `translateX(${parentRight}px)`;
            textButton.innerHTML = "Iniciar Sesión";

            changeView(loginView,registerView)

            //tanto login como registro deben tener la misma altura  
            loginView.style.height=`${registerView.offsetHeight}px`;

        }
    } else {
        //animación para cuando estan colocados en vertical

        const heightDiff = elem2.offsetHeight - elem1.offsetHeight;
        const parentTop = parent.offsetHeight - elem1.offsetHeight - Math.abs(heightDiff);
        if (!swapped) {
            // Desplaza elem1 a la derecha
            elem1.style.transform = `translateY(${parentTop + heightDiff}px)`;
            // Desplaza elem2 a la izquierda
            elem2.style.transform = `translateY(-${parentTop}px)`;
            changeView(registerView,loginView)

        } else {

            //regresan a su posición
            elem1.style.transform = `translateY(-${parentTop + heightDiff}px)`;
            elem2.style.transform = `translateY(${parentTop}px)`;

            changeView(loginView,registerView)

            //tanto login como registro deben tener la misma altura  
            loginView.style.height=`${registerView.offsetHeight}px`;
        }
    }

    let animationComplete = false;

    elem1.addEventListener('transitionend', (event) => {
        if (event.propertyName === 'transform' && !animationComplete) {
            
            elem1.classList.remove("change-transition");
            elem2.classList.remove("change-transition");
            elem2.style.transition = '';
            elem1.removeAttribute('style');
            elem2.removeAttribute('style');
            if (!swapped) {
                console.log("volvemos")
                parent.insertBefore(elem1, elem2);
                textButton.innerHTML = "Registrarse";

            } else {
                console.log("aqui estamos")
                parent.insertBefore(elem2, elem1);
                textButton.innerHTML = "Iniciar Sesión";

            }
            animationComplete = true;
            event.stopPropagation();
        }
    });

    swapped = !swapped;
}

changeButton.addEventListener('click', swapElements);