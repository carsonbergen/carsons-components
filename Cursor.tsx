'use client';
import useMediaQuery from '@/lib/mediaQuery';
import React, { useState, useEffect } from 'react';
import { HiQuestionMarkCircle } from 'react-icons/hi2';
import { PiSmileyBold, PiSmileyXEyesBold } from 'react-icons/pi';

function approx(value1: number, value2: number, threshold: number): boolean {
  const difference = Math.abs(value1 - value2);
  return difference <= threshold;
}

export default function Cursor(props: { display: boolean, itemHovered: string | null }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [mouseOffScreen, setMouseOffScreen] = useState<boolean>(false);
  const [caughtMouse, setCaughtMouse] = useState<boolean>(false);
  const speed = 0.05;

  const handleMouseMove = (e: MouseEvent) => {
    const xPos = e.clientX;
    const yPos = e.clientY;
    const margin = 25;

    if (xPos - margin < 0 || xPos > window.innerWidth - margin || yPos - margin < 0 || yPos > window.innerHeight - margin) {
      setMouseOffScreen(true);
    } else {
      setMouseOffScreen(false);
    }

    setTargetPosition({ x: xPos, y: yPos });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const updatePosition = () => {
    if (mouseOffScreen) {
      setTargetPosition({ x: window.innerWidth / 2, y: window.innerHeight / 1.25 })
    }

    const dx = targetPosition.x - position.x;
    const dy = targetPosition.y - position.y;

    const newX = position.x + dx * speed;
    const newY = position.y + dy * speed;

    setPosition({ x: newX, y: newY });
  };

  useEffect(() => {
    requestAnimationFrame(updatePosition);
    if (approx(position.x, targetPosition.x, 25) && approx(position.y, targetPosition.y, 25)) {
      setCaughtMouse(true);
    } else {
      setCaughtMouse(false);
    }

  }, [position, targetPosition]);

  return (
    <>
      <div
        className={`fixed z-[9999] ease-in-out transition-opacity duration-300 pointer-events-none mix-blend-exclusion`} // ${caughtMouse ? `opacity-25` : `opacity-100`}
        style={{
          left: `${position.x - 20}px`,
          top: `${position.y - 20}px`
        }}
      >
        <div className={`
          w-12 h-12 flex justify-center 
          font-eb-garamond items-center 
          border-primary bg-primary text-secondary 
          border-2 rounded-full mix-blend-exclusion

        `}>
          {/* {props.itemHovered} */}
        </div>
      </div>
    </>

  );
};

// ${ !props.itemHovered || !props.display ? 'text-opacity-0' : 'text-opacity-100'}
// transition-all duration-500