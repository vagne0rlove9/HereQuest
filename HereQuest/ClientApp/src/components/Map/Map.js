import * as React from 'react';

export default class Map extends React.Component {
    mapRef = React.createRef();

    state = {
        map: null
    };

    componentDidMount() {

        const coordinates = [
            { lat: 55.9985958, lng: 37.2247743, description: "Общежитие МИЭТ" },
            { lat: 55.992649, lng: 37.2195338, description: "Флейта" },
            { lat: 55.9831656, lng: 37.2099016, description: "НИУ МИЭТ" },
            { lat: 55.986281, lng: 37.1705789, description: "Музей Зеленограда" }
        ];

        const H = window.H;
        const platform = new H.service.Platform({
            apikey: "ksTpcItxmjBO_GYj0B0e-ZQY8MLCuTPmPDI5nvz_ZKc" 
        });

        const defaultLayers = platform.createDefaultLayers();

        const center = { lat: 0, lng: 0};
        coordinates.map(coordinate => {
            center.lat += coordinate.lat / coordinates.length;
            center.lng += coordinate.lng / coordinates.length;
        });

        const map = new H.Map(
            this.mapRef.current,
            defaultLayers.vector.normal.map,
            {
                center: center,
                zoom: 14,
            }
        );

        const ui = H.ui.UI.createDefault(map, defaultLayers, 'ru-RU');
        const mapEvents = new H.mapevents.MapEvents(map);
        const behavior = new H.mapevents.Behavior(mapEvents);

        coordinates.map(coordinate => { 
            const marker = new H.map.Marker(coordinate);
            map.addObject(marker);
            marker.addEventListener('tap', function (evt) {
                const bubble = new H.ui.InfoBubble(coordinate, {
                    content: `<p>${coordinate.description}</p><input>`
                });
                ui.addBubble(bubble);
            }); 
        })

        this.setState({ map });
    }

    componentWillUnmount() {
        this.state.map.dispose();
    }

    render() {
        return (
            <div ref={this.mapRef} style={{ height: "500px" }} />
        );
    }
}