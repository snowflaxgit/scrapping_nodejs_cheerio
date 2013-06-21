var request = require('request')
, url = require('url') 
, cheerio = require("cheerio");

// import database
var mongo = require('mongodb');

exports.headlines = function(req, res){
	
	var queryObject = url.parse(req.url,true).query;
  	var keyword = queryObject.keyword;
  	var headlines_href = queryObject.href;
		
	/*db.collection(keyword, function(err, collection) {
        collection.find({"headlines_href":uri}).toArray(function(err, items) {
			//console.log(items);
			 res.render('headlines_details', {title: 'NewsHunt - HeadLines Details', items : items} );
            //res.send(items);
        });
    });*/
	
	if(keyword == 'sandesh'){
					
		request({
		  uri: headlines_href,
		}, function(error, response, body) {
			
			var self = this;
			self.headlinesData = new Array();//I feel like I want to save my results in an array
			
			//Just a basic error check
			if(error && response.statusCode !== 200){
				console.log('Request error.');
			}

			var $ = cheerio.load(body),			  
				tab_url = "http://www.sandesh.com/",

				//Use jQuery just as in a regular HTML page
				$articleClass = $('.ArticleTitle');
					
			 $articleClass.each(function (i, item) {
			 
				//I will use regular jQuery selectors
				var $headlines_title = $('span#lblHeading').text().trim(),
					$headlines_date = $('span#lblDate').text().trim(),
					$headlines_img = tab_url+$('img#imgNews').attr('src'),
					$articleCont = $('span#lblNews').text().trim();						
									
				//and add all that data to my items array
				self.headlinesData.push({
					keyword : keyword,
					//tabs_title : tabs_title,
					//tabs_href : tabs_href, 
					headlines_title : $headlines_title,
					headlines_href : headlines_href,
					headlines_img : $headlines_img,
					headlines_content : $articleCont,
					headlines_date : $headlines_date								
				});
			});
			res.render('headlines_details', {title: 'NewsHunt - HeadLines Details', items : self.headlinesData} );
		});
	}

	if(keyword == 'gujaratsamachar'){
		
		request({
		  uri: headlines_href,
		}, function(error, response, body) {
			
			var self = this;
			self.headlinesData = new Array();//I feel like I want to save my results in an array
			
			//Just a basic error check
			if(error && response.statusCode !== 200){
				console.log('Request error.');
			}

			var $ = cheerio.load(body),			  
				$articleClass = $('.main-box57');
			
				$articleClass.each(function (i, item) {
					 
					//I will use regular jQuery selectors
					var $headlines_title = $(item).children('h1.fittext1').html(),
						$title2 = $(item).children('h2.fittext2').html(),
						$title3 = $(item).children('h3.fittext2').html(),
						
						//$title = $title+"&lt;br /&gt;"+ $title2 +"&lt;br /&gt;"+ $title3;
						$articleCont = $(item).children('span.fittext3').text().trim(),
						$headlines_img = $(item).children('span.fittext3').find('img').attr('src');					
										
					//and add all that data to my items array
					self.headlinesData.push({
						keyword : keyword,
						//tabs_title : tabs_title,
						//tabs_href : tabs_href, 
						headlines_title : $headlines_title,
						headlines_href : headlines_href,
						headlines_img : $headlines_img,
						headlines_content : $articleCont								
					});
				});
				res.render('headlines_details', {title: 'NewsHunt - HeadLines Details', items : self.headlinesData} );
		});
	}
		
	
};