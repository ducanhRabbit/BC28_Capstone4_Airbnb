import React, { useEffect, useState } from 'react';

type Props = {
  Component: JSX.Element;
  ComponentMobile: JSX.Element | undefined;
};
type Screen = {
  width: number;
  height: number;
};

export default function ResponsiveItem({ Component, ComponentMobile }: Props): JSX.Element {
  const [screen, setScreen] = useState<Screen>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleOnResize = () => {
      setScreen({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    console.log(screen.width);

    window.onresize = handleOnResize;
    return () => {
      window.removeEventListener('resize', handleOnResize);
    };
  }, []);
  if (screen.width <= 768 && ComponentMobile) {
    return ComponentMobile;
  }
  return Component;
}
