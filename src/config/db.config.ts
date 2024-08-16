export const config = {
  HOST: "dbs-psql-001.postgres.database.azure.com",
  USER: "psqladmin001",
  PASSWORD: "Welcome@123",
  DB: "resumetrackingapplication",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

export const dialect = "postgres";
