import stripe from 'stripe';
import { getAppSettings } from '../../database/appSettings';
import config from '../../config';

const connectWithAppSettings = (mode) => (appSettings) =>
  stripe(appSettings[`stripe_${mode}_secret_key`], config.stripeApiVersion);

const connect = () => getAppSettings().then(connectWithAppSettings(config.stripeEnv));

let STRIPE;

const getConnectInstance = () => {
  if (STRIPE) {
    return STRIPE
  }

  STRIPE = connect()

  return STRIPE
}

export default () => getConnectInstance()
