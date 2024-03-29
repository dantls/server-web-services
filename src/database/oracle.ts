import oracledb from 'oracledb';

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

export default class OracleDB {
  private static _instance: OracleDB;
  connectionParams: oracledb.PoolAttributes;
  pool!: oracledb.Pool;
  conected: Boolean = false;

  constructor() {
    console.log('Class initialized');

    this.connectionParams = {
      connectString: `${process.env.DB_ORACLE_HOST}/${process.env.DB_ORACLE_DB}`,
      user: process.env.DB_ORACLE_USER,
      password: process.env.DB_ORACLE_PASSWORD,
    };
  }

  static async execute(
    sql: string,
    bindParams?: oracledb.BindParameters,
    options?: oracledb.ExecuteOptions
  ) {
    let connection: oracledb.Connection | undefined;
    let result!: any;
    try {
      connection = await this._instance.pool?.getConnection();
      result = await connection?.execute(
        sql,
        bindParams ? bindParams : {},
        options ? options : {}
      );
      return result;
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  static async executeManyWithOptions(
    sql: string,
    binds: oracledb.BindParameters[],
    options?: oracledb.ExecuteManyOptions | oracledb.ExecuteOptions
  ) {
    let connection: oracledb.Connection | undefined;

    try {
      connection = await this._instance.pool?.getConnection();
      await connection?.executeMany(sql, binds, options ? options : {});
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  public static async instance() {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new this();
    await this._instance.createPool();
    return this._instance;
  }

  private async createPool() {
    // oracledb.initOracleClient({configDir: '../oracle/network/admin'});
    // only use for macOS
    oracledb.initOracleClient({
      libDir: 'C:\\instantclient_11_2',
    });
    oracledb.autoCommit = true;

    this.pool = await oracledb.createPool(this.connectionParams);
    this.conected = true;
    console.log('Pool created');
  }

  public async close() {
    if (this.conected === true) {
      try {
        await this.pool.close();
        this.conected = false;
        console.log('Disconnected');
      } catch (err) {
        console.error(err);
      }
    }
  }
}