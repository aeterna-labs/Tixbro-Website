# 📧 E-Mail-Bestätigungs-System - SendGrid Setup

## Übersicht

Nach jedem erfolgreichen Ticket-Kauf erhalten Kunden automatisch eine professionell gestaltete Bestätigungs-E-Mail mit:
- ✅ Event-Details (Titel, Datum, Zeit, Ort)
- ✅ Alle Ticket-IDs
- ✅ Zahlungsbestätigung
- ✅ QR-Code-Platzhalter für Check-In
- ✅ Responsive Design (funktioniert auf Mobile & Desktop)

---

## 🚀 SendGrid Setup (15 Minuten)

### Schritt 1: SendGrid Account erstellen

1. **Gehe zu:** https://signup.sendgrid.com
2. **Erstelle kostenlosen Account:**
   - Plan: Free (100 E-Mails/Tag kostenlos)
   - Registrierung mit E-Mail
   - Bestätige E-Mail-Adresse

3. **Nach Login:**
   - Du landest im SendGrid Dashboard
   - Dashboard: https://app.sendgrid.com

---

### Schritt 2: Sender Identity verifizieren

SendGrid benötigt eine verifizierte Absender-E-Mail-Adresse:

#### Option A: Single Sender Verification (Schnell & Einfach)

1. **Gehe zu:** Settings → Sender Authentication → Single Sender Verification
2. **Klicke:** "Create New Sender"
3. **Fülle aus:**
   ```
   From Name: Tixbro
   From Email: noreply@deine-domain.com
   Reply To: support@deine-domain.com

   Company Address:
   [Deine Firmenadresse]

   Company City: [Stadt]
   Company State: [Bundesland]
   Company Zip: [PLZ]
   Company Country: [Land]
   ```

4. **Klicke:** "Create"
5. **Bestätige E-Mail:** SendGrid sendet Bestätigungs-E-Mail an `noreply@deine-domain.com`
6. **Klicke Link** in der E-Mail → **Verified!** ✅

#### Option B: Domain Authentication (Empfohlen für Production)

Wenn du deine eigene Domain besitzt:

1. **Gehe zu:** Settings → Sender Authentication → Domain Authentication
2. **Klicke:** "Authenticate Your Domain"
3. **Wähle DNS Provider:** (z.B. Cloudflare, GoDaddy, etc.)
4. **Füge DNS Records hinzu** (CNAME-Einträge)
5. **Verifiziere Domain**

**Vorteil:** Bessere Zustellbarkeit, professioneller

---

### Schritt 3: API Key erstellen

1. **Gehe zu:** Settings → API Keys
2. **Klicke:** "Create API Key"
3. **Name:** `Tixbro Production`
4. **Permissions:** Full Access (oder wähle "Restricted Access" → Mail Send)
5. **Klicke:** "Create & View"

6. **WICHTIG - Kopiere den API Key:**
   ```
   SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
   ⚠️ **Dieser Key wird nur EINMAL angezeigt!** Kopiere ihn jetzt!

---

### Schritt 4: Umgebungsvariablen in Netlify setzen

1. **Gehe zu:** https://app.netlify.com
2. **Wähle Projekt:** Tixbro-Website
3. **Gehe zu:** Site settings → Environment variables
4. **Füge 2 neue Variablen hinzu:**

#### Variable 1: SendGrid API Key
```
Key:   SENDGRID_API_KEY
Value: SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
(Ersetze mit deinem echten API Key von Schritt 3)

