import { createClient } from 'redis'

export const redisClient = createClient({
  password: process.env.REDIS_PASSWORD as string,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string),
  },
});

redisClient
  .connect()
  .then(() => console.log(`connected to redis`))
  .catch((error) =>
    console.error(`redis connection fails :: ${error}`)
  );