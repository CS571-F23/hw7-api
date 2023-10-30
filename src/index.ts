import fs from 'fs'

import express, { Express } from 'express';

import { CS571Initializer } from '@cs571/f23-api-middleware'
import BakedGood from './model/baked-good';
import { CS571GoodsRoute } from './routes/goods';

console.log("Welcome to HW7!");

const app: Express = express();

const appBundle = CS571Initializer.init(app, {
  allowNoAuth: [],
  skipAuth: false
});

const parsedGoods = JSON.parse(fs.readFileSync("includes/_goods.json").toString())
const goods = parsedGoods.map((good: any) => new BakedGood(
  good.name,
  good.price,
  good.upperLimit,
  good.imgSrc
));


appBundle.router.addRoutes([
  new CS571GoodsRoute(goods)
])

app.listen(appBundle.config.PORT, () => {
  console.log(`Running at :${appBundle.config.PORT}`);
});
