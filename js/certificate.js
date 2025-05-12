/**
 * Project: Implicit Biases Awareness Training
 * Description: JavaScript functionality for generating and displaying the certificate of completion, including user name and completion status.
 * Author: Dominique Thomas (github.com/dominique-thomas)
 * License: Shared publicly for demonstration purposes only. Reuse or redistribution not permitted without permission.
 */
//----------------------------------------
//          Variable declarations
//----------------------------------------
let date = new Date().toLocaleDateString("en-us", {year: "numeric", month: "short", day: "numeric"});
let data = {
    username: "",
  }

//----------------------------------------
//             Document init
//----------------------------------------
$(document).ready(function(){
   
    parseQuery();
    $("#currentDate").html(date);
    showUserName();       
});

//----------------------------------------
//          Function declaration
//----------------------------------------
function parseQuery(){
    var pairs = window.location.href.slice(window.location.href.indexOf("?") + 1).split(";");    
    for(var i=0; i< pairs.length; i++){
      var pair = pairs[i].split("=");      
      data[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]) || "";
    }         
  }

  function showUserName(){

    const username = data.username;

    //If running locally    
    if(username.length === 0){
        let input = $("<input>", {
            minlength: 2,
            maxlength: 20,
            style: "text-align: center"
        });

        $("#username").append(input);
        input.focus();

    }
    //If running in a LMS
    else{
        $("#username").html(username);
    }
  }
