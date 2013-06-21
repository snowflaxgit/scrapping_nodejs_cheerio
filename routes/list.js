var request = require('request')
, url = require('url');
var cheerio = require("cheerio");


// import database
var mongo = require('mongodb');

exports.list = function(req, res){
	var keyword = req.params.id;
	//console.log(id);	
	/*db.collection(keyword, function(err, collection) {
        collection.find().distinct('tabs_title').toArray(function(err, items) {
			//console.log(items);
			res.render('list', {title: 'NewsHunt - '+keyword, items : items} );
            //res.send(items);
        });
    });	*/
	
	<!-- sandesh -->
				if(keyword == 'sandesh' ){
					
					var URI = "http://www.sandesh.com/", // define URI first
						keyword = keyword; 
					
					request({
					  uri: URI,
					}, function(error, response, body) {
		       			
		       			var self = this;
						self.tabs = new Array();//I feel like I want to save my results in an array
						
		     			//Just a basic error check
		                if(error && response.statusCode !== 200){
							console.log('Request error.');
						}

					    var $ = cheerio.load(body),
					  	  	$topNav = $('.topNav'),
						  	$li = $('ul.topnav > li');
									
						$li.each(function (i, item) {
							var $tab = $(item).children('a').text(),
								$href = URI + $(item).children('a').attr("href");
									
							if($tab == "National" || $tab == "Business" || $tab == "Life" || $tab == "World"  || $tab == "Sports"){	
								//and add all that data to my items array
								self.tabs.push({
									keyword : 'sandesh',
									uri : URI,
									tabs_title : $tab,
									tabs_href: $href						
								});
							}
							//setTimeout(getTabsData(self.tabs),3000);
							//console.log("sandesh");
						});
						res.render('list', {title: 'NewsHunt - '+keyword, items : self.tabs} );
					});
				} 
				<!-- sandesh - end -->

				<!-- gujaratsamachar -->
				if(keyword == 'gujaratsamachar' ){
					
					var URI = "http://www.gujaratsamachar.com/", // define URI first
						keyword = keyword; 

					request({
					  uri: URI,
					}, function(error, response, body) {
		       			
		       			var self = this;
						self.tabs = new Array();//I feel like I want to save my results in an array

		     			//Just a basic error check
		                if(error && response.statusCode !== 200){
							console.log('Request error.');
						}

					    var $ = cheerio.load(body),
					  	  	$ul=$('ul.menu'),
							$li=$('ul.menu > li');
								 
						$li.each(function (i, item) {
							var $tab = $(item).children('a').text(),
								$href = $(item).children('a').attr("href");
								
							if($tab == "National" || $tab == "Business" || $tab == "International" || $tab == "Entertainment"  || $tab == "Sports"){	
								//and add all that data to my items array
								self.tabs.push({
									keyword : 'gujaratsamachar',
									uri : URI,
									tabs_title : $tab,	
									tabs_href: $href					
								});
							}
							//setTimeout(getTabsData(self.tabs),3000);
							//console.log("gujaratsamachar");
						 });		
						res.render('list', {title: 'NewsHunt - '+keyword, items : self.tabs} );
						//console.log(self.tabs);
						//getTabsData(self.tabs)
					});
				} 
				<!-- gujaratsamachar - end -->
	
};