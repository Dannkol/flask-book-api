let medicamentos ={
    showMedicamentos(p1){

            let plantilla = "";
            plantilla = p1.tratamiento.map((val)=>{
                console.log(p1);
                
            return `
            <div class="ingresoMedicamento col-10">
                    <div class="card2">
                        <div class="d-flex justify-content-center align-items-center">
                            <div class="icono1">
                                <img class="masbutton" src="../img/complete.png" alt="" srcset="">
                            </div>
                            <div class="body py-2 px-0 text-center">
                            <div class="header pt-2 p-0">${val.description}</div>
                            <p class="p1 text-white m-0"> Inicio dd/mm/aa</p>
                            <p class="p2 text-white m-0"> Tu tratamiento termina en 6 días</p>
                            <p class="p3 text-white m-0"> Dosis: 1 pastilla cada 8 horas</p>
                            </div>
                            <div class="icono2">
                                <button id="btnMas"><img class="masbutton" src="../img/mas.png" alt="" srcset=""></button>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }) 
        return plantilla.join('');
    

    },
    showCard(p1){
        let plantilla = p1.tratamiento.map((val)=>{
            return `
            <div class="w-100 px-5">
            <div class="flip-card" style="display: none;">
            <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <p class="title">${val.description}</p>
                        <p>Detalles</p>
                    </div>
                    <div class="flip-card-back">
                        <p class="title">BACK</p>
                        <p>Leave Me</p>
                    </div>
                </div>
                    
            </div>

            </div>
            `
        })
        return plantilla.join('');
    }



}
self.addEventListener("message", (e)=>{
    const { module, data } = e.data;
    const medicamento = medicamentos[module];
    if (typeof medicamento === "function") {
      const resultado = medicamento(data);
      postMessage(resultado);
    } else {
      postMessage(`Error: ${module} no es una función válida`);
    }
})