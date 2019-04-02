module.exports = {
  synchronize: false,
  type: "postgres",
  entities: ["src/**/*.model.ts"],
  migrations: ["src/migrations/**/*.ts"],
  cli: {
    migrationsDir: "./src/migrations"
  }
};
