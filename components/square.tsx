import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Triangle from './triangle';
import Circle from './circle';

const WrapperIn = styled.div`
  height: 100%;
  
  >div{
    height: 100%;
  }
  `;

export default function Square ({children, rombo, color, image_url}:any) {
  var classes = `square sombra`;
  color = color ? color : 'white';
  var background = image_url ? image_url : color;
  if(rombo){
    classes += ` rombo`;
  }
  var delay = 0;

  useEffect( ()=>{
      Array.from(document.getElementsByClassName('square') as HTMLCollectionOf<HTMLElement>).forEach(function(item) {
        item.style.cssText = `
        background: ${background}; 
        animation-name: slabDown;
        animation-duration: 1s;
        animation-delay: ${delay}s;
        `;
        console.log(item.style["background"]);
        
        delay+=0.0025; 
      });
  }, []);


    return (
      <div className="wrap-pixel sombra">
        <div className="options sombra">
          <div className="options-wrap">
            <div className="options-buttons">
              <button className="changeToTriangleTopLeft"><Triangle orientationH="left" orientationV="top"/></button>
              <button className="changeToTriangleTopRight"><Triangle orientationH="right" background="white" orientationV="top"/></button>
              <button className="changeToCircle"><Circle/></button>
              <button className="changeToSquare"><div className="wrap-pixel sombra"><div className="square-in" style={{background : 'white !important', height: "100%"}}> </div></div></button>
            </div>
          </div>
        </div>
        
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
    );
      
}

