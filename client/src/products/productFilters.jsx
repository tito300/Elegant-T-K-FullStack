import React, { Component } from 'react';

class Filters extends Component {
    state = {
        block1: false,
        block2: false,
        block3: false,
        block4: false,
        title: false,
    }

    handleBlockClick = (e) => {
        e.stopPropagation();
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT') {
            this.setState({
                [e.currentTarget.id]: !this.state[e.currentTarget.id],
            })
        }
    }


    render() {
        let { state, props } = this;
        let block1 = state.block1 ? 'open' : '';
        let block2 = state.block2 ? 'open' : '';
        let block3 = state.block3 ? 'open' : '';
        let block4 = state.block4 ? 'open' : '';
        let title = state.title ? 'open' : '';


        return (
            <div className="products-filters">
                <p className={`title ${title}`} id='title' onClick={this.handleBlockClick}>filter</p>
                <div className={`filter-list ${title}`}>
                    <div className={`filter-block ${block1}`} id='block1' onClick={this.handleBlockClick}>
                        <form className={`${block1}`}>
                            <p className={`filter-label`} >type</p>
                            <div className={`filter-options__div ${block1}`}>
                                <input type='radio' name="type" value="all" id='type' onChange={props.handleFilterChange} />
                                <span className="filter-option">all</span><br />
                                <input type='radio' name="type" value="tshirt" id='type' onChange={props.handleFilterChange} />
                                <span className="filter-option">tshirts</span><br />
                                <input type='radio' name="type" value="sweater" onChange={props.handleFilterChange} />
                                <span className="filter-option">sweaters</span>
                            </div>
                        </form>
                    </div>
                    <div className={`filter-block ${block2}`} id='block2' onClick={this.handleBlockClick}>
                        <form className={`${block2}`}>
                            <p className={`filter-label`}>brand</p>
                            <select value={props.filters.brand ? props.filters.brand : 'none'} name="brand" id='brand' onChange={props.handleFilterChange}>
                                <option value="none">none</option>
                                <option value="t&k quality">tnk quality</option>
                                <option value="disney">Disney</option>
                                <option value="corel">corel</option>
                                <option value="bento">bento</option>
                            </select>
                        </form>
                    </div>
                    <div className={`filter-block ${block3}`} id='block3' onClick={this.handleBlockClick}>
                        <form className={`${block3}`}>
                            <p className={`filter-label`}>gender</p>
                            <select name="gender" id="gender" onChange={props.handleFilterChange}>
                                <option value="none">none</option>
                                <option value="male">male</option>
                                <option value="female">female</option>
                            </select>
                        </form>
                    </div>
                    <div className={`filter-block ${block4}`} id='block4' onClick={this.handleBlockClick}>
                        <form className={`${block4}`}>
                            <p className={`filter-label`}>color</p>
                            <select name="color" id="color" onChange={props.handleFilterChange}>
                                <option value="none">none</option>
                                <option value="red">Red</option>
                                <option value="grey">Grey</option>
                                <option value="black">Black</option>
                            </select>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

export default Filters;