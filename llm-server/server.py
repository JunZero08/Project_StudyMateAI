from flask import Flask, request, jsonify
from flask_cors import CORS
from llama_cpp import Llama

app = Flask(__name__)
CORS(app)

llm = Llama(model_path="ggml-gpt4all-j-v1.3-groovy.bin", n_ctx=2048)

@app.route('/analyze', methods=['POST'])
def analyze():
    answers = request.json.get('answers', [])
    prompt = f"학생 응답: {answers}\n오답 패턴과 약점을 요약해줘."
    out = llm.generate(prompt, max_tokens=256)
    return jsonify({
      'analysis': out.text.strip(),
      'correctRate': round(1 - answers.count(None)/max(len(answers),1), 2)
    })

@app.route('/generate', methods=['POST'])
def generate():
    report = request.json.get('report')
    prompt = f"오답 요약: {report['analysis']}\n난이도 조절 예제 5개와 해설을 작성해줘."
    out = llm.generate(prompt, max_tokens=512)
    return jsonify({ 'materials': out.text.strip() })

@app.route('/chat', methods=['POST'])
def chat():
    query = request.json.get('query', '')
    prompt = f"학생 질문: {query}\n친절하고 명확하게 답변해줘."
    out = llm.generate(prompt, max_tokens=256)
    return jsonify({ 'reply': out.text.strip() })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
