import { useEffect, useState } from 'react';
import styled from 'styled-components';
import WrapperIn from './square';


export default function Circle ( {children, orientationV , orientationH, corner, center, color, image_url}:any ) {
  var classes = `circle`;
  color = color ? color : 'white';
  var background = image_url ? image_url : color;
  const [chargedClass, setChargedClass] = useState(false);

  useEffect( ()=>{
    if(!chargedClass){
      setChargedClass(true);
      Array.from(document.getElementsByClassName('circle')).forEach(function(item) {
        item.style = `background: ${background}`;
      });
    }
  });

  if(corner){
    classes += ` cornered`;
  
    if(orientationH){
      classes += ` ${orientationH}`;
    }else{
      classes += ` right`;
    }

    if(orientationV){
      classes += ` ${orientationV}`;
    }else{
      classes += ` down`;
    }
  }

  if(center){
    classes += ` centered`;

    if(orientationV){
      classes += ` ${orientationV}`;
    }

    if(orientationH){
      classes += ` ${orientationH}`;
    }
  }
  
  return (
    <div className="wrap-pixel sombra">
      <div className="wrapper-in">
        <div className={classes}>
          { children ?
          <WrapperIn>
            { children }
          </WrapperIn>
          :
          ''
          }
        </div>
      </div>
    </div>
  )
}

