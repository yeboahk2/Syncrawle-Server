function createSearchBox(context) {
	var input = document.createElement("input");
    input.type = "text";
    input.id = "input-box"
    context.appendChild(input);


    var h4 = document.createElement("h4")
    h4.id = "search-display"
    context.appendChild(h4)
	
	var currentDiv = document.getElementById("div1");
	
	var parentDiv = currentDiv.parentNode;
	
	parentDiv.insertBefore(input, currentDiv);
    //var result = document.createTextNode("Search Result: ");
	//h3.appendChild(result)
	parentDiv.insertBefore(h4, currentDiv);
	//document.body.insertBefore(currentDiv, input);
	//currentDiv.insertBefore(h3, input)
}
window.onload = function(context) {
	//create the input box
    console.log("WELCOME TO SYNCRAWLER");
    createSearchBox(document.body);

    //create search content display
    //createSearchDisplay(document.body);

    //install jquery on site
    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);

    //secure clientid of website
    var clientid = document.getElementById('syncrawler').getAttribute('clientid')
    
/*
    //send a post request to server of client id or user url to crawl
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("the server recieved the initial request successfully")
        }
    }
    xhttp.open("POST", `http://localhost:3030/crawl/clientid/${clientid}`, true)
    //xhttp.setRequestHeader("Content-Type", "application/json")
    xhttp.send()
*/
    //event listener for when user presses enter
    //when user presses enter, send a request to server with clientid and keyword
    $(document).on("keypress", "input", function(e){
        if (e.keyCode == 13) {
            console.log("user typed:")
            console.log(document.getElementById('input-box').value);
            
            //XMLHttpRequest object to send request to server
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log("the response from the server is:")
                    console.log(this.responseText)
                    document.getElementById("search-display").innerHTML += this.responseText
                }
            }
			//location.reload(true);            
			xhttp.open("POST", `https://syncrawler-sever.herokuapp.com/search/clientid/${clientid}`, true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(JSON.stringify({"keyword": document.getElementById('input-box').value}))
        }
    });
};


