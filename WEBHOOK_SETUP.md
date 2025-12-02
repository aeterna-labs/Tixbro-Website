# 🔔 Stripe Webhook Setup - Automatische Ticketerstellung

## Warum Webhooks?

Mit der Webhook-basierten Implementierung ist die Ticketerstellung **100% zuverlässig**:

### ✅ Vorher (Frontend-basiert):
```
Kunde zahlt → Frontend erstellt Tickets → Frontend sendet E-Mail
```
**Problem:** Wenn Browser abstürzt → Keine Tickets, keine E-Mail! 😱

### ✅ Jetzt (Webhook-basiert):
```
Kunde zahlt → Stripe Webhook → Backend erstellt Tickets → Backend sendet E-Mail
```
**Vorteil:** Selbst wenn Browser abstürzt → Stripe garantiert Webhook-Auslieferung! 🎉

---

## 🚀 Setup-Anleitung

### Schritt 1: Firebase Service Account einrichten

Der Webhook braucht Zugriff auf Firebase Firestore, um Tickets zu erstellen.

#### 1.1 Service Account erstellen

1. **Gehe zu:** [Firebase Console](https://console.firebase.google.com/)
2. **Wähle dein Projekt:** Tixbro
3. **Gehe zu:** ⚙️ Project Settings → Service Accounts
4. **Klicke:** "Generate new private key"
5. **Download:** Die JSON-Datei (z.B. `tixbro-firebase-adminsdk.json`)

⚠️ **WICHTIG:** Diese Datei enthält sensible Daten! Niemals zu GitHub pushen!

#### 1.2 Service Account als Umgebungsvariable setzen

In **Netlify Dashboard:**

1. **Gehe zu:** Site settings → Environment variables
2. **Klicke:** Add a variable
3. **Füge hinzu:**

```
Key:   FIREBASE_SERVICE_ACCOUNT
Value: [Kompletter Inhalt der JSON-Datei als einzeiliger String]
```

**Beispiel-Format des JSON:**
```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

**Wichtig:** Kopiere den gesamten JSON-Inhalt als einen String!

**Alternative (wenn zu groß):**
Falls die Umgebungsvariable zu groß ist, kannst du die einzelnen Werte auch separat setzen:
- `FIREBASE_PROJECT_ID`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_CLIENT_EMAIL`

Dann den Webhook-Code entsprechend anpassen.

---

### Schritt 2: Webhook in Stripe Dashboard registrieren

#### 2.1 Webhook-Endpoint erstellen

1. **Gehe zu:** [Stripe Dashboard](https://dashboard.stripe.com/)
2. **Navigiere zu:** Developers → Webhooks
3. **Klicke:** "Add endpoint"

#### 2.2 Endpoint-URL eingeben

```
https://deine-website.netlify.app/.netlify/functions/stripe-webhook
```

Ersetze `deine-website` mit deiner tatsächlichen Netlify-Domain!

#### 2.3 Events auswählen

Wähle folgende Events aus:

- ✅ `payment_intent.succeeded` (Wichtigste Event!)
- ✅ `payment_intent.payment_failed` (Optional, für Fehlerbehandlung)
- ✅ `charge.succeeded` (Optional, für Logging)

**Oder:** Wähle "Select all events" für vollständige Überwachung

#### 2.4 Webhook speichern

1. **Klicke:** "Add endpoint"
2. **Kopiere:** Den "Signing secret" (beginnt mit `whsec_...`)
3. **Wichtig:** Dieser Secret wird nur EINMAL angezeigt!

#### 2.5 Signing Secret in Netlify speichern

In **Netlify Dashboard:**

```
Key:   STRIPE_WEBHOOK_SECRET
Value: whsec_... (dein Signing Secret)
```

---

### Schritt 3: Testen

#### 3.1 Test mit Stripe CLI (Lokal)

```bash
# Stripe CLI installieren (falls noch nicht geschehen)
brew install stripe/stripe-cli/stripe

# Webhook-Events simulieren
stripe trigger payment_intent.succeeded
```

#### 3.2 Test in Production

1. **Kaufe ein Test-Ticket** auf deiner Live-Website
2. **Überprüfe Netlify Functions Logs:**
   - Gehe zu: Netlify → Functions → stripe-webhook → Logs
   - Du solltest sehen:
     ```
     PaymentIntent succeeded! pi_xxx
     Ticket 1/1 created: TKT-xxx
     Confirmation email sent to: kunde@example.com
     Brevo contact created/updated: kunde@example.com
     ```

3. **Überprüfe Stripe Dashboard:**
   - Gehe zu: Developers → Webhooks → Dein Webhook
   - Unter "Recent deliveries" solltest du erfolgreiche Requests sehen (200 status)

4. **Überprüfe E-Mail:**
   - Kunde sollte Bestätigungs-E-Mail mit Ticket-IDs erhalten

5. **Überprüfe Firebase:**
   - Gehe zu: Firebase Console → Firestore Database → tickets
   - Neue Tickets sollten angelegt sein

6. **Überprüfe Brevo:**
   - Gehe zu: Brevo Dashboard → Contacts
   - Neuer Kontakt sollte erstellt/aktualisiert sein

---

## 📊 Webhook-Ablauf im Detail

```mermaid
sequenceDiagram
    participant Kunde
    participant Frontend
    participant Stripe
    participant Webhook
    participant Firebase
    participant Brevo

    Kunde->>Frontend: Zahlung durchführen
    Frontend->>Stripe: Payment Intent erstellen
    Stripe->>Frontend: Client Secret
    Frontend->>Stripe: Zahlung bestätigen
    Stripe->>Frontend: Payment Success
    Frontend->>Kunde: "Erfolgreich! E-Mail kommt gleich"

    Note over Stripe,Webhook: Ab hier ist Browser nicht mehr nötig!

    Stripe->>Webhook: payment_intent.succeeded
    Webhook->>Firebase: Tickets erstellen
    Firebase-->>Webhook: Tickets erstellt
    Webhook->>Brevo: E-Mail senden
    Brevo-->>Webhook: E-Mail gesendet
    Webhook->>Brevo: Kontakt erstellen
    Brevo-->>Webhook: Kontakt erstellt
    Webhook->>Stripe: 200 OK

    Brevo->>Kunde: 📧 Bestätigungs-E-Mail
```

---

## 🔧 Troubleshooting

### Problem: "Firebase Admin initialization failed"

**Ursache:** `FIREBASE_SERVICE_ACCOUNT` nicht gesetzt oder falsch formatiert

**Lösung:**
1. Überprüfe Netlify Environment Variables
2. Stelle sicher, dass der JSON-String vollständig kopiert wurde
3. Teste mit: `JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)`

### Problem: "Webhook signature verification failed"

**Ursache:** `STRIPE_WEBHOOK_SECRET` fehlt oder ist falsch

**Lösung:**
1. Gehe zu Stripe Dashboard → Webhooks → Dein Webhook
2. Klicke auf "Reveal" beim Signing secret
3. Kopiere den Wert neu in Netlify Environment Variables
4. Deployment neu auslösen

### Problem: Webhook returns 200 but no tickets created

**Ursache:** Fehler in der Ticket-Erstellung (z.B. Firebase Permissions)

**Lösung:**
1. Überprüfe Netlify Functions Logs (Details!)
2. Überprüfe Firebase Rules (Serverless Functions brauchen Admin-Zugriff)
3. Teste lokal mit Stripe CLI

### Problem: E-Mails werden nicht versendet

**Ursache:** Brevo API Key fehlt oder Sender nicht verifiziert

**Lösung:**
1. Überprüfe `BREVO_API_KEY` in Netlify
2. Überprüfe `BREVO_FROM_EMAIL` in Netlify
3. Gehe zu Brevo Dashboard → Senders → Verifiziere Sender
4. Siehe `EMAIL_SETUP.md` für Details

### Problem: Webhook wird nicht aufgerufen

**Ursache:** Webhook-URL falsch oder Endpoint nicht deployed

**Lösung:**
1. Teste Webhook-URL direkt:
   ```bash
   curl https://deine-website.netlify.app/.netlify/functions/stripe-webhook
   ```
   Sollte "Method Not Allowed" zurückgeben (das ist OK!)

2. Überprüfe Stripe Dashboard → Webhooks → Recent deliveries
3. Stelle sicher, dass `payment_intent.succeeded` aktiviert ist

---

## 📋 Checkliste für Production

- [ ] Firebase Service Account erstellt
- [ ] `FIREBASE_SERVICE_ACCOUNT` in Netlify gesetzt
- [ ] Webhook in Stripe Dashboard registriert
- [ ] `STRIPE_WEBHOOK_SECRET` in Netlify gesetzt
- [ ] `BREVO_API_KEY` in Netlify gesetzt
- [ ] `BREVO_FROM_EMAIL` in Netlify gesetzt
- [ ] Brevo Sender verifiziert
- [ ] Test-Zahlung durchgeführt
- [ ] Netlify Functions Logs überprüft (keine Fehler)
- [ ] Stripe Webhook Logs überprüft (200 OK)
- [ ] Firebase zeigt erstellte Tickets
- [ ] Kunde hat Bestätigungs-E-Mail erhalten
- [ ] Brevo Kontakt wurde erstellt

---

## 🎯 Vorteile der Webhook-Implementierung

| Feature | Frontend-basiert | Webhook-basiert |
|---------|------------------|-----------------|
| **Zuverlässigkeit** | ❌ Abhängig von Browser | ✅ 100% garantiert |
| **Ticket-Duplikate** | ⚠️ Möglich bei Retry | ✅ Verhindert durch Stripe |
| **E-Mail-Versand** | ❌ Kann fehlschlagen | ✅ Wird immer versucht |
| **Performance** | ⚠️ Blockiert Frontend | ✅ Asynchron im Backend |
| **Fehlerbehandlung** | ❌ Schwierig | ✅ Stripe Retry-Mechanismus |
| **Sicherheit** | ⚠️ Client-seitig | ✅ Server-seitig verifiziert |
| **Logging** | ❌ Nur im Browser | ✅ Zentral in Netlify/Stripe |

---

## 🔐 Sicherheitshinweise

- ❌ **NIEMALS** Firebase Service Account zu GitHub pushen!
- ❌ **NIEMALS** Webhook Secret im Frontend-Code!
- ✅ **IMMER** Webhook-Signatur verifizieren (macht der Code automatisch)
- ✅ **NUR** via Netlify Environment Variables speichern!
- ✅ Service Account Permissions auf Minimum beschränken

---

## 📞 Support

Bei Problemen:
- 📖 Netlify Functions Docs: https://docs.netlify.com/functions/overview/
- 🌐 Stripe Webhooks Docs: https://stripe.com/docs/webhooks
- 🔥 Firebase Admin SDK: https://firebase.google.com/docs/admin/setup
- 💬 Stripe Support: https://support.stripe.com

---

**Status:** Production Ready! 🚀
