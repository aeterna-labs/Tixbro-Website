# Stripe Payment Integration - Deployment Anleitung

## 🚀 Deployment auf Netlify

### 1. Umgebungsvariablen in Netlify konfigurieren

Nach dem Deployment muss der Stripe Secret Key als Umgebungsvariable in Netlify gesetzt werden:

1. Gehe zu deinem Netlify Dashboard
2. Wähle dein Projekt aus (Tixbro-Website)
3. Gehe zu **Site settings** → **Environment variables**
4. Füge folgende Variablen hinzu:

```
STRIPE_SECRET_KEY = [Dein Stripe Secret Key hier einfügen]
```

⚠️ **WICHTIG:** Der Secret Key wird NIEMALS im Code committed oder öffentlich gemacht!

**Deinen Secret Key findest du in:**
- Stripe Dashboard → Developers → API Keys → Secret key
- Der Key beginnt mit `sk_live_` für Production
- Der Key beginnt mit `sk_test_` für Test-Modus

### 2. Stripe Webhook Secret konfigurieren

**WICHTIG:** Füge auch den Webhook Secret in Netlify hinzu:

1. Gehe zu **Netlify Dashboard** → **Site settings** → **Environment variables**
2. Füge hinzu:
   ```
   STRIPE_WEBHOOK_SECRET = [Dein Webhook Secret hier einfügen]
   ```
   ℹ️ Der Webhook Secret beginnt mit `whsec_...`

### 3. Stripe Webhook-Endpoint einrichten (Wichtig für Production!)

Für sichere Zahlungsbestätigung:

