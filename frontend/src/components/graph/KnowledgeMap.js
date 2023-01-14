import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Graph from 'react-graph-vis';
// import './network.css';

function KnowledgeMap(props) {
    const data_json  = props.data_json;
    const [graph, setGraph] = useState({ nodes: [], edges: [] });
    const [options, setOptions] = useState({});
    const [events, setEvents] = useState({});

    useEffect(() => {

        if (!data_json) {
            return;
        };

        setGraph({
            nodes: data_json.nodes,
            edges: data_json.edges,
        });
    
        setOptions({
            configure: {
                enabled: false
            },
            nodes: {
                shape: "circle"
            },
            edges: {
                color: {
                    inherit: true
                },
                smooth: {
                    enabled: true,
                    type: "dynamic"
                }
            },
            interaction: {
                dragNodes: true,
                hideEdgesOnDrag: false,
                hideNodesOnDrag: false
            },
            physics: {
                enabled: true,
                repulsion: {
                    centralGravity: 0.2,
                    damping: 0.09,
                    nodeDistance: 240,
                    springConstant: 0.05,
                    springLength: 240
                },
                solver: "repulsion",
                stabilization: {
                    enabled: true,
                    fit: true,
                    iterations: 1000,
                    onlyDynamicEdges: false,
                    updateInterval: 50
                }
            }
        })
    
        setEvents({
            select: function (event) {
                var { nodes, edges } = event;
            }
        });
    }, [data_json]);
    return (
        <Graph
            graph={graph}
            options={options}
            events={events}
        />
    );
}

export { KnowledgeMap }