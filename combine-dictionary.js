const fs = require('fs');
const path = require('path');

// Base directory where the dictionary files are located
const baseDir = '/Volumes/Samsung_T5/Yoruba Backup Files/Dictionary';

// Define the order of files to combine (alphabetical order)
const fileOrder = [
    'yoruba_words_a.md',
    'yoruba_words_b.md', 
    'yoruba_words_d.MD',
    'yoruba_words_e.MD',
    'yoruba_words_ẹ.MD',
    'yoruba_words_f.MD',
    'yoruba_words_g.MD',
    'yoruba_words_gb.MD',
    'yoruba_words_h.MD',
    'yoruba_words_i.MD',
    'yoruba_words_j.MD',
    'yoruba_words_k.MD',
    'yoruba_words_l.MD',
    'yoruba_words_m.MD',
    'yoruba_words_n.MD',
    'yoruba_words_o.MD',
    'yoruba_words_ọ.MD',
    'yoruba_words_p.MD',
    'yoruba_words_r.MD',
    'yoruba_words_s.MD',
    'yoruba_words_ṣ.MD',
    'yoruba_words_t.MD',
    'yoruba_words_u.MD',
    'yoruba_words_w.MD',
    'yoruba_words_y.MD'
];

// Output file name
const outputFile = 'full-yoruba-dictionary-a-y.md';

async function combineDictionaryFiles() {
    console.log('🚀 Starting Yoruba Dictionary Combination...');
    console.log(`📁 Reading files from: ${baseDir}`);
    console.log(`📄 Total files to combine: ${fileOrder.length}`);
    
    let combinedContent = '';
    let successfulFiles = 0;
    let failedFiles = 0;
    
    // Add header to the combined file
    combinedContent += `# Complete Yoruba Dictionary (A-Y)\n\n`;
    combinedContent += `*Combined from individual letter-based dictionary files*\n\n`;
    combinedContent += `---\n\n`;
    
    for (let i = 0; i < fileOrder.length; i++) {
        const fileName = fileOrder[i];
        const filePath = path.join(baseDir, fileName);
        
        console.log(`📖 Processing ${i + 1}/${fileOrder.length}: ${fileName}`);
        
        try {
            // Check if file exists
            if (!fs.existsSync(filePath)) {
                console.log(`❌ File not found: ${filePath}`);
                failedFiles++;
                continue;
            }
            
            // Read file content with UTF-8 encoding to handle Yoruba characters
            const fileContent = fs.readFileSync(filePath, 'utf8');
            
            // Add section header for this letter
            const letter = fileName.replace('yoruba_words_', '').replace('.md', '').replace('.MD', '');
            combinedContent += `## Letter ${letter.toUpperCase()}\n\n`;
            
            // Add the file content
            combinedContent += fileContent;
            
            // Add separator between sections
            combinedContent += `\n\n---\n\n`;
            
            successfulFiles++;
            console.log(`✅ Successfully processed: ${fileName}`);
            
        } catch (error) {
            console.log(`❌ Error processing ${fileName}: ${error.message}`);
            failedFiles++;
        }
    }
    
    // Write the combined content to output file
    try {
        fs.writeFileSync(outputFile, combinedContent, 'utf8');
        console.log(`\n🎉 Successfully created: ${outputFile}`);
        console.log(`📊 Summary:`);
        console.log(`   ✅ Successfully processed: ${successfulFiles} files`);
        console.log(`   ❌ Failed to process: ${failedFiles} files`);
        console.log(`   📄 Output file size: ${(combinedContent.length / 1024).toFixed(2)} KB`);
        
    } catch (error) {
        console.log(`❌ Error writing output file: ${error.message}`);
    }
}

// Run the script
combineDictionaryFiles().catch(console.error); 