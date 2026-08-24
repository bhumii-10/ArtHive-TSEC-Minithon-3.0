# 🎨 ArtHive — Digital Art Showcase & Artist Interaction Platform

> **🏆 1st Runner-Up — TSEC Minithon 3.0**
> Built in a **6-hour hackathon** among **53 participating teams**

**ArtHive** is a digital art showcase and artist interaction platform designed to help emerging artists **showcase their work, build their creative identity, discover artwork, interact with audiences, and explore new ways of connecting technology with art.**

The platform combines a visually immersive digital-art experience with interactive artwork discovery, artist portfolios, collections, bidding interfaces, comments, direct messaging, and an **AI-powered Art Bot**.

---

## 🌐 Live Demo

[**Visit ArtHive →**](https://arthive-tsec.netlify.app/)

---

## ✨ Why ArtHive?

Digital artists often have to rely on fragmented platforms to showcase their work, build an audience, communicate with potential buyers, and understand how people respond to their creations.

ArtHive brings these experiences together into a **single artist-centric platform** focused on:

- 🎨 Digital artwork discovery
- 👤 Artist portfolios and profiles
- 🖼️ Artwork collections
- 📈 Trending & ranked artworks
- 💬 Community interaction
- 💰 Bidding and marketplace-style interactions
- 🤖 AI-powered assistance
- 🗨️ Artist-to-user communication
- 🎙️ Voice-enabled AI interaction

---

## 🚀 Key Features

### 🎨 Artwork Discovery

Explore digital artwork through a dedicated discovery experience with:

- Trending and ranked artworks
- Category-based exploration
- Time-based ranking filters
- Artwork cards and detailed views
- Popularity indicators such as likes and views

### 👤 Artist Profiles

Artists get a dedicated digital identity where users can explore:

- Artist information
- Portfolio
- Created artworks
- Collections
- Activity
- Social links
- Contact and interaction options

### 🖼️ Collections

Artwork can be organized and explored through curated collections spanning categories such as:

- Digital Art
- Illustration
- 3D / CGI
- Photography
- Abstract Art
- Concept Art
- Mixed Media

### 💬 Interactive Artwork Comments

Artwork pages include a client-side commenting system with:

- Comment creation
- Character-limit validation
- Like / unlike interactions
- Comment deletion
- Relative timestamps
- Persistent browser storage using `localStorage`

### 💰 Bidding & Marketplace Experience

Artwork detail pages provide a marketplace-style interaction experience including:

- Current price
- Highest bid
- Offers
- Auction countdown
- Creator information
- Ownership details
- Artwork properties
- Transaction/activity information

> The current implementation focuses on the **frontend marketplace experience and interaction design**, rather than a production payment or blockchain backend.

### 🤖 AI Art Bot

ArtHive includes an AI assistant designed to help users interact with the platform and explore ideas around digital art.

The AI experience includes:

- Gemini-powered conversational responses
- Conversation history
- Message queuing
- Typing indicators
- Voice input
- Text-to-speech responses
- Interactive 3D assistant experience using Spline

The conversational flow can be summarized as:

<pre>
User Input
    ↓
Speech Recognition / Text Input
    ↓
Conversation History
    ↓
Gemini API
    ↓
AI Response
    ↓
Text Response + Optional Voice Output
</pre>

### 🎙️ Voice Interaction

The Art Bot extends beyond text-based interaction using browser speech APIs.

Users can:

**Speak → Convert speech to text → Ask the AI → Hear the response**

This creates a more immersive interaction model for the AI assistant.

### 💬 Direct Messaging Prototype

ArtHive also experiments with browser-based communication using:

- `BroadcastChannel API`
- `localStorage`
- Active-user tracking
- Message persistence
- Cross-window communication

This demonstrates how real-time-style interaction can be prototyped directly within the browser without requiring a dedicated messaging server.

### 🌙 Dark Mode

The interface supports light and dark themes across the platform, with responsive layouts and theme-aware components.

### 📱 Responsive Design

The platform is designed to adapt across:

- Desktop
- Tablet
- Mobile

using responsive CSS and Tailwind CSS utilities.

---

## 🧠 Technical Highlights

Some of the more interesting implementation concepts explored in ArtHive include:

| Area | Implementation |
|---|---|
| UI Architecture | Multi-page HTML application |
| Styling | CSS + Tailwind CSS |
| Client-side Logic | Vanilla JavaScript |
| Client-side Persistence | `localStorage` |
| Cross-window Communication | `BroadcastChannel API` |
| AI Integration | Google Gemini API |
| Voice Input | Web Speech API |
| Voice Output | Browser Speech Synthesis |
| 3D Experience | Spline |
| Theme Management | Light / Dark Mode |
| Deployment | Netlify |

---

## 🛠️ Tech Stack

### Frontend

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **Tailwind CSS**

### APIs & Browser Technologies

- **Google Gemini API**
- **Web Speech API**
- **Speech Synthesis API**
- **BroadcastChannel API**
- **localStorage**

### Interactive / Visual Technologies

- **Spline**
- Responsive UI
- CSS animations and transitions
- Interactive modals and components

### Development & Deployment

- **Git**
- **GitHub**
- **Netlify**

---

## 🏗️ Project Structure

<pre>
ArtHive/
│
├── Category/              # Category-related pages/assets
├── css/                   # Main and custom stylesheets
├── fonts/                 # Project fonts
├── img/                   # Artwork and UI assets
├── js/                    # JavaScript functionality
│
├── index.html             # Landing page
├── rankings.html          # Artwork rankings
├── collections.html       # Artwork collections
├── user.html              # Artist profile
├── item.html              # Artwork detail page
├── create.html            # Artwork creation/upload interface
├── activity.html          # Activity feed
├── chat.html              # Assistant interface
├── bot.html               # AI Art Bot
├── DM.html                # Direct messaging
├── contact.html           # Contact page
├── login.html             # Authentication UI
└── ...
</pre>

---

## 🎯 Hackathon Context

ArtHive was developed as part of **TSEC Minithon 3.0**, a time-constrained hackathon focused on solving a problem through technology and creativity.

### 🏆 Achievement

**🥈 1st Runner-Up**

- 👥 **53 participating teams**
- ⏱️ **6-hour development challenge**
- 🎤 Final presentation and judging
- 🏅 **Top 10 → 1st Runner-Up**

The time constraint required the team to prioritize the **core user experience, visual storytelling, interaction design, and high-impact features** while building a complete product concept within the available time.

---

## 👥 Team Enthalpy

| Member | Role / Contribution |
|---|---|
| **Bhumi Chotaliya** | Frontend development, UI/UX, interactive features |
| **Dhruv Save** | Development & project contribution |
| **Samarth Bhirud** | Development & project contribution |
| **Shivam Narkar** | Development & project contribution |

### Team Profiles

- **Bhumi Chotaliya** — [GitHub](https://github.com/bhumii-10)
- **Dhruv Save** — [GitHub](https://github.com/DHRUV-SAVE21)
- **Samarth Bhirud** — [GitHub](https://github.com/ssam36)
- **Shivam Narkar** — [GitHub](https://github.com/naarkarrrr)

---

## 📌 Project Status

ArtHive is a **completed hackathon project and functional frontend prototype**.

The project demonstrates the product concept, user interface, client-side interactions, AI assistant experience, and communication prototypes.

For a production-ready platform, the next stage would be introducing a secure backend and persistent infrastructure for features such as authentication, artwork storage, payments, bidding, real-time messaging, and AI API security.

---

## 🔮 Future Improvements

Potential production extensions include:

- 🔐 Secure authentication and authorization
- ☁️ Cloud-based artwork storage
- 🗄️ Persistent database for artists and artworks
- ⚡ WebSocket-based real-time messaging
- 💳 Secure payment and bidding infrastructure
- 🔗 Production-grade blockchain/NFT integration
- 🧠 Server-side sentiment analysis
- 📊 Artist analytics dashboard
- 🤖 Secure backend-based AI integration
- 🔍 Advanced artwork recommendation system
- 🛡️ Content moderation and abuse detection

---

## 🔐 Security Note

API credentials should **never be committed directly to the frontend source code**.

For production deployment, Gemini API access should be moved behind a secure backend or serverless function with appropriate environment-variable management and access restrictions.

---

## 🌐 Links

| Resource | Link |
|---|---|
| 🚀 Live Demo | [arthive-tsec.netlify.app](https://arthive-tsec.netlify.app/) |
| 💻 GitHub | [ArtHive-TSEC-Minithon-3.0](https://github.com/bhumii-10/ArtHive-TSEC-Minithon-3.0) |

---

## ⭐ Project Highlights

> **Built under pressure. Designed for artists. Enhanced with AI.**

**ArtHive** demonstrates how a time-constrained hackathon prototype can combine **creative UI/UX, client-side engineering, browser APIs, AI interaction, and marketplace concepts** into a cohesive digital-art platform.

---

### 🏆 TSEC Minithon 3.0 — 1st Runner-Up

**53 Teams • 6 Hours • One Digital Art Platform**

---
