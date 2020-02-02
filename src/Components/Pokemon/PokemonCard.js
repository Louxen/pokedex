import React, { Component } from 'react'

import styled from 'styled-components';

import pokeball from '../Layout/pokeball2.gif';

const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;

const Card = styled.div`
  opacity: 0.95;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

export default class PokemonCard extends Component {
  state = {
    name: "",
    imageUrl: "",
    pokemonId: "",
    imageLoading: true,
    tooManyRequest: false
  }

  componentDidMount () {
    const {name, url} = this.props;
    const pokemonId = url.split('/')[url.split('/').length - 2];
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonId}.png?raw=true`;

    this.setState({
      name,
      imageUrl,
      pokemonId
    })
  }

  render() {
    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <Card className="card">
          <h5 className="card-header">{this.state.pokemonId}</h5>
          {this.state.imageLoading ? (
              <img
                src={pokeball}
                style={{ width: '5em', height: '5em' }}
                className="card-img-top rounded mx-auto d-block mt-2"
              />
            ) : null}
          <Sprite 
            className="card-img-top rounded mx-auto mt-2"
            src={this.state.imageUrl}
            onLoad={() => this.setState({imageLoading: false})}
            onError={() => this.setState({tooManyRequest: true})}
            style={
              this.state.toManyRequests
                ? { display: 'none' }
                : this.state.imageLoading
                ? null
                : { display: 'block' }
            }
          >

          </Sprite>
          {this.state.toManyRequests ? (
              <h6 className="mx-auto">
                <span className="badge badge-danger mt-2">
                  To Many Requests
                </span>
              </h6>
            ) : null}
          <div className="card-body mx-auto">
            <h6 className="card-title font-weight-bold">
              {this.state.name
                .toLowerCase()
                .split(' ')
                .map(
                  letter => letter.charAt(0).toUpperCase() + letter.substring(1)
                )
                .join(' ')}
            </h6>
          </div>
        </Card>
      </div>
    )
  }
}