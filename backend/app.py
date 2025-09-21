from flask import Flask, request, Response
import ollama

app = Flask(__name__)

client = ollama.Client()

model = "gemma3"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    prompt = data.get("prompt", "")
    
    def response():
        for data in client.generate(model = model, prompt = prompt, stream = True):
            yield data

    return Response(response(), content_type='text/event-stream')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug = True)