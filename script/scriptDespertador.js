
const display = document.getElementById('display');
const textoDisplay = document.getElementById('texto-display');
const horas = document.getElementById('horas');
const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');
const ativar = document.getElementById('ativar-alarme');
const parar = document.getElementById('parar-alarme');
const ponteiroRelogio = document.querySelector('.ponteiro');
const btn_menulateral = document.querySelector('.btn-menulateral');
const menu_lateral = document.querySelector('.menu-lateral'); 


var data, horaAtual, minutoAtual, 
    segundoAtual, intervaloHoraAtual, intervaloIniciarAlarme,
    formato_horaAtual, formato_minutoAtual, formato_segundoAtual;


parar.setAttribute('disabled', "");

for(var i=0; i<=60; i++){
    i = i < 10 ? `0${i}` : i;
    horas.innerHTML += '<option value="'+i+'">'+i+'</option>';
    minutos.innerHTML += '<option value="'+i+'">'+i+'</option>';
    segundos.innerHTML += '<option value="'+i+'">'+i+'</option>';
}


intervaloHoraAtual = setInterval(()=>{
    data = new Date();
    horaAtual = data.getHours();
    minutoAtual = data.getMinutes();
    segundoAtual = data.getSeconds();
    formato_horaAtual = horaAtual < 10 ? `0${horaAtual}` : horaAtual;
    formato_minutoAtual = minutoAtual < 10 ? `0${minutoAtual}` : minutoAtual;
    formato_segundoAtual = segundoAtual < 10 ? `0${segundoAtual}` : segundoAtual;
    display.style.fontSize = '30px';
    display.childNodes[1].innerHTML = '<font size=5px>Hora atual</font><br>'+formato_horaAtual+' : '+formato_minutoAtual+' : '+formato_segundoAtual+'';
}, 1000);


function iniciarAlarme(){
    if(horas.value == 0 && minutos.value == 0 && segundos.value == 0){
        alert('Escolha um tempo para ativar!');
    }else{
        ponteiroRelogio.style.animationPlayState = 'running';
        textoDisplay.innerHTML = 'Alarme definido para<br><font color=darkorange>'+horas.value+' : '+minutos.value+' : '+segundos.value+'</font>';
        intervaloIniciarAlarme = setInterval(()=>{
            data = new Date();
            horaAtual = data.getHours();
            minutoAtual = data.getMinutes();
            segundoAtual = data.getSeconds();
    
            if(horas.value == horaAtual && minutos.value == minutoAtual && segundos.value == segundoAtual){
                document.getElementById('sound').play();
                display.style.border = '2px solid darkorange';
                display.innerHTML ='Alarme disparando!';
                clearInterval(intervaloIniciarAlarme);
                clearInterval(intervaloHoraAtual);
            }
        }, 1000);
    }
}

function pararAlarme(){
        clearInterval(intervaloIniciarAlarme);
        document.getElementById('sound').pause();
        location.reload();
}

ativar.addEventListener('click', ()=>{
    iniciarAlarme();
    parar.removeAttribute('disabled', "");
    parar.style.opacity = '1';
});

parar.addEventListener('click', ()=>{
    pararAlarme();
    ponteiroRelogio.style.animationPlayState = 'paused';
})

btn_menulateral.addEventListener('click', (evento)=>{
    menu_lateral.classList.toggle('menu-ativo');
})


