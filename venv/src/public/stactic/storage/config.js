export default{
    data(){
        localStorage.setItem("data", JSON.stringify({
            "data":{
                "edad":20,
                "observacion":"Paciente adulto edad 33 años con problemas pulmonares, fumador compulsivo",
                "antecendes":[
                    {
                        "tipo":"Farmacologicos",
                        "observaciones":"Acetaminofen 1000 mg...",
                        "fecha":"28:04:2023 00:00:00"
                    },{
                        "tipo":"Quirurgico",
                        "observaciones":"herniografia inguial derecha...",
                        "fecha":"28:04:2023 00:00:00"       
                    },{
                        "tipo":"Patologicos",
                        "observaciones":"hipertension arterial/infarto",
                        "fecha":"28:04:2023 00:00:00"  
                    }
                ],
                "tratamiento": [
                    {
                    "tipo": "Pastillas",
                    "Dosis": "3  dosis diaria",
                    "cantidad": "21",
                    "duracion": "7 dias",
                    "indicacion": "despues de cada comida",
                    "description": "Dolex"
                    },
                    {
                    "tipo": "Gotas",
                    "dosis": "2 dosis diaria",
                    "cantidad": "10",
                    "duracion": "5 dias",
                    "indicacion": "al levantarse y antes de acostarse",
                    "description": "nn"
                    }
                ]
            }
        }))
    }
}