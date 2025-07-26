import React from 'react';
import Joyride, { CallBackProps, Step } from 'react-joyride';

export const walkthroughSteps: Step[] = [
  {
    target: '.game-board',
    title: 'Game Board',
    content: 'This is where your word guesses appear. Each row represents one guess attempt. Green means correct position, purple means right letter but wrong position!',
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '.keyboard-container',
    title: 'Yorùbá Keyboard',
    content: 'Use this keyboard to type authentic Yorùbá words. Notice the special characters like ẹ, ọ, ṣ, and tonal marks like à, é!',
    placement: 'top',
    disableBeacon: true,
  },
  {
    target: '[data-tour="new-game"]',
    title: 'New Game',
    content: 'Click here anytime to restart with a fresh word. Perfect for practice or when you want to try a different difficulty!',
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '[data-tour="statistics"]',
    title: 'Statistics',
    content: 'Track your progress here! See your win rate, current streak, guess distribution, and detailed game history.',
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '[data-tour="settings"]',
    title: 'Settings',
    content: 'Customise your experience! Change word length (2-7 letters), toggle helpful hints like tonal accents, and adjust difficulty.',
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '[data-tour="help"]',
    title: 'Help & Hints',
    content: 'Get hints about the current word, learn game rules, see the word\'s meaning, and restart this walkthrough anytime!',
    placement: 'bottom',
    disableBeacon: true,
  },
];

interface GameWalkthroughProps {
  run: boolean;
  stepIndex: number;
  steps?: Step[];
  callback: (data: CallBackProps) => void;
}

const joyrideStyles = {
  options: {
    primaryColor: '#7c3aed',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    zIndex: 10000,
    borderRadius: 12,
  },
  tooltip: {
    fontSize: 16,
    padding: 20,
    borderRadius: 12,
  },
  tooltipTitle: {
    color: '#7c3aed',
    fontWeight: 700,
    fontSize: 20,
  },
  buttonNext: {
    backgroundColor: '#7c3aed',
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    minHeight: 44,
    minWidth: 44,
  },
  buttonBack: {
    color: '#7c3aed',
    fontSize: 14,
    minHeight: 44,
    minWidth: 44,
  },
  buttonSkip: {
    color: '#6b7280',
    fontSize: 14,
    minHeight: 44,
    minWidth: 44,
  },
};

export default function GameWalkthrough({ run, stepIndex, steps = walkthroughSteps, callback }: GameWalkthroughProps) {
  return (
    <Joyride
      steps={steps}
      run={run}
      stepIndex={stepIndex}
      continuous
      showSkipButton
      showProgress
      disableOverlayClose
      hideCloseButton={false}
      styles={joyrideStyles}
      locale={{
        back: 'Previous',
        close: 'Close',
        last: 'Finish',
        next: 'Next',
        skip: 'Skip All',
      }}
      callback={callback}
      floaterProps={{
        hideArrow: false,
        placement: 'auto',
        offset: 15,
      }}
      spotlightClicks={true}
    />
  );
} 