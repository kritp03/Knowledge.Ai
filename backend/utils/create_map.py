from pyvis.network import Network

def generate_knowledge_map(kb, filename):
    net = Network(directed=True, width="1800px", height="900px", bgcolor="#eeeeee")

    color_entity = "#03a1fc"
    for e in kb.entities:
        net.add_node(e, shape="circle", color=color_entity)

    for r in kb.relations:
        net.add_edge(r["head"], r["tail"],
                    title=r["type"], label=r["type"])
        
    net.repulsion(
        node_distance=200,
        central_gravity=0.2,
        spring_length=200,
        spring_strength=0.05,
        damping=0.09
    )
    net.set_edge_smooth('dynamic')
    net.save_graph(filename)

    return