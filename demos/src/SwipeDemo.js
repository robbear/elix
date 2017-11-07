import TouchSwipeMixin from '../../mixins/TouchSwipeMixin.js';
import TrackpadSwipeMixin from '../../mixins/TrackpadSwipeMixin.js';
import * as props from '../../mixins/props.js';
import symbols from '../../mixins/symbols.js';
import ElementBase from '../../elements/ElementBase.js';


const Base =
  TouchSwipeMixin(
  TrackpadSwipeMixin(
    ElementBase
  ));


class SwipeDemo extends Base {

  get props() {
    const swipeFraction = this.state.swipeFraction;
    const formatted = swipeFraction !== null ?
      swipeFraction.toFixed(5) :
      '—';
    const transform = swipeFraction !== null ?
      `translateX(${-swipeFraction * 100}%)` :
      'none';
    return props.merge(super.props, {
      $: {
        block: {
          style: {
            transform
          }
        },
        swipeFraction: {
          textContent: formatted
        }
      }
    });
  }

  get [symbols.template]() {
    return `
      <style>
        :host {
          display: flex;
          flex-direction: column;
        }

        #message {
          font-size: smaller;
          padding: 1em;
        }

        #container {
          align-items: center;
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: center;
        }

        #block {
          background: linear-gradient(to right, lightgray, gray);
          height: 2em;
          width: 100%;
          will-change: transform;
        }
        
        #swipeFraction {
          font-size: 48px;
          text-align: center;
        }
      </style>
      <div id="message">
        This demo shows how a component can use TouchSwipeMixin and
        TrackpadSwipeMixin to listen to horizontal touch swipes and trackpad
        swipes, respectively. Swiping with either input method will show the
        current swipe as a fraction of the demo width. It will also translate the
        gray block by that fraction so the user feels like they are directly
        manipulating it.
      </div>
      <div id="container">
        <div id="block"></div>
        <div id="swipeFraction"></div>
      </div>
    `;
  }

}


customElements.define('swipe-demo', SwipeDemo);
export default SwipeDemo;
