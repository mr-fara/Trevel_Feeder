import {hash} from 'bcryptjs';
import {emitKeypressEvents} from 'node:readline';

if (!process.stdin.isTTY || !process.stdin.setRawMode) {
  console.error('Run this command in an interactive terminal so the password can be entered without echoing.');
  process.exit(1);
}

emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdout.write('Admin password: ');

let password = '';
process.stdin.on('keypress', async (character: string, key: {name?: string; ctrl?: boolean}) => {
  if (key.ctrl && key.name === 'c') {
    process.stdout.write('\n');
    process.exit(130);
  }
  if (key.name === 'return' || key.name === 'enter') {
    process.stdin.setRawMode(false);
    process.stdin.pause();
    process.stdout.write('\n');
    if (password.length < 12) {
      console.error('Use at least 12 characters.');
      process.exitCode = 1;
      return;
    }
    console.log(await hash(password, 12));
    password = '';
    return;
  }
  if (key.name === 'backspace') {
    password = password.slice(0, -1);
    return;
  }
  if (!key.ctrl && character) password += character;
});
