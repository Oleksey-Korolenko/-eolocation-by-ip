import _ from 'lodash';

const exampleFields = ['example'];

class ExampleValidate {
  example = (payload: any) => {
    return _.pick(payload, exampleFields);
  };
}

export default {
  exampleValidate: new ExampleValidate(),
  ExampleValidate,
  exampleFields,
};
