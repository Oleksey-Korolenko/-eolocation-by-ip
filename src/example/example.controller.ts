import { Request, Response, Router } from 'express';
import sendAnswer from '../common/response';
import ExampleService from './example.service';
import validate from './example.validator';

export default (router: typeof Router) => {
  const routes = router();

  const exampleService = new ExampleService();

  routes.post('/example', (req: Request, res: Response) => {
    const reqData = validate.exampleValidate.example(req.body.payload);

    const response = ExampleService.example(reqData);

    return sendAnswer(
      200,
      {
        response,
      },
      res
    );
  });

  return routes;
};
