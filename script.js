window.addEventListener("load", function() {
   this.fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         const div = document.getElementById("missionTarget");
         const missionDestination = Math.round(Math.random()*6);
         div.innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[missionDestination].name}</li>
            <li>Diameter: ${json[missionDestination].diameter}</li>
            <li>Star: ${json[missionDestination].star}</li>
            <li>Distance from Earth: ${json[missionDestination].distance}</li>
            <li>Number of Moons: ${json[missionDestination].moons}</li>
         </ol>
         <img src="${json[missionDestination].image}">
         `;
      });
   });

   let form = document.querySelector("form");

   form.addEventListener("submit", function(event) {
      let pilotInput = document.querySelector("input[name=pilotName]");
      let copilotInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");
      
      if ((pilotInput.value === '')|| (copilotInput.value === '')||(fuelLevelInput.value === '') || (cargoMassInput.value === '')) {
         alert("Please enter all requested information.");
         event.preventDefault();

      } else if (isNaN(pilotInput.value) === false || isNaN(copilotInput.value) === false) {
         alert("Please enter a valid name for the pilot and/or co-pilot.");
         event.preventDefault();

      } else if (isNaN(fuelLevelInput.value) === true || isNaN(cargoMassInput.value) === true) {
         alert("Please enter a valid number for the fuel level and/or cargo mass.");
         event.preventDefault();

      } else {
         document.getElementById("pilotStatus").innerHTML = "Pilot " + pilotInput.value + " is ready!";
         document.getElementById("copilotStatus").innerHTML = "Co-pilot " + copilotInput.value + " is ready!";

         if (fuelLevelInput.value <= 10000) {
            document.getElementById("launchStatus").innerHTML = "The shuttle is NOT ready for launch!";
            document.getElementById("fuelStatus").innerHTML = "The shuttle's fuel level is too low!";
            document.getElementById("launchStatus").style.color = "red";
            document.getElementById("faultyItems").style.visibility = "visible";

         } else {
            document.getElementById("fuelStatus").innerHTML = "The shuttle's fuel level is above the minimum threshold for launch!";
         }

         if (cargoMassInput.value >= 10000) {
            document.getElementById("launchStatus").innerHTML = "The shuttle is NOT ready for launch!";
            document.getElementById("cargoStatus").innerHTML = "The loaded cargo mass is too high for launch!";
            document.getElementById("launchStatus").style.color = "red";
            document.getElementById("faultyItems").style.visibility = "visible";

         } else {
            document.getElementById("cargoStatus").innerHTML = "The loaded cargo is light enough for launch!";
         }

         if (fuelLevelInput.value >= 10000 && cargoMassInput.value <= 10000) {
            document.getElementById("launchStatus").innerHTML = "The shuttle is ready for launch!";
            document.getElementById("cargoStatus").innerHTML = "The loaded cargo is light enough for launch!";
            document.getElementById("launchStatus").style.color = "green";
            document.getElementById("faultyItems").style.visibility = "visible";
         }

         event.preventDefault();

      }
   });
});
