module.exports = {
  remoteDB: process.env.REMOTE_DB || false,
  api: {
    port: process.env.API_PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "secreto",
  },
  mysql: {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASS || "",
    database: process.env.MYSQL_DB || "combiapp",
  },
  mysqlService: {
    host: process.env.MYSQL_SRV_HOST || "localhost",
    port: process.env.MYSQL_SRV_PORT || 3001,
  },
  cacheService: {
    host: process.env.MYSQL_SRV_HOST || "localhost",
    port: process.env.MYSQL_SRV_PORT || 3002,
  },
  redis: {
    host:
      process.env.REDIS_HOST ||
      "redis-13627.c114.us-east-1-4.ec2.cloud.redislabs.com",
    port: process.env.PORT || "13627",
    password: process.env.REDIS_PASSWORD || "UOSJZi2Ib9wQdz6wN8RXy1pv5mBLraP8",
  },
};
