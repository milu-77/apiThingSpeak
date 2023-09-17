let channelId = localStorage.getItem("channelId");
let apiKey = localStorage.getItem("apiKey");
let sensor = []

main();




function main() {
    fetch(
      ` https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}&results=1`
       
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
         console.log(data.channel["field1"]);
         let sensorsView=``;
          for (let index = 1; index < 9; index++) {
            if(data.channel["field"+index]!=undefined   ){
              sensor.push(data.channel["field"+index]);
              sensorsView +=` <li><a class="dropdown-item" onclick="logout()">${data.channel["field"+index]}</a></li>`;
            } 
            
          }

          let sensors = (document.getElementById("sensors").innerHTML = `
          <div class="dropdown">
          <button class="btn   dropdown-toggle" type=" button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          Sensors  <i class="bi-thermometer-half"></i>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
             
            ${sensorsView}
          </ul>
        </div>
           `);
          
          
         
        
        
        });
  }
  function logout(date) {
    // let channelId = localStorage.removeItem("channelId")    ;
    //let apiKey = localStorage.removeItem("apiKey");
    window.location.href = "./index.html";
   
   }  