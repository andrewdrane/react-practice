import React, { Component } from 'react';
import {render} from 'react-dom';

class App extends Component {
  render(){
    return (
      <h1>Hello {this.props.thing}!</h1>
    );
  }
}

class Mylist extends Component {


	addItem() {
		var newItem = {};
		newItem.key = this.props.items.length + 1;
		newItem.value = Math.random();
		this.props.items.push( newItem );
		this.setState({items: this.props.items})
	};


	render(){
		var items = this.props.items.map((item, i) => { 
				return <Mylistitem key={i} list_id={item.key} list_value={item.value} deleted={item.deleted} />
			 }).filter((item) => {return typeof item !== 'undefined'});

		return (
			<div>
			<ul>
				{items}
			</ul>
			<a href="#" onClick={this.addItem.bind(this)}>Click to add an item</a>
			</div>
		);
	}
}

class Mylistitem extends Component {

	/** Inneficient but gets the point accross
	*/
	deleteItem() {
		this.setState({deleted:true})
	}

	render() {
			if( this.props.deleted || ( this.state && this.state.deleted ) ) {
				return null;
			}
			return (
			<li data-id={this.props.list_id}>
				{this.props.list_value} -- 
				<a href="#" onClick={this.deleteItem.bind(this)}>X</a>
			</li>
		)
	}
}

render(<App thing="you" />, document.getElementById('root'));

let items = [
	{key:1,value:'abc'},
	{key:2,value:'def', deleted:true},
	{key:3,value:'ghi'}
]
render(<Mylist items={items} />, document.getElementById('my-list'))