import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import './random-planet.css';
import Spinner from '../spinner/spinner';

export default class RandomPlanet extends Component {
	SwapiService = new SwapiService();
	constructor(props) {
		super(props);
		this.state = {
			planet: {},
			loading: true,
			error: false
		};
		this.updatePlanet();
	}

	onPlanetLoaded = (planet) => {
		this.setState({ planet, loading: false });
	};

	onError = (err) => {
		this.setState({ error: true });
	};

	updatePlanet() {
		const id = Math.floor(Math.random() * 25);
		this.SwapiService.getPlanet(id).then(this.onPlanetLoaded).catch(this.onError);
	}

	render() {
		const { planet, loading } = this.state;

		return (
			<div className="random-planet jumbotron rounded">
				{loading ? <Spinner /> : <PlanetView planet={planet} />}
			</div>
		);
	}
}

const PlanetView = ({ planet }) => {
	const { name, population, rotationPeriod, diameter, id } = planet;
	return (
		<React.Fragment>
			<img className="planet-image" src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
			<div>
				<h4>{name}</h4>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">
						<span className="term">Population</span>
						<span>{population}</span>
					</li>
					<li className="list-group-item">
						<span className="term">Rotation Period</span>
						<span>{rotationPeriod}</span>
					</li>
					<li className="list-group-item">
						<span className="term">Diameter</span>
						<span>{diameter}</span>
					</li>
				</ul>
			</div>
		</React.Fragment>
	);
};
