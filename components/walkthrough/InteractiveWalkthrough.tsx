import React, { useEffect, useRef, useState } from 'react';
import Joyride, { CallBackProps, Step } from 'react-joyride';

const steps: Step[] = [
  {
    target: '[data-tour="new-game"]',
    title: 'New Game',
    content: 'Start a fresh game anytime. Perfect for practising or trying different word lengths!',
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '[data-tour="settings"]',
    title: 'Settings',
    content: 'Customise your experience! Change word length (3-7 letters) and toggle helpful hints.',
    placement: 'bottom',
  },
  {
    target: '[data-tour="statistics"]',
    title: 'Statistics',
    content: 'Track your progress, win streaks, and see detailed game history.',
    placement: 'bottom',
  },
  {
    target: '[data-tour="help"]',
    title: 'Help & Hints',
    content: 'Get hints about the current word, learn game rules, and reveal tonal accents.',
    placement: 'bottom',
  },
];

export default function InteractiveWalkthrough() {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [showed, setShowed] = useState(false);

  // Auto-start if landing page set flag
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('startWalkthrough') === 'true') {
        setRun(true);
        setStepIndex(0);
        localStorage.removeItem('startWalkthrough');
      } else if (!localStorage.getItem('walkthroughCompleted') && !showed) {
        // Optionally, prompt first-time users
        // setRun(true);
      }
    }
  }, [showed]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, index, type } = data;
    if (['finished', 'skipped'].includes(status)) {
      setRun(false);
      setStepIndex(0);
      if (typeof window !== 'undefined') {
        localStorage.setItem('walkthroughCompleted', 'true');
      }
    } else if (type === 'step:after' || type === 'error:target_not_found') {
      setStepIndex(index + 1);
    }
  };

  // Expose manual start (for Help modal, etc.)
  (window as any).startWalkthrough = () => {
    setRun(true);
    setStepIndex(0);
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      stepIndex={stepIndex}
      continuous
      showSkipButton
      showProgress
      disableScrolling={false}
      styles={{
        options: {
          primaryColor: '#7c3aed', // purple-600
          zIndex: 10000,
        },
        buttonNext: { backgroundColor: '#7c3aed', color: '#fff' },
        buttonBack: { color: '#7c3aed' },
        buttonSkip: { color: '#7c3aed' },
        tooltip: { borderRadius: 12, padding: 16, fontSize: 16 },
        tooltipTitle: { fontWeight: 700, fontSize: 20, color: '#7c3aed' },
        tooltipContent: { fontSize: 16 },
      }}
      locale={{
        back: 'Previous',
        close: 'Close',
        last: 'Finish',
        next: 'Next',
        skip: 'Skip All',
      }}
      callback={handleJoyrideCallback}
      spotlightClicks={true}
    />
  );
} 