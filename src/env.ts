const { REACT_APP_ENV: ENV = 'development' } = process.env;

export default function env(key: string): string | undefined {
  return process.env[`REACT_APP_${ENV.toUpperCase()}_${key}`];
}
