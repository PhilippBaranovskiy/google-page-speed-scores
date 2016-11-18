var googlePageSpeedScores = function(urls, cb){
	'use strict';

	urls = urls || [];

	if ( !urls.length ) { return; }

	this.apiUrl = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed';

	this.results = [];
	this.fetchPromises = [];
	
	this.averageScore = function(scoreArray){

		var avSpeed = 0;
		var avUsability = 0;

		scoreArray.forEach(function(score){
			avSpeed += score.speed;
			avUsability += score.usability;
		});

		avSpeed = Math.round( avSpeed / scoreArray.length );
		avUsability = Math.round( avUsability / scoreArray.length );

		return {
			speed: avSpeed,
			usability: avUsability
		};
	};
	this.storeResult = function(xhr, response) {
		var speed = response.ruleGroups.SPEED;
		var usability = response.ruleGroups.USABILITY;
		this.results.push({
			speed: speed.score,
			usability: usability.score
		});
	};
	this.logError = function(e, xhr, response) {
		console.log('logError: ', arguments);
	};

	urls.forEach(function(url){
		var promise = qwest.get(this.apiUrl, {
			url: url,
			strategy: 'mobile'
		})
		.then(this.storeResult.bind(this))
		.catch(this.logError);

		this.fetchPromises.push(promise);

		promise = null;
	}.bind(this));

	return Promise
				.all(this.fetchPromises)
				.then(function(){
					cb( this.averageScore(this.results) );
				}.bind(this))
				.catch(function(){
					console.log('ALL error: ', arguments);
				});
};