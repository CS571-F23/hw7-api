import { Express } from 'express';

import { CS571Route } from "@cs571/f23-api-middleware/src/interfaces/route";
import BakedGood from '../model/baked-good';

export class CS571GoodsRoute implements CS571Route {

    public static readonly ROUTE_NAME: string = '/goods';

    private readonly goods: BakedGood[];
    private readonly presentableGoods: any;

    public constructor(goods: BakedGood[]) {
        this.goods = goods;
        this.presentableGoods = goods.reduce((acc: any, curr: BakedGood) => {
            return {
                ...acc,
                [curr.id]: {
                    name: curr.name,
                    price: curr.price,
                    imgSrc: curr.imgSrc,
                    upperLimit: curr.upperLimit
                }
            }
        }, {})
    }

    public addRoute(app: Express): void {
        app.get(CS571GoodsRoute.ROUTE_NAME, (req, res) => {
            res.status(200).set('Cache-control', 'private, max-age=60').send(this.presentableGoods);
        })
    }

    public getRouteName(): string {
        return CS571GoodsRoute.ROUTE_NAME;
    }
}