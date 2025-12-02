# 🚀 Netlify Deployment - Schnellanleitung

## Umgebungsvariablen in Netlify konfigurieren

Nach dem ersten Deployment **MUSST** du folgende Umgebungsvariablen in Netlify setzen, damit die Stripe-Integration funktioniert:

### Schritt-für-Schritt:

1. **Gehe zu deinem Netlify Dashboard:** https://app.netlify.com
2. **Wähle dein Projekt:** Tixbro-Website
3. **Navigiere zu:** Site settings → Environment variables
4. **Klicke:** Add a variable

### Füge folgende 2 Variablen hinzu:

#### ✅ Variable 1: STRIPE_SECRET_KEY

```
Key:   STRIPE_SECRET_KEY
Value: [Dein Stripe Secret Key - beginnt mit sk_live_...]
```

**Wo finde ich den Key?**
- Stripe Dashboard → Developers → API Keys → Secret key
- Oder verwende den Key, den du bereits hast


#### ✅ Variable 2: STRIPE_WEBHOOK_SECRET

```
Key:   STRIPE_WEBHOOK_SECRET
Value: [Dein Webhook Secret - beginnt mit whsec_...]
```

**Wo finde ich den Key?**
- Stripe Dashboard → Developers → Webhooks → Dein Webhook auswählen
- Unter "Signing secret" findest du den Key
- Oder verwende den Key, den du bereits hast

---

## ⚠️ WICHTIG - Sicherheitshinweise:

- ❌ **NIEMALS** diese Keys im Code speichern!
- ❌ **NIEMALS** diese Keys zu GitHub pushen!
- ✅ **NUR** in Netlify Umgebungsvariablen speichern!
- ✅ Die Keys sind durch Netlify geschützt und nur für Serverless Functions verfügbar

---

## 🔄 Nach dem Setzen der Variablen:

1. **Deployment neu auslösen:**
   - Gehe zu: Deploys → Trigger deploy → Deploy site
   - Oder: Pushe einen neuen Commit zu GitHub

2. **Testen:**
   - Öffne deine Website
   - Gehe zu einem Event
   - Versuche ein Ticket zu kaufen
   - Überprüfe Stripe Dashboard für die Zahlung

3. **Logs überprüfen:**
   - Netlify: Site → Functions → Logs
   - Stripe: Dashboard → Developers → Logs

---

## 📝 Checkliste für Production:

- [ ] STRIPE_SECRET_KEY in Netlify gesetzt
- [ ] STRIPE_WEBHOOK_SECRET in Netlify gesetzt
- [ ] Webhook-Endpoint in Stripe Dashboard konfiguriert
- [ ] Test-Zahlung durchgeführt
- [ ] Stripe Dashboard zeigt erfolgreiche Zahlung
- [ ] Netlify Functions Logs zeigen keine Fehler
- [ ] Firebase zeigt erstelltes Ticket
- [ ] E-Mail-Versand funktioniert (falls implementiert)

---

## 🐛 Troubleshooting

### Problem: "Stripe not initialized"
- ✅ Prüfe, ob Stripe.js im `<head>` geladen wird
- ✅ Prüfe Browser Console auf Fehler

### Problem: "Failed to create payment intent"
- ✅ Prüfe Netlify Functions Logs
- ✅ Stelle sicher, dass STRIPE_SECRET_KEY gesetzt ist
- ✅ Prüfe, ob der Key gültig ist (sk_live_...)

### Problem: "Webhook failed"
- ✅ Prüfe, ob STRIPE_WEBHOOK_SECRET gesetzt ist
- ✅ Prüfe Webhook-URL in Stripe Dashboard
- ✅ Teste mit Stripe CLI: `stripe trigger payment_intent.succeeded`

---

## 📞 Support

Bei Problemen:
- 📖 Detaillierte Anleitung: `STRIPE_DEPLOYMENT.md`
- 🌐 Stripe Docs: https://stripe.com/docs
- 💬 Stripe Support: https://support.stripe.com

---

**Status:** Ready for Production! 🎉
