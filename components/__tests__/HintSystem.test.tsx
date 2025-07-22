import { render, screen, fireEvent } from '@testing-library/react';
import HintSystem from '@/components/wordle/HintSystem';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';

describe('HintSystem', () => {
  const hintProps = {
    partOfSpeech: 'noun',
    englishTranslation: 'anger',
    additionalInfo: 'A state of annoyance',
  };

  it('is accessible', async () => {
    const { container } = render(<HintSystem {...hintProps} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('initially renders a "Need a Hint?" button', () => {
    render(<HintSystem {...hintProps} />);
    expect(screen.getByRole('button', { name: /need a hint/i })).toBeInTheDocument();
  });

  it('reveals hints when the button is clicked', () => {
    render(<HintSystem {...hintProps} />);
    const hintButton = screen.getByRole('button', { name: /need a hint/i });
    fireEvent.click(hintButton);
    
    expect(screen.getByText('Hints')).toBeInTheDocument();
    expect(screen.getByLabelText(/part of speech/i)).toBeInTheDocument();
  });

  it('toggles the visibility of individual hints', () => {
    render(<HintSystem {...hintProps} />);
    fireEvent.click(screen.getByRole('button', { name: /need a hint/i }));

    const partOfSpeechToggle = screen.getByLabelText(/part of speech/i);
    fireEvent.click(partOfSpeechToggle);
    expect(screen.getByText(hintProps.partOfSpeech)).toBeInTheDocument();

    fireEvent.click(partOfSpeechToggle);
    expect(screen.queryByText(hintProps.partOfSpeech)).not.toBeInTheDocument();
  });
}); 