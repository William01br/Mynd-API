import * as path from 'node:path';
import moduleAlias from 'module-alias';

const files = path.resolve(__dirname, '../..');

moduleAlias.addAlias('@src', path.join(files, 'src'));
