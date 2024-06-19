import dotenv from 'dotenv';

dotenv.config();

interface Config {
 
  JWT_SECRET_KEY: string;
}

const config: Config = {
  
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY|| 'defaultsecret',
};

export default config;
