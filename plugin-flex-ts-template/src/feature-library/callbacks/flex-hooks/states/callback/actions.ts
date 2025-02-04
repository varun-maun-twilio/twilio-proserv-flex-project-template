import * as Flex from '@twilio/flex-ui';
import { Action } from '../../../../../flex-hooks/states'
import CallbackService from '../../../utils/callback/CallbackService'
import { INITIATE_CALLBACK } from './types';


// Provide task to "pending" action as payload
// https://github.com/pburtchaell/redux-promise-middleware/blob/main/docs/guides/optimistic-updates.md

class Actions {

  public static callCustomer = (task: Flex.ITask): Action => {
    return {
      type: INITIATE_CALLBACK,
      payload: {
        promise: CallbackService.callCustomerBack(task, 0),
        data: task
      }
    };
  };
};

export default Actions;
