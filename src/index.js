/*
 * Author  rhys.zhao
 * Date  2022-01-28 15:27:52
 * LastEditors  rhys.zhao
 * LastEditTime  2023-04-26 16:53:15
 * Description 拖拽，缩放容器组件
 */
import React, { useEffect, useRef } from 'react';
import styles from './index.scss';

const DragZoomContainer = (props) => {
  const {
    zoomOnInner = false,
    zoomRange = { min: 0.5, max: 5 },
    zoomOrigin = '50% 50%',
    dragInDocument = true,
    outerStyle = {},
    position = { top: 0, left: 0 },
    children
  } = props;

  let params = {
    isDragging: false,
    clientX: 0,
    clientY: 0,
    x: 0,
    y: 0,
    zoom: 1
  };

  const outerRef = useRef();
  const innerRef = useRef();

  // 滚动缩放
  const onWheel = (dom) => {
    const wheelListener = (e) => {
      e.preventDefault();
      e = e || window.event;
      params.zoom += e.wheelDelta / 1200;
      const { min, max } = zoomRange;
      if (params.zoom > max) params.zoom = max;
      if (params.zoom < min) params.zoom = min;
      let inner = innerRef.current;
      inner.style.transform = `scale(${params.zoom})`;
      inner.style.transformOrigin = zoomOrigin;
    };

    dom.addEventListener('wheel', wheelListener);

    return wheelListener;
  };
  // 拖拽
  const onDrag = (inner, container = document) => {
    // 鼠标按下
    const mouseDownListener = (e) => {
      if (e.buttons === 2) {
        return;
      }
      e.preventDefault();
      e = e || window.event;
      params.isDragging = true;
      // 记录鼠标位置
      params.clientX = e.clientX;
      params.clientY = e.clientY;
      // 记录inner位置
      params.x = inner.offsetLeft;
      params.y = inner.offsetTop;
    };

    // 鼠标移动
    const mouseMoveListener = (e) => {
      e = e || window.event;
      if (params.isDragging) {
        // 计算鼠标上下左右移动
        let moveX = e.clientX - params.clientX;
        let moveY = e.clientY - params.clientY;
        // 更新inner位置
        params.x += moveX;
        params.y += moveY;
        // inner移动等于鼠标的移动
        inner.style.left = params.x + 'px';
        inner.style.top = params.y + 'px';
        // 更新鼠标位置
        params.clientX = e.clientX;
        params.clientY = e.clientY;
      }
    };

    // 鼠标弹起
    const mouseUpListener = () => {
      params.isDragging = false;
    };

    inner.addEventListener('mousedown', mouseDownListener);
    container.addEventListener('mousemove', mouseMoveListener);
    document.addEventListener('mouseup', mouseUpListener);

    return [mouseDownListener, mouseMoveListener, mouseUpListener];
  };

  useEffect(() => {
    const inner = innerRef.current;
    const outer = outerRef.current;

    // 初始化inner在容器中的位置
    const { top, left } = position;
    inner.style.left = left + 'px';
    inner.style.top = top + 'px';

    // 拖拽事件
    const container = dragInDocument ? window.document : outer;
    const [mouseDownListener, mouseMoveListener, mouseUpListener] = onDrag(inner, container);

    // 缩放事件
    const zoomOn = zoomOnInner ? inner : outer;
    const wheelListener = onWheel(zoomOn);
    return () => {
      inner.removeEventListener('mousedown', mouseDownListener);
      container.removeEventListener('mousemove', mouseMoveListener);
      document.removeEventListener('mouseup', mouseUpListener);

      zoomOn.removeEventListener('wheel', wheelListener);
    };
  }, []);
  return (
    <div style={outerStyle} className={styles.outer} ref={outerRef}>
      <div className={styles.inner} ref={innerRef}>
        {children}
      </div>
    </div>
  );
};

export default DragZoomContainer;
