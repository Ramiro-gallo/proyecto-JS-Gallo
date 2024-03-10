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

// testeo variables usuario:

let weight = 80;
let height = 180;
let age = 22;
let selectedFormula = 1;

// linkeo variables con DOM:











// declaración de datos de fórmulas: 

const formulas = [
    {name: "harris-benedict-men",
    weightMultiplier: 13.75 ,
    heightMultiplier: 5.003 ,
    ageMultiplier: 6.775 , 
    resto: 66.5 ,
    },
    {name: "harris-benedict-women",
    weightMultiplier: 9.563 ,
    heightMultiplier: 1.850 ,
    ageMultiplier: 4.676 , 
    resto: 655.1 ,
    },
    {name: "harris-benedict-revised-men",
    weightMultiplier: 13.397 ,
    heightMultiplier: 4.799 ,
    ageMultiplier: 5.677 , 
    resto: 88.362 ,
    },
    {name: "harris-benedict-revised-women",
    weightMultiplier: 9.247 ,
    heightMultiplier: 3.098 ,
    ageMultiplier: 4.330 , 
    resto: 447.593 ,
    },
    {name: "mifflin-st-jeor-men",
    weightMultiplier: 10 ,
    heightMultiplier: 6.25 ,
    ageMultiplier: 5 , 
    resto: 5 ,
    },
    {name: "mifflin-st-jeor-women",
    weightMultiplier: 10 ,
    heightMultiplier: 6.25 ,
    ageMultiplier: 5 , 
    resto: -161 ,
    },
]

// función de cálculo:

function CalcBMR() {
    let BMR = (weight*(formulas[selectedFormula].weightMultiplier)) + (height*(formulas[selectedFormula].heightMultiplier)) - (age*(formulas[selectedFormula].ageMultiplier)) + (formulas[selectedFormula].resto);
    return BMR;    
}
console.log(CalcBMR());

