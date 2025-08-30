const $ = sel => document.querySelector(sel);
});


$('#installBtn')?.addEventListener('click', async ()=>{
if(!state.deferredPrompt) return;
state.deferredPrompt.prompt();
const { outcome } = await state.deferredPrompt.userChoice;
if(outcome === 'accepted') toast('¡Gracias por instalar! 🥰');
state.deferredPrompt = null;
$('#installBtn').hidden = true;
});


/* ======= Confeti ======= */
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
let confetti = [];
function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
window.addEventListener('resize', resize); resize();


function confettiBurst(n=120){
const colors = ['#ff3b6d','#ff9fb8','#ffd0df','#fff'];
for(let i=0;i<n;i++){
confetti.push({
x: Math.random()*canvas.width,
y: -10,
r: 3+Math.random()*4,
s: 1+Math.random()*2,
a: Math.random()*Math.PI*2,
c: colors[i%colors.length]
});
}
}


(function loop(){
requestAnimationFrame(loop);
ctx.clearRect(0,0,canvas.width,canvas.height);
confetti.forEach(p=>{
p.y += p.s; p.x += Math.sin(p.a)/2; p.a += 0.02;
ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle = p.c; ctx.fill();
});
confetti = confetti.filter(p=> p.y < canvas.height+10);
})();


/* ======= Toast ======= */
let toastTimeout;
function toast(msg){
let el = document.getElementById('toast');
if(!el){
el = document.createElement('div');
el.id = 'toast';
el.style.position = 'fixed';
el.style.left = '50%';
el.style.bottom = '20px';
el.style.transform = 'translateX(-50%)';
el.style.background = 'rgba(0,0,0,.8)';
el.style.color = '#fff';
el.style.padding = '10px 14px';
el.style.borderRadius = '12px';
el.style.boxShadow = '0 10px 30px rgba(0,0,0,.2)';
el.style.zIndex = '9999';
document.body.appendChild(el);
}
el.textContent = msg; el.style.opacity = '1';
clearTimeout(toastTimeout);
toastTimeout = setTimeout(()=>{ el.style.opacity = '0'; }, 1800);
}


/* ======= Eventos ======= */
$('#saveNameBtn').addEventListener('click', saveName);
$('#startGameBtn').addEventListener('click', startGame);
$('#resetGameBtn').addEventListener('click', resetGame);
$('#tapBtn').addEventListener('click', tap);
$('#submitQuizBtn').addEventListener('click', submitQuiz);
$('#resetQuizBtn').addEventListener('click', resetQuiz);
$('#shareBtn').addEventListener('click', share);
$('#poemBtn').addEventListener('click', poem);


/* ======= Init ======= */
(function init(){
if(state.name){ $('#nameInput').value = state.name; $('#byName').textContent = state.name; }
$('#quizScore').textContent = state.quizScore.toString();
addToTotal(); personalizePlaceholders();
})();