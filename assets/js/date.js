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
let date = lastdate();

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
      <div class="dropdown">
      <button class="btn   dropdown-toggle" type=" button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      ${data.channel.name}  <i class="bi bi-buildings"></i>
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
         
        <li><a class="dropdown-item" onclick="logout()">Sign Out</a></li>
      </ul>
    </div>
       `);
    });
}
async function date1() {
  await fetch(
    `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}&results=500`
  )
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      channel = data.channel;
      field1 = rawData(
        data.feeds.filter((elements) => elements.field1 != null),
        "field1"
      );
      field2 = rawData(
        data.feeds.filter((elements) => elements.field2 != null),
        "field2"
      );
      field3 = rawData(
        data.feeds.filter((elements) => elements.field3 != null),
        "field3"
      );
      field4 = rawData(
        data.feeds.filter((elements) => elements.field4 != null),
        "field4"
      );
      field5 = rawData(
        data.feeds.filter((elements) => elements.field5 != null),
        "field5"
      );
      field6 = rawData(
        data.feeds.filter((elements) => elements.field6 != null),
        "field6"
      );
      field7 = rawData(
        data.feeds.filter((elements) => elements.field7 != null),
        "field7"
      );
      field8 = rawData(
        data.feeds.filter((elements) => elements.field8 != null),
        "field8"
      );

      if (field1[field1.length - 1] != undefined) {
        //field1
        drawCard(field1, "sensor1", "myChart1", "border-info", "field1");
      } else {
        let sensor01 = (document.getElementById(
          "sensor1"
        ).className = `d-none`);
      }

      if (field2[field2.length - 1] != undefined) {
        //field2
        drawCard(field2, "sensor2", "myChart2", "border-danger ", "field2");
      } else {
        let sensor01 = (document.getElementById(
          "sensor2"
        ).className = `d-none`);
      }

      if (field3[field3.length - 1] != undefined) {
        //field3
        drawCard(field3, "sensor3", "myChart3", "border-success", "field3");
      } else {
        let sensor01 = (document.getElementById(
          "sensor3"
        ).className = `d-none`);
      }

      if (field4[field4.length - 1] != undefined) {
        //field4
        drawCard(field4, "sensor4", "myChart4", "border-warning", "field4");
      } else {
        let sensor01 = (document.getElementById(
          "sensor4"
        ).className = `d-none`);
      }
      if (field5[field5.length - 1] != undefined) {
        //field5
        drawCard(field5, "sensor5", "myChart5", "border-info", "field5");
      } else {
        let sensor01 = (document.getElementById(
          "sensor5"
        ).className = `d-none`);
      }
      if (field6[field6.length - 1] != undefined) {
        //field46
        drawCard(field6, "sensor6", "myChart6", "border-info", "field6");
      } else {
        let sensor01 = (document.getElementById(
          "sensor6"
        ).className = `d-none`);
      }
      if (field7[field7.length - 1] != undefined) {
        //field7
        drawCard(field7, "sensor7", "myChart7", "border-info", "field7");
      } else {
        let sensor01 = (document.getElementById(
          "sensor7"
        ).className = `d-none`);
      }
      if (field8[field8.length - 1] != undefined) {
        //field8
        drawCard(field8, "sensor8", "myChart4", "border-info", "field8");
      } else {
        let sensor01 = (document.getElementById(
          "sensor8"
        ).className = `d-none`);
      }
    });
}

function promedio(array) {
  let promedio = 0;
  array.forEach((element) => {
    promedio += element;
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

function rawData(datos, field) {
  raw = [];
  datos.forEach((element) => {
    raw.push(parseFloat(element[field]));
  });
  return raw;
}
function drawGraf(field1, chart) {
  let ctx = document.getElementById(chart).getContext("2d");
  let myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        date[9],
        date[8],
        date[7],
        date[6],
        date[5],
        date[4],
        date[3],
        date[2],
        date[1],
        date[0],
      ],
      datasets: [
        {
          label: "Ultimas Mediciones ",
          data: [
            field1[field1.length - 10],
            field1[field1.length - 9],
            field1[field1.length - 8],
            field1[field1.length - 7],
            field1[field1.length - 6],
            field1[field1.length - 5],
            field1[field1.length - 4],
            field1[field1.length - 3],
            field1[field1.length - 2],
            field1[field1.length - 1],
          ],
          backgroundColor: "rgba(13,202,240,0.1)",
          borderColor: "rgba(54, 162, 235, 1)", // Color del borde
          borderWidth: 1, // Ancho del borde
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              min: parseInt(min(field1)) - 2,
              max: parseInt(max(field1)) + 2,
            },
          },
        ],
      },
    },
  });
}
function lastdate() {
  let today = new Date();
  let hora = today.getHours();
  let minutos = today.getMinutes();
  const times = [];
  let date;
  if (minutos < 15) {
    date = new Date(2000, 0, 1, hora, 15, 0);
  } else if (minutos < 30) {
    date = new Date(2000, 0, 1, hora, 30, 0);
  } else if (minutos < 45) {
    date = new Date(2000, 0, 1, hora, 45, 0);
  } else if (minutos < 60) {
    date = new Date(2000, 0, 1, hora, 60, 0);
  }

  for (let i = 0; i < 10; i++) {
    date.setMinutes(date.getMinutes() - 15);
    times.push(
      date.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }

  console.log(times);

  return times;
}
function drawCard(date, id1, id2, color, field) {
  let sensor01 = (document.getElementById(id1).innerHTML = `
  <div
  class="card radius-10 border-start border-0 border-3 ${color} "
  >
    <div class="card-body">
      <div class="d-flex align-items-center">
            <div>
              <p class="mb-0 text-secondary">${channel[field]}</p>
              <h4 class="my-1 text-info">${parseFloat(
                date[date.length - 1]
              ).toFixed(2)}° C</h4>
              <p class="mb-0 font-13">Max: ${max(date).toFixed(2)}°C</p>
              <p class="mb-0 font-13">Min: ${parseFloat(min(date)).toFixed(
                2
              )}°C</p>
              <p class="mb-0 font-13">Dispersion: ${parseFloat(
                calcularDispersión(date)
              ).toFixed(2)}°C</p>
              <p class="mb-0 font-13">Promedio: ${parseFloat(
                promedio(date)
              ).toFixed(2)}°C</p>
              <p class="mb-0 font-13">Muestra : ${(date.length / 4).toFixed(
                0
              )} horas</p>
            </div>
      </div>
      <div>
      <canvas id="${id2}" width="400" height="300"></canvas>
    </div>
    </div>
  </div>

   `);
  drawGraf(date, id2);
}
 
function logout(date) {
 // let channelId = localStorage.removeItem("channelId")    ;
 //let apiKey = localStorage.removeItem("apiKey");
 window.location.href = "./index.html";

}  