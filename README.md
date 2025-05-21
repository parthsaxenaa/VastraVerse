# VastraVerse

VastraVerse is an AI-powered project featuring a Photoshoot Studio for customizing traditional attire and a Ritual Guide Chatbot that provides information on Indian rituals, festivals, and traditions. It blends AI with cultural exploration for an engaging and educational user experience.

## Features

- **AI Photoshoot Studio**: Customize and visualize traditional Indian attire
- **Ritual Guide Chatbot**: Get information about Indian rituals, festivals, and traditions
- **Interactive UI**: Modern and user-friendly interface
- **Real-time AI Processing**: Powered by LM Studio for local AI processing

## Prerequisites

Before running the project, ensure you have the following installed:

1. **Python 3.8 or higher**
2. **LM Studio** (for local AI processing)
3. **Git** (for version control)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/VastraVerse.git
cd VastraVerse
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

## LM Studio Setup

1. Download and install LM Studio from [https://lmstudio.ai/](https://lmstudio.ai/)
2. Download the required model:
   - Open LM Studio
   - Go to "Models" tab
   - Search for and download "Llama 3 Beta Instruct"
   - Load the model in LM Studio
   - Start the local server (default port: 1234)
   - Note: Make sure to allocate sufficient RAM (recommended: 16GB+) for optimal performance

## Running the Application

1. **Important**: First, ensure LM Studio server is running:
   - Open LM Studio
   - Load the Llama 3 Beta Instruct model
   - Click "Start Server" (default port: 1234)
   - Wait for the server to start completely

2. Start the VastraVerse server:
```bash
python app.py
```

3. Open your browser and navigate to `http://127.0.0.1:5000`

## Project Structure

```
VastraVerse/
├── app.py              # Backend server
├── requirements.txt    # Python dependencies
├── public/           # Static assets
├── src/             # Frontend source code
│   ├── components/  # React components
│   ├── pages/      # Page components
│   └── styles/     # CSS styles
└── README.md       # Project documentation
```

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
