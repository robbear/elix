import ListBox from './ListBox.js';
import * as symbols from './symbols.js';
import { merge } from './updates.js';


/**
 * A menu.
 * 
 * This holds the contents of the menu. This isn't a button or element in a menu
 * bar that opens a menu.
 */
class Menu extends ListBox {

  componentDidMount() {
    if (super.componentDidMount) { super.componentDidMount(); }

    // Treat a pointerdown event as a click.
    if ('PointerEvent' in window) {
      // Prefer listening to standard pointer events.
      this.addEventListener('pointerdown', event =>
        this[symbols.click](event));
    } else {
      this.addEventListener('touchstart', event =>
        this[symbols.click](event));
    }
  }

  // Filter the set of items to ignore disabled items.
  itemsForState(state) {
    const base = super.itemsForState(state);
    return base ?
      base.filter((/** @type {any} */ item) => !item.disabled) :
      [];
  }

  get defaultState() {
    return Object.assign({}, super.defaultState, {
      role: 'menu',
      itemRole: 'menuitem'
    });
  }

  get updates() {
    return merge(super.updates, {
      style: {
        'touch-action': 'manipulation'
      }
    });
  }

}


export default Menu;
customElements.define('elix-menu', Menu);
