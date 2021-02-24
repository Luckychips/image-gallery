import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import { MOUSE_CLICK_EVENT } from '@variables/constant';

const Wrapper = styled.div`
  font-weight: bold; 
`;

const Gallery = () => {
  const [isPressedLeft, setIsPressedLeft] = useState(true);

  const onMouseDown = (event: MouseEvent) => {
    setIsPressedLeft(event.buttons === MOUSE_CLICK_EVENT.LEFT);
  };

  const onDragStart = (event: DragEvent) => {
    console.log('on drag start : ' + isPressedLeft);
  };

  const onWheel = (event: WheelEvent) => {
    // console.log('on wheel : ');
  };


  return (
    <Wrapper
      draggable={true}
      onMouseDown={(event) => onMouseDown(event.nativeEvent)}
      onDragStart={(event) => onDragStart(event.nativeEvent)}
      onWheel={(event) => onWheel(event.nativeEvent)}
    >
      <img src="http://live.staticflickr.com/65535/50964337567_a56d11e037_n.jpg" alt="image-from-flickr" />
    </Wrapper>
  );
};

export default Gallery;