#### Variable 2: Absender-E-Mail
```
Key:   SENDGRID_FROM_EMAIL
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
4. **Check E-Mail-Posteingang**

**Erwartetes Ergebnis:**
- ✅ E-Mail kommt an (innerhalb von 30 Sekunden)
- ✅ Betreff: "✓ Ticket-Bestätigung - [Event-Name]"
- ✅ Absender: Tixbro <noreply@deine-domain.com>
- ✅ Inhalt: Event-Details, Ticket-IDs, Zahlungsbestätigung

---

### Test 2: Spam-Ordner prüfen

Falls E-Mail nicht ankommt:

1. **Check Spam/Junk-Ordner**
2. **Check SendGrid Activity:**
   - Gehe zu: SendGrid Dashboard → Activity
   - Zeigt alle gesendeten E-Mails
   - Status: Delivered, Bounced, etc.

---

### Test 3: Multiple Tickets

1. **Kaufe 3 Tickets**
2. **Check E-Mail:**
   - ✅ Zeigt "Ihre Tickets (3x)"
   - ✅ Listet alle 3 Ticket-IDs auf

---

## 📊 SendGrid Dashboard

### Activity Feed
- **Gehe zu:** Email API → Activity Feed
- **Zeigt:** Alle gesendeten E-Mails
- **Filtere nach:** Status, Datum, E-Mail-Adresse

### Statistics
- **Gehe zu:** Email API → Stats
- **Zeigt:**
  - Gesendete E-Mails
  - Delivered Rate
  - Open Rate (wenn Tracking aktiviert)
  - Click Rate

---

## 🔧 Troubleshooting

### Problem: E-Mail kommt nicht an

**Lösung 1: Check SendGrid Activity**
```
1. SendGrid Dashboard → Activity Feed
2. Suche nach Empfänger-E-Mail
3. Status prüfen:
   - Delivered ✅ → E-Mail wurde zugestellt
   - Bounced ❌ → E-Mail-Adresse ungültig
   - Deferred ⏳ → Zustellung verzögert
```

**Lösung 2: Check Netlify Logs**
```
1. Netlify Dashboard → Functions
2. Wähle: send-confirmation-email
3. View Logs
4. Check auf Fehler
```

**Lösung 3: Check Umgebungsvariablen**
```
1. Netlify → Site settings → Environment variables
2. SENDGRID_API_KEY ist gesetzt ✅
3. SENDGRID_FROM_EMAIL ist gesetzt ✅
4. Werte sind korrekt ✅
```

---

### Problem: "Error: Mail send failed" in Logs

**Ursache:** API Key ungültig oder Sender nicht verifiziert

**Lösung:**
1. **Check API Key:**
   - Gehe zu SendGrid → Settings → API Keys
   - Ist Key aktiv? ✅
   - Erstelle neuen Key falls nötig

2. **Check Sender Verification:**
   - Gehe zu Settings → Sender Authentication
   - Status: Verified ✅

3. **Update Netlify Umgebungsvariablen**
   - Mit neuem API Key

4. **Trigger neues Deployment**

---

### Problem: E-Mail landet im Spam

**Ursachen:**
- Sender nicht verifiziert
- Domain nicht authentifiziert
- Neuer SendGrid Account

**Lösungen:**
1. **Domain Authentication durchführen** (siehe Schritt 2, Option B)
2. **SPF & DKIM Records** hinzufügen (in DNS)
3. **Reputation aufbauen:**
   - Sende anfangs nur an echte Empfänger
   - Vermeide Spam-Trigger-Wörter
   - Gib Abmelde-Link an (optional)

---

### Problem: "Rate limit exceeded"

**Ursache:** Gratis-Plan hat Limit von 100 E-Mails/Tag

**Lösung:**
1. **Upgrade zu bezahltem Plan:**
   - Essentials: $19.95/Monat (50.000 E-Mails)
   - Pro: $89.95/Monat (1.5 Mio E-Mails)

2. **Oder warte 24 Stunden** (Limit wird täglich zurückgesetzt)

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
    <img src="https://deine-domain.com/logo.png" alt="Tixbro" style="max-width: 200px;">
    <p style="color: #ffffff; margin: 10px 0 0 0;">Ihre Ticket-Bestätigung</p>
  </td>
</tr>
```

