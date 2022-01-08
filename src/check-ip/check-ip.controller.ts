import { Request, Response, Router } from 'express';
import { sendResponse } from '../common/response';
import CheckIpService from './check-ip.service';

export default (router: typeof Router) => {
  const routes = router();

  const exampleService = new CheckIpService();

  routes.post('/example', (req: Request, res: Response) => {
    const response = CheckIpService.example('');

    return sendResponse<string>(200, '', res);
  });

  return routes;
};
