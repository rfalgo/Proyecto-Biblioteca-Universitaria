const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://biblioteca_user:A23vGnM1ZUmMVtnmxOhbVs8A9LmMGE76@dpg-d88rpdegvqtc73bdsdmg-a.virginia-postgres.render.com/biblioteca_bw27",
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;