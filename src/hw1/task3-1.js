import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

process.on('uncaughtException', err => {
  console.error('There was an uncaught error', err)
  process.exit(1)
});

const dataHandler = (data) => {
  const dataReverted = data.toString().trim().split('').reverse().join('');
  process.stdout.write(dataReverted);
};

rl.on('line', dataHandler);
