-- Yorùbá Word Master: Add difficulty_level to dictionary tables

-- Add difficulty_level column (default 'intermediate')
ALTER TABLE dictionary_ai ADD COLUMN difficulty_level VARCHAR(12) DEFAULT 'intermediate';
ALTER TABLE dictionary_jz ADD COLUMN difficulty_level VARCHAR(12) DEFAULT 'intermediate';

-- Create indexes for filtering
CREATE INDEX idx_dictionary_ai_difficulty ON dictionary_ai(difficulty_level);
CREATE INDEX idx_dictionary_jz_difficulty ON dictionary_jz(difficulty_level);

-- (Optional) Add a CHECK constraint for allowed values
-- ALTER TABLE dictionary_ai ADD CONSTRAINT chk_ai_difficulty CHECK (difficulty_level IN ('easy', 'intermediate', 'advanced'));
-- ALTER TABLE dictionary_jz ADD CONSTRAINT chk_jz_difficulty CHECK (difficulty_level IN ('easy', 'intermediate', 'advanced')); 