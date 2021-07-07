import { Context, HttpRequest } from "@azure/functions";

// import addDays from 'date-fns/addDays/index.js';

export default async function handler(
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("From TypeScript 👌");

  const name = req.query.name || (req.body && req.body.name);
  const responseMessage = name
    ? "Hello, " +
      name +
      ". This HTTP triggered function executed successfully. And yes, compiled from TypeScript."
    : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage,
  };
}
