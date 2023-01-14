from re_pipeline import load_model, compute_span_boundary, create_relations, create_knowledge_base, create_map_from_kb

tokenizer, model = load_model()

def get_text():

    text = """
    Psychology is the scientific study of mind and behavior. Psychology includes the study of conscious and unconscious phenomena, including feelings and thoughts. It is an academic discipline of immense scope, crossing the boundaries between the natural and social sciences. Psychologists seek an understanding of the emergent properties of brains, linking the discipline to neuroscience. As social scientists, psychologists aim to understand the behavior of individuals and groups.[1][2] Ψ (psi), the first letter of the Greek word psyche from which the term psychology is derived (see below), is commonly associated with the science. A professional practitioner or researcher involved in the discipline is called a psychologist. Some psychologists can also be classified as behavioral or cognitive scientists. Some psychologists attempt to understand the role of mental functions in individual and social behavior. Others explore the physiological and neurobiological processes that underlie cognitive functions and behaviors. Psychologists are involved in research on perception, cognition, attention, emotion, intelligence, subjective experiences, motivation, brain functioning, and personality. Psychologists' interests extend to interpersonal relationships, psychological resilience, family resilience, and other areas within social psychology. They also consider the unconscious mind.[3] Research psychologists employ empirical methods to infer causal and correlational relationships between psychosocial variables. Some, but not all, clinical and counseling psychologists rely on symbolic interpretation. While psychological knowledge is often applied to the assessment and treatment of mental health problems, it is also directed towards understanding and solving problems in several spheres of human activity. By many accounts, psychology ultimately aims to benefit society.[4][5][6] Many psychologists are involved in some kind of therapeutic role, practicing psychotherapy in clinical, counseling, or school settings. Other psychologists conduct scientific research on a wide range of topics related to mental processes and behavior. Typically the latter group of psychologists work in academic settings (e.g., universities, medical schools, or hospitals). Another group of psychologists is employed in industrial and organizational settings.[7] Yet others are involved in work on human development, aging, sports, health, forensic science, education, and the media.
    """

    tensor_ids, tensor_masks, spans_boundaries = compute_span_boundary(text, tokenizer)
    decoded_preds = create_relations(tensor_ids, tensor_masks, tokenizer, model)
    kb = create_knowledge_base(decoded_preds, spans_boundaries)
    kb.print()
    create_map_from_kb(kb)

    return

if __name__ == "__main__":
    get_text()