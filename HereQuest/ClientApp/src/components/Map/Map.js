import * as React from 'react';

export default class Map extends React.Component {
    mapRef = React.createRef();

    state = {
        map: null
    };

    componentDidMount() {

        const H = window.H;
        const platform = new H.service.Platform({
            apikey: "ksTpcItxmjBO_GYj0B0e-ZQY8MLCuTPmPDI5nvz_ZKc" 
        });

        const defaultLayers = platform.createDefaultLayers();

        const map = new H.Map(
            this.mapRef.current,
            defaultLayers.vector.normal.map,
            {
                center: { lat: 50, lng: 5 },
                zoom: 4,
                pixelRatio: window.devicePixelRatio || 1
            }
        );

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