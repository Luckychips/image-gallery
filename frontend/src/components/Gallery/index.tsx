import React, { useEffect, useState, createRef } from 'react';
import styled from '@emotion/styled';
import { MOUSE_CLICK_EVENT } from '@variables/constant';

type GalleryProps = {
  list: string[];
};

const Wrapper = styled.div` 
  font-weight: bold;
`;

const HiddenImage = styled.img` 
  display: none;
`;

const Gallery = ({ list }: GalleryProps) => {
  const canvasRef = createRef<HTMLCanvasElement>();
  const imageRef = createRef<HTMLImageElement>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(null);
  const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null);
  const [canvasWidth, setCanvasWidth] = useState(600);
  const [canvasHeight, setCanvasHeight] = useState(600);
  const [isPressedLeft, setIsPressedLeft] = useState(true);

  const onMouseDown = (event: MouseEvent) => {
    setIsPressedLeft(event.buttons === MOUSE_CLICK_EVENT.LEFT);
  };

  const onDragStart = (event: DragEvent) => {
    if (imageRef.current && event.dataTransfer) {
      event.dataTransfer.setDragImage(imageRef.current, 0, 0);
    }
  };

  const onDrag = (event: DragEvent) => {
    if (event.screenX === 0 && event.screenY === 0) {
      return;
    }

    setCanvasWidth(event.screenX);
    setCanvasHeight(event.screenY);
  };

  const onWheel = (event: WheelEvent) => {
    setTimeout(() => {
      if (event.deltaY > 0) {
        if (currentIndex >= list.length - 1) {
          return;
        }

        setCurrentIndex(currentIndex + 1);
      } else {
        if (currentIndex <= 0) {
          return;
        }
        setCurrentIndex(currentIndex - 1);
      }
    }, 250);
  };

  useEffect(() => {
    if (canvasRef) {
      setCanvasElement(canvasRef.current);
    }
  }, [canvasRef]);

  useEffect(() => {
    if (canvasElement) {
      setCanvasContext(canvasElement.getContext('2d'));
    }
  }, [canvasElement]);

  useEffect(() => {
    if (canvasContext && imageRef.current) {
      imageRef.current.onload = () => {
        if (imageRef.current) {
          canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
          canvasContext.drawImage(imageRef.current, 0, 0,  canvasWidth,  canvasHeight);
        }
      }
    }
  }, [canvasContext, imageRef]);

  useEffect(() => {
    if (canvasContext && imageRef.current) {
      if (imageRef.current) {
        canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
        canvasContext.drawImage(imageRef.current, 0, 0,  canvasWidth,  canvasHeight);
      }
    }
  }, [canvasWidth, canvasHeight]);

  return (
    <Wrapper
      draggable={true}
      onMouseDown={(event) => onMouseDown(event.nativeEvent)}
      onDragStart={(event) => onDragStart(event.nativeEvent)}
      onDrag={(event) => onDrag(event.nativeEvent)}
      onWheel={(event) => onWheel(event.nativeEvent)}
    >
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
      <HiddenImage ref={imageRef} src={`http://${list[currentIndex]}`} alt="hi" />
    </Wrapper>
  );
};

export default Gallery;
