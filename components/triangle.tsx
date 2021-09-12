import { useEffect, useState } from 'react';
import styled from 'styled-components';
import WrapperIn from './square';

  const WrapTriangle = styled.div`
      overflow: hidden;
      

  `;

export default function Triangle ({children, orientationV , orientationH, rectangle, color, image_url}:any) {
  var classes = `triangle`;
  color = color ? color : 'white';
  var background = image_url ? image_url : color;

  const [chargedClass, setChargedClass] = useState(false);

  useEffect( ()=>{
    if(!chargedClass){
      setChargedClass(true);
      Array.from(document.getElementsByClassName('triangle') as HTMLCollectionOf<HTMLElement>).forEach(function(item) {
        item.style.cssText = `background: ${background}`;
      });
    }
  });
  
  if(rectangle){
    classes += ` rectangle`;

    if(orientationH){
      classes += ` ${orientationH}`;
    }else{
      if(orientationV){
        classes += ` ${orientationV}`;
      }else{
        classes += ` down`;
      }
    }

    

  }else{

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