### Text anpassen:

Ändere Texte direkt im HTML-Template:
- "Vielen Dank für Ihren Kauf!" → Dein Text
- Footer-Text anpassen
- Support-E-Mail ändern

---

## 📈 Erweiterte Features (Optional)

### 1. E-Mail-Tracking aktivieren

```javascript
// In send-confirmation-email.js
const msg = {
  // ... existing config
  tracking_settings: {
    click_tracking: { enable: true },
    open_tracking: { enable: true }
  }
};
```

**Nutzen:** Siehst du in SendGrid Stats:
- Wie viele Kunden E-Mail geöffnet haben
- Welche Links geklickt wurden

---

### 2. Attachments hinzufügen

```javascript
// PDF-Ticket als Anhang
const msg = {
  // ... existing config
  attachments: [
    {
      content: base64EncodedPDF,
      filename: `ticket-${ticketId}.pdf`,
      type: 'application/pdf',
      disposition: 'attachment'
    }
  ]
};
```

---

### 3. Templates mit Dynamic Content

SendGrid bietet Dynamic Templates:

1. **Erstelle Template** in SendGrid UI
2. **Verwende Handlebars** für dynamische Daten
3. **Sende mit Template ID**

```javascript
const msg = {
  to: customerEmail,
  from: 'noreply@tixbro.com',
  templateId: 'd-xxxxxxxxxxxxxx',
  dynamicTemplateData: {
    eventTitle: 'My Event',
    ticketId: 'TKT-123'
  }
};
```

---

### 4. Multi-Language Support

Basierend auf Kundensprache:

```javascript
// In send-confirmation-email.js
const language = customerLanguage || 'de'; // deutsch als Standard

const templates = {
  de: { subject: 'Ticket-Bestätigung', ... },
  en: { subject: 'Ticket Confirmation', ... },
  hi: { subject: 'टिकट पुष्टि', ... }
};

const template = templates[language];
```

---

## 📋 Checkliste für Production

Vor Go-Live sicherstellen:

- [ ] SendGrid Account erstellt
- [ ] Sender verifiziert (Single Sender oder Domain)
- [ ] API Key erstellt und kopiert
- [ ] `SENDGRID_API_KEY` in Netlify gesetzt
- [ ] `SENDGRID_FROM_EMAIL` in Netlify gesetzt
- [ ] Deployment durchgeführt
- [ ] Test-E-Mail erfolgreich versendet
- [ ] E-Mail kommt nicht in Spam
- [ ] E-Mail-Design auf Mobile getestet
- [ ] Multiple Tickets getestet

---

## 💰 SendGrid Preise

| Plan | Preis/Monat | E-Mails/Monat | Ideal für |
|------|-------------|---------------|-----------|
| **Free** | €0 | 100/Tag (3.000/Monat) | Testing, kleine Startups |
| **Essentials** | ~€17 | 50.000 | Kleine Unternehmen |
| **Pro** | ~€80 | 1.500.000 | Mittelgroße Unternehmen |

**Tipp:** Starte mit Free Plan, upgrade bei Bedarf.

---

## 🔗 Nützliche Links

- **SendGrid Signup:** https://signup.sendgrid.com
- **SendGrid Dashboard:** https://app.sendgrid.com
- **SendGrid Docs:** https://docs.sendgrid.com
- **API Reference:** https://docs.sendgrid.com/api-reference/mail-send/mail-send
- **Troubleshooting:** https://docs.sendgrid.com/ui/sending-email/troubleshooting-delays-and-latency

---

## 📞 Support

**Bei Problemen:**
1. Check diese Dokumentation
2. SendGrid Activity Feed prüfen
3. Netlify Functions Logs prüfen
4. SendGrid Support: https://support.sendgrid.com

---

**Status:** ✅ E-Mail-System ist produktionsreif!

**Letzte Aktualisierung:** 1. Dezember 2025
