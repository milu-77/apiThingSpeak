 
 
let  public =document.getElementById("public");
let dateSensor=[];
let promedio=0;
let maximo=0;
let minimo=0;
let deltaT=0;
let dispersion=0;
let incertidumbre=0;
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
   localStorage.setItem("channelId",channelId.value)
   localStorage.setItem("apiKey",apiKey.value)
   window.location.href="./date.html"
 
}

 
