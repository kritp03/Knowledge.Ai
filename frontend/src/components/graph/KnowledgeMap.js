import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Graph from 'react-graph-vis';
// import './network.css';

function KnowledgeMap() {
    const location = useLocation();
    const data_id = location.state.data_id;

    console.log(data_id);

    const graph = {
        nodes: [
            { 'id': 1, 'label': 'Transcontinental railroad', 'title': 'Transcontinental railroad' }, 
            { 'id': 2, 'label': '1923', 'title': '1923' }, 
            { 'id': 3, 'label': 'Stock exchange', 'title': 'Stock exchange' }, 
            { 'id': 4, 'label': 'Convolution', 'title': 'Convolution' }
        ],
        edges: [
            { 'from': 1, 'to': 2, 'label': 'inception', 'title': 'inception' }, 
            { 'from': 1, 'to': 2, 'label': 'date of official opening', 'title': 'date of official opening' }, 
            { 'from': 1, 'to': 3, 'label': 'instance of', 'title': 'instance of' }, 
            { 'from': 4, 'to': 4, 'label': 'use', 'title': 'use' }
        ],
    };

    const options = {
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
                nodeDistance: 200,
                springConstant: 0.05,
                springLength: 200
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
    }

    // const options = {
    //     layout: {
    //         improvedLayout: true,
    //         hierarchical: {
    //             enabled: true,
    //             direction: 'UD',
    //             sortMethod: 'directed',
    //         }
    //     },
    //     edges: {
    //         color: "#03a1fc",
    //         smooth: {
    //             enabled: true,
    //             // type: 'continuous',
    //             // forceDirection: 'none',
    //             roundness: 1.0
    //         },
    //     },
    //     nodes: {
    //         shape: "circle"
    //     },
    //     height: "900px",
    //     width: "100%",
    //     physics: {
    //         enabled: true,
    //         barnesHut: {
    //             springConstant: 0.05,
    //             avoidOverlap: 0.1,
    //         },
    //         hierarchicalRepulsion: {
    //             nodeDistance: 200,
    //             centralGravity: 0.2,
    //             springLength: 200,
    //             springConstant: 0.05,
    //             damping: 0.09,
    //         },
    //         solver: 'hierarchicalRepulsion',
    //     }
    // };

    const events = {
        select: function (event) {
            var { nodes, edges } = event;
        }
    };
    return (
        <Graph
            graph={graph}
            options={options}
            events={events}
        // getNetwork={network => {
        //     //  if you want access to vis.js network api you can set the state in a parent component using this property
        // }}
        />
    );
}

export { KnowledgeMap }