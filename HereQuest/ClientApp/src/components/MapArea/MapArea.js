import * as React from 'react';

export default class Map extends React.Component {

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
        this.setState({ teaser: { lat: 55.990804, lng: 37.212889, description: "Загадка" } });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
               // this.setState({ myCoordinate: { lat: position.coords.latitude, lng: position.coords.longitude, description: "Моя позиция" } });
                this.setState({ myCoordinate: { lat: Math.random() % 5 / 1000 + 55.988804, lng: Math.random() % 5 / 1000 + 37.210889, description: "Моя позиция" } });                
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
            { lat: 55.986281, lng: 37.1705789, description: "Музей Зеленограда" },
            { lat: 55.9831656, lng: 37.2099016, description: "НИУ МИЭТ" },
            { lat: 55.992649, lng: 37.2195338, description: "Флейта" },
            { lat: 55.9985958, lng: 37.2247743, description: "Общежитие МИЭТ" },
        ];

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
                zoom: 15,
            }
        );

        const ui = H.ui.UI.createDefault(map, defaultLayers, 'ru-RU');
        const mapEvents = new H.mapevents.MapEvents(map);
        const behavior = new H.mapevents.Behavior(mapEvents);
        var newCircle = new H.map.Circle(
            new H.geo.Point(this.state.teaser.lat, this.state.teaser.lng),
            this.getDistanceFromLatLonInM(this.state.myCoordinate.lat, this.state.myCoordinate.lng, this.state.teaser.lat, this.state.teaser.lng) / 2,
            { style: { fillColor: 'rgba(221, 0, 255, 0.66)' } }
        );
        //map.addObject(newCircle);




        /*
        var container = new H.map.Group({
            objects: [newCircle]
        });
        container.addEventListener('tap', function (evt) {
            var target = evt.target;
            var maxZoom = target.getData().maxZoom;
            map.getViewModel().setLookAtData({
                zoom: maxZoom,
                bounds: target.getBoundingBox()
            });
        });*/

        // add objects to the map
        //map.addObject([newCircle]);

        /*
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
        */

        map.addLayer(defaultLayers.vector.normal.traffic);
        map.addLayer(defaultLayers.vector.normal.trafficincidents);

        this.setState({ map });

        this.refreshMap();
    }

    async refreshMap() {
        if (this.getDistanceFromLatLonInM(this.state.myCoordinate.lat, this.state.myCoordinate.lng, this.state.teaser.lat, this.state.teaser.lng) < 10) {
            console.log("Winner");
        } else {
            console.log(20);
            const H = window.H;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    var lat = Math.random() % 3 / 1000 + 55.980804;
                    var lng = Math.random() % 3 / 1000 + 37.202889;
                    console.log(lat + " " + lng);
                    this.setState({ myCoordinate: { lat: lat, lng: lng, description: "Моя позиция" } });
                });
            } else {
                console.error("Geolocation is not supported by this browser!");
            }
            var newCircle = new H.map.Circle(
                new H.geo.Point(this.state.teaser.lat + Math.random() % 5 / 100 - 0.03, this.state.teaser.lng + Math.random() % 5 / 100 - 0.03),
                this.getDistanceFromLatLonInM(this.state.myCoordinate.lat, this.state.myCoordinate.lng, this.state.teaser.lat, this.state.teaser.lng) / 2,
                { style: { fillColor: 'rgba(221, 0, 255, 0.66)' } }
            );
            this.state.map.removeObjects(this.state.map.getObjects());
            this.state.map.addObject(newCircle);
            await new Promise(resolve => setTimeout(resolve, 5000));
            this.refreshMap();
        }
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