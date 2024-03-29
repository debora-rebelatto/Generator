import React, { Component } from 'react';

class MemeGenerator extends Component {
  constructor() {
    super()
    this.state = {
      topText: '',
      bottomText: '',
      randomImg: 'http://i.imgflip.com/1bij.jpg',
      allMemeImgs: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('https://api.imgflip.com/get_memes')
      .then(response => response.json())
      .then((response) => {
        let { memes } = response.data
        this.setState({ allMemeImgs: memes })
      })
  }

  handleChange(event) {
    let { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit(event) {
    event.preventDefault()
    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
    const randMemeImg = this.state.allMemeImgs[randNum].url
    this.setState({ randomImg: randMemeImg })
  }

  render() {
    return (
      <div>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            placeholder="top text"
            name='topText'
            value={this.state.topText}
            onChange={this.handleChange}
          />

          <input
            placeholder="bottom text"
            name='bottomText'
            value={this.state.bottomText}
            onChange={this.handleChange}
          />

          <button>Gen</button>
        </form>

        <div className="meme">
          <img src={this.state.randomImg} alt="" />
          <h2 className='top'> {this.state.topText} </h2>
          <h2 className='bottom'> {this.state.bottomText} </h2>
        </div>

      </div >
    )
  }
}

export default MemeGenerator