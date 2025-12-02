# 🧪 Tixbro - Testing & Debugging Guide

## ✅ Pre-Deployment Checklist

### 1. Umgebungsvariablen (Netlify)
- [ ] `STRIPE_SECRET_KEY` ist gesetzt
- [ ] `STRIPE_WEBHOOK_SECRET` ist gesetzt
- [ ] Deployment wurde nach dem Setzen neu ausgelöst

### 2. Stripe Dashboard
- [ ] Webhook-Endpoint ist konfiguriert
- [ ] Events `payment_intent.succeeded`, `payment_intent.payment_failed`, `charge.succeeded` sind ausgewählt
- [ ] Webhook-URL ist korrekt: `https://[DEINE-DOMAIN].netlify.app/.netlify/functions/stripe-webhook`

### 3. Firebase
- [ ] Firebase-Projekt ist aktiv
- [ ] Firestore-Datenbank ist erstellt
- [ ] Security Rules sind deployed
- [ ] Collections `companies`, `events`, `tickets` existieren

---

## 🧪 Test-Szenarien

### **Szenario 1: Erfolgreicher Ticket-Kauf (Single)**

**Schritte:**
1. Öffne Website → Gehe zu `shop.html`
2. Wähle ein Event aus
3. Klicke auf Event-Details
4. Wähle Quantity: 1
5. Klicke "Buy Tickets"
6. Fülle Checkout-Formular aus:
   - First Name: Max
   - Last Name: Mustermann
   - Email: max@example.com
   - Phone: +49 123 456789
7. Kartendaten eingeben:
   - **Test-Karte:** `4242 4242 4242 4242`
   - **Ablaufdatum:** Beliebiges zukünftiges Datum (z.B. 12/25)
   - **CVC:** 123
8. Klicke "Complete Payment"

**Erwartetes Ergebnis:**
- ✅ Payment Intent wird erstellt (siehe Netlify Functions Log)
- ✅ Stripe bestätigt Zahlung
- ✅ Ticket wird in Firestore erstellt
- ✅ Event `availableTickets` wird um 1 reduziert
- ✅ Event `soldTickets` wird um 1 erhöht
- ✅ Company `totalRevenue` wird um 90% des Ticketpreises erhöht
- ✅ Redirect zu `success.html`
- ✅ Success-Page zeigt Ticket-ID an
- ✅ Stripe Dashboard zeigt erfolgreiche Zahlung

**Debugging:**
- Netlify Functions Log: Site → Functions → create-payment-intent
- Browser Console: F12 → Console Tab
- Stripe Dashboard: Payments → Filter nach Datum

---

### **Szenario 2: Erfolgreicher Ticket-Kauf (Multiple)**

**Schritte:**
1. Wie Szenario 1, aber Quantity: 3

**Erwartetes Ergebnis:**
- ✅ 3 separate Tickets werden erstellt
- ✅ Event `availableTickets` wird um 3 reduziert
- ✅ Event `soldTickets` wird um 3 erhöht
- ✅ Company `totalRevenue` wird um 3x 90% des Ticketpreises erhöht
- ✅ Success-Page zeigt alle Ticket-IDs an

**Debugging:**
- Firebase Console: Firestore → tickets Collection
- Check dass 3 Tickets mit gleichem `paymentId` existieren

---

### **Szenario 3: Fehlgeschlagene Zahlung - Karte abgelehnt**

**Schritte:**
1. Wie Szenario 1, aber verwende:
   - **Test-Karte:** `4000 0000 0000 0002` (declined)
   - CVC: 123

**Erwartetes Ergebnis:**
- ✅ Payment Intent wird erstellt
- ❌ Stripe lehnt Zahlung ab
- ✅ Error wird im Frontend angezeigt (roter Alert)
- ❌ KEIN Ticket wird erstellt
- ❌ Event-Zahlen bleiben unverändert
- ❌ Kein Redirect zu Success-Page

**Debugging:**
- Browser Console sollte Fehler zeigen
- Stripe Dashboard zeigt fehlgeschlagene Zahlung

---

### **Szenario 4: 3D Secure Authentifizierung**

**Schritte:**
1. Wie Szenario 1, aber verwende:
   - **Test-Karte:** `4000 0027 6000 3184` (3DS required)
   - CVC: 123

