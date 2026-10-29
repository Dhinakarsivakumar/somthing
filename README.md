# Maria's Magical Ring Proposal 💍❤️

A cinematic, interactive proposal website built for Maria.

## ✨ Highlights & Experience Flow

1. **Chapter 1 — The Romantic Introduction (`IntroScene`)**
   - Deep burgundy starry backdrop with floating petals, glowing particles, and pulsing hearts.
   - Staggered emotional quote: *"Every love story is special, but ours is my favorite."*
   - *"Maria, I made something special just for you. ❤️"*
   - Interactive glowing button: **"Open Your Little Surprise 💌"** with heart burst explosion.

2. **Chapter 2 — The First Ring: The Heart Ring (`HeartRingScene`)**
   - Feminine hand resting gently, masculine hand entering holding the custom heart ring.
   - Text reveal: *"Maria, I love you. Will you accept this heart ring from me? ❤️💍"*
   - Options: *"Yes, I accept your ring! ❤️"* and respectful *"I need a moment..."*.
   - On acceptance: Ring slides onto her finger with sparkle glow and floating petals.
   - Continuity guarantee: The heart ring remains on her finger throughout all subsequent scenes.

3. **Chapter 3 — The Marriage Proposal: The Second Ring (`MarriageProposalScene`)**
   - The same feminine hand returns with the **heart ring already present**.
   - Masculine hand enters holding the marriage proposal diamond ring.
   - Text reveal: *"Maria, will you marry me? ❤️💍"*
   - On acceptance: Second ring is placed beside the first ring. **Both rings shine together** with close-up zoom and sparkling reflections.
   - *"Two rings. Two beautiful promises. One future together. ❤️"*

4. **Chapter 4 — A Personal Message From Maria (`MariaMessageScene`)**
   - Intimate atmosphere: *"What would you like to say to me, Maria?"*
   - Elegant glowing textarea for her genuine personal message.
   - Displays her message as a handwritten love letter note on parchment with gentle floating hearts.
   - Includes an **"Edit Message ✏️"** option and **"Continue to Your Final Surprise 🎁"**.

5. **Chapter 5 — The Magical Necklace Surprise (`NecklaceRevealScene`)**
   - 3D velvet jewelry gift box with gold trim, realistic lid hinge, and ribbon.
   - Unboxes smoothly: ribbon loosens, lid rotates open, golden light and hearts surge upward.
   - Delicate necklace rises and turns gently in the air with glowing heart outline.
   - Climax: *"I LOVE YOU, MARIA. FOREVER AND ALWAYS. ❤️💍"*.

6. **Chapter 6 — Your Recorded Voice (`VoiceMessageScene`)**
   - Plays your recorded voice saying: *"I love you, Maria."*
   - Waveform visualization, volume slider, replay button, and graceful autoplay fallback button (*"Listen to My Voice ❤️"*).

7. **Chapter 7 — Our Little Love Story (`FinalScene`)**
   - Closing love note with floating hearts and starlight.
   - *"Watch Our Story Again 💕"* (resets experience cleanly) & *"Keep This Moment ❤️"*.

---

## 🛠️ Tech Stack

- **React 19 + TypeScript**
- **Vite** (Lightning fast, relative base path `./` for 100% static hosting compatibility)
- **Tailwind CSS v4**
- **Framer Motion** (Cinematic physics, staggered reveals, orchestrated SVG animations)
- **Lucide React** (Clean icons)
- **Web Audio API + HTML5 Audio** (Built-in ambient backup synthesizer + real audio player)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
The compiled, self-contained production bundle will be generated in the `dist/` directory.

---

## 📸 Adding Your Real Photos and Voice

Drop your personalized files into the `public/assets/` directory:

- **Voice Recording**: `public/assets/proposal-voice.mp3` (Saying *"I love you, Maria."*)
- **Background Music**: `public/assets/romantic-music.mp3` (Soft romantic piano/guitar)
- **Necklace Photo**: `public/assets/necklace.png` (Transparent PNG of Maria's necklace)
- **Heart Ring Photo**: `public/assets/heart-ring.png` (Optional photo of the heart ring)
- **Proposal Ring Photo**: `public/assets/proposal-ring.png` (Optional photo of the proposal ring)
- **Maria's Photo**: `public/assets/maria-photo.jpg` (Optional portrait)

> **Note:** If any file is not yet added, the website automatically falls back to custom high-detail SVGs and a Web Audio ambient chord generator, ensuring the site is always functional and beautiful.

---

## 🌐 Deploying to GitHub Pages

1. In `package.json`, add a deploy script if desired:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
2. Or use GitHub Actions:
   - Push your code to a GitHub repository.
   - Go to **Settings** → **Pages**.
   - Under **Build and deployment**, select **GitHub Actions**.
   - Select the static Vite template. It will deploy your `dist/` automatically!

---

## 📱 Mobile Verification Checklist

- [x] Responsive layout tested for iPhone, Android, and tablets (no horizontal scroll).
- [x] Touch-friendly interactive buttons with large tap targets.
- [x] Continuous background music with mute/unmute control.
- [x] Ring placement animation remains visible without clipping.
- [x] Maria's text message input supports multi-line text and soft keyboard.
- [x] Gift box opening animation runs smoothly at 60 FPS on mobile.
