# 📋 Manueller Ticket-Workflow - Anleitung

## 🎯 Übersicht

Du hast jetzt einen **einfachen, manuellen Workflow**:

```
1. Kunde kauft Ticket → Zahlt mit Stripe ✅
2. Stripe sendet automatische Zahlungsbestätigung an Kunde ✅
3. Bestellung wird in Firebase gespeichert ✅
4. Du siehst Bestellung im Firebase Dashboard 👀
5. Du erstellst manuell Tickets und sendest sie per E-Mail 📧
```

---

## 📊 Bestellungen in Firebase ansehen

### Schritt 1: Firebase Console öffnen

Gehe zu: https://console.firebase.google.com/

### Schritt 2: Dein Projekt auswählen

Wähle: **Tixbro** (oder wie dein Projekt heißt)

### Schritt 3: Firestore Database öffnen

- Linkes Menü → **Firestore Database**
- Du siehst jetzt alle Collections

### Schritt 4: Orders Collection öffnen

- Klicke auf die Collection: **`orders`**
- Hier siehst du **alle Bestellungen**!

---

## 📦 Was siehst du in jeder Bestellung?

Jede Bestellung enthält:

### 🆔 Order Info
- **orderId**: z.B. `ORD-1705320000-abc123`
- **status**: `paid` (Zahlung abgeschlossen)
- **ticketsCreated**: `false` (noch keine Tickets erstellt)
- **ticketsSent**: `false` (noch nicht versendet)

### 💳 Payment Info
- **paymentId**: Stripe Payment Intent ID (z.B. `pi_3ABC...`)
- **paymentStatus**: `completed`
- **totalAmount**: Gesamtbetrag (z.B. `50`)
- **currency**: `INR`

### 👤 Customer Info
- **customerFirstName**: Vorname
- **customerLastName**: Nachname
- **customerEmail**: E-Mail-Adresse
- **customerPhone**: Telefonnummer

### 🎫 Event Info
- **eventId**: Event-ID
- **eventTitle**: Event-Name
- **eventDate**: Datum
- **eventTime**: Uhrzeit
- **eventLocation**: Ort
- **eventVenue**: Venue

### 🎟️ Ticket Info
- **quantity**: Anzahl der gekauften Tickets (z.B. `2`)
- **ticketIds**: `[]` (leer - du füllst das später!)

### 📅 Timestamps
- **createdAt**: Wann die Bestellung erstellt wurde
- **updatedAt**: Letzte Aktualisierung

---

## ✅ Workflow: Tickets manuell erstellen

### Schritt 1: Neue Bestellung in Firebase finden

1. Firebase Console → Firestore Database → `orders`
2. Sortiere nach `createdAt` (neueste zuerst)
3. Finde Bestellungen mit `ticketsCreated: false`

### Schritt 2: Bestelldetails notieren

Notiere dir:
- Kunden-E-Mail
- Event-Name
- Anzahl Tickets
- Order-ID

### Schritt 3: Tickets erstellen

**Option A: Eigenes Ticket-System**
- Erstelle Tickets in deinem System
- Generiere Ticket-PDFs
- Füge QR-Codes hinzu (falls gewünscht)

**Option B: Einfache Text-Tickets**
Erstelle eine E-Mail mit:
```
Liebe/r [Kunde],

vielen Dank für deinen Kauf!

Deine Ticket-Details:
━━━━━━━━━━━━━━━━━━━━
🎫 Event: [Event-Name]
📅 Datum: [Datum]
🕐 Uhrzeit: [Uhrzeit]
📍 Ort: [Ort]
🏛️ Venue: [Venue]

Ticket-IDs:
• TKT-001-[Order-ID]
• TKT-002-[Order-ID]
(Falls mehrere Tickets)

Bitte zeige diese E-Mail am Eingang vor.

Viel Spaß beim Event!
━━━━━━━━━━━━━━━━━━━━

Dein Tixbro Team
```

### Schritt 4: Tickets per E-Mail senden

- Sende die Tickets an die Kunden-E-Mail
- Verwende deine gewohnte E-Mail (Gmail, Outlook, etc.)
- Oder nutze später Brevo für automatische Versendung

### Schritt 5: Bestellung in Firebase aktualisieren

