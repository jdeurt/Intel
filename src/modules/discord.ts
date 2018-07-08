import * as config from 'config';
import * as request from 'request';
/**
 * Posts a string to the HLPugs.tf Discord server as a webhook message.
 * @module Discord
 * @param {string} message - The message to send.
 * @param {string} channel - The channel to send the message in.
 * @param {boolean} [fancy=false] - If fancy = true, put the message contents in a Discord embed
 * ('false' if unspecified).
 * @param {() => void} [done] - The callback function that runs if the message successfully sends.
 */
// tslint:disable-next-line:max-line-length
export function postToDiscord(message: string, channel: string, fancy = false, done?: () => void): void {
  const webhook = config.get(`discord.webhooks.${channel}`);
  if (webhook !== undefined) {
    const data = {
      url: webhook,
      method: 'POST',
      body: {
        avatar_url: '',
        content: message,
        username: config.get('discord.username'),
	    embeds: fancy ? [{ description: message }] : [],
      },
      json: true,
    };
    request(data, (err) => {
      if (err) {
        console.warn(`[Webhook] ${err}`);
      }
      // Run callback if exists
	    (done || Function)();
    });
  } else {
  	// Log something error related
  }
}
