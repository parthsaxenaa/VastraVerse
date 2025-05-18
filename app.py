from flask import Flask, request, jsonify, send_from_directory, send_file, Response, stream_with_context
from flask_cors import CORS
import requests
from typing import List, Dict
import logging
import os
import re
import json
import time

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__, static_url_path='', static_folder='.')
CORS(app)

MODEL = "llama3"
LM_STUDIO_API_URL = "http://localhost:1234/v1/chat/completions"  # Default LM Studio API endpoint

def get_model_response(model: str, messages: List[Dict[str, str]]) -> str:
    try:
        system_prompt = """You are a comprehensive expert on Indian culture, traditions, and customs. Answer questions EXACTLY as they are asked, without adding unnecessary context about specific festivals unless explicitly requested.

Guidelines for responses:
1. For "Why" questions:
   - Answer ONLY what is specifically asked
   - Do NOT add context about any festival unless explicitly mentioned in the question
   - Provide complete historical and cultural context
   - Include regional variations if relevant
   - Explain modern significance

2. Response structure:
   [Question Topic]:
   • Historical Background
   • Cultural Significance
   • Regional Variations
   • Modern Context
   • Specific Details
   • Additional Information

3. For specific item/custom questions:
   - Focus ONLY on the item/custom asked about
   - Explain its significance
   - Describe variations
   - Detail modern practices
   - Include relevant facts

4. For attire questions:
   - Explain the specific garment/accessory
   - Detail its cultural significance
   - Describe regional variations
   - Include material and style information
   - Mention modern adaptations

5. Remember:
   - Answer EXACTLY what is asked
   - Don't add festival context unless specifically requested
   - Provide comprehensive information about the specific topic
   - Include historical and cultural significance
   - Be accurate and respectful
   - Use clear, organized formatting
   - End with "Let me know if you need any further assistance."
"""
        logger.info(f"Processing request for model: {model}")
        logger.info(f"Messages received: {messages}")
        
        # Prepare the messages for LM Studio
        formatted_messages = [
            {"role": "system", "content": system_prompt}
        ]
        formatted_messages.extend(messages)
        
        # Prepare the request payload
        payload = {
            "model": model,
            "messages": formatted_messages,
            "temperature": 0.4,
            "top_p": 0.4,
            "max_tokens": 2048,
            "stop": ["</s>", "Human:", "Assistant:"]
        }
        
        logger.info(f"Sending request to LM Studio API")
        response = requests.post(LM_STUDIO_API_URL, json=payload)
        response.raise_for_status()
        
        bot_reply = response.json()['choices'][0]['message']['content']
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
    try:
        response = get_model_response(MODEL, messages)
        return jsonify({'reply': response})
    except Exception as e:
        logger.error(f"Error in chat: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True) 