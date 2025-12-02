# 📧 E-Mail-Bestätigungs-System - Brevo Setup

## Übersicht

Nach jedem erfolgreichen Ticket-Kauf erhalten Kunden automatisch eine professionell gestaltete Bestätigungs-E-Mail mit:
- ✅ Event-Details (Titel, Datum, Zeit, Ort)
- ✅ Alle Ticket-IDs
- ✅ Zahlungsbestätigung
- ✅ QR-Code-Platzhalter für Check-In
- ✅ Responsive Design (funktioniert auf Mobile & Desktop)

**Warum Brevo?**
- 🎉 **300 E-Mails/Tag kostenlos** (vs 100 bei SendGrid)
- 🇪🇺 **DSGVO-konform** (EU-Server)
- 🎨 **Modernes Dashboard**
- 💰 **Besserer Free-Plan**

---

## 🚀 Brevo Setup (10 Minuten)

### Schritt 1: Brevo Account erstellen

1. **Gehe zu:** https://onboarding.brevo.com/account/register
2. **Erstelle kostenlosen Account:**
   - Plan: Free (300 E-Mails/Tag kostenlos!)
   - Registrierung mit E-Mail
   - Bestätige E-Mail-Adresse

3. **Nach Login:**
   - Du landest im Brevo Dashboard
   - Dashboard: https://app.brevo.com

---

### Schritt 2: Sender Identity verifizieren

Brevo benötigt eine verifizierte Absender-E-Mail-Adresse:

#### Option A: Single Sender Verification (Schnell & Einfach) ✅ **EMPFOHLEN**

1. **Gehe zu:** Senders & IP → Senders
2. **Klicke:** "Add a sender"
3. **Fülle aus:**
   ```
   From Name: Tixbro
   From Email: noreply@deine-domain.com
   (oder eine Gmail/Outlook-Adresse für Testing)
   ```

4. **Klicke:** "Create"
5. **Bestätige E-Mail:** Brevo sendet Bestätigungs-E-Mail
6. **Klicke Link** in der E-Mail → **Verified!** ✅

**Tipp:** Für Testing kannst du deine persönliche E-Mail verwenden (z.B. Gmail). Für Production solltest du eine Domain-E-Mail nutzen.

#### Option B: Domain Authentication (Für Production empfohlen)

Wenn du deine eigene Domain besitzt:

1. **Gehe zu:** Senders & IP → Domains
2. **Klicke:** "Add a domain"
3. **Domain eingeben:** z.B. `tixbro.com`
4. **DNS Records hinzufügen:**
   - SPF Record (TXT)
   - DKIM Record (TXT)
   - DMARC Record (optional)
5. **Verifiziere Domain** (kann 24-48h dauern)

**Vorteil:** Bessere Zustellbarkeit, professioneller, keine Spam-Probleme

---

### Schritt 3: API Key erstellen

1. **Gehe zu:** Settings → SMTP & API → API Keys
   - Oder direkt: https://app.brevo.com/settings/keys/api

2. **Klicke:** "Generate a new API key"

3. **Name:** `Tixbro Production`

4. **Klicke:** "Generate"

5. **WICHTIG - Kopiere den API Key:**
   ```
   xkeysib-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxx
   ```
   ⚠️ **Dieser Key wird nur EINMAL angezeigt!** Kopiere ihn jetzt!

**Beispiel:**
```
xkeysib-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxx
```
_(Verwende deinen eigenen API Key von Brevo)_

---

### Schritt 4: Umgebungsvariablen in Netlify setzen

1. **Gehe zu:** https://app.netlify.com
2. **Wähle Projekt:** Tixbro-Website
3. **Gehe zu:** Site settings → Environment variables
4. **Füge 2 neue Variablen hinzu:**

#### Variable 1: Brevo API Key
```
Key:   BREVO_API_KEY
Value: [Dein Brevo API Key - beginnt mit xkeysib-...]
```

#### Variable 2: Absender-E-Mail
```
Key:   BREVO_FROM_EMAIL
Value: noreply@deine-domain.com
```
(Verwende die verifizierte E-Mail aus Schritt 2)

5. **Klicke:** "Save"

---

### Schritt 5: Deployment auslösen

Nach dem Setzen der Umgebungsvariablen:

1. **Gehe zu:** Deploys Tab
2. **Klicke:** "Trigger deploy" → "Deploy site"
3. **Warte:** 2-3 Minuten
4. **Status:** "Published" ✅

