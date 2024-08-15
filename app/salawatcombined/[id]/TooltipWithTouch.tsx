import { Tooltip } from "@chakra-ui/react";
import { ReactNode, useState } from "react";

const TooltipWithTouch = ({
    children,
    ...restToolTipProps
  }: {
    children: ReactNode;
    [key: string]: any;
  }) => {
    const [isLabelOpen, setIsLabelOpen] = useState(false);
  
    return (
      <Tooltip isOpen={isLabelOpen} {...restToolTipProps} placement="top">
        <span
          onMouseEnter={() => setIsLabelOpen(true)}
          onMouseLeave={() => setIsLabelOpen(false)}
          onClick={() => setIsLabelOpen(true)}
        >
          {children}
        </span>
      </Tooltip>
    );
  };
  export default TooltipWithTouch