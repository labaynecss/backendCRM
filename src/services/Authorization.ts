import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/envConfig';

class Authorization {
  authorized(req: Request, res: Response, next: NextFunction): void {
    const headerToken = req.headers.authorization;
    
    if (headerToken) {
      const access_token = headerToken.split('Bearer ')[1];
      
      if (access_token) {
        try {
          const verified = jwt.verify(access_token, config.JWT_SECRET_KEY);

          if (verified) {
            next();
          } else {
            res.status(401).json({ errors: [{ msg: 'Please add a valid token' }] });
          }
        } catch (err) {
          res.status(401).json({ errors: [{ msg: 'Token verification failed' }] });
        }
      } else {
        res.status(401).json({ errors: [{ msg: 'Token format is incorrect' }] });
      }
    } else {
      res.status(401).json({ errors: [{ msg: 'Please add a token' }] });
    }
  }
}

export default new Authorization();
