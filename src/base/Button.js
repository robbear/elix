import { fragmentFrom } from "../core/htmlLiterals.js";
import ComposedFocusMixin from "./ComposedFocusMixin.js";
import FocusVisibleMixin from "./FocusVisibleMixin.js";
import { defaultState, tap, template } from "./internal.js";
import WrappedStandardElement from "./WrappedStandardElement.js";

const Base = ComposedFocusMixin(
  FocusVisibleMixin(WrappedStandardElement.wrap("button"))
);

/**
 * Base class for custom buttons.
 *
 * `Button` wraps a standard HTML `button` element, allowing for custom styling
 * and behavior while ensuring standard keyboard and focus behavior.
 *
 * @inherits WrappedStandardElement
 * @mixes ComposedFocusMixin
 * @mixes KeyboardMixin
 */
class Button extends Base {
  get [defaultState]() {
    return Object.assign(super[defaultState], {
      role: "button",
    });
  }

  // Respond to a simulated click.
  [tap]() {
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });
    this.dispatchEvent(clickEvent);
  }

  get [template]() {
    const result = super[template];
    result.content.append(
      fragmentFrom.html`
        <style>
          :host {
            display: inline-flex;
            outline: none;
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
          }

          [part~="inner"] {
            align-items: center;
            background: none;
            border: none;
            color: inherit;
            flex: 1;
            font: inherit;
            outline: none;
            padding: 0;
          }
        </style>
      `
    );
    return result;
  }
}

export default Button;
