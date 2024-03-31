
const mongoose = require(`mongoose`)

const url =
	`mongodb+srv://admin:admin@gapconcluster.eorkkfo.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=gapconCluster`;

const connectionParams = {

	useNewUrlParser: true,

	useUnifiedTopology: true

}

mongoose.connect(url, connectionParams).then(() => {
	console.log("Connected to mongodb database successfully…!")
})
	.catch((err) => {
		console.error(`${err}`);

	})







