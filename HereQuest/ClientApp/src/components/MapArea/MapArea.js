import * as React from 'react';

export default class MapArea extends React.Component {

    getDistanceFromLatLonInM(lat1, lng1, lat2, lng2) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = this.deg2rad(lng2 - lng1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d * 1000;
    }

    deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    mapRef = React.createRef();

    state = {
        myCoordinate: null,
        map: null,
        teaser: null
    };

    componentDidMount() {
        this.start()
    }

    start() {
        this.setState({
            teaser: {
                lat: 55.998339, lng:37.225598, description: "Загадка"}});
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({ myCoordinate: { lat: position.coords.latitude, lng: position.coords.longitude, description: "Моя позиция" } });
                /*this.setState({
                    myCoordinate: {
                        lat: Math.random() % 3 / 1000 + 55.989804,
                        lng: Math.random() % 3 / 1000 + 37.209889,
                        description: "Моя позиция"
                    }
                });*/
                this.go();
            });
        } else {
            console.error("Geolocation is not supported by this browser!");
        }
    }

    go() {
        const H = window.H;
        const platform = new H.service.Platform({
            apikey: "ksTpcItxmjBO_GYj0B0e-ZQY8MLCuTPmPDI5nvz_ZKc"
        });

        const coordinates = [
            this.state.myCoordinate,
            {lat: 55.986281, lng: 37.1705789, description: "Музей Зеленограда"},
            {lat: 55.9831656, lng: 37.2099016, description: "НИУ МИЭТ"},
            {lat: 55.992649, lng: 37.2195338, description: "Флейта"},
            {lat: 55.9985958, lng: 37.2247743, description: "Общежитие МИЭТ"},
        ];

        const defaultLayers = platform.createDefaultLayers();
        const center = {lat: 0, lng: 0};
        coordinates.map(coordinate => {
            center.lat += coordinate.lat / coordinates.length;
            center.lng += coordinate.lng / coordinates.length;
        });
        const map = new H.Map(
            this.mapRef.current,
            defaultLayers.vector.normal.map,
            {
                center: this.state.teaser,
                zoom: 15,
            }
        );
        console.log(this.state.teaser.lat + " " + this.state.teaser.lng);

        const ui = H.ui.UI.createDefault(map, defaultLayers, 'ru-RU');
        const mapEvents = new H.mapevents.MapEvents(map);
        const behavior = new H.mapevents.Behavior(mapEvents);  

        map.addLayer(defaultLayers.vector.normal.traffic);
        map.addLayer(defaultLayers.vector.normal.trafficincidents);

        this.setState({map});

        this.refreshMap();
    }

    async refreshMap() {
        /*this.setState({
            myCoordinate: {
                lat: 55.990804,
                lng: 37.212889,
                description: "Моя позиция"
            }
        });*/        
        if (this.getDistanceFromLatLonInM(this.state.myCoordinate.lat, this.state.myCoordinate.lng, this.state.teaser.lat, this.state.teaser.lng) < 10) {
            alert("You are Winner!");
        } else {
            const H = window.H;
            const platform = new H.service.Platform({
                apikey: "ksTpcItxmjBO_GYj0B0e-ZQY8MLCuTPmPDI5nvz_ZKc"
            });
            const defaultLayers = platform.createDefaultLayers();
            const ui = H.ui.UI.createDefault(this.state.map, defaultLayers, 'ru-RU');
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    this.setState({ myCoordinate: { lat: position.coords.latitude, lng: position.coords.longitude, description: "Моя позиция" } });
                    /*this.setState({
                        myCoordinate: {
                            lat: Math.random() % 3 / 1000 + 55.989804,
                            lng: Math.random() % 3 / 1000 + 37.209889,
                            description: "Моя позиция"
                        }
                    });*/
                    const markerTeaser = new H.map.Marker(this.state.teaser);
                    this.state.map.addObject(markerTeaser);

                    const markerGPS = new H.map.Marker(this.state.myCoordinate);
                    const coordinate = this.state.myCoordinate;
                    markerGPS.addEventListener('tap', function (evt) {
                        const bubble = new H.ui.InfoBubble(coordinate, {
                            content: `<p>${coordinate.description}</p>`
                        });
                        ui.addBubble(bubble);
                    })
                    this.state.map.addObject(markerGPS);
                });               
            } else {
                console.error("Geolocation is not supported by this browser!");
            }
            var offset = 637100;
            var distance = this.getDistanceFromLatLonInM(this.state.myCoordinate.lat, this.state.myCoordinate.lng, this.state.teaser.lat, this.state.teaser.lng) / offset;
            var maxDRadius = distance / 6;
            var radius = 2 * maxDRadius;
            var a = Math.random() % 360;
            var lat = this.state.teaser.lat + Math.cos(a) * radius;
            var lng = this.state.teaser.lng + Math.sin(a) * radius;
            
            console.log(lat + " " + lng + " " + radius * offset);

            var newCircle = new H.map.Circle(
                new H.geo.Point(lat, lng), radius * offset,
                {style: {fillColor: 'rgba(221, 0, 255, 0.66)'}}
            );
            this.state.map.removeObjects(this.state.map.getObjects());
            this.state.map.addObject(newCircle);
            await new Promise(resolve => setTimeout(resolve, 10000));
            this.refreshMap();
        }
    }

    componentWillUnmount() {
        this.state.map.dispose();
    }

    render() {
        return (
            <div ref={this.mapRef} style={{height: "500px"}}/>
        );
    }
}