1. Gehe zu [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Klicke auf **Add endpoint**
3. Webhook-URL eingeben:
   ```
   https://deine-netlify-domain.netlify.app/.netlify/functions/stripe-webhook
   ```
   ⚠️ Ersetze `deine-netlify-domain` mit deiner echten Netlify-Domain!
4. Events auswählen:
   - `payment_intent.succeeded` ✅
   - `payment_intent.payment_failed` ⚠️
   - `charge.succeeded` ✅
5. Endpoint speichern

### 4. Dependencies installieren

Netlify installiert automatisch die Dependencies aus `/netlify/functions/package.json` beim Deployment.

Die Stripe SDK (`stripe@^14.11.0`) wird automatisch installiert.

### 5. Deployment durchführen

```bash
git add .
git commit -m "Stripe Live-Integration mit Netlify Functions"
git push origin main
```

Netlify deployt automatisch bei jedem Push zum main branch.

---

## 🔧 Wie die Integration funktioniert

### Frontend (Client-Side)

**1. Stripe Initialisierung** (`js/stripe-config.js`)
```javascript
// Publishable Key - sicher im Frontend zu verwenden
STRIPE_PUBLISHABLE_KEY = 'pk_live_...'
```

**2. Checkout Flow** (`checkout.html`)
- Kunde gibt Karteninformationen ein (über Stripe Card Element)
- Stripe validiert Kartendaten client-seitig
- Formular wird abgeschickt

**3. Payment Processing** (`js/payment.js`)
- Frontend ruft Backend-Funktion auf: `/.netlify/functions/create-payment-intent`
- Backend erstellt Payment Intent mit Secret Key
- Frontend bestätigt Zahlung mit `stripe.confirmCardPayment()`
- Bei Erfolg: Ticket wird in Firestore erstellt

### Backend (Server-Side - Netlify Functions)

**1. Payment Intent erstellen** (`netlify/functions/create-payment-intent.js`)
```javascript
// Läuft auf Netlify Servern, hat Zugriff auf Secret Key
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const paymentIntent = await stripe.paymentIntents.create({
  amount: Math.round(amount * 100), // in Paise
  currency: 'inr',
  automatic_payment_methods: { enabled: true }
});
```

**2. Webhook Handler** (`netlify/functions/stripe-webhook.js`)
- Verifiziert Webhook-Signatur von Stripe
- Bestätigt erfolgreiche Zahlung
- Aktualisiert Datenbank (TODO: Firestore-Integration)

---

## ✅ Sicherheits-Checkliste

- ✅ Publishable Key im Frontend-Code (sicher)
- ✅ Secret Key nur in Netlify-Umgebungsvariablen (sicher)
- ✅ Payment Intent Creation auf Backend (sicher)
- ✅ Webhook-Signatur-Verifizierung (sicher)
- ✅ CORS-Header korrekt konfiguriert
- ✅ HTTPS erzwungen (Netlify Standard)

---

## 🧪 Testing

### Test-Zahlungen (vor Production)

Um Test-Zahlungen durchzuführen, kannst du temporär Test-Keys verwenden:

**Test Publishable Key:**
```
pk_test_...
```

**Test Secret Key (in Netlify Umgebungsvariablen):**
```
sk_test_...
```

**Test-Kartennummern:**
- Erfolgreiche Zahlung: `4242 4242 4242 4242`
- 3D Secure benötigt: `4000 0027 6000 3184`
- Zahlung abgelehnt: `4000 0000 0000 0002`

Beliebiges zukünftiges Datum und CVC verwenden.

### Live-Zahlungen

Die aktuelle Konfiguration verwendet bereits Live-Keys:
- Live Publishable Key: `pk_live_51SZfIaH0R2wVgZXuDYP3R0GpVrbDE1fTyepLvSMmLNU84PSfKR0E3Y1dgO3Y1vfMFYao3hI2plsGqcm04XICy4e000EOvEB2Ay`
- Live Secret Key: In Netlify konfigurieren!

---

## 📊 Monitoring

Nach dem Deployment kannst du Zahlungen überwachen in:

1. **Stripe Dashboard:** https://dashboard.stripe.com/payments
2. **Netlify Functions Log:** Site Dashboard → Functions
3. **Browser Console:** Für Frontend-Fehler

---

## 🔍 Troubleshooting

### Problem: "Stripe not initialized"
**Lösung:** Prüfe, ob Stripe.js im `<head>` geladen wird:
```html
<script src="https://js.stripe.com/v3/"></script>
```

### Problem: "Failed to create payment intent"
**Lösung:**
1. Prüfe Netlify Logs für Backend-Fehler
2. Stelle sicher, dass `STRIPE_SECRET_KEY` in Netlify gesetzt ist
3. Prüfe, ob der Secret Key gültig ist (beginnt mit `sk_live_`)

### Problem: "Payment method creation failed"
**Lösung:**
1. Prüfe Kartendaten (gültige Test-Karte bei Test-Mode)
2. Stelle sicher, dass Card Element korrekt gemountet ist
3. Prüfe Browser-Console für Stripe-Fehler

### Problem: Webhook nicht ausgelöst
**Lösung:**
1. Prüfe Webhook-URL in Stripe Dashboard
2. Stelle sicher, dass `STRIPE_WEBHOOK_SECRET` gesetzt ist
3. Teste Webhook mit Stripe CLI:
   ```bash
   stripe trigger payment_intent.succeeded
   ```

---

## 📝 Nächste Schritte (Optional)

### Verbesserungen für Production:

1. **E-Mail-Versand nach Kauf**
   - Integration mit SendGrid oder Mailgun
   - Automatische Ticket-Versendung per E-Mail

2. **QR-Code Generierung**
   - Library: `qrcode` npm package
   - Generierung auf Backend für Sicherheit

3. **Webhook-Firestore-Integration**
   - Ticket-Status Update bei erfolgreicher Zahlung
   - Doppelte Zahlungen vermeiden

4. **3D Secure Support**
   - Bereits implementiert durch `automatic_payment_methods`
   - Teste mit 3DS-Test-Karten

5. **Refund-Handling**
   - Admin-Interface für Rückerstattungen
   - Webhook für `charge.refunded`

---

## 💰 Kosten & Gebühren

Stripe Gebühren in Indien:
- **Domestic Cards:** 2% + ₹3 per transaktion
- **International Cards:** 3% + ₹3 per transaktion
- **Keine Setup-Gebühren**
- **Keine monatlichen Gebühren**

Tixbro nimmt zusätzlich 10% Kommission (bereits im Code implementiert).

---

Bei Fragen oder Problemen: https://stripe.com/docs oder Stripe Support kontaktieren.
