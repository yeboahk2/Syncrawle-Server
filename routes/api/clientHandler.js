function createSearchBox(context) {
	var currentDiv = document.getElementById("div1");

	var input = document.createElement("input");
    input.type = "text";
    input.id = "input-box"
	input.style.backgroundColor = "white"
    context.appendChild(input);

//creating the button
	var button = document.createElement("BUTTON");
    button.id = "search-button"
	var text = document.createTextNode("Search");
	
	button.appendChild(text);
	context.appendChild(button);
	




    var h4 = document.createElement("h4")
    h4.id = "search-display"
    context.appendChild(h4)
	
	
	var parentDiv = currentDiv.parentNode;
	
	parentDiv.insertBefore(input, currentDiv);
	parentDiv.insertBefore(button,currentDiv);

    //var result = document.createTextNode("Search Result: ");
	//h3.appendChild(result)
	parentDiv.insertBefore(h4, currentDiv);
	//document.body.insertBefore(currentDiv, input);
	//currentDiv.insertBefore(h3, input)
	

	
}


window.onload = function(context) {
	//create the input box

    createSearchBox(document.body);

    //create search content display
    //createSearchDisplay(document.body);
}

//install jquery on site
console.log("WELCOME TO SYNCRAWLER");
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

document.getElementById("search-button").addEventListener("click", search, false)

function search(){
        // if (e.keyCode == 13) {
            console.log("user typed:")
            console.log(document.getElementById('input-box').value);
            var clientid = document.getElementById('syncrawler').getAttribute('clientid')
            //XMLHttpRequest object to send request to server
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("search-display").innerHTML = ""
                    console.log("the response from the server is:")
                    console.log(this.responseText)
                    document.getElementById("search-display").innerHTML += this.responseText
                }
            }
            //location.reload(true);            
            xhttp.open("POST", `https://syncrawler-server.herokuapp.com/search/clientid/${clientid}`, true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(JSON.stringify({"keyword": document.getElementById('input-box').value}))
        //}
}


