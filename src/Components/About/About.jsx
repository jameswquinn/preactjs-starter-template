/** @jsx h */
import { h, Component, Fragment } from "preact";
import Helmet from "preact-helmet";

import * as timeago from "timeago.js";
import lozad from "lozad";

export default class About extends Component {
  componentDidMount() {
    const observer = lozad(".lazy", {
      loaded: function(el) {
        // Custom implementation on a loaded element
        el.classList.add("is-loaded");
      },
      rootMargin: "10px 0px", // syntax similar to that of CSS Margin
      threshold: 0.4 // ratio of element convergence
    });
    observer.observe();
  }

  componentDidUpdate() {}

  componentWillUnmount() {

  }

  render() {
    
    return (
      <Fragment>
        <Helmet 
        title="about page" 
          meta={[
            { name: "description", content: "Helmet application ~ about page" },
            { property: "og:type", content: "article" }
          ]}
        />
        <article>
            <h1>About Page</h1>
        </article>
      </Fragment>
    );
  }
}
