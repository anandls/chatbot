const devConfig = {
  MONGO_URL: "mongodb://localhost:27017/chatbot_db-dev001",
  JWT_SECRET: process.env.JWT_SECRET,
};
const testConfig = {
  MONGO_URL: "mongodb://localhost:27017/chatbot_db-test001",
};
const prodConfig = {
  MONGO_URL: "mongodb://localhost:27017/chatbot_db-prod001",
  JWT_SECRET: process.env.JWT_SECRET,
};
const defaultConfig = {
  PORT: process.env.PORT || 8083,
};

function envConfig(env) {
  switch (env) {
    case "development":
      return devConfig;
    case "test":
      return testConfig;
    default:
      return prodConfig;
  }
}

export default { ...defaultConfig, ...envConfig(process.env.NODE_ENV) };
