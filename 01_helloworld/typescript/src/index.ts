// ------------------------------------------------------------------
// HOST CONFIGURATION
// ------------------------------------------------------------------

// ExpressJS (Jovo Webhook)
import {app} from './app';
import {ExpressJS, Lambda, Webhook} from 'jovo-framework';

if (process.argv.indexOf('--webhook') > -1) {
    const port = process.env.JOVO_PORT || 3000;
    Webhook.jovoApp = app;

    Webhook.listen(port, () => {
        console.info(`Local server listening on port ${port}.`);
    });

    Webhook.post('/webhook', async (req: Express.Request, res: Express.Response) => {
        await app.handle(new ExpressJS(req, res));
    });
}

// AWS Lambda
export const handler = async (event: any, context: any, callback: () => any) => {
    await app.handle(new Lambda(event, context, callback));
};