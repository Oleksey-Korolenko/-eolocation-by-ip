import { Request, Response, Router } from 'express';
import { IResponse } from '../common/interface';
import { sendResponse } from '../common/response';
import { asyncHandler } from '../middlewares';
import CheckIpService from './check-ip.service';

export default (router: typeof Router) => {
  const routes = router();

  const checkIpService = new CheckIpService();

  routes.get(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
      const response = await checkIpService.checkIp(
        req.ip.split(':').pop() ?? ''
      );

      return sendResponse<IResponse<string>>(200, response, res);
    })
  );

  return routes;
};
