import { fragmentFrom } from "../core/htmlLiterals.js";
import DialogModalityMixin from "./DialogModalityMixin.js";
import FocusCaptureMixin from "./FocusCaptureMixin.js";
import { defaultState, template } from "./internal.js";
import KeyboardMixin from "./KeyboardMixin.js";
import ModalBackdrop from "./ModalBackdrop.js";
import Overlay from "./Overlay.js";

const Base = DialogModalityMixin(FocusCaptureMixin(KeyboardMixin(Overlay)));

/**
 * Basic modal overlay that the user typically dismisses with an explicit action.
 *
 * This component presents its children as a basic modal dialog which appears on
 * top of the main page content and which the user must interact with before
 * they can return to the page.
 *
 * @inherits Overlay
 * @mixes DialogModalityMixin
 * @mixes FocusCaptureMixin
 * @mixes KeyboardMixin
 * @part {ModalBackdrop} backdrop
 */
class Dialog extends Base {
  get [defaultState]() {
    return Object.assign(super[defaultState], {
      backdropPartType: ModalBackdrop,
      tabIndex: -1,
    });
  }

  get [template]() {
    const result = super[template];

    const frame = result.content.querySelector("#frame");
    /** @type {any} */ const cast = this;
    cast[FocusCaptureMixin.wrap](frame);

    result.content.append(
      fragmentFrom.html`
        <style>
          :host {
            height: 100%;
            left: 0;
            pointer-events: initial;
            top: 0;
            width: 100%;
          }
        </style>
      `
    );

    return result;
  }
}

export default Dialog;
