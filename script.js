let heartsActive = true;

// ===== Créer un cœur normal =====
function createHeartAuto() {
  if (!heartsActive) return;

  const heart = document.createElement("div");
  heart.classList.add("heart");

  // SVG cœur rouge/rose
  heart.innerHTML = `
    <svg viewBox="0 0 32 29.6" width="100%" height="100%">
      <path fill="${Math.random() > 0.5 ? 'red' : 'pink'}"
        d="M23.6,0c-3.4,0-6.4,2.7-7.6,5.6C14.8,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4
           c0,9.4,16,21.2,16,21.2s16-11.8,16-21.2C32,3.8,28.2,0,23.6,0z"/>
    </svg>
  `;

  document.body.appendChild(heart);

  const size = Math.random() * 0.6 + 0.4;
  heart.style.setProperty("--size", size);

  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;

  heart.style.setProperty("--dx","0px");
  heart.style.setProperty("--dy","0px");
  heart.style.setProperty("--mx",`${(Math.random()-0.5)*200}px`);
  heart.style.setProperty("--my",`${(Math.random()-0.5)*200}px`);
  heart.style.setProperty("--rotate",`${Math.random()*360}deg`);

  setTimeout(()=>{heart.remove();},3000);
}

// ===== Cœurs automatiques tout le temps =====
setInterval(() => { createHeartAuto(); }, 20);

// ===== Afficher la question au clic/tap =====
function showQuestion() {
  document.getElementById("startText").style.display = "none";
  document.getElementById("questionContainer").style.display = "block";

  const music = document.getElementById("music");
  music.volume = 0.1;

  // Essayer de lancer la musique après interaction
  const playPromise = music.play();
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.log("L'utilisateur doit interagir pour lancer la musique", error);
    });
  }
}

// ===== Clic et touch pour mobile =====
document.body.addEventListener("click", showQuestion, { once:true });
document.body.addEventListener("touchstart", showQuestion, { once:true });

// ===== Bouton envoyer =====
document.getElementById("submitAnswer").addEventListener("click", (e)=>{
  e.preventDefault();
  const selected = document.querySelector('input[name="reponse"]:checked');
  if(!selected) return alert("Merci de choisir une réponse 😊");

  const music = document.getElementById("music");

  if(selected.value === "oui"){
    document.getElementById("questionContainer").style.display="none";
    document.getElementById("merciMessage").style.display="block";

    // Cœurs normaux
    heartsActive = true;
    const heartInterval = setInterval(()=>{ createHeartAuto(); },20);
    setTimeout(()=>{ clearInterval(heartInterval); },10000);

  } else {
    document.getElementById("questionContainer").style.display="none";
    document.getElementById("nonMessage").style.display="block";

    // Stop musique initiale
    music.pause();

    // Nouvelle musique pour Non
    const musicNo = new Audio("Cry - Cigarettes After Sex.mp3");
    musicNo.volume=0.1;
    musicNo.play();

    // Cœurs brisés
    heartsActive = true;
    const heartInterval = setInterval(()=>{ createHeartBroken(); },20);
    setTimeout(()=>{ clearInterval(heartInterval); musicNo.pause(); },10000);
  }
});

// ===== Créer un cœur brisé =====
function createHeartBroken(){
  if(!heartsActive) return;
  const heart=document.createElement("div");
  heart.classList.add("heart");

  heart.innerHTML=`
    <svg viewBox="0 0 32 29.6" width="100%" height="100%">
      <path fill="${Math.random()>'0.5'?'red':'darkred'}"
        d="M23.6,0c-3.4,0-6.4,2.7-7.6,5.6L16,6l-0.4-0.4C14.8,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4
           c0,9.4,16,21.2,16,21.2s16-11.8,16-21.2C32,3.8,28.2,0,23.6,0z"/>
      <line x1="12" y1="0" x2="20" y2="30" stroke="black" stroke-width="2"/>
    </svg>
  `;
  document.body.appendChild(heart);

  const size=Math.random()*0.6+0.4;
  heart.style.setProperty("--size",size);

  const x=Math.random()*window.innerWidth;
  const y=Math.random()*window.innerHeight;
  heart.style.left=`${x}px`;
  heart.style.top=`${y}px`;

  heart.style.setProperty("--dx","0px");
  heart.style.setProperty("--dy","0px");
  heart.style.setProperty("--mx",`${(Math.random()-0.5)*200}px`);
  heart.style.setProperty("--my",`${(Math.random()-0.5)*200}px`);
  heart.style.setProperty("--rotate",`${Math.random()*360}deg`);

  setTimeout(()=>{heart.remove();},3000);
}
