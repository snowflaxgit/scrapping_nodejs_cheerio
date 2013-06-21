var request = require('request')
, url = require('url');

var cheerio = require("cheerio");
// import database
var mongo = require('mongodb');

exports.tabs = function(req, res){
	//var uri = req.params.url;
	
	var queryObject = url.parse(req.url,true).query;
  	var keyword = queryObject.keyword;
  	var tabs_href = queryObject.href;
	
	//console.log(queryObject);
	/*db.collection(keyword, function(err, collection) {
        collection.find({'tabs_href':uri}).toArray(function(err, items) {
			//console.log(items);
			 res.render('headlines', {title: 'NewsHunt - Headlines', items : items} );
            //res.send(items);
        });
    });	*/	
	
	if(keyword == 'sandesh'){
								
				request({
				  uri: tabs_href,
				}, function(error, response, body) {
					
					//console.log(keyword,tabs_href);	
					
					var self = this;
					self.tabData = new Array();//I feel like I want to save my results in an array
					
				  	//Just a basic error check
	                if(error && response.statusCode !== 200){
						console.log('Request error.');
					}

					var $ = cheerio.load(body),			  
				  		tab_url = "http://www.sandesh.com/",

						//Use jQuery just as in a regular HTML page
						$hpTop = $('.pg_news'),
						$li = $hpTop.find('ul > li');
							
					$li.each(function (i, item) {
						//I will use regular jQuery selectors
						var $img = tab_url+$(item).children('img').attr("src"),
							$title = $(item).children('h1').children('a').text().trim(),
							$href = tab_url+$(item).children('h1').children('a').attr("href");
							//$content = $(item).children('h2').text().trim();						
											
						//and add all that data to my items array
						self.tabData[i] = {
							keyword : keyword,
							headlines_title : $title,
							headlines_href : $href,
							headlines_img : $img								
						};
						//console.log(self.tabData[i]);
					});
					 res.render('headlines', {title: 'NewsHunt - Headlines', items : self.tabData} );
				});
			}

			if(keyword == 'gujaratsamachar'){
				//console.log(keyword,tabs_title,tabs_href);	
				request({
				  uri: tabs_href,
				}, function(error, response, body) {
					
					var self = this;
					self.tabData = new Array();//I feel like I want to save my results in an array
					
				  	//Just a basic error check
	                if(error && response.statusCode !== 200){
						console.log('Request error.');
					}

					var $ = cheerio.load(body),			  
				  		$hpTop = $('.main-box56'),
						$div = $hpTop.find('div.mr-main-box');
							
					$div.each(function (i, item) {
						 
						//I will use regular jQuery selectors
						var $img = $(item).children('div.imgbox').children('a').children('img').attr("src").trim(),
							$title = $(item).children('div.viru404-hit420').children('a.mr-href-title').text().trim(),
							$href = $(item).children('div.viru404-hit420').children('a.mr-href-title').attr('href');
							//$content = $(item).children('div.viru404-hit420').children('div.fittext3').text().trim();						
											
						//and add all that data to my items array
						self.tabData[i] = {
							keyword : keyword,
							headlines_title : $title,
							headlines_href : $href,
							headlines_img : $img								
						};
					});
					res.render('headlines', {title: 'NewsHunt - Headlines', items : self.tabData} );
					
				});
			}
	
};