-- This script automates the creation of a new keyboard layout bundle using Ukelele.

-- Activate Ukelele to make sure it's the frontmost application
tell application "Ukelele"
	activate
end tell

tell application "System Events"
	tell process "Ukelele"
		
		-- 1. Create a new layout from the current input source (e.g., U.S.)
		-- File -> New From Current Input Source
		click menu item "New From Current Input Source" of menu "File" of menu bar 1
		delay 1 -- Wait a moment for the new window to appear
		
		-- 2. Set the keyboard name
		-- Keyboard -> Set Keyboard Name...
		click menu item "Set Keyboard Name…" of menu "Keyboard" of menu bar 1
		delay 0.5
		
		-- Enter the name "Yoruba - Wisdom Deck"
		keystroke "Yoruba - Wisdom Deck"
		click button "OK" of window 1
		delay 0.5
		
		-- 3. Save the layout as a bundle
		-- File -> Save As Bundle...
		click menu item "Save As Bundle…" of menu "File" of menu bar 1
		delay 0.5
		
		-- Name the bundle file and save it to the Desktop
		-- Note: This assumes the save dialog opens to a writable location.
		-- We will save it to the Desktop for easy access.
		keystroke "Yoruba (Wisdom Deck)"
		
		-- Navigate to the Desktop
		keystroke "D" using {command down, shift down}
		delay 0.5
		
		-- Confirm the save
		click button "Save" of window "Save"
		delay 1
		
	end tell
end tell

-- 4. Quit Ukelele
tell application "Ukelele"
	quit
end tell 