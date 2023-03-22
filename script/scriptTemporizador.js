
const display = document.getElementById('display');
const horas = document.getElementById('horas');
const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');
const comecar = document.getElementById('comecar');
const pausar = document.getElementById('pausar');
const resetar = document.getElementById('resetar');
const ponteiroRelogio = document.querySelector('.ponteiro');
const btn_menulateral = document.querySelector('.btn-menulateral');
const menu_lateral = document.querySelector('.menu-lateral'); 


pausar.setAttribute('disabled', "");

var horaAtual, minutoAtual, segundoAtual, intervalo, minutoParado, segundoParado; 


for(var i=0; i<=60; i++){
    horas.innerHTML += '<option value="'+i+'">'+i+'</option>';
    minutos.innerHTML += '<option value="'+i+'">'+i+'</option>';
    segundos.innerHTML += '<option value="'+i+'">'+i+'</option>';
}


function iniciarContagem(){

    horaAtual = horas.value;
    minutoAtual = minutos.value;
    segundoAtual = segundos.value;

    if(horas.value == 0 && minutos.value == 0 && segundos.value == 0){
        alert('Escolha um tempo para começar!');
        pausar.setAttribute('disabled', "");
        pausar.style.opacity = '0.5';
    }else{
        ponteiroRelogio.style.animationPlayState = 'running';
        comecar.setAttribute('disabled', "");
        comecar.style.opacity = '0.5';
        comecar.style.cursor = 'no-drop';
        pausar.removeAttribute('disabled', "");
        pausar.style.opacity = '1';

        intervalo = setInterval( ()=> {
            segundoAtual--;
            if(segundoAtual <= 0){
                if(minutoAtual > 0){
                    minutoAtual --;
                    segundoAtual = 59;
                }else if(minutoAtual <= 0){
                    if(horaAtual > 0){
                        horaAtual --;
                        minutoAtual = 59;
                        segundoAtual = 59;
                    }else{
                        document.getElementById('sound').play();
                        clearInterval(intervalo);
                        display.style.border = '2px solid darkorange';
                        display.innerHTML = 'Alarme';
                    }
                }
            }
            display.style.fontSize = '30px';
            display.childNodes[1].innerHTML = `<p>${horaAtual<10?`0${horaAtual}`:horaAtual} : ${minutoAtual<10?`0${minutoAtual}`:minutoAtual} : ${segundoAtual<10?`0${segundoAtual}`:segundoAtual}</p>`;
            horaParado = horaAtual;
            minutoParado = minutoAtual;
            segundoParado = segundoAtual;
        }, 1000);
    }
}

function pausarContagem(){
        clearInterval(intervalo);
        document.getElementById('sound').pause();
        horas.value = horaParado;
        minutos.value = minutoParado;
        segundos.value = segundoParado;
        ponteiroRelogio.style.animationPlayState = 'paused';
}

function resetarContagem(){
    horas.value = 0;
    minutos.value = 0;
    segundos.value = 0;
    clearInterval(intervalo);
    display.style.border = 'none';
    document.getElementById('sound').pause();
    location.reload();
}


comecar.addEventListener('click', ()=>{
    iniciarContagem();
});


pausar.addEventListener('click', ()=>{
    pausarContagem();
    comecar.removeAttribute('disabled', "");
    comecar.style.opacity = '1';
    comecar.innerHTML = 'Continuar';
    comecar.style.cursor = 'pointer';
});


resetar.addEventListener('click', ()=>{
    resetarContagem();
});


btn_menulateral.addEventListener('click', (evento)=>{
    menu_lateral.classList.toggle('menu-ativo');
})