---

## 🧪 Testing

### Test 1: Manuelle Test-E-Mail

Führe einen Test-Kauf durch:

1. **Öffne deine Website**
2. **Wähle Event**
3. **Kaufe Ticket** (Test-Karte: `4242 4242 4242 4242`)
4. **Check E-Mail-Posteingang** (innerhalb von 30 Sekunden)

**Erwartetes Ergebnis:**
- ✅ E-Mail kommt an
- ✅ Betreff: "✓ Ticket-Bestätigung - [Event-Name]"
- ✅ Absender: Tixbro <noreply@deine-domain.com>
- ✅ Inhalt: Event-Details, Ticket-IDs, Zahlungsbestätigung

---

### Test 2: Brevo Dashboard prüfen

1. **Gehe zu:** Transactional → Templates (oder Email → Transactional)
2. **Siehst du gesendete E-Mails?** ✅
3. **Status:** Delivered ✅

Oder:

1. **Gehe zu:** Logs → Email activity
2. **Filtere nach:** deiner Kunden-E-Mail
3. **Status prüfen:**
   - Sent ✅
   - Delivered ✅
   - Opened (optional, wenn Tracking aktiviert)

---

### Test 3: Spam-Ordner prüfen

Falls E-Mail nicht ankommt:

1. **Check Spam/Junk-Ordner**
2. **Check Brevo Logs:**
   - Gehe zu: Logs → Email activity
   - Zeigt alle gesendeten E-Mails
   - Status: Delivered, Bounced, etc.

---

### Test 4: Multiple Tickets

1. **Kaufe 3 Tickets**
2. **Check E-Mail:**
   - ✅ Zeigt "Ihre Tickets (3x)"
   - ✅ Listet alle 3 Ticket-IDs auf

---

## 📊 Brevo Dashboard

### Email Activity (Logs)
- **Gehe zu:** Logs → Email activity
- **Zeigt:** Alle gesendeten E-Mails in Echtzeit
- **Filtere nach:** Status, Datum, E-Mail-Adresse, Campaign
- **Details:** Click-Through, Open-Rate, etc.

### Statistics
- **Gehe zu:** Statistics → Email
- **Zeigt:**
  - Gesendete E-Mails (täglich/monatlich)
  - Delivered Rate (Zustellrate)
  - Open Rate (Öffnungsrate)
  - Click Rate (Klickrate)
  - Bounce Rate (Rückläufer)

**Beispiel:**
```
Heute:
- 15 E-Mails gesendet
- 15 zugestellt (100%)
- 12 geöffnet (80%)
- 0 Bounces (0%)
```

---

## 🔧 Troubleshooting

### Problem: E-Mail kommt nicht an

**Lösung 1: Check Brevo Logs**
```
1. Brevo Dashboard → Logs → Email activity
2. Suche nach Empfänger-E-Mail
3. Status prüfen:
   - Sent ✅ → E-Mail wurde gesendet
   - Delivered ✅ → E-Mail wurde zugestellt
   - Soft bounce ⚠️ → Temporäres Problem
   - Hard bounce ❌ → E-Mail-Adresse ungültig
   - Blocked ❌ → Spam-Filter blockiert
```

**Lösung 2: Check Netlify Logs**
```
1. Netlify Dashboard → Functions
2. Wähle: send-confirmation-email
3. View Logs
4. Check auf Fehler (rote Zeilen)
```

**Lösung 3: Check Umgebungsvariablen**
```
1. Netlify → Site settings → Environment variables
2. BREVO_API_KEY ist gesetzt ✅
3. BREVO_FROM_EMAIL ist gesetzt ✅
4. Werte sind korrekt ✅
```

**Lösung 4: Check Sender**
```
1. Brevo → Senders & IP → Senders
2. E-Mail ist verifiziert ✅
3. Status: Active ✅
```

---

### Problem: "Error: Unauthorized" in Logs

**Ursache:** API Key ungültig oder falsch

**Lösung:**
1. **Check API Key in Brevo:**
   - Gehe zu Settings → SMTP & API → API Keys
   - Ist Key aktiv? ✅
   - Erstelle neuen Key falls nötig

2. **Update Netlify Umgebungsvariablen:**
   - Mit neuem/korrektem API Key
   - Key kopieren (beginnt mit `xkeysib-`)

3. **Trigger neues Deployment**

---

### Problem: "Error: Sender not verified"

**Ursache:** Absender-E-Mail nicht verifiziert

