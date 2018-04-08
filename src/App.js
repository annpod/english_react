import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Main from '/Main';


export default () => (
	<Provider store={store}>
		<Main />
	</Provider>
);

// class App extends Component {
//
// 	render() {
// 		return (
// 			<main>
// 				<button id="button-sound" className="button-sound" type="button"></button>
// 				<div className="page-content main-page">
// 					<ul className="nav">
// 						<li className="nav-item" id="vocabulary-nav">
// 							<a href='vocabulary.html'>Vocabulary</a>
// 						</li>
// 						<li className="nav-item" id="grammar-nav">
// 							<a href='grammar-main.html'>Grammar</a>
// 						</li>
// 						<li className="nav-item" id="fill-nav">
// 							<a href='fillGaps.html'>Fill gaps</a>
// 						</li>
// 						<li className="nav-item" id="prepositions-nav">
// 							<a href='prepositions.html'>Prepositions</a>
// 						</li>
// 						<ul className="sub-nav">
//
// 						</ul>
// 						<li className="nav-item" id="dialogs-nav">
// 							<a href='#'>Dialogs</a>
// 							<ul className="sub-nav">
// 								<li className="sub-nav-item">
// 									<a href='#'>Meeting</a>
// 								</li>
// 								<li className="sub-nav-item">
// 									<a href='#'>About myself</a>
// 								</li>
// 							</ul>
// 						</li>
// 						<li className="nav-item" id="mistakes-nav">
// 							<a href='correct.html'>Correct mistakes</a>
// 						</li>
// 						<li className="nav-item" id="tasks-nav">
// 							<a href='#'>Tasks</a>
// 						</li>
// 						<li className="nav-item" id="body-nav">
// 							<a href='body.html'>Body</a>
// 						</li>
// 						<li className="nav-item" id="family-nav">
// 							<a href='family.html'>Family</a>
// 						</li>
// 						<li className="nav-item" id="irregular-nav">
// 							<a href='irregularVerbs.html'>Irregular Verbs</a>
// 						</li>
// 					</ul>
// 				</div>
//
// 			</main>
// 		);
// 	}
// }
//
// export default App;
