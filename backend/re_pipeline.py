import math
import torch
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
from utils.knowledge_base import KnowledgeBase
from utils.extract_triplets import extract_triplets
from utils.create_map import generate_knowledge_map

def load_model():
    tokenizer = AutoTokenizer.from_pretrained("Babelscape/rebel-large")
    model = AutoModelForSeq2SeqLM.from_pretrained("Babelscape/rebel-large")
    print("Model loaded!")

    return tokenizer, model

# Span 64 for more detailed output
def compute_span_boundary(text, tokenizer, span_length=64):
    inputs = tokenizer([text], return_tensors='pt')

    num_tokens = len(inputs['input_ids'][0])
    print(f'Input has {num_tokens} tokens')
    
    num_spans = math.ceil(num_tokens / span_length)
    print(f'Input has {num_spans} spans')

    overlap = math.ceil((num_spans * span_length - num_tokens) / max(num_spans - 1, 1))
    
    spans_boundaries = []
    start = 0
    for i in range(num_spans):
        spans_boundaries.append([start + span_length * i, start + span_length * (i + 1)])
        start -= overlap
    
    print(f'Span boundaries are {spans_boundaries}')

    # transform input with spans
    tensor_ids = [inputs["input_ids"][0][boundary[0]:boundary[1]]
                  for boundary in spans_boundaries]
    tensor_masks = [inputs["attention_mask"][0][boundary[0]:boundary[1]]
                    for boundary in spans_boundaries]

    return tensor_ids, tensor_masks, spans_boundaries

def create_relations(tensor_ids, tensor_masks, tokenizer, model):
    inputs = {
        "input_ids": torch.stack(tensor_ids),
        "attention_mask": torch.stack(tensor_masks)
    }

    gen_kwargs = {
        "max_length": 256,
        "length_penalty": 0,
        "num_beams": 3,
        "num_return_sequences": 3
    }
    generated_tokens = model.generate(
        **inputs,
        **gen_kwargs,
    )

    decoded_preds = tokenizer.batch_decode(generated_tokens, skip_special_tokens=False)

    return decoded_preds

def create_knowledge_base(decoded_preds, spans_boundaries, num_return_sequences=3):
    kb = KnowledgeBase()
    i = 0
    for sentence_pred in decoded_preds:
        current_span_index = i // num_return_sequences
        relations = extract_triplets(sentence_pred)
        for relation in relations:
            relation["meta"] = {
                "spans": [spans_boundaries[current_span_index]]
            }
            kb.add_relation(relation)
        i += 1

    return kb

def create_map_from_kb(kb, filename="network.html"):
    generate_knowledge_map(kb, filename)
    
    return