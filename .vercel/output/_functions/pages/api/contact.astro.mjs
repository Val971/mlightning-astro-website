import { MailerSend, Sender, Recipient, EmailParams } from 'mailersend';
export { renderers } from '../../renderers.mjs';

const prerender = false;
function parseAddress(value) {
  const match = value.match(/^(.*)<(.+)>$/);
  if (match) {
    return { name: match[1].trim() || void 0, email: match[2].trim() };
  }
  return { email: value.trim() };
}
const POST = async ({ request }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Requête invalide." }), { status: 400 });
  }
  const name = body.name?.toString().trim() ?? "";
  const phone = body.phone?.toString().trim() ?? "";
  const vehicle = body.vehicle?.toString().trim() ?? "";
  const prestation = body.prestation?.toString().trim() ?? "";
  const message = body.message?.toString().trim() ?? "";
  if (!name || !phone) {
    return new Response(JSON.stringify({ error: "Nom et téléphone requis." }), { status: 400 });
  }
  const apiKey = "mlsn.918d8f96035cd3d9478d315677812f89b1b591eb36263c68efeb5a5a49bb58d3";
  const mailerSend = new MailerSend({ apiKey });
  const toEmailsEnv = "mlightning180@gmail.com";
  const toEmails = toEmailsEnv.split(",").map((email) => email.trim()) ;
  const from = parseAddress("Mlightning Custom <contact@mlightning-custom.fr>");
  const sender = new Sender(from.email, from.name);
  const recipients = toEmails.map((email) => new Recipient(email));
  const lines = [
    `Prestation : ${prestation || "Non précisée"}`,
    `Nom : ${name}`,
    `Téléphone : ${phone}`,
    vehicle && `Véhicule : ${vehicle}`,
    message && `Projet : ${message}`
  ].filter(Boolean);
  const emailParams = new EmailParams().setFrom(sender).setTo(recipients).setSubject(`Nouvelle demande de devis — ${prestation || "via le site"}`).setText(lines.join("\n"));
  try {
    await mailerSend.email.send(emailParams);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error("Échec de l'envoi email du formulaire de contact :", err);
    return new Response(JSON.stringify({ error: "L'envoi a échoué." }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
