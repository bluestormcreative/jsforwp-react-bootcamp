const { Component } = wp.element;
// import './main.scss';

export default class Main extends Component {
	render() {
		return (
			<div className='site-content'>
				<h2>This is some content.</h2>
				<p>
					Lorem ipsum dolor sit amet consectetur adipiscing elit, at posuere
					interdum turpis mollis dis porttitor odio, integer class gravida metus
					dictum vehicula. Imperdiet donec dignissim turpis primis sagittis
					porttitor non, lacinia nullam accumsan lectus mus eget luctus at,
					aenean ornare lacus arcu sociis ridiculus. Sociis erat blandit class
					porttitor nec convallis bibendum, at curabitur ut lectus himenaeos
					ultrices, ullamcorper nullam tincidunt habitasse senectus eleifend.
				</p>
				<p>
					Vel pharetra vitae montes a aenean enim, magna fringilla at potenti
					urna cras dignissim, nisi lobortis rhoncus ornare euismod. Mattis
					nulla odio suspendisse eget sapien vestibulum, augue arcu duis
					malesuada eros hac, platea tristique eu proin quam. Odio hac turpis
					natoque maecenas curae semper augue class senectus est, faucibus eros
					tellus in dapibus felis eu pretium convallis parturient, quis quam
					feugiat lacinia leo sapien mus sem fringilla.
				</p>
			</div>
		);
	}
}
