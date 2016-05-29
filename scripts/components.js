/* BoardHeader component, the rows of the table are children of this components. */
var BoardHeader = React.createClass({
	/* This method sets the data array which holds users' information to an empty array. */
	getInitialState: function() {
		return {data: []};
	},
	/* In this method, the recent points header is highlighted an ajax request is placed to grab information. */
	componentDidMount: function() {
		$(".points-header").css("backgroundColor", "#CDC9C9");
		this.getData("https://fcctop100.herokuapp.com/api/fccusers/top/recent");
	},
	/* This method changes the colors of the recent header to light gray and the all time header to white, and it grabs recent information. (tried to include this in componentDidMount function since they're similar but got an error.) */
	pointsHandler: function() {
		$(".points-header").css("backgroundColor", "#CDC9C9");
		$(".all-points-header").css("backgroundColor", "white");
		this.getData("https://fcctop100.herokuapp.com/api/fccusers/top/recent");
	},
	/* Same as pointsHandler method, differes in highlighting the header and the url for the ajax request. */
	allPointsHandler: function() {
		$(".points-header").css("backgroundColor", "white");
		$(".all-points-header").css("backgroundColor", "#CDC9C9");
		this.getData("https://fcctop100.herokuapp.com/api/fccusers/top/alltime");
	},
	/* This method places an ajax request using the url parameter, and stores the data in this.state.data array. */
	getData: function(url) {
		$.ajax({
			url: url,
			dataType: "json",
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function () {
				alert("Data couldn't be retreived.");
			}.bind(this)
		});		
	},
	/* Render method, it renders headers, and then renders child BoardRow. this.state.data is passed as props with BoardRow. */
	render: function() {
		return (
			<div>
				<div className="main-header">
					<h2>Leaderboard</h2>
				</div>
				<table id="table">
					<thead>
						<tr>
							<th className="number-header">#</th>
							<th className="name-header">Camper</th>
							<th className="points-header" onClick={this.pointsHandler}>Points in last 30 days</th>
							<th className="all-points-header" onClick={this.allPointsHandler}>All time points</th>
						</tr>
					</thead>
					<BoardRow data={this.state.data} />
				</table>
			</div>
		);
	}
});

/* BoardRow component. renders all rows in the table using data prop. */
var BoardRow = React.createClass({
	render: function() {
		/* c is counter and displays the user number in the table. */
		var c = 0;
		/* The variable rows stores the html for each row. The map function loops through each element in data props and creates a corresponding row. */
		var rows = this.props.data.map(function(row) {
			/* a link is generated for each user. */
			var link = "https://www.freecodecamp.com/"+ row.username;
			c++;
			return (
				<tr key={c}>
					<th className="number-entry">{c}</th>
					<th className="name-entry"><img className="user-image" src={row.img}/> <a href={link}>{row.username}</a></th>
					<th className="points-entry">{row.recent}</th>
					<th className="all-points-entry">{row.alltime}</th>	
				</tr>
			);
		});
		/* The body of the table consists of all the rows in rows varialbe. */
		return (
			<tbody>
				{rows}
			</tbody>
		);
	}
});

/* The call to render BoardHeader... */
ReactDOM.render(<BoardHeader />, document.getElementById("board"));