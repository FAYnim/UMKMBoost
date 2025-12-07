// Frontend: tidak perlu API key lagi
async function callAI(prompt, instructionsFile, contentGoal) {
  const body = { prompt };
  if (instructionsFile) body.instructionsFile = instructionsFile; 
  if (contentGoal) body.contentGoal = contentGoal; 

  const response = await fetch('/.netlify/functions/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const { error } = await response.json();
    
    // chek kuota limit
    if (error && (error.includes('429') || error.includes('quota') || error.includes('RESOURCE_EXHAUSTED'))) {
    }
    
    throw new Error(error || 'Gagal memanggil AI');
  }

  const { output, warning } = await response.json();
  
  // Log if production API key was used
  if (warning) {
  }
  
  return output;
}

// Make function globally accessible
window.callAI = callAI;
