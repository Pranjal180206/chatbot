from flask import Flask, request, Response
from flask_cors import CORS
import ollama
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend integration

client = ollama.Client()

model = "gemma3"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    prompt = data.get("prompt", "")
    
    def response():
        try:
            # Stream response from Ollama
            for chunk in client.generate(model=model, prompt=prompt, stream=True):
                # Format as Server-Sent Events
                if 'response' in chunk:
                    sse_data = json.dumps({"response": chunk['response']})
                    yield f"data: {sse_data}\n\n"
                
                # Check if response is done
                if chunk.get('done', False):
                    yield f"data: {json.dumps({'done': True})}\n\n"
                    break
        except Exception as e:
            # Send error message
            error_data = json.dumps({"error": str(e)})
            yield f"data: {error_data}\n\n"

    return Response(
        response(), 
        content_type='text/event-stream',
        headers={
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug = True)