**Lösung:**
1. **Gehe zu:** Senders & IP → Senders
2. **Check Status:** E-Mail muss "Verified" sein ✅
3. **Falls nicht verified:**
   - Klicke "Resend verification email"
   - Check E-Mail-Posteingang
   - Klicke Bestätigungslink

4. **Update `BREVO_FROM_EMAIL`** in Netlify
   - Mit verifizierter E-Mail

---

### Problem: E-Mail landet im Spam

**Ursachen:**
- Sender nicht verifiziert
- Domain nicht authentifiziert
- Neuer Brevo Account
- Spam-ähnlicher Inhalt

**Lösungen:**

1. **Domain Authentication durchführen** (siehe Schritt 2, Option B)
   - SPF Record hinzufügen
   - DKIM Record hinzufügen
   - DMARC Record hinzufügen (optional)

2. **Reputation aufbauen:**
   - Sende anfangs nur an echte Empfänger (keine Wegwerf-E-Mails)
   - Vermeide Spam-Trigger-Wörter ("GRATIS", "JETZT KAUFEN", etc.)
   - Gib Abmelde-Link an (bei Marketing-E-Mails)

3. **Warm-up:**
   - Brevo hat automatisches IP Warm-up
   - Sende anfangs nicht zu viele E-Mails

---

### Problem: "Rate limit exceeded"

**Ursache:** Gratis-Plan hat Limit von 300 E-Mails/Tag

**Lösung:**

1. **Check Tages-Limit:**
   - Brevo Dashboard → Statistics
   - Siehst du wie viele E-Mails heute versendet?

2. **Warte bis Mitternacht** (Limit wird täglich zurückgesetzt)

3. **Oder upgrade zu bezahltem Plan:**
   - Lite: €25/Monat (20.000 E-Mails)
   - Premium: €65/Monat (120.000 E-Mails)

---

## 🎨 E-Mail-Template anpassen

Das E-Mail-Template ist in der Funktion:
`netlify/functions/send-confirmation-email.js`

### Farben ändern:

```javascript
// Primärfarbe (Gradient)
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

// Akzentfarbe
background-color: #10b981; // Grün für Success

// Text
color: #333; // Dunkelgrau
color: #666; // Mittelgrau
color: #999; // Hellgrau
```

### Logo hinzufügen:

```html
<!-- In der Header-Sektion -->
<tr>
  <td style="background: ...; padding: 40px 30px; text-align: center;">
    <img src="https://deine-domain.com/logo.png" alt="Tixbro" style="max-width: 200px; margin-bottom: 10px;">
    <h1 style="color: #ffffff; margin: 0; font-size: 32px;">Tixbro</h1>
    <p style="color: #ffffff; margin: 10px 0 0 0;">Ihre Ticket-Bestätigung</p>
  </td>
</tr>
```

### Text anpassen:

Ändere Texte direkt im HTML-Template (Zeile 88-256):
- "Vielen Dank für Ihren Kauf!" → Dein Text
- Footer-Text anpassen
- Support-E-Mail ändern

### Sprache ändern:

Erstelle mehrere Templates für verschiedene Sprachen:
- Deutsch (Standard)
- Englisch
- Hindi

---

## 📈 Erweiterte Features (Optional)

### 1. E-Mail-Tracking aktivieren

Brevo bietet automatisches Tracking! Aktiviere es:

1. **Gehe zu:** Settings → Tracking
2. **Aktiviere:**
   - Open Tracking ✅
   - Click Tracking ✅
   - Google Analytics (optional)

**Nutzen:** Siehst du in Statistics:
- Wie viele Kunden E-Mail geöffnet haben
- Welche Links geklickt wurden

---

### 2. Templates mit Brevo UI erstellen

Brevo bietet einen visuellen Template-Editor:

1. **Gehe zu:** Transactional → Templates
2. **Klicke:** "Create a template"
3. **Verwende Drag & Drop Editor**
4. **Speichere Template**
5. **Verwende Template-ID** in Code:

```javascript
sendSmtpEmail.templateId = 123; // Deine Template-ID
sendSmtpEmail.params = {
  eventTitle: 'My Event',
  ticketId: 'TKT-123',
  // ... weitere Variablen
};
```

---

### 3. Webhooks einrichten

Erhalte Benachrichtigungen bei Events:

