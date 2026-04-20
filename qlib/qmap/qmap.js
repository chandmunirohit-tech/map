// QMap Library - Vanilla JS Version


const VIEW_PRESETS = [
    { label: 'World view', zoom: 2.0 },
    { label: 'Landmass/continent view', zoom: 5 },
    { label: 'City view', zoom: 10 },
    { label: 'Street-level view', zoom: 15 },
    { label: 'Building-level view', zoom: 20 },
];

let googleMapsPromise = null;

const loadGoogleMapsScript = (mapKey) => {
    if (googleMapsPromise) return googleMapsPromise;

    googleMapsPromise = new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
            resolve();
            return;
        }

        const existingScript = document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`);
        if (existingScript) {
            const timer = setInterval(() => {
                if (window.google && window.google.maps) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
            return;
        }

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${mapKey}&libraries=marker&v=weekly`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = (err) => {
            googleMapsPromise = null;
            reject(err);
        };
        document.head.appendChild(script);
    });

    return googleMapsPromise;
};

function convexHull(points) {
    if (points.length < 3) return points;
    points.sort((a, b) => a.lng - b.lng || a.lat - b.lat);
    const cross = (o, a, b) =>
        (a.lng - o.lng) * (b.lat - o.lat) - (a.lat - o.lat) * (b.lng - o.lng);
    const lower = [];
    for (const p of points) {
        while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0)
            lower.pop();
        lower.push(p);
    }
    const upper = [];
    for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i];
        while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0)
            upper.pop();
        upper.push(p);
    }
    upper.pop();
    lower.pop();
    return lower.concat(upper);
}

const MAP_THEMES = {
    eclipse: [
        { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }] },
        { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 13 }] },
        { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }] },
        { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#144b53" }, { "lightness": 14 }, { "weight": 1.4 }] },
        { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#08304b" }] },
        { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#0c4152" }, { "lightness": 5 }] },
        { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }] },
        { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#0b434f" }, { "lightness": 25 }] },
        { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }] },
        { "featureType": "road.arterial", "elementType": "geometry.stroke", "stylers": [{ "color": "#0b3d51" }, { "lightness": 16 }] },
        { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#000000" }] },
        { "featureType": "transit", "elementType": "all", "stylers": [{ "color": "#146474" }] },
        { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#021019" }] }
    ],
    alabaster: [
        { "featureType": "all", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }] },
        { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
        { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "color": "#f5f5f5" }] },
        { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "color": "#bdbdbd" }] },
        { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#eeeeee" }] },
        { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
        { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#e5e5e5" }] },
        { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }] },
        { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
        { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#dadada" }] },
        { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
        { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#c9c9c9" }] },
        { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] }
    ],
    candy: [
        { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "color": "#4a4a4a" }] },
        { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "weight": 2.5 }] },
        { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#eef3ec" }] },
        { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#b3e59f" }] },
        { "featureType": "poi.business", "elementType": "geometry", "stylers": [{ "visibility": "simplified" }] },
        { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#fffc00" }] },
        { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "weight": 1.5 }] },
        { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#fffc00" }] },
        { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }] },
        { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#44c1e6" }] }
    ],
    nautical: [
        { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#0055a5" }] },
        { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }] },
        { "featureType": "poi.business", "stylers": [{ "visibility": "off" }] },
        { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#e0e8e2" }] },
        { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] },
        { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#d1d1d1" }] },
        { "featureType": "transit", "stylers": [{ "visibility": "off" }] },
        { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#1a1a1a" }] },
        { "featureType": "administrative", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }, { "weight": 3 }] }
    ],
    parchment: [
        { "featureType": "poi", "stylers": [{ "visibility": "off" }] },
        { "featureType": "transit", "stylers": [{ "visibility": "off" }] },
        { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#cddced" }] },
        { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f0f3f4" }] },
        { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] },
        { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#cfcfcf" }, { "weight": 1 }] },
        { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }] },
        { "featureType": "road.local", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] },
        { "featureType": "road.local", "elementType": "geometry.stroke", "stylers": [{ "color": "#e0e0e0" }, { "weight": 0.5 }] },
        { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#5c5c5c" }] }
    ]
};