Gehe zurück zu Firebase:

1. Klicke auf die Bestellung
2. Bearbeite folgende Felder:
   - **ticketsCreated**: Ändere zu `true`
   - **ticketsSent**: Ändere zu `true`
   - **ticketIds**: Füge die Ticket-IDs hinzu (z.B. `["TKT-001-abc", "TKT-002-abc"]`)
   - **status**: Ändere zu `completed`
3. Speichern!

---

## 🔍 Bestellungen filtern

### Neue Bestellungen finden (noch nicht bearbeitet)
```
ticketsCreated == false
```

### Bestellungen nach Kunde suchen
```
customerEmail == "kunde@example.com"
```

### Bestellungen nach Event filtern
```
eventTitle == "Dein Event Name"
```

---

## 📝 Beispiel: Kompletter Workflow

**1. Neue Bestellung ist da:**
```json
{
  "orderId": "ORD-1705320000-abc123",
  "status": "paid",
  "customerEmail": "max@example.com",
  "customerFirstName": "Max",
  "customerLastName": "Mustermann",
  "eventTitle": "Konzert 2024",
  "quantity": 2,
  "totalAmount": 100,
  "ticketsCreated": false
}
```

**2. Du siehst das in Firebase:**
- Neuer Eintrag in `orders` Collection
- `ticketsCreated: false` → Muss noch bearbeitet werden

**3. Du erstellst Tickets:**
- Ticket 1: `TKT-001-abc123`
- Ticket 2: `TKT-002-abc123`

**4. Du sendest E-Mail an:** `max@example.com`

**5. Du aktualisierst Firebase:**
```json
{
  "ticketsCreated": true,
  "ticketsSent": true,
  "ticketIds": ["TKT-001-abc123", "TKT-002-abc123"],
  "status": "completed"
}
```

**6. Fertig!** ✅

---

## 💡 Tipps

### Tägliche Routine
- Morgens: Firebase öffnen → `orders` checken
- Filter: `ticketsCreated == false`
- Alle neuen Bestellungen bearbeiten
- Tickets erstellen & versenden
- Firebase aktualisieren

### Excel/Sheets für Übersicht (Optional)
Exportiere Bestellungen und führe ein Spreadsheet:
- Spalte A: Order-ID
- Spalte B: Kunde
- Spalte C: Event
- Spalte D: Anzahl Tickets
- Spalte E: Status (✅ Versendet / ⏳ Ausstehend)

### Automatisierung später
Später kannst du upgraden auf:
- Webhook-basierte automatische Ticketerstellung
- Brevo E-Mail-Automation
- PDF-Ticket-Generierung
- QR-Code-Integration

---

## ⚠️ Wichtig

### Stripe Zahlungsbestätigungen
- Stripe sendet **automatisch** eine Zahlungsbestätigung an den Kunden
- Das ist **nicht** das Ticket!
- In der Zahlungsbestätigung steht nur: "Zahlung erfolgreich"
- Du musst **zusätzlich** die Tickets per E-Mail senden!

### Kunde erhält also 2 E-Mails:
1. **Von Stripe** (sofort): "Zahlung erfolgreich - €50 bezahlt"
2. **Von dir** (manuell): "Hier sind deine Tickets für Event XYZ"

---

## 🚀 Upgrade-Path (Später)

Wenn du automatisieren möchtest:

**Phase 1 (Jetzt):**
- ✅ Stripe Zahlungen funktionieren
- ✅ Bestellungen in Firebase
- ⏰ Manuelle Ticket-Erstellung

**Phase 2 (Später):**
- ✅ Webhook-basierte automatische Ticketerstellung
- ✅ Brevo E-Mail-Automation
- ✅ Kontakte automatisch in Brevo anlegen
- ⏰ Manuelle PDF-Generierung

**Phase 3 (Future):**
- ✅ Automatische PDF-Ticket-Generierung
- ✅ QR-Code-Integration
- ✅ Check-In-System
- ✅ Mobile App

---

## 📞 Support

Fragen? Probleme?
- Siehe `NETLIFY_SETUP.md` für Umgebungsvariablen
- Siehe Firebase Firestore Docs: https://firebase.google.com/docs/firestore

---

**Status:** Production Ready (Manueller Workflow)! 🎉
