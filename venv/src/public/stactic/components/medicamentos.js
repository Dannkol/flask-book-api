import config from "../storage/config.js";
export default{
    printMedicamentos(){
        config.data();
        Object.assign(this, JSON.parse(localStorage.getItem("data")));
        const ws = new Worker("../storage/wsMedicamentos.js", {type:"module"})
        let id = ["#entradasMedicamentos", "cardYpingui"];
        let count = 0;

        ws.postMessage({module:"showMedicamentos", data:this.data})
        ws.postMessage({module:"showCard", data:this.data})
        ws.addEventListener("message", (e)=>{
            let doc = new DOMParser().parseFromString(e.data, "text/html");
            document.querySelector(id[count]).append(...doc.body.children)
            (id.length-1==count) ? ws.terminate(): count++;
        })
    },
    botonesss(){
        async function botones() {
            let btns = document.querySelectorAll("#btnMas");
            while (btns.length === 0) {
              await new Promise(resolve => setTimeout(resolve, 100)); // Esperar 100 ms
              btns = document.querySelectorAll("#btnMas");
            }
            
            const card = document.querySelector(".flip-card");
            const pinguino = document.querySelector(".aaaa");
          
            function ocultar() {
              if (card.style.display === "none") {
                card.style.display = "block";
                pinguino.style.display = "block";
              } else {
                card.style.display = "none";
                pinguino.style.display = "none";
              }
            }
            btns.forEach(btn => {
              btn.addEventListener("click", (e)=>{
                ocultar();
              })
            });
          }
          botones();            
        }
}