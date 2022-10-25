/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process');
const { TestEnvironment }= require('jest-environment-node');
const { resolve } = require('path');
const { Client } = require('pg');
const { v4: uuid } = require('uuid');

const prismaCli = './node_modules/.bin/prisma';

require('dotenv').config({
  path: resolve(__dirname, '..', '.env.test'),
});

class CustomEnvironment extends TestEnvironment {
  constructor({ globalConfig, projectConfig }) {
    super({ globalConfig, projectConfig });
    this.schema = `code_schema_${uuid()}`;
    this.connectionString = `${process.env.DATABASE_URL}${this.schema}`;
  }

  setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    execSync(`${prismaCli} migrate dev`);
  }

  async teardown() {
    const client = new Client({
      connectionString: this.connectionString,
    });

    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await client.end();
  }
}

module.exports = CustomEnvironment;