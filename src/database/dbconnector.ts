import {Pool} from 'pg';

export default new Pool ({
  max: 20,
  connectionString: 'postgres://postgres:master@localhost:5432/expedicao',
  idleTimeoutMillis: 30000
});

