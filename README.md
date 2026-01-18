# VastraVerse: Explore Indian Culture & Fashion with AI

Welcome to *VastraVerse*, an interactive web application dedicated to exploring the rich tapestry of Indian culture, traditions, and fashion. Discover detailed information about traditional outfits, regional styles, festivals, and ceremonies, enhanced with cutting-edge AI features like a knowledgeable chatbot and a virtual clothing try-on experience.

---
---

## 🌟 Features

### 🧵 Comprehensive Cultural Information
Browse extensive content on various aspects of Indian culture, including:

- Traditional Outfits (Sarees, Kurtas, Lehengas, etc.)
- Regional Styles & Traditions
- Indian Festivals & Calendar
- Cultural Guides
- Ceremonies & Rituals
- Outfit Dictionary
- Blog Articles

### 🤖 AI-Powered Chatbot
Engage with an intelligent chatbot (powered by *Google Gemini*) knowledgeable about Indian culture. Ask questions about traditions, clothing, festivals, and more.

### 👗 AI Virtual Try-On
Upload your photo and use our AI-powered feature (leveraging *ComfyUI* and *Stable Diffusion* with *IP-Adapter*) to virtually try on different traditional Indian outfits based on text prompts.

### 👤 User Accounts
Sign up and log in to personalize your experience.  
> *Note:* Current implementation uses browser localStorage (see *Security Warning* below).

### 💡 Interactive UI
Enjoy a user-friendly interface with:
- Dark/Light Mode
- Responsive Design
- Search Functionality

---

## 🛠 Technology Stack

- *Frontend:* HTML, CSS (*Tailwind CSS*), JavaScript  
- *Backend:* Python, Flask  
- *AI Chatbot:* Google Gemini API  
- *AI Image Generation:* ComfyUI, Stable Diffusion v1.5, IP-Adapter  
- *Database:* Browser localStorage (for user data, chat history - see Security Warning)  
- *Python Libraries:*  
  Flask, google-generativeai, Flask-Cors, python-dotenv, Pillow, requests, PyTorch, diffusers, transformers, etc. (see requirements.txt)

## Usage
- Browse Content: Explore traditional outfits, festivals, and culture from the navigation menu.
- Chatbot: Ask the AI chatbot questions about Indian culture.
- Virtual Try-On:
            - Upload a clear photo of yourself.
            - Enter a text prompt describing the outfit (e.g., “wearing a red Banarasi saree”).
            - Click Generate and wait for the AI to render the image.
- Download or share the generated image.
