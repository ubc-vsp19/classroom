function addClickListeners (buttons){
   for (var i = 0; i < buttons.length; i++){
      buttons[i].addEventListener("click", function(){
         alert("Clicked Button " + i);
      });
   }
   return buttons;
};

var btns = document.getElementsByTagName("button");
addClickListeners(btns);