**Erwartetes Ergebnis:**
- ✅ Payment Intent wird erstellt
- ✅ Stripe zeigt 3D Secure Modal
- ✅ Nach Bestätigung: Zahlung erfolgreich
- ✅ Ticket wird erstellt

**Debugging:**
- 3D Secure Modal sollte automatisch erscheinen
- Nach "Complete" sollte alles wie Szenario 1 funktionieren

---

### **Szenario 5: Nicht genug Tickets verfügbar**

**Schritte:**
1. Erstelle ein Event mit nur 2 verfügbaren Tickets
2. Versuche 3 Tickets zu kaufen

**Erwartetes Ergebnis:**
- ✅ Payment Intent wird erstellt
- ✅ Stripe bestätigt Zahlung
- ✅ 2 Tickets werden erstellt
- ❌ 3. Ticket-Erstellung schlägt fehl mit Fehler: "No tickets available"
- ⚠️ **PROBLEM:** Zahlung wurde bereits durchgeführt, aber nicht alle Tickets erstellt
- 🔧 **TODO:** Refund-Logik implementieren

**Debugging:**
- Firebase: Prüfe wie viele Tickets erstellt wurden
- Stripe: Zahlung war erfolgreich
- Netlify Logs: Zeigen Fehler bei Ticket-Erstellung

---

### **Szenario 6: Ungültige Kartendaten**

**Schritte:**
1. Wie Szenario 1, aber:
   - Karte: `1234 1234 1234 1234` (ungültig)

**Erwartetes Ergebnis:**
- ✅ Stripe Card Element zeigt sofort Fehler: "Your card number is invalid"
- ❌ Submit-Button sollte disabled bleiben (optional)
- ❌ Kein Payment Intent wird erstellt

---

### **Szenario 7: Missing Umgebungsvariablen**

**Test nur in Development/Staging!**

**Schritte:**
1. Entferne `STRIPE_SECRET_KEY` aus Netlify
2. Trigger neues Deployment
3. Versuche Ticket zu kaufen

**Erwartetes Ergebnis:**
- ❌ Netlify Function schlägt fehl
- ✅ Frontend zeigt Fehler: "Failed to create payment intent"
- ✅ Stripe Dashboard zeigt KEINE Zahlung

**Debugging:**
- Netlify Functions Log zeigt: "Stripe API key missing"

---

### **Szenario 8: Webhook-Verifizierung**

**Schritte:**
1. Führe Szenario 1 durch (erfolgreicher Kauf)
2. Warte 2-3 Sekunden
3. Prüfe Netlify Functions Logs

**Erwartetes Ergebnis:**
- ✅ `stripe-webhook` Function wurde aufgerufen
- ✅ Event `payment_intent.succeeded` wurde empfangen
- ✅ Webhook-Signatur wurde verifiziert
- ✅ Log zeigt Payment Intent ID

**Debugging:**
- Netlify: Functions → stripe-webhook → Logs
- Stripe Dashboard: Webhooks → Dein Endpoint → Events

---

## 🔍 Debugging-Tools

### 1. **Browser Developer Tools**

```javascript
// Im Browser Console ausführen:

// Check ob Stripe geladen ist
console.log(window.Stripe);

// Check Checkout-Daten
console.log(JSON.parse(sessionStorage.getItem('checkoutEvent')));

// Check Ticket-Daten nach Kauf
console.log(JSON.parse(sessionStorage.getItem('purchasedTicket')));
```

### 2. **Netlify Functions Logs**

```bash
# Live Logs ansehen:
1. Netlify Dashboard → Site → Functions
2. Wähle Function (create-payment-intent oder stripe-webhook)
3. Klicke "View Logs"
4. Live-Logs erscheinen bei jedem Aufruf
```

### 3. **Stripe Dashboard**

```
1. Payments → Zeigt alle Zahlungen
2. Logs → Zeigt API-Calls
3. Webhooks → Zeigt Webhook-Events
4. Events → Zeigt alle Stripe-Events
```

### 4. **Firebase Console**

```
1. Firestore → tickets Collection
2. Filter nach customerEmail
3. Check paymentId matches Stripe Payment Intent ID
4. Check purchaseDate ist aktuell
```

