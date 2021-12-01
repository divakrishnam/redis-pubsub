const Redis = require('ioredis');

const redis = new Redis(6379, 'localhost');

async function simple() {
  const key = 'cat';
  try {
    await redis.set(key, 'Garfield');
    const result = await redis.get(key);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
  redis.disconnect();
}

async function increment() {
  const key = 'team1';
  try {
    const points = await redis.incr(key);
    console.log(points);
  } catch (error) {
    console.error(error);
  }
  redis.disconnect();
}

async function decrement() {
  const key = 'team1';
  try {
    const points = await redis.decr(key);
    console.log(points);
  } catch (error) {
    console.error(error);
  }
  redis.disconnect();
}

async function push() {
  const key = 'veggies';
  const vegetable = 'tomato';
  try {
    await redis.rpush(key, vegetable);
    const result = await redis.lrange(key, 0, -1);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
  redis.disconnect();
}

async function pushs() {
  const key = 'veggies';
  const veggies = ['tomato', 'corn', 'eggplant'];
  try {
    await redis.rpush(key, ...veggies);
    const result = await redis.lrange(key, 0, -1);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
  redis.disconnect();
}

async function pop() {
  const key = 'veggies';
  try {
    const veggie = await redis.rpop(key);
    console.log(veggie);
    const result = await redis.lrange(key, 0, -1);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
  redis.disconnect();
}

async function hashSet() {
  const shamu = {
    type: 'killer whale',
    age: 5,
    lastFeedDate: 'Jan 06 2018',
  };

  try {
    const key = 'shamu';

    for (const prop in shamu) {
      await redis.hset(key, prop, shamu[prop]);
    }
    const result = await redis.hgetall(key);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
  redis.disconnect();
}

async function hashMSet() {
  const shamu = {
    type: 'killer whale',
    age: 5,
    lastFeedDate: 'Jan 06 2018',
  };

  try {
    const key = 'shamu';
    await redis.hmset(key, shamu);
    const result = await redis.hgetall(key);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
  redis.disconnect();
}

async function hashString() {
  const shamu = {
    type: 'killer whale',
    age: 5,
    lastFeedDate: 'Jan 06 2018',
    size: { length: 30, weight: 8 },
  };

  try {
    const key = 'shamu';
    const result = await redis.set(key, JSON.stringify(shamu));

    // Turn around and bring back Shamu immediately to prove it works.
    const shamuReturns = JSON.parse(await redis.get(key));
    console.log(shamuReturns);
  } catch (error) {
    console.error(error);
  }
  redis.disconnect();
}

redis.connect(() => console.log('Connected to Redis server'));

// simple();
// increment();
// decrement();
// push()
// pushs()
// pop();

// BAD WAY
// hashSet();
hashMSet();

// BEST WAY
// hashString();
