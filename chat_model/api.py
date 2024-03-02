from flask import Flask, request, jsonify
import os
from werkzeug.utils import secure_filename
app = Flask(__name__)
from core_functinality import *
UPLOAD_FOLDER = 'uploads/'


@app.route('/newpdf', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    uploaded_file = request.files['file']
    if uploaded_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    filename = secure_filename(uploaded_file.filename)  
    uploaded_file.save(os.path.join(UPLOAD_FOLDER, filename))
    processPdf(UPLOAD_FOLDER+filename,filename)
    os.remove(os.path.join(UPLOAD_FOLDER, filename))
    return jsonify({'message': 'File uploaded successfully'}), 201

@app.route('/query_pdf', methods=['GET'])
def query_pdf():
    print(request.json)
    query = request.json['query']
    pdfName = request.json['pdfName']
    filename = secure_filename(pdfName)
    print((query,filename))
    answer = askPdf(filename,query)
    
    data = {'qustion': query, 'answer': answer}  

    return jsonify(data)

@app.route('/collections', methods=['GET'])
def get_collections():
    collections = getCollections()
    json = [{
        'id':c.id,
        'metadata':c.metadata,
        'name':c.name,
        
        # 'last_updated':c.last_updated,
        # 'num_documents':c.num_documents,
        # 'num_embeddings':c.num_embeddings,
        # 'num_chunks':c.num_chunks,
        # 'num_tokens':c.num_tokens,
        # 'num_sentences':c.num_sentences,
        # 'num_words':c.num_words,

    } for c in collections]
    return jsonify(json)

@app.route('/delete', methods=['DELETE'])
def delete_collection():
    collection_name = request.args.get('collection_name')
    if(collection_name == None):
        return jsonify({'error': 'No collection name provided'}), 400
    deleteCollection(collection_name)
    return jsonify({'message': 'Collection deleted successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)