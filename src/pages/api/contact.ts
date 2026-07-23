import type { APIRoute } from 'astro';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

// Route dynamique : seule page du site qui a besoin d'exécution serveur
// (appel MailerSend avec la clé API secrète). Tout le reste du site est
// pré-rendu en statique — voir astro.config.mjs (output: 'hybrid').
export const prerender = false;

const DEFAULT_TO_EMAILS = ['contact@mlightning-custom.fr', 'mlightning180@gmail.com'];
const DEFAULT_FROM_EMAIL = 'Mlightning Custom <MS_XXXXXX@xxxxx.mlsender.net>';

type ContactPayload = {
  name?: string;
  phone?: string;
  vehicle?: string;
  prestation?: string;
  message?: string;
};

function parseAddress(value: string): { name?: string; email: string } {
  const match = value.match(/^(.*)<(.+)>$/);
  if (match) {
    return { name: match[1].trim() || undefined, email: match[2].trim() };
  }
  return { email: value.trim() };
}

export const POST: APIRoute = async ({ request }) => {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Requête invalide.' }), { status: 400 });
  }

  const name = body.name?.toString().trim() ?? '';
  const phone = body.phone?.toString().trim() ?? '';
  const vehicle = body.vehicle?.toString().trim() ?? '';
  const prestation = body.prestation?.toString().trim() ?? '';
  const message = body.message?.toString().trim() ?? '';

  if (!name || !phone) {
    return new Response(JSON.stringify({ error: 'Nom et téléphone requis.' }), { status: 400 });
  }

  const apiKey = import.meta.env.MAILERSEND_API_KEY;
  if (!apiKey) {
    console.error("MAILERSEND_API_KEY manquante — impossible d'envoyer l'email du formulaire de contact.");
    return new Response(JSON.stringify({ error: 'Service email non configuré.' }), { status: 500 });
  }

  const mailerSend = new MailerSend({ apiKey });

  const toEmailsEnv = import.meta.env.CONTACT_TO_EMAIL;
  const toEmails = toEmailsEnv ? toEmailsEnv.split(',').map((email: string) => email.trim()) : DEFAULT_TO_EMAILS;
  const from = parseAddress(import.meta.env.CONTACT_FROM_EMAIL || DEFAULT_FROM_EMAIL);

  const sender = new Sender(from.email, from.name);
  const recipients = toEmails.map((email: string) => new Recipient(email));

  const lines = [
    `Prestation : ${prestation || 'Non précisée'}`,
    `Nom : ${name}`,
    `Téléphone : ${phone}`,
    vehicle && `Véhicule : ${vehicle}`,
    message && `Projet : ${message}`,
  ].filter(Boolean);

  const emailParams = new EmailParams()
    .setFrom(sender)
    .setTo(recipients)
    .setSubject(`Nouvelle demande de devis — ${prestation || 'via le site'}`)
    .setText(lines.join('\n'));

  try {
    await mailerSend.email.send(emailParams);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error("Échec de l'envoi email du formulaire de contact :", err);
    return new Response(JSON.stringify({ error: "L'envoi a échoué." }), { status: 500 });
  }
};
