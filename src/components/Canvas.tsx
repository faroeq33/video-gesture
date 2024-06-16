import { forwardRef, RefObject } from "react";

type CanvasProps = {
  children?: React.ReactNode;
  width: number;
  height: number;
};
const Canvas = forwardRef(function Canvas(
  props: CanvasProps,
  ref: RefObject<HTMLCanvasElement>
) {
  return (
    <canvas ref={ref} {...props}>
      {props.children}
    </canvas>
  );
});
export default Canvas;
