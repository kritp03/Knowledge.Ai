# Import flask stuff here
import time

from re_pipeline import load_model, compute_span_boundary, create_relations, create_knowledge_base, create_map_from_kb
import mysql.connector
import os
from dotenv import load_dotenv
import json

# load model and tokenizer
tokenizer, model = load_model()

# API to call pipeline and generate map
# @route something
def get_text(text): # Will have argument

    tensor_ids, tensor_masks, spans_boundaries = compute_span_boundary(text, tokenizer)
    decoded_preds = create_relations(tensor_ids, tensor_masks, tokenizer, model)
    kb = create_knowledge_base(decoded_preds, spans_boundaries)
    kb.print() # Test see result
    # create_map_from_kb(kb) # Can specify file name too, if not default network.html

    return kb # Will render template (network.html)


load_dotenv()
host = os.getenv('MYSQL_HOST')
username = os.getenv('MYSQL_ADMIN')
password = os.getenv('MYSQL_PASSWORD')



while True:
    try:
        time.sleep(1)
        connection = mysql.connector.connect(host=host,
                                                 database='KGE',
                                                 user=username,
                                                 password=password)

        db_Info = connection.get_server_info()
        print("Connected to MySQL Server version ", db_Info)

        cursor = connection.cursor()
        cursor.execute("select * from data d inner join queue q on d.data_id=q.data_id where d.overall_status='Processing'")
        record = cursor.fetchall()
        header = [i[0] for i in cursor.description]
        print('fetch complete')

        if len(record) > 0 :
            print('inference starts')
            data_id = [i[header.index('data_id')] for i in record]
            data = [i[header.index('data')] for i in record]

            for j in range(len(data)):
                kb = get_text(data[j])
                update_script = ('UPDATE data SET data_json=%s, overall_status="Processed" WHERE data_id=%s;')

                nodes = []
                if len(kb.entities) > 0:
                    for index, e in enumerate(kb.entities):
                        nodes.append(
                            {
                                'id': index + 1, 'label': e, 'title': e
                            }
                        )
                print(nodes)

                edges = []
                if len(kb.relations) > 0:
                    for r in kb.relations:
                        edges.append(
                            {
                                'from': list(i['id'] for i in nodes if i['label'] == r['head'])[0],
                                'to': list(i['id'] for i in nodes if i['label'] == r['tail'])[0],
                                'label': r['type'],
                                'title': r['type'],
                                'smooth': {'type': 'curvedCW', 'roundness': 0.2}
                            }
                        )
                print(edges)

                data_output = {
                    "nodes": nodes,
                    "edges": edges
                }

                json_object = json.dumps(data_output)


                data = (json_object, data_id[j])

                if not connection.is_connected():
                    connection = mysql.connector.connect(host=host,
                                                         database='KGE',
                                                         user=username,
                                                         password=password)

                db_Info = connection.get_server_info()
                print("Connected to MySQL Server version ", db_Info)
                cursor = connection.cursor()
                cursor.execute(update_script, data)
                connection.commit()

                print("Record Updated successfully ")

                delete_statement = ("DELETE FROM queue AS O WHERE O.data_id IN (SELECT p.data_id FROM data as p where p.overall_status = 'Processed')")
                cursor.execute(delete_statement)
                connection.commit()

        connection.close()

    except Exception as e:
        print(e)


