const music=document.getElementById("music");
const musicBtn=document.getElementById("musicBtn");
const yesBtn=document.getElementById("yesBtn");
const noBtn=document.getElementById("noBtn");
const noText=document.getElementById("noText");
const celebration=document.getElementById("celebration");

let noClicks=0;
let musicStarted=false;

function startMusic(){
  if(!musicStarted){
    music.volume=.55;
    music.play().then(()=>{
      musicStarted=true;
      musicBtn.textContent="🔊";
    }).catch(()=>{});
  }
}
function startExperience(){
  startMusic();
  document.querySelectorAll(".reveal").forEach((el,i)=>{
    setTimeout(()=>el.classList.add("show"),i*180);
  });
  document.getElementById("question").scrollIntoView({behavior:"smooth"});
  setTimeout(makeHeart,300);
}
musicBtn.addEventListener("click",()=>{
  if(music.paused){music.play();musicBtn.textContent="🔊"}
  else{music.pause();musicBtn.textContent="🎵"}
});
document.addEventListener("click",()=>startMusic(),{once:true});

function runAway(){
  noClicks++;
  noBtn.classList.add("shrink");
  const messages=[
    "Arey 😭 ye button serious nahi tha.",
    "Baigan ji NO ka option itna cute kyu hai 😭",
    "Ek baar aur soch lo 👉👈",
    "Button bhi sharma gaya... 😂",
    "Okay okay 😭 bas waffle date pe YES kar do."
  ];
  noText.textContent=messages[Math.min(noClicks-1,messages.length-1)];

  // YES grows, NO shrinks each time.
  const yesScale=1 + noClicks*.10;
  const noScale=Math.max(.18,1-noClicks*.16);
  yesBtn.style.transform=`scale(${yesScale})`;
  noBtn.style.transform=`scale(${noScale})`;

  if(noClicks>=5){
    noBtn.style.opacity=".12";
    noText.textContent="NO button officially gave up. 😭❤️";
  }
}

function sayYes(){
  startMusic();
  launchCelebration();
}

function launchCelebration(){
  celebration.classList.add("show");
  document.body.style.overflow="hidden";
  for(let i=0;i<35;i++) setTimeout(makeHeart,i*45);
  confettiBurst();
}

function closeCelebration(){
  celebration.classList.remove("show");
  document.body.style.overflow="";
}

function makeHeart(){
  const h=document.createElement("div");
  h.className="heart-float";
  h.textContent=["💗","💕","🩷","✨","❤️"][Math.floor(Math.random()*5)];
  h.style.left=Math.random()*100+"vw";
  h.style.animationDuration=(3+Math.random()*4)+"s";
  h.style.fontSize=(18+Math.random()*24)+"px";
  document.body.appendChild(h);
  setTimeout(()=>h.remove(),7500);
}

// Lightweight canvas confetti: no external library needed.
function confettiBurst(){
  const c=document.getElementById("confetti"),ctx=c.getContext("2d");
  c.width=innerWidth;c.height=innerHeight;
  const pieces=Array.from({length:220},()=>({
    x:innerWidth/2+(Math.random()-.5)*120,
    y:innerHeight*.45,
    vx:(Math.random()-.5)*16,
    vy:-Math.random()*15-5,
    g:.28+Math.random()*.2,
    s:5+Math.random()*8,
    r:Math.random()*6.28,
    vr:(Math.random()-.5)*.3
  }));
  let frames=0;
  function draw(){
    ctx.clearRect(0,0,c.width,c.height);
    pieces.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.r+=p.vr;
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);
      ctx.fillStyle=["#fff","#ffd1e5","#ffebf3","#ffd166","#ff4f9e"][Math.floor(Math.random()*5)];
      ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s*1.7);ctx.restore();
    });
    if(frames++<180) requestAnimationFrame(draw);
    else ctx.clearRect(0,0,c.width,c.height);
  }
  draw();
}
