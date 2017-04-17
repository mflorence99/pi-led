import * as chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import * as replaceStream from 'replacestream';
import * as yargs from 'yargs';

const argv = yargs.argv;

if (argv.client)
  apply(path.join(__dirname, './client', 'index.html'),
        path.join(__dirname, './client', 'home.html'));

else if (argv.server) {
  const stream = remove(path.join(__dirname, './dist', 'home.html'),
                        path.join(__dirname, './dist', 'temp.html'));
  stream.on('finish', () => {
    apply(path.join(__dirname, './dist', 'temp.html'),
          path.join(__dirname, './dist', 'home.html'));
  });
}

function apply(src: string,
               dest: string) {
  console.log(chalk.cyan('Homify apply'), `${src} => ${dest}`);
  const env = Object.keys(process.env)
    .filter(k => ['PS1', 'PS2'].indexOf(k) === -1)
    .reduce((acc, k) => {
      const redacted = k.includes('SECRET') || k.includes('PASSWORD');
      const v = redacted? 'redacted' : process.env[k];
      acc[k] = v;
      return acc;
    }, {});
  const search = '</head>';
  const replace = `<script>ENV = ${JSON.stringify(env)};</script></head>`;
  return write(src, dest, search, replace);
};

function remove(src: string,
                dest: string) {
  console.log(chalk.cyan('Homify remove'), `${src} => ${dest}`);
  const search = /<script>ENV.+<\/script><\/head>/;
  const replace = '</head>';
  return write(src, dest, search, replace);
};

function write(src: string,
               dest: string,
               search: RegExp | string,
               replace: string) {
  const reader = fs.createReadStream(src);
  const writer = fs.createWriteStream(dest);
  return reader.pipe(replaceStream(search, replace)).pipe(writer);
}
