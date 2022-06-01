export default {
  user          : process.env.DB_ORACLE_USER,
  password      : process.env.DB_ORACLE_PASSWORD,
  connectString : `${process.env.DB_ORACLE_HOST}/${process.env.DB_ORACLE_DB}`
};