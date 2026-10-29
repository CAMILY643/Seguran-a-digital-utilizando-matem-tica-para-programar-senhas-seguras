const passwordInput = document.getElementById('password-input');
const alphabetSizeEl = document.getElementById('alphabet-size');
const passwordLengthEl = document.getElementById('password-length');
const combinationsEl = document.getElementById('combinations');
const entropyEl = document.getElementById('entropy');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');

passwordInput.addEventListener('input', () => {
  const password = passwordInput.value;
  if (!password) {
    resetMetrics();
    return;
  }

  const L = password.length;
  const N = calculateAlphabetSize(password);
  
  // Cálculo de combinações N^L
  const combinations = BigInt(N) ** BigInt(L);
  
  // Cálculo da Entropia: E = L * log2(N)
  const entropy = N > 0 ? (L * Math.log2(N)).toFixed(2) : 0;

  // Atualização dos elementos da interface
  alphabetSizeEl.textContent = N;
  passwordLengthEl.textContent = L;
  combinationsEl.textContent = combinations.toLocaleString('pt-BR');
  entropyEl.textContent = `${entropy} bits`;

  updateStrengthUI(entropy);
});

function calculateAlphabetSize(pwd) {
  let size = 0;
  if (/[a-z]/.test(pwd)) size += 26; // Letras minúsculas
  if (/[A-Z]/.test(pwd)) size += 26; // Letras maiúsculas
  if (/[0-9]/.test(pwd)) size += 10; // Números
  if (/[^a-zA-Z0-9]/.test(pwd)) size += 32; // Símbolos especiais
  return size;
}

function updateStrengthUI(entropy) {
  let width = 0;
  let color = '#ef4444';
  let text = 'Muito Fraca (Fácil de quebrar por força bruta)';

  if (entropy > 28 && entropy <= 36) {
    width = 25;
    color = '#f97316';
    text = 'Fraca';
  } else if (entropy > 36 && entropy <= 60) {
    width = 50;
    color = '#eab308';
    text = 'Média';
  } else if (entropy > 60 && entropy <= 128) {
    width = 75;
    color = '#22c55e';
    text = 'Forte';
  } else if (entropy > 128) {
    width = 100;
    color = '#06b6d4';
    text = 'Muito Forte (Matematicamente inviável de quebrar)';
  } else {
    width = 10;
  }

  strengthBar.style.width = `${width}%`;
  strengthBar.style.backgroundColor = color;
  strengthText.textContent = text;
}

function resetMetrics() {
  alphabetSizeEl.textContent = '0';
  passwordLengthEl.textContent = '0';
  combinationsEl.textContent = '0';
  entropyEl.textContent = '0 bits';
  strengthBar.style.width = '0%';
  strengthText.textContent = 'Digite algo para analisar.';
}