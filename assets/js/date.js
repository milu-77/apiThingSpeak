let channelId = localStorage.getItem("channelId");
let apiKey = localStorage.getItem("apiKey");
let channel = [];
let field1 = [];
let field2 = [];
let field3 = [];
let field4 = [];
let field5 = [];
let field6 = [];
let field7 = [];
let field8 = [];
 

main();
date1();
function main() {
  fetch(
    `https://api.thingspeak.com/channels/${channelId}/status.json?api_key=${apiKey}`
  )
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      let title = (document.getElementById("title").innerHTML = `
      <a class="nav-link"  href="#"
      >${data.channel.name}  <i class="bi bi-buildings"></i
    ></a>
       `);
    });
}
async function date1() {
  await fetch(
    `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}&results=580`
  )
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then((data) => {
       
      channel = data.channel;
      field1 = rawData(data.feeds.filter((elements) => elements.field1 != null),"field1") ;     
      field2 = rawData(data.feeds.filter((elements) => elements.field2 != null),"field2") ;
      field3 = rawData(data.feeds.filter((elements) => elements.field3 != null),"field3") ;
      field4 = rawData(data.feeds.filter((elements) => elements.field4 != null),"field4") ;
      field5 = rawData(data.feeds.filter((elements) => elements.field5 != null),"field5") ;
      field6 = rawData(data.feeds.filter((elements) => elements.field6 != null),"field6") ;
      field7 = rawData(data.feeds.filter((elements) => elements.field7 != null),"field7") ;
      field8 = rawData(data.feeds.filter((elements) => elements.field8 != null),"field8") ;
      console.log(field1);
      console.log(field2);
      console.log(field3);
      console.log(field4);
      console.log(field5);
      console.log(field6);
      console.log(field7);
      console.log(field8);
      if (field1[field1.length - 1] != undefined) {
        let sensor01 = (document.getElementById("sensor1").innerHTML = `
        <div
        class="card radius-10 border-start border-0 border-3 border-info"
        >
       <div class="card-body">
                <div class="d-flex align-items-center">
                  <div>
                    <p class="mb-0 text-secondary">${channel.field1}</p>
                    <h4 class="my-1 text-info">${parseFloat(
                      field1[field1.length - 1]
                    ).toFixed(2)}° C</h4>
                    <p class="mb-0 font-13">Max: ${ max(field1).toFixed(2)}°C</p>
                    <p class="mb-0 font-13">Min: ${parseFloat(
                      min(field1)
                    ).toFixed(2)}°C</p>
                    <p class="mb-0 font-13">Dispersion: ${parseFloat(
                      calcularDispersión(field1)
                    ).toFixed(2)}°C</p>
                    <p class="mb-0 font-13">Promedio: ${parseFloat(
                      promedio(field1)
                    ).toFixed(2)}°C</p>
                    <p class="mb-0 font-13">Muestra : ${(field1.length /4)
                    .toFixed(0)} horas</p>
                  </div>
                  <div
                    class="widgets-icons-2 rounded-circle bg-gradient-scooter text-white ms-auto"
                  >
                    <i class="bi bi-thermometer-half"></i>
                  </div>
                </div>
              </div>

              </div>

         `);
      } else {
        let sensor01 = (document.getElementById("sensor1").className = `d-none`);
        }

      // if (field2[field2.length - 1] != undefined) {
      //   let sensor01 = (document.getElementById("sensor2").innerHTML = `
      //   <div
      //   class="card radius-10 border-start border-0 border-3 border-danger"
      //   >
      //  <div class="card-body">
      //           <div class="d-flex align-items-center">
      //             <div>
      //               <p class="mb-0 text-secondary">${channel.field2}</p>
      //               <h4 class="my-1 text-info">${parseFloat(
      //                 field2[field2.length - 1].field2
      //               ).toFixed(2)}° C</h4>
      //               <p class="mb-0 font-13">Max: ${parseFloat(
      //                 max(field2, 2)
      //               ).toFixed(2)}°C</p>
      //               <p class="mb-0 font-13">Min: ${parseFloat(
      //                 min(field2, 2)
      //               ).toFixed(2)}°C</p>
      //               <p class="mb-0 font-13">Promedio: ${parseFloat(
      //                 promedio(field2, 2)
      //               ).toFixed(2)}°C</p>
      //             </div>
      //             <div
      //               class="widgets-icons-2 rounded-circle bg-gradient-scooter text-white ms-auto"
      //             >
      //               <i class="bi bi-thermometer-half"></i>
      //             </div>
      //           </div>
      //         </div>
      //         </div>


      //    `);
      // } else {
      //   let sensor01 = (document.getElementById("sensor2").className = `d-none`);
      // }
      // if (field3[field3.length - 1] != undefined) {
      //   let sensor01 = (document.getElementById("sensor3").innerHTML = `
      //   <div
      //   class="card radius-10 border-start border-0 border-3 border-warning"
      //   >
      //  <div class="card-body">
      //           <div class="d-flex align-items-center">
      //             <div>
      //               <p class="mb-0 text-secondary">${channel.field3}</p>
      //               <h4 class="my-1 text-info">${parseFloat(
      //                 field3[field3.length - 1].field3
      //               ).toFixed(2)}° C</h4>
      //               <p class="mb-0 font-13">Max: ${parseFloat(
      //                 max(field3, 3)
      //               ).toFixed(2)}°C</p>
      //               <p class="mb-0 font-13">Min: ${parseFloat(
      //                 min(field3, 3)
      //               ).toFixed(2)}°C</p>
      //               <p class="mb-0 font-13">Promedio: ${parseFloat(
      //                 promedio(field3, 3)
      //               ).toFixed(2)}°C</p>
      //             </div>
      //             <div
      //               class="widgets-icons-2 rounded-circle bg-gradient-scooter text-white ms-auto"
      //             >
      //               <i class="bi bi-thermometer-half"></i>
      //             </div>
      //           </div>
      //         </div>
      //         </div>


      //    `);
      // } else {
      //   let sensor01 = (document.getElementById("sensor3").className = `d-none`);
      // }
      // if (field4[field4.length - 1] != undefined) {
      //   let sensor01 = (document.getElementById("sensor4").innerHTML = `
      //   <div
      //   class="card radius-10 border-start border-0 border-3 border-success"
      //   >
      //  <div class="card-body">
      //           <div class="d-flex align-items-center">
      //             <div>
      //               <p class="mb-0 text-secondary">${channel.field4}</p>
      //               <h4 class="my-1 text-info">${parseFloat(
      //                 field4[field4.length - 1].field4
      //               ).toFixed(2)}° C</h4>
      //               <p class="mb-0 font-13">Max: ${parseFloat(
      //                 max(field4, 4)
      //               ).toFixed(2)}°C</p>
      //               <p class="mb-0 font-13">Min: ${parseFloat(
      //                 min(field4, 4)
      //               ).toFixed(2)}°C</p>
      //               <p class="mb-0 font-13">Promedio: ${parseFloat(
      //                 promedio(field4, 4)
      //               ).toFixed(2)}°C</p>
      //             </div>
      //             <div
      //               class="widgets-icons-2 rounded-circle bg-gradient-scooter text-white ms-auto"
      //             >
      //               <i class="bi bi-thermometer-half"></i>
      //             </div>
      //           </div>
      //         </div>
      //         </div>


      //    `);
      // } else {
      //   let sensor01 = (document.getElementById("sensor4").className = `d-none`);
      // }
      // if (field5[field5.length - 1] != undefined) {
      //   let sensor01 = (document.getElementById("sensor5").innerHTML = `
      //   <div
      //   class="card radius-10 border-start border-0 border-3 border-info"
      //   >
      //  <div class="card-body">
      //           <div class="d-flex align-items-center">
      //             <div>
      //               <p class="mb-0 text-secondary">${channel.field5}</p>
      //               <h4 class="my-1 text-info">${parseFloat(
      //                 field5[field5.length - 1].field5
      //               ).toFixed(2)}° C</h4>
      //               <p class="mb-0 font-13">Max: ${parseFloat(
      //                 max(field5, 5)
      //               ).toFixed(2)}°C</p>
      //               <p class="mb-0 font-13">Min: ${parseFloat(
      //                 min(field5, 5)
      //               ).toFixed(2)}°C</p>
      //               <p class="mb-0 font-13">Promedio: ${parseFloat(
      //                 promedio(field5, 5)
      //               ).toFixed(2)}°C</p>
      //             </div>
      //             <div
      //               class="widgets-icons-2 rounded-circle bg-gradient-scooter text-white ms-auto"
      //             >
      //               <i class="bi bi-thermometer-half"></i>
      //             </div>
      //           </div>
      //         </div>
      //         </div>


      //    `);
      // } else {
      //   let sensor01 = (document.getElementById("sensor5").className = `d-none`);
      // }
      // if (field6[field6.length - 1] != undefined) {
      //   let sensor01 = (document.getElementById("sensor6").innerHTML = `
      //   <div
      //   class="card radius-10 border-start border-0 border-3 border-danger"
      //   >
      //  <div class="card-body">
      //           <div class="d-flex align-items-center">
      //             <div>
      //               <p class="mb-0 text-secondary">${channel.field6}</p>
      //               <h4 class="my-1 text-info">${parseFloat(
      //                 field6[field6.length - 1].field6
      //               ).toFixed(2)}° C</h4>
      //               <p class="mb-0 font-13">Max: ${parseFloat(
      //                 max(field6, 6)
      //               ).toFixed(2)}°C</p>
      //               <p class="mb-0 font-13">Min: ${parseFloat(
      //                 min(field6, 6)
      //               ).toFixed(2)}°C</p>
      //               <p class="mb-0 font-13">Promedio: ${parseFloat(
      //                 promedio(field6, 6)
      //               ).toFixed(2)}°C</p>
      //             </div>
      //             <div
      //               class="widgets-icons-2 rounded-circle bg-gradient-scooter text-white ms-auto"
      //             >
      //               <i class="bi bi-thermometer-half"></i>
      //             </div>
      //           </div>
      //         </div>
      //         </div>


      //    `);
      // } else {
      //   let sensor01 = (document.getElementById("sensor6").className = `d-none`);
      // }
      // if (field7[field7.length - 1] != undefined && channel.field7!="control" ) {
      //   let sensor01 = (document.getElementById("sensor7").innerHTML = `
      //   <div
      //   class="card radius-10 border-start border-0 border-3 border-warning"
      //   >
      //  <div class="card-body">
      //           <div class="d-flex align-items-center">
      //             <div>
      //               <p class="mb-0 text-secondary">${channel.field7}</p>
      //               <h4 class="my-1 text-info">${parseFloat(
      //                 field7[field7.length - 1].field1
      //               ).toFixed(2)}° C</h4>
      //               <p class="mb-0 font-13">Max: ${parseFloat(
      //                 max(field7, 7)
      //               ).toFixed(2)}°C</p>
      //               <p class="mb-0 font-13">Min: ${parseFloat(
      //                 min(field7, 7)
      //               ).toFixed(2)}°C</p>
      //               <p class="mb-0 font-13">Promedio: ${parseFloat(
      //                 promedio(field7, 7)
      //               ).toFixed(2)}°C</p>
      //             </div>
      //             <div
      //               class="widgets-icons-2 rounded-circle bg-gradient-scooter text-white ms-auto"
      //             >
      //               <i class="bi bi-thermometer-half"></i>
      //             </div>
      //           </div>
      //         </div>
      //         </div>


      //    `);
      // } else {
      //   let sensor01 = (document.getElementById("sensor7").className = `d-none`);
      // }
      // if (field8[field8.length - 1] != undefined && channel.field8!="control" ) {
      //   let sensor01 = (document.getElementById("sensor8").innerHTML = `
      //   <div
      //   class="card radius-10 border-start border-0 border-3 border-warning"
      //   >
      //  <div class="card-body">
      //           <div class="d-flex align-items-center">
      //             <div>
      //               <p class="mb-0 text-secondary">${channel.field8}</p>
      //               <h4 class="my-1 text-info">${parseFloat(
      //                 field8[field8.length - 1].field1
      //               ).toFixed(2)}° C</h4>
      //               <p class="mb-0 font-13">Max: ${parseFloat(
      //                 max(field8, 8)
      //               ).toFixed(2)}°C</p>
      //               <p class="mb-0 font-13">Min: ${parseFloat(
      //                 min(field8, 8)
      //               ).toFixed(2)}°C</p>
      //               <p class="mb-0 font-13">Promedio: ${parseFloat(
      //                 promedio(field8, 8)
      //               ).toFixed(2)}°C</p>
      //             </div>
      //             <div
      //               class="widgets-icons-2 rounded-circle bg-gradient-scooter text-white ms-auto"
      //             >
      //               <i class="bi bi-thermometer-half"></i>
      //             </div>
      //           </div>
      //         </div>

      //         </div>

      //    `);
      // } else {
      //   let sensor01 = (document.getElementById("sensor8").className = `d-none`);
      // }

      
    });
}

function promedio(array) {
  let promedio = 0;
  array.forEach(element => {
    promedio += element
  });

  return promedio / array.length;
}
function max(array) {
      return Math.max(...array); 
}
function min(array) { 

  return Math.min(...array); 
}
 
  function calcularDispersión(datos) {
    // Calcular la media de los datos
    let sum = 0;
    for (let i = 0; i < datos.length; i++) {
      sum += datos[i];
    }
    const media = sum / datos.length;
  
    // Calcular la suma de los cuadrados de las diferencias con la media
    let sumCuadrados = 0;
    for (let i = 0; i < datos.length; i++) {
      sumCuadrados += (datos[i] - media) ** 2;
    }
  
    // Calcular la dispersión
    const dispersion = Math.sqrt(sumCuadrados / datos.length);
  
    return dispersion;
  }



 
function rawData(datos,field) {
raw=[];
datos.forEach(element => {
    raw.push( parseFloat( element[field]));   
  
});
return raw;
 }

 var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        datasets: [
          {
            label: "work load",
            data: [2, 9, 3, 17, 6, 3, 7],
            
          },
          
        ],
      },
    });
