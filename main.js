// jshint esversion:6
document.getElementById("start").addEventListener("click", setUpGame);
let animalArray = [];
const animal = {
  id: null,
  type: null,
  health: null,
  depleteHealth: function(){
    this.health = this.health - Math.floor(Math.random() * 21);
  },
  eat: function(){
    this.health = this.health + Math.floor(Math.random() * 16) + 10 ;
  }
};

// Starts the game
function setUpGame(){
  for(let i = 0; i<=2; i++){
    for(let j = 0; j<5; j++){
      let newAnimal = Object.create(animal);
      newAnimal.health = 100;
      switch(i){
        case 0:
          newAnimal.type = "elephant";
          newAnimal.id = `elephant${j+1}`;
        break;
        case 1:
          newAnimal.type = "giraffe";
          newAnimal.id = `giraffe${j+1}`;
        break;
        case 2:
          newAnimal.type = "monkey";
          newAnimal.id = `monkey${j+1}`;
        break;
      }
      animalArray.push(newAnimal);
    }
  }
document.getElementById("start").style.display = "none";
document.getElementById("hourFeed").style.display = "";
document.getElementById("hourFeed").classList.toggle("activeButtonContainer");
document.getElementById("hour").classList.toggle("activeHourButton");
document.getElementById("feed").classList.toggle("activeFeedButton");
document.querySelectorAll(".individualHealth").forEach(health => {
  health.style.width="100%";
});
animalArray.forEach(animal => {
  document.getElementById(`${animal.id}Label`).innerText = `${animal.health}%`;
});
console.log(animalArray);
}

// Event listener fo +1 hour button click, deplete an RNG amount of health on button click
document.getElementById("hour").addEventListener("click", function(event){
  animalArray.forEach(function(animal){
    animal.depleteHealth();
});
updateHealthBars();
});

// Event listener for feeding button click and increast health by an RNG amount
document.getElementById("feed").addEventListener("click", function(event){
  animalArray.forEach(function(animal){
    animal.eat();
    if(animal.health>100){
      animal.health = 100;
    }
});
updateHealthBars();
});

// Updates the health bars in the top left and hides the animals when the health drops below the assigned thresholds
function updateHealthBars(){
  animalArray.forEach(animal => {
    document.getElementById(animal.id).style.width = `${animal.health}%`;
// Colour the health bars appropriately
    switch(animal.type){
      case 'elephant':
      if(animal.health < 70){
        document.getElementById(animal.id).style.visibility= "hidden";
        document.getElementById(`${animal.id}Pic`).style.visibility= "hidden";
      } else {
        document.getElementById(animal.id).style.backgroundColor = `hsl( ${(animal.health-70)*4}, 100%, 45%`;
      }
      break;
      case "giraffe":
        if(animal.health < 50){
          document.getElementById(animal.id).style.visibility= "hidden";
          document.getElementById(`${animal.id}Pic`).style.visibility= "hidden";
        } else {
        document.getElementById(animal.id).style.backgroundColor = `hsl( ${(animal.health-50)*2.4}, 100%, 45%`;
        }
      break;
      case "monkey":
      if(animal.health < 30){
        document.getElementById(animal.id).style.visibility= "hidden";
        document.getElementById(`${animal.id}Pic`).style.visibility= "hidden";
      } else {
        document.getElementById(animal.id).style.backgroundColor = `hsl( ${(animal.health-30)*1.7}, 100%, 45%`;
      }
      break;
    }

    document.getElementById(`${animal.id}Label`).innerText = `${animal.health}%`;

});
}
