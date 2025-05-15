from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS
import ollama
from typing import List, Dict
import logging
import os
import re

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__, static_url_path='', static_folder='.')
CORS(app)

MODEL = "llama3"

def get_model_response(model: str, messages: List[Dict[str, str]]) -> str:
    try:
        system_prompt = """You are a precise and knowledgeable assistant specializing in Indian traditional attire and fashion. Your responses should be concise, specific, and directly address the user's query.

Guidelines for responses:
1. For outfit queries:
   - Provide ONLY the specific outfit details requested
   - Include exact names of garments
   - List specific colors and fabrics
   - Mention essential accessories
   - Keep responses under 200 words unless more detail is specifically requested

2. For festival attire:
   - Focus ONLY on the traditional outfit
   - Include specific garment names
   - List traditional colors
   - Mention essential accessories
   - Exclude general festival information unless specifically asked

3. Response format:
   - Use bullet points for clarity
   - Keep information specific and factual
   - Avoid general statements
   - Exclude unnecessary cultural context unless asked
   - Make the important information bold

4. Example of a good response for "What to wear for Diwali?":
   Traditional Diwali Attire:
   • Women: Silk saree (Kanjeevaram/Banarasi) in red/gold
   • Men: Bandhgala kurta in ivory/gold
   • Accessories: Temple jewelry, Mojari shoes
   • Colors: Red, Gold, Green (avoid black/white)

5. Remember:
   - Answer ONLY what is asked
   - Be specific and precise
   - Keep responses brief and focused
   - Use bullet points for clarity
   - Exclude unnecessary information"""
        logger.info(f"Processing request for model: {model}")
        logger.info(f"Messages received: {messages}")
        prompt = system_prompt + "\n\n" + "\n".join([f"{msg['role']}: {msg['content']}" for msg in messages])
        logger.info(f"Sending prompt to model: {prompt}")
        model_params = {
            "model": model,
            "messages": [{
                "role": "user",
                "content": prompt
            }],
            "options": {
                "temperature": 0.3,
                "top_p": 0.9,
                "top_k": 40,
                "num_ctx": 2048,
                "num_thread": 4,
                "repeat_penalty": 1.1,
                "stop": ["</s>", "Human:", "Assistant:"],
                "num_predict": 256
            }
        }
        response = ollama.chat(**model_params)
        bot_reply = response['message']['content']
        # Remove any note or disclaimer at the end of the response
        bot_reply = re.sub(r"\n*Note:.*", "", bot_reply, flags=re.IGNORECASE|re.DOTALL)
        # Append a single line for further assistance
        if bot_reply.strip() and not bot_reply.strip().endswith("Let me know if you need any further assistance."):
            bot_reply = bot_reply.strip() + "\n\nLet me know if you need any further assistance."
        return bot_reply
    except Exception as e:
        logger.error(f"Error in get_model_response: {str(e)}")
        return f"Error: {str(e)}"

# Serve index.html at root
@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

# Serve chatbot.html at /chatbot.html
@app.route('/chatbot.html')
def serve_chatbot():
    return send_from_directory('.', 'chatbot.html')

# Serve all other static files (HTML, CSS, JS, images)
@app.route('/<path:filename>')
def serve_file(filename):
    if os.path.exists(filename):
        return send_from_directory('.', filename)
    else:
        return "File not found", 404

# Chatbot API endpoint
@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    messages = data.get('messages', [])
    response = get_model_response(MODEL, messages)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True) 