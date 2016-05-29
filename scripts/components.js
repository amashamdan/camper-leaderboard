var BoardHeader = React.createClass({
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		this.getData("https://fcctop100.herokuapp.com/api/fccusers/top/recent");
	},
	pointsHandler: function() {
		this.getData("https://fcctop100.herokuapp.com/api/fccusers/top/recent");
	},	
	allPointsHandler: function() {
		this.getData("https://fcctop100.herokuapp.com/api/fccusers/top/alltime");
	},
	getData: function(url) {
		$.ajax({
			url: url,
			dataType: "json",
			success: function(data) {
				this.setState({data: data});
			}.bind(this)
		});		
	},
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

var BoardRow = React.createClass({
	render: function() {
		var c = 0;
		var rows = this.props.data.map(function(row) {
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
		return (
			<tbody>
				{rows}
			</tbody>
		);
	}
});

ReactDOM.render(<BoardHeader />, document.getElementById("board"));