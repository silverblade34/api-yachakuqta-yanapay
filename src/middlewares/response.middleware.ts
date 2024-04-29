import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ResponseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Intercepta la respuesta antes de que se envíe al cliente
    res.locals.response = (message: any, data: any, status: boolean = true, return_status: number = 200) => {
      const responseObj = { message, data, status };
      res.status(return_status).json(responseObj);
    };
    next();
  }
}
