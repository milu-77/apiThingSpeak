console.log(localStorage.getItem("channelId"));
console.log(localStorage.getItem("apiKey"));
let channelId=localStorage.getItem("channelId")
let apiKey=localStorage.getItem("apiKey")
let dateSensor=[];
let promedio=0;
let maximo=0;
let minimo=0;
let deltaT=0;
let dispersion=0;
let incertidumbre=0;
main();
function main(){
     
    fetch(`https://api.thingspeak.com/channels/${channelId}/status.json?api_key=${apiKey}`)
     .then(response => {
      if (!response.ok) throw Error(response.statusText);
         return response.json();
     })
     .then(data => {
      console.log(data.channel.name);
      let title = document.getElementById("title").innerHTML=`
      <a class="nav-link"  href="#"
      >${data.channel.name}  <i class="bi bi-buildings"></i
    ></a>
       `
     });
   }