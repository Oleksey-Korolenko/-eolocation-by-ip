import * as fs from 'fs';
import path from 'path';
import * as readline from 'readline';
import { IResponse } from '../common/interface';

export default class CheckIpService {
  public checkIp = async (ip: string): Promise<IResponse<string>> => {
    const ipHowNumber = +ip
      .split('.')
      .reduce(
        (prev: string, next: string, index: number): string =>
          `${Math.pow(256, Math.abs(index - 3)) * +next + +prev}`,
        '0'
      );

    const jsonPath = path.join(`${process.env.APP_ROOT}`, 'files', 'ips.CSV');

    const ipInfo: string | undefined = await new Promise((resolve) => {
      const readInterface = readline.createInterface({
        input: fs.createReadStream(jsonPath),
      });

      let response: string | undefined;

      readInterface.on('line', (line: string) => {
        const ipArray: string[] = line
          .split(',')
          .map((it) => it.split('"').join(''));

        if (ipHowNumber >= +ipArray[0] && ipHowNumber <= +ipArray[1]) {
          response = ipArray[3] ?? '-';
          readInterface.close();
        }
      });

      readInterface.on('error', () => resolve(response));

      readInterface.on('close', () => {
        resolve(response);
      });
    });

    let response: string | undefined;

    switch (ipInfo) {
      case '-': {
        response = `IP-адресс (${ip}) находиться вне пределов стран`;
        break;
      }
      case undefined: {
        response = `IP-адресс (${ip}) неизвестного формата, мы не можем его определить`;
        break;
      }
      default: {
        response = `${ipInfo} — ${ip}`;
        break;
      }
    }

    return {
      message: 'Everithing is correct!',
      data: response,
    };
  };
}
