import * as React from 'react';

export default class Map extends React.Component {
    mapRef = React.createRef();

    state = {
        myCoordinate: null,
        map: null
    };

    componentDidMount() {
        this.start();
    }

    start() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({ myCoordinate: { lat: position.coords.latitude, lng: position.coords.longitude, description: "Моя позиция" } });
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

        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
        });       

        const coordinates = [
            this.state.myCoordinate,
            { lat: 55.986281, lng: 37.1705789, description: "Музей Зеленограда" },
            { lat: 55.9831656, lng: 37.2099016, description: "НИУ МИЭТ" },
            { lat: 55.992649, lng: 37.2195338, description: "Флейта" },
            { lat: 55.9985958, lng: 37.2247743, description: "Общежитие МИЭТ" },
        ];
        console.log(coordinates);

        const defaultLayers = platform.createDefaultLayers();
        const center = { lat: 0, lng: 0 };
        coordinates.map(coordinate => {
            center.lat += coordinate.lat / coordinates.length;
            center.lng += coordinate.lng / coordinates.length;
        });
        const map = new H.Map(
            this.mapRef.current,
            defaultLayers.vector.normal.map,
            {
                center: center,
                zoom: 13.8,
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
                    content: `<p>${coordinate.description}</p>`
                });
                ui.addBubble(bubble);
            })
        });

        for (var i = 0; i < coordinates.length - 1; i++) {
            console.log(i);
            var routingParameters = {
                'routingMode': 'fast',
                'transportMode': 'car',
                'origin': coordinates[i].lat + ',' + coordinates[i].lng,
                'destination': coordinates[i + 1].lat + ',' + coordinates[i + 1].lng,
                'return': 'polyline'
            };
            var onResult = function (result) {
                if (result.routes.length) {
                    result.routes[0].sections.forEach((section) => {
                        let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
                        var routeOutline = new H.map.Polyline(linestring, {
                            style: {
                                lineWidth: 10,
                                strokeColor: 'rgba(0, 128, 255, 0.7)',
                                lineTailCap: 'arrow-tail',
                                lineHeadCap: 'arrow-head'
                            }
                        });
                        var routeArrows = new H.map.Polyline(linestring, {
                            style: {
                                lineWidth: 7,
                                fillColor: 'white',
                                strokeColor: 'rgba(255, 255, 255, 1)',
                                lineDash: [0, 1],
                                lineTailCap: 'arrow-tail',
                                lineHeadCap: 'arrow-head'
                            }
                        }
                        );
                        var routeLine = new H.map.Group();
                        routeLine.addObjects([routeOutline, routeArrows]);
                        map.addObjects([routeLine]);
                    });
                }

            }
            var router = platform.getRoutingService(null, 8);
            router.calculateRoute(routingParameters, onResult,
                function (error) {
                    alert(error.message);
                });
        }

        map.addLayer(defaultLayers.vector.normal.traffic);
        map.addLayer(defaultLayers.vector.normal.trafficincidents);

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