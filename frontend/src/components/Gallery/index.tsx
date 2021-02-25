import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { MOUSE_CLICK_EVENT } from '@variables/constant';

type GalleryProps = {
  list: string[];
};

type ImageProps = {
  backgroundImage: string;
};

const Wrapper = styled.div`
  font-weight: bold;
`;

const Image = styled.div`
  width: 300px;
  height: 300px;
  background-image: ${({backgroundImage}: ImageProps) => backgroundImage};
  background-repeat: no-repeat;
`;

const Gallery = ({ list }: GalleryProps) => {
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
      <Image backgroundImage={list[0]} />
    </Wrapper>
  );
};

export default Gallery;
