import React, { useEffect, useState, createRef } from 'react';
import styled from '@emotion/styled';
import { MOUSE_CLICK_EVENT } from '@variables/constant';

type GalleryProps = {
  list: string[];
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  font-weight: bold;
`;

const HiddenImage = styled.img`
  display: none;
`;

let rotateDegree = 0;
const Gallery = ({ list }: GalleryProps) => {
  const canvasRef = createRef<HTMLCanvasElement>();
  const imageRef = createRef<HTMLImageElement>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(null);
  const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null);
  const [canvasWidth, setCanvasWidth] = useState(600);
  const [canvasHeight, setCanvasHeight] = useState(600);
  const [isPressedLeft, setIsPressedLeft] = useState(false);
  const [isPressedRight, setIsPressedRight] = useState(false);
  const [previousMouseMoveEvent, setPreviousMouseMoveEvent] = useState<MouseEvent | null>(null);
  const [previousClientPosition, setPreviousClientPosition] = useState(0);

  const onMouseDown = (event: MouseEvent) => {
    setIsPressedLeft(event.buttons === MOUSE_CLICK_EVENT.LEFT);
    setIsPressedRight(event.buttons === MOUSE_CLICK_EVENT.RIGHT);
  };

  const onMouseUp = (event: MouseEvent) => {
    setIsPressedLeft(false);
    setIsPressedRight(false);
  };

  // image rotate
  const onMouseMove = (event: MouseEvent) => {
    if (isPressedRight) {
      setPreviousMouseMoveEvent(event);
    }
  };

  const onDragStart = (event: DragEvent) => {
    if (imageRef.current && event.dataTransfer) {
      event.dataTransfer.setDragImage(imageRef.current, 0, 0);
    }
  };

  const onDrag = (event: DragEvent) => {
    if (isPressedLeft) {
      if (event.clientX === 0 && event.clientY === 0) {
        return;
      }

      setCanvasWidth(event.clientX);
      setCanvasHeight(event.clientY);
    }
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

  const draw = () => {
    if (canvasContext && imageRef.current) {
      if (imageRef.current) {
        canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
        canvasContext.drawImage(imageRef.current, 0, 0, canvasWidth, canvasHeight);
      }
    }
  };

  const rotate = () => {
    if (canvasContext && imageRef.current) {
      if (previousMouseMoveEvent!.clientX > previousClientPosition) {
        rotateDegree += 1;
      } else if (previousMouseMoveEvent!.clientX < previousClientPosition) {
        rotateDegree -= 1;
      }

      canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
      canvasContext.save();
      canvasContext.translate(canvasWidth / 2, canvasHeight / 2);
      canvasContext.rotate((rotateDegree * Math.PI) / 180);
      canvasContext.drawImage(imageRef.current, -canvasWidth / 2, -canvasHeight / 2, canvasWidth, canvasHeight);
      canvasContext.restore();
      setPreviousClientPosition(previousMouseMoveEvent!.clientX);
    }
  };

  useEffect(() => {
    const onContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };
    document.addEventListener('contextmenu', onContextMenu);
    return () => {
      document.removeEventListener('contextmenu', onContextMenu);
    };
  }, []);

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
    imageRef.current!.onload = () => {
      draw();
    };
  }, [canvasContext, imageRef]);

  useEffect(() => {
    draw();
  }, [canvasWidth, canvasHeight]);

  useEffect(() => {
    rotate();
  }, [previousMouseMoveEvent]);

  return (
    <Wrapper onMouseUp={(event) => onMouseUp(event.nativeEvent)}>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        draggable={true}
        onMouseDown={(event) => onMouseDown(event.nativeEvent)}
        onMouseMove={(event) => onMouseMove(event.nativeEvent)}
        onDragStart={(event) => onDragStart(event.nativeEvent)}
        onDrag={(event) => onDrag(event.nativeEvent)}
        onWheel={(event) => onWheel(event.nativeEvent)}
      />
      <HiddenImage ref={imageRef} src={`http://${list[currentIndex]}`} alt="hi" />
    </Wrapper>
  );
};

export default Gallery;
