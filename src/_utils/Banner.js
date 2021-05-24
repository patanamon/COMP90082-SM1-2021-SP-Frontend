import React, { Component } from 'react'

import Banners from 'react-banners'

export default class Banner extends Component {
  render() {
    return (
      <div style={{ overflow: 'hidden' }}>
        <Banners style={{ overflow: 'hidden' }}>
          <Banners.Blocks>
            <Banners.Block imageAlign="top">
              <Banners.Title style={{ fontSize: '20px'}}>{this.props.projName}</Banners.Title>
            </Banners.Block>
          </Banners.Blocks>
          <Banners.Texture
            style={{
              width: '100%',
              height: '100%',
              backgroundRepeat: 'no-repeat',
              transform: 'scale(2.5)',
              backgroundSize: 'cover',
              backgroundPosition: '50%',
              backgroundImage:
                'url(//img.alicdn.com/tfs/TB1gqwCgSzqK1RjSZFjXXblCFXa-1141-1259.svg)'
            }}
          />
        </Banners>
      </div>
    )
  }
}