from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.chains.question_answering import load_qa_chain
import os
from langchain_community.chat_models import ChatOpenAI
import chromadb


os.environ["OPENAI_API_KEY"] = "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"

def load_pdf(filePath:str):
  loader = PyPDFLoader(filePath)
  documents = loader.load_and_split()
  return documents

def split_docs(documents,chunk_size=1000,chunk_overlap=20):
  text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
  docs = text_splitter.split_documents(documents)
  return docs


embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")


# upload pdf hear
def processPdf(filePath:str,fileName:str):
  documents = load_pdf(filePath)
  docs = split_docs(documents)
  db = Chroma(persist_directory="./chroma_db")
  db.from_documents(docs,embeddings,collection_name=fileName,persist_directory="./chroma_db")


def askPdf(collection_name:str,query:str):
  db = Chroma(persist_directory="./chroma_db",embedding_function=embeddings,collection_name=collection_name)
  matching_docs = db.similarity_search(query=query)
  model_name = "gpt-3.5-turbo"
  llm = ChatOpenAI(model_name=model_name)
  chain = load_qa_chain(llm, chain_type="stuff")
  answer =  chain.run(input_documents=matching_docs, question=query)
  return answer

def getCollections():
    db = chromadb.PersistentClient(path="./chroma_db")
    return db.list_collections()


def deleteCollection(collection_name:str):
    db = Chroma(persist_directory="./chroma_db")
    return db.delete_collection(collection_name)
    


# uploadPdf('/Users/venkey/Documents/Developer/tmp/testdir/Problem Statement.pdf','problem_statement')
# askPdf('problem_statement','select best problem statment for the given document')