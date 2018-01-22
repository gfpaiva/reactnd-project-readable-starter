import React, { Component } from 'react';
import { connect } from 'react-redux';
import { capitalize as _capitalize } from 'lodash';
import { sort } from '../../Actions';

class Sort extends Component {

	state = {
		options: [
			{
				value: 'voteScore',
				order: 'desc',
				title: 'Score Desc ⬇',
			},
			{
				value: 'voteScore',
				order: 'asc',
				title: 'Score Asc ⬆',
			},
			{
				value: 'timestamp',
				order: 'desc',
				title: 'Date Desc ⬇',
			},
			{
				value: 'timestamp',
				order: 'asc',
				title: 'Date Asc ⬆',
			}
		]
	}

	selectSort(e) {
		const option = this.state.options[e.target.value];
		this.props.dispatch(sort(option));
	}

	render() {
		return (
			<div>
				<span>Order By: </span>
				<select onChange={e => this.selectSort(e)}>
					{ this.state.options.map((option, index) => <option key={index} value={index}>{_capitalize(option.title)}</option>) }
				</select>
			</div>
		);
	}
};

export default connect(null)(Sort);