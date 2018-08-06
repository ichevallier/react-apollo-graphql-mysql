//'use strict';

import React from 'react';

// react photo gallery 
import Measure from 'react-measure';
import BasicGallery from './BasicGallery';

class ImageBox extends React.Component {
  

  // dynamics columns photo gallery
  constructor(props) {
    super(props);
    this.state = { width: -1, dimensions:{} };//this.state = { width: -1 };
    this.loadPhotos = this.loadPhotos.bind(this);
  }
  componentDidMount() {
    this.loadPhotos();
  }
  loadPhotos() {
    
    let photos = this.props.src.map(item => {
      return{
        src: item.url,
        title: item.title,
        width:4,
        //width: item.url.offsetWidth,
        height:3,
        //height: item.url.offsetHeight,
        srcSet: [
            `${item.url} 500w`,
            `${item.url} 800w`,
            `${item.url} 1024w`,
            `${item.url} 1600w`,
          ],
          sizes: ['(min-width: 480px) 50vw', '(min-width: 1024px) 33.3vw', '100vw'],
      }
      
    });
    this.setState({
      //photos: this.state.photos ? this.state.photos.concat(photos) : photos,
      photos:photos,
    });
  }

  
  render() {
    const width = this.state.width;
    //const columns = 3;
    return(
      <Measure bounds onResize={(contentRect) => this.setState({ width: contentRect.bounds.width  })}>
      {
        ({ measureRef  }) => {
          if (width < 1 ){
            return <div ref={measureRef}></div>;
          }
          let columns = 1;
          if (width >= 480){
            columns = 2;
          }
          if (width >= 1024){
            columns = 3;
          }
          if (width >= 1824){
            columns = 4;
          }
          return <div ref={measureRef}>
                <BasicGallery columns={columns} photos={this.state.photos.slice(0,6)} />
              </div>
        }
      }
      </Measure>
    )
  }
}


export default ImageBox;