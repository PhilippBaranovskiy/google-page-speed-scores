Package version goes with extra small (2.2kb) [Qwest library](http://microjs.com/#qwest).

##Usage:

```
var scores = new googlePageSpeedScores([
	'https://facebook.com',
	'https://google.com'
], function(scores){
	console.table(scores);
});
```

will generate average scores for "Speed" and "Usability".