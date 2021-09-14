import styled from 'styled-components';
import Square from './square';
import Triangle from './triangle';
import Circle from './circle';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';



export default function Grid ({children, columns, size, type, rows, full}:any) {
  
  const [positions,setPositions]= useState([0,0]);

  if(!rows){
    rows = 10;
  }
  
  if(!size){
    size = window.innerHeight/rows;
  }

  if(!columns){
    if(full){
      columns = Math.trunc(window.innerWidth/size);
    }else{
      columns = rows;
    }
  }
  
  if(!type){
    type = "";
  }
  
  const GridWrap = styled.div`
    min-width: 100%;
    min-height: 100vh;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: gray;
    
    @keyframes zoom_out {
      0% {
        height: 100vw;
        width: 100vw;
        visibility: visible;
      }
      50% {
        height: 30rem;
        width: 30rem;
        border-radius: 100%;
      }
      100%{
        height: 0;
        width: 0;
        visibility: hidden;
        border-radius: 100%;
      }
    }
    
    &:before{
      content: '';
      z-index: 99999;
      background: gray;
      display: block;
      visibility: hidden;
      position: absolute;
      animation-name: zoom_out;
      animation-duration: 1.5s;
    }
    `;

const WrapGrid = styled.div`
    display: grid;
    border: white;
    background: gray;
    width: max-content;
    height: max-content;
    
    &>div{
      height: ${size}px;
      width: ${size}px;
    }
    `;

useEffect( ()=>{
  let querySelector = '.square,.triangle,.circle';
  let pixelForms:any = document.querySelectorAll(querySelector);
  Array.from(pixelForms as HTMLCollectionOf<HTMLElement>).forEach(function(item) {
    pixelForms = document.querySelectorAll(querySelector);
    if(item){
      if(item.parentElement?.parentElement?.parentElement?.localName !== "button"){
        item.addEventListener('click', ()=>{
          Array.from(pixelForms).forEach(function(item) {
            let options = item.parentElement?.parentElement?.children[0];
            
            if(options){
              if(options.classList.contains('visible')){
                options.classList.remove('visible');
                
                if(options.parentElement?.classList.contains('focused')){
                  options.parentElement?.classList.remove('focused');
                }
              }
            }
          });
          let options = item.parentElement?.parentElement?.children[0];
          
          if(options){
            if(!options.classList.contains('visible')){
              let tooltipPositionY = options.getBoundingClientRect().left + window.scrollX + options.clientWidth;
              let tooltipPositionX = options.getBoundingClientRect().top + window.scrollY + options.clientHeight;
              let windowWidth = window.innerWidth;
              let windowHeight = window.innerHeight;
              let estilo = '';
              
              if((tooltipPositionY - windowWidth) > 0){
                estilo += 'right: 100%; left: initial; border-radius: 0.5rem 0 0 0.5rem;';
              }
              
              if((tooltipPositionX - windowHeight) > 0){
                estilo += `top: -${options.clientHeight}px !important;`;
              }
              
              options.style = estilo;
              options.classList.add('visible');
              
              // Añade clase focused para destacar el "píxel" seleccionado
              if(!options.parentElement?.classList.contains('focused')){
                options.parentElement?.classList.add('focused');
              }
            }
          }
        }, false);
      }
    }
  });

  // Asignación cambio pixel a triangulo top left
  Array.from(document.getElementsByClassName('changeToTriangleTopLeft')).forEach(function(item) {
    item.addEventListener('click', ()=>{
      let pixelForm = item.parentElement?.parentElement?.parentElement?.parentElement?.children[1].children[0];
      if(pixelForm){
        pixelForm.classList.value = 'triangle left top sombra';
      }
    });
  });

  // Asignación cambio pixel a triangulo top right
  Array.from(document.getElementsByClassName('changeToTriangleTopRight')).forEach(function(item) {
    item.addEventListener('click', ()=>{
      let pixelForm = item.parentElement?.parentElement?.parentElement?.parentElement?.children[1].children[0];
      if(pixelForm){
        pixelForm.classList.value = 'triangle right top sombra';
      }
    });
  });

  // Asignación cambio pixel a círculo
  Array.from(document.getElementsByClassName('changeToCircle')).forEach(function(item) {
    item.addEventListener('click', ()=>{
      let pixelForm = item.parentElement?.parentElement?.parentElement?.parentElement?.children[1].children[0];
      if(pixelForm){
        pixelForm.classList.value = 'circle sombra';
      }
    });
  });

  // Asignación cambio pixel a cuadrado
  Array.from(document.getElementsByClassName('changeToSquare')).forEach(function(item) {
    item.addEventListener('click', ()=>{
      let pixelForm = item.parentElement?.parentElement?.parentElement?.parentElement?.children[1].children[0];
      if(pixelForm){
        pixelForm.classList.value = 'square sombra';
      }
    });
  });
  
  // Movement function
    document.addEventListener('keydown', (event) => {
      const keyName = event.key;
      let movement:any;
      switch(keyName){
        case 'a':
          movement = 'left';
        break;
        case 'w':
          movement = 'up';
        break;
        case 'd':
          movement = 'right';
        break;
        case 's':
          movement = 'down';
        break;
        case 'ArrowLeft':
          movement = 'left';
        break;
        case 'ArrowUp':
          movement = 'up';
        break;
        case 'ArrowRight':
          movement = 'right';
        break;
        case 'ArrowDown':
          movement = 'down';
        break;
      }

      const gridContent = Array.from(document.getElementsByTagName('body')[0].children[0]?.children[0]?.children[0]?.children as HTMLCollectionOf<HTMLElement>);
      
      gridContent.forEach((pixel)=>{
        let positions = [0,0];
        let moveSpace = '0px, 0px';
        //size = pixel.style.height.split('px')[0];
        positions = [
          (parseFloat(pixel.style.translate.split(' ')[0]?.split('px')[0]) ? 
          parseFloat(pixel.style.translate.split(' ')[0]?.split('px')[0]) : 
          0), 
          parseFloat(pixel.style.translate.split(' ')[1]?.split('px')[0]) ? 
          parseFloat(pixel.style.translate.split(' ')[1]?.split('px')[0]) : 
          0];
        
        if(size != 50){
          switch(movement){
            case 'left':
            moveSpace = `${positions[0]-(size)}px ${positions[1]}px`;
            break;
            case 'up':
              moveSpace = `${positions[0]}px ${positions[1]-size}px`;
            break;
            case 'right':
              moveSpace = `${positions[0] + size}px ${positions[1]}px`;
            break;
            case 'down':
              moveSpace = `${positions[0]}px ${positions[1]+size}px`;
            break;
          }
        }
        //moveSpace = `${positions[0]}px ${positions[1]}px`;
        //console.log(positions);
        pixel.style.translate = moveSpace;
      });
      
      
      
    });

}, []);

  var childs:any = [];
  if (!children){
    for (let index = 0; index < rows*columns; index++) {
      switch(type){
        case "triangle":
          childs.push(<Triangle orientationH="left" orientationV="top"/>);
          break;
        case "circle":
          childs.push(<Circle color="lightslategray"/>);
        break;
        default:
          childs.push(<Square  rombo={false} color="slategray"/>);
          break;
      }
    }
  }else{
      childs = children;
  }
    
  
  
  return (
    <>
    <GridWrap>
      <WrapGrid style={{gridTemplateColumns: `repeat(${columns}, auto)`}}>
          {
            childs
          }
      </WrapGrid>
    </GridWrap>
    </>
  )
}
