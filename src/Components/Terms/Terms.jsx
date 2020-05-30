import { h, Component } from "preact";
import Helmet from "preact-helmet";

import * as timeago from "timeago.js";
import lozad from "lozad";

export default class Terms extends Component {
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
      <main>
        <Helmet title="My Title Hay James Yet Another Page" />
      </main>
    );
  }
}
