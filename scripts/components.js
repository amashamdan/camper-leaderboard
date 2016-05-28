var BoardHeader = React.createClass({
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
							<th className="points-header">Points in last 30 days</th>
							<th className="all-points-header">All time points</th>
						</tr>
					</thead>
					<tbody>
						<BoardRow />
					</tbody>
				</table>
			</div>
		);
	}
});

var BoardRow = React.createClass({
	render: function() {
		return (
			<tr>
				<th className="number-entry">A number</th>
				<th className="name-entry">A name</th>
				<th className="points-entry">Another number</th>
				<th className="all-points-entry">Final number</th>				
			</tr>
		);
	}
})


ReactDOM.render(<BoardHeader />, document.getElementById("board"));