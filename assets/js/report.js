let channelId = localStorage.getItem("channelId");
let apiKey = localStorage.getItem("apiKey");

main();




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