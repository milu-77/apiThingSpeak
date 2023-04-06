 
 
let  public =document.getElementById("public");

let tooltipchecked=true;
let channelID=document.getElementById("channelId")
let apiKey=document.getElementById("ApiKey") ;
 
if(localStorage.getItem("channelId")==null)
channelId.value="";
else{
   channelID.value=localStorage.getItem("channelId");
}
if(localStorage.getItem("apiKey")==null)
apiKey.value="";
else{
   apiKey.value=localStorage.getItem("apiKey");
}


 
public.addEventListener("click",function(){ 
   if(public.checked ==true){
      apiKey.className=" mb-3 pb-2 d-none";
   }else{
      apiKey.className="mb-3 pb-2";
   }
 

});
channelID.addEventListener("input",function(e){
   console.log(tooltipchecked);
    if(isNaN(channelId.value)){
     channelId.className="form-controlerror";
      if(tooltipchecked){
         $('[data-toggle="tooltip"]').tooltip('show');
      }
      tooltipchecked=false;
   }else{
      if(!tooltipchecked){
         $('[data-toggle="tooltip"]').tooltip('show');
      }
      tooltipchecked=true;
      channelId.className="form-control";
     
    }
})

 

function login(){
  
 fetch(`https://api.thingspeak.com/channels/${channelId.value}/status/last.json?api_key=${apiKey.value}`)
  .then(response => {
   if (!response.ok) throw Error(response.statusText);
      return response.json();
  })
  .then(data => {
    if(data==-1){
      console.log(data)
      swal("Oops!", "ID or KEY  wrong!", "error");
   }else{
      localStorage.setItem("channelId",channelId.value)
      localStorage.setItem("apiKey",apiKey.value)
     window.location.href="./date.html"

   }
  
  });
}