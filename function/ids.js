function getRandom(min, max) {
	return Math.ceil(Math.random() * (max - min) + min);
}

function generateID(key, text="") {
	switch (key) {
		case "user_id":
			return Date.now().toString().slice(10, 13) + text.slice(0, 2) + getRandom(99, 1000);
			break
		case "project_id":
			return Date.now().toString().slice(8, 13) + getRandom(0, 10000);
			break
	    case "task_id":
			return Date.now().toString().slice(8, 13) + text.slice(getRandom(1,7),8) + getRandom(0, 10000);
			break
		default:
			return Date.now().toString().slice(4, 13) + getRandom(0, 10000);
			break
	}
	
}


module.exports = {
	getRandom, generateID
}