
function buildCardForMulti (groupNum,issues,groupedTickets) {

	var cardTitle = "";
	if(issues[0].type ==1){
		cardTitle ="Graffiti";
	} else if(issues[0].type ==2){
		cardTitle ="Pot Hole";
	} else if(issues[0].type ==3){
		cardTitle ="Litter";
	} else if(issues[0].type ==4){
		cardTitle ="Fallen Tree";
	} 


	var card = $("<div class=\"row issueCard\">\
\
		<div class=\"col m8 offset-m2\">\
		  <div class=\"card\">\
			  <div class=\"row\" style=\"margin-bottom:0px;\">\
			  	<div class=\"card-content\">\
						<div class=\"col m2\">\
							<img src=\"img/icon_"+issues[0].type+".png\" class=\"z-depth-1 	circle responsive-img\" style=\"width: 100%; Max-height:70px;Max-width:70px;/* position: absolute; *//* left: 32px; *//* top: 20px; */z-index: 20;/* display: none; */\">\
							<img src=\"img/noun_50359.png\" class=\"z-depth-1 	circle responsive-img dragOverImage\" style=\"width: 100%; Max-height:70px;Max-width:70px;position: absolute;left: 32px;top: 20px;z-index: 100;opacity: 5.1;opacity: 0.0;\">\
						</div>\
\
						<span class=\"col m6\">\
							<span class=\"card-title black-text\">"+cardTitle+"</span><BR>\
							\
						</span>\
						<span class=\"col m2 \"> \
							<span class=\"badge new numberInGroup\" style=\"margin-top: 14px;\">"+issues.length+"</span>\
						</span>\
						<div class=\"col m2 offset-m0 \">\
							<a class=\"btn-floating\" style=\"float: right;\">\
								<i class=\"medium showHideButton mdi-navigation-expand-more\"></i> \
							</a>\
						</div>\
\
				  </div>\
				</div>\
			\
			  <div class=\"hideShowDiv \">\
			  	<div class=\"card-content\">\
			  			<div class=\'descriptions\'>\
							\
						</div>\
					</div>\
\
\
				<img class=\"responsive-img mapImage\" src=\"\">\
				<div class='googleMap' style=\"height:200px;width:100%\"></div>\
			  	<div class=\"card-content removeArea\">\
				</div>\
			  </div>\
			</div>\
			<div class='dragOver'>\
			</div>\
		  </div>\
		</div>\
	</div>");
	
	
	var descriptions = card.find(".descriptions");
	var remove = card.find(".removeArea");
	var mapImage = card.find(".mapImage");
	var dragOver = card.find(".dragOver");
	var dragOverImage = card.find(".dragOverImage");
	var hideShowDiv = card.find(".hideShowDiv");
	var hideButton = card.find(".showHideButton");
	var numberInGroup = card.find(".numberInGroup");
	var googleMap = card.find(".googleMap");



	//HIDEFOR SINGLES
	if(groupedTickets){
		dragOverImage.droppable({
		  over: function(event, ui){
		  	dragOverImage.css("opacity",0.9);
		  },
		  out: function(event, ui){
		  	dragOverImage.css("opacity",0.3);
		  },
	      drop: function( event, ui ) {

	        var group = $(ui.draggable).prop("group");
	        var ticket = $(ui.draggable).prop("ticket");
	        var dataPoint = currData.values[group][ticket];
	        currData.values[group].splice(ticket, 1);
	        if(currData.values[group].length==0){
	        	currData.values.splice(group, 1);
	        }
	        currData.values[groupNum].push(dataPoint);
	        console.log(group+":"+ticket)
	        draw();
	      }
	    });

		dragOver.droppable({
		  over: function(event, ui){
		  	dragOver.css("background","lightGreen");
		  },
		  out: function(event, ui){
		  	dragOver.css("background","lightGreen");
		  },
	      drop: function( event, ui ) {
	        console.log("WOWOWOWO");
	        console.log(event.target);
	        console.log(ui.draggable)

	        var group = $(ui.draggable).prop("group");
	        var ticket = $(ui.draggable).prop("ticket");
	        var dataPoint = currData.values[group][ticket];
	        currData.values[group].splice(ticket, 1);
	        if(currData.values[group].length==0){
	        	currData.values.splice(group, 1);
	        }
	        currData.values.insert(groupNum+1, [dataPoint]);
	        console.log(group+":"+ticket)
	        draw();
	      }
	    });
	}else{
		numberInGroup.css("opacity",0.0);
	}

	

	
	var average = getAverageLoc(issues);
	var mapOptions = {
          center: { lat: average.lat, lng: average.lng},
          zoom: 14
        };
    var cardMap = new google.maps.Map(googleMap[0], mapOptions);

	for (var i = 0; i < issues.length; i++) {
		var color = "green";
		var markerL = "A";
		if(i==0){
			color = "green";
		var markerL = "A";
		}else if(i==1){
			color = "yellow";
		var markerL = "B";
		}else if(i==2){
			color = "orange";
		var markerL = "C";
		}else if(i==3){
			color = "blue";
		var markerL = "D";
		}else if(i==4){
			color = "red";
		var markerL = "E";
		}else if(i==5){
			color = "purple";
		var markerL = "F";
		}

		descriptions.append("<p class=\"textQuote issue"+(i+1)+"\">"+issues[i].text+"</p>");


		if(groupedTickets){
            
			var removeElement = $("<a class=\"btn-floating removeTicket "+color+" lighten-1\" >\
							<i class=\"mdi-hardware-keyboard-return\"></i> \
						</a>");
			removeElement.prop("group",groupNum);
			removeElement.prop("ticket",i);

			remove.append(removeElement);
			removeElement.draggable({ 
				scroll: true,
				start: function( event, ui ) 
				{
		  			$(".dragOverImage").css("opacity",0.3);
					var start = card.offset().top;
					console.log(card.offset());
					
					$(".dragOver").addClass("visable");

					var end = card.offset().top;
					var moveTo = $(document).scrollTop() ;
					currOffSetTop = end - start
					$(document).scrollTop(moveTo + currOffSetTop);
					var top = $(event.target).css("top");
					ui.offset.top = ui.offset.top + currOffSetTop;

				},
				drag: function( event, ui ) 
				{
					ui.position.top = ui.position.top -currOffSetTop;
				},
				stop: function( event, ui ) 
				{
					//$(event.target).draggable( "destroy" )
					$(event.target).css("position","")
					$(event.target).css("top","")
					$(event.target).css("left","")
					$(".dragOver").removeClass("visable");
					$(".dragOverImage").css("opacity",0.0);
				} 
			});
		}
		
		//imgStr += "&markers=color:"+color+"%7C"+issues[i].loc.lat+","+issues[i].loc.lng;
		var gLatlng = new google.maps.LatLng(issues[i].loc.lat,issues[i].loc.lng);

		var marker = new google.maps.Marker({
            position: gLatlng,
            map: cardMap,
            icon: 'Google Maps Markers/'+color+'_marker'+markerL+'.png'
        });



		
	};
	//mapImage.prop("src",imgStr)




	card.find(".showHideButton").click(function(event){
		var button = $(event.target);
		var card = button.closest('.issueCard');
		var hideShowDiv = card.find(".hideShowDiv");

		var otherButtons = $(".showHideButton").not(button);
		var otherCards = $(".issueCard").not(card);
		var otherHideShowDivs = $(".hideShowDiv").not(hideShowDiv);

		

		if(card.hasClass("expanded")){
			$(".issueCard").removeClass("expanded");
			$(".hideShowDiv").slideUp();
			$(".showHideButton").removeClass("mdi-navigation-expand-less");
			$(".showHideButton").addClass("mdi-navigation-expand-more");
			delete currOpen;
		}else{
			otherCards.removeClass("expanded");
			otherHideShowDivs.slideUp();
			otherButtons.removeClass("mdi-navigation-expand-less");
			otherButtons.addClass("mdi-navigation-expand-more");



			card.addClass("expanded");
			hideShowDiv.slideDown();
			button.removeClass("mdi-navigation-expand-more");
			button.addClass("mdi-navigation-expand-less");	
			currOpen = groupNum;
		}
		google.maps.event.trigger(cardMap, 'resize');
		cardMap.setCenter(gLatlng);

	});



	if(typeof currOpen !== 'undefined' && currOpen == groupNum){
		card.addClass("expanded");
		hideShowDiv.show();
		hideButton.removeClass("mdi-navigation-expand-more");
		hideButton.addClass("mdi-navigation-expand-less");	
		window.setTimeout(function(){
			google.maps.event.trigger(cardMap, 'resize');
		},100);
		google.maps.event.trigger(cardMap, 'resize');


	}

	return card
}


function getAverageLoc (list) {
	var lat=0;
	var lng=0;
	var delta = 0;
	for (var i = 0; i < list.length; i++) {
		lat += list[i].loc.lat;
		lng += list[i].loc.lng;

		for (var j = 0; j < list.length; j++) {
			var dX = Math.abs(list[i].loc.lat - list[j].loc.lat);
			var dY = Math.abs(list[i].loc.lng - list[j].loc.lng);
			var curr = Math.sqrt(dX*dX + dY*dY);
			if(delta <curr){
				delta = curr;
			}
		};
	};
	delta = delta/list.length;
	lat = lat/list.length;
	lng = lng/list.length;
	var zoom = (14 - (delta/0.001));
	zoom = Math.round(zoom);
	console.log(delta + ":" + zoom);

	return {"lat":lat, "lng":lng, "zoom":zoom}
}

function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
} 
Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}




