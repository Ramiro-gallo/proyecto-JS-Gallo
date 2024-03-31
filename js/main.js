// código botón modo oscuro: 

let darkMode = localStorage.getItem("darkMode");
const darkModeToggle = document.querySelector("#darkModeToggle");

const enableDarkMode = () => {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
}

const disableDarkMode = () => {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", null);
}

if (darkMode === "enabled") {
    enableDarkMode();
  }

darkModeToggle.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode");
    if (darkMode !== "enabled"){
        enableDarkMode();
    } else {
        disableDarkMode();
    }
})

// fetch data formulas

let formulas;

async function getData(url) {
    const response = await fetch(url);
    
    return response.json();
}


async function getFormulas(){ 
    const formulasJSON = await getData('./JSON/formulas.json');

    formulas = formulasJSON;    
}   

getFormulas();

// linkeo variables con DOM:

const formulario = document.getElementById("form");

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    
    //linkeo del select de formula con numero de objetos del array de formulas:

    let selectedFormula;

    const formulaSelect = document.getElementById("equationSelect").value;

    const gender = document.getElementById('genderSelect').value;

    if(formulaSelect === "harris-benedict" && gender === "masculino"){
        selectedFormula = 0;
    } else if (formulaSelect === "harris-benedict" && gender === "femenino"){
        selectedFormula = 1;
    } else if (formulaSelect === "harris-benedict-r" && gender === "masculino"){
        selectedFormula = 2;
    } else if (formulaSelect === "harris-benedict-r" && gender === "femenino"){
        selectedFormula = 3;
    } else if (formulaSelect === "mifflin-st-jeor" && gender === "masculino") {
        selectedFormula = 4;
    } else if (formulaSelect === "mifflin-st-jeor" && gender === "femenino") {
        selectedFormula = 5;
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Por favor, no olvides ingresar todos los datos necesarios ni seleccionar todas las opciones correspondientes para poder completar el cálculo.',
            icon: 'error',
            confirmButtonText: 'Volver a intentar'
          });
    }

    // linkeo de variables de cálculo de la fórmula con inputs del form:
    
    let weight = document.getElementById('weightinput').value;

    let height = document.getElementById('heightinput').value;

    let age = document.getElementById('ageinput').value;

    let activityMultiplier = document.getElementById('activitymultiplierinput').value;
    
    // funcion de cálculo de BMR:

    function calcBMR() {
        let BMR = (weight*(formulas[selectedFormula].weightMultiplier)) + (height*(formulas[selectedFormula].heightMultiplier)) - (age*(formulas[selectedFormula].ageMultiplier)) + (formulas[selectedFormula].resto);
        return BMR;    
    }

    let BMR = calcBMR();

    //funcion de cálculo de TDEE:

    function calcDailyIntake(){
        let dailyIntake = (BMR * activityMultiplier); 
        return dailyIntake;
    }

    let dailyIntake = Math.round(calcDailyIntake());

    // visibilización de etiqueta <p> con resultados de la fórmula.

    function showResults(){
    
        let resultados = document.getElementById("results"); 

        resultados.style.visibility = "visible";

        if(isNaN(dailyIntake)){
            Swal.fire({
                title: 'Error!',
                text: 'Por favor, no olvides ingresar todos los datos necesarios ni seleccionar todas las opciones correspondientes para poder completar el cálculo.',
                icon: 'error',
                confirmButtonText: 'Volver a intentar'
              });
        } else {
            resultados.innerHTML = ("Tu gasto total de energía diario (TDEE) es de aproximadamente " + dailyIntake + "kcal.<br>Esto significa que, según los parámetros ingresados, gastas alrededor de " + dailyIntake + " calorías por día. Si tu deseo es mantener tu peso, deberías consumir esta cantidad de calorías diarias.<br>Si quieres bajar de peso, lo ideal sería que consumas entre " + (dailyIntake - 500) + " y " + (dailyIntake - 300) + " calorías por día.<br>Contrariamente, si quieres subir de peso, lo ideal sería que consumas entre " + (dailyIntake + 300) + " y " + (dailyIntake + 500) + " calorías por día.");
        }

    }

    showResults(); 
})




