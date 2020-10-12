import * as React from 'react';
import {connect} from "react-redux";
import { createRef } from 'react';

class Map extends React.Component {
    mapRef = React.createRef();

    state = {
        myCoordinate: null,
        map: null
    };

    componentDidMount() {
        this.start();
        setTimeout(() => this.refresh(), 900);
    }

    start() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    myCoordinate: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        description: "Моя позиция"
                    }
                });
                setTimeout(() => this.go(), 700);
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
        var coordinates = [
            this.state.myCoordinate
        ]
        this.props.currentCoors.map(c => {
            coordinates.push(c)
        })

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
                center: center,
                zoom: 13,
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
            if (this.props.currentCoors.length > 1) {
                var onResult = function (result) {
                    if (result.routes.length) {
                        result.routes[0].sections.forEach((section) => {
                            let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
                            var routeOutline = new H.map.Polyline(linestring, {
                                style: {
                                    lineWidth: 10,
                                    strokeColor: 'rgba(255, 0, 0, 0.7)',
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
            }
            else {
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
            }
            var router = platform.getRoutingService(null, 8);
            router.calculateRoute(routingParameters, onResult,
                function (error) {
                    alert(error.message);
                });
        }

        map.addLayer(defaultLayers.vector.normal.traffic);
        map.addLayer(defaultLayers.vector.normal.trafficincidents);

        this.setState({map});
    }

    componentWillUnmount() {
        if (this.state.map !== null)
            this.state.map.dispose();
    }

    routing1() {
        //this.state.map.removeObject(this.state.map.getObjects()[this.state.map.getObjects().length - 1])
        const H = window.H;
        
        const platform = new H.service.Platform({
            apikey: "ksTpcItxmjBO_GYj0B0e-ZQY8MLCuTPmPDI5nvz_ZKc"
        });
        const defaultLayers = platform.createDefaultLayers();
        const ui = H.ui.UI.createDefault(this.state.map, defaultLayers, 'ru-RU');
        const coordinate = this.props.currentCoors[this.props.currentCoors.length - 2]
        var coordinate2 = null
        if (this.props.currentCoors[this.props.currentCoors.length - 3] === undefined) {
            coordinate2 = this.state.myCoordinate
        }
        else coordinate2 = this.props.currentCoors[this.props.currentCoors.length - 3]
        
        var routingParameters = {
            'routingMode': 'fast',
            'transportMode': 'car',
            'origin': coordinate2.lat + ',' + coordinate2.lng,
            'destination': coordinate.lat + ',' + coordinate.lng,
            'return': 'polyline'
        };
        var onResult = (result) => {
            if (result.routes.length) {
                result.routes[0].sections.forEach((section) => {
                    let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
                    var routeOutline = new H.map.Polyline(linestring, {
                        style: {
                            lineWidth: 10,
                            strokeColor: 'rgba(220,3,3,0.7)',
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
                    this.state.map.addObjects([routeLine]);
                });
            }

        }
        var router = platform.getRoutingService(null, 8);
        router.calculateRoute(routingParameters, onResult,
            function (error) {
                alert(error.message);
            });

//        this.props.onRefresh(false)
    }

    routing2() {
        var objs = this.state.map.getObjects()[this.state.map.getObjects().length - 1];
        console.log(objs)
        const H = window.H;
        const marker = new H.map.Marker(this.props.currentCoors[this.props.currentCoors.length - 1]);

        const platform = new H.service.Platform({
            apikey: "ksTpcItxmjBO_GYj0B0e-ZQY8MLCuTPmPDI5nvz_ZKc"
        });
        const defaultLayers = platform.createDefaultLayers();
        const ui = H.ui.UI.createDefault(this.state.map, defaultLayers, 'ru-RU');
        console.log(this.props.currentCoors[this.props.currentCoors.length - 1])
        const coordinate = this.props.currentCoors[this.props.currentCoors.length - 1]
        marker.addEventListener('tap', function (evt) {
            const bubble = new H.ui.InfoBubble(coordinate, {
                content: `<p>${coordinate.description}</p>`
            });
            ui.addBubble(bubble);
        })

        var routingParameters = {
            'routingMode': 'fast',
            'transportMode': 'car',
            'origin': this.props.currentCoors[this.props.currentCoors.length - 2].lat + ',' + this.props.currentCoors[this.props.currentCoors.length - 2].lng,
            'destination': coordinate.lat + ',' + coordinate.lng,
            'return': 'polyline'
        };
        var onResult = (result) => {
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
                    this.state.map.addObjects([routeLine]);
                });
            }

        }
        var router = platform.getRoutingService(null, 8);
        router.calculateRoute(routingParameters, onResult,
            function (error) {
                alert(error.message);
            });

        this.state.map.addObject(marker);
        
    }

    refresh() {
        if (this.props.isRefresh) {
            //this.routing1()
            this.routing2()
            //this.mapRef = createRef()
            //this.mapRef.current = null
            //this.start()
            this.props.onRefresh(false)
        }
    }

    render() {
        
        return (
            <div ref={this.mapRef} style={{height: "500px"}}/>
        );
    }
}

const mapDispachToProps = dispatch => {
    return {
        onCoors: value => dispatch({type: "currentCoors", value: value}),
        onRefresh: value => dispatch({type: "isRefresh", value: value}),
    };
};

const mapStateToProps = state => {
    return {
        currentCoors: state.currentCoors,
        isRefresh: state.isRefresh,
    };
};

export default connect(mapStateToProps, mapDispachToProps)(Map);