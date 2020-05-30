import { h, Component } from "preact";
import lazySizes from "lazysizes";
import * as timeago from "timeago.js";


const cristina_hoch_fine_art_portraits_photos_12 = require("../../img/cristina_hoch_fine_art_portraits_photos_12.jpg?min=320,max=1400,steps=6");
const cristina_hoch_fine_art_portraits_photos_09 = require("../../img/cristina_hoch_fine_art_portraits_photos_09.jpg?min=320,max=1400,steps=6");
const cristina_hoch_fine_art_portraits_photos_07 = require("../../img/cristina_hoch_fine_art_portraits_photos_07.jpg?min=320,max=1400,steps=6");
const cristina_hoch_fine_art_portraits_photos_06 = require("../../img/cristina_hoch_fine_art_portraits_photos_06.jpg?min=320,max=1400,steps=6");


lazySizes.cfg.lazyClass = "lazy";
lazySizes.cfg.loadingClass = "is-loading";
lazySizes.cfg.loadedClass = "is-loaded";
lazySizes.cfg.loadMode = 1;
lazySizes.cfg.throttleDelay = 100;
lazySizes.cfg.hFac = 10;
lazySizes.cfg.init = true;


export default class Loading extends Component {
    componentDidMount() {

    }

    componentDidUpdate() { 

    }

    componentWillUnmount() { 

    }

    render() {
        return (
            <div>
                <h2>{timeago.format(1559850556669)}</h2>

                <div class="scroll-snap-type">

                    <img
                        className="lazy"
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 650 300'%3E%3C/svg%3E"
                        data-srcset={cristina_hoch_fine_art_portraits_photos_12.srcSet}
                        alt=""
                    />
                    <img
                        className="lazy"
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 650 300'%3E%3C/svg%3E"
                        data-srcset={cristina_hoch_fine_art_portraits_photos_09.srcSet}
                        alt=""
                    />
                    <img
                        className="lazy"
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 650 300'%3E%3C/svg%3E"
                        data-srcset={cristina_hoch_fine_art_portraits_photos_07.srcSet}
                        alt=""
                    />
                    <img
                        className="lazy"
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 650 300'%3E%3C/svg%3E"
                        data-srcset={cristina_hoch_fine_art_portraits_photos_06.srcSet}
                        alt=""
                    />
                </div>
            </div>
        );
    }
}
