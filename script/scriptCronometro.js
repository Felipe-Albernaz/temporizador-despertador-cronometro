const comecar = document.getElementById('comecar');
const pausar = document.getElementById('pausar');
const continuar = document.getElementById('continuar');
const resetar = document.getElementById('resetar');
const display = document.getElementById('display');
const ponteiroRelogio = document.querySelector('.ponteiro');
const btn_menulateral = document.querySelector('.btn-menulateral');
const menu_lateral = document.querySelector('.menu-lateral'); 



var segundoAtualCronometro, minutoAtualCronometro, horaAtualCronometro, 
    segundoParado, minutoParado, horaParado, intervalo;

continuar.setAttribute('disabled', "");
pausar.setAttribute('disabled', "");


function iniciar(s, m, h){

    segundoAtualCronometro = s;
    minutoAtualCronometro = m;
    horaAtualCronometro = h;

    intervalo = setInterval(()=>{
        segundoAtualCronometro++;
        if(segundoAtualCronometro >= 59){
            minutoAtualCronometro++;
            segundoAtualCronometro = s;
            if(minutoAtualCronometro >= 59){
                horaAtualCronometro++;
                minutoAtualCronometro = m;
                segundoAtualCronometro = s;
            }
        }
        display.style.fontSize = '30px';
        display.childNodes[1].innerHTML = `<p>${horaAtualCronometro<10?`0${horaAtualCronometro}`:horaAtualCronometro}h : ${minutoAtualCronometro<10?`0${minutoAtualCronometro}`:minutoAtualCronometro}m : ${segundoAtualCronometro<10?`0${segundoAtualCronometro}`:segundoAtualCronometro}s</p>`;
        segundoParado = segundoAtualCronometro;
        minutoParado = minutoAtualCronometro;
        horaParado = horaAtualCronometro;
    }, 1000);
        
}


function pausarCronometro(){
    clearInterval(intervalo);
    segundoAtualCronometro = segundoParado;
    minutoAtualCronometro = minutoParado;
    horaAtualCronometro = horaParado;
}

function resetarCronometro(){
    clearInterval(intervalo);
    segundoAtualCronometro = 0;
    minutoAtualCronometro = 0;
    horaAtualCronometro = 0;
    location.reload();
}


comecar.addEventListener('click', ()=>{
    iniciar(0,0,0);
    pausar.removeAttribute('disabled', "");
    pausar.style.opacity = '1';
    comecar.setAttribute('disabled', "");
    comecar.style.opacity = '0.5';
    comecar.style.cursor = 'no-drop';
    continuar.setAttribute('disabled', "");
    continuar.style.opacity = '0.5';
    continuar.style.cursor = 'no-drop';
    ponteiroRelogio.style.animationPlayState = 'running';
});

continuar.addEventListener('click', ()=>{
    iniciar(segundoParado, minutoParado, horaParado);
    continuar.setAttribute('disabled', "");
    continuar.style.opacity = '0.5';
    continuar.style.cursor = 'no-drop';
    ponteiroRelogio.style.animationPlayState = 'running';
})

pausar.addEventListener('click', ()=>{
    pausarCronometro();
    continuar.removeAttribute('disabled', "");
    continuar.style.opacity = '1';
    continuar.style.cursor = 'pointer';
    ponteiroRelogio.style.animationPlayState = 'paused';
});

resetar.addEventListener('click', ()=>{
    resetarCronometro();
});

btn_menulateral.addEventListener('click', (evento)=>{
    menu_lateral.classList.toggle('menu-ativo');
})
