# 🚀 Netlify Deployment - Schnellanleitung (Manueller Workflow)

## ⚡ Quick Start - Nur 1 Variable nötig!

Für den **manuellen Workflow** (Tickets werden von dir manuell erstellt) brauchst du **nur 1 Variable**:

---

## 📋 Erforderliche Umgebungsvariablen

### Schritt-für-Schritt:

1. **Gehe zu deinem Netlify Dashboard:** https://app.netlify.com
2. **Wähle dein Projekt:** Tixbro-Website
3. **Navigiere zu:** Site settings → Environment variables
4. **Klicke:** Add a variable

---

### ✅ Variable 1: STRIPE_SECRET_KEY (ERFORDERLICH)

```
Key:   STRIPE_SECRET_KEY
Value: [Dein Stripe Secret Key - beginnt mit sk_live_...]
```

**Was macht dieser Key?**
- Ermöglicht Zahlungsabwicklung mit Stripe
- Erstellt Payment Intents im Backend

**Wo finde ich den Key?**
- Stripe Dashboard → Developers → API Keys → Secret key
- Verwende deinen Live Secret Key (sk_live_...)

---

## 🎯 Das war's!

Mit nur **1 Variable** funktioniert dein System:

```
1. Kunde kauft Ticket → Zahlt mit Stripe ✅
2. Stripe sendet Zahlungsbestätigung ✅
3. Bestellung wird in Firebase gespeichert ✅
4. Du siehst Bestellung in Firebase 👀
5. Du erstellst manuell Tickets und sendest sie per E-Mail 📧
```

**Siehe:** `MANUAL_WORKFLOW.md` für Anleitung!

---

## 🔄 Nach dem Setzen der Variable:

1. **Deployment neu auslösen:**
   - Gehe zu: Deploys → Trigger deploy → Deploy site
   - Oder: Pushe einen neuen Commit zu GitHub

2. **Testen:**
   - Öffne deine Website
   - Gehe zu einem Event
   - Versuche ein Ticket zu kaufen
   - Überprüfe Stripe Dashboard für die Zahlung

3. **Bestellung in Firebase überprüfen:**
   - Firebase Console → Firestore Database → `orders`
   - Du siehst die neue Bestellung!

---

## 📝 Checkliste für Production (Manuell):

- [x] STRIPE_SECRET_KEY in Netlify gesetzt ✅
- [ ] Test-Zahlung durchgeführt
- [ ] Stripe Dashboard zeigt erfolgreiche Zahlung
- [ ] Firebase zeigt Bestellung in `orders` Collection
- [ ] Manuelle Tickets erstellt und per E-Mail versendet

---

## 🚀 Optional: Automatisierung (Später)

Wenn du **später automatisieren** möchtest, kannst du zusätzliche Features aktivieren:

### 🔔 Webhook-basierte automatische Ticketerstellung

**Zusätzliche Variablen:**
```
STRIPE_WEBHOOK_SECRET       - Für Stripe Webhooks
FIREBASE_SERVICE_ACCOUNT    - Für Backend-Ticketerstellung
```
**Siehe:** `WEBHOOK_SETUP.md` für Details

### 📧 Automatische E-Mail-Versendung mit Brevo

**Zusätzliche Variablen:**
```
BREVO_API_KEY     - Dein Brevo API Key
BREVO_FROM_EMAIL  - Deine verifizierte Absender-E-Mail
```
**Siehe:** `EMAIL_SETUP.md` für Details

---

## ⚠️ WICHTIG - Sicherheitshinweise:

- ❌ **NIEMALS** diese Keys im Code speichern!
- ❌ **NIEMALS** diese Keys zu GitHub pushen!
- ✅ **NUR** in Netlify Umgebungsvariablen speichern!
- ✅ Die Keys sind durch Netlify geschützt und nur für Serverless Functions verfügbar

---

## 🐛 Troubleshooting

### Problem: "Stripe not initialized"
- ✅ Prüfe, ob Stripe.js im `<head>` geladen wird
- ✅ Prüfe Browser Console auf Fehler

### Problem: "Failed to create payment intent"
- ✅ Prüfe Netlify Functions Logs
- ✅ Stelle sicher, dass STRIPE_SECRET_KEY gesetzt ist
- ✅ Prüfe, ob der Key gültig ist (sk_live_...)

### Problem: "Bestellung erscheint nicht in Firebase"
- ✅ Prüfe Browser Console auf Fehler
- ✅ Überprüfe Firebase Rules (Frontend braucht Schreibzugriff auf `orders`)
- ✅ Teste mit Test-Zahlung

---

## 📞 Support

Bei Problemen:
- 📖 Manueller Workflow: `MANUAL_WORKFLOW.md`
- 📖 Webhook Setup (später): `WEBHOOK_SETUP.md`
- 📖 E-Mail Setup (später): `EMAIL_SETUP.md`
- 🌐 Stripe Docs: https://stripe.com/docs
- 💬 Stripe Support: https://support.stripe.com

---

## 🎯 Upgrade-Path

**Phase 1 (Jetzt - Manuell):**
- ✅ Stripe Zahlungen
- ✅ Bestellungen in Firebase
- ⏰ Manuelle Ticket-Erstellung & Versendung
- **Benötigt:** 1 Variable (`STRIPE_SECRET_KEY`)

**Phase 2 (Später - Semi-Automatisch):**
- ✅ Automatische Ticket-Erstellung via Webhook
- ⏰ Manuelle E-Mail-Versendung
- **Benötigt:** +2 Variablen (`STRIPE_WEBHOOK_SECRET`, `FIREBASE_SERVICE_ACCOUNT`)

**Phase 3 (Future - Voll-Automatisch):**
- ✅ Automatische Ticket-Erstellung
- ✅ Automatische E-Mail-Versendung
- ✅ Automatische Brevo-Kontakterstellung
- **Benötigt:** +2 Variablen (`BREVO_API_KEY`, `BREVO_FROM_EMAIL`)

---

**Status:** Production Ready (Manueller Workflow)! 🎉

**Aktueller Modus:** Phase 1 - Manuell
**Benötigte Variablen:** 1/1 ✅
