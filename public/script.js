window.onload = function(){ 

    const hidden = document.querySelector('.hide');
    const chat = document.querySelector('.chat');
    const send = document.querySelector('.send');
    let clicked = false;

    hidden.onclick = (e) => {
        e.preventDefault();
        if (!clicked) {
            chat.style.opacity = 0;
            send.style.opacity = 0;
            hidden.textContent = "Show";
        } else {
            chat.style.opacity = 1;
            send.style.opacity = 1;
            hidden.textContent = "Hide";
        }
        clicked = !clicked;
        }

};