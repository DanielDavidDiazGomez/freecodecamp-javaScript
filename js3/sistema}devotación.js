// Sistema de votacion construido con Map (para la encuesta) y Set (para evitar votos duplicados)
 
const poll = new Map();
 
function addOption(option) {
  if (!option || option.trim() === '') {
    return 'Option cannot be empty.';
  }
 
  if (poll.has(option)) {
    return `Option "${option}" already exists.`;
  }
 
  poll.set(option, new Set());
  return `Option "${option}" added to the poll.`;
}
 
function vote(option, voterId) {
  if (!poll.has(option)) {
    return `Option "${option}" does not exist.`;
  }
 
  const voters = poll.get(option);
 
  if (voters.has(voterId)) {
    return `Voter ${voterId} has already voted for "${option}".`;
  }
 
  voters.add(voterId);
  return `Voter ${voterId} voted for "${option}".`;
}
 
function displayResults() {
  let output = 'Poll Results:';
 
  poll.forEach((voters, option) => {
    output += `\n${option}: ${voters.size} votes`;
  });
 
  return output;
}
 
// --- Datos de partida: al menos tres opciones y al menos tres votos ---
addOption('Turkey');
addOption('Morocco');
addOption('Spain');
 
vote('Turkey', 'voter1');
vote('Turkey', 'voter2');
vote('Morocco', 'voter3');
 
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { poll, addOption, vote, displayResults };
}