---

## 🐛 Häufige Fehler & Lösungen

### Fehler: "Stripe not initialized"

**Ursache:** Stripe.js nicht geladen

**Lösung:**
```html
<!-- Prüfe ob in checkout.html vorhanden: -->
<script src="https://js.stripe.com/v3/"></script>
```

---

### Fehler: "Failed to create payment intent"

**Ursache:** Backend-Funktion schlägt fehl

**Debugging:**
1. Netlify Functions Log prüfen
2. Check ob `STRIPE_SECRET_KEY` gesetzt ist
3. Check ob Key gültig ist (sk_live_...)

**Lösung:**
- Umgebungsvariable korrekt setzen
- Deployment neu auslösen

---

### Fehler: "Your card was declined"

**Ursache:** Test-Karte für declined-Szenario verwendet

**Lösung:**
- Verwende `4242 4242 4242 4242` für erfolgreiche Zahlungen

---

### Fehler: "No tickets available"

**Ursache:** Event ist ausverkauft oder Quantity > availableTickets

**Lösung:**
- Prüfe Event in Firebase: `availableTickets` Feld
- Erstelle neue Tickets oder neues Event

---

### Fehler: Webhook wird nicht aufgerufen

**Ursache:** Webhook-URL falsch oder Events nicht konfiguriert

**Debugging:**
1. Stripe Dashboard → Webhooks → Dein Endpoint
2. Check "Recent deliveries"
3. Falls keine Deliveries: URL ist falsch

**Lösung:**
- Korrekte URL: `https://[DEINE-DOMAIN].netlify.app/.netlify/functions/stripe-webhook`
- Events hinzufügen: `payment_intent.succeeded`

---

### Fehler: "Webhook signature verification failed"

**Ursache:** `STRIPE_WEBHOOK_SECRET` fehlt oder ist falsch

**Lösung:**
- Kopiere Webhook Secret aus Stripe Dashboard
- Setze in Netlify als `STRIPE_WEBHOOK_SECRET`
- Deployment neu auslösen

---

## 📊 Performance-Monitoring

### Metriken zu überwachen:

1. **Payment Success Rate**
   - Formel: (Erfolgreiche Zahlungen / Gesamte Versuche) × 100
   - Ziel: > 95%

2. **Average Payment Time**
   - Von "Buy Tickets" bis Success-Page
   - Ziel: < 5 Sekunden

3. **Webhook Delivery Rate**
   - Stripe Dashboard → Webhooks → Success Rate
   - Ziel: 100%

4. **Ticket Creation Success Rate**
   - Nach erfolgreicher Zahlung, wurden Tickets erstellt?
   - Ziel: 100%

---

## 🔒 Sicherheits-Checks

### Pre-Production Checkliste:

- [ ] Secret Keys sind NICHT im Code committed
- [ ] `.gitignore` enthält `.env*` und `node_modules/`
- [ ] Webhook-Signatur wird verifiziert
- [ ] HTTPS ist erzwungen (Netlify Standard)
- [ ] CORS ist korrekt konfiguriert
- [ ] Firestore Security Rules sind deployed
- [ ] Test-Modus ist deaktiviert (Live Keys verwendet)

---

## 📞 Support & Weitere Hilfe

**Stripe Testing:**
- https://stripe.com/docs/testing

**Test-Karten:**
- https://stripe.com/docs/testing#cards

**Webhook Testing:**
- https://stripe.com/docs/webhooks/test

**Stripe CLI:**
- https://stripe.com/docs/stripe-cli

---

## ✅ Finale Checkliste vor Go-Live

- [ ] Alle Test-Szenarien durchgeführt
- [ ] Stripe Dashboard zeigt erfolgreiche Test-Zahlungen
- [ ] Webhook funktioniert
- [ ] Firebase zeigt erstellte Tickets
- [ ] Error Handling funktioniert
- [ ] Success-Page zeigt korrekte Daten
- [ ] Live-Keys sind konfiguriert (nicht Test-Keys!)
- [ ] Monitoring ist eingerichtet
- [ ] Team ist geschult

**Status:** 🚀 Ready for Production!