class QMap {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);

        if (!this.container) {
            console.error(`Container with id "${containerId}" not found.`);
            return;
        }

        const defaultOptions = {
            // mapKey: 'AIzaSyAilt_8cTAaLj51xHphaKPx_27jrrcrTAw',
            mapId: '',
            // markers: [
            //     {
            //         latitude: 22.5744,
            //         longitude: 88.3629,
            //     },
            //     {
            //         latitude: 22.6744,
            //         longitude: 88.3629,
            //     },

            // ],
            cameraControlEnabled: false,
            zoomControlsEnabled: false,
            mapZoomEnabled: false,
            enableFullScreen: false,

            boundaryEnabled: false,
            isPolygonEnable: false,
            isCircleRadiusEnable: false,
            showViewPresetSelector: false,

            enable: true, // Heatmap
            heatmapData: [
                { latitude: "22.5653° N", longitude: "88.4331° E", weight: 1 },
                // { latitude: "57.4893", longitude: "-6.098", weight: 1 },
                // { latitude: "59.141", longitude: "-3.3359", weight: 1 },
                // { latitude: "57.4983", longitude: "-6.0969", weight: 1 },
                // { latitude: "57.6406", longitude: "-6.2327", weight: 1 },
                // { latitude: "57.5103", longitude: "-6.0959", weight: 1 },
            ],
            radius: 30,
            intensity: 1,
            heatmapThreshold: 0.05,
            heatmapWeightProp: "weight",
            heatmapColorRange: null,
            colorGradient: [
                { "stop": 25, "color": "#0000FF" },
                { "stop": 55, "color": "#00FF00" },
                { "stop": 85, "color": "#FFEB3B" },
            ],
            heatmapAggregation: "SUM",

            zoom: 12,
            tilt: 0,
            heading: 0,
            gestureHandling: "auto",
            pathType: "",
            mapStyle: "roadmap",
            customStyles: [],
            radiusColor: "#FF0000",
            polygonColor: "#FF0000",
            markerPath: [],
        };

        this.options = { ...defaultOptions, ...options };

        this.mapInstance = null;
        this.heatmapOverlay = null;
        this.currentPreset = this._getInitialPreset();

        this.renderContainer();
        this.initMap();
    }

    _getInitialPreset() {
        const initialZoom = parseInt(this.options.zoom, 10);
        if (isNaN(initialZoom)) return 'City view';
        const nearest = VIEW_PRESETS.reduce((prev, curr) =>
            Math.abs(curr.zoom - initialZoom) < Math.abs(prev.zoom - initialZoom) ? curr : prev
        );
        return nearest.label;
    }

    renderContainer() {
        this.container.style.position = 'relative';

        this.mapDiv = document.createElement('div');
        this.mapDiv.style.width = '100%';
        this.mapDiv.style.height = '100%';
        this.container.appendChild(this.mapDiv);

        if (this.options.showViewPresetSelector) {
            this.presetContainer = document.createElement('div');
            this.presetContainer.className = "qmap-preset-selector";
            this.presetContainer.style.position = 'absolute';
            this.presetContainer.style.top = '10px';
            this.presetContainer.style.left = '10px';
            this.presetContainer.style.backgroundColor = 'white';
            this.presetContainer.style.borderRadius = '8px';
            this.presetContainer.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            this.presetContainer.style.zIndex = '1000';
            this.presetContainer.style.border = '1px solid #f3f4f6';
            this.presetContainer.style.display = 'flex';
            this.presetContainer.style.alignItems = 'center';

            const select = document.createElement('select');
            select.style.appearance = 'none';
            select.style.border = 'none';
            select.style.backgroundColor = 'transparent';
            select.style.outline = 'none';
            select.style.cursor = 'pointer';
            select.style.fontSize = '13px';
            select.style.fontWeight = '500';
            select.style.color = '#1f2937';
            select.style.padding = '6px 40px 6px 12px';
            select.style.width = '100%';
            select.style.height = '100%';

            VIEW_PRESETS.forEach(vp => {
                const option = document.createElement('option');
                option.value = vp.label;
                option.textContent = vp.label;
                if (vp.label === this.currentPreset) {
                    option.selected = true;
                }
                select.appendChild(option);
            });

            select.addEventListener('change', (e) => {
                const val = e.target.value;
                this.currentPreset = val;
                const preset = VIEW_PRESETS.find(p => p.label === val);
                if (preset && this.mapInstance) {
                    this.mapInstance.setZoom(preset.zoom);
                }
            });

            this.presetContainer.appendChild(select);

            const iconDiv = document.createElement('div');
            iconDiv.style.position = 'absolute';
            iconDiv.style.right = '12px';
            iconDiv.style.pointerEvents = 'none';
            iconDiv.style.display = 'flex';
            iconDiv.style.alignItems = 'center';
            iconDiv.style.justifyContent = 'center';

            iconDiv.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`;

            this.presetContainer.appendChild(iconDiv);
            this.container.appendChild(this.presetContainer);
        }
    }

    async initMap() {
        try {
            await loadGoogleMapsScript(this.options.mapKey);

            if (!window.google?.maps) return;

            const {
                markers, centerMarkers, mapStyle, customStyles, zoom, tilt, heading,
                gestureHandling, zoomControlsEnabled, mapZoomEnabled, cameraControlEnabled,
                enableFullScreen, mapId,
                boundaryEnabled, isPolygonEnable, pathType, polygonColor,
                isCircleRadiusEnable, radiusColor, markerPath,
                enable, heatmapData, radius, intensity, heatmapThreshold, heatmapAggregation, heatmapWeightProp, heatmapColorRange, colorGradient
            } = this.options;

            const center = centerMarkers[0] || markers[0];
            if (!center) return;

            const allowedMapStyles = ["satellite", "hybrid", "terrain", "roadmap"];
            const rawMapStyle = (mapStyle || "roadmap").toLowerCase();
            const mapTypeId = allowedMapStyles.includes(rawMapStyle) ? rawMapStyle : "roadmap";

            const mapOptions = {
                center: {
                    lat: parseFloat(center.latitude),
                    lng: parseFloat(center.longitude),
                },
                zoom: parseInt(zoom, 10),
                tilt: tilt,
                heading: heading,
                mapTypeId,
                styles: MAP_THEMES[rawMapStyle] || customStyles,
                gestureHandling: gestureHandling,
                zoomControl: zoomControlsEnabled,
                disableDoubleClickZoom: !mapZoomEnabled,
                cameraControl: cameraControlEnabled,
                rotateControl: cameraControlEnabled,
                tiltControl: cameraControlEnabled,
                fullscreenControl: enableFullScreen,
                streetViewControl: false,
                mapTypeControl: false,
            };

            if (typeof mapId === 'string' && mapId.trim() !== "") {
                mapOptions.mapId = mapId;
            }

            const map = new window.google.maps.Map(this.mapDiv, mapOptions);
            this.mapInstance = map;

            let zoomDebounceTimeout;
            map.addListener('zoom_changed', () => {
                clearTimeout(zoomDebounceTimeout);
                zoomDebounceTimeout = setTimeout(() => {
                    const newZoom = map.getZoom();
                    if (newZoom !== undefined) {
                        const nearest = VIEW_PRESETS.reduce((prev, curr) =>
                            Math.abs(curr.zoom - newZoom) < Math.abs(prev.zoom - newZoom) ? curr : prev
                        );
                        this.currentPreset = nearest.label;
                        if (this.presetContainer) {
                            const select = this.presetContainer.querySelector('select');
                            if (select) select.value = nearest.label;
                        }
                    }
                }, 150);
            });

            const bounds = new window.google.maps.LatLngBounds();
            const rawCoords = markers.map((marker) => ({
                lat: parseFloat(marker.latitude),
                lng: parseFloat(marker.longitude),
            }));
            const polygonCoords = convexHull(rawCoords.filter(m => !isNaN(m.lat) && !isNaN(m.lng)));

            const hexToRgb = (hex) => {
                if (!hex) return [0, 0, 0];
                let h = hex.replace("#", "");
                if (h.length === 3) h = h.split("").map(s => s + s).join("");
                if (h.length > 6) h = h.substring(0, 6);
                const r = parseInt(h.substring(0, 2), 16);
                const g = parseInt(h.substring(2, 4), 16);
                const b = parseInt(h.substring(4, 6), 16);
                return [r, g, b];
            };

            const interpolateRgb = (rgb1, rgb2, factor) => {
                return rgb1.map((c, i) => Math.round(c + factor * (rgb2[i] - c)));
            };

            const generateColorRange = (gradient) => {
                if (!gradient || !Array.isArray(gradient) || gradient.length === 0) {
                    return [[51, 102, 204], [255, 255, 191], [215, 48, 39]]; // defaults
                }

                const normalized = gradient.map(item => ({
                    ...item,
                    stop: item.stop > 1 ? item.stop / 100 : item.stop
                }));

                const sorted = [...normalized].sort((a, b) => a.stop - b.stop);

                const getColorAt = (stop) => {
                    if (stop <= sorted[0].stop) return hexToRgb(sorted[0].color);
                    if (stop >= sorted[sorted.length - 1].stop) return hexToRgb(sorted[sorted.length - 1].color);

                    for (let i = 0; i < sorted.length - 1; i++) {
                        const current = sorted[i];
                        const next = sorted[i + 1];
                        if (stop >= current.stop && stop <= next.stop) {
                            const range = next.stop - current.stop;
                            const factor = range === 0 ? 0 : (stop - current.stop) / range;
                            return interpolateRgb(hexToRgb(current.color), hexToRgb(next.color), factor);
                        }
                    }
                    return hexToRgb(sorted[0].color);
                };

                return [0.0, 0.2, 0.4, 0.6, 0.8, 1.0].map(s => getColorAt(s));
            };

            const getRGBFromHex = (hex) => {
                if (!hex || typeof hex !== 'string') return "#FF0000";
                if (hex.startsWith("#") && hex.length === 9) {
                    return `#${hex.substring(3, 9)}`;
                }
                return hex.substring(0, 7);
            };

            const getAlphaFromHex = (hex, defaultAlpha = 0.2) => {
                if (!hex || typeof hex !== 'string' || hex.length !== 9) return parseFloat(defaultAlpha);
                const a = hex.substring(1, 3);
                const parsedAlpha = parseInt(a, 16) / 255;
                if (parsedAlpha === 1) return parseFloat(defaultAlpha);
                return isNaN(parsedAlpha) ? parseFloat(defaultAlpha) : parsedAlpha;
            };

            let AdvancedMarkerElement, PinElement;
            let useAdvancedMarkers = false;

            if (mapOptions.mapId) {
                try {
                    const markerLib = await window.google.maps.importLibrary("marker");
                    AdvancedMarkerElement = markerLib.AdvancedMarkerElement;
                    PinElement = markerLib.PinElement;
                    useAdvancedMarkers = !!AdvancedMarkerElement;
                } catch (e) {
                    console.warn("Advanced markers library failed to load, using legacy markers.");
                }
            }

            class CustomOverlay extends window.google.maps.OverlayView {
                constructor(position, content, map, title) {
                    super();
                    this.position = position;
                    this.content = content;
                    this.div = null;
                    this.title = title || "";

                    Object.assign(this.content.style, {
                        position: "absolute",
                        cursor: "pointer",
                        transform: "translate(-50%, -100%)",
                    });

                    if (this.title) {
                        this.content.title = this.title;
                    }
                    this.setMap(map);
                }

                onAdd() {
                    this.div = document.createElement("div");
                    this.div.style.position = "absolute";
                    this.div.appendChild(this.content);

                    this.content.addEventListener('click', (e) => {
                        window.google.maps.event.trigger(this, 'click', e);
                    });

                    const panes = this.getPanes();
                    panes.overlayMouseTarget.appendChild(this.div);
                }

                draw() {
                    const overlayProjection = this.getProjection();
                    const p = overlayProjection.fromLatLngToDivPixel(new window.google.maps.LatLng(this.position.lat, this.position.lng));
                    if (this.div && p) {
                        this.div.style.left = p.x + "px";
                        this.div.style.top = p.y + "px";
                    }
                }

                onRemove() {
                    if (this.div) {
                        this.div.parentNode.removeChild(this.div);
                        this.div = null;
                    }
                }
            }

            markers.forEach((marker) => {
                const position = {
                    lat: parseFloat(marker.latitude),
                    lng: parseFloat(marker.longitude),
                };

                if (isNaN(position.lat) || isNaN(position.lng)) return;

                let markerInstance;

                if (useAdvancedMarkers) {
                    const pinColor = getRGBFromHex(marker.color) || "#EA4335";
                    const pinAlpha = getAlphaFromHex(marker.color, 1.0);
                    const pinCustom = new PinElement({
                        background: pinColor,
                        borderColor: "#FFFFFF",
                        glyphColor: "white",
                    });

                    let finalColor = pinColor;
                    if (pinAlpha < 1) {
                        const r = parseInt(pinColor.slice(1, 3), 16);
                        const g = parseInt(pinColor.slice(3, 5), 16);
                        const b = parseInt(pinColor.slice(5, 7), 16);
                        finalColor = `rgba(${r}, ${g}, ${b}, ${pinAlpha})`;
                        pinCustom.background = finalColor;
                    }

                    let content = pinCustom.element;
                    if (marker.icon || (typeof markerPath === "string" && markerPath.trim() !== "")) {
                        const iconUrl = marker.icon || markerPath;
                        const iconSize = marker.markerIconSize ? `${marker.markerIconSize}px` : "32px";

                        const div = document.createElement("div");
                        div.style.width = iconSize;
                        div.style.height = iconSize;
                        div.style.backgroundColor = finalColor;
                        div.style.maskImage = `url("${iconUrl}")`;
                        div.style.maskSize = "contain";
                        div.style.maskRepeat = "no-repeat";
                        div.style.maskPosition = "center";
                        div.style.WebkitMaskImage = `url("${iconUrl}")`;
                        div.style.WebkitMaskSize = "contain";
                        div.style.WebkitMaskRepeat = "no-repeat";
                        div.style.WebkitMaskPosition = "center";

                        content = div;
                    }

                    markerInstance = new AdvancedMarkerElement({
                        position,
                        map,
                        title: `${marker.name || marker.title}`,
                        content: content,
                    });
                } else {
                    const pinColor = getRGBFromHex(marker.color) || "#EA4335";
                    const pinAlpha = getAlphaFromHex(marker.color, 1.0);

                    let finalColor = pinColor;
                    if (pinAlpha < 1) {
                        const r = parseInt(pinColor.slice(1, 3), 16);
                        const g = parseInt(pinColor.slice(3, 5), 16);
                        const b = parseInt(pinColor.slice(5, 7), 16);
                        finalColor = `rgba(${r}, ${g}, ${b}, ${pinAlpha})`;
                    }

                    const iconUrl = marker.icon || (typeof markerPath === "string" && markerPath.trim() !== "" ? markerPath : undefined);

                    if (iconUrl) {
                        const iconSize = marker.markerIconSize ? `${marker.markerIconSize}px` : "32px";
                        const div = document.createElement("div");
                        div.style.width = iconSize;
                        div.style.height = iconSize;
                        div.style.backgroundColor = finalColor;
                        div.style.maskImage = `url("${iconUrl}")`;
                        div.style.maskSize = "contain";
                        div.style.maskRepeat = "no-repeat";
                        div.style.maskPosition = "center";
                        div.style.WebkitMaskImage = `url("${iconUrl}")`;
                        div.style.WebkitMaskSize = "contain";
                        div.style.WebkitMaskRepeat = "no-repeat";
                        div.style.WebkitMaskPosition = "center";

                        markerInstance = new CustomOverlay(position, div, map, `${marker.name || marker.title}`);
                    } else {
                        markerInstance = new window.google.maps.Marker({
                            position,
                            map,
                            title: `${marker.name || marker.title}`
                        });
                    }
                }

                const mRadiusValue = parseFloat(marker.markerRadiusValue);
                const hasMarkerRadius = !isNaN(mRadiusValue) && mRadiusValue > 0;

                if (isCircleRadiusEnable || hasMarkerRadius) {
                    let radiusInMeters = mRadiusValue || 1000;
                    if (marker.markerRadiusType?.toLowerCase() === "km" || (!marker.markerRadiusType && radiusInMeters < 50)) {
                        radiusInMeters *= 1000;
                    }

                    const mRadiusColor = getRGBFromHex(marker.radiusColor || radiusColor);
                    const mFillOpacity = getAlphaFromHex(marker.radiusColor || radiusColor, 0.5);

                    new window.google.maps.Circle({
                        map,
                        center: position,
                        radius: radiusInMeters,
                        strokeColor: mRadiusColor,
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: mRadiusColor,
                        fillOpacity: mFillOpacity,
                    });
                }

                const infoContent = `
          <div style="font-family: Arial; padding: 12px; max-width: 250px;">
            <div style="font-weight: bold; font-size: 14px;">${marker.name || marker.title || ''}</div>
            <div style="font-size: 12px; color: #666; margin-top: 4px;">${marker.tooltip || marker.snippet || ''}</div>
          </div>
        `;

                const infoWindow = new window.google.maps.InfoWindow({ content: infoContent });

                if (markerInstance instanceof CustomOverlay) {
                    window.google.maps.event.addListener(markerInstance, "click", () => {
                        infoWindow.setPosition(position);
                        infoWindow.open(map);
                    });
                } else {
                    markerInstance.addListener("click", () => infoWindow.open(map, markerInstance));
                }

                if (boundaryEnabled) bounds.extend(position);
            });

            if (isPolygonEnable && polygonCoords.length > 2) {
                if (pathType === "straightline") {
                    new window.google.maps.Polygon({
                        paths: polygonCoords,
                        map,
                        strokeColor: polygonColor,
                        fillColor: polygonColor,
                        fillOpacity: 0.2,
                    });
                } else if (pathType === "route") {
                    const directionsService = new window.google.maps.DirectionsService();
                    directionsService.route({
                        origin: polygonCoords[0],
                        destination: polygonCoords[0],
                        waypoints: polygonCoords.slice(1).map(p => ({ location: p, stopover: true })),
                        travelMode: "DRIVING",
                    }, (result, status) => {
                        if (status === "OK") {
                            const fullPath = result.routes[0].legs.flatMap(leg => leg.steps.flatMap(step => step.path));
                            new window.google.maps.Polygon({ paths: fullPath, map, strokeColor: polygonColor, fillColor: polygonColor, fillOpacity: 0.2 });
                        }
                    });
                }
            }

            if (boundaryEnabled && markers.length > 0) map.fitBounds(bounds);

            if (Array.isArray(markerPath) && markerPath.length > 0) {
                markerPath.forEach((pathObj) => {
                    const src = {
                        lat: parseFloat(pathObj.srcLatitude),
                        lng: parseFloat(pathObj.srcLongitude),
                    };
                    const des = {
                        lat: parseFloat(pathObj.desLatitude),
                        lng: parseFloat(pathObj.desLongitude),
                    };

                    if (!isNaN(src.lat) && !isNaN(src.lng) && !isNaN(des.lat) && !isNaN(des.lng)) {
                        const rawStrokeColor = pathObj.strokeColor || polygonColor || "#FF0000";
                        const pColor = getRGBFromHex(rawStrokeColor);
                        const pOpacity = getAlphaFromHex(rawStrokeColor, 1.0);
                        const pWeight = parseFloat(pathObj.strokeWidth) || 2;

                        if (pathObj.pathType === "route") {
                            const directionsService = new window.google.maps.DirectionsService();
                            directionsService.route(
                                {
                                    origin: src,
                                    destination: des,
                                    travelMode: "DRIVING",
                                },
                                (result, status) => {
                                    if (status === "OK") {
                                        const fullPath = result.routes[0].legs.flatMap((leg) =>
                                            leg.steps.flatMap((step) => step.path)
                                        );
                                        new window.google.maps.Polyline({
                                            path: fullPath,
                                            map,
                                            strokeColor: pColor,
                                            strokeOpacity: pOpacity,
                                            strokeWeight: pWeight,
                                        });
                                    }
                                }
                            );
                        } else {
                            new window.google.maps.Polyline({
                                path: [src, des],
                                geodesic: true,
                                strokeColor: pColor,
                                strokeOpacity: pOpacity,
                                strokeWeight: pWeight,
                                map: map,
                            });
                        }

                        if (boundaryEnabled) {
                            bounds.extend(src);
                            bounds.extend(des);
                            map.fitBounds(bounds);
                        }
                    }
                });
            }

            if (enable && heatmapData.length > 0) {
                this._addHeatmap(map, heatmapData, heatmapColorRange, colorGradient, radius, intensity, heatmapThreshold, heatmapAggregation, heatmapWeightProp);
            }

        } catch (err) {
            console.error("Failed to load map:", err);
        }
    }

    _addHeatmap(map, heatmapData, heatmapColorRange, colorGradient, radius, intensity, heatmapThreshold, heatmapAggregation, heatmapWeightProp) {
        const heatmapLayer = new deck.HeatmapLayer({
            id: 'heatmapLayer',
            data: heatmapData,
            getPosition: d => {
                const lat = parseFloat(d.latitude || d.lat || d[0]);
                const lng = parseFloat(d.longitude || d.lng || d[1]);
                return [lng, lat];
            },
            getWeight: d => parseFloat(d[heatmapWeightProp]) || 1,
            radiusPixels: parseFloat(radius) || 30,
            intensity: parseFloat(intensity) || 1,
            threshold: parseFloat(heatmapThreshold) || 0.05,
            aggregation: heatmapAggregation,
            colorRange: heatmapColorRange && heatmapColorRange.length > 0
                ? heatmapColorRange
                : this._generateColorRange(colorGradient)
        });

        const newOverlay = new deck.GoogleMapsOverlay({
            layers: [heatmapLayer]
        });

        this.heatmapOverlay = newOverlay;
        newOverlay.setMap(map);
    }

    _generateColorRange(gradient) {
        const hexToRgb = (hex) => {
            if (!hex) return [0, 0, 0];
            let h = hex.replace("#", "");
            if (h.length === 3) h = h.split("").map(s => s + s).join("");
            if (h.length > 6) h = h.substring(0, 6);
            const r = parseInt(h.substring(0, 2), 16);
            const g = parseInt(h.substring(2, 4), 16);
            const b = parseInt(h.substring(4, 6), 16);
            return [r, g, b];
        };

        const interpolateRgb = (rgb1, rgb2, factor) => {
            return rgb1.map((c, i) => Math.round(c + factor * (rgb2[i] - c)));
        };

        if (!gradient || !Array.isArray(gradient) || gradient.length === 0) {
            return [[51, 102, 204], [255, 255, 191], [215, 48, 39]]; // defaults
        }

        const normalized = gradient.map(item => ({
            ...item,
            stop: item.stop > 1 ? item.stop / 100 : item.stop
        }));

        const sorted = [...normalized].sort((a, b) => a.stop - b.stop);

        const getColorAt = (stop) => {
            if (stop <= sorted[0].stop) return hexToRgb(sorted[0].color);
            if (stop >= sorted[sorted.length - 1].stop) return hexToRgb(sorted[sorted.length - 1].color);

            for (let i = 0; i < sorted.length - 1; i++) {
                const current = sorted[i];
                const next = sorted[i + 1];
                if (stop >= current.stop && stop <= next.stop) {
                    const range = next.stop - current.stop;
                    const factor = range === 0 ? 0 : (stop - current.stop) / range;
                    return interpolateRgb(hexToRgb(current.color), hexToRgb(next.color), factor);
                }
            }
            return hexToRgb(sorted[0].color);
        };

        return [0.0, 0.2, 0.4, 0.6, 0.8, 1.0].map(s => getColorAt(s));
    }

    destroy() {
        if (this.heatmapOverlay) {
            this.heatmapOverlay.setMap(null);
            this.heatmapOverlay = null;
        }
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

window.QMap = QMap;