1. **Gehe zu:** Settings → Webhooks
2. **Klicke:** "Add a webhook"
3. **URL:** `https://deine-domain.netlify.app/.netlify/functions/brevo-webhook`
4. **Events:**
   - Email delivered ✅
   - Email opened ✅
   - Email clicked ✅
   - Email soft bounce ⚠️
   - Email hard bounce ❌

---

### 4. SMS-Versand (Bonus!)

Brevo bietet auch **kostenlose SMS** im Free-Plan:

```javascript
// In einer neuen Function
const smsAPI = new brevo.TransactionalSMSApi();
smsAPI.setApiKey(brevo.TransactionalSMSApiApiKeys.apiKey, process.env.BREVO_API_KEY);

const sendTransacSms = new brevo.SendTransacSms();
sendTransacSms.sender = 'Tixbro';
sendTransacSms.recipient = '+491234567890';
sendTransacSms.content = `Ihr Ticket: TKT-123. Event: ${eventTitle}`;

await smsAPI.sendTransacSms(sendTransacSms);
```

---

## 📋 Checkliste für Production

Vor Go-Live sicherstellen:

- [x] Brevo Account erstellt ✅
- [x] Brevo API Key vorhanden ✅
- [x] `BREVO_API_KEY` in Netlify gesetzt (dein Key ist bereits da!)
- [ ] Sender verifiziert
- [ ] `BREVO_FROM_EMAIL` in Netlify gesetzt
- [ ] Deployment durchgeführt
- [ ] Test-E-Mail erfolgreich versendet
- [ ] E-Mail kommt nicht in Spam
- [ ] E-Mail-Design auf Mobile getestet
- [ ] Multiple Tickets getestet
- [ ] Brevo Logs zeigen "Delivered" ✅

---

## 💰 Brevo Preise (besser als SendGrid!)

| Plan | Preis/Monat | E-Mails/Monat | SMS Bonus |
|------|-------------|---------------|-----------|
| **Free** | €0 | **9.000** (300/Tag) | ✅ 40 SMS |
| **Lite** | ~€25 | 20.000 | ✅ SMS inklusive |
| **Premium** | ~€65 | 120.000 | ✅ SMS inklusive |
| **Enterprise** | Custom | Unlimited | ✅ Custom |

**Vergleich SendGrid:**
- SendGrid Free: 100/Tag = 3.000/Monat ❌
- Brevo Free: 300/Tag = 9.000/Monat ✅ **3x mehr!**

---

## 🔗 Nützliche Links

- **Brevo Signup:** https://onboarding.brevo.com/account/register
- **Brevo Dashboard:** https://app.brevo.com
- **Brevo Docs:** https://developers.brevo.com
- **API Reference:** https://developers.brevo.com/reference
- **Transactional Email Docs:** https://developers.brevo.com/reference/sendtransacemail
- **Support:** https://help.brevo.com

---

## 📞 Support

**Bei Problemen:**
1. Check diese Dokumentation
2. Brevo Logs prüfen (Logs → Email activity)
3. Netlify Functions Logs prüfen
4. Brevo Support: https://help.brevo.com (sehr guter Support!)

**Live Chat:**
- Brevo Dashboard → Help-Icon (unten rechts)
- 24/7 Support bei bezahlten Plänen
- Business Hours bei Free-Plan

---

## ✨ Vorteile Brevo vs SendGrid

| Feature | Brevo | SendGrid |
|---------|-------|----------|
| **Kostenlose E-Mails/Tag** | **300** 🏆 | 100 |
| **Kostenlose E-Mails/Monat** | **9.000** 🏆 | 3.000 |
| **SMS inklusive** | **✅ Ja** 🏆 | ❌ Nein |
| **UI/UX** | **Modern** 🏆 | Älter |
| **Setup** | **Einfacher** 🏆 | Komplizierter |
| **DSGVO** | **EU-Server** 🏆 | US-Server |
| **Support** | **Besser** 🏆 | Gut |
| **Preis/Leistung** | **Besser** 🏆 | Teurer |

**Fazit:** Brevo ist die bessere Wahl! 🎉

---

**Status:** ✅ E-Mail-System ist produktionsreif mit Brevo!

**Dein API Key ist bereits vorhanden - du musst nur noch:**
1. ✅ Sender verifizieren (5 Min)
2. ✅ Umgebungsvariablen in Netlify setzen (2 Min)
3. ✅ Deployment auslösen (3 Min)
4. ✅ Testen! 🎉

**Letzte Aktualisierung:** 2. Dezember 2025
